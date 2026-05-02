import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Fields: first_name, last_name, email, phone, intent, city, message
 *         website (honeypot), _loaded (timestamp), recaptchaToken
 *
 * Spam protection — 3 layers:
 * 1. Honeypot   — "website" field; if filled, silently 200 (waste bot time).
 * 2. Time-gate  — submission < 3 s after page load → silent drop.
 * 3. reCAPTCHA v3 — score < 0.5 → 403.
 *
 * On success: saves lead to Supabase `realtor_leads` table.
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const MIN_FILL_TIME_MS = 3_000;

type ContactBody = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  city?: string;
  message?: string;
  website?: string;    // honeypot
  _loaded?: number;    // page-load epoch ms
  recaptchaToken?: string;
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET) {
    console.warn("[contact] RECAPTCHA_SECRET_KEY not set — skipping");
    return { success: true, score: 1.0 };
  }
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });
    const data = await res.json();
    return { success: data.success === true, score: data.score ?? 0 };
  } catch (e) {
    console.error("[contact] reCAPTCHA error:", e);
    return { success: false, score: 0 };
  }
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // ── Layer 1: Honeypot ──────────────────────────────────────────────
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true }); // silent bot drop
  }

  // ── Layer 2: Time-gate ─────────────────────────────────────────────
  if (body._loaded) {
    const elapsed = Date.now() - body._loaded;
    if (elapsed < MIN_FILL_TIME_MS) {
      console.warn(`[contact] Time-gate: ${elapsed}ms — likely bot`);
      return NextResponse.json({ success: true }); // silent bot drop
    }
  }

  // ── Layer 3: reCAPTCHA v3 ──────────────────────────────────────────
  if (body.recaptchaToken) {
    const { success, score } = await verifyRecaptcha(body.recaptchaToken);
    if (!success || score < 0.5) {
      console.warn(`[contact] reCAPTCHA fail — success=${success} score=${score}`);
      return NextResponse.json(
        { error: "Spam check failed. Please try again or call (519) 878-6735." },
        { status: 403 }
      );
    }
  } else if (RECAPTCHA_SECRET) {
    return NextResponse.json(
      { error: "Spam check failed. Please try again or call (519) 878-6735." },
      { status: 403 }
    );
  }

  // ── Validation ─────────────────────────────────────────────────────
  const errors: string[] = [];
  if (!body.first_name?.trim() || body.first_name.trim().length < 2) errors.push("First name is required.");
  if (!body.last_name?.trim()  || body.last_name.trim().length < 2)  errors.push("Last name is required.");
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push("A valid email is required.");
  if (!body.phone?.trim() || body.phone.trim().length < 7)            errors.push("Phone number is required.");
  if (!body.intent)                                                    errors.push("Please select what you're looking for.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  // ── Save to Supabase ───────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[contact] Supabase env vars not configured");
    return NextResponse.json({ error: "Server configuration error. Please call (519) 878-6735." }, { status: 500 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/realtor_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      first_name: body.first_name!.trim(),
      last_name:  body.last_name!.trim(),
      email:      body.email!.trim().toLowerCase(),
      phone:      body.phone!.trim(),
      intent:     body.intent,
      city:       body.city   || null,
      message:    body.message || null,
      status:     "new",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[contact] Supabase insert error:", err);
    return NextResponse.json({ error: "Failed to save your message. Please call (519) 878-6735." }, { status: 500 });
  }

  console.log(`[contact] Lead saved — ${body.first_name} ${body.last_name} <${body.email}> intent=${body.intent}`);
  return NextResponse.json({ success: true }, { status: 200 });
}
