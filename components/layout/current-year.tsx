import { cacheLife } from "next/cache";

/**
 * Cached server component: Cache Components forbids reading the clock during a
 * plain prerender, so the year is cached and revalidated daily instead.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
