-- ===========================================================================
--  Off Season Rentals — owner accounts and listing packages
--
--  Turns the site from "we manage four properties" into a paid directory:
--  owners register, build their own listing, pick a tier and submit it. Matt
--  invoices, approves, and the listing runs for twelve months.
--
--  Safe to run more than once. Run after scripts/schema.sql.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. Owner profiles, keyed to Supabase Auth
-- ---------------------------------------------------------------------------
create table if not exists public.osr_owners (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null default '',
  email       text not null,
  phone       text,
  -- Where they are, so Matt can tell a Port Stanley owner from an out-of-area one.
  city        text,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists osr_owners_touch on public.osr_owners;
create trigger osr_owners_touch
  before update on public.osr_owners
  for each row execute function public.osr_touch_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Package state on the listing itself
--
--    package_status is the workflow, deliberately separate from `status`:
--    `status` controls public visibility, package_status controls where the
--    listing sits in the owner's journey. A listing can be paid and active but
--    still unpublished if Matt has not approved it.
-- ---------------------------------------------------------------------------
alter table public.osr_properties
  add column if not exists owner_id            uuid references auth.users (id) on delete set null,
  add column if not exists package_tier        text,
  add column if not exists package_status      text not null default 'none',
  add column if not exists package_started_at  timestamptz,
  add column if not exists package_expires_at  timestamptz,
  add column if not exists submitted_at        timestamptz,
  add column if not exists approved_at         timestamptz,
  add column if not exists rejection_note      text,
  -- Lower sorts first. gold and house = 10, silver = 20, bronze = 30.
  add column if not exists sort_rank           smallint not null default 10;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'osr_properties_tier_check') then
    alter table public.osr_properties add constraint osr_properties_tier_check
      check (package_tier is null or package_tier in ('bronze', 'silver', 'gold'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'osr_properties_pkg_status_check') then
    alter table public.osr_properties add constraint osr_properties_pkg_status_check
      check (package_status in ('none', 'draft', 'submitted', 'awaiting_payment', 'active', 'expired', 'rejected'));
  end if;
end $$;

create index if not exists osr_properties_owner_idx    on public.osr_properties (owner_id);
create index if not exists osr_properties_pkgstat_idx  on public.osr_properties (package_status);
create index if not exists osr_properties_sort_idx     on public.osr_properties (sort_rank, monthly_rate);

-- Matt's own four are house listings: no owner, no package, top rank.
update public.osr_properties
   set package_status = 'none', sort_rank = 10
 where owner_id is null and package_status is null;

-- ---------------------------------------------------------------------------
-- 3. Package orders — one row per invoice raised
-- ---------------------------------------------------------------------------
create table if not exists public.osr_package_orders (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid references auth.users (id) on delete set null,
  property_id  uuid references public.osr_properties (id) on delete cascade,
  tier         text not null check (tier in ('bronze', 'silver', 'gold')),
  price_cad    integer not null,
  status       text not null default 'invoiced'
               check (status in ('invoiced', 'paid', 'cancelled', 'refunded')),
  invoiced_at  timestamptz not null default now(),
  paid_at      timestamptz,
  expires_at   timestamptz,
  note         text,
  created_at   timestamptz not null default now()
);

create index if not exists osr_orders_owner_idx  on public.osr_package_orders (owner_id);
create index if not exists osr_orders_status_idx on public.osr_package_orders (status, invoiced_at desc);

-- ---------------------------------------------------------------------------
-- 4. Row level security
--
--    Owners never write to these tables directly from the browser. Every owner
--    action goes through a server route holding the service-role key, which
--    checks the session first. That keeps the approval gate impossible to
--    bypass — an owner cannot set status = 'published' on their own listing by
--    crafting a PostgREST call, because the policy below grants them no write
--    path at all.
-- ---------------------------------------------------------------------------
alter table public.osr_owners         enable row level security;
alter table public.osr_package_orders enable row level security;

drop policy if exists osr_owners_self_read on public.osr_owners;
create policy osr_owners_self_read
  on public.osr_owners for select
  to authenticated
  using (id = auth.uid());

drop policy if exists osr_orders_self_read on public.osr_package_orders;
create policy osr_orders_self_read
  on public.osr_package_orders for select
  to authenticated
  using (owner_id = auth.uid());

-- The public read policy on osr_properties is unchanged: anon sees
-- status = 'published' only, whoever owns the row.

-- ---------------------------------------------------------------------------
-- 5. Expiry sweep
--
--    A package that has run its twelve months stops being published. Called by
--    the admin on load; cheap enough to run on every request.
-- ---------------------------------------------------------------------------
create or replace function public.osr_expire_packages()
returns integer language plpgsql security definer as $$
declare
  affected integer;
begin
  update public.osr_properties
     set package_status = 'expired',
         status = 'draft'
   where package_status = 'active'
     and package_expires_at is not null
     and package_expires_at < now();
  get diagnostics affected = row_count;
  return affected;
end;
$$;
