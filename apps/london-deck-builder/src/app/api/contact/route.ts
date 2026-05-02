import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Spam protection (3 layers):
 * 1. Honeypot — hidden "website" field; if filled, silently 200.
 * 2. Time-gate — "_loaded" timestamp; submissions < 3 s are dropped.
 * 3. reCAPTCHA v3 — token verified server-side; score < 0.5 rejected.
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const ERPNEXT_URL = process.env.ERPNEXT_URL;           // e.g. https://masterdecker.app
const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;
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
  website?: string;       // honeypot
  _loaded?: number;        // page-load timestamp (ms)
  recaptchaToken?: string; // reCAPTCHA v3 token
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET) {
    console.warn("[contact] RECAPTCHA_SECRET_KEY not set — skipping verification");
    return { success: true, score: 1.0 };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET,
        response: token,
      }),
    });
    const data = await res.json();
    return { success: data.success === true, score: data.score ?? 0 };
  } catch (e) {
    console.error("[contact] reCAPTCHA verify error:", e);
    return { success: false, score: 0 };
  }
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // ── Layer 1: Honeypot ──────────────────────────────────────────────
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ success: true }); // silent drop
  }

  // ── Layer 2: Time-gate ─────────────────────────────────────────────
  if (body._loaded) {
    const elapsed = Date.now() - body._loaded;
    if (elapsed < MIN_FILL_TIME_MS) {
      return NextResponse.json({ success: true }); // silent drop
    }
  }

  // ── Layer 3: reCAPTCHA v3 ──────────────────────────────────────────
  if (body.recaptchaToken) {
    const { success, score } = await verifyRecaptcha(body.recaptchaToken);
    if (!success || score < 0.5) {
      console.warn(`[contact] reCAPTCHA failed — success=${success}, score=${score}`);
      return NextResponse.json(
        { error: "Spam check failed. Please try again or call us directly." },
        { status: 403 },
      );
    }
  } else if (RECAPTCHA_SECRET) {
    // reCAPTCHA configured but no token sent — suspicious
    console.warn("[contact] No reCAPTCHA token in request");
    return NextResponse.json(
      { error: "Spam check failed. Please try again or call us directly." },
      { status: 403 },
    );
  }

  // ── Validation ─────────────────────────────────────────────────────
  const errors: string[] = [];
  if (!body.first_name || body.first_name.trim().length < 2) errors.push("First name is required.");
  if (!body.last_name || body.last_name.trim().length < 2) errors.push("Last name is required.");
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push("Valid email is required.");
  if (!body.phone || body.phone.trim().length < 7) errors.push("Phone is required.");
  if (!body.service) errors.push("Select a service.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  // ── Save to Supabase ───────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/deck_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
      "Prefer": "return=minimal",
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
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Supabase insert error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  // ── Push lead to ERPNext ───────────────────────────────────────────
  if (ERPNEXT_URL && ERPNEXT_API_KEY && ERPNEXT_API_SECRET) {
    try {
      // Build a notes field with service, address, and message
      const notesParts: string[] = [];
      if (body.service) notesParts.push(`Service: ${body.service}`);
      if (body.address) notesParts.push(`Address: ${body.address}`);
      if (body.message) notesParts.push(`Message: ${body.message}`);

      const erpRes = await fetch(`${ERPNEXT_URL}/api/resource/Lead`, {
        method: "POST",
        headers: {
          "Authorization": `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: body.first_name,
          last_name: body.last_name,
          email_id: body.email,
          mobile_no: body.phone,
          city: body.city || null,
          source: "Website",
          status: "Lead",
          notes2: notesParts.join("\n") || null,
        }),
      });

      if (!erpRes.ok) {
        const err = await erpRes.text();
        console.error("[contact] ERPNext create error:", err);
        // Don't fail the request — Supabase already has the lead
      } else {
        const erpData = await erpRes.json();
        console.log("[contact] ERPNext lead created:", erpData.data?.name);
      }
    } catch (e) {
      console.error("[contact] ERPNext fetch error:", e);
      // Non-blocking — lead is safe in Supabase
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
