export const runtime = "edge";

interface QuoteBody {
  website?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  service?: string;
  message?: string;
  token?: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as QuoteBody;

  // Honeypot
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.service) {
    return Response.json({ error: "All fields required." }, { status: 400 });
  }

  if (!body.token) {
    return Response.json({ error: "Captcha required" }, { status: 400 });
  }
  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: "ontariolightshows.ca" }),
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
    address: body.address || null,
    service: body.service,
    message: body.message || null,
  };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/ontariolightshows_quote_requests`,
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
    } catch {
      // swallow — email is the primary delivery
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@ontariolightshows.ca",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          subject: `New Quote: ${body.service} — ${body.name} (Ontario Light Shows)`,
          html: `
            <h2 style="font-family:system-ui;color:#05070F">New Quote Request — Ontario Light Shows</h2>
            <table style="font-family:system-ui;font-size:14px;line-height:1.6">
              <tr><td><strong>Name:</strong></td><td>${escapeHtml(body.name)}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${escapeHtml(body.phone)}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${escapeHtml(body.email)}</td></tr>
              <tr><td><strong>City:</strong></td><td>${escapeHtml(body.address || "Not provided")}</td></tr>
              <tr><td><strong>Service:</strong></td><td>${escapeHtml(body.service)}</td></tr>
              <tr><td valign="top"><strong>Details:</strong></td><td>${escapeHtml(body.message || "None")}</td></tr>
            </table>
          `,
        }),
      });
    } catch {
      // swallow
    }
  }

  return Response.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
