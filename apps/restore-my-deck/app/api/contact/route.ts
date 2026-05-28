import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function verifyTurnstile(token: string): Promise<boolean> {
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, hostname: "restoremydeck.ca" }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; phone?: string; message?: string; honeypot?: string; token?: string };
  const { name, email, phone, message, honeypot, token } = body;

  if (honeypot) return NextResponse.json({ ok: true });
  if (!name || !email || !phone || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const valid = await verifyTurnstile(token);
  if (!valid) return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });

  await supabase.from("rmd_quote_requests").insert({
    name, email, phone, message: message || "", created_at: new Date().toISOString(),
  });

  await resend.emails.send({
    from: "noreply@restoremydeck.ca",
    to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
    subject: `New Quote Request from ${name} – Restore My Deck`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message || "—"}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
