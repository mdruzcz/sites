"use server";

import { getServiceSupabase } from "@/lib/supabase/server";
import { checkCaptcha, sendLeadEmail, HELP, type LeadResult } from "@/lib/actions/lead-helpers";

export interface ApplicationInput {
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
  turnstile_token: string | null;
}

export type ApplicationResult = LeadResult;

/**
 * Installer / municipality trade applications. Emailed to
 * service@masterdecker.com AND stored in ecom_b2b_applications; only both
 * halves failing is an error for the applicant.
 */
export async function submitApplication(input: ApplicationInput): Promise<ApplicationResult> {
  if (!input.company_name.trim()) return { ok: false, error: "Please enter your company name." };
  if (!input.contact_name.trim()) return { ok: false, error: "Please enter a contact name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email.trim())) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const captchaError = await checkCaptcha(input.turnstile_token, "submit");
  if (captchaError) return { ok: false, error: captchaError };

  const emailed = await sendLeadEmail({
    subject: `${input.tierSlug} application: ${input.company_name}`,
    replyTo: input.email,
    lines: [
      `Tier requested: ${input.tierSlug}`,
      `Company: ${input.company_name}`,
      `Contact: ${input.contact_name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "-"}`,
      `Business type: ${input.business_type ?? "-"}`,
      `Years experience: ${input.years_experience ?? "-"}`,
      `Annual volume: ${input.annual_volume ?? "-"}`,
      `Website: ${input.website ?? "-"}`,
      "",
      input.additional_info ?? ""
    ]
  });

  let stored = false;
  try {
    const service = getServiceSupabase();
    const { data: tier, error: tierErr } = await service
      .from("ecom_pricing_tiers")
      .select("id")
      .eq("slug", input.tierSlug)
      .maybeSingle();
    if (tierErr || !tier) {
      console.error("ecom_pricing_tiers lookup failed:", tierErr?.message ?? "tier not found", input.tierSlug);
    } else {
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
      if (error) console.error("ecom_b2b_applications insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("ecom_b2b_applications insert threw:", err);
  }

  if (!emailed && !stored) {
    return { ok: false, error: `Something went wrong on our end and your application didn't send. ${HELP}` };
  }
  return { ok: true };
}
