import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { CURRENT_YEAR } from "@/lib/types";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { withMedia } from "@/lib/winner-media";
import type { WinnerIndex, WinnerIndexEntry } from "@/lib/search-match";

export type { WinnerIndex, WinnerIndexEntry } from "@/lib/search-match";
export { scoreWinner } from "@/lib/search-match";

/**
 * Every published winner for the current year with on-disk media applied.
 * Uses a cookie-less anon client (public data only) so pages that embed the
 * header lookup can still be statically rendered and ISR-cached; wrapped in
 * React cache() so layout + page share one query per request.
 */
export const getWinnerIndex = cache(async function getWinnerIndex(): Promise<WinnerIndex> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("[search-index] Supabase env vars missing");
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const [citiesRes, categoriesRes, winnersRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
    supabase
      .from("sea_winners")
      .select("*, city:sea_cities(*), category:sea_categories(*)")
      .eq("year", CURRENT_YEAR)
      .eq("is_published", true)
      .order("business_name", { ascending: true }),
  ]);
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];
  const winners = ((winnersRes.data ?? []) as WinnerWithRefs[]).map((raw) => {
    const w = withMedia(raw);
    return {
      slug: w.slug,
      name: w.business_name,
      tagline: w.tagline,
      city: w.city.name,
      citySlug: w.city.slug,
      province: w.city.province,
      category: w.category.name,
      categorySlug: w.category.slug,
      services: Array.isArray(w.services) ? w.services : [],
      areas: Array.isArray(w.service_areas) ? w.service_areas : [],
      photo: w.photo_url,
      logo: w.logo_url,
      year: w.year,
      tier: w.award_tier,
      reviews: Array.isArray(w.reviews) ? w.reviews.length : 0,
      href: `/winners/${w.city.slug}/${w.category.slug}/${w.slug}`,
    } satisfies WinnerIndexEntry;
  });
  return {
    winners,
    cities: cities.map((c) => ({ slug: c.slug, name: c.name, province: c.province })),
    categories: categories.map((c) => ({ slug: c.slug, name: c.name })),
  };
});
