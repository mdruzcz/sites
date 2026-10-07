/**
 * Wires Matt's five new install photos into the site.
 *
 * Why this exists: the photos were shared in chat, so they had to be saved
 * to disk by hand. This script does everything that follows — verifies the
 * files, renames nothing (names are already the contract), rewrites
 * projects.json with accurate captions, and repoints the hero + the two
 * full-bleed section backgrounds at the stronger images.
 *
 * Usage, from apps/celebrate-lighting:
 *   1. Save the five photos into public/images/incoming/ using the names
 *      listed in EXPECTED below.
 *   2. node scripts/add-new-photos.mjs
 *
 * Re-runnable: it rewrites projects.json from scratch each time, so a
 * second run is a no-op rather than a duplicate.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const IMAGES = path.join(ROOT, "public", "images");
const INCOMING = path.join(IMAGES, "incoming");

/* Filename -> what the photo actually shows. Captions are written from the
   image content, not guessed from a slug — the previous gallery got that
   wrong and it's the main thing this redesign is fixing. */
const EXPECTED = [
  {
    file: "install-teal-gradient.jpg",
    title: "Teal-to-Green Wash — Oxford County",
    city: "Woodstock",
    category: "residential",
    description:
      "One system, mid-fade between teal and green, shot at blue hour. The downlight spill across the white brick is the fixtures themselves — no separate wall washers.",
    alt: "White brick bungalow at dusk with permanent LED roofline lighting fading from teal to green across the soffit",
  },
  {
    file: "install-warm-white-dusk.jpg",
    title: "The Same House, Warm White",
    city: "Woodstock",
    category: "residential",
    description:
      "The identical install on an ordinary evening — warm white, understated, reading as architectural lighting rather than decoration. Same track, same app, one tap apart.",
    alt: "The same white brick bungalow at dusk with its permanent LED roofline lighting set to warm white",
  },
  {
    file: "install-stone-gable-colour.jpg",
    title: "Colour on Stone — Game Day",
    city: "London",
    category: "residential",
    description:
      "Green and blue split across a stone gable above the garage. Stone and brick take colour beautifully because the texture catches the light.",
    alt: "Stone gable above a garage lit in green and blue by permanent LED roofline lighting at night",
  },
  {
    file: "install-soffit-detail-day.jpg",
    title: "Soffit Detail, Daylight",
    city: "London",
    category: "residential",
    description:
      "This is the part people worry about. Individual fixtures seated inside the soffit channel, colour-matched to the trim — visible only if you go looking for it.",
    alt: "Close-up of colour-matched permanent LED fixtures seated in the soffit channel of a brick home in daylight",
  },
  {
    file: "install-driveway-approach.jpg",
    title: "Driveway Approach — Oxford County",
    city: "Woodstock",
    category: "residential",
    description:
      "The full frontage from the driveway, soffit and peak lighting running warm through to magenta. This is the view your guests actually arrive to.",
    alt: "Driveway approach to a large brick home at night with magenta permanent LED lighting along the soffits and roof peaks",
  },
];

/* The commercial and municipal work stays in the gallery under its own
   category — it's real work, just not the residential roofline product. */
const COMMERCIAL = [
  {
    slug: "municipal-tree-wrapping",
    title: "Tree Wrapping — Municipal Park",
    city: "Woodstock",
    image: "/images/gallery-1.jpg",
    description:
      "Warm-white wrapping on mature park maples for a municipal seasonal display, installed and removed on the town's schedule.",
  },
  {
    slug: "commercial-streetscape-hedging",
    title: "Streetscape Hedging — Commercial Frontage",
    city: "Woodstock",
    image: "/images/gallery-4.jpg",
    description:
      "Cedar hedging along a commercial frontage lit for the season — high visibility from the street without touching the building envelope.",
  },
  {
    slug: "commercial-entrance-hedging",
    title: "Entrance Approach — Commercial Property",
    city: "Woodstock",
    image: "/images/gallery-2.jpg",
    description:
      "Warm-white hedge lighting framing a pedestrian approach, keeping the walkway bright and the frontage seasonal.",
  },
];

