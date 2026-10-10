export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the caller may try again (0 when allowed). */
  retryAfter: number;
};

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

/**
 * Simple sliding-window limiter kept in process memory.
 *
 * TODO: swap for a shared store (e.g. Upstash Redis via @upstash/ratelimit) in
 * production — serverless instances don't share memory, so this is best-effort only.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    const now = this.now();
    const windowStart = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > windowStart);

    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      const retryAfter = Math.max(1, Math.ceil((recent[0] + this.windowMs - now) / 1000));
      return { allowed: false, remaining: 0, retryAfter };
    }

    recent.push(now);
    this.hits.set(key, recent);
    this.prune(windowStart);
    return { allowed: true, remaining: this.limit - recent.length, retryAfter: 0 };
  }

  /** Keep memory bounded by dropping keys with no recent hits. */
  private prune(windowStart: number) {
    if (this.hits.size < 5_000) return;
    for (const [k, times] of this.hits) {
      if (times.every((t) => t <= windowStart)) this.hits.delete(k);
    }
  }
}

/** 5 requests per 10 minutes per IP. */
export const waitlistRateLimiter: RateLimiter = new InMemoryRateLimiter(5, 10 * 60 * 1000);
