# DESIGN.md: Celebrate Lighting — night-first conversion redesign

- **Reference:** https://www.horizonlightingfl.com/
- **Shipped to code:** 2026-07-31 (local; not yet deployed)
- **Supersedes:** an earlier FBP-inspired refresh (2026-05-25) that was
  documented and component-scaffolded but never wired into any page. Its
  `OfferBanner.tsx` was removed; `AwardBadges.tsx` remains unused.

## The problem being solved

The site wasn't converting. Three root causes, in order of impact:

1. **No differentiated offer.** Every CTA said "Get Your Free Quote" — the
   same words as every competitor. Nothing answered "why you".
2. **The gallery contradicted the pitch.** Captions described roofline
   installs; the actual photos were park trees, commercial hedging, a mall
   Christmas tree, and a lobby shot with install debris on the floor. A
   homeowner shopping for roofline lighting saw none of it.
3. **One form, at the bottom.** The only lead capture on the homepage sat
   below nine sections.

## The spine: one offer, everywhere

Celebrate Lighting does free **on-site demos** — they come out, colour-match
the soffit, mount a live sample section on the actual house, and turn it on
before the customer pays anything. Competitors don't. So that promise is now
the site's spine.

It lives in `src/lib/site.ts` under `site.demo` (`cta`, `ctaLong`, `promise`,
`detail`, `short`). **Change the wording there and it changes everywhere** —
the promise can never drift page to page. Placements:

announcement bar → header button → hero H1 + form → promise strip → "why us"
accordion → interstitial quote → step 02 of How It Works → gallery CTA →
FAQ #1 → closing CTA → footer strip. Phone appears on every screen.

## Visual direction: dark, because the product is light

The product only exists after dark, so a white minimalist theme was fighting
it. The canvas is now near-black navy and the brand colours read as *emitted
light* rather than flat fills.

### Tokens (`app/globals.css`)

| Token | Value | Role |
|---|---|---|
| `--deep` | `#05080f` | hero / CTA / footer photo beds |
| `--bg` | `#0a0f1c` | body, section band A |
| `--surface` / `--surface-2` | `#0f1626` / `#141d30` | alternating bands |
| `--panel` / `--panel-2` | `#131c2e` / `#1a2438` | card, card hover |
| `--foreground` | `#eef2f8` | primary text |
| `--muted` | `#93a1b8` | secondary text |
| `--accent` | `#24c1b1` | teal — primary CTA, glow |
| `--accent-ink` | `#0e7c70` | teal **text on white**; `--accent-dark` only hits 3.13:1 there |
| `--gold` | `#e8b600` | stat numbers, eyebrows, secondary CTA |
| `--on-light` | `#0c1220` | text inside white form cards |

**Why the conversion was cheap:** flipping `--foreground` from dark navy to
near-white auto-corrected all ~80 existing `text-[var(--foreground)]` usages.
Only two classes of leftover needed hand-fixing — sections using
`background: var(--foreground)` (which would have become white) and hardcoded
`bg-white` / `#fff`.

### Key classes

- `.btn` — fully pill (`9999px`), 48px min-height. `.btn-primary` is teal
  with a **dark** label (`#04121a`); white-on-teal only reaches 2.25:1.
- `.card` dark panel · `.card-light` white form card (text must use explicit
  `slate-*`, never `--foreground`)
