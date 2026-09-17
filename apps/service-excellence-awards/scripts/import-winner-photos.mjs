// One-off importer: copies real photography from the network sites into
// public/images/winners/<slug>/ as photo-N.jpg (max 1600px, JPEG q82) and
// drops any placeholder art. The site reads these folders directly at
// render time (src/lib/winner-media.ts), so no DB sync is needed.
//
//   node scripts/import-winner-photos.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// APPS_DIR lets you point at another checkout of the monorepo (e.g. one with a fuller media library).
const APPS = process.env.APPS_DIR ? path.resolve(process.env.APPS_DIR) : path.resolve(process.cwd(), "..");
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const OUT = path.resolve(process.cwd(), "public/images/winners");

/** slug -> { replace?: boolean, logo?: string, photos: string[] } (paths relative to apps/) */
const PLAN = {
  "brantford-retaining-walls-2026": {
    // photo-1..3 were text-on-green placeholders; photo-4..6 are real. Rebuild the folder.
    replace: true,
    keep: ["photo-4.jpg", "photo-5.jpg", "photo-6.jpg"],
    photos: [
      "armour-stone-retaining-wall-and-stairs-01.jpg",
      "curved-segmental-block-retaining-wall-front-yard-garden-01.jpg",
      "natural-stone-retaining-wall-with-timber-cap-01.jpg",
      "segmental-block-retaining-wall-with-steps-01.jpg",
      "boulder-retaining-wall-poolside-cedar-garden-01.jpg",
      "tiered-segmental-block-retaining-wall-01.jpg",
      "terraced-timber-retaining-wall-seating-area-01.jpg",
      "segmental-block-retaining-wall-commercial-entrance-01.jpg",
      "poured-concrete-retaining-wall-and-staircase-01.jpg",
    ].map((f) => `brantford-retaining-walls/public/images/gallery/${f}`),
  },
  "london-retaining-walls-2026": {
    photos: [
      "armour-stone-retaining-wall-with-steps-01.jpg",
      "curved-segmental-block-retaining-wall-planter-01.jpg",
      "long-tiered-timber-retaining-wall-hillside-01.jpg",
      "natural-stone-raised-garden-bed-wall-01.jpg",
      "segmental-block-retaining-wall-terrace-01.jpg",
      "poured-concrete-retaining-wall-along-driveway-01.jpg",
    ].map((f) => `london-retaining-walls/public/images/gallery/${f}`),
  },
  "optimum-hvac-2026": {
    photos: ["dino-brazing-close.jpg", "dino-hvac-work.jpg", "dino-inspecting-coil.jpg", "furnace-installation-basement.jpg", "payne-furnace-installation.jpg"].map(
      (f) => `optimum-hvac/public/images/${f}`,
    ),
  },
  "london-concrete-sealing-2026": {
    photos: ["concrete-cleaning-sealing.jpg", "concrete-sealing-coloured.jpg", "broom-finishes.jpg"].map((f) => `london-concrete-sealing/public/images/${f}`),
  },
  "hot-tub-pads-2026": {
    photos: ["concrete-pad-wide.webp", "concrete-pad.webp", "hero-bg.jpg"].map((f) => `hot-tub-pads/public/images/${f}`),
  },
  "london-deck-builder-2026": {
    logo: "london-deck-builder/src/app/icon.svg",
    photos: ["Gazebo-and-Deck-2-1.jpg", "IMG-9498-scaled-1.jpg"].map((f) => `london-deck-builder/public/images/${f}`),
  },
  "ready-kitchens-2026": {
    logo: "ready-kitchens/src/app/icon.svg",
    photos: ["b09/1.jpg", "b09/2.jpg", "b12/3.jpg", "b12/nelson-1.webp"].map((f) => `forevercabinets/public/images/cabinets/${f}`),
  },
  "forever-cabinets-2026": {
    photos: ["b12/nelson-2.webp", "b12/1.webp"].map((f) => `forevercabinets/public/images/cabinets/${f}`),
  },
  "woodstock-deck-and-fence-2026": {
    photos: ["woodstock-deck-and-fence/public/images/og-image.jpg"],
  },
  "concrete-driveways-2026": {
    photos: [10, 11, 12, 13].map((n) => `concrete-driveways-ca/public/images/migrated/5kconcrete-5k-concrete-featured-project-${n}.jpg`),
  },
  "brantford-concrete-forming-2026": {
    photos: ["brantford-concrete-forming/public/images/concrete-patio-installation-1.jpg"],
  },
};

const isPhoto = (f) => /^photo-\d+\.(jpe?g|png|webp)$/i.test(f);
const num = (f) => parseInt(f.match(/\d+/)[0], 10);

async function writeJpeg(src, dest) {
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  const isFlat = (await img.stats()).channels.every((c) => c.stdev < 8);
  if (isFlat) throw new Error(`refusing placeholder-looking image ${src}`);
  await img.resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
  return meta;
}

for (const [slug, plan] of Object.entries(PLAN)) {
  if (ONLY.length && !ONLY.includes(slug)) continue;
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  let existing = fs.readdirSync(dir).filter(isPhoto).sort((a, b) => num(a) - num(b));

  if (plan.replace) {
    // Move the keepers to a temp name, delete the rest, then renumber from 1.
    const keep = (plan.keep ?? []).filter((f) => fs.existsSync(path.join(dir, f)));
    for (const f of existing) if (!keep.includes(f)) fs.rmSync(path.join(dir, f));
    keep.forEach((f, i) => fs.renameSync(path.join(dir, f), path.join(dir, `tmp-${i + 1}${path.extname(f)}`)));
    fs.readdirSync(dir).filter((f) => f.startsWith("tmp-")).forEach((f) => fs.renameSync(path.join(dir, f), path.join(dir, `photo-${num(f)}${path.extname(f)}`)));
    existing = fs.readdirSync(dir).filter(isPhoto).sort((a, b) => num(a) - num(b));
  }

  let next = existing.length ? Math.max(...existing.map(num)) + 1 : 1;
  for (const rel of plan.photos) {
    const src = path.join(APPS, rel);
    if (!fs.existsSync(src)) { console.warn(`  missing source ${rel}`); continue; }
    const dest = path.join(dir, `photo-${next}.jpg`);
    try {
      const m = await writeJpeg(src, dest);
      console.log(`${slug}: photo-${next}.jpg <- ${path.basename(rel)} (${m.width}x${m.height})`);
      next++;
    } catch (e) {
      console.warn(`  skipped ${rel}: ${e.message}`);
    }
  }
  if (plan.logo && !fs.readdirSync(dir).some((f) => /^logo\./.test(f))) {
    const src = path.join(APPS, plan.logo);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(dir, `logo${path.extname(src)}`));
      console.log(`${slug}: logo${path.extname(src)} <- ${plan.logo}`);
    }
  }
}
console.log("done");
