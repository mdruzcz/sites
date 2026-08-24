export const runtime = "nodejs";

// Commercial Holiday Decor uses the shared ecom back-office (admin.masterdecker.com)
// like Ready Seal Direct: quote submissions are stored in `ecom_contact_messages`
// under this site's `ecom_stores` row (slug = STORE_SLUG) and show up in the admin
// "Contact Messages" page. No forms Worker / per-site quote table / QuickQuote wiring.

const STORE_SLUG = process.env.STORE_SLUG ?? "commercial-holiday-decor";
const TO = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";
// masterdecker.com is the only Resend-verified sending domain — a
// noreply@commercialholidaydecor.ca fallback would 403 silently.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@masterdecker.com";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface Body {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  propertyType?: string;
  timeline?: string;
  interests?: string[];
  message?: string;
  website?: string;
  turnstileToken?: string;
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

/** Look up this site's ecom store id (service role — bypasses RLS). */
async function getStoreId(): Promise<string | null> {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ecom_stores?slug=eq.${encodeURIComponent(STORE_SLUG)}&select=id`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { id?: string }[];
    return rows?.[0]?.id ?? null;
  } catch (err) {
    console.error("Store lookup failed:", err);
    return null;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Honeypot — silently accept so the bot does not learn anything.
  if (body.website?.trim()) return Response.json({ ok: true });

  // Captcha. Fail CLOSED: if a site key is configured, a valid token is required.
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    if (!body.turnstileToken) {
      return Response.json({ error: "Captcha not completed." }, { status: 400 });
    }
    const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: body.turnstileToken, hostname: "commercialholidaydecor.ca" })
      });
      const data = (await res.json()) as { success?: boolean };
      if (!data.success) {
        return Response.json({ error: "Captcha verification failed." }, { status: 400 });
      }
    } catch (err) {
      console.error("Turnstile verify unreachable:", err);
      return Response.json({ error: "Could not verify the captcha. Please try again." }, { status: 502 });
    }
  }

  const required: (keyof Body)[] = ["company", "name", "email", "phone", "propertyAddress"];
  for (const f of required) {
    if (!String(body[f] ?? "").trim()) {
      return Response.json({ error: "Please fill in every required field." }, { status: 400 });
    }
  }

  const interests = (body.interests ?? []).join(", ");
  const subject = `Commercial quote — ${body.company}`;
  const messageBody = [
    `Company: ${body.company}`,
    `Property: ${body.propertyAddress}`,
    body.propertyType ? `Property type: ${body.propertyType}` : null,
    body.timeline ? `Timeline: ${body.timeline}` : null,
    interests ? `Interested in: ${interests}` : null,
    body.message ? `\n${body.message}` : null
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  // ---- 1. Email is the critical path. If this succeeds the lead is not lost.
  const lines: [string, string][] = [
    ["Company", body.company!],
    ["Contact", body.name!],
    ["Email", body.email!],
    ["Phone", body.phone!],
    ["Property", body.propertyAddress!],
    ["Property type", body.propertyType || "—"],
    ["Timeline", body.timeline || "—"],
    ["Interested in", interests || "—"],
    ["Message", body.message || "—"]
  ];

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: FROM,
          to: TO,
          reply_to: body.email,
          subject: `Quote Request from ${body.company} - Commercial Holiday Decor`,
          html: `<h2>New commercial quote request</h2><table cellpadding="6" style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">${lines
            .map(
              ([k, v]) =>
                `<tr><td style="color:#6b756e;vertical-align:top"><strong>${esc(k)}</strong></td><td>${esc(
                  String(v)
                ).replace(/\n/g, "<br>")}</td></tr>`
            )
            .join("")}</table>`
        })
      });
      if (res.ok) emailed = true;
      else console.error("Resend error:", res.status, await res.text());
    } catch (err) {
      console.error("Resend unreachable:", err);
    }
  } else {
    console.error("RESEND_API_KEY missing — cannot notify.");
  }

  // ---- 2. Store in ecom_contact_messages so it appears in admin.masterdecker.com.
  let stored = false;
  const storeId = await getStoreId();
  if (storeId && SUPABASE_URL && SERVICE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/ecom_contact_messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          store_id: storeId,
          name: body.name,
          email: body.email,
          phone: body.phone,
          province: "ON",
          subject,
          message: messageBody,
          source: "quote"
        })
      });
      if (res.ok) stored = true;
      else console.error("Contact message insert failed:", res.status, await res.text());
    } catch (err) {
      console.error("Supabase unreachable:", err);
    }
  } else {
    console.error("Supabase not configured or store not found — cannot store contact message.");
  }

  if (!emailed && !stored) {
    return Response.json({ error: "We could not submit that. Please call us instead." }, { status: 502 });
  }

  return Response.json({ ok: true, emailed, stored });
}
