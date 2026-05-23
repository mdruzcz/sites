"use server";

import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";

interface PendingImage {
  id: string;
  product_id: string;
  storage_path: string;
  source_url: string | null;
  public_url: string | null;
  alt_text: string;
  ecom_products: { slug: string; store_id: string; ecom_stores: { slug: string } | { slug: string }[] } | null;
}

export interface MigrationResult {
  attempted: number;
  succeeded: number;
  failed: { id: string; reason: string }[];
  remaining: number;
}

/**
 * Migrates up to `batchSize` product images from the WordPress URL listed in
 * `source_url` into our Supabase Storage bucket `ecom-products`, then updates
 * the row's `storage_path` and `public_url` to the new Storage URL.
 *
 * Idempotent — only processes rows whose `storage_path` starts with `pending/`.
 */
export async function migrateProductImages(batchSize = 10): Promise<MigrationResult> {
  const supabase = await getServerSupabase();

  const { data: pendingRows, error: queryErr } = await supabase
    .from("ecom_product_images")
    .select(
      "id, product_id, storage_path, source_url, public_url, alt_text, ecom_products!inner(slug, store_id, ecom_stores!inner(slug))"
    )
    .like("storage_path", "pending/%")
    .order("sort_order")
    .limit(batchSize);

  if (queryErr) throw new Error(queryErr.message);

  const pending = (pendingRows ?? []) as unknown as PendingImage[];
  const result: MigrationResult = { attempted: pending.length, succeeded: 0, failed: [], remaining: 0 };

  for (const row of pending) {
    try {
      const storeMeta = Array.isArray(row.ecom_products?.ecom_stores)
        ? row.ecom_products?.ecom_stores[0]
        : row.ecom_products?.ecom_stores;
      const storeSlug = storeMeta?.slug ?? "store";
      const productSlug = row.ecom_products?.slug ?? "product";
      const url = row.source_url || row.public_url;
      if (!url) {
        result.failed.push({ id: row.id, reason: "no source_url" });
        continue;
      }

      // Fetch original
      const resp = await fetch(url, { headers: { "User-Agent": "HolidayLightsDirect-Migrator/1.0" } });
      if (!resp.ok) {
        result.failed.push({ id: row.id, reason: `HTTP ${resp.status}` });
        continue;
      }
      const contentType = resp.headers.get("content-type") ?? "image/webp";
      const buffer = Buffer.from(await resp.arrayBuffer());

      // Derive a clean filename + storage key
      const filename = url.split("/").pop()?.split("?")[0] || `${row.id}.bin`;
      const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storageKey = `${storeSlug}/${productSlug}/${safeFilename}`;

      // Upload (overwrite-friendly so re-runs are safe)
      const upload = await supabase.storage
        .from("ecom-products")
        .upload(storageKey, buffer, { contentType, upsert: true });
      if (upload.error) {
        result.failed.push({ id: row.id, reason: upload.error.message });
        continue;
      }

      // Public URL
      const { data: publicData } = supabase.storage.from("ecom-products").getPublicUrl(storageKey);
      const publicUrl = publicData.publicUrl;

      // Persist
      const { error: updErr } = await supabase
        .from("ecom_product_images")
        .update({ storage_path: storageKey, public_url: publicUrl })
        .eq("id", row.id);
      if (updErr) {
        result.failed.push({ id: row.id, reason: updErr.message });
        continue;
      }
      result.succeeded += 1;
    } catch (err) {
      result.failed.push({ id: row.id, reason: (err as Error).message });
    }
  }

  // Recount what's still pending
  const { count } = await supabase
    .from("ecom_product_images")
    .select("id", { count: "exact", head: true })
    .like("storage_path", "pending/%");
  result.remaining = count ?? 0;

  revalidatePath("/settings/migrate-images");
  revalidatePath("/products", "layout");
  return result;
}

export async function getImageMigrationStatus() {
  const supabase = await getServerSupabase();
  const [{ count: pending }, { count: migrated }, { count: total }] = await Promise.all([
    supabase.from("ecom_product_images").select("id", { count: "exact", head: true }).like("storage_path", "pending/%"),
    supabase
      .from("ecom_product_images")
      .select("id", { count: "exact", head: true })
      .not("storage_path", "like", "pending/%"),
    supabase.from("ecom_product_images").select("id", { count: "exact", head: true })
  ]);
  return { pending: pending ?? 0, migrated: migrated ?? 0, total: total ?? 0 };
}
