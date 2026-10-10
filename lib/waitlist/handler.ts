import { z } from "zod";
import type { RateLimiter } from "@/lib/rate-limit";
import { maskEmail, waitlistSchema, type WaitlistResponse } from "./schema";
import type { WaitlistStore } from "./store";

type Deps = {
  store: () => WaitlistStore;
  limiter: RateLimiter;
};

const json = (body: WaitlistResponse, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Factory so the route can be unit-tested with fake stores / limiters. */
export function createWaitlistHandler({ store, limiter }: Deps) {
  return async function POST(req: Request): Promise<Response> {
    const ip = getClientIp(req);
    const limit = await limiter.check(`waitlist:${ip}`);
    if (!limit.allowed) {
      return json({ status: "rate_limited", retryAfter: limit.retryAfter }, 429, {
        "Retry-After": String(limit.retryAfter),
      });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ status: "invalid", errors: { form: ["Invalid request body."] } }, 400);
    }

    // Honeypot: pretend everything went fine, store nothing.
    if (
      body &&
      typeof body === "object" &&
      "website" in body &&
      typeof body.website === "string" &&
      body.website.trim() !== ""
    ) {
      return json({ status: "joined" }, 200);
    }

    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      return json({ status: "invalid", errors: fieldErrors as Record<string, string[]> }, 400);
    }

    const { website: _honeypot, ...entry } = parsed.data;
    void _honeypot;

    try {
      const result = await store().add(entry);
      return json(result === "exists" ? { status: "already_joined" } : { status: "joined" }, 200);
    } catch (err) {
      console.error(
        `[waitlist] failed to store ${maskEmail(entry.email)}:`,
        err instanceof Error ? err.message : "unknown error",
      );
      return json({ status: "error", message: "Could not join the waitlist right now." }, 500);
    }
  };
}
