export const runtime = "edge";

const HOSTNAME = "resonatelighting.com";
const SITE_NAME = "Resonate Lighting";

interface QuoteBody {
  website?: string;
  name?: string;
  organization?: string;
  phone?: string;
  email?: string;
  city?: string;
  venue?: string;
  package?: string;
  message?: string;
  token?: string;
}

export async function POST(req: Request) {
  let body: QuoteBody;
  try {
    body = (await req.json()) as QuoteBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — pretend success to bots.
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.package || !body.venue) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!body.token) {
    return Response.json({ error: "Captcha required." }, { status: 400 });
  }

  // Cloudflare Turnstile via the shared verify Worker (secret lives only in the Worker).
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: HOSTNAME }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return Response.json({ error: "Captcha verification failed. Please refresh and try again." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Captcha service unavailable. Please try again." }, { status: 502 });
  }

  const row = {
    name: body.name,
    organization: body.organization || null,
    phone: body.phone,
    email: body.email,
    city: body.city || null,
    venue_type: body.venue,
    package: body.package,
    message: body.message || null,
  };

  // Supabase backup via the shared forms-submit Worker (hostname -> table map lives in the Worker).
  let stored = false;
  try {
    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    const res = await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row }),
    });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
    stored = Boolean(out.ok);
  } catch {
    stored = false;
  }

  // Email is the primary delivery.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || `${SITE_NAME} <noreply@masterdecker.com>`,
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: body.email,
          subject: `New Quote: ${body.package} - ${body.name} (${SITE_NAME})`,
          html: `
            <h2 style="font-family:system-ui;color:#0B0F1A">New Quote Request — ${SITE_NAME}</h2>
            <table style="font-family:system-ui;font-size:14px;line-height:1.6">
              <tr><td><strong>Name:</strong></td><td>${escapeHtml(body.name)}</td></tr>
              <tr><td><strong>Organization:</strong></td><td>${escapeHtml(body.organization || "Not provided")}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${escapeHtml(body.phone)}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${escapeHtml(body.email)}</td></tr>
              <tr><td><strong>City:</strong></td><td>${escapeHtml(body.city || "Not provided")}</td></tr>
              <tr><td><strong>Type of space:</strong></td><td>${escapeHtml(body.venue)}</td></tr>
              <tr><td><strong>Package:</strong></td><td>${escapeHtml(body.package)}</td></tr>
              <tr><td valign="top"><strong>Details:</strong></td><td>${escapeHtml(body.message || "None")}</td></tr>
              <tr><td><strong>Stored in Supabase:</strong></td><td>${stored ? "yes" : "no (check forms-submit Worker mapping)"}</td></tr>
            </table>
            <p style="font-family:system-ui;font-size:12px;color:#8E98B4">Sent from ${HOSTNAME}</p>
          `,
        }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
  }

  if (!emailed && !stored) {
    return Response.json({ error: "We could not send your request right now. Please call us or try again shortly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
