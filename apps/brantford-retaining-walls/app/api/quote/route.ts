import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const body = await req.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { name, phone, email, service, message, token } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ error: "Captcha required" }, { status: 400 });
    }
    const verifyRes = await fetch(
      process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, hostname: "brantfordretainingwalls.ca" }),
      },
    );
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    const insertRes = await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: "brantfordretainingwalls.ca",
        row: { name, phone, email, service, message: message || null },
      }),
    });
    if (!insertRes.ok) {
      console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
      return NextResponse.json({ error: "Failed to save request" }, { status: 502 });
    }

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
