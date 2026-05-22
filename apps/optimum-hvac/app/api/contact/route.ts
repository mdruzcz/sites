export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.website?.trim()) {
      return Response.json({ ok: true });
    }

    const { name, phone, email, service, message } = body;
    if (!name || !phone || !service) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase
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
          service_needed: service,
          message: message || null,
          form_type: "contact",
          page_path: req.headers.get("referer") || null,
          user_agent: req.headers.get("user-agent") || null,
        }),
      });
    }

    // Send email via Resend
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
          subject: `Contact Form — ${service} — ${name}`,
          html: `
            <h2>New Contact Form Submission — Optimum HVAC</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email || "—"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message || "—"}</td></tr>
            </table>
          `,
        }),
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
