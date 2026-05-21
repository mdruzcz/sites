# Ontario Light Shows — Media Uploads

Drop your photos and videos here. We'll optimize them on the next deploy.

## Where to put what

### Required (the home + case study pages reference these by exact filename)

| Filename | Used on | Suggested specs |
|---|---|---|
| `placeholder-experiential.svg` → replace with `experiential.jpg` | `/services/experiential-lighting`, home services grid | 1600×1000, JPG or WebP |
| `placeholder-architectural.svg` → `architectural.jpg` | `/services/architectural-accenting` | 1600×1000 |
| `placeholder-rgb.svg` → `rgb.jpg` | `/services/rgb-architectural-lighting` | 1600×1000 |
| `placeholder-immersive.svg` → `immersive.jpg` | `/services/immersive-light-displays` | 1600×1000 |
| `placeholder-holiday.svg` → `holiday.jpg` | `/services/permanent-holiday-lighting` | 1600×1000 |
| `placeholder-blenheim-hero.svg` → `blenheim-hero.jpg` | Blenheim case study hero | 2400×1350, dark, dramatic |
| `placeholder-blenheim-1.svg` → `blenheim-1.jpg` | Case study gallery 1 | 1200×800 |
| `placeholder-blenheim-2.svg` → `blenheim-2.jpg` | Case study gallery 2 | 1200×800 |
| `placeholder-blenheim-3.svg` → `blenheim-3.jpg` | Case study gallery 3 | 1200×800 |
| `placeholder-blenheim-4.svg` → `blenheim-4.jpg` | Case study gallery 4 | 1200×800 |
| `placeholder-toronto.svg`, `placeholder-ottawa.svg`, `placeholder-kw.svg`, `placeholder-windsor.svg`, `placeholder-hamilton.svg` | Homepage project grid | 1200×1200 (square crops) |

You can also drop videos here. If you do, ping the dev to wire them into the case study page (`/case-studies/blenheim-rotary-christmas-parade`) — they'll be served via `<video>` or YouTube embed.

## How to swap a placeholder for a real photo

1. Drop the new file in this folder (`public/images/uploads/`)
2. Open `src/content/services.json` (or `src/content/case-studies.json` / `projects.json`) and change the `image` path from `placeholder-foo.svg` to your new filename
3. Commit + push — Vercel rebuilds and starts serving the optimized image

## Optimization

The Next.js build already does:
- **AVIF + WebP conversion** (`next.config.ts` images.formats)
- **Responsive sizing** via Next/Image (the `<Image>` component requests the exact size needed)
- **Server-side optimization** via the `sharp` library (already a dependency)

For best results, before you drop a photo here:
- **Strip metadata + resize** large source files to 2400px max width (use [Squoosh](https://squoosh.app/) or [TinyJPG](https://tinypng.com/))
- For Blenheim Christmas Parade footage, JPGs at 2400×1350 land around 200-400 KB after Next.js processes them

## Video

Drop MP4 or WebM files here. Keep them under 25 MB if possible (Vercel free-tier static asset limit per file is 100 MB).

For a hero/case-study background video:
- 1920×1080 minimum
- H.264 codec (.mp4) for broad compatibility
- ~5-10 second loop muted + autoplay friendly
