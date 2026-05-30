export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  // Turnstile verification via shared Worker
  const turnstileEndpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  const turnstileRes = await fetch(turnstileEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: body.turnstileToken ?? "", hostname: "celebratelighting.ca" }),
  });
  const turnstileData = await turnstileRes.json() as { success: boolean };
  if (!turnstileData.success) {
    return Response.json({ error: "Captcha verification failed." }, { status: 400 });
  }

  // Honeypot
  if (body.website?.trim()) return Response.json({ ok: true });

  // Validate required fields
  if (!body.name || !body.phone || !body.email || !body.service) {
    return Response.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  const payload = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    address: body.address ?? null,
    service: body.service,
    message: body.message ?? null,
  };

  // Save via shared forms Worker
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hostname: "celebratelighting.ca", row: payload }),
  });
  if (!insertRes.ok) {
    console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
    return Response.json({ error: "Failed to save request" }, { status: 502 });
  }

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "noreply@celebratelighting.ca",
        to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
        subject: `New Quote Request: ${body.service} — ${body.name}`,
        html: `
          <h2>New Quote Request — Celebrate Lighting</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Address:</strong> ${body.address ?? "Not provided"}</p>
          <p><strong>Service:</strong> ${body.service}</p>
          <p><strong>Message:</strong> ${body.message ?? "None"}</p>
        `,
      }),
    });
  }

  return Response.json({ ok: true });
}
