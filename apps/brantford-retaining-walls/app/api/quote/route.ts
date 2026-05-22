import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const body = await req.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { name, phone, email, service, message } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await supabase.from("brw_quote_requests").insert({
      name,
      phone,
      email,
      service,
      message: message || null,
    });

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "noreply@brantfordretainingwalls.ca",
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `New Quote Request — ${service} — ${name}`,
      html: `
        <h2>New Quote Request — Brantford Retaining Walls</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || "None"}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
