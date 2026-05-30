import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Honeypot
  if (body.website) return NextResponse.json({ ok: true });

  // Turnstile verification
  const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: body.token, hostname: 'foreverlights.ca' }),
  });
  const verify = await verifyRes.json();
  if (!verify.success) {
    return NextResponse.json({ error: 'Captcha failed' }, { status: 400 });
  }

  const { name, email, phone, address, city, message } = body;

  // Save via shared forms Worker
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? 'https://forms.masterdecker.com';
  const insertRes = await fetch(formsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hostname: 'foreverlights.ca',
      row: {
        name, email, phone, address, city, message,
        created_at: new Date().toISOString(),
      },
    }),
  });
  if (!insertRes.ok) {
    console.error('Forms worker insert error:', insertRes.status, await insertRes.text());
    return NextResponse.json({ error: 'Failed to save request' }, { status: 502 });
  }

  // Email notification
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New Forever Lights Quote Request — ${name} (${city || 'London'})`,
    html: `
      <h2>New Quote Request — Forever Lights</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Address</strong></td><td>${address || '—'}</td></tr>
        <tr><td><strong>City</strong></td><td>${city || '—'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || '—'}</td></tr>
      </table>
    `,
  });

  return NextResponse.json({ ok: true });
}
