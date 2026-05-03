"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";

export async function updateNominationStatus(id: string, status: string) {
  const supabase = await getServerSupabase();
  await supabase.from("sea_nominations").update({ status }).eq("id", id);
  revalidatePath("/admin/nominations");
  revalidatePath("/admin");
}

export async function deleteNomination(id: string) {
  const supabase = await getServerSupabase();
  await supabase.from("sea_nominations").delete().eq("id", id);
  revalidatePath("/admin/nominations");
  redirect("/admin/nominations?ok=deleted");
}
