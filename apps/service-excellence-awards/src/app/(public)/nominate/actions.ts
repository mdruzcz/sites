"use server";

import { getServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const HOSTNAME = "serviceexcellenceawards.ca";
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitNomination(formData: FormData) {
  const f = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  // Honeypot: bots fill every field. Pretend it worked.
  if (f("company_url")) redirect("/nominate?ok=1");

  const business_name = f("business_name");
  if (!business_name) {
    redirect("/nominate?error=missing_business");
  }

  // Turnstile via the shared Worker. Enforced only when the widget is configured
  // for this deployment, so a missing env var can never block every nomination.
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    const token = f("cf-turnstile-response");
    if (!token) redirect("/nominate?error=captcha");
    try {
      const vr = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, hostname: HOSTNAME }),
      });
      const vj = (await vr.json()) as { success: boolean };
      if (!vj.success) redirect("/nominate?error=captcha");
    } catch {
      redirect("/nominate?error=captcha");
    }
  }

  const supabase = await getServerSupabase();

  // Map slug → id for city / category if provided
  let city_id: string | null = null;
  let category_id: string | null = null;
  const citySlug = f("city");
  const catSlug = f("category");
  if (citySlug) {
    const { data } = await supabase.from("sea_cities").select("id").eq("slug", citySlug).maybeSingle();
    city_id = data?.id ?? null;
  }
  if (catSlug) {
    const { data } = await supabase.from("sea_categories").select("id").eq("slug", catSlug).maybeSingle();
    category_id = data?.id ?? null;
  }

  const row = {
    business_name,
    contact_name: f("contact_name") || null,
    contact_email: f("contact_email") || null,
    contact_phone: f("contact_phone") || null,
    website: f("website") || null,
    city_id,
    category_id,
    city_text: city_id ? null : f("city") || null,
    category_text: category_id ? null : f("category") || null,
    message: f("message") || null,
    source: "public_form",
  };

  const { error } = await supabase.from("sea_nominations").insert(row);
  if (error) {
    redirect(`/nominate?error=${encodeURIComponent(error.message)}`);
  }

  // Notify Matt. Resend can only send from masterdecker.com.
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: row.contact_email || undefined,
          subject: `New award nomination: ${business_name}${citySlug ? ` (${citySlug})` : ""}`,
          html: `<h2>New Service Excellence Awards nomination</h2>
            <p><strong>Business:</strong> ${esc(business_name)}</p>
            <p><strong>City:</strong> ${esc(citySlug || "-")} &nbsp; <strong>Category:</strong> ${esc(catSlug || "-")}</p>
            <p><strong>Website:</strong> ${esc(row.website || "-")}</p>
            <p><strong>Contact:</strong> ${esc(row.contact_name || "-")} · ${esc(row.contact_email || "-")} · ${esc(row.contact_phone || "-")}</p>
            <p><strong>Message:</strong><br>${esc(row.message || "-")}</p>
            <p style="font-size:12px;color:#888">Review at https://serviceexcellenceawards.ca/admin/nominations</p>`,
        }),
      });
      if (!r.ok) console.error("[nominate] Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("[nominate] Resend fetch failed:", e);
    }
  }

  redirect("/nominate?ok=1");
}
