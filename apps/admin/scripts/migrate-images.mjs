#!/usr/bin/env node
// Bulk-migrate product images from their original source_url to Supabase Storage.
// Idempotent — only processes rows with storage_path starting with "pending/".
//
// Usage:
//   SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-images.mjs
//
// Or set it in apps/admin/.env.local and run from this dir:
//   node --env-file=.env.local scripts/migrate-images.mjs
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "node:buffer";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://symgxmokposzjcgikgnz.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  console.error("ERROR: set SUPABASE_SERVICE_ROLE_KEY (Project Settings → API → service_role)");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function processOne(row) {
  const url = row.source_url || row.public_url;
  if (!url) return { ok: false, reason: "no source_url" };

  const resp = await fetch(url, { headers: { "User-Agent": "HolidayLightsDirect-Migrator/1.0" } });
  if (!resp.ok) return { ok: false, reason: `HTTP ${resp.status}` };
  const contentType = resp.headers.get("content-type") ?? "image/webp";
  const buffer = Buffer.from(await resp.arrayBuffer());

  const storeSlug = row.store_slug ?? "store";
  const productSlug = row.product_slug ?? "product";
  const filename = (url.split("/").pop()?.split("?")[0] || `${row.id}.bin`).replace(/[^a-zA-Z0-9._-]/g, "-");
  const storageKey = `${storeSlug}/${productSlug}/${filename}`;

  const up = await supabase.storage.from("ecom-products").upload(storageKey, buffer, {
    contentType,
    upsert: true
  });
  if (up.error) return { ok: false, reason: up.error.message };

  const { data: pub } = supabase.storage.from("ecom-products").getPublicUrl(storageKey);
  const { error: updErr } = await supabase
    .from("ecom_product_images")
    .update({ storage_path: storageKey, public_url: pub.publicUrl })
    .eq("id", row.id);
  if (updErr) return { ok: false, reason: updErr.message };
  return { ok: true, key: storageKey };
}

async function main() {
  // Pull every pending image with denormalized store + product slugs in one query.
  const { data, error } = await supabase.rpc("exec_sql", { sql: "select 1" }).then(() => null).catch(() => null);
  // Fallback to a join query if `exec_sql` isn't available:
  const { data: rows, error: qErr } = await supabase
    .from("ecom_product_images")
    .select(
      "id, source_url, public_url, storage_path, ecom_products!inner(slug, ecom_stores!inner(slug))"
    )
    .like("storage_path", "pending/%");
  if (qErr) {
    console.error("Query failed:", qErr.message);
    process.exit(1);
  }
  const queue = (rows ?? []).map((r) => ({
    id: r.id,
    source_url: r.source_url,
    public_url: r.public_url,
    product_slug: r.ecom_products?.slug,
    store_slug: r.ecom_products?.ecom_stores?.slug
  }));
  console.log(`Pending: ${queue.length}`);

  let done = 0;
  let failed = 0;
  for (const row of queue) {
    const r = await processOne(row);
    if (r.ok) {
      done += 1;
      process.stdout.write(`  ✓ ${r.key}\n`);
    } else {
      failed += 1;
      process.stdout.write(`  ✗ ${row.id}: ${r.reason}\n`);
    }
  }
  console.log(`\nDone: ${done} succeeded, ${failed} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
