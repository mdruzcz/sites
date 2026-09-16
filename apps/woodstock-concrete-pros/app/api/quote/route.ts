export const runtime = "edge";

const HOSTNAME = "woodstockconcretepros.ca";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_IMAGES = 5;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot check
  const honeypot = formData.get("website") as string | null;
  if (honeypot?.trim()) return Response.json({ ok: true });

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const address = (formData.get("address") as string) || null;
  const city = (formData.get("city") as string) || null;
  const message = (formData.get("message") as string) || null;
  const referralSource = (formData.get("referral_source") as string) || null;

  if (!name || !phone || !email || !service)
    return Response.json({ error: "All fields required." }, { status: 400 });

  const token = formData.get("token") as string | null;
  if (!token) return Response.json({ error: "Please complete the security check." }, { status: 400 });

  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: HOSTNAME }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) return Response.json({ error: "Security check failed. Please try again." }, { status: 400 });
  } catch {
    return Response.json({ error: "Security check unavailable. Please call us." }, { status: 400 });
  }

  // Process uploaded images — store as base64 data URIs
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls: string[] = [];
  for (const file of imageFiles.slice(0, MAX_IMAGES)) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith("image/")) continue;
    const buffer = await file.arrayBuffer();
    const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
    imageUrls.push(`data:${file.type};base64,${base64}`);
  }

  const payload = {
    name,
    phone,
    email,
    address,
    city,
    service,
    message,
    referral_source: referralSource,
    image_urls: imageUrls.length > 0 ? imageUrls : null,
  };

  const imageHtml =
    imageUrls.length > 0
      ? `<p><strong>Photos:</strong> ${imageUrls.length} image(s) attached to this quote request (view in Supabase dashboard)</p>`
      : "";

  // Email is the critical path; the DB row is the backup.
  // Resend can only send from masterdecker.com — any other from-address 403s.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: email,
          subject: `Quote Request from ${name} - Woodstock Concrete Pros`,
          html: `
            <h2>New Quote Request — Woodstock Concrete Pros</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Phone:</strong> ${esc(phone)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>City:</strong> ${esc(city || "Not provided")}</p>
            <p><strong>Address:</strong> ${esc(address || "Not provided")}</p>
            <p><strong>Service:</strong> ${esc(service)}</p>
            <p><strong>Message:</strong> ${esc(message || "None")}</p>
            <p><strong>How they heard about us:</strong> ${esc(referralSource || "Not provided")}</p>
            ${imageHtml}
          `,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

  // Store via shared forms Worker
  let stored = false;
  try {
    const insertRes = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row: payload }),
    });
    stored = insertRes.ok;
    if (!insertRes.ok) console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
  } catch (e) {
    console.error("Forms worker fetch failed:", e);
  }

  if (!emailed && !stored) return Response.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  return Response.json({ ok: true, emailed, stored });
}
