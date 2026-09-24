-- Genesyx first-release waitlist.
-- Public (anon) role may INSERT only. No SELECT/UPDATE/DELETE, so the list can't be scraped.

create table if not exists public.waitlist (
  id           uuid primary key default gen_random_uuid(),
  email        text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  path         text not null check (path in ('xx', 'xy')),
  source_page  text check (char_length(source_page) <= 200),
  referrer     text check (char_length(referrer) <= 500),
  utm          jsonb not null default '{}'::jsonb check (pg_column_size(utm) <= 2048),
  consent_text text not null check (char_length(consent_text) <= 64),
  created_at   timestamptz not null default now()
);

-- One row per email per route; lower() guards against case duplicates.
create unique index if not exists waitlist_email_path_key on public.waitlist (lower(email), path);

alter table public.waitlist enable row level security;

drop policy if exists "anon can join waitlist" on public.waitlist;
create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

revoke all on public.waitlist from anon;
grant insert (email, path, source_page, referrer, utm, consent_text) on public.waitlist to anon;
