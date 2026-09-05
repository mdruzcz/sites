import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

async function verifyTurnstile(token: string, hostname: string): Promise<boolean> {
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; city?: string; service?: string; message?: string; honeypot?: string; token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { name, email, phone, city, service, message, honeypot, token } = body;

  if (honeypot) return NextResponse.json({ ok: true });
  if (!name || !email || !phone) return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
  if (!token) return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });

  const hostname = new URL(req.url).hostname.replace(/^www\./, "");
  const valid = await verifyTurnstile(token, hostname === "localhost" ? "restoremydeck.ca" : hostname);
  if (!valid) return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });

  const fullMessage = [service ? `Service: ${service}.` : "", city ? `City: ${city}.` : "", message || ""].filter(Boolean).join(" ");

  // Email first (critical path), DB row as backup.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
          reply_to: email,
          subject: `New Quote Request from ${name} - Restore My Deck`,
          html: `<h2>New Quote Request — Restore My Deck</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Phone:</strong> ${esc(phone)}</p>
            <p><strong>City:</strong> ${esc(city || "—")}</p>
            <p><strong>Service:</strong> ${esc(service || "—")}</p>
            <p><strong>Message:</strong> ${esc(message || "—")}</p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

  let stored = false;
  try {
    const insertRes = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: "restoremydeck.ca", row: { name, email, phone, message: fullMessage, created_at: new Date().toISOString() } }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error("rmd_quote_requests insert failed:", insertRes.status, await insertRes.text());
  } catch (e) {
    console.error("Forms worker fetch failed:", e);
  }

  if (!emailed && !stored) return NextResponse.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  return NextResponse.json({ ok: true, emailed, stored });
}
