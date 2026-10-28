import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, city, message, token, hostname, honeypot } = body;

  if (honeypot) return NextResponse.json({ ok: true });

  // Ad click IDs / UTM tags captured on landing, kept so leads can be matched
  // back to Google Ads clicks (offline conversion upload of booked/sold jobs).
  const attr: Record<string, unknown> = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const attribution = Object.entries(attr)
    .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
    .slice(0, 12)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
    .join("\n");
  const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";

  // Verify Turnstile
  const verifyRes = await fetch((process.env.TURNSTILE_VERIFY_ENDPOINT ?? 'https://turnstile.masterdecker.com'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, hostname }),
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json({ error: "Security check failed" }, { status: 400 });
  }

  // Save via shared forms Worker
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hostname: "weinstallgoveelights.ca",
      row: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        city,
        message: [message, attribution && `--- Ad source ---\n${attribution}`].filter(Boolean).join("\n\n") || null,
      },
    }),
  });
  if (!insertRes.ok) {
    console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
    return NextResponse.json({ error: "Failed to save request" }, { status: 502 });
  }

  // Send email notification
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New Govee Quote Request from ${firstName} ${lastName} - ${city}${adSource ? ` [${adSource}]` : ""}`,
    html: `
      <h2>New Quote Request — We Install Govee Lights</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Message:</strong><br>${message || "No message provided"}</p>
      ${attribution ? `<p><strong>Ad source:</strong></p><pre style="font-size:12px;color:#555;white-space:pre-wrap">${esc(attribution)}</pre>` : ""}
    `,
  });

  return NextResponse.json({ ok: true });
}
