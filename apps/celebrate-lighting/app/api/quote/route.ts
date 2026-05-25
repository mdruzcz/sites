export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  // Turnstile verification
  const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY ?? "",
      response: body.turnstileToken ?? "",
    }),
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

  // Save to Supabase
  await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/celebratelighting_quote_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

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
