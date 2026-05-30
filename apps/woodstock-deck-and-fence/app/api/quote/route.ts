export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.service)
    return Response.json({ error: "All fields required." }, { status: 400 });

  if (!body.token) {
    return Response.json({ error: "Captcha required" }, { status: 400 });
  }
  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: "woodstockdeckandfence.ca" }),
    },
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) {
    return Response.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const payload = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    service: body.service,
    message: body.message || null,
  };

  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hostname: "woodstockdeckandfence.ca", row: payload }),
  });
  if (!insertRes.ok) {
    console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
    return Response.json({ error: "Failed to save request" }, { status: 502 });
  }

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "noreply@woodstockdeckandfence.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        subject: `New Quote Request: ${body.service} — ${body.name}`,
        html: `
          <h2>New Quote Request — Woodstock Deck and Fence</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Service:</strong> ${body.service}</p>
          <p><strong>Message:</strong> ${body.message || "None"}</p>
        `,
      }),
    });
  }

  return Response.json({ ok: true });
}
