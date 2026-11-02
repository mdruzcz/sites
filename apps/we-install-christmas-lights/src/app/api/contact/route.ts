import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { customerText, sendSms, toE164 } from "@/lib/sms";

export const runtime = "edge";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  propertyType?: string;
  message?: string;
  website?: string;
  source?: string;
  turnstileToken?: string | null;
  attribution?: Record<string, unknown>;
  address?: string;
  useStreetView?: boolean;
  photo?: { name?: string; type?: string; data?: string };
  /** "partial" = they gave contact details, then stopped at the photo step. */
  stage?: "partial";
  tag?: string;
};

// Marks where a lead came from in the email subject. Anything else is ignored.
const LEAD_TAGS = ["ESTIMATE", "REBOOK", "REFERRED", "REFER-SIGNUP"];

/** Street View of the address for the lead email. The metadata check is free, so we only pay for a real image. */
async function streetViewImage(location: string) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return null;
  const q = `location=${encodeURIComponent(location)}&source=outdoor&key=${encodeURIComponent(key)}`;
  try {
    const meta = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?${q}`, { signal: AbortSignal.timeout(3000) });
    if (((await meta.json()) as { status?: string }).status !== "OK") return null;
    const img = await fetch(`https://maps.googleapis.com/maps/api/streetview?size=640x400&fov=80&${q}`, { signal: AbortSignal.timeout(4000) });
    if (!img.ok) return null;
    const bytes = new Uint8Array(await img.arrayBuffer());
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return { filename: "street-view.jpg", content: btoa(bin), content_id: STREET_CID };
  } catch (e) {
    console.error("Street View lookup failed", e);
    return null;
  }
}

function newReferralCode() {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // matches REFERRAL_CODE in lib/site.ts
  return [...crypto.getRandomValues(new Uint8Array(6))].map((b) => alphabet[b % alphabet.length]).join("");
}

// Clients shrink photos to about 2.4 MB first; this is the base64 ceiling for that.
const MAX_PHOTO_CHARS = 3_400_000;
// Lets the lead email show the photo in the body, above the fold, not just as an attachment.
const PHOTO_CID = "home-photo";
const STREET_CID = "street-view";

