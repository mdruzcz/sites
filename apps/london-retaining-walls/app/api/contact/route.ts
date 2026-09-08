import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const HOSTNAME = "londonretainingwalls.ca";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, hostname: HOSTNAME }) });
    const data = (await res.json()) as { success: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  const { name, email, phone, city, wallType, message, source, honeypot, token } = body as Record<string, string | undefined>;

  if (honeypot) return NextResponse.json({ ok: true });
  if (!name || !email || !phone || !token) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!(await verifyTurnstile(token))) return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });

  const details = [city && `Town: ${city}`, wallType && `Wall type: ${wallType}`, source && `Page: ${source}`].filter(Boolean).join("\n");
  const fullMessage = [message?.trim(), details].filter(Boolean).join("\n\n");

  // Email is the critical path; the DB row is the backup.
  let emailed = false;
  try {
    const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "noreply@masterdecker.com",
      to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
      replyTo: email,
      subject: `Retaining wall quote request: ${name}${city ? ` (${city})` : ""}`,
      html: `<h2>New quote request, London Retaining Walls</h2>
        <p><strong>Name:</strong> ${esc(name)}<br/><strong>Phone:</strong> ${esc(phone)}<br/><strong>Email:</strong> ${esc(email)}<br/><strong>Town:</strong> ${esc(city || "—")}<br/><strong>Wall type:</strong> ${esc(wallType || "—")}<br/><strong>Page:</strong> ${esc(source || "—")}</p>
        <p><strong>Message:</strong><br/>${esc(message || "—").replace(/\n/g, "<br/>")}</p>`,
    });
    emailed = !r.error;
    if (r.error) console.error("[lrw contact] resend error", r.error);
  } catch (e) {
    console.error("[lrw contact] resend threw", e);
  }

  let stored = false;
  try {
    const res = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row: { name, email, phone, message: fullMessage, created_at: new Date().toISOString() } }),
    });
    stored = res.ok;
    if (!res.ok) console.error("[lrw contact] forms worker", res.status, await res.text());
  } catch (e) {
    console.error("[lrw contact] forms worker threw", e);
  }

  if (!emailed && !stored) return NextResponse.json({ ok: false, emailed, stored }, { status: 502 });
  return NextResponse.json({ ok: true, emailed, stored });
}
