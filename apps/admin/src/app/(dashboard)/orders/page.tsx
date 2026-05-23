import Link from "next/link";
import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad, formatDate } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const store = await getActiveStore();
  if (!store) return <p className="text-slate-600">Select a store first.</p>;

  const supabase = await getServerSupabase();
  let q = supabase
    .from("ecom_orders")
    .select("id, order_number, email, status, total_cad, payment_method, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false })
    .limit(50);
  if (params.status && params.status !== "all") q = q.eq("status", params.status);
  if (params.q) q = q.or(`order_number.ilike.%${params.q}%,email.ilike.%${params.q}%`);

  const { data: orders } = await q;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-slate-500">{store.name} · most recent 50</p>
      </div>

      <form className="flex items-center gap-2">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search by order # or email…"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm"
        />
        <select
          name="status"
          defaultValue={params.status ?? "all"}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm"
        >
          <option value="all">All statuses</option>
          {[
            "pending_payment",
            "paid",
            "on_hold",
            "fulfilled",
            "shipped",
            "delivered",
            "cancelled",
            "refunded"
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50">
          Filter
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">Order #</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2">Placed</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-2">
                  <Link href={`/orders/${o.id}`} className="font-medium text-blue-700 hover:underline">
                    {o.order_number}
                  </Link>
                </td>
                <td className="px-4 py-2">{o.email}</td>
                <td className="px-4 py-2 text-xs uppercase tracking-wide text-slate-600">{o.status}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{o.payment_method}</td>
                <td className="px-4 py-2 text-right">{formatCad(Number(o.total_cad))}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{formatDate(o.created_at)}</td>
              </tr>
            ))}
            {!orders?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  No orders yet. Storefront checkout lands them here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
