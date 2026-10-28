import { attributionHtml, escapeHtml, formatAttribution, NOTIFY_TO, sendEmail, storeLead, verifyTurnstile } from "@/lib/leads";

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
    return Response.json({ error: "Captcha verification failed. Please try again or call us." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  if (!name || !phone || !email || !service) {
    return Response.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  const extras: string[] = [];
  if (body.preferredContact) extras.push(`Preferred contact: ${body.preferredContact}`);
  if (body.formId) extras.push(`Source: ${body.formId}`);
  const message = [String(body.message ?? "").trim(), ...extras].filter(Boolean).join("\n") || null;
  const attribution = formatAttribution(body.attribution);

  const row = {
    name,
    phone,
    email,
    address: body.address ? String(body.address) : null,
    service,
    message: [message, attribution.text && `--- Ad source ---\n${attribution.text}`].filter(Boolean).join("\n\n") || null,
  };

  // Email is the critical path; the DB row is the backup.
  const emailed = await sendEmail({
    to: NOTIFY_TO(),
    replyTo: email,
    subject: `New Lead: ${service} - ${name}${attribution.adSource ? ` [${attribution.adSource}]` : ""}`,
    html: `
      <h2>New Lead — Celebrate Lighting</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Address:</strong> ${escapeHtml(row.address ?? "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message ?? "None").replace(/\n/g, "<br>")}</p>
      ${attributionHtml(attribution.text)}
    `,
  });
  const stored = await storeLead(row);

  if (!emailed && !stored) return Response.json({ error: "Failed to send request" }, { status: 502 });
  return Response.json({ ok: true, emailed, stored });
}
