"use server";

import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";

export async function decideApplication(id: string, status: "approved" | "rejected", reason?: string) {
  const supabase = await getServerSupabase();
  const { data: app, error: fetchErr } = await supabase
    .from("ecom_b2b_applications")
    .select("id, requested_tier_id, customer_id, email, company_name")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !app) throw new Error(fetchErr?.message ?? "Application not found");

  const { error } = await supabase
    .from("ecom_b2b_applications")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      rejection_reason: status === "rejected" ? reason ?? null : null
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  // If approved, move the customer to the requested tier.
  if (status === "approved") {
    if (app.customer_id) {
      const { error: updErr } = await supabase
        .from("ecom_customers")
        .update({ tier_id: app.requested_tier_id, status: "approved" })
        .eq("id", app.customer_id);
      if (updErr) throw new Error(updErr.message);
    } else {
      // create a stub customer record for this application
      const { error: insErr } = await supabase
        .from("ecom_customers")
        .insert({
          email: app.email,
          company_name: app.company_name,
          tier_id: app.requested_tier_id,
          status: "approved"
        });
      if (insErr) throw new Error(insErr.message);
    }
  }

  revalidatePath("/(dashboard)/applications");
}
