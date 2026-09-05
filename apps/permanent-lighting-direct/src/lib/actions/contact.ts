"use server";

import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  province: string;
  topic: string;
  message: string;
  website: string; // honeypot
  turnstile_token: string | null;
}

/**
 * Contact / sizing requests. Row goes into ecom_contact_messages (visible in the
 * admin Contact Messages page); the central notify-inquiry trigger emails + texts.
 */
export async function submitContact(input: ContactInput): Promise<{ ok: true }> {
  if (input.website) return { ok: true }; // bot filled the honeypot

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaConfigured = !!siteKey && !siteKey.startsWith("1x000");
  if (captchaConfigured) {
    if (!input.turnstile_token) throw new Error("Please complete the captcha.");
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: input.turnstile_token, hostname: "permanentlightingdirect.ca" })
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) throw new Error("Captcha verification failed.");
  }

  if (!input.name.trim()) throw new Error("Please enter your name.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) throw new Error("Please enter a valid email.");
  if (input.message.trim().length < 10) throw new Error("Tell us a little more so we can help.");

  const store = await getStore();
  if (!store) throw new Error("Store not found");

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("ecom_contact_messages").insert({
    store_id: store.id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim() || null,
    province: input.province || null,
    subject: `Permanent Lighting Direct — ${input.topic || "Contact"}`,
    message: input.message.trim(),
    source: "contact-form"
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}
