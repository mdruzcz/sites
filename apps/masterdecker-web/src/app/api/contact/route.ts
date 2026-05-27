import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, phone, email, service, message, website } = body;

    // Honeypot check
    if (website) return NextResponse.json({ ok: true });
    if (!name || !phone) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    await resend.emails.send({
      from: "noreply@masterdecker.com",
      to: "service@masterdecker.com",
      subject: `New Estimate Request — ${service || "General Inquiry"}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "—"}`,
        `Service: ${service || "—"}`,
        `Message:\n${message || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
