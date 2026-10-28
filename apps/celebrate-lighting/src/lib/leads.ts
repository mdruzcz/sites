/* Server-only helpers shared by the lead routes (edge-compatible: fetch only). */

const HOSTNAME = "celebratelighting.ca";

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

/**
 * Ad click IDs / UTM tags captured on landing (sent by the form as
 * `attribution`), kept so leads can be matched back to Google Ads clicks
 * for offline conversion upload of booked/sold jobs.
 */
export function formatAttribution(input: unknown): { text: string; adSource: string } {
  const attr = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const text = Object.entries(attr)
    .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && typeof v === "string" && v)
    .slice(0, 12)
    .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
    .join("\n");
  const adSource = attr.gclid || attr.gbraid || attr.wbraid ? "Google Ads" : "";
  return { text, adSource };
}

/** HTML block for the notification email; empty when there's no attribution. */
export function attributionHtml(text: string): string {
  return text
    ? `<p><strong>Ad source:</strong></p><pre style="font-size:12px;color:#555;white-space:pre-wrap">${escapeHtml(text)}</pre>`
    : "";
}

export interface LeadRow {
  name: string;
  phone: string;
  email: string;
  address: string | null;
  service: string;
  message: string | null;
}

/** Insert the lead through the shared forms Worker (it holds the DB key). */
export async function storeLead(row: LeadRow): Promise<boolean> {
  try {
    const res = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? "https://forms.masterdecker.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostname: HOSTNAME, row }),
    });
    if (!res.ok) console.error("forms worker", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("forms worker", e);
    return false;
  }
}

export interface EmailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[];
}

/** Resend via fetch. Only masterdecker.com is a verified sender, so default to it. */
export async function sendEmail(input: EmailInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.CONTACT_FROM_EMAIL && /@masterdecker\.com$/i.test(process.env.CONTACT_FROM_EMAIL)
    ? process.env.CONTACT_FROM_EMAIL
    : "Celebrate Lighting <noreply@masterdecker.com>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        reply_to: input.replyTo,
        subject: input.subject,
        html: input.html,
        attachments: input.attachments,
      }),
    });
    if (!res.ok) console.error("resend", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("resend", e);
    return false;
  }
}

export const NOTIFY_TO = () => process.env.CONTACT_TO_EMAIL ?? "service@masterdecker.com";

export function makeCode(len = 8): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

/* ---------- Supabase Storage (service role, fetch only) ---------- */

const BUCKET = "light-designs";

function storageEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function dataUrlToBytes(dataUrl: unknown, maxBytes: number): { bytes: Uint8Array; mime: string } | null {
  if (typeof dataUrl !== "string") return null;
  const m = /^data:(image\/(?:jpeg|jpg|png|webp|heic|heif));base64,(.+)$/i.exec(dataUrl);
  if (!m) return null;
  const b64 = m[2];
  const approx = (b64.length * 3) / 4;
  if (approx > maxBytes) return null;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { bytes, mime: m[1].toLowerCase() === "image/jpg" ? "image/jpeg" : m[1].toLowerCase() };
}

/** Upload a photo and return a 60-day signed URL, or null if storage isn't configured. */
export async function storePhoto(path: string, bytes: Uint8Array, mime: string): Promise<string | null> {
  const env = storageEnv();
  if (!env) return null;
  try {
    const put = await fetch(`${env.url}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: { apikey: env.key, Authorization: `Bearer ${env.key}`, "Content-Type": mime, "x-upsert": "true" },
      body: bytes as unknown as BodyInit,
    });
    if (!put.ok) {
      console.error("storage put", put.status, await put.text());
      return null;
    }
    const sign = await fetch(`${env.url}/storage/v1/object/sign/${BUCKET}/${path}`, {
      method: "POST",
      headers: { apikey: env.key, Authorization: `Bearer ${env.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 60 * 60 * 24 * 60 }),
    });
    if (!sign.ok) return null;
    const data = (await sign.json()) as { signedURL?: string };
    return data.signedURL ? `${env.url}/storage/v1${data.signedURL}` : null;
  } catch (e) {
    console.error("storage", e);
    return null;
  }
}

export function bytesToBase64(bytes: Uint8Array): string {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(s);
}
