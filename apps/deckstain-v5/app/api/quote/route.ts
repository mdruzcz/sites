export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  if (body.company?.trim()) return Response.json({ ok: true }); // honeypot

  if (!body.name || !body.phone || !body.email || !body.service || !body.city)
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  if (!body.token) return Response.json({ error: "Captcha required." }, { status: 400 });

  const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: body.token, hostname: "deckstain.ca" }),
  });
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) return Response.json({ error: "Captcha verification failed. Please try again." }, { status: 400 });

  const payload = { name: body.name, phone: body.phone, email: body.email, city: body.city, service: body.service, message: body.message || null };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const r = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/deckstain_v5_quote_requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, Prefer: "return=minimal" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const detail = await r.text();
      return Response.json({ error: "Could not save your request. Please call us.", detail }, { status: 502 });
    }
  }

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "noreply@deckstain.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        subject: `New Quote Request: ${body.service} — ${body.name}`,
        html: `<h2>New Quote Request — DeckStain.ca</h2><p><strong>Name:</strong> ${body.name}</p><p><strong>Phone:</strong> ${body.phone}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>City:</strong> ${body.city}</p><p><strong>Service:</strong> ${body.service}</p><p><strong>Message:</strong> ${body.message || "None"}</p>`,
      }),
    });
  }

  return Response.json({ ok: true });
}
