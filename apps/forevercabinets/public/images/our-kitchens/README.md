# Our Kitchens — Customer install photos

**Drop photos in this folder** and they'll appear automatically on the website. No
deploy or config needed — just commit and push (or upload via your hosting provider).

## How to add a photo

1. Add a JPEG, PNG, or WebP file to this folder. Example: `lawrence-park-toronto.jpg`
2. The file shows up automatically in three places:
   - `/our-kitchens` — the gallery page (created automatically)
   - `/about` — a "Kitchens we've built" strip
   - The homepage — bottom section above the footer

## Filename tips

- Use kebab-case: `client-or-location.jpg`, e.g. `oakville-condo.jpg`
- The filename (without extension) becomes the photo caption — `lawrence-park-toronto.jpg` →
  "Lawrence Park, Toronto"
- Use `.webp` if you want smaller files. JPEG, PNG also fine.

## Sizing

- **Landscape recommended** (1600×1200 or similar 4:3 / 3:2 ratio)
- Aim for **under 800 KB per photo** — use squoosh.app or tinypng.com to compress before
  uploading
- Photos are auto-served at AVIF/WebP for modern browsers

## Examples

```
public/images/our-kitchens/
├── README.md                       (this file)
├── lawrence-park-toronto.jpg       (auto-captioned: "Lawrence Park, Toronto")
├── oakville-condo-galley.webp      (auto-captioned: "Oakville Condo Galley")
└── burlington-l-shape.jpg
```
