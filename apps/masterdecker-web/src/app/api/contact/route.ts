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

    // Keep the barrier low for higher conversion: only name, phone, and email
    // are required. Address/city are optional (collected when available).
    if (!firstName || !phone || !email) {
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

    // Ad click IDs / UTM tags captured on landing, kept so leads can be matched
    // back to Google Ads clicks (offline conversion upload of booked/sold jobs).
    const attr: Record<string, unknown> =
      body.attribution && typeof body.attribution === "object" ? body.attribution : {};
    const attribution = Object.entries(attr)
      .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
      .slice(0, 12)
      .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
      .join("\n");
    const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";

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
            message: [message, attribution && `--- Ad source ---\n${attribution}`].filter(Boolean).join("\n\n") || null,
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
      subject: `New Quote Request - ${firstName}${lastName ? " " + lastName : ""}${adSource ? ` [${adSource}]` : ""}`,
      text: [
        `Name: ${firstName}${lastName ? " " + lastName : ""}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${streetAddress}, ${city}`,
        `Services: ${services || "—"}`,
        "",
        `Message:`,
        message || "—",
        ...(attribution ? ["", "Ad source:", attribution] : []),
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
