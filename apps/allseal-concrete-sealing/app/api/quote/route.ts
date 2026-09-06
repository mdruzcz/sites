export const runtime = "edge";

const HOSTNAME = "allsealconcretesealing.ca";
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body.website?.trim()) return Response.json({ ok: true });
  if (!body.name || !body.phone || !body.email || !body.service) return Response.json({ error: "Name, phone, email and service are required." }, { status: 400 });
  if (!body.token) return Response.json({ error: "Please complete the security check." }, { status: 400 });

  try {
    const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: body.token, hostname: HOSTNAME }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) return Response.json({ error: "Security check failed. Please try again." }, { status: 400 });
  } catch {
    return Response.json({ error: "Security check unavailable. Please call us." }, { status: 400 });
  }

  const payload = { name: body.name, phone: body.phone, email: body.email, address: body.address || null, service: body.service, message: body.message || null };

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: body.email,
          subject: `New Quote Request: ${body.service} - ${body.name}`,
          html: `<h2>New Quote Request — All-Seal Concrete Sealing</h2>
            <p><strong>Name:</strong> ${esc(body.name)}</p>
            <p><strong>Phone:</strong> ${esc(body.phone)}</p>
            <p><strong>Email:</strong> ${esc(body.email)}</p>
            <p><strong>Address / city:</strong> ${esc(body.address || "Not provided")}</p>
            <p><strong>Service:</strong> ${esc(body.service)}</p>
            <p><strong>Message:</strong> ${esc(body.message || "None")}</p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

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
