export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  // Honeypot check
  if (body.website_url?.trim()) {
    return Response.json({ success: true });
  }

  // Validate required fields
  if (!body.name || !body.email || !body.phone || !body.address || !body.serviceType) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  // Require Turnstile token — reject submissions without it
  if (!body.turnstileToken) {
    return Response.json(
      { error: "Security verification required. Please complete the CAPTCHA." },
      { status: 400 }
    );
  }

  // Verify Turnstile token via shared worker at turnstile.masterdecker.com
  if (process.env.TURNSTILE_VERIFY_ENDPOINT) {
    try {
      const turnstileRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: body.turnstileToken,
          hostname: "christmaslightslondon.ca",
        }),
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return Response.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
    } catch {
      return Response.json(
        { error: "Security verification unavailable. Please try again shortly." },
        { status: 503 }
      );
    }
  }

  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    address: body.address,
    service_type: body.serviceType,
    message: body.message || null,
  };

  // Insert into Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cll_quote_requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch {
      // Log but don't fail the request
    }
  }

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@christmaslightslondon.ca",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          subject: `New Quote Request: ${body.serviceType} — ${body.name}`,
          html: `
            <h2 style="color:#CC1033;">New Christmas Lights London Quote Request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;width:140px;">Name</td><td style="padding:8px;border:1px solid #eee;">${body.name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #eee;">${body.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${body.phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Address</td><td style="padding:8px;border:1px solid #eee;">${body.address}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #eee;">${body.serviceType}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${body.message || "None"}</td></tr>
            </table>
            <p style="color:#666;font-size:12px;margin-top:16px;">Submitted via christmaslightslondon.ca</p>
          `,
        }),
      });
    } catch {
      // Log but don't fail
    }
  }

  return Response.json({ success: true });
}
