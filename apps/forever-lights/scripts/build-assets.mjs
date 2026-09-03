// Builds brand assets + optimized photos with blur placeholders.
// Run from apps/forever-lights:  node scripts/build-assets.mjs
// Inputs: the "Forever Lights Logo Design" PNG set (LOGO_DIR) + photo masters listed below.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LOGO_DIR = process.env.LOGO_DIR ?? path.join(ROOT, 'brand-source'); // the supplied 'Forever Lights Logo Design' PNG set
const MEDIA = 'C:/Users/Matt/Documents/Claude/Projects/Website Building/media/tracked-led-lights';
const PUB = path.join(ROOT, 'public/images');
const BRAND = path.join(PUB, 'brand');
const PHOTOS = path.join(PUB, 'photos');
fs.mkdirSync(BRAND, { recursive: true });
fs.mkdirSync(PHOTOS, { recursive: true });

// ── Logo lockups (trim transparent padding, resize, keep alpha) ──
const logos = [
  ['horizontal-notagline-ink.png', 'logo-horizontal.png', 720],
  ['horizontal-notagline-white.png', 'logo-horizontal-white.png', 720],
  ['horizontal-white.png', 'logo-horizontal-tagline-white.png', 960],
  ['horizontal-ink.png', 'logo-horizontal-tagline.png', 960],
  ['stacked-ink.png', 'logo-stacked.png', 720],
  ['stacked-white.png', 'logo-stacked-white.png', 720],
  ['mark-ink.png', 'mark.png', 512],
  ['mark-white.png', 'mark-white.png', 512],
];
for (const [src, out, width] of logos) {
  const info = await sharp(path.join(LOGO_DIR, src))
    .trim({ threshold: 8 })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND, out));
  console.log('brand', out, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}

// ── Favicons / app icons ──
const APP = path.join(ROOT, 'src/app');
await sharp(path.join(LOGO_DIR, 'avatar-light.png')).resize(512, 512).png().toFile(path.join(APP, 'icon.png'));
await sharp(path.join(LOGO_DIR, 'avatar-dark.png')).resize(180, 180).png().toFile(path.join(APP, 'apple-icon.png'));
console.log('icons written');

