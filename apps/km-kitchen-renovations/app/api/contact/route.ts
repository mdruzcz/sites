export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  if (body._trap?.trim()) return Response.json({ ok: true });
  if (!body.name || !body.email || !body.phone)
    return Response.json({ error: "Required fields missing." }, { status: 400 });
  if (!body.token)
    return Response.json({ error: "Captcha required" }, { status: 400 });

  // Verify Turnstile
  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: "kmkitchenrenovations.ca" }),
    }
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success)
    return Response.json({ error: "Captcha verification failed" }, { status: 400 });

  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    service: body.service || null,
    message: body.message || null,
    source: body.source || "contact",
  };

  // Save via shared forms Worker
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hostname: "kmkitchenrenovations.ca", row: payload }),
  });
  if (!insertRes.ok) {
    console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
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
        from: process.env.CONTACT_FROM_EMAIL || "noreply@kmkitchenrenovations.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        replyTo: body.email,
        subject: `New Quote Request – K&M Kitchen Renovations (${body.service || "General"})`,
        html: `
          <h2>New Quote Request — K&M Kitchen Renovations</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Service:</strong> ${body.service || "Not specified"}</p>
          <p><strong>Message:</strong> ${body.message || "None"}</p>
          <p><strong>Source:</strong> ${body.source || "contact"}</p>
        `,
      }),
    });
  }

  return Response.json({ ok: true });
}
