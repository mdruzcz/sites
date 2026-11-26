-- Quote requests for backyardcourtsdirect.ca and courtkits.ca.
-- Run once in the shared Supabase project (symgxmokposzjcgikgnz). Rows arrive through the
-- shared forms-submit Worker, which maps each hostname to its table.

create table if not exists public.bcd_quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  postal_code text,
  sport text,
  kit text,
  space text,
  base text,
  colours text,
  message text,
  source text
);

create index if not exists bcd_quote_requests_created_at_idx on public.bcd_quote_requests (created_at desc);

alter table public.bcd_quote_requests enable row level security;

-- Convention across sites: anon can INSERT only; service_role has full access.
drop policy if exists "anon insert" on public.bcd_quote_requests;
create policy "anon insert" on public.bcd_quote_requests
  for insert to anon with check (true);
