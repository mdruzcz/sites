export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, services, message, turnstileToken } = body;
    const name = [firstName, lastName].filter(Boolean).join(" ");

    if (!name || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Turnstile via shared Worker
    if (turnstileToken) {
      const turnstileEndpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
      const requestHostname = new URL(request.url).hostname;
      const verifyRes = await fetch(turnstileEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken, hostname: requestHostname }),
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
      await fetch(`${supabaseUrl}/rest/v1/lcf_contact_requests`, {
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
          services: Array.isArray(services) ? services.join(", ") : services || null,
          message: message || null,
          created_at: new Date().toISOString(),
        }),
      });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@londonconcreteforming.ca";
    const servicesStr = Array.isArray(services) ? services.join(", ") : services || "Not specified";

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
          subject: `New Quote Request — ${servicesStr} | London Concrete Forming`,
          html: `
            <h2>New Quote Request — London Concrete Forming</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Services</td><td style="padding:8px;border:1px solid #ddd">${servicesStr}</td></tr>
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
