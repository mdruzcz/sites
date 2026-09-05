import "server-only";
import { listProducts, getCategories, type CatalogProduct } from "@/lib/catalog";

/**
 * "Often bought together" rules: match a product by slug or category and list
 * companion slugs in priority order. Unmatched products fall back to siblings
 * from the same category.
 */
const KIT_COMPANIONS = [
  "aluminum-track-12v-led-lights-2-pack",
  "12v-led-puck-lights-10-pack",
  "20-foot-connector-for-12-24v-led-lights",
  "t-power-injection-connector-for-12-24v-led",
  "amplifier-for-12v-led-lights",
  "white-soffit-screws-5-8-100pk"
];

const RULES: { match: (p: CatalogProduct, cats: string[]) => boolean; slugs: string[] }[] = [
  { match: (p) => p.slug.startsWith("led-housing-package"), slugs: KIT_COMPANIONS },
  { match: (p) => p.slug.includes("puck-lights"), slugs: ["aluminum-track-12v-led-lights-2-pack", "2-channel-12v-led-controller", "12v-150w-power-supply", "5-foot-connector-for-12-24v-led-lights", "t-connector-for-12-24v-led-lights"] },
  { match: (p) => p.slug.includes("aluminum-track"), slugs: ["12v-led-puck-lights-10-pack", "white-soffit-screws-5-8-100pk", "black-soffit-screws-5-8-100pk", "brown-soffit-screws-5-8-100pk", "beige-soffit-screws-5-8-100pk"] },
  { match: (p) => p.slug.includes("soffit-screws"), slugs: ["aluminum-track-12v-led-lights-2-pack", "12v-led-puck-lights-10-pack", "1-foot-connector-for-12-24v-led-lights", "t-connector-for-12-24v-led-lights"] },
  { match: (p) => p.slug.includes("controller"), slugs: ["12v-150w-power-supply", "12v-200w-led-power-supply", "20ft-pwr-inj-cable-for-controller", "amplifier-for-12v-led-lights", "12v-led-puck-lights-10-pack"] },
  { match: (p) => p.slug.includes("power-supply"), slugs: ["t-power-injection-connector-for-12-24v-led", "20ft-power-inj-extension-cable", "t-connector-for-pwr-inj", "2-channel-12v-led-controller", "12v-led-puck-lights-10-pack"] },
  { match: (p) => p.slug.includes("connector") || p.slug.includes("cable") || p.slug.includes("amplifier"), slugs: ["12v-led-puck-lights-10-pack", "aluminum-track-12v-led-lights-2-pack", "t-power-injection-connector-for-12-24v-led", "12v-60w-pwr-supply-for-power-inj", "20-foot-connector-for-12-24v-led-lights"] },
  { match: (p) => p.slug.includes("string-lights") || p.slug.includes("soffit-light"), slugs: ["12v-150w-power-supply", "20-foot-connector-for-12-24v-led-lights", "2-channel-12v-led-controller", "t-connector-for-12-24v-led-lights"] }
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
      if (picked.length >= limit) break;
    }
  }
  if (picked.length < limit) {
    for (const p of all) {
      if (p.id === product.id || picked.includes(p)) continue;
      if (slugsOf(p).some((c) => mine.includes(c))) picked.push(p);
      if (picked.length >= limit) break;
    }
  }
  if (picked.length < limit) {
    for (const p of all) {
      if (p.id === product.id || picked.includes(p)) continue;
      picked.push(p);
      if (picked.length >= limit) break;
    }
  }
  return picked.slice(0, limit);
}
