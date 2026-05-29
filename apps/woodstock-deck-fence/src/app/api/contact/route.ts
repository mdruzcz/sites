import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, service, message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const siteId = process.env.SITE_ID ?? "woodstock-deck-fence";
    const siteDisplayName = process.env.SITE_DISPLAY_NAME ?? "Woodstock Deck & Fence";
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "noreply@woodstockdeckandfence.ca";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailBody = `
New quote request from ${siteDisplayName}

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city || "Not specified"}
Service: ${service || "Not specified"}
Message: ${message || "No message provided"}

---
Submitted via woodstockdeckandfence.ca
      `.trim();

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: `Quote Request from ${name} - ${siteDisplayName}`,
          text: emailBody,
        }),
      });
    }

    // Store in Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          site_id: siteId,
          site_display_name: siteDisplayName,
          name,
          email,
          phone,
          message: `Service: ${service || "Not specified"}\nCity: ${city || "Not specified"}\n\n${message || ""}`,
          user_agent: req.headers.get("user-agent") ?? undefined,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
