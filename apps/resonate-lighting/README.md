# Resonate Lighting — resonatelighting.com

Next.js 16 site for Resonate Lighting: premium music-reactive pixel lighting kits (mega trees, rooflines, wrapped trees, evergreen spirals, arches) for commercial spaces, BIAs and municipalities, installed anywhere in Canada from a home base in Saskatchewan.

## Tech
- Next.js 16 App Router + TypeScript, Tailwind CSS v4 (dark-first brand theme)
- Google Fonts via `next/font` (Sora display, Inter body)
- Cloudflare Turnstile on the quote form → shared `turnstile.masterdecker.com` Worker (widget MD-13)
- Supabase backup via the shared `forms.masterdecker.com` Worker (table `resonatelighting_quote_requests`)
- Resend email to `service@masterdecker.com` (from `noreply@masterdecker.com`)

## Prices: one file
**All prices live in `src/lib/pricing.ts`**: package prices, add-on unit prices, the control system, extra pixel controllers, crew-day rate and crew-days per prop, travel zones (trip fee and accommodation per crew-night), home-region mileage, and the budget-planner range, caps and recipe. Every page, the budget planner, FAQ answers and JSON-LD offers read from it. Change a number, push, redeploy.

`src/lib/estimate.ts` turns a layout into an itemised estimate (a layout containing a package is priced at the package price plus extras) and picks the layout for a budget (props are only ever added as the budget rises).

## The 3D light show (`src/lib/lightshow/`)
- `core.ts` — TypeScript port of the Light Show app's `tree.js`: `geom()`, the native `pattern()`s, `music()` look approximations, the synthetic `audio()` beat, and the app's THEMES / SCHEMES / MUSIC / STEADY catalogues.
- `props.ts` — props built in code: mega tree (strands wired to a controller box, star topper), house roofline (eaves and peaks traced in pixels), wrapped deciduous tree (trunk and branches wrapped in a helix of pixels), evergreen spiral, pixel arch.
- `scenes.ts` — demo presets and the town-square layout used by the budget planner and package renders.
- `renderer.ts` — canvas renderer in the style of tree.js's `TreeView` (glow + core per pixel, slow spin, camera sway, perspective, painter-sorted structure).
- `ticker.ts` — one `requestAnimationFrame` loop for every canvas on the page; canvases off screen or in a hidden tab do not draw.
- `live.ts` — microphone analysis (AnalyserNode, the engine's quiet-room gate, beats, bands, pitched peaks), a synthesised piano and drum kit (oscillators + generated noise, no samples), and the piano/drum light overlays.

Components: `src/components/demo/LightShowDemo.tsx` (home demo: scene switcher, Preview / Microphone / Piano / Drums, theme, look and colour pickers), `SceneCanvas.tsx` (self-running section art), `BudgetPlanner.tsx`, `MediaSlot.tsx`.
`prefers-reduced-motion` stops spin and sway, slows patterns and smooths flashes; section art renders a still frame.

## Pages
`/`, `/kits`, `/pricing`, `/how-it-works`, `/quick-start`, `/services`, `/care`, `/commercial`, `/bia`, `/municipal`, `/locations`, `/locations/[city]` (20 cities from `src/content/cities.json`), `/gallery`, `/faq`, `/about`, `/contact` (accepts `?kit=&budget=&layout=&prov=&city=` from the planner), legal pages.

## Content
JSON in `src/content/`: `kits.json`, `cities.json`, `markets.json`, `services.json`, `faqs.json` (price FAQs are generated from `pricing.ts`), `gallery.json`, `media-slots.json`. Describe only features the Light Show app really has (`Xlights/showui/index.html`, `server.py`).

## Photos and videos
`src/content/media-slots.json` lists every slot for Matt's own photos and video (each has a `note`). Put files in `public/media/`, set `src`, redeploy. Empty slots show a labelled live 3D render. Stock media: Pexels / Unsplash / Pixabay only, recorded in `MEDIA-CREDITS.md`.

## Local dev
```bash
npm install -w resonate-lighting
npm run dev -w resonate-lighting   # http://localhost:3107
```

## Env vars (Vercel project `resonate-lighting`)
See `.env.local.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_VERIFY_ENDPOINT`, `FORMS_SUBMIT_ENDPOINT`.

## Shared infra checklist
1. Turnstile: `resonatelighting.com` must be a hostname on the MD-13 widget (see `workers/turnstile-verify/SITE_KEYS.md`).
2. `workers/forms-submit` maps `resonatelighting.com` → `resonatelighting_quote_requests`.
3. Supabase: run `supabase/resonatelighting_quote_requests.sql` in the shared LCF project (includes the budget-planner columns; the API retries without them if the table predates them).

## DNS
`resonatelighting.com` on Cloudflare, DNS-only, pointed at Vercel.
