import Link from "next/link";
import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ q?: string; status?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const store = await getActiveStore();
  if (!store) {
    return <p className="text-slate-600">Select a store to view products.</p>;
  }

  const supabase = await getServerSupabase();
  let query = supabase
    .from("ecom_products")
    .select(
      "id, name, slug, status, featured, updated_at, ecom_variants(id, price_cad, is_active)"
    )
    .eq("store_id", store.id)
    .order("name", { ascending: true });

  if (params.q) query = query.ilike("name", `%${params.q}%`);
  if (params.status && params.status !== "all") query = query.eq("status", params.status);

  const { data: products } = await query;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-slate-500">
            {products?.length ?? 0} products in {store.name}
          </p>
        </div>
        <Link
          href="/products/new"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New product
        </Link>
      </div>

      <form className="flex items-center gap-2">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search by name…"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm"
        />
        <select
          name="status"
          defaultValue={params.status ?? "all"}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button
          type="submit"
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Variants</th>
              <th className="px-4 py-2 text-right">Price range</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => {
              const variants = (p.ecom_variants ?? []) as { price_cad: number }[];
              const prices = variants.map((v) => Number(v.price_cad)).filter((n) => !Number.isNaN(n));
              const min = prices.length ? Math.min(...prices) : null;
              const max = prices.length ? Math.max(...prices) : null;
              return (
                <tr key={p.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                  <td className="px-4 py-2">
                    <Link href={`/products/${p.id}`} className="font-medium text-blue-700 hover:underline">
                      {p.name}
                    </Link>
                    {p.featured && (
                      <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-amber-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-slate-500">{p.slug}</td>
                  <td className="px-4 py-2">
                    <StatusPill status={p.status as "draft" | "active" | "archived"} />
                  </td>
                  <td className="px-4 py-2 text-right">{variants.length}</td>
                  <td className="px-4 py-2 text-right">
                    {min === null ? "—" : min === max ? formatCad(min) : `${formatCad(min)} – ${formatCad(max)}`}
                  </td>
                </tr>
              );
            })}
            {!products?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No products yet. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "draft" | "active" | "archived" }) {
  const classes = {
    active: "bg-emerald-100 text-emerald-800",
    draft: "bg-slate-100 text-slate-700",
    archived: "bg-rose-100 text-rose-800"
  }[status];
  return <span className={`rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wide ${classes}`}>{status}</span>;
}
