import 'server-only';
import { createClient } from '@supabase/supabase-js';

/** Service-role client for order writes. Server only — bypasses RLS. */
export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export const STORE_SLUG = 'forever-lights';

/** The Forever Lights row in ecom_stores (orders hang off it). */
export async function getStoreId(): Promise<string | null> {
  const { data } = await getServiceSupabase().from('ecom_stores').select('id').eq('slug', STORE_SLUG).maybeSingle();
  return (data?.id as string | undefined) ?? null;
}
