export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website?.trim()) {
      return Response.json({ ok: true });
    }

    const { name, phone, email, service, address, message, token } = body;
    if (!name || !phone || !message) {
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/optimum_hvac_leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: name,
          phone,
          email: email || null,
          service_needed: service || "Emergency Repair",
          address: address || null,
          message,
          form_type: "emergency",
          page_path: req.headers.get("referer") || null,
          user_agent: req.headers.get("user-agent") || null,
        }),
      });
    }

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
          subject: `🚨 EMERGENCY — ${service || "HVAC Emergency"} — ${name} — ${phone}`,
          html: `
            <h1 style="color:#dc2626">🚨 EMERGENCY SERVICE REQUEST</h1>
            <h2>Optimum HVAC — Immediate Response Required</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr style="background:#fef2f2"><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
              <tr style="background:#fef2f2"><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}" style="color:#dc2626;font-weight:bold;font-size:1.2em">${phone}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Address</td><td style="padding:8px">${address || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service || "Emergency Repair"}</td></tr>
              <tr style="background:#fef2f2"><td style="padding:8px;font-weight:bold">Problem</td><td style="padding:8px">${message}</td></tr>
            </table>
          `,
        }),
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Emergency form error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
