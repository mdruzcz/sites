import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Accepts multipart/form-data:
 *   first_name, last_name, email, phone, address?, city?, service,
 *   message?, heard_about?, website? (honeypot), _loaded?, recaptchaToken?,
 *   photo? (single image, <= 8 MB)
 *
 * On success:
 *   - Uploads photo (if any) to Supabase Storage bucket "deck-lead-photos"
 *   - Inserts row in Supabase table "deck_leads"
 *   - Sends notification email to CONTACT_TO_EMAIL via Resend
 *   - Creates a CRM Lead + Note in ERPNext (best-effort)
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const ERPNEXT_URL = process.env.ERPNEXT_URL;
const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "noreply@londondeckbuilder.ca";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PHOTO_BUCKET = "deck-lead-photos";
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MIN_FILL_TIME_MS = 3_000;

type LeadFields = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string | null;
  city: string | null;
  service: string;
  message: string | null;
  heard_about: string | null;
  photo_url: string | null;
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
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });
    const data = await res.json();
    return { success: data.success === true, score: data.score ?? 0 };
  } catch (e) {
    console.error("[contact] reCAPTCHA verify error:", e);
    return { success: false, score: 0 };
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}

async function uploadPhotoToSupabase(file: File): Promise<string | null> {
  if (!SUPABASE_URL) return null;
  // Service role preferred for storage writes (bypasses RLS); fall back to anon if unset.
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!key) return null;

  const safeName = sanitizeFilename(file.name || "photo.jpg");
  const objectPath = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${safeName}`;
  const url = `${SUPABASE_URL}/storage/v1/object/${PHOTO_BUCKET}/${encodeURI(objectPath)}`;

  const arrayBuffer = await file.arrayBuffer();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: Buffer.from(arrayBuffer),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[contact] Supabase Storage upload failed:", res.status, errText);
    return null;
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${PHOTO_BUCKET}/${encodeURI(objectPath)}`;
}

async function saveLeadToSupabase(fields: LeadFields): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/deck_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ ...fields, status: "new" }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Supabase insert error:", res.status, err);
    return false;
  }
  return true;
}

function buildEmailHtml(fields: LeadFields): string {
  const row = (label: string, value: string | null) =>
    value
      ? `<tr><td style="padding:6px 10px;font-weight:600;color:#2C1810;border-bottom:1px solid #EFE7DC;">${label}</td><td style="padding:6px 10px;color:#5C3D2E;border-bottom:1px solid #EFE7DC;">${escapeHtml(value)}</td></tr>`
      : "";
  return `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#F5EFE6;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#C4623A;color:#FFF;padding:20px 24px;">
      <h1 style="margin:0;font-size:20px;">New Quote Request — London Deck Builder</h1>
    </div>
    <div style="padding:20px 24px;">
      <p style="margin:0 0 14px 0;color:#5C3D2E;">A new lead just came in from the website:</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Name", `${fields.first_name} ${fields.last_name}`.trim())}
        ${row("Email", fields.email)}
        ${row("Phone", fields.phone)}
        ${row("Service", fields.service)}
        ${row("City", fields.city)}
        ${row("Address", fields.address)}
        ${row("Heard about us", fields.heard_about)}
        ${row("Message", fields.message)}
        ${fields.photo_url
          ? `<tr><td style="padding:6px 10px;font-weight:600;color:#2C1810;">Photo</td><td style="padding:6px 10px;"><a href="${fields.photo_url}" style="color:#C4623A;">${fields.photo_url}</a></td></tr>`
          : ""}
      </table>
      ${fields.photo_url
        ? `<div style="margin-top:18px;"><img src="${fields.photo_url}" alt="Attached photo" style="max-width:100%;height:auto;border-radius:8px;border:1px solid #EFE7DC;"/></div>`
        : ""}
      <p style="margin:18px 0 0 0;color:#8B6347;font-size:12px;">Reply directly to this email to respond to the customer.</p>
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendResendEmail(fields: LeadFields): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification");
    return;
  }
  const subject = `New deck quote — ${fields.first_name} ${fields.last_name} (${fields.service})`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `London Deck Builder <${CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      reply_to: fields.email,
      subject,
      html: buildEmailHtml(fields),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Resend send error:", res.status, err);
  }
}

