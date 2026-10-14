import "server-only";
import { cache } from "react";
import { getServerSupabase } from "@/lib/supabase/server";
import { STORE_SLUG, isQuoteOnly } from "@/lib/utils";

export const getStore = cache(async () => {
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("ecom_stores").select("*").eq("slug", STORE_SLUG).maybeSingle();
  return data;
});

export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
}

export const getCategories = cache(async (): Promise<CatalogCategory[]> => {
  const store = await getStore();
  if (!store) return [];
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_categories")
    .select("id, slug, name, description, sort_order")
    .eq("store_id", store.id)
    .eq("is_active", true)
    .order("sort_order");
  return (data as CatalogCategory[]) ?? [];
});

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  status: string;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at?: string;
  ecom_variants: {
    id: string;
    sku: string;
    name: string;
    price_cad: number;
    compare_at_price_cad?: number | null;
    attribute_type: string | null;
    attribute_value: string | null;
    is_active: boolean;
    ecom_inventory: { on_hand: number } | { on_hand: number }[] | null;
  }[];
  ecom_product_images: {
    id: string;
    public_url: string | null;
    alt_text: string;
    sort_order: number;
    is_primary: boolean;
  }[];
  ecom_product_categories?: { category_id: string }[];
}

const LIST_SELECT =
  "id, slug, name, short_description, status, featured, created_at, ecom_variants(id, sku, name, price_cad, compare_at_price_cad, is_active), ecom_product_images(id, public_url, alt_text, sort_order, is_primary), ecom_product_categories(category_id)";

/** Every active product in the store, cached per request. Filtering happens in memory — the catalog is ~150 rows. */
export const listAllProducts = cache(async (): Promise<CatalogProduct[]> => {
  const store = await getStore();
  if (!store) return [];
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("ecom_products").select(LIST_SELECT).eq("store_id", store.id).eq("status", "active").order("name");
  return ((data as unknown as CatalogProduct[]) ?? []).map((p) => ({
    ...p,
    ecom_product_images: [...(p.ecom_product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  }));
});

export async function listProducts(opts: { categorySlug?: string; featuredOnly?: boolean; limit?: number; newest?: boolean } = {}) {
  let products = await listAllProducts();
  if (opts.featuredOnly) products = products.filter((p) => p.featured);
  if (opts.categorySlug) {
    const cats = await getCategories();
    const cat = cats.find((c) => c.slug === opts.categorySlug);
    if (!cat) return [];
    products = products.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id));
  }
  if (opts.newest) products = [...products].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  if (opts.limit) products = products.slice(0, opts.limit);
  return products;
}

