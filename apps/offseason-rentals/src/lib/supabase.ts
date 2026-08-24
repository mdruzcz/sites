import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** True when the public read path is configured. Guards render-time queries. */
export const supabaseConfigured = Boolean(URL && ANON);
/** True when privileged writes (admin CRUD, Storage uploads) are possible. */
export const supabaseAdminConfigured = Boolean(URL && SERVICE);

export const PHOTO_BUCKET = "osr-photos";

/** Anonymous, read-only client. Sees published rows only, via RLS. */
export function publicClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return createClient(URL, ANON, { auth: { persistSession: false } });
}

/**
 * Service-role client. Server-only — never import this into a Client
 * Component. Bypasses RLS, so every caller must have passed the admin gate.
 */
export function adminClient(): SupabaseClient | null {
  if (!supabaseAdminConfigured) return null;
  return createClient(URL, SERVICE, { auth: { persistSession: false } });
}

/** Public URL for an object already uploaded to the photo bucket. */
export function photoPublicUrl(path: string): string {
  return `${URL}/storage/v1/object/public/${PHOTO_BUCKET}/${path}`;
}
