export const runtime = "edge";

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, services, message, turnstileToken } = body;
    const name = [firstName, lastName].filter(Boolean).join(" ");

    if (!name || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Turnstile via shared Worker (required — fail closed)
    if (!turnstileToken) {
      return Response.json({ error: "Security check failed" }, { status: 400 });
    }
    const turnstileEndpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
    const requestHostname = new URL(request.url).hostname;
    let turnstileOk = false;
    try {
      const verifyRes = await fetch(turnstileEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken, hostname: requestHostname }),
      });
      const verifyData = await verifyRes.json() as { success: boolean };
      turnstileOk = verifyData.success === true;
    } catch {
      turnstileOk = false;
    }
    if (!turnstileOk) {
      return Response.json({ error: "Security check failed" }, { status: 400 });
    }

    // Ad click IDs / UTM tags captured on landing, kept so leads can be matched
    // back to Google Ads clicks (offline conversion upload of booked/sold jobs).
    const attr: Record<string, unknown> = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
    const attribution = Object.entries(attr)
      .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
      .slice(0, 12)
      .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
      .join("\n");
    const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";

    // Save the lead via the shared forms Worker (holds the Supabase publishable
    // key in one place, so a key rotation never silently drops leads fleet-wide).
    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
    const insertRes = await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: "londonconcreteforming.ca",
        row: {
          first_name: firstName,
          last_name: lastName || null,
          phone,
          email,
          services: Array.isArray(services) ? services : services ? [services] : null,
          message: [message, attribution && `--- Ad source ---\n${attribution}`].filter(Boolean).join("\n\n") || null,
        },
      }),
    });
    if (!insertRes.ok) {
      const detail = await insertRes.text();
      console.error("Forms worker insert failed", insertRes.status, detail);
      return Response.json({ error: "Could not save your request" }, { status: 502 });
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
          subject: `New Quote Request - ${servicesStr} | London Concrete Forming${adSource ? ` [${adSource}]` : ""}`,
          html: `
            <h2>New Quote Request — London Concrete Forming</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Services</td><td style="padding:8px;border:1px solid #ddd">${servicesStr}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message || "None"}</td></tr>
            </table>
            ${attribution ? `<p><strong>Ad source:</strong></p><pre style="font-size:12px;color:#555;white-space:pre-wrap">${esc(attribution)}</pre>` : ""}
          `,
        }),
      });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
