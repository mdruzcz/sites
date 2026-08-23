export const runtime = "edge";

const HOSTNAME = "commercialholidaydecor.ca";
const TO = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";
// masterdecker.com is the only Resend-verified sending domain — a
// noreply@commercialholidaydecor.ca fallback would 403 silently.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@masterdecker.com";

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

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Honeypot — silently accept so the bot does not learn anything.
  if (body.website?.trim()) return Response.json({ ok: true });

  // Captcha. Fail CLOSED: if a site key is configured, a valid token is
  // required. `if (token) { verify }` would let any caller skip the check.
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    if (!body.turnstileToken) {
      return Response.json({ error: "Captcha not completed." }, { status: 400 });
    }
    const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: body.turnstileToken, hostname: HOSTNAME })
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

  const row = {
    company: body.company!,
    name: body.name!,
    email: body.email!,
    phone: body.phone!,
    property_address: body.propertyAddress!,
    property_type: body.propertyType || null,
    timeline: body.timeline || null,
    interests: (body.interests ?? []).join(", ") || null,
    message: body.message || null
  };

  const lines: [string, string][] = [
    ["Company", row.company],
    ["Contact", row.name],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Property", row.property_address],
    ["Property type", row.property_type ?? "—"],
    ["Timeline", row.timeline ?? "—"],
    ["Interested in", row.interests ?? "—"],
    ["Message", row.message ?? "—"]
  ];

  // ---- 1. Email is the critical path. If this succeeds the lead is not lost.
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
          reply_to: row.email,
          subject: `Quote Request from ${row.company} - Commercial Holiday Decor`,
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

  // ---- 2. Database copy via the shared forms Worker.
  // The Worker needs a `commercialholidaydecor.ca -> chd_quote_requests`
  // mapping and that table has to exist. Until both are in place this will
  // fail, so it is logged and NOT allowed to fail the request — losing the
  // lead would be worse than losing the backup copy.
  let stored = false;
  try {
    const endpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row })
    });
    if (res.ok) stored = true;
    else console.error("Forms worker insert failed:", res.status, await res.text());
  } catch (err) {
    console.error("Forms worker unreachable:", err);
  }

  if (!emailed && !stored) {
    return Response.json(
      { error: "We could not submit that. Please call us instead." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, emailed, stored });
}
