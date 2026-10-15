/**
 * Import the Christmas Designers "commercial dimensional displays" set.
 *
 *   node scripts/import-xd.mjs            # dry run
 *   node scripts/import-xd.mjs --apply    # write via PostgREST (service-role key from .env.local)
 *
 * Data: scripts/data/xd-products.json (built by the scratchpad parser). Prices are
 * already CAD (USD final x 1.5) with a compare-at ~12% higher so the storefront shows
 * a sale. Existing products (update_existing) only get their price/compare-at updated.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const STORE_ID = "54798af3-1268-4a77-8cec-944332f1f437";

const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;

async function rest(method, table, { query = "", body, prefer } = {}) {
  const res = await fetch(`${URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    method,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", Prefer: prefer ?? (method === "POST" ? "return=representation" : "return=minimal") },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${table} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "xd-products.json"), "utf8"));
const imageDir = path.join(ROOT, "public", "images", "products");
const imageFiles = fs.readdirSync(imageDir);
const imagesFor = (slug) =>
  imageFiles.filter((f) => f.startsWith(`xd-${slug}-`) && /-(\d+)\.webp$/.test(f)).sort((a, b) => Number(a.match(/-(\d+)\.webp$/)[1]) - Number(b.match(/-(\d+)\.webp$/)[1]));
const skuFor = (slug) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return `HLS-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 16)}-${h.toString(36).toUpperCase().slice(0, 4)}`;
};

async function main() {
  const cats = await rest("GET", "ecom_categories", { query: `store_id=eq.${STORE_ID}&select=id,slug` });
  const catId = new Map(cats.map((c) => [c.slug, c.id]));
  const existing = await rest("GET", "ecom_products", { query: `store_id=eq.${STORE_ID}&select=id,slug,ecom_variants(id,price_cad,compare_at_price_cad)` });
  const bySlug = new Map(existing.map((p) => [p.slug, p]));

  let created = 0, updated = 0, skipped = 0;
  for (const p of data) {
    const imgs = imagesFor(p.cd_slug);
    const ex = bySlug.get(p.slug);
    if (ex) {
      console.log(`update ${p.slug}: ${ex.ecom_variants.map((v) => v.price_cad).join("/")} → ${p.price_cad} (was ${p.compare_at_cad})`);
      if (APPLY) for (const v of ex.ecom_variants) await rest("PATCH", "ecom_variants", { query: `id=eq.${v.id}`, body: { price_cad: p.price_cad, compare_at_price_cad: p.compare_at_cad } });
      updated++;
      continue;
    }
    if (!imgs.length) {
      console.warn(`skip (no images): ${p.slug}`);
      skipped++;
      continue;
    }
    console.log(`create ${p.slug}: $${p.price_cad} (was $${p.compare_at_cad}) · ${imgs.length} img · ${p.cats.join("+")}`);
    if (!APPLY) continue;
    const [prod] = await rest("POST", "ecom_products", {
      body: { store_id: STORE_ID, slug: p.slug, name: p.name, short_description: p.short, long_description: p.long, status: "active", featured: false, meta_title: `${p.name} | Holiday Light Supplies`, meta_description: p.short.slice(0, 158), search_keywords: p.cats.join(","), source_url: p.source_url }
    });
    const [variant] = await rest("POST", "ecom_variants", {
      body: [{ product_id: prod.id, sku: skuFor(p.slug), name: "Standard", position: 0, price_cad: p.price_cad, compare_at_price_cad: p.compare_at_cad, attribute_type: null, attribute_value: null, attributes_json: { source_usd_final: p.usd_final, source_usd_old: p.usd_old }, is_active: true }]
    });
    await rest("POST", "ecom_inventory", { body: [{ variant_id: variant.id, on_hand: 25, reserved: 0, low_stock_threshold: 2, track_inventory: true, allow_backorder: true }], prefer: "return=minimal" });
    await rest("POST", "ecom_product_images", {
      body: imgs.map((file, i) => ({ product_id: prod.id, storage_path: `local/holiday-light-supplies/${p.slug}/${file}`, public_url: `/images/products/${file}`, alt_text: i === 0 ? `${p.name} — commercial Christmas display from Holiday Light Supplies` : `${p.name}, view ${i + 1}`, sort_order: i, is_primary: i === 0 })),
      prefer: "return=minimal"
    });
    const rows = p.cats.map((c) => catId.get(c)).filter(Boolean).map((category_id) => ({ product_id: prod.id, category_id }));
    if (rows.length) await rest("POST", "ecom_product_categories", { body: rows, prefer: "return=minimal" });
    created++;
  }
  console.log(`${APPLY ? "done" : "dry run"} — created ${created}, updated ${updated}, skipped ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
