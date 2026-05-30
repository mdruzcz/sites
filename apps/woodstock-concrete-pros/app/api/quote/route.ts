export const runtime = "edge";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_IMAGES = 5;

export async function POST(req: Request) {
  const formData = await req.formData();

  // Honeypot check
  const honeypot = formData.get("website") as string;
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
  if (!token) {
    return Response.json({ error: "Captcha required" }, { status: 400 });
  }
  const verifyRes = await fetch(
    process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: "woodstockconcretepros.ca" }),
    },
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) {
    return Response.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  // Process uploaded images — store as base64 data URIs
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  for (const file of imageFiles.slice(0, MAX_IMAGES)) {
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith("image/")) continue;
    const buffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
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

  // Store via shared forms Worker
  const formsEndpoint = process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com";
  const insertRes = await fetch(formsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hostname: "woodstockconcretepros.ca", row: payload }),
  });
  if (!insertRes.ok) {
    console.error("Forms worker insert error:", insertRes.status, await insertRes.text());
    return Response.json({ error: "Failed to save request" }, { status: 502 });
  }

  // Build image attachment list for email
  const imageHtml = imageUrls.length > 0
    ? `<p><strong>Photos:</strong> ${imageUrls.length} image(s) attached to this quote request (view in Supabase dashboard)</p>`
    : "";

  // Send email notification via Resend
  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "noreply@woodstockconcretepros.ca",
        to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
        subject: `Quote Request from ${name} - Woodstock Concrete Pros`,
        html: `
          <h2>New Quote Request — Woodstock Concrete Pros</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>City:</strong> ${city || "Not provided"}</p>
          <p><strong>Address:</strong> ${address || "Not provided"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
          <p><strong>How they heard about us:</strong> ${referralSource || "Not provided"}</p>
          ${imageHtml}
        `,
      }),
    });
  }

  return Response.json({ ok: true });
}
