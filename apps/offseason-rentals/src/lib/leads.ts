/**
 * Shared plumbing for the two public forms.
 *
 * Order of operations matters. Email is the critical path — if the notification
 * lands, the lead is not lost even when the database write fails. The row is a
 * backup and a CRM feed, so a failed insert is logged loudly but never fails
 * the request on its own.
 */

export const HOSTNAME = "offseasonrentals.ca";

const TO = process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";
// masterdecker.com is the only Resend-verified sending domain; a
// noreply@offseasonrentals.ca sender would 403 silently.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@masterdecker.com";

export function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

/**
 * Captcha check. Fails CLOSED: once a site key is configured a valid token is
 * required. The `if (token) { verify }` shape is a spam hole — any caller that
 * simply omits the field skips the check entirely.
 *
 * Returns null when the request may proceed, or a Response to return as-is.
 */
export async function verifyTurnstile(token: string | undefined): Promise<Response | null> {
  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return null;

  if (!token) {
    return Response.json({ error: "Please complete the captcha." }, { status: 400 });
  }
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: HOSTNAME })
    });
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) {
      return Response.json({ error: "Captcha verification failed." }, { status: 400 });
    }
  } catch (err) {
    console.error("Turnstile verify unreachable:", err);
    return Response.json(
      { error: "Could not verify the captcha. Please try again." },
      { status: 502 }
    );
  }
  return null;
}

/** Send the notification email. Returns true only on a confirmed 2xx. */
export async function sendLeadEmail(
  subject: string,
  heading: string,
  lines: [string, string][],
  replyTo?: string
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing — cannot notify.");
    return false;
  }
  const rows = lines
    .map(
      ([k, v]) =>
        `<tr><td style="color:#717171;vertical-align:top;padding:6px 14px 6px 0"><strong>${esc(
          k
        )}</strong></td><td style="padding:6px 0">${esc(String(v)).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: replyTo,
        subject,
        html: `<h2 style="font:600 18px/1.3 system-ui,sans-serif;color:#222">${esc(
          heading
        )}</h2><table cellpadding="0" cellspacing="0" style="font:14px/1.55 system-ui,sans-serif;color:#222;border-collapse:collapse">${rows}</table>`
      })
    });
    if (res.ok) return true;
    console.error("Resend error:", res.status, await res.text());
    return false;
  } catch (err) {
    console.error("Resend unreachable:", err);
    return false;
  }
}

/**
 * Insert the backup row. Uses the anon publishable key against an
 * INSERT-only RLS policy.
 *
 * The response is checked explicitly — a rotated or malformed key returns an
 * error object rather than throwing, and treating that as success is how a
 * whole fleet of sites once silently dropped every lead.
 */
export async function storeLead(table: string, row: Record<string, unknown>): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("Supabase env missing — lead row not stored.");
    return false;
  }
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await db.from(table).insert(row);
    if (error) {
      console.error(`Supabase insert into ${table} failed:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Supabase unreachable for ${table}:`, err);
    return false;
  }
}

/** Final response shape. 502 only when BOTH halves failed. */
export function leadResponse(emailed: boolean, stored: boolean) {
  if (!emailed && !stored) {
    return Response.json(
      { error: "We could not submit that. Please call us instead." },
      { status: 502 }
    );
  }
  return Response.json({ ok: true, emailed, stored });
}
