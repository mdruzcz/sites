-- Commercial Holiday Decorators quote requests
-- Run in the shared LCF Supabase project (symgxmokposzjcgikgnz). Writes arrive via the
-- shared forms-submit Worker (hostnames commercialholidaydecorators.ca and lobbydecorating.ca -> this table).

create table if not exists public.chd_quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  phone text not null,
  email text not null,
  property_type text,
  city text,
  address text,
  interests text[],
  message text
);

create index if not exists chd_quote_requests_created_at_idx
  on public.chd_quote_requests (created_at desc);

alter table public.chd_quote_requests enable row level security;

-- Convention across sites: anon can INSERT only; service_role has full access.
drop policy if exists "anon insert" on public.chd_quote_requests;
create policy "anon insert" on public.chd_quote_requests
  for insert to anon with check (true);
