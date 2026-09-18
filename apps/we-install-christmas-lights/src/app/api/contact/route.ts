import { NextResponse } from "next/server";

export const runtime = "edge";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  propertyType?: string;
  message?: string;
  website?: string;
  source?: string;
  turnstileToken?: string | null;
};

const HOSTNAME = "weinstallchristmaslights.ca";
const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (data.website?.trim()) return NextResponse.json({ ok: true });

  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!data.turnstileToken) {
    return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
  }

  // Verify Turnstile via the shared Worker (fail closed)
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.turnstileToken, hostname: HOSTNAME }),
    });
    const verifyBody = (await verifyRes.json()) as { success: boolean };
    if (!verifyBody.success) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }
  } catch (e) {
    console.error("Turnstile verify error", e);
    return NextResponse.json({ error: "Security check unavailable. Please call us." }, { status: 400 });
  }

  const isCommercial = /commercial|business|property|hoa|retail|office|hotel|restaurant|dealership|municipal|church/i.test(
    `${data.propertyType ?? ""} ${data.service ?? ""}`,
  );

  // 1) Email is the critical path. Resend can only send from masterdecker.com.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const html = `<h2>${isCommercial ? "New COMMERCIAL Christmas Lighting Lead" : "New Christmas Light Installation Lead"}</h2>
<p><strong>Name:</strong> ${esc(data.name)}</p>
<p><strong>Email:</strong> ${esc(data.email)}</p>
<p><strong>Phone:</strong> ${esc(data.phone || "")}</p>
<p><strong>City:</strong> ${esc(data.city || "")}</p>
<p><strong>Property type:</strong> ${esc(data.propertyType || "")}</p>
<p><strong>Service:</strong> ${esc(data.service || "")}</p>
<p><strong>Message:</strong></p>
<pre style="font-family:inherit;white-space:pre-wrap">${esc(data.message || "")}</pre>
<hr>
<p style="font-size:12px;color:#888">Sent from weinstallchristmaslights.ca${data.source ? ` (${esc(data.source)})` : ""}</p>`;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `We Install Christmas Lights <${process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com"}>`,
          to: [process.env.CONTACT_TO_EMAIL || "service@masterdecker.com"],
          reply_to: data.email,
          subject: `${isCommercial ? "COMMERCIAL " : ""}Christmas Lights Lead - ${data.name}${data.city ? ` (${data.city})` : ""}`,
          html,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend send failed", e);
    }
  } else {
    console.error("RESEND_API_KEY not set — lead email skipped");
  }

  // 2) Store via shared forms Worker (backup)
  let stored = false;
  try {
    const insertRes = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: HOSTNAME,
        row: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          city: data.city || null,
          service: [data.propertyType, data.service].filter(Boolean).join(" · ") || null,
          message: data.message || null,
        },
      }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
  } catch (e) {
    console.error("Forms worker insert failed", e);
  }

  if (!emailed && !stored) {
    return NextResponse.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed, stored });
}