// ── OG default image: darkened hero photo + white tagline lockup ──
const ogBg = await sharp(path.join(MEDIA, 'home-warm-white-christmas.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.55 })
  .toBuffer();
const ogLogo = await sharp(path.join(LOGO_DIR, 'horizontal-white.png')).trim({ threshold: 8 }).resize({ width: 640 }).png().toBuffer();
const ogLogoMeta = await sharp(ogLogo).metadata();
await sharp(ogBg)
  .composite([{ input: ogLogo, left: Math.round((1200 - ogLogoMeta.width) / 2), top: Math.round((630 - ogLogoMeta.height) / 2) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUB, 'og-default.jpg'));
console.log('og-default.jpg written');

// ── Photos: master → ≤1600px webp (hero 1920) + blur placeholder manifest ──
const photos = [
  { key: 'hero-winter', src: path.join(MEDIA, 'home-warm-white-christmas.jpg'), slug: 'permanent-christmas-lights-red-white-snowy-two-storey-home', alt: 'Two-storey home in fresh snow at night outlined in red and warm white permanent Christmas lights along every roofline - permanent LED lighting by Forever Lights, Southwestern Ontario', caption: 'Red & warm white, midwinter', tags: ['hero', 'christmas', 'winter'], max: 1920 },
  { key: 'blue-bungalow', src: path.join(PUB, 'hero-home-1.jpg'), slug: 'permanent-led-lights-blue-bungalow-halloween-london-ontario', alt: 'Bungalow with white siding lit in blue by permanent LED soffit lights at night, pumpkins on the porch - permanent lighting installation in London, Ontario', caption: 'Blue for Halloween, London ON', tags: ['real', 'halloween'] },
  { key: 'pink-stone', src: path.join(PUB, 'hero-home-2.jpg'), slug: 'permanent-led-lights-pink-stone-home-gable-london-ontario', alt: 'Stone and brick home with a steep black gable outlined in soft pink permanent LED lights at night - permanent roofline lighting in London, Ontario', caption: 'Soft pink on stone & timber', tags: ['real', 'accent'] },
  { key: 'rainbow-2728', src: path.join(PUB, 'example-3.jpg'), slug: 'permanent-led-holiday-colour-theme-multicolour-two-storey-home', alt: 'Large two-storey home with dormers washed in red, green and white permanent LED holiday lighting under a starry sky', caption: 'Christmas multicolour theme', tags: ['christmas'] },
  { key: 'warm-white-night', src: path.join(PHOTOS, 'permanent-led-roofline-lights-warm-white-night.webp'), slug: 'permanent-led-roofline-lights-warm-white-night', alt: 'Warm white permanent LED roofline lights outlining a two-storey home at dusk - year-round architectural lighting by Forever Lights', caption: 'Warm white, every night', tags: ['real', 'accent', 'hero'] },
  { key: 'daytime-grey', src: path.join(PHOTOS, 'permanent-led-soffit-lights-grey-home-daytime.webp'), slug: 'permanent-led-soffit-lights-grey-home-daytime', alt: 'Grey two-storey home in daylight showing how the permanent LED track disappears against the soffit and fascia', caption: 'Invisible by day', tags: ['real', 'daytime'] },
  { key: 'red-white-night', src: path.join(PHOTOS, 'permanent-led-lights-red-white-night.webp'), slug: 'permanent-led-lights-red-white-night', alt: 'Permanent LED lights alternating red and white along the gables and eaves of a home at night - Christmas preset by Forever Lights', caption: 'Classic red & white', tags: ['real', 'christmas'] },
  { key: 'purple-craftsman', src: path.join(PHOTOS, 'permanent-led-lights-purple-craftsman-home.webp'), slug: 'permanent-led-lights-purple-craftsman-home', alt: 'Craftsman-style cedar shake home with purple permanent LED lights along the rooflines at night', caption: 'Purple on cedar shake', tags: ['real', 'accent'] },
  { key: 'technician', src: path.join(PHOTOS, 'professional-permanent-lighting-installation-technician.webp'), slug: 'professional-permanent-lighting-installation-technician', alt: 'Forever Lights technician installing a permanent LED lighting controller under the soffit of a home', caption: 'Professional installation', tags: ['real', 'install'] },
  { key: 'track-closeup', src: path.join(PHOTOS, 'permanent-led-track-closeup-purple-rgb.webp'), slug: 'permanent-led-track-closeup-purple-rgb', alt: 'Close-up of a black aluminum permanent LED track with purple RGB light pucks mounted under an eave', caption: 'Track & RGB puck detail', tags: ['real', 'detail'] },
  { key: 'canada-day-barn', src: path.join(MEDIA, 'home-red-canada-day.jpg'), slug: 'permanent-led-lights-red-white-canada-day-commercial-building', alt: 'Steel-clad commercial building and shop outlined in red and white permanent LED lights at night - commercial permanent lighting', caption: 'Red & white, commercial', tags: ['commercial', 'canada-day'] },
  { key: 'bungalow-rainbow', src: path.join(MEDIA, 'home-rainbow-multicolour.jpg'), slug: 'permanent-led-lights-rainbow-bungalow-night', alt: 'Bungalow with vinyl siding washed in a flowing rainbow gradient from permanent LED roofline lights at night', caption: 'Rainbow chase effect', tags: ['themes', 'trio'] },
  { key: 'bungalow-pink', src: path.join(MEDIA, 'home-pink-magenta.jpg'), slug: 'permanent-led-lights-pink-bungalow-valentines', alt: "The same bungalow lit entirely in magenta pink by permanent LED lights - a Valentine's Day colour theme", caption: "Magenta for Valentine's", tags: ['themes', 'trio'] },
  { key: 'bungalow-warm', src: path.join(MEDIA, 'home-warm-white-twilight.jpg'), slug: 'permanent-led-lights-warm-white-bungalow-twilight', alt: 'The same bungalow at twilight with a soft warm white glow from permanent LED soffit lights - everyday architectural lighting', caption: 'Warm white, every day', tags: ['themes', 'trio', 'accent'] },
  { key: 'daytime-brown', src: path.join(MEDIA, 'home-daytime-track-hidden.webp'), slug: 'home-exterior-daytime-permanent-lighting-track-hidden', alt: 'Brown two-storey home with stone accents in daylight, permanent LED track colour-matched and hidden along the eaves', caption: 'Track hidden in daylight', tags: ['daytime'] },
  { key: 'green-barn', src: path.join(MEDIA, 'home-green-roofline.jpg'), slug: 'permanent-led-lights-green-roofline-country-home', alt: 'Country home and attached shop with every roofline outlined in green permanent LED lights at night', caption: "Green for St. Patrick's", tags: ['themes', 'commercial'] },
  { key: 'puck-closeup', src: path.join(MEDIA, 'detail-led-pucks-closeup.jpg'), slug: 'permanent-led-soffit-lights-warm-white-closeup-winter', alt: 'Close-up of warm white permanent LED soffit lights glowing under a snow-covered eave on a white board-and-batten home', caption: 'Warm white pucks up close', tags: ['detail', 'winter'] },
  { key: 'cottage', src: path.join(MEDIA, 'home-cottage-evening.jpg'), slug: 'permanent-led-lights-warm-white-backyard-cottage-evening', alt: 'Backyard view of a bungalow at dusk with warm white permanent LED lights along the roofline above a patio and garden', caption: 'Warm white over the patio', tags: ['accent'] },
];

const manifest = [];
for (const p of photos) {
  const out = path.join(PHOTOS, p.slug + '.webp');
  const max = p.max ?? 1600;
  const base = sharp(fs.readFileSync(p.src)).rotate(); // buffer: source may equal destination
  const meta = await base.metadata();
  const landscape = (meta.width ?? 0) >= (meta.height ?? 0);
  const resized = base.resize(landscape ? { width: max, withoutEnlargement: true } : { height: Math.min(max, 1600), withoutEnlargement: true });
  const tmp = out + '.tmp';
  const info = await resized.webp({ quality: 78, effort: 5 }).toFile(tmp);
  fs.renameSync(tmp, out);
  const blur = await sharp(out).resize(16).webp({ quality: 40 }).toBuffer();
  manifest.push({
    key: p.key,
    src: `/images/photos/${p.slug}.webp`,
    alt: p.alt,
    caption: p.caption,
    tags: p.tags,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  });
  console.log('photo', p.slug, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
fs.writeFileSync(path.join(ROOT, 'src/content/photos.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('photos.json written with', manifest.length, 'entries');
