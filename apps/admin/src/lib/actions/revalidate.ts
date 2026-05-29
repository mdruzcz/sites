"use server";

import { getServerSupabase } from "@/lib/supabase/server";

export interface RevalidateResult {
  ok: boolean;
  status: number;
  body: string;
  target: string;
}

/**
 * POSTs to the storefront's /api/revalidate with the store's revalidate_secret,
 * asking it to refresh the given paths. Falls back to standard ISR paths if none
 * are given. Logs every call to ecom_revalidation_log for audit.
 *
 *   await revalidateStore(storeId, ['/', '/shop', '/product/foo']);
 *
 * Resolves the storefront URL from ecom_stores.domain. For local dev the storefront
 * runs on http://localhost:3101, so we fall back to that when the domain matches the
 * Holiday Lights Direct dev domain or when ?devUrl is supplied.
 */
export async function revalidateStore(
  storeId: string,
  paths: string[] = ["/", "/shop"],
  opts: { devUrl?: string } = {}
): Promise<RevalidateResult> {
  const supabase = await getServerSupabase();
  const { data: store, error } = await supabase
    .from("ecom_stores")
    .select("id, slug, domain, revalidate_secret")
    .eq("id", storeId)
    .maybeSingle();
  if (error || !store) {
    return { ok: false, status: 0, body: error?.message ?? "Store not found", target: "" };
  }

  // Resolve the target URL. Dev override lets us hit localhost:3101.
  const base =
    opts.devUrl ??
    (process.env.NODE_ENV !== "production"
      ? `http://localhost:3101`
      : `https://${store.domain}`);
  const target = `${base}/api/revalidate?secret=${encodeURIComponent(store.revalidate_secret ?? "")}`;

  let respBody = "";
  let status = 0;
  let ok = false;
  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, tags: [] })
    });
    status = res.status;
    respBody = await res.text();
    ok = res.ok;
  } catch (e) {
    respBody = (e as Error).message;
  }

  // Audit log
  await supabase.from("ecom_revalidation_log").insert({
    store_id: store.id,
    trigger_reason: "admin_refresh_button",
    paths,
    tags: [],
    success: ok,
    response_text: respBody.slice(0, 1000)
  });

  return { ok, status, body: respBody, target };
}
