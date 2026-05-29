import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const store = await getActiveStore();
  if (!store) return <p className="text-slate-600">Select a store first.</p>;
  const supabase = await getServerSupabase();
  const [{ data: cats }, { data: joins }] = await Promise.all([
    supabase
      .from("ecom_categories")
      .select("id, slug, name, sort_order, is_active")
      .eq("store_id", store.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("ecom_product_categories")
      .select("category_id, ecom_categories!inner(store_id)")
      .eq("ecom_categories.store_id", store.id)
  ]);
  const counts = new Map<string, number>();
  for (const j of joins ?? []) counts.set(j.category_id, (counts.get(j.category_id) ?? 0) + 1);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
      <p className="text-sm text-slate-500">{store.name} · {cats?.length ?? 0} categories</p>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2 text-right">Products</th>
              <th className="px-4 py-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {(cats ?? []).map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-2 font-medium">{c.name}</td>
                <td className="px-4 py-2 text-slate-500">{c.slug}</td>
                <td className="px-4 py-2 text-right">{counts.get(c.id) ?? 0}</td>
                <td className="px-4 py-2 text-xs">{c.is_active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
