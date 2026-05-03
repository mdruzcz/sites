"use server";

import { getServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function submitNomination(formData: FormData) {
  const f = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const business_name = f("business_name");
  if (!business_name) {
    redirect("/nominate?error=missing_business");
  }

  const supabase = await getServerSupabase();

  // Map slug → id for city / category if provided
  let city_id: string | null = null;
  let category_id: string | null = null;
  const citySlug = f("city");
  const catSlug = f("category");
  if (citySlug) {
    const { data } = await supabase.from("sea_cities").select("id").eq("slug", citySlug).maybeSingle();
    city_id = data?.id ?? null;
  }
  if (catSlug) {
    const { data } = await supabase.from("sea_categories").select("id").eq("slug", catSlug).maybeSingle();
    category_id = data?.id ?? null;
  }

  const { error } = await supabase.from("sea_nominations").insert({
    business_name,
    contact_name: f("contact_name") || null,
    contact_email: f("contact_email") || null,
    contact_phone: f("contact_phone") || null,
    website: f("website") || null,
    city_id,
    category_id,
    city_text: city_id ? null : f("city") || null,
    category_text: category_id ? null : f("category") || null,
    message: f("message") || null,
    source: "public_form",
  });
  if (error) {
    redirect(`/nominate?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/nominate?ok=1");
}
