// Every PDF in public/downloads: the sales set (brochure, cost comparison,
// pricing, FAQ, commercial, lookbook, warranty certificate) and the owner
// documents (quick start guide, care checklist, warranty terms).
//
//   node scripts/build-pdfs.mjs                 → public/downloads/*.pdf + cover thumbnails
//   node scripts/build-pdfs.mjs --only=faq      → one document
//   node scripts/build-pdfs.mjs --png           → also screenshot every page to .pdf-preview/
//
// Prices, kit contents, warranty terms, support guides and photos are read from
// src/content so a PDF can never say something the website does not. Copy that
// only exists here (the cost comparison, commercial pitch) is in this file.
//
// Sales pages are fixed Letter sheets with overflow hidden, and the render
// warns when anything runs into the footer. The owner documents are long and
// flow across pages instead, with Chrome's own header and footer templates; the
// first versions of those PDFs faked running headers in the page body and came
// out with a blank "page" for every header and footer.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(APP, 'public/downloads');
const THUMBS = path.join(APP, 'public/images/downloads');
const HTML_OUT = path.join(APP, '.pdf-preview');

// Puppeteer lives in the Quick Quote app, which already renders dealer bids.
const QQ = path.resolve(APP, '../../../../Quick Quote Calculator/package.json');
const puppeteer = createRequire(QQ)('puppeteer');
const sharp = createRequire(path.join(APP, 'package.json'))('sharp');

const read = (p) => JSON.parse(fs.readFileSync(path.join(APP, 'src/content', p), 'utf8'));
const site = read('site.json');
const kitsData = read('kits.json');
const warranty = read('warranty.json');
const photosRaw = read('photos.json');
const photos = Array.isArray(photosRaw) ? photosRaw : photosRaw.photos;

/* ── facts that are not in the content files ─────────────────────────── */

const FACT = {
  // Both confirmed by Matt 2026-10-01: a 12 V system, rated IP67 by the
  // supplier (the site said IP68 and, in one place, a 24 V supply until then).
  voltage: '12 V',
  ip: 'IP67',
  ipPlain: 'sealed against dust and rated for temporary immersion in water',
  coldC: '−40°C',
  ledHours: '50,000',
};

// From the 2025 season book (qq_app_docs/season-book), read 2026-10-01.
const BOOK = {
  seasonalN: 211, seasonalMedian: 1050, seasonalLow: 800, seasonalHigh: 1600,
  permanentN: 32, permanentMedian: 2880, permanentLow: 2520, permanentHigh: 3600,
  commercialN: 19, commercialLow: 3500, commercialHigh: 10000,
};

const APR = 0.10;
const TERM = 24;
const monthly = (p) => { const r = APR / 12; return (p * r) / (1 - Math.pow(1 + r, -TERM)); };

