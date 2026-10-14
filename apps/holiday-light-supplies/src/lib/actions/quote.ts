"use server";

import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { checkCaptcha, EMAIL_RE, HELP, sendLeadEmail, type LeadResult } from "@/lib/actions/lead-helpers";

export interface QuoteInput {
  name: string;
  email: string;
  phone: string;
  organization: string;
  org_type: string;
  city: string;
  province: string;
  timeline: string;
  budget: string;
  interests: string[];
  message: string;
  /** Honeypot */
  website?: string;
  turnstile_token: string | null;
  /** Which page the request came from */
  source: string;
}

/**
 * Commercial quote request. Email is the critical path; the DB row
 * (ecom_contact_messages, source "commercial-quote") is the backup that also
 * surfaces it on the admin Contact Messages page.
 */
export async function submitQuoteRequest(input: QuoteInput): Promise<LeadResult> {
  if (input.website) return { ok: true };

  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const organization = input.organization.trim();
  const message = input.message.trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!organization) return { ok: false, error: "Please tell us the organization or property this is for." };
  if (message.length < 10) return { ok: false, error: "Please describe the project — a pole count, tree list or a sentence about the site is enough." };

  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const subject = `Commercial quote request — ${input.org_type || "Business"} — ${organization}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Organization: ${organization}`,
    `Type: ${input.org_type || "-"}`,
    `Location: ${[input.city.trim(), input.province].filter(Boolean).join(", ") || "-"}`,
    `Timeline: ${input.timeline || "-"}`,
    `Budget: ${input.budget || "-"}`,
    `Interested in: ${input.interests.length ? input.interests.join(", ") : "-"}`,
    `Source page: ${input.source}`,
    "",
    "Project details:",
    message
  ];

  const emailed = await sendLeadEmail({ subject, replyTo: email, lines });

  let stored = false;
  try {
    const store = await getStore();
    if (store) {
      const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
        store_id: store.id,
        name: `${name} (${organization})`,
        email,
        phone: phone || null,
        province: input.province || null,
        subject,
        message: lines.join("\n"),
        source: "commercial-quote"
      });
      if (error) console.error("quote insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("quote insert threw:", err);
  }

  if (!emailed && !stored) return { ok: false, error: `Something went wrong on our end and your request didn't send. ${HELP}` };
  return { ok: true };
}

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  website?: string;
  turnstile_token: string | null;
}

export async function submitContactMessage(input: ContactInput): Promise<LeadResult> {
  if (input.website) return { ok: true };
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();
  if (!name) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5) return { ok: false, error: "Please tell us a little about what you need." };
  const captchaError = await checkCaptcha(input.turnstile_token);
  if (captchaError) return { ok: false, error: captchaError };

  const subject = input.topic || "Website enquiry";
  const emailed = await sendLeadEmail({ subject, replyTo: email, lines: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "-"}`, `Topic: ${subject}`, "", message] });
  let stored = false;
  try {
    const store = await getStore();
    if (store) {
      const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({ store_id: store.id, name, email, phone: phone || null, province: null, subject, message, source: "contact-form" });
      if (error) console.error("contact insert failed:", error.message);
      else stored = true;
    }
  } catch (err) {
    console.error("contact insert threw:", err);
  }
  if (!emailed && !stored) return { ok: false, error: `Something went wrong on our end and your message didn't send. ${HELP}` };
  return { ok: true };
}
