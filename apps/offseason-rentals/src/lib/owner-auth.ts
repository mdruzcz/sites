import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { adminClient } from "@/lib/supabase";

/**
 * Owner sessions run on Supabase Auth.
 *
 * The access and refresh tokens are held in httpOnly cookies rather than
 * localStorage, so no script on the page can read them, and every owner action
 * is executed server-side by the service-role client *after* the session has
 * been resolved to a user id. Owners therefore have no write path to
 * osr_properties at all — which is what makes the approval gate real rather
 * than advisory.
 */

const ACCESS = "osr_owner_at";
const REFRESH = "osr_owner_rt";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export interface OwnerSession {
  userId: string;
  email: string;
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/"
};

function authClient() {
  return createClient(URL_BASE, ANON, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function setOwnerCookies(accessToken: string, refreshToken: string) {
  const jar = await cookies();
  jar.set(ACCESS, accessToken, { ...cookieOptions, maxAge: 60 * 60 });
  jar.set(REFRESH, refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 30 });
}

export async function clearOwnerCookies() {
  const jar = await cookies();
  jar.delete(ACCESS);
  jar.delete(REFRESH);
}

/**
 * Resolve the current owner, refreshing the access token when it has expired.
 *
 * Supabase access tokens last an hour; a landlord filling in a long listing
 * form will blow through that, so a silent refresh here is the difference
 * between "it works" and "it logged me out while I was typing".
 */
export async function getOwnerSession(): Promise<OwnerSession | null> {
  if (!URL_BASE || !ANON) return null;
  const jar = await cookies();
  const accessToken = jar.get(ACCESS)?.value;
  const refreshToken = jar.get(REFRESH)?.value;
  if (!accessToken && !refreshToken) return null;

  const supabase = authClient();

  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (!error && data.user) {
      return { userId: data.user.id, email: data.user.email ?? "" };
    }
  }

  if (!refreshToken) return null;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session || !data.user) return null;

  await setOwnerCookies(data.session.access_token, data.session.refresh_token);
  return { userId: data.user.id, email: data.user.email ?? "" };
}

/** Sign in with email and password. Returns null on bad credentials. */
export async function signInOwner(email: string, password: string): Promise<OwnerSession | null> {
  const supabase = authClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user) return null;
  await setOwnerCookies(data.session.access_token, data.session.refresh_token);
  await ensureOwnerProfile(data.user.id, data.user.email ?? email);
  return { userId: data.user.id, email: data.user.email ?? email };
}

export interface SignUpResult {
  session: OwnerSession | null;
  needsConfirmation: boolean;
  error: string | null;
}

/** Create an account. Handles the "confirm your email" project setting. */
export async function signUpOwner(
  email: string,
  password: string,
  name: string,
  phone: string
): Promise<SignUpResult> {
  const supabase = authClient();
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://offseasonrentals.ca";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, phone },
      // If this target is not on the project's redirect allow list Supabase
      // falls back to its own site_url — the account is still confirmed, and
      // /owners/login handles that case with a message.
      emailRedirectTo: `${site}/owners/confirm`
    }
  });

  if (error) {
    return { session: null, needsConfirmation: false, error: error.message };
  }
  if (!data.user) {
    return { session: null, needsConfirmation: true, error: null };
  }

  await ensureOwnerProfile(data.user.id, email, name, phone);

  // No session means the project requires email confirmation first.
  if (!data.session) return { session: null, needsConfirmation: true, error: null };

  await setOwnerCookies(data.session.access_token, data.session.refresh_token);
  return { session: { userId: data.user.id, email }, needsConfirmation: false, error: null };
}

/** Upsert the profile row that carries the owner's contact details. */
export async function ensureOwnerProfile(
  userId: string,
  email: string,
  name?: string,
  phone?: string
): Promise<void> {
  const db = adminClient();
  if (!db) return;
  const row: Record<string, unknown> = { id: userId, email };
  if (name) row.name = name;
  if (phone) row.phone = phone;
  const { error } = await db.from("osr_owners").upsert(row, { onConflict: "id" });
  if (error) console.error("ensureOwnerProfile failed:", error.message);
}

export async function getOwnerProfile(userId: string) {
  const db = adminClient();
  if (!db) return null;
  const { data } = await db.from("osr_owners").select("*").eq("id", userId).maybeSingle();
  return data;
}

/** Send a password reset email. Always reports success — never leaks whether an account exists. */
export async function requestOwnerPasswordReset(email: string, redirectTo: string): Promise<void> {
  const supabase = authClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) console.error("Password reset failed:", error.message);
}
