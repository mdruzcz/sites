// node scripts/build-c9-colours.mjs [outDir]
// Cut the centre (red) C9 bulb out of the real group photo with a hue-keyed,
// row-filled mask (drops the neighbouring blue/green bulbs), then hue-shift it
// into each catalogue colour. Output: transparent 900x900 webp per colour.
import sharp from 'sharp';
import fs from 'node:fs';
const src = 'public/images/products/c9-multi.jpg';
const OUT = process.argv[2] ?? 'public/images/products';
const SHEET = 'C:/Users/Matt/AppData/Local/Temp/claude/C--Users-Matt-Documents-Claude-Projects-Website-Building/8988ffeb-6479-47a0-ad68-fa0cd054b26b/scratchpad/c9/sheet7.jpg';

const box = { left: 232, top: 64, width: 134, height: 480 };
const { data, info } = await sharp(src).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;

function hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b); const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min; const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h; if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)); else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
  return [h * 60, s, l];
}
const mark = new Uint8Array(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4; const [h, s, l] = hsl(data[i], data[i + 1], data[i + 2]);
  const red = (h < 25 || h > 335) && s > 0.3 && l > 0.08;
  const dark = l < 0.62 && s < 0.35;            // metal base, shadow lines
  const glow = s > 0.3 && !(h > 70 && h < 262); // saturated but not the blue/green neighbours
  if (red || dark || glow) mark[y * W + x] = 1;
}
// row fill between the first and last marked pixel, with a small horizontal trim so
// anti-aliased neighbour fringe does not sneak in.
const out = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  // keep only the marked run that contains the column centre (the front bulb),
  // bridging gaps of up to GAP px so specular highlights do not split it
  const GAP = 7; const cx = Math.round(W / 2);
  let a = -1, b = -1;
  if (!mark[y * W + cx]) { let found = -1; for (let d = 1; d <= GAP; d++) { if (mark[y * W + cx - d]) { found = cx - d; break; } if (mark[y * W + cx + d]) { found = cx + d; break; } } if (found < 0) continue; a = b = found; } else { a = b = cx; }
  for (let x = a - 1, gap = 0; x >= 0; x--) { if (mark[y * W + x]) { a = x; gap = 0; } else if (++gap > GAP) break; }
  for (let x = b + 1, gap = 0; x < W; x++) { if (mark[y * W + x]) { b = x; gap = 0; } else if (++gap > GAP) break; }
  // trim pale, low-saturation fringe (neighbour bulb outlines) off both ends of the run
  // in the glass zone only saturated red counts as an edge (thin dark streaks are neighbour outlines)
  const glass = y < H * 0.66;
  const strong = (x) => { const i = (y * W + x) * 4; const [h, s2, l2] = hsl(data[i], data[i + 1], data[i + 2]); return ((h < 25 || h > 335) && s2 > 0.4 && l2 < 0.9) || (!glass && l2 < 0.45); };
  while (a < b && !strong(a)) a++;
  while (b > a && !strong(b)) b--;
  if (b - a < 3) continue;
  // the metal base is narrower than the glass; clamp socket-zone rows to the centre
  if (y > H * 0.66) { a = Math.max(a, cx - 30); b = Math.min(b, cx + 30); }
  for (let x = a; x <= b; x++) { const i = (y * W + x) * 4; out[i] = data[i]; out[i + 1] = data[i + 1]; out[i + 2] = data[i + 2]; out[i + 3] = 255; }
}
// soften the alpha edge slightly
const cut = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const blurredAlpha = await sharp(cut).extractChannel(3).blur(0.8).toBuffer();
const rgb = await sharp(cut).removeAlpha().toBuffer();
const soft = await sharp(rgb).joinChannel(blurredAlpha).png().toBuffer();

const colours = [
  ['red', 0, 1.0, 1.0], ['orange', 26, 1.05, 1.03], ['yellow', 50, 1.05, 1.1], ['green', 118, 0.95, 0.98],
  ['blue', 222, 1.0, 0.95], ['purple', 270, 0.95, 0.97], ['pink', 320, 0.95, 1.05],
];
const tiles = []; let n = 0;
for (const [name, hue, sat, bri] of colours) {
  const bulb = await sharp(soft).modulate({ hue, saturation: sat, brightness: bri }).resize({ height: 760 }).toBuffer();
  const m = await sharp(bulb).metadata();
  const file = `${OUT}/c9-${name}.webp`;
  await sharp({ create: { width: 900, height: 900, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: bulb, left: Math.round((900 - m.width) / 2), top: 70 }])
    .webp({ quality: 88, effort: 5 }).toFile(file);
  tiles.push({ input: await sharp(file).flatten({ background: '#faf7f1' }).resize(200, 200).toBuffer(), left: 10 + n * 210, top: 10 });
  n++; console.log('wrote', file);
}
await sharp({ create: { width: 10 + colours.length * 210, height: 220, channels: 3, background: '#ffffff' } }).composite(tiles).jpeg({ quality: 85 }).toFile(SHEET);
console.log('sheet', SHEET);
