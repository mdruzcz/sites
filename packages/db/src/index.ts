import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The site_id this app instance represents. All queries from this app should be
 * scoped to this id; Supabase RLS policies should additionally enforce the scope.
 */
export const SITE_ID = process.env.SITE_ID;

if (!SITE_ID && typeof window === "undefined") {
  // Only warn server-side; client bundle won't have process.env access anyway.
  console.warn("[@sites/db] SITE_ID is not set. Multi-tenant queries will fail.");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[@sites/db] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });
}

/**
 * Convenience wrapper that auto-applies a `site_id` filter. Use this for any
 * read where you want to be sure you only return rows for the current site.
 */
export function siteQuery<T = unknown>(table: string) {
  if (!SITE_ID) throw new Error("[@sites/db] SITE_ID required for siteQuery.");
  return getSupabaseClient().from(table).select("*").eq("site_id", SITE_ID) as unknown as Promise<{ data: T[] | null; error: unknown }>;
}
