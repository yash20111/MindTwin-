import { beforeEach, describe, expect, it, vi } from "vitest";
import { createWaitlistHandler } from "@/lib/waitlist/handler";
import { ConsoleWaitlistStore, type WaitlistStore } from "@/lib/waitlist/store";
import { InMemoryRateLimiter } from "@/lib/rate-limit";

const req = (body: unknown, ip = "1.2.3.4") =>
  new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("POST /api/waitlist", () => {
  let store: ConsoleWaitlistStore;
  let POST: (r: Request) => Promise<Response>;

  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    store = new ConsoleWaitlistStore();
    POST = createWaitlistHandler({
      store: () => store,
      limiter: new InMemoryRateLimiter(5, 600_000),
    });
  });

  it("accepts a valid signup", async () => {
    const add = vi.spyOn(store, "add");
    const res = await POST(req({ email: "New@Example.com", persona: "student", platform: "ios" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "joined" });
    expect(add).toHaveBeenCalledWith({
      email: "new@example.com",
      name: undefined,
      persona: "student",
      platform: "ios",
    });
  });

  it("returns 400 with field errors for invalid input", async () => {
    const res = await POST(req({ email: "nope" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.status).toBe("invalid");
    expect(body.errors.email[0]).toMatch(/valid email/i);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(req("{not json"));
    expect(res.status).toBe(400);
  });

  it("silently accepts but never stores honeypot submissions", async () => {
    const add = vi.spyOn(store, "add");
    const res = await POST(req({ email: "bot@spam.com", website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "joined" });
    expect(add).not.toHaveBeenCalled();
  });

  it("reports duplicates as already_joined with 200", async () => {
    await POST(req({ email: "dup@example.com" }));
    const res = await POST(req({ email: "DUP@example.com" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "already_joined" });
  });

  it("rate-limits after 5 requests per IP", async () => {
    for (let i = 0; i < 5; i++) {
      const ok = await POST(req({ email: `u${i}@example.com` }, "9.9.9.9"));
      expect(ok.status).toBe(200);
    }
    const res = await POST(req({ email: "u6@example.com" }, "9.9.9.9"));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    expect((await res.json()).status).toBe("rate_limited");

    // a different IP is unaffected
    const other = await POST(req({ email: "x@example.com" }, "8.8.8.8"));
    expect(other.status).toBe(200);
  });

  it("returns 500 without leaking details when the store fails", async () => {
    const failing: WaitlistStore = { add: () => Promise.reject(new Error("db down")) };
    const handler = createWaitlistHandler({
      store: () => failing,
      limiter: new InMemoryRateLimiter(5, 600_000),
    });
    const res = await handler(req({ email: "a@example.com" }));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(JSON.stringify(body)).not.toContain("db down");
    // logs never contain the full email
    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).toContain("a***@example.com");
    expect(logged).not.toContain("a@example.com");
  });
});

describe("InMemoryRateLimiter", () => {
  it("frees up after the window passes", async () => {
    let now = 0;
    const limiter = new InMemoryRateLimiter(2, 1000, () => now);
    expect((await limiter.check("k")).allowed).toBe(true);
    expect((await limiter.check("k")).allowed).toBe(true);
    const blocked = await limiter.check("k");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBe(1);
    now = 1001;
    expect((await limiter.check("k")).allowed).toBe(true);
  });
});
