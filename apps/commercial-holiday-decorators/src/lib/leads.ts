/* Server-only helpers for the quote route (edge-compatible: fetch only). */

export const HOSTNAME = "commercialholidaydecorators.ca";

export function escapeHtml(v: unknown): string {
  return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

/** Fail closed in production, open in dev so forms can be tested without a widget. */
export async function verifyTurnstile(token: string): Promise<boolean> {
  if (process.env.NODE_ENV !== "production" && !token) return true;
  if (!token) return false;
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: HOSTNAME }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Supabase row via the shared forms-submit Worker (hostname -> chd_quote_requests). */
export async function storeLead(row: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row }),
    });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return Boolean(out.ok);
  } catch {
    return false;
  }
}

export const NOTIFY_TO = () => process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";

export async function sendEmail(opts: { to: string; replyTo?: string; subject: string; html: string }): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Commercial Holiday Decorators <noreply@masterdecker.com>",
        to: opts.to,
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
