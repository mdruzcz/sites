export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  // Honeypot
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.service)
    return Response.json({ error: "All fields required." }, { status: 400 });

  const payload = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    service: body.service,
    message: body.message || null,
  };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/wcf_quote_requests`,
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
        from: process.env.CONTACT_FROM_EMAIL || "noreply@woodstockconcreteforming.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        subject: `New Quote Request: ${body.service} — ${body.name}`,
        html: `
          <h2>New Quote Request — Woodstock Concrete Forming</h2>
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
