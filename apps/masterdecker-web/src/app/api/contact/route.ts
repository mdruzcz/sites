import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      services,
      message,
      website,
      token,
    } = body;

    if (website) return NextResponse.json({ ok: true });

    if (!firstName || !phone || !email || !streetAddress || !city) {
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
        body: JSON.stringify({ token, hostname: "masterdecker.com" }),
      },
    );
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    try {
      const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
      await fetch(formsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostname: "masterdecker.com",
          row: {
            first_name: firstName,
            last_name: lastName || null,
            email,
            phone,
            street_address: streetAddress,
            city,
            services: services || null,
            message: message || null,
          },
        }),
      });
    } catch (err) {
      console.error("forms worker insert failed", err);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
      to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
      subject: `New Quote Request — ${firstName}${lastName ? " " + lastName : ""}`,
      text: [
        `Name: ${firstName}${lastName ? " " + lastName : ""}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${streetAddress}, ${city}`,
        `Services: ${services || "—"}`,
        "",
        `Message:`,
        message || "—",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
