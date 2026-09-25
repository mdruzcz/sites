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
 * Never throw for anything a visitor could fix. Next.js strips thrown error
 * messages out of Server Action responses in production, so a thrown
 * "Please complete the captcha." reaches the browser as the generic
 * "An error occurred in the Server Components render" — which is what the
 * contact form was showing after the rebuild. Return the reason instead.
 */
export type ContactResult = { ok: true } | { ok: false; error: string };

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";

/** Resend only has masterdecker.com verified — any other sender 403s silently. */
function fromEmail() {
  const configured = process.env.CONTACT_FROM_EMAIL;
  return configured && configured.endsWith("@masterdecker.com") ? configured : "noreply@masterdecker.com";
}

const HELP = "Please email service@masterdecker.com and we'll pick it up right away.";

/** Returns null when the request may proceed, or the message to show the visitor. */
async function checkCaptcha(token: string | null): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey || siteKey.startsWith("1x000")) return null; // captcha not configured for this env
  if (!token) return `The spam check above the button hasn't finished yet. Give it a moment and send again, or ${HELP}`;

  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: "permanentlightingdirect.ca" })
    });
    const verify = (await res.json()) as { success: boolean; errors?: string[] };
    if (!verify.success) {
      console.error("turnstile verify rejected:", verify.errors);
      return "The spam check expired. Please reload the page and send the message again.";
    }
  } catch (err) {
    console.error("turnstile verify unreachable:", err);
    return `We couldn't reach the spam check. ${HELP}`;
  }
  return null;
}

async function emailMessage(fields: {
  name: string;
  email: string;
  phone: string;
  province: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail(),
        to: TO_EMAIL,
        reply_to: fields.email,
        subject: fields.subject,
        text: [
          `Name: ${fields.name}`,
          `Email: ${fields.email}`,
          `Phone: ${fields.phone || "-"}`,
          `Province: ${fields.province || "-"}`,
          "",
          fields.message,
          "",
          "— permanentlightingdirect.ca contact form"
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

async function storeMessage(fields: {
  name: string;
  email: string;
  phone: string;
  province: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const store = await getStore();
    if (!store) {
      console.error("ecom_contact_messages insert skipped: store not found");
      return false;
    }
    const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
      store_id: store.id,
      name: fields.name,
      email: fields.email,
      phone: fields.phone || null,
      province: fields.province || null,
      subject: fields.subject,
      message: fields.message,
      source: "contact-form"
    });
    if (error) {
      console.error("ecom_contact_messages insert failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("ecom_contact_messages insert threw:", err);
    return false;
  }
}

/**
 * Contact / sizing requests. Emailed to service@masterdecker.com (the critical
 * path) and stored in ecom_contact_messages for the admin Contact Messages page.
 * Succeeds if either half lands; only both failing is an error for the visitor.
 */
export async function submitContact(input: ContactInput): Promise<ContactResult> {
  if (input.website) return { ok: true }; // bot filled the honeypot

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 10) {
    return { ok: false, error: "Please add a bit more detail — even one sentence about your roofline or question helps us answer properly." };
  }

  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const fields = {
    name,
    email,
    phone,
    province: input.province || "",
    subject: `Permanent Lighting Direct — ${input.topic || "Contact"}`,
    message
  };

  const [emailed, stored] = await Promise.all([emailMessage(fields), storeMessage(fields)]);

  if (!emailed && !stored) {
    return { ok: false, error: `Something went wrong on our end and your message didn't send. ${HELP}` };
  }
  return { ok: true };
}
