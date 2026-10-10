import { describe, expect, it } from "vitest";
import { maskEmail, waitlistSchema } from "@/lib/waitlist/schema";

describe("waitlistSchema", () => {
  it("trims and lowercases the email", () => {
    const r = waitlistSchema.parse({ email: "  Yash@Example.COM " });
    expect(r.email).toBe("yash@example.com");
  });

  it("accepts all optional fields", () => {
    const r = waitlistSchema.parse({
      email: "a@b.co",
      name: "  Priya ",
      persona: "founder",
      platform: "both",
    });
    expect(r).toMatchObject({ name: "Priya", persona: "founder", platform: "both" });
  });

  it("turns empty optional fields into undefined", () => {
    const r = waitlistSchema.parse({ email: "a@b.co", name: "", persona: "", platform: "" });
    expect(r.name).toBeUndefined();
    expect(r.persona).toBeUndefined();
    expect(r.platform).toBeUndefined();
  });

  it.each([
    [{ email: "" }, "email"],
    [{ email: "not-an-email" }, "email"],
    [{ email: `${"a".repeat(250)}@b.co` }, "email"],
    [{ email: "a@b.co", name: "x".repeat(81) }, "name"],
    [{ email: "a@b.co", persona: "astronaut" }, "persona"],
    [{ email: "a@b.co", platform: "windows-phone" }, "platform"],
    [{}, "email"],
  ])("rejects %j on %s", (input, field) => {
    const r = waitlistSchema.safeParse(input);
    expect(r.success).toBe(false);
    expect(r.error?.issues.some((i) => i.path[0] === field)).toBe(true);
  });
});

describe("maskEmail", () => {
  it("masks the local part", () => {
    expect(maskEmail("yash@domain.com")).toBe("y***@domain.com");
  });
  it("handles malformed input", () => {
    expect(maskEmail("nope")).toBe("***");
  });
});
