-- Kitchen Planner: short share links for saved designs.
-- Run once against the shared Supabase project (symgxmokposzjcgikgnz) via the
-- Management API / SQL editor. Until this table exists the planner still works —
-- it falls back to long self-contained share links.

create table if not exists public.fc_designs (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  name        text not null default 'My kitchen',
  design      jsonb not null,
  item_count  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists fc_designs_code_idx on public.fc_designs (code);

alter table public.fc_designs enable row level security;

-- Anyone can create a design (the site uses the publishable key)…
drop policy if exists "fc_designs_insert" on public.fc_designs;
create policy "fc_designs_insert" on public.fc_designs
  for insert with check (true);

-- …and read one back by its code. Codes are unguessable 7-char strings.
drop policy if exists "fc_designs_select" on public.fc_designs;
create policy "fc_designs_select" on public.fc_designs
  for select using (true);

grant insert, select on public.fc_designs to anon, authenticated;
