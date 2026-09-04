// Optimizes the DIY kit component photos into public/images/kits/ and emits a
// blur manifest fragment. Run from apps/forever-lights: node scripts/build-kit-images.mjs
//
// EXCLUDED ON PURPOSE:
//  - the controller shot (carries a ShowHome Lighting logo and model label)
//  - the screw pack shot (branded Reliable retail packaging)
// Both fall back to an icon in the UI until Matt supplies own-brand photos.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = 'C:/Users/Matt/Documents/Claude/Projects/Website Building/media/showhome-products';
const OUT = path.join(ROOT, 'public/images/kits');
fs.mkdirSync(OUT, { recursive: true });

const files = [
  ['24v-led-puck-lights-10-qty.webp', 'rgbw-light-strand'],
  ['aluminum-track-for-12-24v-led-lights-2-qty.webp', 'aluminum-track'],
  ['24v-150w-power-supply.webp', 'power-supply-150w'],
  ['1-foot-connector-for-12-24v-led-lights.webp', 'connector-1ft'],
  ['5-foot-connector-for-12-24v-led-lights.webp', 'connector-5ft'],
  ['10-foot-connector-for-12-24v-led-lights.webp', 'connector-10ft'],
  ['20-foot-connector-for-12-24v-led-lights.webp', 'connector-20ft'],
  ['t-connector-for-12-24v-led-lights.webp', 'light-t-connector'],
  ['t-connector-for-pwr-inj.webp', 'power-t-connector'],
  ['20ft-power-inj-extension-cable.webp', 'power-extension-20ft'],
  ['amplifier-for-12v-led-lights.webp', 'data-amplifier'],
];

const manifest = {};
for (const [src, slug] of files) {
  const inPath = path.join(SRC, src);
  if (!fs.existsSync(inPath)) { console.log('MISSING SOURCE', src); continue; }
  const out = path.join(OUT, slug + '.webp');
  // Flatten onto white so transparent PNG-sourced shots do not go black on the card.
  const info = await sharp(fs.readFileSync(inPath))
    .flatten({ background: '#ffffff' })
    .resize({ width: 900, height: 900, fit: 'contain', background: '#ffffff' })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  const blur = await sharp(out).resize(16).webp({ quality: 40 }).toBuffer();
  manifest[slug] = { src: `/images/kits/${slug}.webp`, width: info.width, height: info.height, blurDataURL: `data:image/webp;base64,${blur.toString('base64')}` };
  console.log('kit image', slug, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
fs.writeFileSync(path.join(ROOT, 'src/content/kit-images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('kit-images.json written with', Object.keys(manifest).length, 'entries');
