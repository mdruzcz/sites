# Commercial Holiday Decorators (commercialholidaydecorators.ca)

Next.js 16 app in the `mdruzcz/sites` monorepo. Commercial division of We Install Christmas Lights: hotels, condo/apartment lobbies, plazas and malls, offices, property managers, restaurants/retail, municipalities and BIAs.

## Structure
- `src/content/*.json` drives every page: `services` (8), `sectors` (7, served at top-level `/[sector]`), `cities` (18, `/service-areas/[city]`), `guides` (7), `faq` (8 groups x 5), `about`, `media` (194 photos + 14 clips with alt, category and blur placeholders).
- Media was pooled from the other holiday-lighting apps by `C:/wt-celebrate/copy-media.mjs` (interior lobbies/malls + exterior commercial only). Add photos to `public/images/gallery/` and an entry in `media.json`.
- Theme: light ivory canvas, evergreen ink/CTAs, gold accents, Playfair Display headings. Photo heroes use the `.on-photo` wrapper (see `app/globals.css`).
- Forms: `/api/quote` verifies Turnstile via the shared Worker, emails via Resend, and stores a row through the forms-submit Worker (`chd_quote_requests`, SQL in `supabase/`).
- Logo source: `brand/logo.html`, rendered with `node brand/render-logo.mjs`.

## Launch checklist (2026-10-22)
- [ ] Cloudflare DNS: A @ -> 76.76.21.21, CNAME www -> cname.vercel-dns.com (DNS only).
- [ ] Turnstile: add commercialholidaydecorators.ca (+ lobbydecorating.ca) to the MD-02 widget.
- [ ] Supabase: run `supabase/chd_quote_requests.sql` in the LCF project.
- [ ] Deploy workers/forms-submit and workers/turnstile-verify (hostname maps updated in this commit).
- [ ] Umami: create a website for the domain and add the script tag to `app/layout.tsx`.
- [ ] lobbydecorating.ca: add as a domain on the Vercel project; `next.config.mjs` redirects it to `/condo-apartment-lobbies`.
