import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message, honeypot, token } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Verify Turnstile
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, hostname: 'londonconcretesealing.ca' }),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ success: false, message: 'Security check failed.' }, { status: 400 });
    }

    // Save to Supabase via REST API (anon key — INSERT allowed by RLS policy)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/lcs_contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName || null,
          email,
          phone,
          message: message || null,
        }),
      });
    }

    // Send email notification
    await resend.emails.send({
      from: 'noreply@londonconcretesealing.ca',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `New Contact Form Submission — London Concrete Sealing`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message || '(no message)'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
