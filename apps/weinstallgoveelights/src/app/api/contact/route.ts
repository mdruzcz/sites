import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, city, message, token, hostname, honeypot } = body;

  if (honeypot) return NextResponse.json({ ok: true });

  // Verify Turnstile
  const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, hostname }),
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json({ error: "Security check failed" }, { status: 400 });
  }

  // Save to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  await supabase.from("govee_quote_requests").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    city,
    message: message || null,
  });

  // Send email notification
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New Govee Quote Request from ${firstName} ${lastName} — ${city}`,
    html: `
      <h2>New Quote Request — We Install Govee Lights</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Message:</strong><br>${message || "No message provided"}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
