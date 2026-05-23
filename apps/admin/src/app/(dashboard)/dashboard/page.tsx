import Link from "next/link";
import { StatCard } from "@/components/ui/stat-card";
import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/utils";

export default async function DashboardPage() {
  const store = await getActiveStore();
  if (!store) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-base font-semibold">No stores yet</h2>
        <p className="mt-1 text-sm text-amber-900">
          <Link href="/stores/new" className="text-blue-700 underline">
            Create your first store
          </Link>{" "}
          to begin managing products and orders.
        </p>
      </div>
    );
  }

  const supabase = await getServerSupabase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const [productCount, variantCount, ordersToday, lowStock, pendingApps] = await Promise.all([
    supabase
      .from("ecom_products")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id),
    supabase
      .from("ecom_variants")
      .select("id, ecom_products!inner(store_id)", { count: "exact", head: true })
      .eq("ecom_products.store_id", store.id),
    supabase
      .from("ecom_orders")
      .select("total_cad")
      .eq("store_id", store.id)
      .gte("created_at", todayIso),
    supabase
      .from("ecom_inventory")
      .select("variant_id, on_hand, low_stock_threshold, ecom_variants!inner(product_id, ecom_products!inner(store_id))")
      .eq("ecom_variants.ecom_products.store_id", store.id)
      .filter("on_hand", "lt", "low_stock_threshold")
      .limit(10),
    supabase
      .from("ecom_b2b_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
  ]);

  const ordersTodayCount = ordersToday.data?.length ?? 0;
  const revenueToday = (ordersToday.data ?? []).reduce(
    (sum, o) => sum + Number(o.total_cad ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products" value={productCount.count ?? 0} hint={`${variantCount.count ?? 0} variants`} />
        <StatCard
          label="Orders today"
          value={ordersTodayCount}
          hint={formatCad(revenueToday) + " revenue"}
          tone={ordersTodayCount > 0 ? "success" : "default"}
        />
        <StatCard
          label="Low-stock variants"
          value={lowStock.data?.length ?? 0}
          tone={(lowStock.data?.length ?? 0) > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Pending B2B applications"
          value={pendingApps.count ?? 0}
          tone={(pendingApps.count ?? 0) > 0 ? "warning" : "default"}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold">Quick actions</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/products/new" className="text-blue-700 hover:underline">
                + Add a product
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="text-blue-700 hover:underline">
                Adjust inventory
              </Link>
            </li>
            <li>
              <Link href="/applications" className="text-blue-700 hover:underline">
                Review B2B applications
              </Link>
            </li>
            <li>
              <Link href="/stores" className="text-blue-700 hover:underline">
                Manage stores ({(await supabase.from("ecom_stores").select("id", { count: "exact", head: true })).count ?? 0} active)
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold">Store</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Domain</dt>
              <dd className="font-medium">{store.domain}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Currency</dt>
              <dd className="font-medium">{store.currency}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Free shipping over</dt>
              <dd className="font-medium">{formatCad(store.free_shipping_threshold_cad)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Ship from postal</dt>
              <dd className="font-medium">{store.ship_from_postal_code ?? "Not set"}</dd>
            </div>
          </dl>
          <Link href={`/stores/${store.id}`} className="mt-3 inline-block text-sm text-blue-700 hover:underline">
            Edit store settings →
          </Link>
        </div>
      </div>
    </div>
  );
}
