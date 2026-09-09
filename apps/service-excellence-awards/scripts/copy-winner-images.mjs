// Copies each winner's source logo + photos from its app's public/ into
// service-excellence-awards/public/images/winners/<slug>/ and writes manifest.json
// with the resolved logo_url / photo_url / gallery paths (only for files that exist).
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const awardRoot = resolve(__dirname, "..");
const appsRoot = resolve(awardRoot, "..");
const data = JSON.parse(readFileSync(join(__dirname, "seed-winners.json"), "utf8"));

const outBase = join(awardRoot, "public", "images", "winners");
mkdirSync(outBase, { recursive: true });

const manifest = {};
let copied = 0;
const missing = [];

function srcAbs(appDir, p) {
  // p like "/images/foo.jpg" -> apps/<appDir>/public/images/foo.jpg
  return join(appsRoot, appDir, "public", p.replace(/^\//, ""));
}

for (const w of data.winners) {
  const destDir = join(outBase, w.slug);
  const rec = { logo_url: null, photo_url: null, gallery: [] };

  // logo
  if (w.src_logo) {
    const src = srcAbs(w.app_dir, w.src_logo);
    if (existsSync(src)) {
      mkdirSync(destDir, { recursive: true });
      const ext = extname(src).toLowerCase() || ".png";
      const destName = `logo${ext}`;
      copyFileSync(src, join(destDir, destName));
      rec.logo_url = `/images/winners/${w.slug}/${destName}`;
      copied++;
    } else {
      missing.push(`${w.slug} logo: ${w.src_logo}`);
    }
  }

  // photos
  let idx = 0;
  for (const ph of w.src_photos || []) {
    const src = srcAbs(w.app_dir, ph);
    if (existsSync(src)) {
      mkdirSync(destDir, { recursive: true });
      idx++;
      const ext = extname(src).toLowerCase() || ".jpg";
      const destName = `photo-${idx}${ext}`;
      copyFileSync(src, join(destDir, destName));
      const url = `/images/winners/${w.slug}/${destName}`;
      if (!rec.photo_url) rec.photo_url = url;
      else rec.gallery.push(url);
      copied++;
    } else {
      missing.push(`${w.slug} photo: ${ph}`);
    }
  }

  manifest[w.slug] = rec;
}

writeFileSync(join(__dirname, "winner-image-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Copied ${copied} files.`);
console.log(`Winners with NO photo: ${Object.entries(manifest).filter(([, r]) => !r.photo_url).map(([s]) => s).join(", ") || "none"}`);
console.log(`Winners with NO logo: ${Object.entries(manifest).filter(([, r]) => !r.logo_url).map(([s]) => s).join(", ") || "none"}`);
console.log(`\nMissing source files (${missing.length}):`);
missing.forEach((m) => console.log("  - " + m));
