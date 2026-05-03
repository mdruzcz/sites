"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

function s(formData: FormData, k: string): string {
  const v = formData.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function arr(formData: FormData, k: string): string[] {
  const v = s(formData, k);
  if (!v) return [];
  return v.split(/[,\n]+/).map((x) => x.trim()).filter(Boolean);
}
function maybeNum(v: string): number | null {
  if (!v) return null;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

export async function createWinner(formData: FormData) {
  const supabase = await getServerSupabase();

  const business_name = s(formData, "business_name");
  if (!business_name) redirect("/admin/winners/new?error=missing_business");

  const year = maybeNum(s(formData, "year")) ?? new Date().getFullYear();
  const city_id = s(formData, "city_id");
  const category_id = s(formData, "category_id");
  if (!city_id || !category_id) redirect("/admin/winners/new?error=missing_city_or_category");

  const slugBase = s(formData, "slug") || `${business_name}-${s(formData, "city_slug") || "on"}-${year}`;
  let slug = slugify(slugBase);
  // Ensure uniqueness with a numeric suffix if needed
  let attempt = 0;
  // try up to 10 variations
  while (attempt < 10) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    const { data: existing } = await supabase.from("sea_winners").select("id").eq("slug", candidate).maybeSingle();
    if (!existing) {
      slug = candidate;
      break;
    }
    attempt++;
  }

  const payload = {
    year,
    city_id,
    category_id,
    business_name,
    slug,
    tagline: s(formData, "tagline") || null,
    description: s(formData, "description") || null,
    address: s(formData, "address") || null,
    phone: s(formData, "phone") || null,
    email: s(formData, "email") || null,
    website: s(formData, "website") || null,
    photo_url: s(formData, "photo_url") || null,
    logo_url: s(formData, "logo_url") || null,
    services: arr(formData, "services"),
    service_areas: arr(formData, "service_areas"),
    established_year: maybeNum(s(formData, "established_year")),
    award_tier: (s(formData, "award_tier") || "winner") as "winner" | "finalist" | "honourable",
    is_published: s(formData, "is_published") === "on",
  };

  const { data, error } = await supabase.from("sea_winners").insert(payload).select("id, slug, city:sea_cities(slug), category:sea_categories(slug)").maybeSingle();

  if (error) {
    redirect(`/admin/winners/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/winners");
  revalidatePath("/");
  if (data?.city && data?.category) {
    const citySlug = (data.city as unknown as { slug: string }).slug;
    const catSlug = (data.category as unknown as { slug: string }).slug;
    revalidatePath(`/winners/${citySlug}`);
    revalidatePath(`/winners/${citySlug}/${catSlug}`);
  }

  const action = s(formData, "_action");
  if (action === "save_and_add_another") {
    redirect("/admin/winners/new?ok=1");
  }
  redirect(`/admin/winners?ok=1`);
}
