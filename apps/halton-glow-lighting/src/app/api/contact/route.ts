import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Spam protection layers:
 * 1. Honeypot "website" field — silent 200 if filled.
 * 2. Time-gate — submissions under 3s after page load are silently dropped.
 *
 * On success: saves to shared LCF Supabase (halton_glow_quote_requests) AND
 * emails service@masterdecker.com via Resend.
 */

const MIN_FILL_TIME_MS = 3_000;

type ContactBody = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  service?: string;
  message?: string;
  website?: string;
  _loaded?: number;
};

async function sendEmailViaResend(body: ContactBody): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@haltonglowlighting.ca";
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const fullName = `${body.first_name ?? ""} ${body.last_name ?? ""}`.trim();
  const subject = `Halton Glow Lead: ${body.service || "Estimate Request"} — ${fullName}`;
  const html = `
    <h2 style="font-family:sans-serif;color:#0A0E1F;">New Halton Glow Quote Request</h2>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#333;">
      <strong>Name:</strong> ${fullName}<br/>
      <strong>Phone:</strong> ${body.phone || ""}<br/>
      <strong>Email:</strong> ${body.email || ""}<br/>
      <strong>Address:</strong> ${body.address || "Not provided"}<br/>
      <strong>City:</strong> ${body.city || "Not provided"}<br/>
      <strong>Service:</strong> ${body.service || ""}<br/>
      <strong>Message:</strong><br/>${(body.message || "None").replace(/\n/g, "<br/>")}
    </p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from: fromEmail, to: toEmail, subject, html }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[contact] Resend request failed:", e);
  }
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (body._loaded) {
    const elapsed = Date.now() - body._loaded;
    if (elapsed < MIN_FILL_TIME_MS) {
      return NextResponse.json({ success: true });
    }
  }

  const errors: string[] = [];
  if (!body.first_name || body.first_name.trim().length < 2) errors.push("First name is required.");
  if (!body.last_name || body.last_name.trim().length < 2) errors.push("Last name is required.");
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push("Valid email is required.");
  if (!body.phone || body.phone.trim().length < 7) errors.push("Phone is required.");
  if (!body.service) errors.push("Select a service.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/halton_glow_quote_requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          phone: body.phone,
          address: body.address || null,
          city: body.city || null,
          service: body.service,
          message: body.message || null,
          status: "new",
        }),
      }
    );

    if (!response.ok) {
      console.error("[contact] Supabase insert error:", await response.text());
    }
  } else {
    console.warn("[contact] Supabase env vars not set — skipping DB insert");
  }

  await sendEmailViaResend(body);

  return NextResponse.json({ success: true }, { status: 200 });
}
