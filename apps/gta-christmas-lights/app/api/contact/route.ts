export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.website_url?.trim()) {
    return Response.json({ success: true });
  }

  if (
    !body.name ||
    !body.email ||
    !body.phone ||
    !body.address ||
    !body.serviceType
  ) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!body.turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return Response.json(
      { error: "Security verification required. Please complete the CAPTCHA." },
      { status: 400 }
    );
  }

  if (process.env.TURNSTILE_VERIFY_ENDPOINT && body.turnstileToken) {
    try {
      const turnstileRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: body.turnstileToken,
          hostname: "gtachristmaslights.ca",
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
    city: body.city || null,
    service_type: body.serviceType,
    budget: body.budget || null,
    message: body.message || null,
  };

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/gta_christmas_lights_leads`,
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
      // Log but don't fail
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL || "noreply@gtachristmaslights.ca",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          subject: `New GTA Christmas Lights Quote: ${body.serviceType} — ${body.name}`,
          html: `
            <h2 style="color:#C2151E;margin-bottom:8px;">New GTA Christmas Lights Quote Request</h2>
            <p style="color:#666;margin-top:0;">A new quote request just came in via gtachristmaslights.ca.</p>
            <table style="border-collapse:collapse;width:100%;max-width:640px;">
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;width:160px;">Name</td><td style="padding:8px;border:1px solid #eee;">${body.name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #eee;">${body.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${body.phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${body.city || "—"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Address</td><td style="padding:8px;border:1px solid #eee;">${body.address}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #eee;">${body.serviceType}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Budget</td><td style="padding:8px;border:1px solid #eee;">${body.budget || "—"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${body.message || "None"}</td></tr>
            </table>
            <p style="color:#999;font-size:12px;margin-top:16px;">Submitted via gtachristmaslights.ca</p>
          `,
        }),
      });
    } catch {
      // Log but don't fail
    }
  }

  return Response.json({ success: true });
}
