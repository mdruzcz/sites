import { NextRequest, NextResponse } from "next/server";

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
  property_type: string;
  heard_about: string;
  message: string;
};

function pickString(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

async function uploadPhoto(file: File, supabaseUrl: string, supabaseKey: string): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `leads/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const url = `${supabaseUrl}/storage/v1/object/festive-photos/${path}`;
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
    console.error("[contact] Photo upload failed:", res.status, await res.text());
    return null;
  }
  return `${supabaseUrl}/storage/v1/object/public/festive-photos/${path}`;
}

async function sendEmail(lead: Lead, photoUrls: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@festiveholidaylighting.ca";
  if (!apiKey) return;

  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  const subject = `Festive Lead: ${lead.service || "Quote Request"} — ${fullName}`;

  const photoHtml = photoUrls.length
    ? `<p><strong>Photos (${photoUrls.length}):</strong></p><ul>${photoUrls.map((u, i) => `<li><a href="${u}">Photo ${i + 1}</a></li>`).join("")}</ul>
       <div>${photoUrls.slice(0, 3).map(u => `<img src="${u}" alt="Customer photo" style="max-width:240px;border-radius:8px;margin:4px;border:1px solid #ddd;"/>`).join("")}</div>`
    : "";

  const html = `
    <h2 style="font-family:sans-serif;color:#B22222;">New Quote Request — Festive Holiday Lighting</h2>
    <table style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#333;border-collapse:collapse;">
      <tr><td style="padding-right:12px;"><strong>Name:</strong></td><td>${fullName}</td></tr>
      <tr><td><strong>Phone:</strong></td><td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
      <tr><td><strong>Email:</strong></td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
      <tr><td><strong>Property Type:</strong></td><td>${lead.property_type || "—"}</td></tr>
      <tr><td><strong>City:</strong></td><td>${lead.city || "—"}</td></tr>
      <tr><td><strong>Service:</strong></td><td>${lead.service || "—"}</td></tr>
      <tr><td><strong>Heard via:</strong></td><td>${lead.heard_about || "—"}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;color:#333;margin-top:14px;">
      <strong>Message:</strong><br/>${(lead.message || "None").replace(/\n/g, "<br/>")}
    </p>
    ${photoHtml}
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ from: fromEmail, to: toEmail, subject, html }),
    });
    if (!res.ok) console.error("[contact] Resend error:", res.status, await res.text());
  } catch (e) {
    console.error("[contact] Email send failed:", e);
  }
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot
  if (pickString(form, "website")) return NextResponse.json({ success: true });

  // Time-gate
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
    property_type: pickString(form, "property_type"),
    heard_about: pickString(form, "heard_about"),
    message: pickString(form, "message"),
  };

  const errors: string[] = [];
  if (lead.first_name.length < 2) errors.push("First name is required.");
  if (lead.last_name.length < 2) errors.push("Last name is required.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) errors.push("Valid email is required.");
  if (lead.phone.length < 7) errors.push("Phone is required.");
  if (!lead.service) errors.push("Please select a service.");
  if (errors.length) return NextResponse.json({ error: errors.join(" ") }, { status: 400 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const rawFiles = form.getAll("photos").filter((v): v is File => v instanceof File && v.size > 0);
  const files = rawFiles.slice(0, MAX_FILES).filter(f => f.size <= MAX_FILE_SIZE && ALLOWED_MIME.has(f.type));

  const photoUrls: string[] = [];
  if (supabaseUrl && supabaseKey && files.length) {
    for (const f of files) {
      const url = await uploadPhoto(f, supabaseUrl, supabaseKey);
      if (url) photoUrls.push(url);
    }
  }

  if (supabaseUrl && supabaseKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/festive_quote_requests`, {
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
        property_type: lead.property_type || null,
        heard_about: lead.heard_about || null,
        message: lead.message || null,
        photo_urls: photoUrls.length ? photoUrls : null,
        status: "new",
      }),
    });
    if (!res.ok) console.error("[contact] Supabase insert error:", await res.text());
  }

  await sendEmail(lead, photoUrls);
  return NextResponse.json({ success: true }, { status: 200 });
}
