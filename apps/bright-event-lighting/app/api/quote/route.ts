export const runtime = "edge";

const HOSTNAME = "brighteventlighting.ca";
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill it, humans never see it.
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.service) {
    return Response.json({ error: "Name, phone, email and the type of event are required." }, { status: 400 });
  }
  if (!body.token) {
    return Response.json({ error: "Please complete the security check." }, { status: 400 });
  }

  // Fail-closed captcha via the shared Turnstile Worker (secret lives only there).
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: HOSTNAME }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return Response.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Security check unavailable. Please call us." }, { status: 400 });
  }

  const payload = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    event_date: body.eventDate || null,
    venue: body.venue || null,
    service: body.service,
    message: body.message || null,
  };

  // Email is the critical path: Resend can only send from the verified masterdecker.com domain.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: `Bright Event Lighting <${process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com"}>`,
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: body.email,
          subject: `New Lighting Inquiry: ${body.service} — ${body.name}`,
          html: `<h2>New Lighting Inquiry — Bright Event Lighting</h2>
            <p><strong>Name:</strong> ${esc(body.name)}</p>
            <p><strong>Phone:</strong> ${esc(body.phone)}</p>
            <p><strong>Email:</strong> ${esc(body.email)}</p>
            <p><strong>Event date:</strong> ${esc(body.eventDate || "Not provided")}</p>
            <p><strong>Venue / location:</strong> ${esc(body.venue || "Not provided")}</p>
            <p><strong>Event / package:</strong> ${esc(body.service)}</p>
            <p><strong>Message:</strong> ${esc(body.message || "None")}</p>
            <hr /><p style="color:#888;font-size:12px">Submitted via brighteventlighting.ca</p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  } else {
    console.error("RESEND_API_KEY is not set");
  }

  // Backup copy in Supabase (bel_quote_requests). Not fatal on its own.
  let stored = false;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const insertRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bel_quote_requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      stored = insertRes.ok;
      if (!insertRes.ok) console.error("Supabase insert error:", insertRes.status, await insertRes.text());
    } catch (e) {
      console.error("Supabase fetch failed:", e);
    }
  }

  if (!emailed && !stored) {
    return Response.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  }
  return Response.json({ ok: true, emailed, stored });
}
