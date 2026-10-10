import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { maskEmail, type WaitlistEntry } from "./schema";

export type AddResult = "created" | "exists";

export interface WaitlistStore {
  add(entry: WaitlistEntry): Promise<AddResult>;
}

/**
 * Local-dev fallback. Logs signups (masked) and keeps an in-memory set so
 * duplicate detection behaves like production. Not persistent — don't use in prod.
 */
export class ConsoleWaitlistStore implements WaitlistStore {
  private emails = new Set<string>();

  async add(entry: WaitlistEntry): Promise<AddResult> {
    if (this.emails.has(entry.email)) return "exists";
    this.emails.add(entry.email);
    console.info(
      `[waitlist] new signup ${maskEmail(entry.email)}` +
        ` persona=${entry.persona ?? "-"} platform=${entry.platform ?? "-"}` +
        " (ConsoleWaitlistStore — configure Supabase to persist)",
    );
    return "created";
  }
}

/** Stores signups in the Supabase `waitlist` table (see /supabase/schema.sql). */
export class SupabaseWaitlistStore implements WaitlistStore {
  private client: SupabaseClient;

  constructor(url: string, serviceRoleKey: string) {
    this.client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async add(entry: WaitlistEntry): Promise<AddResult> {
    const { error } = await this.client.from("waitlist").insert({
      email: entry.email,
      name: entry.name ?? null,
      persona: entry.persona ?? null,
      platform: entry.platform ?? null,
    });
    if (!error) return "created";
    // 23505 = unique_violation (email already on the list)
    if (error.code === "23505") return "exists";
    throw new Error(`Supabase insert failed: ${error.code ?? "unknown"} ${error.message}`);
  }
}

let store: WaitlistStore | undefined;

export function getWaitlistStore(): WaitlistStore {
  if (store) return store;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  store = url && key ? new SupabaseWaitlistStore(url, key) : new ConsoleWaitlistStore();
  return store;
}
