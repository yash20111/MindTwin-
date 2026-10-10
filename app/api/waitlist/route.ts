import { createWaitlistHandler } from "@/lib/waitlist/handler";
import { getWaitlistStore } from "@/lib/waitlist/store";
import { waitlistRateLimiter } from "@/lib/rate-limit";

export const POST = createWaitlistHandler({
  store: getWaitlistStore,
  limiter: waitlistRateLimiter,
});
