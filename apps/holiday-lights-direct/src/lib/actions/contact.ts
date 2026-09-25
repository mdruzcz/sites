"use server";

import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { checkCaptcha, sendLeadEmail, HELP, type LeadResult } from "@/lib/actions/lead-helpers";

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

export type ContactResult = LeadResult;

/**
 * General contact message. Emailed to service@masterdecker.com AND stored in
 * ecom_contact_messages for the admin Contact Messages page. Both halves run —
 * until 2026-09-25 this was a DB-only write with no fallback, and because
 * SUPABASE_SERVICE_ROLE_KEY was missing in production every message was lost.
 * Only both halves failing is an error for the visitor.
 */
export async function submitContactMessage(input: ContactInput): Promise<ContactResult> {
  if (input.website) return { ok: true }; // silently accept and drop bots

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5) return { ok: false, error: "Please tell us a little about what you need." };

  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const subject = input.topic || "Website enquiry";

  const emailed = await sendLeadEmail({
    subject,
    replyTo: email,
    lines: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "-"}`, `Topic: ${subject}`, "", message]
  });

  let stored = false;
  try {
    const store = await getStore();
    if (!store) {
      console.error("ecom_contact_messages insert skipped: store not found");
    } else {
      const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
        store_id: store.id,
        name,
        email,
        phone: phone || null,
        province: null,
        subject,
        message,
        source: "contact-form"
      });
      if (error) console.error("ecom_contact_messages insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("ecom_contact_messages insert threw:", err);
  }

  if (!emailed && !stored) {
    return { ok: false, error: `Something went wrong on our end and your message didn't send. ${HELP}` };
  }
  return { ok: true };
}
