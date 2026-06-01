"use server";

import { getServiceSupabase } from "@/lib/supabase/server";
import { getStore } from "@/lib/catalog";

export async function submitContact(input: {
  name: string;
  email: string;
  phone: string | null;
  province: string | null;
  subject: string | null;
  message: string;
  source?: string;
  turnstile_token: string | null;
}) {
  // Spam protection — enforced once a real Turnstile site key is configured.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaConfigured = !!siteKey && !siteKey.startsWith("1x000");
  if (captchaConfigured) {
    if (!input.turnstile_token) throw new Error("Please complete the captcha.");
    const verifyRes = await fetch(
      process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: input.turnstile_token, hostname: "readysealdirect.ca" })
      }
    );
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) throw new Error("Captcha verification failed.");
  }

  const store = await getStore();
  if (!store) throw new Error("Store not found");

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("ecom_contact_messages").insert({
    store_id: store.id,
    name: input.name,
    email: input.email,
    phone: input.phone,
    province: input.province,
    subject: input.subject,
    message: input.message,
    source: input.source ?? "contact"
  });
  if (error) throw new Error(error.message);

  // Best-effort email notification via Resend (does not block the submission).
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "noreply@readysealdirect.ca",
          to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
          reply_to: input.email,
          subject: `Ready Seal Direct — ${input.subject ?? "Contact message"}`,
          text: [
            `Name: ${input.name}`,
            `Email: ${input.email}`,
            `Phone: ${input.phone ?? "-"}`,
            `Province: ${input.province ?? "-"}`,
            `Subject: ${input.subject ?? "-"}`,
            "",
            input.message
          ].join("\n")
        })
      });
    } catch {
      // ignore email failure — the message is already stored
    }
  }
}
