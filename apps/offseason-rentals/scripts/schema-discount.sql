-- ===========================================================================
--  Off Season Rentals — optional discounted rate
--
--  monthly_rate stays the list price. When discount_monthly_rate is set it is
--  the price actually charged: the card and the rate panel show the list price
--  struck through with the discount beneath it in the accent colour, and the
--  schema.org Offer carries the discounted figure, because that is what a
--  renter would actually pay.
--
--  Safe to run more than once.
-- ===========================================================================

alter table public.osr_properties
  add column if not exists discount_monthly_rate integer,
  add column if not exists discount_weekly_rate  integer,
  -- Short reason shown beside the price: "Winter special", "Book by Oct 31".
  add column if not exists discount_note         text;

-- A "discount" above the list price is a data-entry mistake, not an offer.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'osr_properties_discount_check') then
    alter table public.osr_properties add constraint osr_properties_discount_check
      check (
        discount_monthly_rate is null
        or monthly_rate is null
        or discount_monthly_rate < monthly_rate
      );
  end if;
end $$;

-- Budget filtering and sorting should both use what the renter actually pays.
create index if not exists osr_properties_effective_rate_idx
  on public.osr_properties ((coalesce(discount_monthly_rate, monthly_rate)));
