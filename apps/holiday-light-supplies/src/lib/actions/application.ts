"use server";

import { getServiceSupabase } from "@/lib/supabase/server";
import { checkCaptcha, EMAIL_RE, HELP, sendLeadEmail, type LeadResult } from "@/lib/actions/lead-helpers";

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

/**
 * Installer / municipal account application. Stored in ecom_b2b_applications
 * (admin reviews + approves tier) and emailed so nothing waits on the admin.
 * Returns a result instead of throwing — prod masks thrown Server Action messages.
 */
export async function submitApplication(input: ApplicationInput): Promise<LeadResult> {
  const company = input.company_name.trim();
  const contact = input.contact_name.trim();
  const email = input.email.trim();
  if (!company) return { ok: false, error: "Please enter the company or organization name." };
  if (!contact) return { ok: false, error: "Please enter a contact name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  const captchaError = await checkCaptcha(input.turnstile_token, "submit");
  if (captchaError) return { ok: false, error: captchaError };

  const label = input.tierSlug === "municipality" ? "Municipal / BIA account registration" : "Installer program application";
  const lines = [
    `Organization: ${company}`,
    `Contact: ${contact}`,
    `Email: ${email}`,
    `Phone: ${input.phone || "-"}`,
    `Type: ${input.business_type ?? "-"}`,
    input.years_experience ? `Experience: ${input.years_experience}` : null,
    input.annual_volume ? `Annual volume: ${input.annual_volume}` : null,
    `Website: ${input.website ?? "-"}`,
    "",
    input.additional_info ?? ""
  ];
  const emailed = await sendLeadEmail({ subject: `${label} — ${company}`, replyTo: email, lines });

  let stored = false;
  try {
    const service = getServiceSupabase();
    const { data: tier, error: tierErr } = await service.from("ecom_pricing_tiers").select("id").eq("slug", input.tierSlug).maybeSingle();
    if (tierErr || !tier) {
      console.error("pricing tier lookup failed:", tierErr?.message ?? "not found");
    } else {
      const { error } = await service.from("ecom_b2b_applications").insert({
        requested_tier_id: tier.id,
        company_name: company,
        contact_name: contact,
        email,
        phone: input.phone,
        business_type: input.business_type,
        years_experience: input.years_experience,
        annual_volume: input.annual_volume,
        website: input.website,
        additional_info: input.additional_info
      });
      if (error) console.error("b2b application insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("b2b application insert threw:", err);
  }

  if (!emailed && !stored) return { ok: false, error: `Something went wrong on our end and your application didn't send. ${HELP}` };
  return { ok: true };
}
