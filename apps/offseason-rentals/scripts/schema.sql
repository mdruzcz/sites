-- ===========================================================================
--  Off Season Rentals — schema for the shared Supabase project
--  (symgxmokposzjcgikgnz, ca-central-1)
--
--  Everything is prefixed osr_ so it cannot collide with the other sites
--  sharing this project. Safe to run more than once.
--
--  Run in: Supabase dashboard -> SQL Editor -> New query -> Run
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Properties
-- ---------------------------------------------------------------------------
create table if not exists public.osr_properties (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,

  street_address    text not null default '',
  unit              text,
  city              text not null default 'Port Stanley',
  region            text not null default 'ON',
  postal_code       text,
  country           text not null default 'CA',
  latitude          double precision,
  longitude         double precision,

  property_type     text not null default 'Cottage',
  headline          text not null default '',
  summary           text not null default '',
  description       text not null default '',

  bedrooms          integer not null default 1,
  bathrooms         numeric(3,1) not null default 1,
  sleeps            integer not null default 2,
  beds              integer,
  square_feet       integer,
  parking_spaces    integer,

  monthly_rate      integer,
  weekly_rate       integer,
  nightly_rate      integer,
  min_stay_nights   integer not null default 30,
  security_deposit  integer,
  cleaning_fee      integer,
  utilities_included boolean not null default true,
  wifi_included     boolean not null default true,
  pets_allowed      boolean not null default false,
  pet_fee           integer,
  smoking_allowed   boolean not null default false,

  available_from    text,
  available_to      text,

  status            text not null default 'draft'
                    check (status in ('draft', 'published')),
  featured          boolean not null default false,

  perfect_for       text[] not null default '{}',
  amenities         text[] not null default '{}',
  highlights        text[] not null default '{}',
  house_rules       text[] not null default '{}',

  -- Set when the listing was imported from a VRBO or Airbnb URL.
  source_url        text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists osr_properties_status_idx on public.osr_properties (status);
create index if not exists osr_properties_city_idx   on public.osr_properties (city);
create index if not exists osr_properties_perfect_idx on public.osr_properties using gin (perfect_for);

-- Keep updated_at honest without relying on the application to send it.
create or replace function public.osr_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists osr_properties_touch on public.osr_properties;
create trigger osr_properties_touch
  before update on public.osr_properties
  for each row execute function public.osr_touch_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Property photos
-- ---------------------------------------------------------------------------
create table if not exists public.osr_property_photos (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references public.osr_properties (id) on delete cascade,
  url           text not null,
  alt           text not null default '',
  width         integer,
  height        integer,
  position      integer not null default 0,
  -- Storage object path, so deleting the row can also delete the file.
  storage_path  text,
  created_at    timestamptz not null default now()
);

create index if not exists osr_photos_property_idx
  on public.osr_property_photos (property_id, position);

-- ---------------------------------------------------------------------------
-- 3. Renter enquiries
-- ---------------------------------------------------------------------------
create table if not exists public.osr_booking_inquiries (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  email          text not null,
  phone          text not null,
  property_slug  text,
  property_name  text,
  arrival        text,
  duration       text,
  guests         integer,
  reason         text,
  message        text,
  source_url     text,
  created_at     timestamptz not null default now()
);

create index if not exists osr_inquiries_created_idx
  on public.osr_booking_inquiries (created_at desc);

-- ---------------------------------------------------------------------------
-- 4. Owner listing requests ("Want to list your property?")
-- ---------------------------------------------------------------------------
create table if not exists public.osr_listing_requests (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  phone             text not null,
  property_address  text not null,
  city              text not null,
  property_type     text,
  bedrooms          integer,
  bathrooms         numeric(3,1),
  months_available  text,
  asking_rate       text,
  listing_url       text,
  listing_platform  text,
  message           text,
  status            text not null default 'new',
  created_at        timestamptz not null default now()
);

create index if not exists osr_listing_requests_created_idx
  on public.osr_listing_requests (created_at desc);

-- ---------------------------------------------------------------------------
-- 5. Row level security
--
--    Properties and photos are public content: anon may SELECT published rows.
--    Lead tables are write-only for anon — INSERT with no SELECT, so a leaked
--    publishable key cannot be used to read the enquiry list.
-- ---------------------------------------------------------------------------
alter table public.osr_properties        enable row level security;
alter table public.osr_property_photos   enable row level security;
alter table public.osr_booking_inquiries enable row level security;
alter table public.osr_listing_requests  enable row level security;

drop policy if exists osr_properties_read_published on public.osr_properties;
create policy osr_properties_read_published
  on public.osr_properties for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists osr_photos_read_published on public.osr_property_photos;
create policy osr_photos_read_published
  on public.osr_property_photos for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.osr_properties p
      where p.id = property_id and p.status = 'published'
    )
  );

drop policy if exists osr_inquiries_insert on public.osr_booking_inquiries;
create policy osr_inquiries_insert
  on public.osr_booking_inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists osr_listing_requests_insert on public.osr_listing_requests;
create policy osr_listing_requests_insert
  on public.osr_listing_requests for insert
  to anon, authenticated
  with check (true);

-- service_role bypasses RLS entirely, which is what the admin uses.

-- ---------------------------------------------------------------------------
-- 6. Storage bucket for uploaded and imported photographs
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('osr-photos', 'osr-photos', true)
on conflict (id) do update set public = true;

drop policy if exists osr_photos_public_read on storage.objects;
create policy osr_photos_public_read
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'osr-photos');

-- ---------------------------------------------------------------------------
-- 7. Register the site so QuickQuote and the admin can find it
-- ---------------------------------------------------------------------------
insert into public.sites (site_id, name, domain)
values ('offseason-rentals', 'Off Season Rentals', 'offseasonrentals.ca')
on conflict (site_id) do nothing;
