"use server";

import { getServiceSupabase } from "@/lib/supabase/server";

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

/** Same contract as submitContact — see the note there on why we never throw. */
export type ApplicationResult = { ok: true } | { ok: false; error: string };

const HELP = "Please email service@masterdecker.com and we'll pick it up right away.";

async function checkCaptcha(token: string | null): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey || siteKey.startsWith("1x000")) return null;
  if (!token) return `The spam check above the button hasn't finished yet. Give it a moment and submit again, or ${HELP}`;
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: "permanentlightingdirect.ca" })
    });
    const verify = (await res.json()) as { success: boolean; errors?: string[] };
    if (!verify.success) {
      console.error("turnstile verify rejected:", verify.errors);
      return "The spam check expired. Please reload the page and submit again.";
    }
  } catch (err) {
    console.error("turnstile verify unreachable:", err);
    return `We couldn't reach the spam check. ${HELP}`;
  }
  return null;
}

async function emailApplication(input: ApplicationInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const configuredFrom = process.env.CONTACT_FROM_EMAIL;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // Resend only has masterdecker.com verified — other senders 403 silently.
        from: configuredFrom?.endsWith("@masterdecker.com") ? configuredFrom : "noreply@masterdecker.com",
        to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
        reply_to: input.email,
        subject: `Permanent Lighting Direct — ${input.tierSlug} application: ${input.company_name}`,
        text: [
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
          input.additional_info ?? "",
          "",
          "— permanentlightingdirect.ca installer program form"
        ].join("\n")
      })
    });
    if (!res.ok) {
      console.error("resend send failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend send threw:", err);
    return false;
  }
}

async function storeApplication(input: ApplicationInput): Promise<boolean> {
  try {
    const service = getServiceSupabase();
    const { data: tier, error: tierErr } = await service
      .from("ecom_pricing_tiers")
      .select("id")
      .eq("slug", input.tierSlug)
      .maybeSingle();
    if (tierErr || !tier) {
      console.error("ecom_pricing_tiers lookup failed:", tierErr?.message ?? "tier not found", input.tierSlug);
      return false;
    }
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
    if (error) {
      console.error("ecom_b2b_applications insert failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("ecom_b2b_applications insert threw:", err);
    return false;
  }
}

export async function submitApplication(input: ApplicationInput): Promise<ApplicationResult> {
  if (!input.company_name.trim()) return { ok: false, error: "Please enter your company name." };
  if (!input.contact_name.trim()) return { ok: false, error: "Please enter a contact name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email.trim())) return { ok: false, error: "Please enter a valid email address." };

  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const [emailed, stored] = await Promise.all([emailApplication(input), storeApplication(input)]);
  if (!emailed && !stored) {
    return { ok: false, error: `Something went wrong on our end and your application didn't send. ${HELP}` };
  }
  return { ok: true };
}
