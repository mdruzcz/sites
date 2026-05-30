export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website?.trim()) {
      return Response.json({ ok: true });
    }

    const { name, phone, email, service, message, propertyType, systemAge, token } = body;
    if (!name || !phone || !service) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!token) {
      return Response.json({ error: "Captcha required" }, { status: 400 });
    }
    const verifyRes = await fetch(
      process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, hostname: "optimumhvac.ca" }),
      },
    );
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return Response.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: "optimumhvac.ca",
        row: {
          full_name: name,
          phone,
          email: email || null,
          service_needed: service,
          property_type: propertyType || null,
          system_age: systemAge || null,
          message: message || null,
          form_type: "quote",
          page_path: req.headers.get("referer") || null,
          user_agent: req.headers.get("user-agent") || null,
        },
      }),
    });

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@optimumhvac.ca",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          subject: `Quote Request — ${service} — ${name}`,
          html: `
            <h2>New Quote Request — Optimum HVAC</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Property Type</td><td style="padding:8px">${propertyType || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">System Age</td><td style="padding:8px">${systemAge || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Details</td><td style="padding:8px">${message || "—"}</td></tr>
            </table>
          `,
        }),
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Quote form error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
