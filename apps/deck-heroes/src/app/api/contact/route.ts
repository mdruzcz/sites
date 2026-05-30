import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Accepts JSON: { first_name, last_name, email, phone, address?, city?,
 *                 service, message?, website?, _loaded?, token }
 *
 * Spam protection (3 layers):
 * 1. Honeypot — hidden "website" field; if filled, silently 200 to waste bot time.
 * 2. Time-gate — "_loaded" is a timestamp (ms) set when the page renders.
 *    Submissions < 3 s after load are almost certainly bots.
 * 3. Cloudflare Turnstile via shared Worker at turnstile.masterdecker.com.
 *
 * On success: saves to Supabase AND creates a CRM Lead in ERPNext.
 */

const ERPNEXT_URL = process.env.ERPNEXT_URL;           // https://masterdecker.app
const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;
const MIN_FILL_TIME_MS = 3_000; // 3 seconds

type ContactBody = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  service?: string;
  message?: string;
  website?: string;      // honeypot
  _loaded?: number;       // page-load timestamp
  token?: string;         // Turnstile token
};

async function verifyTurnstile(token: string): Promise<boolean> {
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: "deckheroes.ca" }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (e) {
    console.error("[contact] Turnstile verify error:", e);
    return false;
  }
}

async function createERPNextLead(body: ContactBody): Promise<void> {
  if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) {
    console.warn("[contact] ERPNext env vars not set — skipping lead creation");
    return;
  }

  const authHeader = `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`;

  // Step 1: Create the CRM Lead
  const leadData = {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    mobile_no: body.phone,
    status: "New",
  };

  try {
    const res = await fetch(`${ERPNEXT_URL}/api/resource/CRM%20Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(leadData),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[contact] ERPNext CRM Lead error:", res.status, errText);
      return;
    }

    const result = await res.json();
    const leadName = result.data?.name;
    console.log("[contact] ERPNext CRM Lead created:", leadName);

    // Step 2: Add an FCRM Note with extra details (shows in activity tab)
    const noteParts: string[] = [];
    if (body.service) noteParts.push(`<b>Service:</b> ${body.service}`);
    if (body.address) noteParts.push(`<b>Address:</b> ${body.address}`);
    if (body.city) noteParts.push(`<b>City:</b> ${body.city}`);
    if (body.message) noteParts.push(`<b>Message:</b> ${body.message}`);
    const noteContent = noteParts.join("<br>");

    if (leadName && noteContent) {
      try {
        const noteRes = await fetch(`${ERPNEXT_URL}/api/resource/FCRM%20Note`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader,
          },
          body: JSON.stringify({
            title: "Website Contact Form",
            content: noteContent,
            reference_doctype: "CRM Lead",
            reference_docname: leadName,
          }),
        });

        if (!noteRes.ok) {
          const errText = await noteRes.text();
          console.error("[contact] ERPNext FCRM Note error:", noteRes.status, errText);
        } else {
          console.log("[contact] ERPNext FCRM Note added to", leadName);
        }
      } catch (e) {
        console.error("[contact] ERPNext FCRM Note request failed:", e);
      }
    }
  } catch (e) {
    console.error("[contact] ERPNext request failed:", e);
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

  // ── Layer 3: Cloudflare Turnstile (via shared Worker) ──────────────
  if (!body.token) {
    return NextResponse.json(
      { error: "Captcha required. Please refresh and try again." },
      { status: 400 }
    );
  }
  const captchaOk = await verifyTurnstile(body.token);
  if (!captchaOk) {
    return NextResponse.json(
      { error: "Captcha verification failed. Please try again or call us directly." },
      { status: 403 }
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

  // ── Save the lead via the shared forms Worker ──────────────────────
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const response = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hostname: "deckheroes.ca",
      row: {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        address: body.address || null,
        city: body.city || null,
        service: body.service,
        message: body.message || null,
        status: "new",
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Forms worker insert error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  // ── Create ERPNext Lead (awaited, but error-tolerant — won't fail the form) ──
  try {
    await createERPNextLead(body);
  } catch (e) {
    console.error("[contact] ERPNext lead creation failed:", e);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
