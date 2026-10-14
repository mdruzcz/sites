"use server";

import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { EMAIL_RE, sendLeadEmail, type LeadResult } from "@/lib/actions/lead-helpers";

export interface NewsletterInput {
  email: string;
  /** Optional buyer segment chosen in the popup. */
  segment?: string | null;
  /** Where the signup came from (popup, footer, …) */
  source: string;
  /** Honeypot — real people never fill this. */
  website?: string;
}

/**
 * Newsletter signup. There is no dedicated subscribers table in the shared
 * Supabase project (DDL needs an access token we don't hold), so signups are
 * stored in ecom_contact_messages with source "newsletter" — which also makes
 * them visible on the admin Contact Messages page — and emailed to the inbox.
 * Only both halves failing is an error for the visitor.
 */
export async function subscribeNewsletter(input: NewsletterInput): Promise<LeadResult> {
  if (input.website) return { ok: true };
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  const segment = (input.segment ?? "").trim().slice(0, 80) || null;
  const source = (input.source || "popup").slice(0, 40);

  let stored = false;
  try {
    const store = await getStore();
    if (store) {
      const supabase = getServiceSupabase();
      // De-dupe: silently succeed if this email already subscribed.
      const { data: existing } = await supabase
        .from("ecom_contact_messages")
        .select("id")
        .eq("store_id", store.id)
        .eq("source", "newsletter")
        .eq("email", email)
        .limit(1);
      if (existing && existing.length) return { ok: true };
      const { error } = await supabase.from("ecom_contact_messages").insert({
        store_id: store.id,
        name: segment ? `Newsletter (${segment})` : "Newsletter",
        email,
        phone: null,
        province: null,
        subject: "Newsletter signup",
        message: `Subscribed via ${source}${segment ? ` — segment: ${segment}` : ""}. Welcome code FIRST10 shown.`,
        source: "newsletter"
      });
      if (error) console.error("newsletter insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("newsletter insert threw:", err);
  }

  const emailed = await sendLeadEmail({
    subject: "Newsletter signup",
    replyTo: email,
    lines: [`Email: ${email}`, `Segment: ${segment ?? "-"}`, `Source: ${source}`]
  });

  if (!stored && !emailed) return { ok: false, error: "Something went wrong on our end. Please try again in a moment." };
  return { ok: true };
}
