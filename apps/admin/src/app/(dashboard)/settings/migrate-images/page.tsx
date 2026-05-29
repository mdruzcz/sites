import Link from "next/link";
import { getImageMigrationStatus } from "@/lib/actions/image-migration";
import { MigrateImagesRunner } from "@/components/migrate-images-runner";

export const dynamic = "force-dynamic";

export default async function MigrateImagesPage() {
  const status = await getImageMigrationStatus();

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/settings" className="text-xs text-slate-500 hover:underline">← Settings</Link>
      <h1 className="text-2xl font-semibold tracking-tight">Migrate product images</h1>
      <p className="text-sm text-slate-600">
        Downloads every image from its original WordPress URL and re-hosts it in the
        <code className="mx-1 font-mono">ecom-products</code> Supabase Storage bucket, then updates the
        product image row. Safe to run repeatedly — already-migrated rows are skipped.
      </p>

      <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white p-4 text-center">
        <Stat label="Total" value={status.total} />
        <Stat label="Migrated" value={status.migrated} tone={status.migrated > 0 ? "ok" : "default"} />
        <Stat label="Pending" value={status.pending} tone={status.pending > 0 ? "warn" : "ok"} />
      </div>

      <MigrateImagesRunner initialPending={status.pending} />

      <details className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <summary className="cursor-pointer font-semibold">How this works</summary>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>Reads <code className="font-mono">ecom_product_images</code> rows where <code className="font-mono">storage_path</code> still starts with <code className="font-mono">pending/</code>.</li>
          <li>Fetches the WordPress URL stored in <code className="font-mono">source_url</code>.</li>
          <li>Uploads to <code className="font-mono">ecom-products/{`{store-slug}/{product-slug}/{filename}`}</code>.</li>
          <li>Updates the row&rsquo;s <code className="font-mono">storage_path</code> + <code className="font-mono">public_url</code> to the new Storage URL.</li>
          <li>Processes 10 images per batch; the page polls until <code className="font-mono">pending = 0</code>.</li>
        </ul>
      </details>
    </div>
  );
}

function Stat({ label, value, tone = "default" }: { label: string; value: number; tone?: "default" | "ok" | "warn" }) {
  const cls = tone === "ok" ? "text-emerald-700" : tone === "warn" ? "text-amber-700" : "text-slate-800";
  return (
    <div>
      <div className={`text-2xl font-semibold ${cls}`}>{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
