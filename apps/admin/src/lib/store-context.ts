import { cookies } from "next/headers";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Store } from "@/lib/types";

const COOKIE_NAME = "active_store_id";

/**
 * Reads the active-store cookie. Falls back to the first store the user can see
 * if no cookie is set or the cookie points at a non-existent store.
 */
export async function getActiveStore(): Promise<Store | null> {
  const supabase = await getServerSupabase();
  const cookieStore = await cookies();
  const cookieId = cookieStore.get(COOKIE_NAME)?.value;

  if (cookieId) {
    const { data } = await supabase
      .from("ecom_stores")
      .select("*")
      .eq("id", cookieId)
      .maybeSingle();
    if (data) return data as Store;
  }

  // Fallback: first available store, ordered by name.
  const { data: first } = await supabase
    .from("ecom_stores")
    .select("*")
    .order("name", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (first as Store) ?? null;
}

export async function getAllStores(): Promise<Store[]> {
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_stores")
    .select("*")
    .order("name", { ascending: true });
  return (data as Store[]) ?? [];
}

export const ACTIVE_STORE_COOKIE = COOKIE_NAME;
