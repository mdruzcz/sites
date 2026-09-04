import "server-only";
import { listProducts, getCategories, type CatalogProduct } from "@/lib/catalog";

/**
 * "Often bought together" rules. Each rule matches a product (by slug prefix or
 * category slug) and lists companion slugs in priority order. Unmatched
 * products fall back to siblings from the same category.
 */
const C9_COMPANIONS = [
  "c7-c9-christmas-light-wire", // C9 socket spool
  "male-quick-plug-adapter-spt-2",
  "female-quick-plug-adapter-spt-2",
  "spt-2-wire-spool-250ft-green", // SPT-2 wire
  "shingle-tab-light-clips" // clips
];

const RULES: { match: (p: CatalogProduct, cats: string[]) => boolean; slugs: string[] }[] = [
  { match: (p) => p.slug.startsWith("c9-faceted-bulb"), slugs: C9_COMPANIONS },
  { match: (p) => p.slug === "c7-c9-christmas-light-wire" || p.slug === "replacement-sockets", slugs: ["c9-faceted-bulb", "male-quick-plug-adapter-spt-2", "female-quick-plug-adapter-spt-2", "shingle-tab-light-clips", "spt-2-wire-spool-250ft-green"] },
  { match: (p) => p.slug.startsWith("spt-2-wire-spool"), slugs: ["male-quick-plug-adapter-spt-2", "female-quick-plug-adapter-spt-2", "replacement-sockets", "c9-faceted-bulb", "shingle-tab-light-clips"] },
  { match: (p) => p.slug.includes("quick-plug-adapter"), slugs: ["spt-2-wire-spool-250ft-green", "replacement-sockets", "c9-faceted-bulb", "c7-c9-christmas-light-wire", "shingle-tab-light-clips"] },
  { match: (_p, cats) => cats.includes("light-attachment-clips"), slugs: ["c7-c9-christmas-light-wire", "c9-faceted-bulb", "male-quick-plug-adapter-spt-2", "female-quick-plug-adapter-spt-2", "universal-light-stake"] },
  { match: (p) => p.slug.startsWith("mini-light-strands"), slugs: ["mini-light-adhesive-clip", "universal-light-stake", "c9-faceted-bulb", "shingle-tab-light-clips"] },
  { match: (p) => p.slug.startsWith("led-housing-package"), slugs: ["black-aluminum-track-5-hole-1m-3-28ft", "12v-led-puck-lights-10-pack", "5-8-white-soffit-screws-100-packs", "20-foot-led-light-extension-cable-waterproof", "led-light-amplifier"] },
  { match: (_p, cats) => cats.some((c) => ["aluminum-tracks", "led-puck-lights", "led-connectors", "permanent-lights"].includes(c)), slugs: ["led-housing-package-100", "black-aluminum-track-5-hole-1m-3-28ft", "12v-led-puck-lights-10-pack", "5-8-white-soffit-screws-100-packs", "led-power-injection-t-connector-male-female", "led-light-amplifier"] }
];

export async function relatedProducts(product: CatalogProduct, limit = 5): Promise<CatalogProduct[]> {
  const [all, categories] = await Promise.all([listProducts(), getCategories()]);
  const catById = new Map(categories.map((c) => [c.id, c.slug]));
  const slugsOf = (p: CatalogProduct) => (p.ecom_product_categories ?? []).map((j) => catById.get(j.category_id) ?? "");
  const mine = slugsOf(product);
  const bySlug = new Map(all.map((p) => [p.slug, p]));

  const picked: CatalogProduct[] = [];
  const rule = RULES.find((r) => r.match(product, mine));
  if (rule) {
    for (const s of rule.slugs) {
      const p = bySlug.get(s);
      if (p && p.id !== product.id && !picked.includes(p)) picked.push(p);
    }
  }
  // Fill from the same category, then anything else, until we have `limit`.
  for (const p of all) {
    if (picked.length >= limit) break;
    if (p.id === product.id || picked.includes(p)) continue;
    if (slugsOf(p).some((c) => mine.includes(c))) picked.push(p);
  }
  for (const p of all) {
    if (picked.length >= limit) break;
    if (p.id === product.id || picked.includes(p)) continue;
    picked.push(p);
  }
  return picked.slice(0, limit);
}
