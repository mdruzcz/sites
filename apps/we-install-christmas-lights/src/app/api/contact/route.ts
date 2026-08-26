import { NextResponse } from "next/server";

export const runtime = "edge";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
  turnstileToken?: string | null;
};

const HOSTNAME = "weinstallchristmaslights.ca";

export async function POST(req: Request) {
  const data = (await req.json()) as Payload;

  // Verify Turnstile (required — fail closed)
  const turnstileEndpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  if (!data.turnstileToken) {
    return NextResponse.json({ error: "Captcha required." }, { status: 400 });
  }
  try {
    const verifyRes = await fetch(turnstileEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.turnstileToken, hostname: HOSTNAME }),
    });
    const verifyBody = (await verifyRes.json()) as { success: boolean; errors?: string[] };
    if (!verifyBody.success) {
      return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
    }
  } catch (e) {
    console.error("Turnstile verify error", e);
    return NextResponse.json({ error: "Captcha service unavailable." }, { status: 500 });
  }

  // Required basic validation
  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  // 1) Store via shared forms Worker (best-effort)
  try {
    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: HOSTNAME,
        row: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          city: data.city || null,
          service: data.service || null,
          message: data.message || null,
        },
      }),
    });
  } catch (e) {
    console.error("Forms worker insert failed", e);
    // continue — we still want the email to send
  }

  // 2) Email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@weinstallchristmaslights.ca";
  if (resendKey) {
    try {
      const html = `<h2>New Christmas Light Installation Lead</h2>
<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(data.phone || "")}</p>
<p><strong>City:</strong> ${escapeHtml(data.city || "")}</p>
<p><strong>Service:</strong> ${escapeHtml(data.service || "")}</p>
<p><strong>Message:</strong></p>
<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(data.message || "")}</pre>
<hr>
<p style="font-size:12px;color:#888">Sent from weinstallchristmaslights.ca contact form</p>`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `We Install Christmas Lights <${fromEmail}>`,
          to: [toEmail],
          reply_to: data.email,
          subject: `New Christmas Lights Lead - ${data.name}${data.city ? ` (${data.city})` : ""}`,
          html,
        }),
      });
    } catch (e) {
      console.error("Resend send failed", e);
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
