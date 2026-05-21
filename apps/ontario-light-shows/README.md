# Ontario Light Shows — ontariolightshows.ca

Next.js 16 site for Ontario Light Shows. Music-synced addressable LED light shows, RGB architectural lighting, immersive displays, and permanent holiday lighting across Ontario.

## Tech
- Next.js 16 App Router + TypeScript
- Tailwind CSS v4 (dark cinematic theme; gradient cyan → violet → magenta accents)
- Supabase (shared LCF project) for quote-request storage
- Resend for email notifications to `service@masterdecker.com`
- Self-hosted Umami analytics
- Cloudflare Turnstile-ready (placeholders in env)
- Sharp for image optimization

## Local dev
```bash
npm install
npm run dev # http://localhost:3010
```

## Pages
- `/` — Homepage (hero, services, Blenheim case-study teaser, areas, gallery, FAQ)
- `/services` + `/services/[slug]` (5 services)
- `/services/[slug]/[city]` (5 services × 8 cities = 40 prerendered SEO landing pages)
- `/service-areas` + `/service-areas/[city]` (8 cities)
- `/case-studies` + `/case-studies/blenheim-rotary-christmas-parade`
- `/about`, `/contact`, `/faq`, `/privacy-policy`, `/terms-of-service`

## Content management
Edit JSON files in `src/content/`:
- `services.json` — the 5 service categories
- `service-areas.json` — the 8 cities
- `case-studies.json` — Blenheim parade (and future studies)
- `projects.json` — homepage gallery tiles
- `testimonials.json` — client quotes
- `faqs.json` — FAQ accordion + JSON-LD

Then push. Vercel rebuilds and serves the new content.

## Photos & videos
Drop new media into `public/images/uploads/` — see the README in that folder for filename mappings.

## Required env vars
See `.env.local.example`. In production, set on the Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (after creating the widget)
- `NEXT_PUBLIC_GTM_ID` (once client provides)

## Supabase
Quote form writes to `public.ontariolightshows_quote_requests` in the shared LCF project (`symgxmokposzjcgikgnz`). Migration is checked into the parent Supabase project.

## DNS
`ontariolightshows.ca` lives on Cloudflare DNS pointed at Vercel:
- Apex `A` → `76.76.21.21` (DNS-only)
- `www` CNAME → `cname.vercel-dns.com` (DNS-only)