- `.field` — form input, 48px min-height
- `.chip` — city links, 44px min-height (they're real tap targets)
- `.night-veil` / `.night-veil-center` — photo overlays that keep text legible
  without washing the lighting out of the image
- `.hero-drift` — 26s ambient scale drift, disabled under
  `prefers-reduced-motion`

### Type

Poppins 600/700/800 for display (`.font-display`, via `--font-display`),
Inter for body. H1 clamps 2.6rem → 4.2rem.

## Photography: the real constraint

Only 4 of the original 9 images were permanent roofline installs on homes.
`projects.json` now carries a `category` field and `GalleryTabs` splits
**Homes** from **Commercial & Municipal** — the commercial work is real, it's
just a different product, and mixing it in read as bait-and-switch. Two weak
shots (mall tree, lobby-with-debris) were dropped from the gallery entirely.

Captions were rewritten from what each photo *actually shows*, verified by
opening every file. Do not write a caption without looking at the image.

**Five new photos are pending.** `scripts/add-new-photos.mjs` verifies,
files, and wires them into `projects.json` with captions already written —
drop them into `public/images/incoming/` using the names it lists and run it.

## Verified

- 73 routes build clean; typecheck and lint clean (except pre-existing
  CommonJS warnings in `scripts/download-images.js`)
- **16 pages, 0 WCAG AA text-contrast failures**, measured with alpha
  compositing and canvas-normalised colour (Tailwind v4 emits `lab()`, which
  naive parsers mis-read)
- Mobile 375px: no horizontal scroll, 0 touch targets under 44px
- Hero form ordered above the stat row on mobile so it isn't a screen down

## Gotcha

Turbopack served a **stale `globals.css`** across two dev-server restarts —
new tokens appeared but an edited `.chip` rule did not. `rm -rf .next` fixed
it. If a CSS change appears not to apply, verify against the served bundle
before assuming the source is wrong.

## Not done

- Not deployed (batch it with other work — build minutes)
- Turnstile still on test keys (`1x00000000000000000000AA`); needs a real
  widget or the shared MD-NN key per the root CLAUDE.md
- `award-badge.tsx` in the footer claims a 2026 award for **Oakville**, which
  isn't in the service area — worth checking
- No Google review count/rating is shown anywhere; per Matt, current
  testimonials stay as unattributed quotes with no invented numbers

## Update 2026-07-31 (later): split into two service lines

The site now sells **two distinct products to two distinct audiences** rather
than funnelling everyone at permanent lighting.

| | Permanent | Seasonal |
|---|---|---|
| Product | Colour-matched LED track in the soffit, app-controlled | Classic large-bulb C9 on the roof edge |
| Lifecycle | Installed once, up year-round | Installed Oct–Nov, removed January |
| Offer | Free on-site demo (`site.demo`) | Early-bird booking (`site.seasonal`) |
| Accent | Teal `--accent` | Gold `--gold` |
| Pricing | One-time, $2,500–$8,000 | Per season; **rent or buy** the lights |

**The two offers are deliberately different.** You can't meaningfully demo a
C9 roofline the way you can mount a live permanent sample, and seasonal buying
is deadline-driven — so seasonal leads on booking early, not on a demo. Keep
"demo" language exclusive to permanent or the two blur together. Both offers
live in `src/lib/site.ts` (`site.demo`, `site.seasonal`).

### Routes added (+21 pages, 73 → 94)

```
/permanent-lighting              /seasonal-lighting
/permanent-lighting/commercial   /seasonal-lighting/commercial
/permanent-lighting/[city] ×8    /seasonal-lighting/[city] ×8
/commercial                      (hub linking both commercial pages)
```

Nothing was removed — `/services/*` and the 40 service+city pages are
untouched, so no existing SEO equity or redirect was disturbed.

### Architecture

All 20 line pages render from **one content file**, `src/content/service-lines.json`,
through three shared shells:

- `ServiceLinePage.tsx` — the pillar shell. Both lines get identical depth and
  section rhythm; `extraSections` injects what only one line needs (permanent:
  hardware specs + 12-months-of-uses; seasonal: season timeline + rent-vs-buy).
  Sharing the shell is what stops either line becoming the poor relation.
- `CommercialLinePage.tsx` — B2B/public-sector shell. Different reader, so the
  proof points are insurance, WSIB, tender documents and hitting the opening
  date — not warranties and app colours. Uses the full `QuoteForm` because
  commercial enquiries need the message field for scope.
- `LineCityPage.tsx` — per-line city pages. Uniqueness comes from the
  `localContext` prose already written per city in `service-areas.json`, so
  these aren't thin duplicates.

`ServiceLineFork.tsx` is the two-path chooser, on the homepage (right below the
promise strip) and on all 8 `/service-areas/[city]` pages with localised copy.
`LineComparison.tsx` renders at `#compare` on both pillar pages and dims the
column you're already on — the table exists to catch people on the *wrong*
page, not to re-sell the right one.

### Commercial keyword coverage

Parks, municipalities and downtown BIAs, drive-through light shows, charity
events and fundraisers, retail plazas and storefronts, car dealerships,
restaurants, office parks, civic buildings, multi-site/franchise rollouts,
parades, tree lightings, winter markets and rinks.

### Photography gap — the seasonal line has none

Every roofline photo in the library is **permanent track**. There is no honest
C9 photograph, so the seasonal hero and fork card use `SeasonalBackdrop.tsx` /
an inline C9 swag illustration instead. This is deliberate: dressing a
permanent-track photo up as C9 would repeat the exact mislabelling this
redesign set out to fix. **Replace with real C9 photos as soon as any exist** —
this is the single biggest remaining content gap.

### Also fixed in this pass

- `jsonld.ts` was emitting `aggregateRating` with an invented
  `reviewCount: "27"` on every page. Fabricated review markup is a Google
  manual-action risk and contradicted the "no invented numbers" call —
  **removed from both** `localBusinessSchema` and `reviewsSchema`.
- Homepage metadata and hero now earn both keyword sets; "christmas light
  installation" is a larger search than anything on the permanent side.
- `QuoteFormCompact` gained `serviceValue` / `submitLabel` / `reassurance` /
  `successTitle` / `successBody` props so seasonal leads land in the CRM tagged
  `Seasonal C9 Lighting` and never get promised a demo.

### Verified (second pass)

- 94 routes build clean; typecheck and lint clean (bar the pre-existing
  CommonJS warnings in `scripts/download-images.js`, which are correct at
  runtime — that file is CJS and the rule is misconfigured for it)
- **11 pages re-audited, 0 WCAG AA contrast failures.** Caught one real
  regression: footer `perm`/`xmas` micro-links at `--muted/70` hit 4.21:1.
  They were cryptic anyway, so they were removed — the pillar pages already
  link every city, which is the correct hub-and-spoke shape.
- Mobile 375px: no horizontal scroll on any new template, 0 touch targets
  under 44px. Note: measuring inside an iframe reports false overflow because
  the scrollbar shrinks `clientWidth` to 360 — verify at a real viewport.
- All 21 new URLs present in `sitemap.xml` (89 total), each with a unique
  title targeting a distinct keyword set

### Seasonal content still needing Matt's input

- `site.seasonal.deadline` is **"September 30" — update it each year.**
- `site.seasonal.discountNote` is intentionally **empty**. The copy reads
  correctly without it; only put a figure there if it's a real, honoured
  discount.
- No dollar figures anywhere on the seasonal side — the pricing section
  explains what drives cost instead. Add real per-season ranges when known.
