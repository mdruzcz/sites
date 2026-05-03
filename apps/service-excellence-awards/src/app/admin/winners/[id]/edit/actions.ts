"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";

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

export async function updateWinner(id: string, formData: FormData) {
  const supabase = await getServerSupabase();

  const payload = {
    year: maybeNum(s(formData, "year")) ?? new Date().getFullYear(),
    city_id: s(formData, "city_id"),
    category_id: s(formData, "category_id"),
    business_name: s(formData, "business_name"),
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

  const { data, error } = await supabase
    .from("sea_winners")
    .update(payload)
    .eq("id", id)
    .select("slug, city:sea_cities(slug), category:sea_categories(slug)")
    .maybeSingle();

  if (error) {
    redirect(`/admin/winners/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/winners");
  revalidatePath("/");
  if (data?.city && data?.category && data.slug) {
    const citySlug = (data.city as unknown as { slug: string }).slug;
    const catSlug = (data.category as unknown as { slug: string }).slug;
    revalidatePath(`/winners/${citySlug}`);
    revalidatePath(`/winners/${citySlug}/${catSlug}`);
    revalidatePath(`/winners/${citySlug}/${catSlug}/${data.slug}`);
  }

  redirect(`/admin/winners?ok=updated`);
}

export async function deleteWinner(id: string) {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("sea_winners").delete().eq("id", id);
  if (error) {
    redirect(`/admin/winners/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/winners");
  revalidatePath("/");
  redirect("/admin/winners?ok=deleted");
}
