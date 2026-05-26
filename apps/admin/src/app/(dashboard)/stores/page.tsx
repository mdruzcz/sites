import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad, formatDate } from "@/lib/utils";

export default async function StoresPage() {
  const supabase = await getServerSupabase();
  const { data: stores } = await supabase
    .from("ecom_stores")
    .select("id, slug, name, domain, currency, free_shipping_threshold_cad, status, created_at")
    .order("name", { ascending: true });

  // Get product counts per store
  const counts = new Map<string, number>();
  if (stores?.length) {
    const { data: rows } = await supabase
      .from("ecom_products")
      .select("store_id")
      .in("store_id", stores.map((s) => s.id));
    for (const r of rows ?? []) {
      counts.set(r.store_id, (counts.get(r.store_id) ?? 0) + 1);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Stores</h1>
          <p className="text-sm text-slate-500">
            Manage every storefront powered by this admin. Each row is a separate Vercel deployment that
            pulls from the same Supabase backend.
          </p>
        </div>
        <Link
          href="/stores/new"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New store
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(stores ?? []).map((s) => (
          <Link
            key={s.id}
            href={`/stores/${s.id}`}
            className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold">{s.name}</h3>
              <span
                className={`rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wide ${
                  s.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {s.status}
              </span>
            </div>
            <p className="text-sm text-slate-500">{s.domain}</p>
            <dl className="mt-3 grid grid-cols-2 gap-y-1 text-xs text-slate-500">
              <dt>Slug</dt>
              <dd className="text-right font-mono text-slate-700">{s.slug}</dd>
              <dt>Products</dt>
              <dd className="text-right text-slate-700">{counts.get(s.id) ?? 0}</dd>
              <dt>Currency</dt>
              <dd className="text-right text-slate-700">{s.currency}</dd>
              <dt>Free shipping</dt>
              <dd className="text-right text-slate-700">
                {formatCad(s.free_shipping_threshold_cad)}+
              </dd>
              <dt>Created</dt>
              <dd className="text-right text-slate-700">{formatDate(s.created_at)}</dd>
            </dl>
          </Link>
        ))}
        {!stores?.length && (
          <div className="md:col-span-2 xl:col-span-3 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-500">No stores yet.</p>
            <Link href="/stores/new" className="mt-2 inline-block text-blue-700 hover:underline">
              Add your first store →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
