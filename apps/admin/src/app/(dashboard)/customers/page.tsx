import { getServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function CustomersPage() {
  const supabase = await getServerSupabase();
  const [customersRes, tiersRes] = await Promise.all([
    supabase
      .from("ecom_customers")
      .select("id, email, first_name, last_name, company_name, status, tier_id, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("ecom_pricing_tiers").select("id, name").order("sort_order")
  ]);

  const tierName = new Map<string, string>((tiersRes.data ?? []).map((t) => [t.id, t.name]));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
      <p className="text-sm text-slate-500">
        Customers are global across all stores; tier and tax-exempt status applies everywhere.
      </p>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {(customersRes.data ?? []).map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-2 font-medium">{c.email}</td>
                <td className="px-4 py-2">{[c.first_name, c.last_name].filter(Boolean).join(" ")}</td>
                <td className="px-4 py-2 text-slate-500">{c.company_name ?? "—"}</td>
                <td className="px-4 py-2 text-xs">{tierName.get(c.tier_id) ?? "—"}</td>
                <td className="px-4 py-2 text-xs uppercase tracking-wide">{c.status}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{formatDate(c.created_at)}</td>
              </tr>
            ))}
            {!customersRes.data?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
