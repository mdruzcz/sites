/**
 * Admin session handling.
 *
 * One shared password, exchanged for an HMAC-signed cookie. Deliberately small:
 * this gate protects a four-property listing manager, not customer data — the
 * lead tables are never readable with the keys this app ships to the browser.
 *
 * Web Crypto only, so the same code runs in middleware, on the edge and in Node.
 */

export const SESSION_COOKIE = "osr_admin";
const TTL_SECONDS = 60 * 60 * 12; // 12 hours

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return b64url(sig);
}

/** Timing-safe string compare. Length is allowed to leak; content is not. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function secret(): string {
  // Falling back to ADMIN_PASSWORD keeps a half-configured deployment working
  // rather than minting tokens signed with an empty key.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

/** Mint a signed session value. Returns null when no secret is configured. */
export async function createSession(): Promise<string | null> {
  const s = secret();
  if (!s) return null;
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = String(exp);
  return `${payload}.${await hmac(s, payload)}`;
}

/** Verify a cookie value: signature intact and not expired. */
export async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const s = secret();
  if (!s) return false;

  const dot = value.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);

  const expected = await hmac(s, payload);
  if (!safeEqual(sig, expected)) return false;

  const exp = Number.parseInt(payload, 10);
  return Number.isFinite(exp) && exp > Math.floor(Date.now() / 1000);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: TTL_SECONDS
};

/** True when an admin password has been configured at all. */
export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD);