/* Existing residential shots worth keeping alongside the new ones. */
const KEEP_RESIDENTIAL = [
  {
    slug: "brantford-roofline",
    title: "Full Roofline in Cool Blue — Brantford",
    city: "Brantford",
    image: "/images/project-brantford.jpg",
    description:
      "Every peak, eave and gable traced in colour-matched track, shown here in cool blue. The same system runs warm white on an ordinary Tuesday.",
  },
  {
    slug: "london-warm-white",
    title: "Warm White Everyday — London",
    city: "London",
    image: "/images/project-london.jpg",
    description:
      "What permanent lighting looks like on a night with no occasion at all — clean warm-white curb appeal, no extension cords, nothing to take down.",
  },
  {
    slug: "tillsonburg-winter-blue",
    title: "Christmas in Deep Blue — Tillsonburg",
    city: "Tillsonburg",
    image: "/images/project-tillsonburg.jpg",
    description:
      "Mid-winter, mid-snowfall, and still running. Cold-rated to −40°C, so the display doesn't quit when the weather turns.",
  },
];

function slugFor(file) {
  return file.replace(/\.[a-z]+$/i, "");
}

function main() {
  if (!fs.existsSync(INCOMING)) {
    fs.mkdirSync(INCOMING, { recursive: true });
    console.log(`Created ${path.relative(ROOT, INCOMING)}`);
  }

  const found = [];
  const missing = [];
  for (const item of EXPECTED) {
    const src = path.join(INCOMING, item.file);
    const dest = path.join(IMAGES, item.file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      found.push(item);
      console.log(`  moved  ${item.file}`);
    } else if (fs.existsSync(dest)) {
      found.push(item);
      console.log(`  have   ${item.file}`);
    } else {
      missing.push(item.file);
    }
  }

  if (missing.length) {
    console.log(`\nStill waiting on ${missing.length} file(s) in public/images/incoming/:`);
    missing.forEach((f) => console.log(`  - ${f}`));
  }

  if (!found.length) {
    console.log("\nNothing to wire in yet. Save the photos and re-run.");
    process.exit(0);
  }

  // Rebuild projects.json: new residential shots first (strongest work
  // leads the gallery), then the kept residential, then commercial.
  const projects = [];
  let order = 1;
  for (const item of found) {
    projects.push({
      slug: slugFor(item.file),
      title: item.title,
      service: "new-installation",
      city: item.city,
      category: "residential",
      image: `/images/${item.file}`,
      description: item.description,
      featured: true,
      order: order++,
    });
  }
  for (const item of KEEP_RESIDENTIAL) {
    projects.push({ ...item, service: "new-installation", category: "residential", featured: true, order: order++ });
  }
  for (const item of COMMERCIAL) {
    projects.push({ ...item, service: "new-installation", category: "commercial", featured: false, order: order++ });
  }

  const out = path.join(ROOT, "src", "content", "projects.json");
  fs.writeFileSync(out, JSON.stringify(projects, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${projects.length} projects to src/content/projects.json`);

  // Report which hero/background swaps are now possible so they can be
  // made deliberately rather than silently.
  const have = new Set(found.map((f) => f.file));
  console.log("\nSuggested swaps now available:");
  if (have.has("install-teal-gradient.jpg"))
    console.log("  hero background  -> /images/install-teal-gradient.jpg (blue-hour sky, colour gradient)");
  if (have.has("install-soffit-detail-day.jpg"))
    console.log('  "vanishes by day" section -> /images/install-soffit-detail-day.jpg');
  if (have.has("install-driveway-approach.jpg"))
    console.log("  closing CTA background -> /images/install-driveway-approach.jpg");
  console.log("\nAlso add the new alt text where these are used as backgrounds:");
  found.forEach((f) => console.log(`  ${f.file}\n    ${f.alt}`));
}

main();
