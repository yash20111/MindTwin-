-- MindTwin waitlist table.
-- Run in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  persona text check (persona in ('student', 'professional', 'founder', 'parent', 'other')),
  platform text check (platform in ('ios', 'android', 'both')),
  created_at timestamptz not null default now()
);

-- Lock the table down: only the server (service role key) can read/write.
-- The service role bypasses RLS; anon/authenticated clients get nothing.
alter table public.waitlist enable row level security;

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
