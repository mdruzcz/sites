export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, service, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !phone || !service) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Turnstile token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return Response.json({ error: "Security check failed" }, { status: 400 });
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Save to Supabase
    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/bcf_quote_requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          phone,
          email: email || null,
          address: address || null,
          service,
          message: message || null,
          created_at: new Date().toISOString(),
        }),
      });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@brantfordconcreteforming.ca";

    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `New Quote Request — ${service} | Brantford Concrete Forming`,
          html: `
            <h2>New Quote Request</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #ddd">${address || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${service}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message || "None"}</td></tr>
            </table>
          `,
        }),
      });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