/* ── helpers ─────────────────────────────────────────────────────────── */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const money = (n, cents = false) =>
  '$' + Number(n).toLocaleString('en-CA', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
const img = (rel) => pathToFileURL(path.join(APP, 'public', rel)).href;
const photo = (key) => {
  const p = photos.find((x) => x.key === key);
  if (!p) throw new Error(`No photo "${key}" in photos.json`);
  return p;
};
// Photos are re-encoded to print resolution first. Embedded as-is, Chrome
// stores each one at full size and the lookbook came out at 25 MB, which is
// over what most mail servers will carry.
const PRINT_DIR = path.join(os.tmpdir(), 'forever-lights-print-images');
fs.mkdirSync(PRINT_DIR, { recursive: true });
await Promise.all(photos.map(async (p) => {
  const src = path.join(APP, 'public', p.src);
  const out = path.join(PRINT_DIR, `${p.key}-${fs.statSync(src).mtimeMs | 0}.jpg`);
  if (!fs.existsSync(out)) {
    await sharp(src).resize({ width: 1500, height: 1500, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  }
  p.printSrc = out;
}));
const photoSrc = (key) => pathToFileURL(photo(key).printSrc).href;
// Product shots are only ever shown about an inch wide.
const KIT_IMG = {};
await Promise.all(kitsData.components.filter((c) => c.image).map(async (c) => {
  const out = path.join(PRINT_DIR, `kit-${c.image}.jpg`);
  if (!fs.existsSync(out)) {
    await sharp(path.join(APP, 'public/images/kits', `${c.image}.webp`)).flatten({ background: '#ffffff' })
      .resize({ width: 360, height: 360, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(out);
  }
  KIT_IMG[c.image] = pathToFileURL(out).href;
}));
const kitImg = (name) => KIT_IMG[name];
const LOGO = img('/images/brand/logo-horizontal-tagline.png');
const LOGO_WHITE = img('/images/brand/logo-horizontal-tagline-white.png');

const ICON = {
  eyeOff: '<path d="M9.9 9.9a3 3 0 1 0 4.2 4.2"/><path d="M10.7 5.1A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13 13 0 0 1-1.7 2.7"/><path d="M6.6 6.6A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M2 2l20 20"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  ladderOff: '<path d="M8 3v18M16 3v18M8 8h8M8 13h8M8 18h8"/><path d="M3 3l18 18"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  snow: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/>',
  bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z"/><path d="M14.5 12.5l2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  home: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  palette: '<circle cx="12" cy="12" r="10"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/><path d="M12 22a3 3 0 0 1 0-6h2a3 3 0 0 0 3-3"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  sparkle: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>',
};
const icon = (name, size = 22) =>
  `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

const DOTS = '<span class="dots"><i style="background:var(--d1)"></i><i style="background:var(--d2)"></i><i style="background:var(--d3)"></i><i style="background:var(--d4)"></i><i style="background:var(--d5)"></i></span>';

const CSS = `
@page { size: Letter; margin: 0; }
:root {
  --ink:#201e1d; --ink-soft:#3d3a38; --muted:#6f6a66; --line:#e8e5e0;
  --soft:#f7f5f1; --tint:#fbf7ee; --dark:#171615; --accent:#f2a900; --accent-deep:#b77f00;
  --d1:#ec3013; --d2:#f2a900; --d3:#17a15a; --d4:#0aa5c9; --d5:#7b3fd4;
  --seasonal:#7b3fd4; --permanent:#d99100;
}
* { box-sizing: border-box; }
html, body { margin:0; padding:0; background:#fff; }
body { font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:10pt; line-height:1.45;
  -webkit-print-color-adjust:exact; print-color-adjust:exact; }
h1,h2,h3,h4,.heading { font-family:'Archivo','Inter',sans-serif; margin:0; letter-spacing:-0.01em; }
h1 { font-size:30pt; line-height:1.05; font-weight:800; }
h2 { font-size:17pt; line-height:1.15; font-weight:800; }
h3 { font-size:11.5pt; line-height:1.25; font-weight:700; }
p { margin:0 0 7pt; }
.page { width:8.5in; height:11in; position:relative; overflow:hidden; break-after:page; page-break-after:always;
  padding:0.55in 0.6in 0.75in; }
.page:last-child { break-after:auto; page-break-after:auto; }
.hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:12pt; }
.hdr img { height:0.44in; }
.hdr .doc { font-size:8.5pt; color:var(--muted); text-transform:uppercase; letter-spacing:0.12em; font-weight:600; }
.rule { display:flex; align-items:center; gap:10pt; margin:-4pt 0 13pt; }
.rule::after { content:''; flex:1; height:1px; background:var(--line); }
.dots { display:inline-flex; gap:4pt; }
.dots i { width:7pt; height:7pt; border-radius:50%; display:block; }
.ftr { position:absolute; left:0.6in; right:0.6in; bottom:0.38in; display:flex; justify-content:space-between;
  font-size:7.5pt; color:var(--muted); border-top:1px solid var(--line); padding-top:6pt; }
.eyebrow { font-size:8pt; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent-deep); margin-bottom:5pt; }
.lede { font-size:11.5pt; color:var(--ink-soft); line-height:1.5; }
.muted { color:var(--muted); }
.small { font-size:8pt; }
.grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14pt; }
.grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:12pt; }
.grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:10pt; }
.card { border:1px solid var(--line); border-radius:10pt; padding:11pt 12pt; background:#fff; }
.card.soft { background:var(--soft); border-color:transparent; }
.card.tint { background:var(--tint); border-color:#f1e3c2; }
.card.dark { background:var(--dark); color:#fff; border-color:transparent; }
.feature .ic { color:var(--accent-deep); margin-bottom:5pt; }
.feature h3 { margin-bottom:3pt; }
.feature p { font-size:9pt; color:var(--ink-soft); margin:0; }
.ph { width:100%; object-fit:cover; display:block; border-radius:8pt; }
.cap { font-size:7.5pt; color:var(--muted); margin-top:3pt; }
table { width:100%; border-collapse:collapse; font-size:9pt; }
th { text-align:left; font-weight:600; font-size:7.5pt; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted);
  background:var(--soft); padding:6pt 7pt; }
td { padding:6pt 7pt; border-bottom:1px solid var(--line); vertical-align:top; }
table.tight td { padding:4.5pt 7pt; }
td.num, th.num { text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }
.cta { background:var(--dark); color:#fff; border-radius:12pt; padding:14pt 16pt; display:flex; align-items:center; justify-content:space-between; gap:12pt; }
.cta h3 { color:#fff; font-size:13pt; }
.cta p { color:rgba(255,255,255,.72); margin:2pt 0 0; font-size:9pt; }
.cta .phone { font-family:'Archivo',sans-serif; font-weight:800; font-size:16pt; color:var(--accent); white-space:nowrap; text-align:right; }
.cta .phone small { display:block; font-family:'Inter',sans-serif; font-weight:500; font-size:8.5pt; color:rgba(255,255,255,.72); }
ul.checks { list-style:none; margin:0; padding:0; }
ul.checks li { position:relative; padding-left:16pt; margin-bottom:4pt; }
ul.checks li::before { content:''; position:absolute; left:2pt; top:5pt; width:6pt; height:6pt; border-radius:50%; background:var(--accent); }
ul.crosses li::before { background:#c9c3bd; }
.spec { display:flex; gap:8pt; align-items:flex-start; }
.spec .ic { color:var(--accent-deep); flex:none; margin-top:1pt; }
.spec b { display:block; font-size:9.5pt; }
.spec span { font-size:8.5pt; color:var(--muted); }
.field { border-bottom:1px solid #bdb6ae; height:22pt; }
.flabel { font-size:7.5pt; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; margin-top:3pt; }
.qa { break-inside:avoid; margin-bottom:9pt; }
.qa h3 { font-size:10pt; margin-bottom:2pt; }
.qa p { font-size:9pt; color:var(--ink-soft); margin:0; }
.sec { font-family:'Archivo',sans-serif; font-weight:800; font-size:9pt; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--ink); margin:4pt 0 8pt; display:flex; align-items:center; gap:8pt; }
.sec::after { content:''; flex:1; height:1px; background:var(--line); }
.big { font-family:'Archivo',sans-serif; font-weight:800; font-size:26pt; line-height:1; }
`;

function shell(title, pages) {
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>${pages.join('\n')}</body></html>`;
}

function page(docTitle, inner, { n, total, header = true, footer = true, cls = '', style = '' } = {}) {
  return `<section class="page ${cls}" style="${style}">
${header ? `<div class="hdr"><img src="${LOGO}" alt="Forever Lights"><div class="doc">${esc(docTitle)}</div></div><div class="rule">${DOTS}</div>` : ''}
${inner}
${footer ? `<div class="ftr"><span>${esc(site.name)} · ${esc(site.phone)} · ${esc(site.domain)}</span><span>${total > 1 ? `${n} / ${total}` : ''}</span></div>` : ''}
</section>`;
}

const cta = (title = 'Book your free site visit', text = 'We measure the roofline, colour-match the track to your trim and leave a written quote, usually within 24 hours.') =>
  `<div class="cta"><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div><div class="phone">${esc(site.phone)}<small>${esc(site.domain)}</small></div></div>`;

const kits = kitsData.kits;
const fromInstalled = Math.min(...kits.map((k) => k.installedLow));
const fromKit = Math.min(...kits.map((k) => k.price));
const per1000 = monthly(1000);

/* ── 1. Brochure ─────────────────────────────────────────────────────── */

function brochure() {
  const T = 'Permanent Roofline Lighting';
  const p1 = `<section class="page" style="padding:0">
  <div style="position:relative;height:5.6in">
    <img src="${photoSrc('rainbow-2728')}" style="width:100%;height:100%;object-fit:cover;display:block">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(23,22,21,.55) 0%,rgba(23,22,21,0) 32%,rgba(23,22,21,0) 55%,rgba(23,22,21,.85) 100%)"></div>
    <img src="${LOGO_WHITE}" style="position:absolute;top:0.45in;left:0.6in;height:0.6in">
    <div style="position:absolute;left:0.6in;right:0.6in;bottom:0.4in;color:#fff">
      <div class="eyebrow" style="color:var(--accent)">Permanent roofline lighting</div>
      <h1 style="color:#fff;font-size:34pt">Installed once.<br>Lit for every occasion.</h1>
    </div>
  </div>
  <div style="padding:0.32in 0.6in 0">
    <p class="lede" style="margin-bottom:16pt">Forever Lights is a slim aluminum track, colour-matched to your soffit, holding sealed LED lights you control from your phone. It goes up once and stays up: warm white on an ordinary evening, red and green in December, orange for Halloween, your team's colours on game night.</p>
    <div class="grid4">
      ${[
        ['eyeOff', 'Invisible by day', 'The track matches your trim, so in daylight it reads as part of the roofline.'],
        ['phone', 'Phone controlled', 'Colours, brightness, effects and dusk-to-dawn schedules from the app, anywhere.'],
        ['ladderOff', 'Installed once', 'No November install, no January take-down, no ladders and no storage bins.'],
        ['calendar', 'Every holiday, all year', 'Christmas, Halloween, Canada Day, Valentine\'s, or plain warm white every night.'],
      ].map(([i, h, t]) => `<div class="feature">${icon(i, 24)}<h3>${h}</h3><p>${t}</p></div>`).join('')}
    </div>
    <div class="grid3" style="margin-top:18pt">
      ${[['daytime-grey', 'By day: the track disappears'], ['bungalow-warm', 'Every night: warm white'], ['blue-bungalow', 'Halloween: one tap']].map(([k, c]) =>
        `<div><img class="ph" src="${photoSrc(k)}" style="height:1.45in"><div class="cap">${c}</div></div>`).join('')}
    </div>
  </div>
  <div class="ftr"><span>${esc(site.name)} · ${esc(site.phone)} · ${esc(site.domain)}</span><span>1 / 2</span></div>
</section>`;

  const parts = kitsData.components;
  const comp = (key) => parts.find((c) => c.key === key);
  const p2 = page(T, `
  <div class="eyebrow">How it works</div>
  <h2 style="margin-bottom:12pt">Three steps, and the last one is your phone</h2>
  <div class="grid3" style="margin-bottom:14pt">
    ${[
      ['ruler', '1. Free site visit', 'We measure the roofline, match the track to your trim and leave a written quote, usually within 24 hours.'],
      ['wrench', '2. One-day install', 'Our crew mounts the track, runs the low-voltage wiring and tests every zone. Most homes are done in a day.'],
      ['phone', '3. Handover', 'We connect the app, save an everyday warm white and a holiday scene, and set your dusk-to-dawn schedule.'],
    ].map(([i, h, t]) => `<div class="card soft feature">${icon(i)}<h3>${h}</h3><p>${t}</p></div>`).join('')}
  </div>
  <div class="eyebrow">What goes on your home</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10pt;margin-bottom:13pt">
    ${[
      // Written here rather than taken from kits.json: its power supply blurb
      // carries a voltage that disagrees with FACT.voltage.
      ['track', 'Aluminum track', 'Colour-matched to your trim. Each 42-inch piece holds five lights.'],
      ['strand', 'RGBW light strands', 'Five sealed lights per strand, joined with twist connectors.'],
      ['powerSupply', 'Power supply', `Steps household power down to ${FACT.voltage} from a standard outlet.`],
      ['amplifier', 'Data amplifier', 'Keeps colours crisp and in sync to the far end of a long run.'],
    ].map(([k, h, t]) => `<div class="card" style="padding:8pt"><img src="${kitImg(comp(k).image)}" style="width:100%;height:0.75in;object-fit:contain;display:block;margin-bottom:5pt"><h3 style="font-size:9pt">${h}</h3><p class="small muted" style="margin:2pt 0 0">${t}</p></div>`).join('')}
  </div>
  <div class="grid2" style="grid-template-columns:1.25fr 1fr;margin-bottom:13pt">
    <div>
      <div class="sec">Built for Ontario winters</div>
      <div class="grid2" style="gap:9pt">
        ${[
          ['bolt', `${FACT.voltage} low voltage`, 'Plugs into an existing GFCI outlet. A standard install needs no permit.'],
          ['shield', `${FACT.ip} sealed`, 'Lights and connectors are sealed against snow, ice and rain.'],
          ['snow', `Rated to ${FACT.coldC}`, 'Nothing comes down or gets covered for winter.'],
          ['palette', 'RGBW LEDs', '16 million colours plus a dedicated warm-white diode.'],
          ['sparkle', `${FACT.ledHours}-hour LEDs`, 'Over 20 years at six hours a night.'],
          ['home', 'Any soffit', 'Wood, aluminum and vinyl. Track in white, black, brown, beige or custom.'],
        ].map(([i, b, s]) => `<div class="spec">${icon(i, 18)}<div><b>${b}</b><span>${s}</span></div></div>`).join('')}
      </div>
    </div>
    <div class="card tint">
      <div class="eyebrow">Backed in writing</div>
      <p style="margin-bottom:6pt"><b>5-year parts warranty.</b> Lights, track, connectors, power supply and controller.</p>
      <p style="margin-bottom:6pt"><b>1-year workmanship warranty</b> on everything we install.</p>
      <p style="margin-bottom:10pt"><b>Free phone and remote support</b> for as long as you own the system.</p>
      <div class="eyebrow">Pricing</div>
      <p style="margin:0">Professionally installed from <b>${money(fromInstalled)}</b>. DIY kits from <b>${money(fromKit)}</b>. Financing over ${TERM} months at ${APR * 100}% APR, about <b>${money(per1000)}/month per $1,000</b> (on approved credit).</p>
    </div>
  </div>
  ${cta()}
  `, { n: 2, total: 2 });
  return shell('Forever Lights — Brochure', [p1, p2]);
}

/* ── 3. Seasonal vs permanent cost comparison ────────────────────────── */

function costChart() {
  const W = 680, H = 215, L = 58, R = 120, Tp = 16, B = 34;
  const seasons = 10, yMax = 11000;
  const x = (s) => L + ((s - 1) / (seasons - 1)) * (W - L - R);
  const y = (v) => Tp + (1 - v / yMax) * (H - Tp - B);
  const seasonal = Array.from({ length: seasons }, (_, i) => [i + 1, BOOK.seasonalMedian * (i + 1)]);
  const perm = Array.from({ length: seasons }, (_, i) => [i + 1, BOOK.permanentMedian]);
  const line = (pts) => pts.map(([s, v], i) => `${i ? 'L' : 'M'}${x(s).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const be = BOOK.permanentMedian / BOOK.seasonalMedian; // seasons to break even
  const grid = [0, 2500, 5000, 7500, 10000].map((v) =>
    `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#ece9e4" stroke-width="1"/><text x="${L - 8}" y="${y(v) + 3.5}" text-anchor="end" font-size="10" fill="#6f6a66">${money(v)}</text>`).join('');
  const xt = seasonal.map(([s]) => `<text x="${x(s)}" y="${H - B + 16}" text-anchor="middle" font-size="10" fill="#6f6a66">${s}</text>`).join('');
  const dots = (pts, c) => pts.map(([s, v]) => `<circle cx="${x(s)}" cy="${y(v)}" r="4" fill="${c}" stroke="#fff" stroke-width="2"/>`).join('');
  const last = seasonal[seasons - 1];
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;font-family:Inter,sans-serif" role="img" aria-label="Cumulative cost over ten seasons: seasonal installs reach ${money(last[1])}; a permanent install stays at ${money(BOOK.permanentMedian)}.">
  ${grid}${xt}
  <text x="${(L + W - R) / 2}" y="${H - 2}" text-anchor="middle" font-size="10" fill="#6f6a66">Christmas seasons</text>
  <line x1="${x(be)}" x2="${x(be)}" y1="${Tp}" y2="${H - B}" stroke="#201e1d" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${x(be) + 6}" y="${Tp + 10}" font-size="10" font-weight="600" fill="#201e1d">Break-even: season ${Math.ceil(be)}</text>
  <path d="${line(seasonal)}" fill="none" stroke="var(--seasonal)" stroke-width="2"/>
  <path d="${line(perm)}" fill="none" stroke="var(--permanent)" stroke-width="2"/>
  ${dots(seasonal, 'var(--seasonal)')}${dots(perm, 'var(--permanent)')}
  <text x="${x(seasons) + 10}" y="${y(last[1]) + 4}" font-size="10.5" fill="#201e1d"><tspan font-weight="700">${money(last[1])}</tspan><tspan x="${x(seasons) + 10}" dy="13" fill="#6f6a66">seasonal</tspan></text>
  <text x="${x(seasons) + 10}" y="${y(BOOK.permanentMedian) + 4}" font-size="10.5" fill="#201e1d"><tspan font-weight="700">${money(BOOK.permanentMedian)}</tspan><tspan x="${x(seasons) + 10}" dy="13" fill="#6f6a66">permanent</tspan></text>
</svg>`;
}

function costComparison() {
  const T = 'Seasonal vs Permanent';
  const s = BOOK.seasonalMedian, p = BOOK.permanentMedian;
  const rows = [1, 2, 3, 5, 10].map((n) => {
    const diff = s * n - p;
    return `<tr><td>After ${n} season${n > 1 ? 's' : ''}</td><td class="num">${money(s * n)}</td><td class="num">${money(p)}</td><td class="num" style="font-weight:600;color:${diff >= 0 ? 'var(--ink)' : 'var(--muted)'}">${diff >= 0 ? `${money(diff)} saved` : `${money(-diff)} to go`}</td></tr>`;
  }).join('');
  const legend = `<div style="display:flex;gap:16pt;font-size:8.5pt;margin:2pt 0 4pt">
    <span style="display:inline-flex;align-items:center;gap:5pt"><i style="width:14pt;height:2pt;background:var(--seasonal);display:inline-block"></i>Seasonal install &amp; take-down, every year</span>
    <span style="display:inline-flex;align-items:center;gap:5pt"><i style="width:14pt;height:2pt;background:var(--permanent);display:inline-block"></i>Forever Lights, installed once</span></div>`;
  const p1 = page(T, `
  <div class="eyebrow">For our seasonal Christmas customers</div>
  <h1 style="font-size:24pt;margin-bottom:7pt">You have already paid for permanent lights. One season at a time.</h1>
  <p class="lede" style="margin-bottom:12pt">A seasonal display is rented. Every fall someone climbs up to clip it on, every January someone comes back to take it down, and next year the bill arrives again. A permanent system is paid for once.</p>
  <div class="grid2" style="margin-bottom:12pt">
    <div class="card soft"><div class="eyebrow" style="color:var(--seasonal)">Typical seasonal install</div><div class="big">${money(s)}<span style="font-size:11pt;font-weight:600;color:var(--muted)"> every season</span></div><p class="small muted" style="margin:5pt 0 0">Median of ${BOOK.seasonalN} homes last season. Most paid between ${money(BOOK.seasonalLow)} and ${money(BOOK.seasonalHigh)}.</p></div>
    <div class="card tint"><div class="eyebrow">Typical Forever Lights install</div><div class="big">${money(p)}<span style="font-size:11pt;font-weight:600;color:var(--muted)"> once</span></div><p class="small muted" style="margin:5pt 0 0">Median of ${BOOK.permanentN} homes. Most paid between ${money(BOOK.permanentLow)} and ${money(BOOK.permanentHigh)}.</p></div>
  </div>
  <div class="sec">What each one costs over time</div>
  ${legend}
  ${costChart()}
  <table style="margin-top:8pt">
    <thead><tr><th>Running total</th><th class="num">Seasonal</th><th class="num">Permanent</th><th class="num">Difference</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="small muted" style="margin-top:7pt">Both lines use the medians above. Seasonal prices are held flat for ten years, which flatters the seasonal option: in practice labour costs rise. The permanent line is the install price only; the lights use about as much electricity as a few household LED bulbs.</p>
  `, { n: 1, total: 2 });

  const p2 = page(T, `
  <h2 style="margin-bottom:6pt">Run your own numbers</h2>
  <p class="muted" style="margin-bottom:12pt">Every house is different. Here is the same arithmetic with yours.</p>
  <div class="card" style="padding:14pt 16pt;margin-bottom:18pt">
    <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:10pt;align-items:end">
      <div><div class="field"></div><div class="flabel">What you paid last season</div></div><div class="big" style="font-size:16pt;padding-bottom:16pt">×</div>
      <div><div class="field"></div><div class="flabel">Seasons you plan to stay</div></div><div class="big" style="font-size:16pt;padding-bottom:16pt">=</div>
      <div><div class="field"></div><div class="flabel">Seasonal, all in</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16pt;margin-top:14pt">
      <div><div class="field"></div><div class="flabel">Your Forever Lights quote</div></div>
      <div><div class="field"></div><div class="flabel">Seasons to break even (quote ÷ seasonal price)</div></div>
    </div>
  </div>
  <div class="grid2" style="margin-bottom:18pt">
    <div>
      <div class="sec">What else stops</div>
      <ul class="checks">
        <li>Booking an install slot in the October rush</li>
        <li>Waiting on a crew to come back in January for take-down</li>
        <li>Someone on a ladder at your roofline twice a year</li>
        <li>Timers, extension cords and burnt-out strings</li>
        <li>Lights that only work for six weeks of the year</li>
      </ul>
    </div>
    <div>
      <div class="sec">What you get instead</div>
      <ul class="checks">
        <li>Warm white every night, all year, on a schedule</li>
        <li>Halloween, Canada Day, Valentine's and game nights with one tap</li>
        <li>A track colour-matched to your soffit that disappears by day</li>
        <li>5-year parts and 1-year workmanship warranty</li>
        <li>Financing over ${TERM} months: about ${money(monthly(p))}/month on a ${money(p)} install</li>
      </ul>
    </div>
  </div>
  <div class="grid2" style="grid-template-columns:1fr 1fr;margin-bottom:18pt">
    <div><img class="ph" src="${photoSrc('daytime-brown')}" style="height:1.6in"><div class="cap">Daytime: the track reads as trim</div></div>
    <div><img class="ph" src="${photoSrc('red-white-night')}" style="height:1.6in"><div class="cap">Night: red and white for the holidays</div></div>
  </div>
  ${cta('Get a quote to compare', 'A free site visit gives you a written permanent price to put beside last year\'s seasonal bill.')}
  <p class="small muted" style="margin-top:10pt">Seasonal and permanent figures are the median prices from our 2025 install records across Southwestern Ontario (${BOOK.seasonalN} seasonal Christmas installs, ${BOOK.permanentN} residential Forever Lights installs). Financing on approved credit at ${APR * 100}% APR over ${TERM} months. Your price depends on your roofline and is confirmed in writing at the site visit.</p>
  `, { n: 2, total: 2 });
  return shell('Forever Lights — Seasonal vs Permanent', [p1, p2]);
}

/* ── 4. Pricing and packages ─────────────────────────────────────────── */

function pricing() {
  const T = 'Pricing & Packages';
  const rows = kits.map((k) => `<tr>
    <td><b style="font-family:Archivo,sans-serif;font-size:11pt">${k.feet} ft</b></td>
    <td style="color:var(--ink-soft)">${esc(k.suits)}</td>
    <td class="num">${money(k.price, true)}</td>
    <td class="num"><b>${money(k.installedLow)}</b> – ${money(k.installedHigh)}</td>
    <td class="num">${money(monthly(k.installedLow))}</td></tr>`).join('');
  const opts = [
    ['Steep pitch or difficult access', '+$2 / ft', 'Steep rooflines, three-storey peaks, or where a lift cannot reach.'],
    ['Extra controller / multi-zone', '+$1 / ft', 'House, garage and peaks controlled separately in the app.'],
    ['Detached garage or outbuilding', '+$1 / ft', 'A separate structure with its own wiring run and power feed.'],
  ];
  const p1 = page(T, `
  <div class="eyebrow">2026 price list</div>
  <h1 style="font-size:26pt;margin-bottom:8pt">Priced by the foot of roofline</h1>
  <p class="lede" style="margin-bottom:14pt">Pick the package closest to your measured roofline. Every package is available as a DIY kit you install yourself, or professionally installed by our crew in a day.</p>
  <table class="tight">
    <thead><tr><th style="width:12%">Package</th><th>Typically suits</th><th class="num">DIY kit</th><th class="num">Installed</th><th class="num">From / mo*</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="small muted" style="margin:6pt 0 16pt">Prices in Canadian dollars, before HST. The installed range covers ordinary differences between homes (number of peaks, corners and storeys); your exact price is confirmed in writing after the site visit. Rooflines over 250 ft and between sizes are quoted to the measured foot.</p>
  <div class="grid2" style="grid-template-columns:1.2fr 1fr">
    <div>
      <div class="sec">Install options</div>
      <table class="tight"><tbody>${opts.map(([a, b, c]) => `<tr><td><b>${a}</b><div class="small muted">${c}</div></td><td class="num" style="font-weight:600">${b}</td></tr>`).join('')}</tbody></table>
      <div class="sec" style="margin-top:12pt">Track colours</div>
      <div style="display:flex;gap:4pt 9pt;flex-wrap:wrap;font-size:8.5pt">
        ${kitsData.colours.map((c) => `<span style="display:inline-flex;align-items:center;gap:4pt"><i style="width:11pt;height:11pt;border-radius:4pt;border:1px solid #d6d0c8;display:inline-block;background:${c.hex || 'conic-gradient(#ec3013,#f2a900,#17a15a,#0aa5c9,#7b3fd4,#ec3013)'}"></i>${esc(c.label)}</span>`).join('')}
      </div>
    </div>
    <div class="card tint">
      <div class="eyebrow">*Financing</div>
      <p><b>${TERM} months at ${APR * 100}% APR</b>, on approved credit. That works out to about <b>${money(per1000, true)} a month for every $1,000</b> financed.</p>
      <p style="margin:0">Example: a ${money(BOOK.permanentMedian)} install, our median last season, is about <b>${money(monthly(BOOK.permanentMedian))}/month</b> for ${TERM} months.</p>
    </div>
  </div>
  `, { n: 1, total: 2 });

  const head = kits.map((k) => `<th class="num">${k.feet} ft</th>`).join('');
  const bom = kitsData.components.map((c) => `<tr>
    <td style="width:0.5in;padding:2pt 4pt">${c.image ? `<img src="${kitImg(c.image)}" style="width:0.4in;height:0.28in;object-fit:contain;display:block">` : ''}</td>
    <td style="padding-top:6pt">${esc(c.name)}</td>
    ${kits.map((k) => `<td class="num" style="padding-top:6pt;${(k.bom[c.key] || 0) === 0 ? 'color:#c9c3bd' : ''}">${k.bom[c.key] || '–'}</td>`).join('')}</tr>`).join('');
  const p2 = page(T, `
  <h2 style="margin-bottom:4pt">What is in each kit</h2>
  <p class="muted" style="margin-bottom:10pt">Installed packages use exactly the same parts. Each 42-inch piece of track holds one five-light strand.</p>
  <table style="font-size:8.5pt"><thead><tr><th></th><th>Part</th>${head}</tr></thead><tbody>${bom}</tbody></table>
  <div class="grid2" style="margin-top:14pt;margin-bottom:14pt">
    <div class="card">
      <h3 style="margin-bottom:6pt">DIY kit</h3>
      <ul class="checks small">
        <li>Every part, cut to length, with sealed twist connectors: no cutting or soldering</li>
        <li>Phone support while you install</li>
        <li>Same 5-year parts warranty</li>
        <li>You supply the ladder, the time and the fastening</li>
      </ul>
    </div>
    <div class="card tint">
      <h3 style="margin-bottom:6pt">Professionally installed</h3>
      <ul class="checks small">
        <li>Site visit, measurement and colour match</li>
        <li>Installed with a lift, usually in one day</li>
        <li>Controller, Wi-Fi, zones and schedules set up before we leave</li>
        <li>5-year parts plus 1-year workmanship warranty</li>
      </ul>
    </div>
  </div>
  ${cta()}
  `, { n: 2, total: 2 });
  return shell('Forever Lights — Pricing & Packages', [p1, p2]);
}

/* ── 5. Warranty certificate and care guide ──────────────────────────── */

function warrantyDoc() {
  const T = 'Warranty & Care';
  const f = (label, span = 1) => `<div style="grid-column:span ${span}"><div class="flabel">${label}</div><div class="field"></div></div>`;
  const p1 = page(T, `
  <div style="border:2px solid var(--ink);border-radius:14pt;padding:20pt 24pt 16pt;position:relative">
    <div style="position:absolute;inset:5pt;border:1px solid var(--line);border-radius:10pt;pointer-events:none"></div>
    <div style="text-align:center;margin-bottom:14pt">
      <div class="rule" style="justify-content:center;margin:0 0 10pt">${DOTS}</div>
      <div class="eyebrow">Forever Lights</div>
      <h1 style="font-size:28pt">Certificate of Warranty</h1>
      <p class="muted" style="margin-top:6pt">${esc(warranty.summary)}</p>
    </div>
    <div class="grid3" style="margin-bottom:16pt">
      ${warranty.tiers.map((t) => `<div class="card soft" style="text-align:center"><div class="big" style="font-size:20pt">${esc(t.term)}</div><h3 style="margin:3pt 0 4pt">${esc(t.title)}</h3><p class="small muted" style="margin:0">${esc(t.text.split('. ')[0].replace(/\.+$/, ''))}.</p></div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10pt 18pt">
      ${f('Homeowner')}${f('Phone / email')}
      ${f('Property address', 2)}
      ${f('Installation date (warranty start)')}${f('Invoice number')}
      ${f('Linear feet installed')}${f('Track colour')}
      ${f('Controller location')}${f('Number of zones')}
      ${f('Installed by')}${f('Signature')}
    </div>
    <p class="small muted" style="margin:16pt 0 0;text-align:center">Keep this certificate with your invoice. Replacement parts carry the remainder of the original warranty. If you sell your home, remaining coverage can be transferred to the new owner on request. Full terms: ${esc(site.domain)}/warranty · version ${esc(warranty.version)}</p>
  </div>
  `, { n: 1, total: 2 });

  const p2 = page(T, `
  <h2 style="margin-bottom:4pt">Caring for your system</h2>
  <p class="muted" style="margin-bottom:12pt">The short version: there is almost nothing to do. The track and lights are ${FACT.ip} sealed and rated to ${FACT.coldC}, so snow, ice and rain are normal operating conditions. Nothing comes down for winter.</p>
  <table style="margin-bottom:14pt">
    <thead><tr><th style="width:16%">When</th><th>Five-minute check</th></tr></thead>
    <tbody>
      <tr><td><b>Every night</b></td><td>Glance at the house from the driveway. If a section is dark, dimmer or the wrong colour, note where it starts and call us.</td></tr>
      <tr><td><b>Spring</b></td><td>Check the power supply and controller are dry and firmly mounted and the outlet cover closes. Run each saved scene once.</td></tr>
      <tr><td><b>Summer</b></td><td>Before any painting, roofing, siding or eavestrough work, tell the contractor there is a lighting track on the eaves.</td></tr>
      <tr><td><b>Fall</b></td><td>Check your schedules and load this year's holiday scenes. Confirm the app still shows the controller online.</td></tr>
      <tr><td><b>After a storm</b></td><td>If everything is dark, check the plug, then the GFCI reset button, then the breaker. Storms trip GFCI outlets often.</td></tr>
    </tbody>
  </table>
  <div class="grid2" style="margin-bottom:12pt">
    <div>
      <div class="sec">Please don't</div>
      <ul class="checks crosses small">
        <li>Put a ladder against the track. Anything at roofline height is our job.</li>
        <li>Aim a pressure washer at the track or its joints. A garden hose is fine.</li>
        <li>Hang other decorations from the channel.</li>
        <li>Let anyone else move, cut or add to the system. That ends the warranty on it.</li>
        <li>Unplug the power supply to run a leaf blower and forget it.</li>
      </ul>
    </div>
    <div>
      <div class="sec">Making a claim</div>
      <ol style="margin:0;padding-left:14pt;font-size:8.5pt">
        ${warranty.claim.map((c) => `<li style="margin-bottom:3pt">${esc(c)}</li>`).join('')}
      </ol>
    </div>
  </div>
  <div class="grid2">
    <div><div class="sec">Covered</div><ul class="checks small">${warranty.covered.slice(0, 5).map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>
    <div><div class="sec">Not covered</div><ul class="checks crosses small">${warranty.notCovered.slice(0, 5).map((c) => `<li>${esc(c.split(', and')[0].split(' (')[0])}</li>`).join('')}</ul></div>
  </div>
  `, { n: 2, total: 2 });
  return shell('Forever Lights — Warranty & Care', [p1, p2]);
}

/* ── 6. FAQ ──────────────────────────────────────────────────────────── */

function faq() {
  const T = 'Frequently Asked Questions';
  const groups = [
    ['The look', [
      ['Can you see the track during the day?', 'Barely. We colour-match the aluminum track to your soffit and fascia at the site visit (white, black, brown, beige or a custom match). From the street it reads as part of the trim until the lights come on.'],
      ['Is it only for Christmas?', 'No, and that is the point. Most owners run a warm white every night for curb appeal and security, then switch to red and green in December, orange for Halloween, red and white for Canada Day or team colours on game night.'],
      ['Can it do a plain white, not just colours?', 'Yes. Each light carries red, green and blue diodes plus a dedicated warm-white one, so white looks like white rather than a mixed colour.'],
    ]],
    ['Weather and durability', [
      ['Does it come down for winter?', `Never. The lights and connectors are ${FACT.ip} sealed and rated to ${FACT.coldC}. Snow, ice and freezing rain are normal operating conditions.`],
      ['What about ice dams and snow on the roof?', 'The track mounts to the soffit or fascia, below the roof edge, not on the shingles. Heavy snow against the lights can soften them for a night, then it melts or slides off with no harm done.'],
      ['How long do the lights last?', `The LEDs are rated for ${FACT.ledHours} hours, over 20 years at six hours a night, and the parts are warrantied for five years.`],
    ]],
    ['Control and the app', [
      ['How do I control it?', 'With the app on iPhone or Android: colours, brightness, effects and schedules, from anywhere with internet. Several people in the household can have access without sharing your Wi-Fi password.'],
      ['Does it work if my internet goes down?', 'Yes. Saved schedules run on the controller itself. You just cannot make changes from the app until the connection is back.'],
      ['Do I have to turn it on every night?', 'No. We set up a dusk-to-dawn schedule at handover that follows sunset through the year. Holiday scenes can be pre-loaded once and recur every year.'],
    ]],
    ['Cost and power', [
      ['How much does it cost?', `It depends on the measured footage of your roofline. Installed packages start at ${money(fromInstalled)} and DIY kits at ${money(fromKit)}. Last season our median residential install was ${money(BOOK.permanentMedian)}. The site visit and written quote are free.`],
      ['Is financing available?', `Yes: ${TERM} months at ${APR * 100}% APR on approved credit, about ${money(per1000)} a month for every $1,000.`],
      ['What does it cost to run?', `Very little. The system runs at ${FACT.voltage} low voltage, and a typical home in warm white uses about as much electricity as a few household LED bulbs.`],
    ]],
    ['Installation', [
      ['Do I need a permit or an electrician?', 'Not for a standard install. The power supply plugs into an existing GFCI-protected outdoor or garage outlet, so nothing is hard-wired into your panel.'],
      ['How long does the install take?', 'Most homes are done in a day with a lift. We test every zone and set up the app before we leave.'],
      ['What kind of soffit does it work on?', 'Wood, aluminum and vinyl. We confirm the best mounting approach for your home at the site visit.'],
      ['Can I install it myself?', 'Yes. Every package is available as a DIY kit with sealed twist connectors (no cutting or soldering), phone support while you install, and the same 5-year parts warranty.'],
    ]],
    ['Warranty and moving', [
      ['What if a light stops working?', 'Call us. Lights, track, connectors, power supply and controller are covered for five years and our workmanship for one. Many issues are fixed remotely; otherwise our crew comes out with a lift.'],
      ['What if I paint, re-roof or re-side?', 'Tell us before the work starts. The track can be masked and painted with the trim, or we remove and re-hang it.'],
      ['What if I sell my home?', 'Leave it as a selling feature (remaining warranty can transfer to the new owner on request) or we can quote to move it to your new home.'],
    ]],
  ];
  const render = (gs) => gs.map(([g, qs]) => `<div class="sec">${g}</div>${qs.map(([q, a]) => `<div class="qa"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join('')}`).join('');
  const p1 = page(T, `
  <h1 style="font-size:26pt;margin-bottom:6pt">Questions we hear at every site visit</h1>
  <p class="lede" style="margin-bottom:12pt">The short answers. Anything not here, call us; most questions are answered on the phone.</p>
  <div class="grid2" style="gap:18pt">
    <div>${render(groups.slice(0, 2))}</div>
    <div>${render(groups.slice(2, 3))}<img class="ph" src="${photoSrc('track-closeup')}" style="height:1.7in;margin-top:4pt"><div class="cap">The lights sit inside the track, angled down the face of the home.</div></div>
  </div>
  `, { n: 1, total: 2 });
  const p2 = page(T, `
  <div class="grid2" style="gap:18pt">
    <div>${render(groups.slice(3, 5))}</div>
    <div>${render(groups.slice(5))}<img class="ph" src="${photoSrc('technician')}" style="height:2.4in;object-position:center 80%;margin-top:4pt"><div class="cap">Our crew handles everything at roofline height.</div></div>
  </div>
  <div style="position:absolute;left:0.6in;right:0.6in;bottom:0.75in">${cta()}</div>
  `, { n: 2, total: 2 });
  return shell('Forever Lights — FAQ', [p1, p2]);
}

/* ── 7. Commercial and builders ──────────────────────────────────────── */

function commercial() {
  const T = 'Commercial & Builders';
  const p1 = page(T, `
  <div class="grid2" style="grid-template-columns:1.1fr 1fr;gap:18pt;margin-bottom:14pt">
    <div>
      <div class="eyebrow">Commercial &amp; builders</div>
      <h1 style="font-size:25pt;margin-bottom:8pt">Your building, lit every night of the year. Booked once.</h1>
      <p class="lede" style="margin:0">Permanent roofline lighting, controlled from one app: brand colours every evening, the holidays without hiring a crew every fall.</p>
    </div>
    <div><img class="ph" src="${photoSrc('canada-day-barn')}" style="height:2.05in"><div class="cap">Red and white for Canada Day on a commercial building</div></div>
  </div>
  <div class="grid2" style="gap:14pt;margin-bottom:12pt">
    <div class="card">
      <div style="display:flex;align-items:center;gap:8pt;margin-bottom:6pt">${icon('building')}<h3>Storefronts, plazas and offices</h3></div>
      <ul class="checks small">
        <li><b>Brand colours on demand.</b> Your colours on weeknights, the holidays in season, a promotion colour for a sale weekend.</li>
        <li><b>No seasonal contract.</b> Our commercial seasonal accounts typically spend ${money(BOOK.commercialLow)} to ${money(BOOK.commercialHigh)} every season on install and take-down. Permanent is paid once.</li>
                <li><b>Every site in one app.</b> Each building gets its own controller and schedule; all of them sit under one account.</li>
        <li><b>Low voltage on an existing outlet</b> (${FACT.voltage}, GFCI-protected). No hard-wired circuit for a standard install.</li>
      </ul>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:8pt;margin-bottom:6pt">${icon('home')}<h3>Builders and developers</h3></div>
      <ul class="checks small">
        <li><b>A feature buyers see.</b> Show homes and listing photos taken at dusk with the roofline lit.</li>
        <li><b>One package across a project.</b> The same track colour, light spacing and controller on every house, priced per house from your plans.</li>
        <li><b>Warranty to the homeowner.</b> The 5-year parts warranty is registered to each address and transfers with the home.</li>
        <li><b>Installed after siding and soffit</b>, typically one house a day, scheduled around your trades.</li>
        <li><b>Volume pricing</b> by the house for subdivisions and multi-unit projects.</li>
      </ul>
    </div>
  </div>
  <div class="grid3" style="margin-bottom:12pt">
    <div><img class="ph" src="${photoSrc('green-barn')}" style="height:1.05in"><div class="cap">Green for St. Patrick's</div></div>
    <div><img class="ph" src="${photoSrc('warm-white-night')}" style="height:1.05in"><div class="cap">Warm white, every night</div></div>
    <div><img class="ph" src="${photoSrc('daytime-grey')}" style="height:1.05in;object-position:center 35%"><div class="cap">By day the track reads as trim</div></div>
  </div>
  <div class="grid4" style="margin-bottom:12pt">
    ${[
      ['shield', `${FACT.ip}, ${FACT.coldC}`, 'Sealed and rated for Ontario winters'],
      ['wrench', '5 yr / 1 yr', 'Parts / workmanship warranty'],
      ['calendar', 'Any month', 'Install in spring or summer, skip the fall rush'],
      ['ruler', 'Free walk-through', 'Measured, colour-matched, quoted in writing'],
    ].map(([i, b, s]) => `<div class="spec">${icon(i, 18)}<div><b>${b}</b><span>${s}</span></div></div>`).join('')}
  </div>
  ${cta('Book a site walk-through', 'One visit per property. We measure, colour-match and return a written per-site or per-house price.')}
  `, { n: 1, total: 1 });
  return shell('Forever Lights — Commercial & Builders', [p1]);
}

/* ── 8. Lookbook ─────────────────────────────────────────────────────── */

function lookbook() {
  const T = 'Lookbook';
  const fig = (k, h, extra = '') => { const p = photo(k); return `<figure style="margin:0"><img class="ph" src="${photoSrc(k)}" style="height:${h};${extra}"><div class="cap">${esc(p.caption)}</div></figure>`; };
  const cover = `<section class="page" style="padding:0;background:var(--dark)">
    <img src="${photoSrc('hero-winter')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(23,22,21,.7) 0%,rgba(23,22,21,.1) 35%,rgba(23,22,21,.1) 60%,rgba(23,22,21,.9) 100%)"></div>
    <img src="${LOGO_WHITE}" style="position:absolute;top:0.55in;left:0.6in;height:0.65in">
    <div style="position:absolute;left:0.6in;right:0.6in;bottom:0.7in;color:#fff">
      <div class="rule" style="margin:0 0 12pt">${DOTS}</div>
      <h1 style="color:#fff;font-size:40pt">The Lookbook</h1>
      <p style="font-size:13pt;color:rgba(255,255,255,.8);margin:8pt 0 0;max-width:5in">Homes lit with Forever Lights: by day, every night, and on every holiday in between.</p>
    </div>
  </section>`;
  const p2 = page(T, `
  <div class="eyebrow">By day</div>
  <h2 style="margin-bottom:4pt">You have to know it is there</h2>
  <p class="muted" style="margin-bottom:12pt">The track is colour-matched to the trim and sits tight under the soffit. In daylight it reads as part of the roofline.</p>
  <div class="grid2" style="grid-template-columns:0.8fr 1.2fr;gap:12pt">
    ${fig('daytime-grey', '7.1in')}
    <div style="display:grid;gap:12pt">${fig('daytime-brown', '3.4in')}${fig('track-closeup', '3.4in')}</div>
  </div>
  `, { n: 2, total: 5 });
  const p3 = page(T, `
  <div class="eyebrow">Every night</div>
  <h2 style="margin-bottom:4pt">Warm white, all year</h2>
  <p class="muted" style="margin-bottom:12pt">Most owners run a soft warm white from sunset on a schedule: architectural lighting, not decorations.</p>
  <div style="display:grid;gap:12pt">
    ${fig('warm-white-night', '3.2in')}
    <div class="grid2" style="gap:12pt">${fig('bungalow-warm', '2.3in')}${fig('puck-closeup', '2.3in')}</div>
    <div class="grid2" style="gap:12pt">${fig('purple-craftsman', '1.45in')}${fig('pink-stone', '1.45in')}</div>
  </div>
  `, { n: 3, total: 5 });
  const p4 = page(T, `
  <div class="eyebrow">Every holiday</div>
  <h2 style="margin-bottom:4pt">One tap, any occasion</h2>
  <p class="muted" style="margin-bottom:12pt">Christmas, Halloween, Valentine's, St. Patrick's, Canada Day, or the team on game night.</p>
  <div style="display:grid;gap:12pt">
    <div class="grid2" style="gap:12pt">${fig('red-white-night', '2.6in')}${fig('rainbow-2728', '2.6in')}</div>
    <div class="grid3" style="gap:12pt">${fig('bungalow-rainbow', '2.75in')}${fig('bungalow-pink', '2.75in')}${fig('blue-bungalow', '2.75in')}</div>
    <div class="grid2" style="gap:12pt">${fig('green-barn', '1.55in')}${fig('canada-day-barn', '1.55in')}</div>
  </div>
  `, { n: 4, total: 5 });
  const p5 = page(T, `
  <div class="grid2" style="grid-template-columns:1fr 1.15fr;gap:18pt;margin-bottom:18pt">
    ${fig('technician', '6.2in', 'object-position:center 40%')}
    <div>
      <div class="eyebrow">Getting yours</div>
      <h2 style="margin-bottom:8pt">From site visit to first scene</h2>
      <ul class="checks">
        <li><b>Free site visit.</b> We measure the roofline and match the track to your trim.</li>
        <li><b>Written quote</b>, usually within 24 hours.</li>
        <li><b>One-day install</b> by our own crew. Nothing at roofline height is ever your job.</li>
        <li><b>Handover.</b> App connected, everyday and holiday scenes saved, dusk-to-dawn schedule running.</li>
        <li><b>Covered</b> by a 5-year parts and 1-year workmanship warranty, with free phone support for life.</li>
      </ul>
      ${fig('cottage', '3.0in', 'object-position:center 60%;margin-top:6pt')}
    </div>
  </div>
  ${cta()}
  `, { n: 5, total: 5 });
  return shell('Forever Lights — Lookbook', [cover, p2, p3, p4, p5]);
}

/* ── owner documents (flowing, many pages) ────────────────────────────── */

const support = (slug) => read(`support/${slug}.json`);
const LOGO_DATA = `data:image/png;base64,${fs.readFileSync(path.join(APP, 'public/images/brand/logo-horizontal-tagline.png')).toString('base64')}`;
const GUIDE_VERSION = '2026-10-01';

const FLOW_CSS = `
@page { size: Letter; margin: 1in 0.6in 0.75in; }
.flow h1 { font-size:24pt; margin:0 0 8pt; }
.flow h2 { font-size:14pt; margin:16pt 0 6pt; break-after:avoid; page-break-after:avoid; }
.flow h3 { font-size:11pt; margin:10pt 0 3pt; break-after:avoid; page-break-after:avoid; }
.flow p { color:var(--ink-soft); }
.flow ul.checks, .flow ol.num { margin:0 0 10pt; }
.flow ol.num { padding-left:16pt; }
.flow ol.num li { margin-bottom:4pt; }
.flow tr, .flow .step, .flow .qa, .flow .callout, .flow .sysbox { break-inside:avoid; page-break-inside:avoid; }
.flow table { margin:4pt 0 12pt; font-size:8.8pt; }
.flow td:first-child { font-weight:600; color:var(--ink); }
.part + .part { break-before:page; page-break-before:always; }
.callout { background:var(--tint); border:1px solid #f1d58a; border-radius:8pt; padding:9pt 12pt; margin:8pt 0 12pt; font-size:9.5pt; }
.steps { margin:4pt 0 12pt; }
.step { display:flex; gap:9pt; margin-bottom:8pt; }
.step .n { flex:none; width:18pt; height:18pt; border-radius:50%; background:var(--accent); color:var(--ink); font-weight:700; font-size:9pt; display:flex; align-items:center; justify-content:center; }
.step b { display:block; }
.step p { margin:1pt 0 0; font-size:9.5pt; }
.sysbox { border:1px solid var(--line); border-radius:10pt; padding:10pt 14pt 12pt; margin:6pt 0 14pt; }
.sysbox .grid2 { gap:8pt 20pt; }
`;

function blocksHtml(blocks) {
  return blocks.map((b) => {
    switch (b.type) {
      case 'h2': return `<h2>${esc(b.text)}</h2>`;
      case 'h3': return `<h3>${esc(b.text)}</h3>`;
      case 'p': return `<p>${esc(b.text)}</p>`;
      case 'callout': return `<div class="callout">${esc(b.text)}</div>`;
      case 'ul': return `<ul class="checks">${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
      case 'ol': return `<ol class="num">${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`;
      case 'steps': return `<div class="steps">${b.items.map((it, i) => `<div class="step"><span class="n">${i + 1}</span><div><b>${esc(it.title)}</b><p>${esc(it.text)}</p></div></div>`).join('')}</div>`;
      case 'table': return `<table><thead><tr>${b.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      default: throw new Error(`Unknown block type ${b.type}`);
    }
  }).join('\n');
}

const faqHtml = (items, title = 'Frequently asked') => items?.length
  ? `<h2>${title}</h2>${items.map((f) => `<div class="qa"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('')}` : '';

const sysBox = (fields) => `<div class="sysbox"><div class="eyebrow" style="color:var(--muted)">Your system</div><div class="grid2">${fields.map((f) => `<div><div class="flabel">${f}</div><div class="field" style="height:18pt"></div></div>`).join('')}</div></div>`;

const flowShell = (title, body) => shell(title, [`<style>${FLOW_CSS}</style><main class="flow">${body}</main>`]);

const supportLine = `<div class="callout">Support: ${esc(site.phone)} · ${esc(site.hours)} · contact form at ${esc(site.domain)}. Phone and remote app support is free for the life of your system.</div>`;

function quickStart() {
  const gs = support('getting-started');
  const app = support('using-the-app');
  const ts = support('troubleshooting');
  const part = (g, lead, first = false) => `<section class="part">
    ${first ? '' : `<div class="eyebrow">Owner's Quick Start Guide</div><h1>${esc(g.title.split(':')[0])}</h1>`}
    ${lead}
    ${g.keyTakeaways?.length ? `<h2>${first ? 'At a glance' : 'The short version'}</h2><ul class="checks">${g.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` : ''}
    ${blocksHtml(g.body)}
    ${faqHtml(g.faq)}
  </section>`;
  return flowShell("Forever Lights — Owner's Quick Start Guide", `
    ${part(gs, `<div class="eyebrow">Owner's guide</div><h1>Owner's Quick Start Guide</h1>
      <p class="lede">Welcome to Forever Lights. This guide covers what was installed on your home, how to control it, the settings worth doing on night one, and what to do if something looks wrong. Keep it with your invoice.</p>
      ${sysBox(['Installation date', 'Invoice number', 'Controller location / outlet', 'Wi-Fi network name'])}`, true)}
    ${part(app, `<p class="lede">${esc(app.excerpt)}</p>`)}
    ${part(ts, `<p class="lede">${esc(ts.excerpt)}</p>`)}
    ${supportLine}
    <p class="small muted">Guide version ${GUIDE_VERSION}. Screen names vary between app versions; your installer set up the app that matches your controller.</p>`);
}

function careChecklist() {
  const g = support('care-and-maintenance');
  return flowShell('Forever Lights — Care & Maintenance Checklist', `<section class="part">
    <div class="eyebrow">Owner's guide</div><h1>Care &amp; Maintenance Checklist</h1>
    <p class="lede">The honest answer is that the lights need almost nothing. Here is the short list of things worth doing each season, and the things to avoid so you never need a repair.</p>
    <h2>The short version</h2><ul class="checks">${g.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
    ${blocksHtml(g.body)}
    ${faqHtml(g.faq)}
    ${supportLine}
  </section>`);
}

function warrantyTerms() {
  const w = warranty;
  return flowShell('Forever Lights — Warranty Terms', `<section class="part">
    <div class="eyebrow">Warranty version ${esc(w.version)}</div><h1>Warranty Terms</h1>
    <p class="lede">${esc(w.summary)}</p>
    ${sysBox(['Installation date', 'Invoice number', 'Property address', 'Installed by'])}
    ${w.tiers.map((t) => `<h2>${esc(t.term)} · ${esc(t.title)}</h2><p>${esc(t.text)}</p>`).join('')}
    <h2>What is covered</h2><ul class="checks">${w.covered.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <h2>What is not covered</h2><ul class="checks crosses">${w.notCovered.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <h2>How to make a claim</h2><div class="steps">${w.claim.map((c, i) => `<div class="step"><span class="n">${i + 1}</span><div><p style="margin:2pt 0 0">${esc(c)}</p></div></div>`).join('')}</div>
    <h2>Terms</h2><ul class="checks">${w.terms.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <div class="callout">Claims and questions: ${esc(site.phone)} · ${esc(site.hours)} · contact form at ${esc(site.domain)}</div>
    <p class="small muted">Warranty version ${esc(w.version)}, effective ${esc(w.effective)}. ${esc(site.name)}, London, Ontario, Canada. This document describes the warranty that applies to installations completed by ${esc(site.name)}.</p>
  </section>`);
}

const headerTemplate = (title) => `<div style="width:100%;margin:0 0.6in;display:flex;justify-content:space-between;align-items:center;font-family:Arial,sans-serif;font-size:8pt;color:#6f6a66;-webkit-print-color-adjust:exact"><img src="${LOGO_DATA}" style="height:0.4in"><span style="text-transform:uppercase;letter-spacing:0.12em">${esc(title)}</span></div>`;
const footerTemplate = `<div style="width:100%;margin:0 0.6in;display:flex;justify-content:space-between;font-family:Arial,sans-serif;font-size:7.5pt;color:#6f6a66;border-top:1px solid #e8e5e0;padding-top:5pt"><span>${esc(site.name)} · ${esc(site.phone)} · ${esc(site.domain)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;

/* ── render ──────────────────────────────────────────────────────────── */

// `sheet` documents are fixed pages and get a cover thumbnail for the site;
// `flow` documents paginate themselves under Chrome's header and footer.
const DOCS = [
  { name: 'forever-lights-brochure', build: brochure, kind: 'sheet' },
  { name: 'forever-lights-seasonal-vs-permanent-cost', build: costComparison, kind: 'sheet' },
  { name: 'forever-lights-pricing-and-packages', build: pricing, kind: 'sheet' },
  { name: 'forever-lights-faq', build: faq, kind: 'sheet' },
  { name: 'forever-lights-commercial-and-builders', build: commercial, kind: 'sheet' },
  { name: 'forever-lights-lookbook', build: lookbook, kind: 'sheet' },
  { name: 'forever-lights-warranty-certificate-and-care', build: warrantyDoc, kind: 'sheet' },
  { name: 'forever-lights-owners-quick-start-guide', build: quickStart, kind: 'flow', title: "Owner's Quick Start Guide" },
  { name: 'forever-lights-care-and-maintenance-checklist', build: careChecklist, kind: 'flow', title: 'Care & Maintenance Checklist' },
  { name: 'forever-lights-warranty-terms', build: warrantyTerms, kind: 'flow', title: `Warranty Terms · v${warranty.version}` },
];

// Chrome writes any image drawn with object-fit into the PDF as a lossless
// bitmap (about 2 MB a photo); a plain <img> at its natural aspect keeps its
// JPEG. So measure every cropped photo as laid out, cut a JPEG to exactly that
// box at ~240 dpi, and swap it in before printing.
async function bakeCrops(tab) {
  const boxes = await tab.evaluate(() => [...document.images].map((im, i) => {
    const cs = getComputedStyle(im);
    if (cs.objectFit !== 'cover') return null;
    const r = im.getBoundingClientRect();
    im.dataset.bake = String(i);
    return { i, src: im.currentSrc, w: r.width, h: r.height, pos: cs.objectPosition };
  }).filter(Boolean));
  const swaps = [];
  for (const b of boxes) {
    const src = fileURLToPath(b.src);
    const meta = await sharp(src).metadata();
    const scale = Math.max(b.w / meta.width, b.h / meta.height);
    const cw = Math.min(meta.width, Math.round(b.w / scale));
    const ch = Math.min(meta.height, Math.round(b.h / scale));
    const [px, py] = b.pos.split(' ').map((v) => (v.endsWith('%') ? parseFloat(v) / 100 : 0.5));
    const left = Math.round((meta.width - cw) * px);
    const top = Math.round((meta.height - ch) * (py ?? 0.5));
    const outW = Math.min(cw, Math.round((b.w / 96) * 240));
    const out = path.join(PRINT_DIR, `crop-${path.basename(src, path.extname(src))}-${left}-${top}-${cw}x${ch}-${outW}.jpg`);
    if (!fs.existsSync(out)) {
      await sharp(src).extract({ left, top, width: cw, height: ch }).resize({ width: outW })
        .jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    }
    swaps.push({ i: b.i, url: pathToFileURL(out).href });
  }
  await tab.evaluate(async (swaps) => {
    await Promise.all(swaps.map(({ i, url }) => {
      const im = document.querySelector(`img[data-bake="${i}"]`);
      im.style.objectFit = 'fill';
      im.src = url;
      return im.decode();
    }));
  }, swaps);
}

fs.mkdirSync(HTML_OUT, { recursive: true });
fs.mkdirSync(THUMBS, { recursive: true });
const PNG = process.argv.includes('--png');
const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
try {
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
  for (const doc of DOCS) {
    const { name, build, kind } = doc;
    if (only && !name.includes(only)) continue;
    const htmlPath = path.join(HTML_OUT, `${name}.html`);
    fs.writeFileSync(htmlPath, build());
    const tab = await browser.newPage();
    await tab.setViewport({ width: 816, height: 1056, deviceScaleFactor: 1 });
    await tab.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0', timeout: 60000 });
    await tab.evaluate(() => document.fonts.ready);
    await bakeCrops(tab);
    const out = path.join(OUT, `${name}.pdf`);
    if (kind === 'sheet') {
      // A page whose content runs into the footer (or off the sheet) is clipped
      // silently; say so.
      const overflow = await tab.evaluate(() => [...document.querySelectorAll('.page')]
        .map((p, i) => {
          const ftr = p.querySelector(':scope > .ftr');
          const limit = ftr ? ftr.getBoundingClientRect().top - 6 : p.getBoundingClientRect().bottom;
          const kids = [...p.children].filter((c) => !c.classList.contains('ftr'));
          return { i: i + 1, over: Math.max(0, ...kids.map((c) => c.getBoundingClientRect().bottom - limit)) };
        })
        .filter((x) => x.over > 1));
      if (overflow.length) console.warn(`  ! ${name}: content into the footer on page(s) ${overflow.map((o) => `${o.i} (+${Math.round(o.over)}px)`).join(', ')}`);
      await tab.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
      const pages = await tab.$$('.page');
      // Cover thumbnail for the downloads pages on the site.
      const cover = await pages[0].screenshot({ type: 'png' });
      await sharp(cover).resize({ width: 600 }).webp({ quality: 80 }).toFile(path.join(THUMBS, `${name}.webp`));
      if (PNG) for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(HTML_OUT, `${name}-p${i + 1}.png`) });
    } else {
      await tab.pdf({
        path: out, preferCSSPageSize: true, printBackground: true,
        displayHeaderFooter: true, headerTemplate: headerTemplate(doc.title), footerTemplate,
      });
    }
    await tab.close();
    const pdf = fs.readFileSync(out, 'latin1');
    const pageCount = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(`  ✓ ${name}.pdf  ${pageCount} page${pageCount === 1 ? '' : 's'}, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
  }
} finally {
  await browser.close();
}
if (!PNG) fs.rmSync(HTML_OUT, { recursive: true, force: true });
