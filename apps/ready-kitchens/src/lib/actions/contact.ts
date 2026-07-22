"use server";

import { Resend } from "resend";
import { createServerSupabase } from "@/lib/supabase";
import { SITE } from "@/lib/utils";

const MAX_IMAGES = 5;
const MAX_BYTES = 10 * 1024 * 1024; // 10MB each
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"]);
const BUCKET = "readykitchens-contact-uploads";

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "").trim();

  if (honeypot) return { ok: true, id: "spam" }; // silently drop bots
  if (!name || !email || !message) {
    return { ok: false, error: "Name, email and message are required." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "Message is too long (max 4000 characters)." };
  }

  const supabase = createServerSupabase();
  if (!supabase) return { ok: false, error: "Server misconfigured: Supabase env vars missing" };
  const files = formData.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_IMAGES) {
    return { ok: false, error: `You can attach up to ${MAX_IMAGES} images.` };
  }
  for (const f of files) {
    if (!ALLOWED_MIME.has(f.type)) {
      return { ok: false, error: `${f.name} is not a supported image type.` };
    }
    if (f.size > MAX_BYTES) {
      return { ok: false, error: `${f.name} is too large (max 10MB).` };
    }
  }

  const attachmentUrls: string[] = [];
  const datePath = new Date().toISOString().slice(0, 10);
  for (const file of files) {
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const safeBase = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9-_]/gi, "_")
      .slice(0, 40);
    const path = `${datePath}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeBase}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });
    if (upErr) {
      console.error("Upload failed", upErr);
      return { ok: false, error: `Image upload failed: ${upErr.message}` };
    }
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    attachmentUrls.push(pub.publicUrl);
  }

  const { data: inserted, error: insErr } = await supabase
    .from("readykitchens_contact_messages")
    .insert({
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      subject: subject || null,
      message,
      attachment_urls: attachmentUrls,
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    console.error("Insert failed", insErr);
    return { ok: false, error: "Could not save your message — please try again." };
  }

  // Send email
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com";
      const to = process.env.CONTACT_TO_EMAIL || SITE.internalEmail;
      const attachmentsHtml = attachmentUrls.length
        ? `<p><strong>Attachments (${attachmentUrls.length}):</strong></p>
           <ul>${attachmentUrls
             .map((u) => `<li><a href="${u}" target="_blank" rel="noopener">${u}</a></li>`)
             .join("")}</ul>`
        : "";
      const html = `
        <div style="font-family:system-ui,sans-serif;color:#14181f;max-width:640px;">
          <h2 style="margin:0 0 16px 0;">New contact message — ${SITE.name}</h2>
          <p><strong>${name}</strong> &lt;${email}&gt;${phone ? ` · ${phone}` : ""}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p style="white-space:pre-wrap;border-left:3px solid #c4632d;padding:8px 14px;background:#f7e8dc;">${message.replace(/</g, "&lt;")}</p>
          ${attachmentsHtml}
          <p style="margin-top:24px;font-size:12px;color:#666;">Message ID: ${inserted.id}</p>
        </div>`;
      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Contact: ${subject || name} — ${SITE.name}`,
        html,
      });
    } catch (e) {
      console.error("Resend failed", e);
    }
  }

  return { ok: true, id: inserted.id };
}
