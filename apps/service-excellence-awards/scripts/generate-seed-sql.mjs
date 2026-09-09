// Generates scripts/seed.sql for the 2026 winners from seed-winners.json + winner-image-manifest.json
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, "seed-winners.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(__dirname, "winner-image-manifest.json"), "utf8"));

const cityNames = {
  toronto: "Toronto", ottawa: "Ottawa", mississauga: "Mississauga", brampton: "Brampton",
  hamilton: "Hamilton", london: "London", kitchener: "Kitchener", windsor: "Windsor",
  vaughan: "Vaughan", markham: "Markham", brantford: "Brantford", woodstock: "Woodstock",
  tillsonburg: "Tillsonburg", burlington: "Burlington", oakville: "Oakville",
};

const q = (s) => (s === null || s === undefined ? "null" : `'${String(s).replace(/'/g, "''")}'`);
const pgTextArray = (arr) =>
  arr.length === 0 ? "'{}'" : `ARRAY[${arr.map((s) => q(s)).join(",")}]::text[]`;
const jsonb = (obj) => `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;

const lines = [];
lines.push("-- 2026 Service Excellence Award winners (generated)");
lines.push("delete from sea_winners where year = 2026;");
lines.push("");

for (const w of data.winners) {
  const img = manifest[w.slug] || { logo_url: null, photo_url: null, gallery: [] };
  const serviceAreas = [cityNames[w.city_slug] + ", ON"];
  lines.push(
    `insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (`
  );
  lines.push(`  2026,`);
  lines.push(`  (select id from sea_cities where slug = ${q(w.city_slug)}),`);
  lines.push(`  (select id from sea_categories where slug = ${q(w.category_slug)}),`);
  lines.push(`  ${q(w.business_name)}, ${q(w.slug)}, ${q(w.tagline)}, ${q(w.description)},`);
  lines.push(`  ${q(w.phone)}, ${q(w.email)}, ${q(w.website)},`);
  lines.push(`  ${q(img.photo_url)}, ${q(img.logo_url)}, ${pgTextArray(img.gallery)},`);
  lines.push(`  ${pgTextArray(w.services)}, ${pgTextArray(serviceAreas)}, ${jsonb(w.reviews)},`);
  lines.push(`  ${w.established_year ?? "null"}, 'winner', true`);
  lines.push(`);`);
  lines.push("");
}

lines.push("select count(*) as inserted from sea_winners where year = 2026;");

writeFileSync(join(__dirname, "seed.sql"), lines.join("\n"));
console.log(`Wrote seed.sql with ${data.winners.length} winners.`);
