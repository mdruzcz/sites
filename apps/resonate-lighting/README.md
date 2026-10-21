# Resonate Lighting — resonatelighting.com

Next.js 16 site for Resonate Lighting: music-reactive, permanent/seasonal pixel lighting kits for commercial spaces, BIAs and municipalities in Ontario.

## Tech
- Next.js 16 App Router + TypeScript, Tailwind CSS v4 (dark-first brand theme)
- Google Fonts via `next/font` (Sora display, Inter body)
- Cloudflare Turnstile on the quote form → shared `turnstile.masterdecker.com` Worker
- Supabase backup via the shared `forms.masterdecker.com` Worker (table `resonatelighting_quote_requests`)
- Resend email to `service@masterdecker.com` (from `noreply@masterdecker.com`, a Resend-verified domain)
- Home-page demo: canvas pixel simulation (dusk sky, mega tree with star topper, wrapped deciduous tree, roofline) driven through an `AnalyserNode` by a Web Audio synthesis of Tchaikovsky's Trepak (public domain composition, our own transcription in `src/components/demo/trepak.ts`), a local audio file the visitor picks, or the microphone. Never embed a copyrighted recording here.

## Local dev
```bash
npm install          # at the monorepo root
npm run dev -w resonate-lighting   # http://localhost:3107
```

## Pages
- `/` — hero + interactive demo (modes: Pulse, Ripple, Scroll, Power, Rainbow, Solid; themes: Christmas, Candy Cane, Grinch, Snowman, Halloween, Canada Day, Ocean; mega tree / roofline toggle; honours `prefers-reduced-motion`)
- `/kits` — core components, Starter / Business / Municipal packages (Product JSON-LD), kit FAQ
- `/services` — design, supply, installation, seasonal service (Service JSON-LD)
- `/commercial`, `/bia`, `/municipal` — market pages from `src/content/markets.json`
- `/gallery` — placeholder image slots
- `/about`, `/faq`, `/contact` (Turnstile quote form), `/privacy-policy`, `/terms-of-service`

## Content
Edit JSON in `src/content/` (`kits.json`, `services.json`, `markets.json`, `faqs.json`, `gallery.json`) and `src/lib/site.ts`, then push. Never add specs or prices that Matt has not provided.

## Brand
`brand/` holds the kit: `resonate-mark.svg`, `resonate-logo.svg`, `resonate-logo-light-bg.svg`, `palette.json`, `BRAND.md`. Run `npm run brand:export -w resonate-lighting` to regenerate the PNGs in `public/images/brand/` plus `app/icon.png` and `app/apple-icon.png`.

## Gallery photos
Replace the SVG placeholders in `public/images/gallery/` with real photos (same filenames or update `gallery.json` / `kits.json`).

## Env vars (Vercel project `resonate-lighting`)
See `.env.local.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_VERIFY_ENDPOINT`, `FORMS_SUBMIT_ENDPOINT`.

## Shared infra checklist for this site
1. Cloudflare Turnstile: add `resonatelighting.com` to the widget for the group named in `workers/turnstile-verify/SITE_KEYS.md` and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
2. `workers/turnstile-verify/src/index.js`: hostname → group mapping, then `npm run deploy` in that folder.
3. `workers/forms-submit/src/index.js`: `"resonatelighting.com": "resonatelighting_quote_requests"`, then `npm run deploy`.
4. Supabase: run `supabase/resonatelighting_quote_requests.sql` in the shared LCF project.

## DNS
`resonatelighting.com` on Cloudflare, DNS-only, pointed at Vercel: apex `A 76.76.21.21`, `www CNAME cname.vercel-dns.com`.
