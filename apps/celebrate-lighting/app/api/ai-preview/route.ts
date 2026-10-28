import { attributionHtml, bytesToBase64, dataUrlToBytes, escapeHtml, formatAttribution, makeCode, NOTIFY_TO, sendEmail, storeLead, storePhoto, verifyTurnstile } from "@/lib/leads";

export const runtime = "edge";

const MAX_PHOTO_BYTES = 3_500_000;

/**
 * Free AI Home Preview request.
 *
 * 1. Verify captcha + honeypot.
 * 2. Decode the (client-compressed) photo, store it in the private
 *    `light-designs` bucket under celebratelighting/<code>/photo.jpg and
 *    mint a 60-day signed link (skipped gracefully if storage env is missing).
 * 3. Email the team with the photo attached + customer details, email the
 *    customer a confirmation, and write the lead to the CRM table.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  if (!(await verifyTurnstile(String(body.turnstileToken ?? "")))) {
    return Response.json({ error: "Captcha verification failed. Please try again or call us." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const city = String(body.city ?? "").trim();
  const colour = String(body.colour ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  if (!name || !phone || !email) return Response.json({ error: "Name, phone and email are required." }, { status: 400 });

  const photo = dataUrlToBytes(body.photo, MAX_PHOTO_BYTES);
  if (!photo) return Response.json({ error: "Please attach a photo (JPG or PNG, under 3 MB)." }, { status: 400 });

  const code = makeCode();
  const ext = photo.mime === "image/png" ? "png" : photo.mime === "image/webp" ? "webp" : "jpg";
  const photoUrl = await storePhoto(`celebratelighting/${code}/photo.${ext}`, photo.bytes, photo.mime);

  const attribution = formatAttribution(body.attribution);

  const summary = [
    `Free AI Home Preview request #${code}`,
    `City: ${city || "n/a"}`,
    `Colour preference: ${colour || "n/a"}`,
    notes ? `Notes: ${notes}` : "",
    photoUrl ? `Photo: ${photoUrl}` : "Photo: attached to notification email (storage not configured)",
    body.formId ? `Source: ${body.formId}` : "",
    attribution.text ? `\n--- Ad source ---\n${attribution.text}` : "",
  ].filter(Boolean).join("\n");

  const attachments = [{ filename: `home-photo-${code}.${ext}`, content: bytesToBase64(photo.bytes) }];

  const emailed = await sendEmail({
    to: NOTIFY_TO(),
    replyTo: email,
    subject: `AI Preview Request #${code} - ${name} (${city || "city n/a"})${attribution.adSource ? ` [${attribution.adSource}]` : ""}`,
    attachments,
    html: `
      <h2>Free AI Home Preview request</h2>
      <p>Build the preview and reply to the customer within 1 business day.</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br>
         <strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a><br>
         <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
         <strong>City:</strong> ${escapeHtml(city || "n/a")}<br>
         <strong>Colour preference:</strong> ${escapeHtml(colour || "n/a")}</p>
      ${notes ? `<p><strong>Notes:</strong><br>${escapeHtml(notes).replace(/\n/g, "<br>")}</p>` : ""}
      ${photoUrl ? `<p><strong>Photo link (60 days):</strong> <a href="${escapeHtml(photoUrl)}">${escapeHtml(photoUrl)}</a></p>` : "<p><em>Photo attached.</em></p>"}
      ${attributionHtml(attribution.text)}
      <p style="color:#888">Reference #${code}</p>
    `,
  });

  // Customer confirmation (best effort).
  sendEmail({
    to: email,
    subject: "We've got your photo — your free lighting preview is coming",
    html: `
      <p>Hi ${escapeHtml(name.split(" ")[0])},</p>
      <p>Thanks for sending a photo of your home. Our team is building your free AI preview showing permanent roofline lighting on your house, and we'll email it to you within 1 business day.</p>
      <p>Want to see it for real? We also do free on-site demos: we colour-match your soffit, mount a live sample section on your house and light it up before you spend a cent. Reply to this email or call <a href="tel:+15192666796">519-266-6796</a> to book one.</p>
      <p>Celebrate Lighting<br>631 Peel Street, Woodstock, ON<br><a href="https://celebratelighting.ca">celebratelighting.ca</a></p>
      <p style="color:#888;font-size:12px">Reference #${code}</p>
    `,
  }).catch(() => {});

  const stored = await storeLead({
    name,
    phone,
    email,
    address: city || null,
    service: "Free AI Home Preview",
    message: summary,
  });

  if (!emailed && !stored) return Response.json({ error: "Failed to send request" }, { status: 502 });
  return Response.json({ ok: true, code, emailed, stored, photoStored: Boolean(photoUrl) });
}
