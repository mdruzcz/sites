"use server";

import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  /** Honeypot — real people never fill this. */
  website?: string;
  turnstile_token: string | null;
}

/**
 * General contact message. Stored in ecom_contact_messages, which the central
 * Supabase `notify-inquiry` trigger picks up to email and text Matt — the same
 * path the shipping-quote inquiries already use, so nothing double-notifies.
 */
export async function submitContactMessage(input: ContactInput) {
  if (input.website) return; // silently accept and drop bots

  if (!input.name.trim()) throw new Error("Please enter your name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) throw new Error("Please enter a valid email address.");
  if (input.message.trim().length < 5) throw new Error("Please tell us a little about what you need.");

  // Fail closed whenever a real site key is configured.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaConfigured = !!siteKey && !siteKey.startsWith("1x000");
  if (captchaConfigured) {
    if (!input.turnstile_token) throw new Error("Please complete the spam check.");
    try {
      const verifyRes = await fetch(
        process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: input.turnstile_token, hostname: "holidaylightsdirect.ca" })
        }
      );
      const verify = (await verifyRes.json()) as { success: boolean };
      if (!verify.success) throw new Error("Spam check failed. Please reload and try again.");
    } catch (err) {
      throw err instanceof Error && err.message.startsWith("Spam check")
        ? err
        : new Error("Could not reach the spam check. Please email service@masterdecker.com.");
    }
  }

  const store = await getStore();
  if (!store) throw new Error("Store not found");

  const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
    store_id: store.id,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim() || null,
    province: null,
    subject: input.topic || "Website enquiry",
    message: input.message.trim(),
    source: "contact-form"
  });
  if (error) throw new Error(error.message);
}
