import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Spam layers: honeypot → time-gate (3 s) → Cloudflare Turnstile (shared Worker)
 * On success: emails via Resend (critical path) + saves to Supabase `realtor_leads` (backup)
 */

const HOSTNAME = "mattdruzcz.ca";
const MIN_FILL_TIME_MS = 3_000;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

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
  token?: string;
};

async function sendEmail(body: ContactBody): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email");
    return false;
  }
  const fullName = `${body.first_name} ${body.last_name}`.trim();
  const html = `
    <h2 style="font-family:Georgia,serif;color:#1a1a2e;">New Real Estate Enquiry — Matt Druzcz</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse;width:100%;">
      <tr><td style="padding:8px 0;font-weight:bold;width:140px;">Name</td><td style="padding:8px 0;">${esc(fullName)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:${esc(body.email!)}">${esc(body.email!)}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td style="padding:8px 0;"><a href="tel:${esc(body.phone!)}">${esc(body.phone!)}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Looking to</td><td style="padding:8px 0;">${esc(body.intent ?? "—")}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">City/Area</td><td style="padding:8px 0;">${esc(body.city || "—")}</td></tr>
      ${body.message ? `<tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px 0;">${esc(body.message).replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;">
    <p style="font-size:12px;color:#6b7280;">Submitted via mattdruzcz.ca</p>
  `;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        // Resend only has masterdecker.com verified — any other from-domain 403s silently.
        from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        reply_to: body.email,
        subject: `Quote Request from ${fullName} - Matt Druzcz Real Estate`,
        html,
      }),
    });
    if (!r.ok) console.error("[contact] Resend error:", r.status, await r.text());
    return r.ok;
  } catch (e) {
    console.error("[contact] Resend fetch failed:", e);
    return false;
  }
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

  const errors: string[] = [];
  if (!body.first_name?.trim() || body.first_name.trim().length < 2) errors.push("First name is required.");
  if (!body.last_name?.trim()  || body.last_name.trim().length < 2)  errors.push("Last name is required.");
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push("A valid email is required.");
  if (!body.phone?.trim() || body.phone.trim().length < 7)            errors.push("Phone number is required.");
  if (!body.intent)                                                    errors.push("Please select what you're looking for.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  if (!body.token) {
    return NextResponse.json({ error: "Please complete the security check, or call (519) 878-6735." }, { status: 400 });
  }
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: HOSTNAME }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return NextResponse.json({ error: "Security check failed. Please try again or call (519) 878-6735." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Security check unavailable. Please call (519) 878-6735." }, { status: 400 });
  }

  const emailed = await sendEmail(body);

  let stored = false;
  try {
    const response = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: HOSTNAME,
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
    stored = response.ok;
    if (!response.ok) console.error("[contact] Forms worker insert error:", response.status, await response.text());
  } catch (e) {
    console.error("[contact] Forms worker fetch failed:", e);
  }

  if (!emailed && !stored) {
    return NextResponse.json({ error: "We couldn't send your message. Please call (519) 878-6735." }, { status: 502 });
  }
  return NextResponse.json({ success: true, emailed, stored }, { status: 200 });
}
