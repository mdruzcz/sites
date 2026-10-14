/**
 * Import the 2026-10 catalog additions into the shared Supabase project.
 *
 *   node scripts/import-additions.mjs            # dry run — prints what would change
 *   node scripts/import-additions.mjs --apply    # writes via PostgREST with the service-role key
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local.
 * Idempotent: products that already exist (by slug) are skipped; categories are
 * upserted by slug; kit prices are updated in place.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CCS, CD, NEW_CATEGORIES, CATEGORY_DESCRIPTION_UPDATES, KIT_PRICES, KIT_FOOTER, toCad } from "./catalog-additions.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const STORE_ID = "54798af3-1268-4a77-8cec-944332f1f437";

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(ROOT, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing Supabase env");

async function rest(method, table, { query = "", body, prefer } = {}) {
  const res = await fetch(`${URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    method,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: prefer ?? (method === "POST" ? "return=representation" : "return=minimal")
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${table} ${res.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : null;
}

const ccsSource = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "ccs-source.json"), "utf8"));
const cdSource = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "cd-source.json"), "utf8"));
const imageDir = path.join(ROOT, "public", "images", "products");
const imageFiles = fs.readdirSync(imageDir);

function imagesFor(prefix) {
  return imageFiles
    .filter((f) => f.startsWith(prefix + "-") && /-(\d+)\.webp$/.test(f))
    .sort((a, b) => Number(a.match(/-(\d+)\.webp$/)[1]) - Number(b.match(/-(\d+)\.webp$/)[1]));
}

function skuFor(slug, i) {
  const base = slug.toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 18);
  return `HLS-${base}-${String(i + 1).padStart(2, "0")}`;
}

function cdLong(entry, src) {
  const specs = src.specs ?? [];
  const pick = (label) => specs.filter(([k]) => k.trim().toLowerCase() === label.toLowerCase()).map(([, v]) => v.trim());
  const lines = [];
  const dims = ["Length", "Depth", "Height", "Weight"].map((k) => [k, pick(k)]).filter(([, v]) => v.length);
  const elec = ["Watts", "Volts", "LEDs", "Static LEDs", "Flashing LEDs", "IP Code", "Transformer W", "Lighting", "Lights", "LED Lights", "Structure", "Netting"].map((k) => [k, pick(k)]).filter(([, v]) => v.length);
  lines.push("## Description", entry.blurb, "", "## Features", "- Commercial-grade aluminum frame with LED netting", "- 24 V low-voltage through a weatherproof transformer", "- Rated for outdoor use in Canadian winters", "- Quoted per project with freight and lead time; multi-piece and public-sector pricing available");
  if (dims.length || src.sizes_m?.length) {
    lines.push("", "## Dimensions");
    if (src.sizes_m?.length) lines.push(`- Available sizes: ${src.sizes_m.map((s) => `${s} m`).join(", ")}`);
    for (const [k, v] of dims) lines.push(`- ${k}: ${Array.from(new Set(v)).join(" / ")}`);
  }
  if (elec.length) {
    lines.push("", "## Specifications");
    for (const [k, v] of elec) {
      const vals = Array.from(new Set(v.map((x) => x.replace(/^0\.\d+$/, (m) => `${Math.round(Number(m) * 100)}%`))));
      lines.push(`- ${k === "IP Code" ? "IP rating" : k}: ${vals.join(" / ")}`);
    }
  }
  return lines.join("\n");
}

function buildCcs(entry) {
  const src = ccsSource.find((s) => s.handle === entry.handle);
  if (!src) throw new Error(`No CCS source for ${entry.handle}`);
  let variants = src.variants.filter((v) => (entry.filter ? entry.filter(v) : true));
  // de-dupe by name
  const seen = new Set();
  variants = variants.filter((v) => {
    const n = entry.variantName(v);
    if (seen.has(n)) return false;
    seen.add(n);
    return true;
  });
  if (!variants.length) throw new Error(`No variants left for ${entry.handle}`);
  return {
    slug: entry.slug,
    name: entry.name,
    short_description: entry.short,
    long_description: entry.long,
    featured: !!entry.featured,
    cats: entry.cats,
    meta_title: `${entry.name} | Holiday Light Supplies`,
    meta_description: entry.short.slice(0, 158),
    search_keywords: entry.cats.join(","),
    images: imagesFor(`ccs-${entry.handle}`),
    variants: variants.map((v, i) => ({
      sku: skuFor(entry.slug, i),
      name: entry.variantName(v),
      position: i,
      price_cad: toCad(v.usd),
      attribute_type: entry.attributeType,
      attribute_value: entry.attributeType ? entry.variantName(v) : null,
      attributes_json: { source_usd: v.usd, source_title: v.title },
      is_active: true,
      on_hand: 100
    }))
  };
}

function buildCd(entry) {
  const src = cdSource[entry.key];
  if (!src) throw new Error(`No CD source for ${entry.key}`);
  const sizes = src.sizes_m?.length ? src.sizes_m : null;
  const variants = (sizes ?? ["Standard"]).map((s, i) => ({
    sku: skuFor(entry.slug, i),
    name: sizes ? `${s} m` : "Standard",
    position: i,
    price_cad: 0,
    attribute_type: sizes ? "Size" : null,
    attribute_value: sizes ? `${s} m` : null,
    attributes_json: { quote_only: true },
    is_active: true,
    on_hand: 10
  }));
  return {
    slug: entry.slug,
    name: entry.name,
    short_description: entry.short,
    long_description: cdLong(entry, src),
    featured: !!entry.featured,
    cats: entry.cats,
    meta_title: `${entry.name} — 3D LED Display | Holiday Light Supplies`,
    meta_description: entry.short.slice(0, 158),
    search_keywords: entry.cats.join(","),
    images: imagesFor(`cd-${entry.key}`),
    variants
  };
}

async function main() {
  const products = [...CCS.map(buildCcs), ...CD.map(buildCd)];
  const missingImages = products.filter((p) => !p.images.length).map((p) => p.slug);
  console.log(`${products.length} products prepared; ${products.reduce((n, p) => n + p.variants.length, 0)} variants; ${products.reduce((n, p) => n + p.images.length, 0)} images`);
  if (missingImages.length) console.warn("No images for:", missingImages);
  for (const p of products) {
    const prices = p.variants.map((v) => v.price_cad);
    console.log(`- ${p.slug}: ${p.variants.length} var ${prices[0] ? `$${Math.min(...prices)}–$${Math.max(...prices)}` : "quote"} · ${p.images.length} img · ${p.cats.join("+")}`);
  }

  // Categories
  const existingCats = await rest("GET", "ecom_categories", { query: `store_id=eq.${STORE_ID}&select=id,slug` });
  const catId = new Map(existingCats.map((c) => [c.slug, c.id]));
  for (const c of NEW_CATEGORIES) {
    if (catId.has(c.slug)) {
      console.log(`category exists: ${c.slug}`);
      continue;
    }
    console.log(`category NEW: ${c.slug}`);
    if (APPLY) {
      const [row] = await rest("POST", "ecom_categories", { body: { store_id: STORE_ID, ...c, is_active: true } });
      catId.set(c.slug, row.id);
    }
  }
  for (const [slug, description] of Object.entries(CATEGORY_DESCRIPTION_UPDATES)) {
    if (!catId.has(slug)) continue;
    if (APPLY) await rest("PATCH", "ecom_categories", { query: `id=eq.${catId.get(slug)}`, body: { description } });
  }
  console.log(APPLY ? "category descriptions updated" : "category descriptions would update");

  // Kits
  const kits = await rest("GET", "ecom_products", { query: `store_id=eq.${STORE_ID}&slug=like.permanent-lighting-kit*&select=id,slug,long_description,ecom_variants(id,price_cad)` });
  for (const k of kits) {
    const price = KIT_PRICES[k.slug];
    if (!price) continue;
    const needsFooter = !(k.long_description ?? "").includes("Supplied by Forever Lights");
    console.log(`kit ${k.slug}: ${k.ecom_variants.map((v) => v.price_cad).join("/")} → ${price}${needsFooter ? " (+footer)" : ""}`);
    if (APPLY) {
      for (const v of k.ecom_variants) await rest("PATCH", "ecom_variants", { query: `id=eq.${v.id}`, body: { price_cad: price } });
      if (needsFooter) await rest("PATCH", "ecom_products", { query: `id=eq.${k.id}`, body: { long_description: (k.long_description ?? "") + KIT_FOOTER } });
    }
  }

  // Products
  const existing = await rest("GET", "ecom_products", { query: `store_id=eq.${STORE_ID}&select=slug` });
  const existingSlugs = new Set(existing.map((p) => p.slug));
  let created = 0;
  for (const p of products) {
    if (existingSlugs.has(p.slug)) {
      console.log(`skip existing: ${p.slug}`);
      continue;
    }
    if (!APPLY) continue;
    const [prod] = await rest("POST", "ecom_products", {
      body: {
        store_id: STORE_ID,
        slug: p.slug,
        name: p.name,
        short_description: p.short_description,
        long_description: p.long_description,
        brand: null,
        status: "active",
        featured: p.featured,
        meta_title: p.meta_title,
        meta_description: p.meta_description,
        search_keywords: p.search_keywords
      }
    });
    const variantRows = await rest("POST", "ecom_variants", {
      body: p.variants.map((v) => ({
        product_id: prod.id,
        sku: v.sku,
        name: v.name,
        position: v.position,
        price_cad: v.price_cad,
        attribute_type: v.attribute_type,
        attribute_value: v.attribute_value,
        attributes_json: v.attributes_json,
        is_active: v.is_active
      }))
    });
    await rest("POST", "ecom_inventory", {
      body: variantRows.map((v, i) => ({ variant_id: v.id, on_hand: p.variants[i].on_hand, reserved: 0, low_stock_threshold: 5, track_inventory: p.variants[i].price_cad > 0, allow_backorder: p.variants[i].price_cad <= 0 })),
      prefer: "return=minimal"
    });
    if (p.images.length) {
      await rest("POST", "ecom_product_images", {
        body: p.images.map((file, i) => ({
          product_id: prod.id,
          storage_path: `local/holiday-light-supplies/${p.slug}/${file}`,
          public_url: `/images/products/${file}`,
          alt_text: i === 0 ? `${p.name} — commercial Christmas lighting from Holiday Light Supplies` : `${p.name}, view ${i + 1}`,
          sort_order: i,
          is_primary: i === 0
        })),
        prefer: "return=minimal"
      });
    }
    const catRows = p.cats.map((c) => catId.get(c)).filter(Boolean);
    if (catRows.length) {
      await rest("POST", "ecom_product_categories", { body: catRows.map((category_id) => ({ product_id: prod.id, category_id })), prefer: "return=minimal" });
    }
    created++;
    console.log(`created ${p.slug} (${variantRows.length} variants, ${p.images.length} images)`);
  }
  console.log(APPLY ? `done — ${created} products created` : "dry run complete (pass --apply to write)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