export async function getProduct(slug: string): Promise<CatalogProduct | null> {
  const store = await getStore();
  if (!store) return null;
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_products")
    .select(
      "id, slug, name, short_description, long_description, status, featured, meta_title, meta_description, created_at, ecom_variants(id, sku, name, price_cad, compare_at_price_cad, attribute_type, attribute_value, is_active, ecom_inventory(on_hand)), ecom_product_images(id, public_url, alt_text, sort_order, is_primary), ecom_product_categories(category_id)"
    )
    .eq("store_id", store.id)
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return null;
  const p = data as unknown as CatalogProduct;
  return { ...p, ecom_product_images: [...(p.ecom_product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order) };
}

export function primaryImage(product: Pick<CatalogProduct, "ecom_product_images">) {
  return product.ecom_product_images.find((i) => i.is_primary) ?? product.ecom_product_images[0] ?? null;
}

export function secondaryImage(product: Pick<CatalogProduct, "ecom_product_images">) {
  const primary = primaryImage(product);
  return product.ecom_product_images.find((i) => i.id !== primary?.id && i.public_url) ?? null;
}

export function priceRange(product: Pick<CatalogProduct, "ecom_variants">) {
  const prices = (product.ecom_variants ?? [])
    .filter((v) => v.is_active)
    .map((v) => Number(v.price_cad))
    .filter((n) => !Number.isNaN(n));
  if (!prices.length) return null;
  if (isQuoteOnly(prices)) return { min: 0, max: 0, quoteOnly: true as const };
  const real = prices.filter((p) => p > 0);
  return { min: Math.min(...real), max: Math.max(...real), quoteOnly: false as const };
}

/** Category slugs a product belongs to. */
export function productCategorySlugs(product: CatalogProduct, categories: CatalogCategory[]) {
  const byId = new Map(categories.map((c) => [c.id, c.slug]));
  return (product.ecom_product_categories ?? []).map((j) => byId.get(j.category_id)).filter((s): s is string => !!s);
}

/* ---------- "Often bought together" rules ---------- */

const C9_COMPANIONS = ["c9-empty-socket-spt-1-10-pack", "spt-2-vampire-gilbert-plugs-10-pcs", "spt-1-wire-spool-250ft-green", "lawn-stakes-100-pack", "easy-peasy-hook-10-pack", "christmas-light-timer"];

const RULES: { match: (p: CatalogProduct, cats: string[]) => boolean; slugs: string[] }[] = [
  { match: (p) => p.slug.startsWith("c9-faceted-bulb"), slugs: C9_COMPANIONS },
  { match: (p) => p.slug.includes("socket") || p.slug.includes("wire-spool") || p.slug.includes("light-spool"), slugs: ["c9-faceted-bulb-warm-white", "c9-faceted-bulb", "spt-2-vampire-gilbert-plugs-10-pcs", "polarized-spt1-plugs-male-female", "christmas-light-timer"] },
  { match: (p) => p.slug.includes("vampire") || p.slug.includes("plug"), slugs: ["spt-1-wire-spool-250ft-green", "c9-faceted-bulb-warm-white", "christmas-light-timer", "easy-peasy-hook-10-pack"] },
  { match: (p) => p.slug.startsWith("mini-lights"), slugs: ["easy-peasy-hook-10-pack", "christmas-light-timer", "lawn-stakes-100-pack", "c9-faceted-bulb-warm-white"] },
  { match: (p) => p.slug.startsWith("permanent-lighting-kit"), slugs: ["permanent-lighting-kit-100ft", "permanent-lighting-kit-150ft", "permanent-lighting-kit-200ft", "permanent-lighting-kit-50ft"] },
  { match: (_p, cats) => cats.includes("garlands-and-wreathes"), slugs: ["red-structural-bow", "premium-red-outdura-bow", "scotch-pine-garland-10-ft", "mountain-pine-garland-10-ft", "mini-lights-5mm-warm-and-pure-white"] },
  { match: (_p, cats) => cats.includes("commercial-bows"), slugs: ["olympia-pine-wreath", "classic-decorated-commercial-wreath", "scotch-pine-garland-10-ft", "large-gift-boxes-with-bow"] },
  { match: (_p, cats) => cats.includes("trees"), slugs: ["gold-moravian-led-tree-top-star", "crystal-star-tree-topper", "shiny-round-ornaments-sets", "classic-theme-pre-decorated-christmas-tree"] },
  { match: (_p, cats) => cats.includes("pole-mount-decor"), slugs: ["mini-lights-5mm-warm-and-pure-white", "christmas-light-timer", "36in-center-mount-lamp-post-wreath-with-bow"] }
];

export async function relatedProducts(product: CatalogProduct, limit = 4): Promise<CatalogProduct[]> {
  const [all, categories] = await Promise.all([listAllProducts(), getCategories()]);
  const mine = productCategorySlugs(product, categories);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const picked: CatalogProduct[] = [];
  const rule = RULES.find((r) => r.match(product, mine));
  if (rule) {
    for (const s of rule.slugs) {
      const p = bySlug.get(s);
      if (p && p.id !== product.id && !picked.includes(p)) picked.push(p);
    }
  }
  // Same category next, then featured, then anything.
  const sameCat = all.filter((p) => p.id !== product.id && !picked.includes(p) && productCategorySlugs(p, categories).some((c) => mine.includes(c)));
  for (const p of sameCat) {
    if (picked.length >= limit) break;
    picked.push(p);
  }
  for (const p of all.filter((p) => p.featured)) {
    if (picked.length >= limit) break;
    if (p.id !== product.id && !picked.includes(p)) picked.push(p);
  }
  for (const p of all) {
    if (picked.length >= limit) break;
    if (p.id !== product.id && !picked.includes(p)) picked.push(p);
  }
  return picked.slice(0, limit);
}
