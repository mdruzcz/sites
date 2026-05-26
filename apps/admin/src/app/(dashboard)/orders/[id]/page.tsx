import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatCad, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await getServerSupabase();

  const [orderRes, itemsRes, addrRes] = await Promise.all([
    supabase.from("ecom_orders").select("*").eq("id", id).maybeSingle(),
    supabase.from("ecom_order_items").select("*").eq("order_id", id),
    supabase.from("ecom_order_addresses").select("*").eq("order_id", id)
  ]);

  if (!orderRes.data) notFound();
  const o = orderRes.data;

  return (
    <div className="space-y-6">
      <Link href="/orders" className="text-xs text-slate-500 hover:underline">
        ← All orders
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{o.order_number}</h1>
      <p className="text-sm text-slate-500">
        {formatDate(o.created_at)} · {o.email} · {o.status}
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Line items</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Item</th>
                <th className="py-2">SKU</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Unit</th>
                <th className="py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(itemsRes.data ?? []).map((i) => (
                <tr key={i.id} className="border-t border-slate-100">
                  <td className="py-2">
                    {i.product_name_snapshot}
                    <div className="text-xs text-slate-500">{i.variant_name_snapshot}</div>
                  </td>
                  <td className="py-2 font-mono text-xs">{i.sku_snapshot}</td>
                  <td className="py-2 text-right">{i.quantity}</td>
                  <td className="py-2 text-right">{formatCad(Number(i.unit_price_cad))}</td>
                  <td className="py-2 text-right">{formatCad(Number(i.line_subtotal_cad))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 text-sm">
              <Row label="Subtotal" value={formatCad(Number(o.subtotal_cad))} />
              <Row label="Shipping" value={formatCad(Number(o.shipping_cad))} />
              <Row label="Tax" value={formatCad(Number(o.tax_cad))} />
              <Row label="Discount" value={`− ${formatCad(Number(o.discount_cad))}`} />
              <Row label="Total" value={formatCad(Number(o.total_cad))} bold />
            </tfoot>
          </table>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Customer</h2>
            <p className="mt-2 text-sm">{o.email}</p>
            <p className="text-sm text-slate-500">{o.phone}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Shipping</h2>
            {(() => {
              const ship = addrRes.data?.find((a) => a.type === "shipping");
              if (!ship) return <p className="mt-2 text-sm text-slate-500">No address.</p>;
              return (
                <address className="mt-2 not-italic text-sm">
                  {ship.recipient}
                  <br />
                  {ship.company && <>{ship.company}<br /></>}
                  {ship.line1}
                  <br />
                  {ship.line2 && <>{ship.line2}<br /></>}
                  {ship.city}, {ship.province} {ship.postal_code}
                  <br />
                  {ship.country}
                </address>
              );
            })()}
            {o.tracking_number && (
              <p className="mt-2 text-xs text-slate-500">
                Tracking: <code className="font-mono">{o.tracking_number}</code>
              </p>
            )}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Payment</h2>
            <p className="mt-2 text-sm">Method: {o.payment_method}</p>
            {o.stripe_payment_intent_id && (
              <p className="text-xs text-slate-500">PI: {o.stripe_payment_intent_id}</p>
            )}
            {o.po_number && <p className="text-xs text-slate-500">PO: {o.po_number}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <tr>
      <td colSpan={4} className={`py-1 text-right ${bold ? "font-semibold" : "text-slate-500"}`}>
        {label}
      </td>
      <td className={`py-1 text-right ${bold ? "font-semibold" : ""}`}>{value}</td>
    </tr>
  );
}
