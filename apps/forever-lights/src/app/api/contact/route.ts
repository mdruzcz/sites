import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const HOSTNAME = 'foreverlights.ca';

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // Honeypot: pretend success so bots stop retrying.
  if (body.website) return NextResponse.json({ ok: true, emailed: false, stored: false });

  const name = String(body.name ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const phone = String(body.phone ?? '').trim().slice(0, 40);
  const address = String(body.address ?? '').trim().slice(0, 200);
  const city = String(body.city ?? '').trim().slice(0, 80);
  const message = String(body.message ?? '').trim().slice(0, 3000);
  const token = String(body.token ?? '');

  if (!name || !email || !phone) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  // Turnstile verification — fail closed.
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, hostname: HOSTNAME }),
    });
    const verify = await verifyRes.json();
    if (!verify.success) {
      return NextResponse.json({ ok: false, error: 'Captcha failed' }, { status: 400 });
    }
  } catch (err) {
    console.error('Turnstile verify error:', err);
    return NextResponse.json({ ok: false, error: 'Captcha failed' }, { status: 400 });
  }

  // 1) Email is the critical path.
  let emailed = false;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New Forever Lights quote request - ${name} (${city || 'London'})`,
      html: `
        <h2 style="font-family:sans-serif">New quote request — Forever Lights</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
          <tr><td><strong>Phone</strong></td><td><a href="tel:${esc(phone.replace(/\D/g, ''))}">${esc(phone)}</a></td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td><strong>Address</strong></td><td>${esc(address) || '—'}</td></tr>
          <tr><td><strong>City</strong></td><td>${esc(city) || '—'}</td></tr>
          <tr><td valign="top"><strong>Message</strong></td><td>${esc(message).replace(/\n/g, '<br>') || '—'}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#888">Sent from ${HOSTNAME} at ${new Date().toISOString()}</p>
      `,
    });
    if (error) console.error('Resend error:', error);
    emailed = !error;
  } catch (err) {
    console.error('Resend exception:', err);
  }

  // 2) Database row via the shared forms Worker is the backup.
  let stored = false;
  try {
    const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? 'https://forms.masterdecker.com';
    const insertRes = await fetch(formsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostname: HOSTNAME,
        row: { name, email, phone, address, city, message, created_at: new Date().toISOString() },
      }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error('Forms worker insert error:', insertRes.status, await insertRes.text());
  } catch (err) {
    console.error('Forms worker exception:', err);
  }

  if (!emailed && !stored) {
    return NextResponse.json({ ok: false, emailed, stored, error: 'Failed to deliver request' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed, stored });
}
