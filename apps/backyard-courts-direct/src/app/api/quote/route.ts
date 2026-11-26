import { escapeHtml, NOTIFY_TO, sendEmail, storeLead, verifyTurnstile } from "@/lib/leads";
import { site } from "@/lib/site";

export const runtime = "edge";

const s = (v: unknown, max = 400) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: pretend success.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  // Bots submit instantly; a person takes at least a few seconds to fill the form.
  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < 3000) return Response.json({ ok: true });

  if (!(await verifyTurnstile(s(body.turnstileToken, 4000)))) {
    return Response.json({ error: "Captcha verification failed. Please refresh and try again." }, { status: 400 });
  }

  const name = s(body.name);
  const email = s(body.email);
  const phone = s(body.phone);
  if (!name || !phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "Please enter your name, a valid email and a phone number." }, { status: 400 });
  }

  const row = {
    name,
    email,
    phone,
    postal_code: s(body.postalCode, 20) || null,
    sport: s(body.sport) || null,
    kit: s(body.kit) || null,
    space: s(body.space) || null,
    base: s(body.base) || null,
    colours: s(body.colours) || null,
    message: s(body.message, 4000) || null,
    source: s(body.formId) || "quote",
  };

  const what = row.kit || row.sport || "Court kit";
  const line = (label: string, value: string | null) =>
    `<tr><td style="padding-right:16px"><strong>${label}</strong></td><td>${escapeHtml(value || "Not provided")}</td></tr>`;
  const emailed = await sendEmail({
    to: NOTIFY_TO(),
    replyTo: email,
    subject: `New quote request: ${what} - ${name}`,
    html: `
      <h2 style="font-family:system-ui">New quote request, ${escapeHtml(site.name)}</h2>
      <table style="font-family:system-ui;font-size:14px;line-height:1.6">
        ${line("Name", name)}
        <tr><td><strong>Phone</strong></td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${line("Postal code", row.postal_code)}
        ${line("Sport", row.sport)}
        ${line("Kit", row.kit)}
        ${line("Space available", row.space)}
        ${line("Base", row.base)}
        ${line("Colours", row.colours)}
        <tr><td valign="top"><strong>Details</strong></td><td>${escapeHtml(row.message ?? "None").replace(/\n/g, "<br>")}</td></tr>
      </table>
      <p style="font-family:system-ui;font-size:12px;color:#6b7280">Sent from ${escapeHtml(site.domain)}</p>
    `,
  });
  // Email is the critical path; the database row is the backup.
  const stored = await storeLead(row);

  if (!emailed && !stored) {
    return Response.json({ error: "We could not send your request right now. Please try again shortly." }, { status: 502 });
  }
  return Response.json({ ok: true, emailed, stored });
}
