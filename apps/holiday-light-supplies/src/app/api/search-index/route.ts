import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { STORE_SLUG, isQuoteOnly } from "@/lib/utils";

/**
 * The compact catalog the header search ranks in the browser: one fetch when the
 * search opens, then every keystroke is answered locally with lib/search.ts.
 * Cached at the edge so typing never touches the database.
 */
export const revalidate = 600;

export interface SearchIndexItem {
  slug: string;
  name: string;
  short_description: string | null;
  image_url: string | null;
  min_price: number;
  skus: string[];
  categories: string[];
}

export interface SearchIndex {
  products: SearchIndexItem[];
  categories: { slug: string; name: string; count: number }[];
}

export async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data: store } = await supabase.from("ecom_stores").select("id").eq("slug", STORE_SLUG).maybeSingle();
  if (!store) return NextResponse.json({ products: [], categories: [] } satisfies SearchIndex);

  const [{ data: cats }, { data: prods }] = await Promise.all([
    supabase.from("ecom_categories").select("id, slug, name").eq("store_id", store.id).eq("is_active", true).order("sort_order"),
    supabase
      .from("ecom_products")
      .select("slug, name, short_description, featured, ecom_variants(sku, price_cad, is_active), ecom_product_images(public_url, is_primary, sort_order), ecom_product_categories(category_id)")
      .eq("store_id", store.id)
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("name")
  ]);

  const catName = new Map((cats ?? []).map((c) => [c.id, CATEGORY_META[c.slug]?.title ?? c.name]));
  const counts = new Map<string, number>();

  const products: SearchIndexItem[] = (prods ?? []).map((p) => {
    const variants = ((p.ecom_variants ?? []) as { sku: string; price_cad: number; is_active: boolean }[]).filter((v) => v.is_active);
    const prices = variants.map((v) => Number(v.price_cad));
    const real = prices.filter((n) => n > 0);
    const imgs = (p.ecom_product_images ?? []) as { public_url: string | null; is_primary: boolean; sort_order: number }[];
    const primary = imgs.find((i) => i.is_primary) ?? [...imgs].sort((a, b) => a.sort_order - b.sort_order)[0];
    const catIds = ((p.ecom_product_categories ?? []) as { category_id: string }[]).map((j) => j.category_id);
    for (const id of catIds) counts.set(id, (counts.get(id) ?? 0) + 1);
    return {
      slug: p.slug,
      name: p.name,
      short_description: p.short_description,
      image_url: primary?.public_url ?? null,
      min_price: isQuoteOnly(prices) || !real.length ? 0 : Math.min(...real),
      skus: variants.map((v) => v.sku),
      categories: catIds.map((id) => catName.get(id)).filter((n): n is string => !!n)
    };
  });

  const categories = (cats ?? [])
    .map((c) => ({ slug: c.slug, name: catName.get(c.id) ?? c.name, count: counts.get(c.id) ?? 0 }))
    .filter((c) => c.count > 0);

  return NextResponse.json({ products, categories } satisfies SearchIndex, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" }
  });
}
