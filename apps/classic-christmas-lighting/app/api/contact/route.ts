import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

async function verifyTurnstile(token: string, hostname: string) {
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT;
  if (!endpoint) return true;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return true;
  }
}

async function insertLead(data: {
  name: string;
  email: string;
  phone: string;
  address: string | null;
  service_type: string | null;
  message: string | null;
}) {
  try {
    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: "classicchristmaslighting.ca", row: data }),
    });
  } catch {
    // non-fatal
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    serviceType?: string;
    message?: string;
    turnstileToken?: string;
  };

  const { name, email, phone, address, serviceType, message, turnstileToken } = body;

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  if (turnstileToken) {
    const hostname =
      req.headers.get("origin")?.replace(/^https?:\/\//, "") || "classicchristmaslighting.ca";
    const valid = await verifyTurnstile(turnstileToken, hostname);
    if (!valid) {
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }
  }

  await insertLead({
    name,
    email,
    phone,
    address: address || null,
    service_type: serviceType || null,
    message: message || null,
  });

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "noreply@classicchristmaslighting.ca",
      to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
      subject: `New Quote Request — ${name} (${serviceType || "General"})`,
      html: `
        <h2>New Quote Request — Classic Christmas Lighting</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td><strong>Address</strong></td><td>${address || "—"}</td></tr>
          <tr><td><strong>Service</strong></td><td>${serviceType || "—"}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message || "—"}</td></tr>
        </table>
      `,
    });
  } catch {
    // non-fatal
  }

  return NextResponse.json({ success: true });
}
