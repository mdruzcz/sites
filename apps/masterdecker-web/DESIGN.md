# DESIGN.md: masterdecker.com

## Source
- URL: https://masterdecker.com (live origin returning HTTP 522 — branding + images recovered from Cloudflare CDN cache and the Wayback Machine archive 20260123203231)
- Capture date: 2026-05-27
- Evidence: Firecrawl `branding` format on live URL, Firecrawl `html` format on Wayback archives, direct HEAD probes against the WP CDN (`/wp-content/uploads/...`).

## Reference Screenshots
Reference images (collected from the user) live in `/public/images/wp-*.jpg`. The original WP origin is offline so a fresh full-page screenshot is not available; the homepage layout reproduced in `src/app/page.tsx` follows the screenshots the client provided and the structure captured in `.firecrawl/wb-home-full.json`.

## Design Summary
Outdoor-living services company. Photography-driven, warm, trade-confident. Every section leans on real project photography; type and layout are clean and minimal so the photos carry the brand. Orange accent (#FC8C04) pulled from the logo is used aggressively: top utility bar, all CTAs, card title text, card border, slider dots, FAB. Body content sits on a white or very-light-grey ground; deep dark sections use near-black (#111) with photo overlays.

## Design Tokens

### Colors
| Role | Value | Notes |
| --- | --- | --- |
| `--accent` | `#FC8C04` | Logo orange. Used on buttons, links, top bar, card titles, accents. Verified via Firecrawl branding extraction. |
| `--accent-hover` | `#e07a00` | Darker orange for hover. |
| `--ink` | `#111111` | Headings, dark sections. |
| `--ink-soft` | `#4B5563` | Body copy. |
| `--ink-mute` | `#6B7280` | Subtle/meta copy. |
| `--surface` | `#F7F7F7` | Section alt background. |
| `--border` | `#E5E5E5` | Hairline borders. |
| `--shell` | `#1A1A1A` | Footer background and dark CTA blocks. |
| White | `#FFFFFF` | Default body background. |

Brand pulled by Firecrawl branding: `primary #334155`, `secondary #FC9404`, `accent #FC8C04`, `background #FFFFFF`, `text/link #FC8C04`. We standardized accent to `#FC8C04`.

### Typography
- Font: Open Sans (per Firecrawl branding `typography.fontFamilies.primary`). Substituted with **Inter** via `next/font/google` for performance and visual parity.
- Heading weight: 800 (display).
- Headline scale: `h1 ~55px` → mapped to a fluid scale (`text-4xl md:text-5xl lg:text-6xl`).
- Eyebrow: 13px, 800 weight, uppercase, letter-spacing `0.22em`, accent color.
- Body: ~16–18px, line-height 1.65–1.75, `--ink-soft`.

### Spacing And Layout
- Base unit: 12px (per branding).
- Border radius: 2px on inputs (per branding); buttons are pill (999px); cards are 4px.
- Container: max-width 1240px, side padding 1.5rem.
- Section padding: 6rem desktop / 4rem mobile.
- Section rhythm: alternating white ↔ `--surface` with hairline border.

## Components

### Buttons
- **Primary**: pill (`border-radius: 999px`), orange background `#FC8C04`, white text, uppercase, 700 weight, 0.04em tracking, 14px font, subtle orange shadow, min-height 44px.
- **Outline**: pill, 2px orange border, transparent ground, orange text → fills orange on hover.
- **Ghost-light**: pill, white border at 60% opacity on dark photo heros → white fill on hover.

### Cards
- **Service card** (`.svc-card`): 4:3 aspect, 3px orange border, full-bleed photo, gradient overlay (transparent → black 85%), uppercase orange title on bottom-left, white body copy.
- **City card** (`.city-card`): 3:2 aspect, full-bleed city photo, dark gradient overlay, centered uppercase title + smaller cities list.
- **Gallery item** (`.gallery-item`): 4:3 with 3px orange border, hover-scale image.

### Navigation (two rows)
- **Top row** — orange background (`#FC8C04`), 44px tall, contains: About Us dropdown, Projects, Blog, Contact Us, email, phone. Hides via `max-height/opacity` transition once scroll passes 80px.
- **Main row** — white, 80–88px, logo on left, four category dropdowns (Staining & Sealing / Woodwork / Concrete Work / Landscaping) centered, "Free Estimate" pill button right.
- Mobile collapses both rows into a hamburger drawer with nested `<details>` per category.

### Hero
- `min-height: 540px` desktop, 420px mobile.
- Full-bleed photo background with a left-to-right gradient overlay (0.85 → 0.35) for legibility.
- Eyebrow + h1 + subtitle + button row.

### Testimonial slider
- Full-width dark photo background at 65% opacity.
- Auto-rotates every 6.5s; circular avatar with 4px accent border; quote in italic; orange location subtitle; prev/next icon buttons; dot indicators (current = wide pill).

## Page Patterns
1. Hero (photo background)
2. Intro tagline (white)
3. "Professional Home Services" 3-up benefits row (surface)
4. Services grid 10 photo-cards (white)
5. "Why Choose Master Decker?" dark photo section
6. Recent Projects 3-up (white)
7. View Our Project Gallery 3×3 (surface)
8. Get Started Today 3 numbered steps (white)
9. Testimonial slider (dark photo)
10. Service Areas — 6 city cards (white)
11. FAQ accordion (surface)
12. Final CTA on dark photo

## Imagery
- Photography only. No illustrations or icon-only cards.
- Real masterdecker.com photos pulled from the WP CDN (`/wp-content/uploads/2024/05/...`):
  - `wp-deck-railing.jpg`, `wp-deck-building.jpg`, `wp-heated-driveway.jpg`, `wp-boat-dock.jpg`, `wp-cedar-shake.jpg`, `wp-backyard-deck.jpg`, `wp-stamped-concrete.jpg`, `wp-stamped-concrete-2.jpg`, `wp-arbor.jpg`, `wp-deck-tree.jpg`, `wp-pergola-swing.jpg`, `wp-deckbuilding.jpg`, `wp-combo.jpg`, `wp-cedar-deck.jpg`, `wp-deck-stained-cedar.jpg`, `wp-project-1.jpg`..`wp-project-5.jpg`.
  - Original favorites: `pergola.jpg`, `fence.jpg`, `gazebo.jpg`, `testimonial-1.webp`, `testimonial-2.webp`, `testimonial-3.jpg`.
- Logo: `logo.png` (dark on light) + `logo-white.png` (white on dark) — original WP assets.
- Favicon: `favicon.png` from `/wp-content/uploads/2024/04/cropped-MD_512x512_icon-150x150.png`.
- Cities are stock photos (Unsplash) — no real photos available for region cards.

## Content Style
- **Voice**: confident, trade-direct. Sentences like "We can help" and "We treat every project as if it were our own."
- **CTAs**: short imperative phrases ("Request Quote", "More About Us", "See More", "Get a FREE Quote"). Uppercase tracked.
- **Headings**: H1 names the company or page; H2 starts a section; H3 names a card.
- **Section eyebrows**: short 1–3 word labels above H2 ("What We Do", "Why Choose Us", "How It Works", "Where We Work").

## Agent Build Instructions
1. Use Tailwind CSS v4 with the design tokens in `src/app/globals.css`.
2. Wrap each page with `<Header />` and `<Footer />`; mount `<MobileFab />` for the sticky tel: call button.
3. For every page hero, render the shared `<Hero>` component (`src/components/hero.tsx`) with one of the `/images/wp-*.jpg` photos as `background`.
4. Service cards: photo-bg `<Link>` styled with `.svc-card / .svc-card-bg / .svc-card-overlay / .svc-card-content`.
5. Body copy stays on white; alternate to `--surface` for section rhythm.
6. Dark sections always use `bg-[var(--ink)] text-white` with a photo backdrop at `opacity-30` + a `black/75` overlay.
7. Buttons go through the global `.btn-primary` / `.btn-outline` / `.btn-ghost-light` classes — do not re-style ad-hoc.
8. All form submissions POST to `/api/contact` which: verifies Cloudflare Turnstile, inserts into Supabase `masterdecker_quote_requests`, then emails `service@masterdecker.com` via Resend.

## Rerun Inputs
workflow: firecrawl-website-design-clone
source_url: https://masterdecker.com
target_stack: Next.js 16 + Tailwind v4 + Supabase + Resend + Cloudflare Turnstile
output: DESIGN.md
