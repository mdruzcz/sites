"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ACTIVE_STORE_COOKIE } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";

export async function setActiveStore(storeId: string) {
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("ecom_stores").select("id").eq("id", storeId).maybeSingle();
  if (!data) throw new Error("Store not found or not accessible");
  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_STORE_COOKIE, storeId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/"
  });
  revalidatePath("/", "layout");
}

interface StoreInput {
  slug: string;
  name: string;
  domain: string;
  support_email: string;
  free_shipping_threshold_cad: number;
  ship_from_postal_code?: string | null;
  currency?: string;
  status?: string;
}

export async function createStore(input: StoreInput) {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from("ecom_stores")
    .insert({
      slug: input.slug,
      name: input.name,
      domain: input.domain,
      support_email: input.support_email,
      free_shipping_threshold_cad: input.free_shipping_threshold_cad,
      ship_from_postal_code: input.ship_from_postal_code ?? null,
      currency: input.currency ?? "CAD",
      status: input.status ?? "active"
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/(dashboard)/stores");
  return data.id as string;
}

export async function updateStore(id: string, patch: Partial<StoreInput>) {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("ecom_stores").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/(dashboard)/stores");
  revalidatePath(`/(dashboard)/stores/${id}`);
}
