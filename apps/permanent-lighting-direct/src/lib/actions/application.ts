"use server";

import { getServiceSupabase } from "@/lib/supabase/server";

export async function submitApplication(input: {
  tierSlug: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string | null;
  years_experience: string | null;
  annual_volume: string | null;
  website: string | null;
  additional_info: string | null;
}) {
  const service = getServiceSupabase();
  const { data: tier, error: tierErr } = await service
    .from("ecom_pricing_tiers")
    .select("id")
    .eq("slug", input.tierSlug)
    .maybeSingle();
  if (tierErr || !tier) throw new Error(tierErr?.message ?? "Tier not found");

  const { error } = await service.from("ecom_b2b_applications").insert({
    requested_tier_id: tier.id,
    company_name: input.company_name,
    contact_name: input.contact_name,
    email: input.email,
    phone: input.phone,
    business_type: input.business_type,
    years_experience: input.years_experience,
    annual_volume: input.annual_volume,
    website: input.website,
    additional_info: input.additional_info
  });
  if (error) throw new Error(error.message);
}
