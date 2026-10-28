import { escapeHtml, NOTIFY_TO, sendEmail, storeLead, verifyTurnstile } from "@/lib/leads";

export const runtime = "edge";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: pretend success.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  if (!(await verifyTurnstile(String(body.turnstileToken ?? "")))) {
    return Response.json({ error: "Captcha verification failed. Please refresh and try again." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const propertyType = String(body.propertyType ?? "").trim();
  if (!name || !phone || !email || !propertyType) {
    return Response.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  const interests = Array.isArray(body.interests) ? body.interests.map(String) : body.interests ? [String(body.interests)] : [];
  const extras: string[] = [];
  if (body.timeline) extras.push(`Timeline: ${body.timeline}`);
  if (body.formId) extras.push(`Source: ${body.formId}`);
  // Ad click IDs / UTM tags captured on landing, kept so leads can be matched
  // back to Google Ads clicks (offline conversion upload of won contracts).
  const attr = body.attribution && typeof body.attribution === "object" ? (body.attribution as Record<string, unknown>) : {};
  const attribution = Object.entries(attr)
    .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
    .slice(0, 12)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`);
  const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";
  if (attribution.length) extras.push("--- Ad source ---", ...attribution);
  const message = [String(body.message ?? "").trim(), ...extras].filter(Boolean).join("\n") || null;

  const row = {
    name,
    company: company || null,
    phone,
    email,
    property_type: propertyType,
    city: body.city ? String(body.city).trim() : null,
    address: body.address ? String(body.address).trim() : null,
    interests: interests.length ? interests : null,
    message,
  };

  const subjectWhat = interests[0] ?? propertyType;
  const emailed = await sendEmail({
    to: NOTIFY_TO(),
    replyTo: email,
    subject: `New Lead: ${subjectWhat} - ${name}${company ? ` (${company})` : ""}${adSource ? ` [${adSource}]` : ""}`,
    html: `
      <h2 style="font-family:system-ui">New Lead — Commercial Holiday Decorators</h2>
      <table style="font-family:system-ui;font-size:14px;line-height:1.6">
        <tr><td><strong>Name:</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Company / property:</strong></td><td>${escapeHtml(company || "Not provided")}</td></tr>
        <tr><td><strong>Phone:</strong></td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td><strong>Property type:</strong></td><td>${escapeHtml(propertyType)}</td></tr>
        <tr><td><strong>City:</strong></td><td>${escapeHtml(row.city ?? "Not provided")}</td></tr>
        <tr><td><strong>Address:</strong></td><td>${escapeHtml(row.address ?? "Not provided")}</td></tr>
        <tr><td><strong>Interested in:</strong></td><td>${escapeHtml(interests.join(", ") || "Not specified")}</td></tr>
        <tr><td valign="top"><strong>Details:</strong></td><td>${escapeHtml(message ?? "None").replace(/\n/g, "<br>")}</td></tr>
      </table>
      <p style="font-family:system-ui;font-size:12px;color:#6b7280">Sent from commercialholidaydecorators.ca</p>
    `,
  });
  const stored = await storeLead(row);

  if (!emailed && !stored) return Response.json({ error: "We could not send your request right now. Please call us or try again shortly." }, { status: 502 });
  return Response.json({ ok: true, emailed, stored });
}
