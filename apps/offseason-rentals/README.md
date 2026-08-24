# Off Season Rentals — offseasonrentals.ca

Furnished Port Stanley cottages let by the month from September to May, plus a
"Want to list your property?" funnel for other owners.

Airbnb-shaped front end (Figtree, near-black on white, hairline borders, 12px
radii, generous air) on Next.js 16 + Tailwind v4, with listings stored in
Supabase rather than JSON so photographs can be managed from the live site.

- Local: <http://localhost:3106>
- Port: **3106**

## Getting started

```bash
npm install --legacy-peer-deps   # from sites/ root — this is a workspace
npm run dev                      # from this directory
```

## One-time setup

1. **Database** — paste [`scripts/schema.sql`](scripts/schema.sql) into the
   Supabase SQL editor for project `symgxmokposzjcgikgnz` and run it. Creates
   four `osr_*` tables, their RLS policies and the `osr-photos` storage bucket.
2. **Seed the four properties**

   ```bash
   node scripts/seed-properties.mjs
   ```

   They land as **drafts**. The addresses and names are real; the rates, square
   footages and amenity lists are placeholders. Check each one in `/admin` and
   flip it to Published.
3. **Turnstile** — add `offseasonrentals.ca` and `www.offseasonrentals.ca` as
   hostnames on the **MD-13** widget in the Cloudflare dashboard, then set
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADXetRNHN8PdanEk`. Until the hostname
   is registered the key must stay unset — a key without a matching hostname
   fails closed and would break both forms.

## The admin

`/admin`, gated by `ADMIN_PASSWORD` (HMAC-signed cookie, 12-hour session).

- **Drag and drop photographs** straight onto a listing. They go to Supabase
  Storage; drag a tile onto another to reorder; alt text saves on blur.
- **Import from VRBO or Airbnb** — paste a listing URL and Firecrawl reads the
  property facts and pulls the photographs across.

### What the importer actually gets

Reliable: title, bedrooms, bathrooms, sleeps, beds, property type, city,
amenities (mapped onto our own catalogue), and the photographs rendered into the
page.

Not reliable: the body description. Both platforms hide it behind a "show more"
control and fetch it client-side, so the extractor returns nothing usable — and
what it does return is often review boilerplate, which `cleanDescription()`
strips. Write off-season copy by hand; it should read differently to a summer
listing regardless.

Photo counts are similar — VRBO renders about five into the initial HTML and
holds the rest behind a modal. Import what comes, drag-drop the remainder.

## Content

| Where | What |
|---|---|
| `src/content/cities.json` | 8 commuter-destination landing pages |
| `src/content/audiences.json` | 8 "perfect for" landing pages |
| `src/content/amenities.json` | Amenity catalogue — drives admin checkboxes and listing icons |
| `src/content/faqs.json` | Renter and owner FAQs (feed `FAQPage` schema) |
| Supabase `osr_properties` | The listings themselves — edited in `/admin`, never in git |

## Routes

- `/` · `/rentals` · `/rentals/[slug]`
- `/list-your-property` — the owner funnel
- `/off-season-rentals/[city]` × 8 · `/perfect-for/[audience]` × 8
- `/how-it-works` · `/about` · `/faq` · `/contact` · legal
- `/admin`, `/admin/properties/[id]` — noindex, gated

## Forms

Two routes, both edge, both honeypot + Turnstile (fail-closed once a site key is
set), both **email first, database second** — a 502 is only returned when both
halves fail, and the response reports `{ emailed, stored }` so a probe can tell
which half worked.

| Route | Table | Notes |
|---|---|---|
| `/api/inquiry` | `osr_booking_inquiries` | Property enquiries |
| `/api/list-property` | `osr_listing_requests` | Owners offering a property; captures their VRBO/Airbnb link for one-click import |

Lead tables are anon-INSERT-only with no SELECT policy, so the publishable key
shipped to the browser cannot read the enquiry list.

## Environment

See `.env.local`. Beyond the usual Supabase/Resend/Turnstile set:

| Key | Purpose |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only. Admin CRUD and Storage writes. |
| `ADMIN_PASSWORD` | The `/admin` gate. |
| `ADMIN_SESSION_SECRET` | Signs the session cookie. |
| `FIRECRAWL_API_KEY` | Powers the VRBO/Airbnb importer. |

## Regenerating the OG image

```bash
node scripts/generate-og.mjs
```
