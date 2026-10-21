// Regenerate brand PNGs from the SVG sources. Run from apps/resonate-lighting: node brand/export.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "public", "images", "brand");
const appDir = join(here, "..", "app");
mkdirSync(out, { recursive: true });

const mark = readFileSync(join(here, "resonate-mark.svg"));
const logo = readFileSync(join(here, "resonate-logo.svg"));
const INK = { r: 11, g: 15, b: 26, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

async function markPng(size, file, bg = false) {
  const pad = Math.round(size * 0.12);
  const inner = size - pad * 2;
  const buf = await sharp(mark, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: CLEAR })
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg ? INK : CLEAR } })
    .composite([{ input: buf, left: pad, top: pad }])
    .png()
    .toFile(file);
}

await markPng(512, join(out, "resonate-mark-512.png"));
await markPng(192, join(out, "resonate-mark-192.png"));
await markPng(32, join(out, "resonate-mark-32.png"));
await markPng(512, join(appDir, "icon.png"), true);
await markPng(180, join(appDir, "apple-icon.png"), true);

await sharp(logo, { density: 300 }).resize({ width: 1200 }).png().toFile(join(out, "resonate-logo-1200.png"));

// OG image 1200x630: ink background, soft glows, a sound-wave footer, lockup centred, tagline below.
const bars = Array.from({ length: 40 }, (_, i) => {
  const x = 80 + i * 27;
  const h = 8 + Math.abs(Math.sin(i * 0.55)) * 60;
  const fill = i % 3 === 0 ? "#4CC9F0" : "#FF9A3C";
  const op = (0.25 + (i / 40) * 0.6).toFixed(2);
  return `<rect x="${x}" y="${560 - h}" width="10" height="${h}" rx="5" fill="${fill}" opacity="${op}"/>`;
}).join("");

const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="25%" cy="20%" r="60%"><stop offset="0" stop-color="#FF9A3C" stop-opacity="0.35"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="85%" cy="90%" r="60%"><stop offset="0" stop-color="#4CC9F0" stop-opacity="0.30"/><stop offset="1" stop-color="#4CC9F0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0B0F1A"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g opacity="0.9">${bars}</g>
  <text x="600" y="420" text-anchor="middle" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="30" font-weight="500" fill="#BAC3DB">Music-reactive pixel lighting kits for commercial spaces · Ontario</text>
</svg>`);

const lockup = await sharp(logo, { density: 300 }).resize({ width: 780 }).png().toBuffer();
await sharp(bg)
  .composite([{ input: lockup, left: 210, top: 190 }])
  .png()
  .toFile(join(out, "og-resonate-lighting.png"));

console.log("brand exports written to", out);
