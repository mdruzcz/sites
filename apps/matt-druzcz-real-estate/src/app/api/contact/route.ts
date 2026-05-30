import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Spam layers: honeypot → time-gate (3 s) → reCAPTCHA v3
 * On success: saves to Supabase `realtor_leads` + emails via Resend
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const RESEND_API_KEY   = process.env.RESEND_API_KEY;
const TO_EMAIL         = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";
const FROM_EMAIL       = process.env.CONTACT_FROM_EMAIL ?? "noreply@mattdruzcz.ca";
const MIN_FILL_TIME_MS = 3_000;

type ContactBody = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  city?: string;
  message?: string;
  website?: string;
  _loaded?: number;
  recaptchaToken?: string;
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET) return { success: true, score: 1.0 };
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });
    const data = await res.json();
    return { success: data.success === true, score: data.score ?? 0 };
  } catch {
    return { success: false, score: 0 };
  }
}

async function sendEmail(body: ContactBody): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email");
    return;
  }
  const fullName = `${body.first_name} ${body.last_name}`.trim();
  const html = `
    <h2 style="font-family:Georgia,serif;color:#1a1a2e;">New Real Estate Enquiry — Matt Druzcz</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse;width:100%;">
      <tr><td style="padding:8px 0;font-weight:bold;width:140px;">Name</td><td style="padding:8px 0;">${fullName}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td style="padding:8px 0;"><a href="tel:${body.phone}">${body.phone}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Looking to</td><td style="padding:8px 0;">${body.intent ?? "—"}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">City/Area</td><td style="padding:8px 0;">${body.city ?? "—"}</td></tr>
      ${body.message ? `<tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px 0;">${body.message.replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;">
    <p style="font-size:12px;color:#6b7280;">Submitted via mattdruzcz.ca</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: body.email,
      subject: `Quote Request from ${fullName} - Matt Druzcz Real Estate`,
      html,
    }),
  });
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (body._loaded) {
    const elapsed = Date.now() - body._loaded;
    if (elapsed < MIN_FILL_TIME_MS) {
      return NextResponse.json({ success: true });
    }
  }

  if (body.recaptchaToken) {
    const { success, score } = await verifyRecaptcha(body.recaptchaToken);
    if (!success || score < 0.5) {
      return NextResponse.json(
        { error: "Spam check failed. Please try again or call (519) 878-6735." },
        { status: 403 }
      );
    }
  } else if (RECAPTCHA_SECRET) {
    return NextResponse.json(
      { error: "Spam check failed. Please try again or call (519) 878-6735." },
      { status: 403 }
    );
  }

  const errors: string[] = [];
  if (!body.first_name?.trim() || body.first_name.trim().length < 2) errors.push("First name is required.");
  if (!body.last_name?.trim()  || body.last_name.trim().length < 2)  errors.push("Last name is required.");
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push("A valid email is required.");
  if (!body.phone?.trim() || body.phone.trim().length < 7)            errors.push("Phone number is required.");
  if (!body.intent)                                                    errors.push("Please select what you're looking for.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const response = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hostname: "mattdruzcz.ca",
      row: {
        first_name: body.first_name!.trim(),
        last_name:  body.last_name!.trim(),
        email:      body.email!.trim().toLowerCase(),
        phone:      body.phone!.trim(),
        intent:     body.intent,
        city:       body.city   || null,
        message:    body.message || null,
        status:     "new",
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[contact] Forms worker insert error:", err);
  }

  await sendEmail(body).catch(err => console.error("[contact] Resend error:", err));

  return NextResponse.json({ success: true }, { status: 200 });
}
