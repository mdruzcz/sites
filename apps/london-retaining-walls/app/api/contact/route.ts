import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Lazy-init — Resend throws on empty key at module-load, which breaks the
// build's collect-page-data phase even when the key is set at runtime.
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

async function verifyTurnstile(token: string, hostname: string): Promise<boolean> {
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, hostname }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; phone?: string; message?: string; honeypot?: string; token?: string };
  const { name, email, phone, message, honeypot, token } = body;

  if (honeypot) return NextResponse.json({ ok: true });
  if (!name || !email || !phone || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const valid = await verifyTurnstile(token, new URL(req.url).hostname);
  if (!valid) return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });

  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hostname: "londonretainingwalls.ca",
      row: { name, email, phone, message: message || "", created_at: new Date().toISOString() },
    }),
  });
  if (!insertRes.ok) {
    console.error("[lrw contact] Forms worker insert failed:", insertRes.status, await insertRes.text());
  }

  await getResend().emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "noreply@londonretainingwalls.ca",
    to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
    subject: `New Quote Request from ${name} – London Retaining Walls`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message || "—"}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