async function createERPNextLead(fields: LeadFields): Promise<void> {
  if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) return;
  const authHeader = `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`;
  const leadData = {
    first_name: fields.first_name,
    last_name: fields.last_name,
    email: fields.email,
    mobile_no: fields.phone,
    status: "New",
  };
  try {
    const res = await fetch(`${ERPNEXT_URL}/api/resource/CRM%20Lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: authHeader },
      body: JSON.stringify(leadData),
    });
    if (!res.ok) {
      console.error("[contact] ERPNext CRM Lead error:", res.status, await res.text());
      return;
    }
    const result = await res.json();
    const leadName = result.data?.name;

    const noteParts: string[] = [];
    if (fields.service) noteParts.push(`<b>Service:</b> ${escapeHtml(fields.service)}`);
    if (fields.address) noteParts.push(`<b>Address:</b> ${escapeHtml(fields.address)}`);
    if (fields.city) noteParts.push(`<b>City:</b> ${escapeHtml(fields.city)}`);
    if (fields.heard_about) noteParts.push(`<b>Heard about us:</b> ${escapeHtml(fields.heard_about)}`);
    if (fields.message) noteParts.push(`<b>Message:</b> ${escapeHtml(fields.message)}`);
    if (fields.photo_url) noteParts.push(`<b>Photo:</b> <a href="${fields.photo_url}">${fields.photo_url}</a>`);
    const noteContent = noteParts.join("<br>");

    if (leadName && noteContent) {
      await fetch(`${ERPNEXT_URL}/api/resource/FCRM%20Note`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: authHeader },
        body: JSON.stringify({
          title: "Website Contact Form",
          content: noteContent,
          reference_doctype: "CRM Lead",
          reference_docname: leadName,
        }),
      }).catch((e) => console.error("[contact] ERPNext FCRM Note request failed:", e));
    }
  } catch (e) {
    console.error("[contact] ERPNext request failed:", e);
  }
}

function getStr(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  // Accept multipart (form-data) OR legacy JSON
  let fd: FormData | null = null;
  let jsonBody: Record<string, any> | null = null;
  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      fd = await req.formData();
    } else {
      jsonBody = await req.json();
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const get = (k: string): string => {
    if (fd) return getStr(fd, k);
    return typeof jsonBody?.[k] === "string" ? jsonBody[k].trim() : "";
  };

  const honeypot = get("website");
  const loaded = Number(get("_loaded") || jsonBody?._loaded || 0);
  const recaptchaToken = get("recaptchaToken");

  // ── Layer 1: Honeypot ──
  if (honeypot) return NextResponse.json({ success: true });

  // ── Layer 2: Time-gate ──
  if (loaded && Date.now() - loaded < MIN_FILL_TIME_MS) {
    return NextResponse.json({ success: true });
  }

  // ── Layer 3: reCAPTCHA v3 ──
  if (recaptchaToken) {
    const { success, score } = await verifyRecaptcha(recaptchaToken);
    if (!success || score < 0.3) {
      console.warn(`[contact] reCAPTCHA failed — success=${success}, score=${score}`);
      return NextResponse.json(
        { error: "Spam check failed. Please try again or call us directly." },
        { status: 403 }
      );
    }
  } else if (RECAPTCHA_SECRET) {
    return NextResponse.json(
      { error: "Spam check failed. Please try again or call us directly." },
      { status: 403 }
    );
  }

  // ── Validation ──
  const first_name = get("first_name");
  const last_name = get("last_name");
  const email = get("email");
  const phone = get("phone");
  const address = get("address");
  const city = get("city");
  const service = get("service");
  const message = get("message");
  const heard_about = get("heard_about");

  const errors: string[] = [];
  if (first_name.length < 2) errors.push("First name is required.");
  if (last_name.length < 2) errors.push("Last name is required.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("Valid email is required.");
  if (phone.length < 7) errors.push("Phone is required.");
  if (!service) errors.push("Select a service.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  // ── Photo upload (optional) ──
  let photo_url: string | null = null;
  if (fd) {
    const photo = fd.get("photo");
    if (photo instanceof File && photo.size > 0) {
      if (photo.size > MAX_PHOTO_BYTES) {
        return NextResponse.json({ error: "Photo is too large (max 8 MB)." }, { status: 400 });
      }
      if (!photo.type.startsWith("image/")) {
        return NextResponse.json({ error: "Photo must be an image file." }, { status: 400 });
      }
      photo_url = await uploadPhotoToSupabase(photo);
      // Upload failure is non-fatal — still save the lead and notify.
    }
  }

  const fields: LeadFields = {
    first_name,
    last_name,
    email,
    phone,
    address: address || null,
    city: city || null,
    service,
    message: message || null,
    heard_about: heard_about || null,
    photo_url,
  };

  const saved = await saveLeadToSupabase(fields);
  if (!saved) {
    // Still try to send the email so we don't lose the lead.
    try { await sendResendEmail(fields); } catch (e) { console.error(e); }
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  // Fire notifications in parallel — errors are logged but don't fail the form
  await Promise.allSettled([sendResendEmail(fields), createERPNextLead(fields)]);

  return NextResponse.json({ success: true }, { status: 200 });
}
