# Resonate Lighting — Brand Guide

**Tagline:** Lighting that listens.
**What we are:** music-reactive, permanent and seasonal pixel lighting kits for commercial spaces, BIAs and municipalities, installed anywhere in Canada from a home base in Saskatchewan.

## 1. The mark

Three vertical bars (a sound wave) resolve left-to-right into a 3×3 grid of pixels that grow brighter and larger as they go — sound becoming light. The gradient runs warm (Resonant `#FF9A3C`) to cool (`#4CC9F0`) in the same left-to-right direction so the gradient itself tells the story.

Files in this folder:

| File | Use |
|---|---|
| `resonate-mark.svg` | Square mark. Favicon, app icon, avatar, small sizes. |
| `resonate-logo.svg` | Horizontal wordmark + mark for dark backgrounds (site header, OG image). |
| `resonate-logo-light-bg.svg` | Same lockup with deeper accent stops and ink text for white/paper backgrounds (invoices, print). |
| `export.mjs` | Regenerates PNGs into `../public/images/brand/` (`npm run brand:export`). |

Exports (in `public/images/brand/`): `resonate-mark-512.png`, `resonate-mark-192.png`, `resonate-mark-32.png`, `resonate-logo-1200.png`, `og-resonate-lighting.png` (1200×630). `app/icon.png` and `app/apple-icon.png` are generated from the same source.

**Clear space:** keep at least the height of one wave bar (about 1/4 of the mark height) clear on all sides.
**Minimum size:** mark 24 px; lockup 140 px wide. Below that, use the mark alone.
**Do not:** recolour the mark to a single flat colour (except pure white or ink for one-colour print), stretch it, rotate it, add drop shadows beyond the soft glow used in the site header, or place it on a busy photo without an ink scrim.

## 2. Colour

Dark-mode first. The base is a deep charcoal-navy (`ink #0B0F1A`), never pure black, so lit pixels have something to glow against.

| Role | Name | Hex |
|---|---|---|
| Background | ink | `#0B0F1A` |
| Alt background | ink-800 | `#101627` |
| Panels | ink-700 | `#161E33` |
| Cards / fields | surface | `#141B2E` |
| Secondary surface | surface-200 | `#1C2540` |
| Borders | line | `#2A3454` |
| **Primary accent (warm)** | **resonant** | **`#FF9A3C`** |
| Warm hover / on light | resonant-600 | `#F26B1D` |
| **Secondary accent (cool)** | **cool** | **`#4CC9F0`** |
| Cool on light | cool-600 | `#1A9FD0` |
| Headings / primary text | foreground | `#F4F6FB` |
| Body text | muted-strong | `#BAC3DB` |
| Captions / labels | muted | `#8E98B4` |

Signal colours (`pixel-red #FF3B5C`, `pixel-green #3DDC84`) exist only for theme swatches, the demo and status, never layout.

**Usage rules**

1. Warm leads, cool answers. Aim for roughly 70/30 resonant-to-cool on any screen. CTAs are always warm.
2. One gradient element per viewport: the mark, *or* a CTA, *or* one highlighted word in a heading.
3. Body copy is never set in an accent colour. Accents are for eyebrows, links, icons, chips and buttons.
4. Contrast: 4.5:1 minimum for body, 3:1 for display text and UI chrome. `resonant` on `ink` passes for large text and UI; use `foreground` for small text.
5. Photos sit on an ink scrim (`rgba(11,15,26,.55–.9)`) so lit pixels, not the facade, carry the image.

## 3. Typography (Google Fonts)

- **Display / headings: Sora**, weights 600–800. Tight letter-spacing (−0.02em to −0.025em), line-height 1.05. Geometric and a little technical, like a controller front panel.
- **Body / UI: Inter**, weights 400–600. Line-height 1.6–1.75 for body. Labels and eyebrows in 600 uppercase with +0.14–0.18em tracking.

Loaded with `next/font/google` and `display: "swap"`. Never import via CSS `@import` or `<link>`.

Scale: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72 px. Headlines use sentence case. Product names (Starter, Business, Municipal Package; Light Show app) are capitalised.

## 4. Voice

Plain, confident, specific. Say what the hardware is (Raspberry Pi 5 Light Show engine with LedFx, USB microphone, pixel controller, 12 V WS2811 props) and only describe features the Light Show app really has. Prices are premium and published as starting prices in CAD, plus tax, installation extra; every price comes from `src/lib/pricing.ts`, never typed into copy.

Words we use: *reactive, synchronized, show, mode, theme, prop, roofline, mega tree, singing tree, pixel.*
Words we avoid: *smart, revolutionary, cutting-edge, solution, seamless.*

## 5. Imagery

Night photography of real installations, wide enough to show the building and the lit prop together. Until real photos exist, the site's own live 3D renders fill each media slot (`src/content/media-slots.json`), labelled as renders. Never use photos or video of someone else's display or copied from another company's site; stock only from Pexels, Unsplash or Pixabay, logged in `MEDIA-CREDITS.md`.