const HOSTNAME = "weinstallchristmaslights.ca";
const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (data.website?.trim()) return NextResponse.json({ ok: true });

  // Landing page leads come in by phone (SMS quote) with no email address.
  if (!data.name || (!data.email && !data.phone)) {
    return NextResponse.json({ error: "Name and a phone number or email are required." }, { status: 400 });
  }
  const photo =
    data.photo?.data && /^image\/[a-z0-9.+-]+$/i.test(data.photo.type ?? "") && data.photo.data.length <= MAX_PHOTO_CHARS
      ? { filename: String(data.photo.name || "home-photo.jpg").replace(/[^\w.-]+/g, "-").slice(0, 80), content: data.photo.data, content_id: PHOTO_CID }
      : null;
  if (data.photo?.data && !photo) {
    return NextResponse.json({ error: "That photo could not be sent. Try another, or tick the Street View box." }, { status: 400 });
  }
  if (!data.turnstileToken) {
    return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
  }

  // Verify Turnstile via the shared Worker (fail closed)
  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.turnstileToken, hostname: HOSTNAME }),
    });
    const verifyBody = (await verifyRes.json()) as { success: boolean };
    if (!verifyBody.success) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }
  } catch (e) {
    console.error("Turnstile verify error", e);
    return NextResponse.json({ error: "Security check unavailable. Please call us." }, { status: 400 });
  }

  // Ad click IDs / UTM tags captured on landing, kept so leads can be matched
  // back to Google Ads clicks (offline conversion upload of booked/sold jobs).
  const attr = data.attribution && typeof data.attribution === "object" ? data.attribution : {};
  const attribution = Object.entries(attr)
    .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
    .slice(0, 12)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
    .join("\n");
  const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";

  // "Full property (Griswold)" is a home package, so an explicit Residential wins.
  const isCommercial = data.propertyType !== "Residential" && /commercial|business|property|hoa|retail|office|hotel|restaurant|dealership|municipal|church/i.test(
    `${data.propertyType ?? ""} ${data.service ?? ""}`,
  );

  const tag = LEAD_TAGS.includes(data.tag ?? "") ? data.tag! : "";
  // The referrer's code only exists in this record, so it is what we match credits against.
  const referralCode = tag === "REFER-SIGNUP" ? newReferralCode() : "";
  const message = [data.message, referralCode && `Referral code issued: ${referralCode}`].filter(Boolean).join("\n\n");

  const mapsUrl = data.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${data.address}, ${data.city ?? ""}, ON`)}` : "";
  const unfinished = data.stage === "partial";
  const photoNote = unfinished
    ? "UNFINISHED: they entered their details but stopped at the photo step. Worth a quick text or call."
    : photo ? "Home photo is in the lead email" : data.useStreetView ? "No photo: customer asked us to use Street View" : "";

  // 1) Email is the critical path. Resend can only send from masterdecker.com.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const street = data.address ? await streetViewImage(`${data.address}, ${data.city ?? ""}, ON`) : null;
      const pic = (cid: string, alt: string) => `<p><img src="cid:${cid}" alt="${alt}" style="display:block;max-width:100%;width:600px;height:auto;border-radius:8px"></p>`;
      const html = (note: string, attached: { content_id: string }[] = []) => `<h2>${isCommercial ? "New COMMERCIAL Christmas Lighting Lead" : "New Christmas Light Installation Lead"}</h2>
${attached.some((a) => a.content_id === PHOTO_CID) ? pic(PHOTO_CID, "Customer's home photo") : ""}
${attached.some((a) => a.content_id === STREET_CID) ? `<p style="margin-bottom:4px"><strong>Street View of the address</strong> (may be out of date):</p>${pic(STREET_CID, "Google Street View of the address")}` : ""}
<p><strong>Name:</strong> ${esc(data.name!)}</p>
<p><strong>Email:</strong> ${esc(data.email || "")}</p>
<p><strong>Phone:</strong> ${esc(data.phone || "")}</p>
${data.address ? `<p><strong>Address:</strong> ${esc(data.address)} (<a href="${esc(mapsUrl)}">open in Google Maps</a>, drag the pegman for Street View)</p>` : ""}
${note ? `<p><strong>Photo:</strong> ${esc(note)}</p>` : ""}
<p><strong>City:</strong> ${esc(data.city || "")}</p>
<p><strong>Property type:</strong> ${esc(data.propertyType || "")}</p>
<p><strong>Service:</strong> ${esc(data.service || "")}</p>
<p><strong>Message:</strong></p>
<pre style="font-family:inherit;white-space:pre-wrap">${esc(message)}</pre>
${attribution ? `<p><strong>Ad source:</strong></p><pre style="font-size:12px;color:#555;white-space:pre-wrap">${esc(attribution)}</pre>` : ""}
<hr>
<p style="font-size:12px;color:#888">Sent from weinstallchristmaslights.ca${data.source ? ` (${esc(data.source)})` : ""}</p>`;
      const views = street ? [street] : [];
      const send = (note: string, attachments: { filename: string; content: string; content_id: string }[]) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: `We Install Christmas Lights <${process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com"}>`,
            to: [process.env.CONTACT_TO_EMAIL || "service@masterdecker.com"],
            ...(data.email ? { reply_to: data.email } : {}),
            subject: `${unfinished ? "UNFINISHED QUOTE: " : ""}${tag ? `${tag}: ` : ""}${isCommercial ? "COMMERCIAL " : ""}Christmas Lights Lead - ${data.name}${data.city ? ` (${data.city})` : ""}${photo ? " + photo" : ""}${adSource ? ` [${adSource}]` : ""}`,
            html: html(note, attachments),
            ...(attachments.length ? { attachments } : {}),
          }),
        });
      let r = await send(photoNote, photo ? [photo, ...views] : views);
      if (!r.ok && (photo || street)) {
        // A rejected attachment must not cost us the lead: resend without it.
        console.error("Resend rejected attachment:", r.status, await r.text());
        r = await send(photo ? "Customer sent a photo but it failed to attach. Ask them to text it." : photoNote, []);
      }
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend send failed", e);
    }
  } else {
    console.error("RESEND_API_KEY not set — lead email skipped");
  }

  // 2) Store via shared forms Worker (backup)
  let stored = false;
  try {
    const insertRes = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostname: HOSTNAME,
        row: {
          name: data.name,
          // Lead tables declare email NOT NULL; phone-only landing leads store it blank.
          email: data.email || "",
          phone: data.phone || null,
          city: data.city || null,
          service: [data.propertyType, tag, data.service].filter(Boolean).join(" · ") || null,
          message: [message, data.address && `Address: ${data.address}`, photoNote, attribution && `--- Ad source ---\n${attribution}`].filter(Boolean).join("\n\n") || null,
        },
      }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
  } catch (e) {
    console.error("Forms worker insert failed", e);
  }

  if (!emailed && !stored) {
    return NextResponse.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  }

  // 3) Instant text-back. Someone who stopped at the photo step did not ask for a reply yet, so only the team hears about it.
  const customerPhone = toE164(data.phone);
  const [texted, alerted] = await Promise.all([
    unfinished
      ? Promise.resolve(false)
      : sendSms(customerPhone, customerText({ name: data.name, tag, isCommercial, code: referralCode, phone: site.phone, url: site.url, business: site.name })),
    sendSms(
      process.env.NOTIFY_SMS_TO,
      [
        `${unfinished ? "UNFINISHED lead" : tag ? `${tag} lead` : isCommercial ? "COMMERCIAL lead" : "New lead"}: ${data.name}`,
        data.phone,
        data.address || data.city,
        photo ? "Photo in email" : "",
      ].filter(Boolean).join(" | ").slice(0, 300),
    ),
  ]);

  return NextResponse.json({ ok: true, emailed, stored, texted, alerted, ...(referralCode ? { code: referralCode } : {}) });
}
