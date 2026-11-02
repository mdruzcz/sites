import { NextResponse } from "next/server";

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

function newReferralCode() {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // matches REFERRAL_CODE in lib/site.ts
  return [...crypto.getRandomValues(new Uint8Array(6))].map((b) => alphabet[b % alphabet.length]).join("");
}

// Clients shrink photos to about 2.4 MB first; this is the base64 ceiling for that.
const MAX_PHOTO_CHARS = 3_400_000;

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
      ? { filename: String(data.photo.name || "home-photo.jpg").replace(/[^\w.-]+/g, "-").slice(0, 80), content: data.photo.data }
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
    : photo ? "Home photo attached" : data.useStreetView ? "No photo: customer asked us to use Street View" : "";

  // 1) Email is the critical path. Resend can only send from masterdecker.com.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const html = (note: string) => `<h2>${isCommercial ? "New COMMERCIAL Christmas Lighting Lead" : "New Christmas Light Installation Lead"}</h2>
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
      const send = (note: string, attachments?: { filename: string; content: string }[]) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: `We Install Christmas Lights <${process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com"}>`,
            to: [process.env.CONTACT_TO_EMAIL || "service@masterdecker.com"],
            ...(data.email ? { reply_to: data.email } : {}),
            subject: `${unfinished ? "UNFINISHED QUOTE: " : ""}${tag ? `${tag}: ` : ""}${isCommercial ? "COMMERCIAL " : ""}Christmas Lights Lead - ${data.name}${data.city ? ` (${data.city})` : ""}${photo ? " + photo" : ""}${adSource ? ` [${adSource}]` : ""}`,
            html: html(note),
            ...(attachments ? { attachments } : {}),
          }),
        });
      let r = await send(photoNote, photo ? [photo] : undefined);
      if (!r.ok && photo) {
        // A rejected attachment must not cost us the lead: resend without it.
        console.error("Resend rejected photo:", r.status, await r.text());
        r = await send("Customer sent a photo but it failed to attach. Ask them to text it.");
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
  return NextResponse.json({ ok: true, emailed, stored, ...(referralCode ? { code: referralCode } : {}) });
}
