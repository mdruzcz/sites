# Forever Lights — design system brief (2026-09 light redesign)

The site moved from a dark navy/gold theme to a **light, clean, editorial** design built around
the new logo (ink chevron + five rainbow dots). Dark is reserved for the hero, "why" section,
CTA bands and the footer.

## Tokens (globals.css, also exposed as Tailwind colours via `@theme inline`)
- Text: `text-ink` (#201e1d), `text-ink-soft` (#3d3a38), `text-muted` (#6f6a66)
- Surfaces: `bg-white`, `bg-soft` (#f7f5f1), `bg-tint` (#fbf7ee warm), `bg-dark` (#171615), `bg-dark-2`
- Lines: `border-line` (#e8e5e0). On dark: `border-white/10`, text `text-white/70`.
- Accent: `bg-accent` / `text-accent` (#f2a900 amber). Use for primary CTAs, stars, small highlights only.
- Dots: `bg-dot-red|dot-amber|dot-green|dot-cyan|dot-purple` (decorative only).
- Fonts: headings use Archivo automatically (h1–h4 / `.font-heading`), body Inter.

## Component classes (globals.css @layer components)
- Buttons: `btn` + one of `btn-primary` (amber), `btn-dark`, `btn-light`, `btn-outline`, `btn-outline-light` (on dark). Sizes `btn-sm` (44px), default 48px, `btn-lg` (56px).
- `eyebrow` (+ `eyebrow-light` on dark) — small uppercase label with a rainbow pill.
- `card` (white, 1px line, rounded-2xl), `card-soft`, `card-dark`.
- `section` (py-16/24), `section-tight`, `wrap` (container + px).
- Forms: `input`, `input-dark`, `label`, `label-dark`. `chip`.
- `prose-fl` wrapper for long-form text.

## React components (src/components)
- `ui.tsx`: `Breadcrumbs({items,light?})`, `SectionHeading({eyebrow,title,sub,align,light,as})`,
  `PageHeader({eyebrow,title,sub,crumbs,children})` (soft grey header band for inner pages),
  `PhotoImg({photo,sizes,priority,className,fill=true,quality})` (next/image with blur),
  `CheckList({items,light})`, `FeatureCard({icon,title,text,dark})`,
  `CtaBand({title,text,photoKey,primaryLabel,primaryHref})` (dark photo CTA — use at the bottom of most pages),
  `ComingSoon()`.
- `icons.tsx`: `Icon.phone|mail|clock|pin|smartphone|eyeOff|snowflake|bolt|shield|card|wrench|building|home|sparkles|palette|check|arrow|chevron|play|file|book|video|download|star|menu|close|ruler|calendar|wifi|leaf|headset` — `<Icon.arrow size={18} />`. **No emoji anywhere.**
- `ServiceIcon.tsx`: `<ServiceIcon slug={service.slug} size={22} />`.
- `Logo.tsx`: `Logo({variant:'ink'|'white', tagline, height})`, `Mark`, `DotArc`, `DotRow`.
- `QuoteForm.tsx`: `<QuoteForm city? tone="light|dark" compact? />`.
- `FinancingCallout.tsx`: `variant="band"|"compact"`.
- `ArticleBody.tsx`: `<ArticleBody blocks={article.body} />` renders resource/support JSON blocks.

## Content (src/lib/site.ts)
- `site, phoneHref, services, serviceAreas, faqs, testimonials, photos, gallery, getPhoto(key), getPhotosByTag(tag), getArea, getService, getNearbyAreas`.
- Photo keys: `hero-winter, blue-bungalow, pink-stone, rainbow-2728, warm-white-night, daytime-grey, red-white-night, purple-craftsman, technician, track-closeup, canada-day-barn, bungalow-rainbow, bungalow-pink, bungalow-warm, daytime-brown, green-barn, puck-closeup, cottage`.
  Each photo: `{key, src, alt, caption, tags, width, height, blurDataURL}`. Always render with `PhotoImg`.
- **Deleted:** `/images/hero-home-*.jpg`, `/images/example-*.jpg`, `/images/logo.svg|jpg`, `gallery.json`. Never reference them.
- Default OG image: `/images/og-default.jpg`. Logo for schema: `/images/brand/logo-stacked.png`.

## Layout rules
- Navbar is **sticky and in-flow** (white). Pages must NOT add `pt-28`/`pt-32` top padding. Start inner pages with `<PageHeader …/>` or a hero section.
- Mobile-first. Every link/button ≥ 44px tall. Use `wrap` for horizontal padding.
- Keep every page's `metadata`, JSON-LD, `revalidate = 3600`, `generateStaticParams`, canonicals and copy intent. Rewrite visuals, not SEO.
- Accordions: native `<details className="group card …"><summary …>` with `Icon.chevron` rotating on `group-open:`.
- Financing facts: **24-month term at 10% APR (on approved credit)**. Remove any "6-month interest-only" claim.
