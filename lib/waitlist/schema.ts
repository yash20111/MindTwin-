import { z } from "zod";

/** Shared between the client form and the API route — never trust the client alone. */
export const PERSONAS = ["student", "professional", "founder", "parent", "other"] as const;
export const PLATFORMS = ["ios", "android", "both"] as const;

const emptyToUndefined = (v: string | undefined) => (v === "" ? undefined : v);

export const waitlistSchema = z.object({
  email: z
    .string({ error: "Please enter your email." })
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email.")
    .max(254, "That email looks too long.")
    .pipe(z.email("Please enter a valid email address.")),
  name: z
    .string()
    .trim()
    .max(80, "Please keep your name under 80 characters.")
    .optional()
    .transform(emptyToUndefined),
  persona: z
    .union([z.enum(PERSONAS), z.literal("")], { error: "Please choose an option from the list." })
    .optional()
    .transform(emptyToUndefined),
  platform: z
    .union([z.enum(PLATFORMS), z.literal("")], { error: "Please choose iOS, Android or Both." })
    .optional()
    .transform(emptyToUndefined),
  /** Honeypot — real users never see or fill this field. */
  website: z.string().max(200).optional(),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistData = z.output<typeof waitlistSchema>;

export type WaitlistEntry = Omit<WaitlistData, "website">;

export type WaitlistResponse =
  | { status: "joined" }
  | { status: "already_joined" }
  | { status: "invalid"; errors: Record<string, string[]> }
  | { status: "rate_limited"; retryAfter: number }
  | { status: "error"; message: string };

/** y***@domain.com — for logs, so we never log full email addresses. */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  return `${local[0]}***@${domain}`;
}
