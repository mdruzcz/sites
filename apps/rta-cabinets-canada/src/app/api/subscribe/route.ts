import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const esc = (s: string) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Newsletter / deals signup from the popup. Emails the team; also stored in ecom_contact_messages when available. */
export async function POST(req: NextRequest) {
  let body: { email?: string; company?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body.company) return NextResponse.json({ ok: true }); // honeypot
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const source = String(body.source ?? "").slice(0, 200);

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: email,
          subject: `New deals signup — RTA Cabinets Canada: ${email}`,
          html: `<h2>Exclusive deals signup</h2><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Page:</strong> ${esc(source || "-")}</p><p>Add this address to the RTA Cabinets Canada deals list.</p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

  let stored = false;
  const supabase = createServerSupabase();
  if (supabase) {
    const { error } = await supabase.from("ecom_contact_messages").insert({
      store_id: "16d7e92b-f929-4660-8214-77c32ed33f5f",
      name: "Deals signup",
      email,
      subject: "Exclusive deals signup",
      message: `Newsletter signup from ${source || "site"}`,
      source: "deals-signup",
    });
    stored = !error;
    if (error) console.warn("subscribe store failed:", error.message);
  }

  if (!emailed && !stored) return NextResponse.json({ error: "Could not save your email." }, { status: 502 });
  return NextResponse.json({ ok: true, emailed, stored });
}
