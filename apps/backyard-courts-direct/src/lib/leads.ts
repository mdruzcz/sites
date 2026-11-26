/* Server-only helpers for the quote route (edge-compatible: fetch only). */
import { site } from "./site";

export function escapeHtml(v: unknown): string {
  return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

/**
 * Fail closed in production, open in dev so forms can be tested without a widget.
 * TURNSTILE_REQUIRED=false switches the check off entirely. Use it only until this
 * hostname has been added to a Turnstile widget, then remove the variable.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  if (process.env.TURNSTILE_REQUIRED === "false") return true;
  if (process.env.NODE_ENV !== "production" && !token) return true;
  if (!token) return false;
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: site.domain }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/** Backup row in Supabase via the shared forms-submit Worker (hostname -> table). */
export async function storeLead(row: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: site.domain, row }),
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
        // Only masterdecker.com is a verified Resend sending domain.
        from: process.env.CONTACT_FROM_EMAIL || `${site.name} <noreply@masterdecker.com>`,
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
