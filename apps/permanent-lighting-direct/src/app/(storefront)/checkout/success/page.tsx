import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import { loadOrderDoc } from "@/lib/orders/order-doc";
import { formatCad } from "@/lib/utils";

export const metadata = { title: "Order received", robots: { index: false } };
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccess({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  const service = getServiceSupabase();
  const { data: row } = session_id
    ? await service.from("ecom_orders").select("id").eq("stripe_checkout_session_id", session_id).maybeSingle()
    : { data: null };
  const order = row ? await loadOrderDoc(service, row.id) : null;
  const confirmed = order?.status === "paid";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="text-center">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div>
        <h1 className="mt-4 font-display text-3xl tracking-tight">Thank you for your order</h1>
        {order ? (
          <p className="mt-3 text-slate-600">
            Order <strong className="text-slate-900">{order.number}</strong>{" "}
            {confirmed ? "is confirmed." : "is being confirmed with the bank."} Your order summary and invoice are on their way to{" "}
            <strong className="text-slate-900">{order.email}</strong>.
          </p>
        ) : (
          <p className="mt-3 text-slate-600">Your payment went through. Your confirmation email and invoice will arrive in a few minutes.</p>
        )}
        <p className="mt-2 text-sm text-slate-500">We pack orders within one to two business days and email tracking when it ships.</p>
      </div>

      {order && (
        <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-white p-5">
          <ul className="divide-y divide-[var(--color-border)] text-sm">
            {order.lines.map((l, i) => (
              <li key={i} className="flex justify-between gap-4 py-2">
                <span>
                  {l.qty} × {l.name}
                  {l.variant && l.variant !== "Default" ? <span className="text-slate-500"> ({l.variant})</span> : null}
                </span>
                <span className="font-medium">{formatCad(l.total, 2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t border-[var(--color-border)] pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{formatCad(order.subtotal, 2)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate-500">{order.shippingLabel}</dt><dd>{order.shipping > 0 ? formatCad(order.shipping, 2) : "Free"}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">{order.taxLabel}</dt><dd>{formatCad(order.tax, 2)}</dd></div>
            <div className="flex justify-between pt-1 text-base font-semibold"><dt>Total</dt><dd>{formatCad(order.total, 2)}</dd></div>
          </dl>
          {order.shipTo && (
            <p className="mt-4 text-sm text-slate-600">
              Shipping to {order.shipTo.recipient}, {order.shipTo.line1}, {order.shipTo.city}, {order.shipTo.province} {order.shipTo.postal}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/track-order" className="btn-secondary">Track an order</Link>
        <Link href="/shop" className="btn-primary">Keep shopping</Link>
      </div>
    </div>
  );
}
