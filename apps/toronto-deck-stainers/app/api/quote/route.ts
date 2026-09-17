export const runtime = "edge";

const HOSTNAME = "torontodeckstainers.ca";
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (body.website?.trim()) return Response.json({ ok: true });

  if (!body.name || !body.phone || !body.email || !body.service)
    return Response.json({ error: "All fields required." }, { status: 400 });
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
          reply_to: body.email,
          subject: `New Estimate Request: ${body.service} - ${body.name}`,
          html: `
            <h2>New Estimate Request — Toronto Deck Stainers</h2>
            <p><strong>Name:</strong> ${esc(body.name)}</p>
            <p><strong>Phone:</strong> ${esc(body.phone)}</p>
            <p><strong>Email:</strong> ${esc(body.email)}</p>
            <p><strong>Address:</strong> ${esc(body.address || "Not provided")}</p>
            <p><strong>Service:</strong> ${esc(body.service)}</p>
            <p><strong>Message:</strong> ${esc(body.message || "None")}</p>
          `,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

  // The shared `deck_leads` table (deckheroes / londondeckbuilder / torontodeckstainers)
  // has first_name + last_name, not `name` — sending `name` made PostgREST reject every row.
  const [firstName, ...rest] = body.name.trim().split(/\s+/);
  const payload = {
    first_name: firstName,
    last_name: rest.join(" ") || null,
    phone: body.phone,
    email: body.email,
    address: body.address || null,
    service: body.service,
    message: body.message || null,
    status: "new",
  };

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
