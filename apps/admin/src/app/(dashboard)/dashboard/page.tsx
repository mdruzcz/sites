import Link from "next/link";
import { StatCard } from "@/components/ui/stat-card";
import { getActiveStore } from "@/lib/store-context";
import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad, formatDate } from "@/lib/utils";

// Orders that represent real revenue (excludes carts, abandoned checkouts, refunds).
const REVENUE_STATUSES = ["paid", "fulfilled", "shipped", "delivered"];

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

  const service = getServiceSupabase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const [storesRes, revenueRes, recentRes, customersRes, pendingAppsRes, cartItemsRes, storeOrdersRes] =
    await Promise.all([
      service.from("ecom_stores").select("id, name, domain, settings").order("name", { ascending: true }),
      service.from("ecom_orders").select("store_id, total_cad, created_at").in("status", REVENUE_STATUSES),
      service
        .from("ecom_orders")
        .select("id, store_id, order_number, email, status, total_cad, created_at")
        .not("status", "in", "(cart,pending_payment)")
        .order("created_at", { ascending: false })
        .limit(7),
      service.from("ecom_customers").select("id", { count: "exact", head: true }),
      service.from("ecom_b2b_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
      // Funnel inputs for the active store.
      service.from("ecom_cart_items").select("cart_id, ecom_carts!inner(store_id)").eq("ecom_carts.store_id", store.id),
      service.from("ecom_orders").select("status").eq("store_id", store.id)
    ]);

  const stores = storesRes.data ?? [];
  const storeName = new Map<string, string>(stores.map((s) => [s.id, s.name]));
  const revenueOrders = revenueRes.data ?? [];

  const totalRevenue = revenueOrders.reduce((sum, o) => sum + Number(o.total_cad ?? 0), 0);
  const paidOrderCount = revenueOrders.length;
  const todaysOrders = revenueOrders.filter((o) => (o.created_at ?? "") >= todayIso);
  const revenueToday = todaysOrders.reduce((sum, o) => sum + Number(o.total_cad ?? 0), 0);

  // Revenue per store, highest first.
  const byStore = new Map<string, { revenue: number; orders: number }>();
  for (const o of revenueOrders) {
    const cur = byStore.get(o.store_id) ?? { revenue: 0, orders: 0 };
    cur.revenue += Number(o.total_cad ?? 0);
    cur.orders += 1;
    byStore.set(o.store_id, cur);
  }
  const storeBreakdown = stores
    .map((s) => ({ id: s.id, name: s.name, domain: s.domain, ...(byStore.get(s.id) ?? { revenue: 0, orders: 0 }) }))
    .sort((a, b) => b.revenue - a.revenue);

  const recent = recentRes.data ?? [];

  // Conversion funnel for the active store. An order row is created the moment a
  // shopper starts checkout, so "checkout started" = non-cart orders.
  const cartsWithItems = new Set((cartItemsRes.data ?? []).map((r) => r.cart_id)).size;
  const storeOrders = storeOrdersRes.data ?? [];
  const checkoutStarted = storeOrders.filter((o) => o.status !== "cart").length;
  const purchased = storeOrders.filter((o) => REVENUE_STATUSES.includes(o.status)).length;
  const abandonedCheckouts = Math.max(0, checkoutStarted - purchased);
  const pct = (num: number, denom: number) => (denom > 0 ? Math.round((num / denom) * 100) : 0);

  // Top-of-funnel traffic from Umami (last 30 days) when the store is tracked.
  const umamiId = (store.settings as Record<string, unknown> | null)?.["umami_website_id"] as
    | string
    | undefined;
  let traffic: { visitors: number; checkoutViews: number } | null = null;
  if (umamiId) {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [visRes, covRes] = await Promise.all([
      service.from("session").select("website_id", { count: "exact", head: true }).eq("website_id", umamiId).gte("created_at", since),
      service
        .from("website_event")
        .select("website_id", { count: "exact", head: true })
        .eq("website_id", umamiId)
        .eq("url_path", "/checkout")
        .gte("created_at", since)
    ]);
    traffic = { visitors: visRes.count ?? 0, checkoutViews: covRes.count ?? 0 };
  }
  const trafficLive = !!traffic && traffic.visitors > 0;

  const funnel = trafficLive
    ? [
        { label: "Visitors (30d)", value: traffic!.visitors, rate: 100 },
        { label: "Reached checkout (30d)", value: traffic!.checkoutViews, rate: pct(traffic!.checkoutViews, traffic!.visitors) },
        { label: "Started checkout", value: checkoutStarted, rate: pct(checkoutStarted, traffic!.visitors) },
        { label: "Completed purchase", value: purchased, rate: pct(purchased, traffic!.visitors) }
      ]
    : [
        { label: "Added to cart", value: cartsWithItems, rate: 100 },
        { label: "Started checkout", value: checkoutStarted, rate: pct(checkoutStarted, cartsWithItems) },
        { label: "Completed purchase", value: purchased, rate: pct(purchased, cartsWithItems) }
      ];

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500">All stores · live metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total revenue" value={formatCad(totalRevenue)} hint={`${paidOrderCount} paid orders`} />
          <StatCard
            label="Orders today"
            value={todaysOrders.length}
            hint={formatCad(revenueToday) + " revenue"}
            tone={todaysOrders.length > 0 ? "success" : "default"}
          />
          <StatCard label="Customers" value={customersRes.count ?? 0} />
          <StatCard
            label="Pending B2B apps"
            value={pendingAppsRes.count ?? 0}
            tone={(pendingAppsRes.count ?? 0) > 0 ? "warning" : "default"}
          />
          <StatCard label="Stores" value={stores.length} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 lg:col-span-2">
          <h3 className="text-base font-semibold">7 most recent orders</h3>
          <p className="text-xs text-slate-500">Across all stores</p>
          <div className="mt-3 overflow-hidden rounded-md border border-slate-200">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Order #</th>
                  <th className="px-3 py-2">Store</th>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Total</th>
                  <th className="px-3 py-2">Placed</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-3 py-2">
                      <Link href={`/orders/${o.id}`} className="font-medium text-blue-700 hover:underline">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{storeName.get(o.store_id) ?? "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{o.email}</td>
                    <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-600">{o.status}</td>
                    <td className="px-3 py-2 text-right">{formatCad(Number(o.total_cad))}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{formatDate(o.created_at)}</td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold">Revenue by store</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {storeBreakdown.map((s) => (
              <li key={s.id} className="flex items-center justify-between">
                <span className="truncate text-slate-600">{s.name}</span>
                <span className="ml-3 shrink-0 font-medium">
                  {formatCad(s.revenue)}
                  <span className="ml-1 text-xs font-normal text-slate-400">({s.orders})</span>
                </span>
              </li>
            ))}
            {storeBreakdown.length === 0 && <li className="text-slate-500">No stores.</li>}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Conversion funnel · {store.name}</h3>
          <span className="text-xs text-slate-500">All-time</span>
        </div>
        <div className="mt-4 space-y-3">
          {funnel.map((step) => (
            <div key={step.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{step.label}</span>
                <span className="font-medium">
                  {step.value}
                  <span className="ml-2 text-xs font-normal text-slate-400">{step.rate}%</span>
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${step.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-sm">
          <span className="text-slate-600">
            Cart → purchase: <strong>{pct(purchased, cartsWithItems)}%</strong>
          </span>
          <span className="text-slate-600">
            Checkout completion: <strong>{pct(purchased, checkoutStarted)}%</strong>
          </span>
          <span className={abandonedCheckouts > 0 ? "text-amber-700" : "text-slate-600"}>
            Abandoned at checkout: <strong>{abandonedCheckouts}</strong>
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {trafficLive
            ? "Visitors and checkout views are last-30-days from analytics; “started checkout” and “purchase” are all-time order data."
            : umamiId
              ? "Analytics is enabled for this store — visitor and checkout-page-view stages will populate here as traffic comes in. Showing order-based funnel for now."
              : "“Added to cart” counts carts with ≥1 item; “started checkout” counts orders created at the checkout step. Site-visit and checkout-page-view tracking requires analytics (not enabled for this store)."}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Active store · {store.name}</h3>
          <Link href={`/stores/${store.id}`} className="text-sm text-blue-700 hover:underline">
            Edit settings →
          </Link>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <dl className="space-y-2 text-sm">
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
          </dl>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products/new" className="text-blue-700 hover:underline">
                + Add a product
              </Link>
            </li>
            <li>
              <Link href="/orders" className="text-blue-700 hover:underline">
                View this store&apos;s orders
              </Link>
            </li>
            <li>
              <Link href="/applications" className="text-blue-700 hover:underline">
                Review B2B applications
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
