export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  // Honeypot
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.email || !body.service)
    return Response.json({ error: "Required fields missing." }, { status: 400 });

  if (!body.token) {
    return Response.json({ error: "Captcha required" }, { status: 400 });
  }

  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: "tricityconcretesealing.ca" }),
    },
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) {
    return Response.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const payload = {
    name: body.name,
    phone: body.phone || null,
    email: body.email,
    address: body.address || null,
    service: body.service,
    message: body.message || null,
  };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tricity_concrete_sealing_quote_requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      }
    );
  }

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "noreply@tricityconcretesealing.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        subject: `New Quote Request: ${body.service} — ${body.name}`,
        html: `
          <h2>New Quote Request — TriCity Concrete Sealing</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Address:</strong> ${body.address || "Not provided"}</p>
          <p><strong>Service:</strong> ${body.service}</p>
          <p><strong>Message:</strong> ${body.message || "None"}</p>
        `,
      }),
    });
  }

  return Response.json({ ok: true });
}
