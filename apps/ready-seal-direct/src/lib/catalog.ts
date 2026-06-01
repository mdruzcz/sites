import "server-only";
import { cache } from "react";
import { getServerSupabase } from "@/lib/supabase/server";
import { STORE_SLUG } from "@/lib/utils";

export const getStore = cache(async () => {
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_stores")
    .select("*")
    .eq("slug", STORE_SLUG)
    .maybeSingle();
  return data;
});

export const getCategories = cache(async () => {
  const store = await getStore();
  if (!store) return [];
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_categories")
    .select("id, slug, name, description, sort_order")
    .eq("store_id", store.id)
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
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
  ecom_variants: {
    id: string;
    sku: string;
    name: string;
    price_cad: number;
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

export async function listProducts(opts: { categorySlug?: string; featuredOnly?: boolean; limit?: number } = {}) {
  const store = await getStore();
  if (!store) return [];
  const supabase = await getServerSupabase();

  let q = supabase
    .from("ecom_products")
    .select(
      "id, slug, name, short_description, status, featured, ecom_variants(id, sku, price_cad, is_active), ecom_product_images(id, public_url, alt_text, sort_order, is_primary), ecom_product_categories(category_id)"
    )
    .eq("store_id", store.id)
    .eq("status", "active")
    .order("name");

  if (opts.featuredOnly) q = q.eq("featured", true);
  if (opts.limit) q = q.limit(opts.limit);

  const { data } = await q;
  let products = (data as CatalogProduct[]) ?? [];

  if (opts.categorySlug) {
    const cats = await getCategories();
    const cat = cats.find((c) => c.slug === opts.categorySlug);
    if (!cat) return [];
    products = products.filter((p) =>
      (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)
    );
  }

  return products;
}

export async function getProduct(slug: string): Promise<CatalogProduct | null> {
  const store = await getStore();
  if (!store) return null;
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_products")
    .select(
      "id, slug, name, short_description, long_description, status, featured, meta_title, meta_description, ecom_variants(id, sku, name, price_cad, attribute_type, attribute_value, is_active, ecom_inventory(on_hand)), ecom_product_images(id, public_url, alt_text, sort_order, is_primary)"
    )
    .eq("store_id", store.id)
    .eq("slug", slug)
    .maybeSingle();
  return (data as CatalogProduct) ?? null;
}

export function primaryImage(product: Pick<CatalogProduct, "ecom_product_images">) {
  return (
    product.ecom_product_images.find((i) => i.is_primary) ??
    product.ecom_product_images[0] ??
    null
  );
}

export function priceRange(product: Pick<CatalogProduct, "ecom_variants">) {
  const prices = (product.ecom_variants ?? [])
    .filter((v) => v.is_active)
    .map((v) => Number(v.price_cad))
    .filter((n) => !Number.isNaN(n));
  if (!prices.length) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max };
}
