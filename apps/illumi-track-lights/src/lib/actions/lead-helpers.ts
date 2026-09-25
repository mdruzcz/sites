/**
 * Shared plumbing for the lead-capture server actions.
 *
 * Deliberately NOT a "use server" module — that would turn every export into a
 * callable server action. It is only imported from "use server" files.
 *
 * Why these exist: Next.js strips thrown Server Action error messages in
 * production builds, so an action that reports failures by throwing shows the
 * visitor "An error occurred in the Server Components render ... Digest: <n>"
 * for every rejection. Actions return a LeadResult instead and never throw for
 * anything a visitor can fix.
 */

export type LeadResult = { ok: true } | { ok: false; error: string };

export const SITE_HOSTNAME = "illumitracklights.ca";
export const BRAND = "Illumi Track Lights";
export const HELP = "Please email service@masterdecker.com and we'll pick it up right away.";

/** Returns null when the request may proceed, or the message to show the visitor. */
export async function checkCaptcha(token: string | null, verb = "send"): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey || siteKey.startsWith("1x000")) return null; // captcha not configured here
  if (!token) {
    return `The spam check above the button hasn't finished yet. Give it a moment and ${verb} again, or email service@masterdecker.com and we'll pick it up right away.`;
  }
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, hostname: SITE_HOSTNAME })
    });
    const verify = (await res.json()) as { success: boolean; errors?: string[] };
    if (!verify.success) {
      console.error("turnstile verify rejected:", verify.errors);
      return "The spam check expired. Please reload the page and try again.";
    }
  } catch (err) {
    console.error("turnstile verify unreachable:", err);
    return `We couldn't reach the spam check. ${HELP}`;
  }
  return null;
}

export interface LeadEmail {
  subject: string;
  replyTo: string;
  lines: (string | null)[];
}

/**
 * Best-effort Resend notification. Only masterdecker.com is a verified sender,
 * so a CONTACT_FROM_EMAIL of noreply@<this-site>.ca 403s silently — force the
 * verified domain rather than trusting the env var.
 */
export async function sendLeadEmail(mail: LeadEmail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("resend send skipped: RESEND_API_KEY is not set");
    return false;
  }
  const configuredFrom = process.env.CONTACT_FROM_EMAIL;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: configuredFrom?.endsWith("@masterdecker.com") ? configuredFrom : "noreply@masterdecker.com",
        to: process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com",
        reply_to: mail.replyTo,
        subject: `${BRAND} — ${mail.subject}`,
        text: [...mail.lines.filter((l): l is string => l !== null), "", `— ${SITE_HOSTNAME}`].join("\n")
      })
    });
    if (!res.ok) {
      console.error("resend send failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend send threw:", err);
    return false;
  }
}
