import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad, formatDate } from "@/lib/utils";

export default async function DiscountsPage() {
  const store = await getActiveStore();
  if (!store) return <p className="text-slate-600">Select a store first.</p>;
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("ecom_discounts")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Discount codes</h1>
      <p className="text-sm text-slate-500">
        {store.name} · Discounts CRUD comes in the next phase. For now, view existing codes.
      </p>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2 text-right">Value</th>
              <th className="px-4 py-2 text-right">Min subtotal</th>
              <th className="px-4 py-2 text-right">Uses</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((d) => (
              <tr key={d.id} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-2 font-mono">{d.code}</td>
                <td className="px-4 py-2">{d.name}</td>
                <td className="px-4 py-2 text-xs uppercase">{d.type}</td>
                <td className="px-4 py-2 text-right">{d.type === "percent" ? `${d.value}%` : formatCad(Number(d.value))}</td>
                <td className="px-4 py-2 text-right">{d.min_subtotal_cad ? formatCad(Number(d.min_subtotal_cad)) : "—"}</td>
                <td className="px-4 py-2 text-right">{d.uses_count}{d.max_uses ? ` / ${d.max_uses}` : ""}</td>
                <td className="px-4 py-2 text-xs">{d.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{formatDate(d.created_at)}</td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-slate-500">
                  No discount codes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
