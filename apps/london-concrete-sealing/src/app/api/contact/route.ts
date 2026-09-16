import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const HOSTNAME = 'londonconcretesealing.ca';
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: NextRequest) {
  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }
  const { firstName, lastName, email, phone, message, honeypot, token } = body;

  if (honeypot) return NextResponse.json({ success: true });
  if (!firstName || !email || !phone) {
    return NextResponse.json({ success: false, message: 'Name, email and phone are required.' }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ success: false, message: 'Please complete the security check.' }, { status: 400 });
  }

  // Verify Turnstile via the shared Worker
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? 'https://turnstile.masterdecker.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, hostname: HOSTNAME }),
    });
    const verifyData = (await verifyRes.json()) as { success: boolean };
    if (!verifyData.success) {
      return NextResponse.json({ success: false, message: 'Security check failed.' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Security check unavailable. Please call us.' }, { status: 400 });
  }

  // Email is the critical path; the DB row is the backup.
  // Resend can only send from masterdecker.com — any other from-address 403s.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'noreply@masterdecker.com',
          to: process.env.CONTACT_TO_EMAIL || 'service@masterdecker.com',
          reply_to: email,
          subject: `New Contact Form Submission - London Concrete Sealing`,
          html: `
            <h2>New Contact Form Submission — London Concrete Sealing</h2>
            <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName || '')}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Phone:</strong> ${esc(phone)}</p>
            <p><strong>Message:</strong></p>
            <p>${esc(message || '(no message)')}</p>
          `,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error('Resend error:', r.status, await r.text());
    } catch (e) {
      console.error('Resend fetch failed:', e);
    }
  }

  // Save via shared forms Worker
  let stored = false;
  try {
    const insertRes = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? 'https://forms.masterdecker.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostname: HOSTNAME,
        row: {
          first_name: firstName,
          last_name: lastName || null,
          email,
          phone,
          message: message || null,
        },
      }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error('Forms worker insert error:', insertRes.status, await insertRes.text());
  } catch (e) {
    console.error('Forms worker fetch failed:', e);
  }

  if (!emailed && !stored) {
    return NextResponse.json({ success: false, message: "We couldn't send your message. Please call us." }, { status: 502 });
  }
  return NextResponse.json({ success: true, emailed, stored });
}
