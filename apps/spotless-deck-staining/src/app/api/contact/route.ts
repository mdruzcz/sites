import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Multipart form fields:
 *   first_name, last_name, email, phone, address, city, service,
 *   heard_about, message, website (honeypot), _loaded (page-load ms),
 *   photos[] (0–5 image files, ≤10MB each)
 *
 * 1. Honeypot "website" — silent 200 if filled.
 * 2. Time-gate — submissions under 3 s after page load are silently dropped.
 *
 * On success: uploads photos to Supabase Storage bucket `spotless-photos`,
 * inserts a row into `spotless_quote_requests`, then emails the lead
 * to service@masterdecker.com via Resend.
 */

const MIN_FILL_TIME_MS = 3_000;
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/heic"]);

type Lead = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  service: string;
  heard_about: string;
  message: string;
};

function pickString(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

async function uploadPhotoToSupabase(
  file: File,
  supabaseUrl: string,
  supabaseKey: string
): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `leads/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const url = `${supabaseUrl}/storage/v1/object/spotless-photos/${path}`;

  const buf = await file.arrayBuffer();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "x-upsert": "false",
    },
    body: buf,
  });

  if (!res.ok) {
    console.error("[contact] Supabase storage upload failed:", res.status, await res.text());
    return null;
  }
  return `${supabaseUrl}/storage/v1/object/public/spotless-photos/${path}`;
}

async function sendEmailViaResend(lead: Lead, photoUrls: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@spotlessdeckstaining.ca";
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  const subject = `Spotless Lead: ${lead.service || "Quote"} — ${fullName}${lead.city ? ` (${lead.city})` : ""}`;

  const photoHtml = photoUrls.length
    ? `<p style="margin-top:16px;"><strong>Customer-provided photos (${photoUrls.length}):</strong></p>
       <ul style="margin:8px 0 0 18px;padding:0;">
         ${photoUrls.map((u, i) => `<li><a href="${u}" style="color:#B07D62;">Photo ${i + 1}</a></li>`).join("")}
       </ul>
       <div style="margin-top:12px;">
         ${photoUrls
           .slice(0, 3)
           .map(
             (u) => `<img src="${u}" alt="Customer photo" style="max-width:240px;border-radius:8px;margin:4px;border:1px solid #ddd;"/>`
           )
           .join("")}
       </div>`
    : "";

  const html = `
    <h2 style="font-family:sans-serif;color:#332E26;">New Spotless Deck Staining Quote Request</h2>
    <table style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#4A4238;border-collapse:collapse;">
      <tr><td style="padding-right:10px;"><strong>Name:</strong></td><td>${fullName}</td></tr>
      <tr><td style="padding-right:10px;"><strong>Phone:</strong></td><td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
      <tr><td style="padding-right:10px;"><strong>Email:</strong></td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
      <tr><td style="padding-right:10px;"><strong>Address:</strong></td><td>${lead.address || "—"}</td></tr>
      <tr><td style="padding-right:10px;"><strong>City:</strong></td><td>${lead.city || "—"}</td></tr>
      <tr><td style="padding-right:10px;"><strong>Service:</strong></td><td>${lead.service}</td></tr>
      <tr><td style="padding-right:10px;"><strong>Heard via:</strong></td><td>${lead.heard_about || "—"}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#4A4238;margin-top:14px;">
      <strong>Project details:</strong><br/>${(lead.message || "None").replace(/\n/g, "<br/>")}
    </p>
    ${photoHtml}
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
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const website = pickString(form, "website");
  if (website) return NextResponse.json({ success: true });

  const loadedStr = pickString(form, "_loaded");
  if (loadedStr) {
    const loaded = Number(loadedStr);
    if (Number.isFinite(loaded) && Date.now() - loaded < MIN_FILL_TIME_MS) {
      return NextResponse.json({ success: true });
    }
  }

  const lead: Lead = {
    first_name: pickString(form, "first_name"),
    last_name: pickString(form, "last_name"),
    email: pickString(form, "email"),
    phone: pickString(form, "phone"),
    address: pickString(form, "address"),
    city: pickString(form, "city"),
    service: pickString(form, "service"),
    heard_about: pickString(form, "heard_about"),
    message: pickString(form, "message"),
  };

  const errors: string[] = [];
  if (lead.first_name.length < 2) errors.push("First name is required.");
  if (lead.last_name.length < 2) errors.push("Last name is required.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) errors.push("Valid email is required.");
  if (lead.phone.length < 7) errors.push("Phone is required.");
  if (!lead.service) errors.push("Select a service.");
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const token = pickString(form, "token");
  if (!token) {
    return NextResponse.json({ error: "Captcha required" }, { status: 400 });
  }
  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: "spotlessdeckstaining.ca" }),
    },
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const rawFiles = form.getAll("photos").filter((v): v is File => v instanceof File && v.size > 0);
  const files = rawFiles.slice(0, MAX_FILES).filter((f) => {
    if (f.size > MAX_FILE_SIZE) return false;
    if (!ALLOWED_MIME.has(f.type)) return false;
    return true;
  });

  const photoUrls: string[] = [];
  if (supabaseUrl && supabaseKey && files.length) {
    for (const f of files) {
      const url = await uploadPhotoToSupabase(f, supabaseUrl, supabaseKey);
      if (url) photoUrls.push(url);
    }
  }

  if (supabaseUrl && supabaseKey) {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/spotless_quote_requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone: lead.phone,
          address: lead.address || null,
          city: lead.city || null,
          service: lead.service,
          heard_about: lead.heard_about || null,
          message: lead.message || null,
          photo_urls: photoUrls.length ? photoUrls : null,
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

  await sendEmailViaResend(lead, photoUrls);

  return NextResponse.json({ success: true }, { status: 200 });
}
