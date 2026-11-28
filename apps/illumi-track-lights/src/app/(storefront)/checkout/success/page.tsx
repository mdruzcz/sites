import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import { loadOrderDoc } from "@/lib/orders/order-doc";
import { PICKUP_LABEL, SHOP } from "@/lib/orders/policy";
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
  const pickup = order?.shippingLabel === PICKUP_LABEL;

  return (
    <div id="order-confirmed" className="shell max-w-2xl py-14">
      <div className="text-center">
        <p className="eyebrow text-[var(--color-green)]">Payment received</p>
        <h1 className="font-display h1-fluid mt-2">Thank you for your order</h1>
        {order ? (
          <p className="mt-3 text-[var(--color-text-soft)]">
            Order <strong className="text-[var(--color-text)]">{order.number}</strong>{" "}
            {confirmed ? "is confirmed." : "is being confirmed with the bank."} Your order summary and invoice are on their way to{" "}
            <strong className="text-[var(--color-text)]">{order.email}</strong>.
          </p>
        ) : (
          <p className="mt-3 text-[var(--color-text-soft)]">Your payment went through. Your confirmation email and invoice will arrive in a few minutes.</p>
        )}
      </div>

      <p className="note mt-6">
        {pickup ? (
          <>
            <strong>What happens next:</strong> we get your order ready, usually within one to two business days, then email you that it is ready for pickup at {SHOP.address}. Please wait for that email before you come by.
          </>
        ) : (
          <>
            <strong>What happens next:</strong> we pack your order within one to two business days and email you the tracking number when it leaves. Shipping is free.
          </>
        )}
      </p>

      {order && (
        <div className="mt-8 border border-[var(--color-border)] bg-white p-5">
          <ul className="divide-y divide-[var(--color-border)] text-sm">
            {order.lines.map((l, i) => (
              <li key={i} className="flex justify-between gap-4 py-2">
                <span>
                  {l.qty} × {l.name}
                  {l.variant && l.variant !== "Default" ? <span className="text-[var(--color-muted)]"> ({l.variant})</span> : null}
                </span>
                <span className="price">{formatCad(l.total, 2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t border-[var(--color-border)] pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-[var(--color-text-soft)]">Subtotal</dt><dd>{formatCad(order.subtotal, 2)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-[var(--color-text-soft)]">{order.shippingLabel}</dt><dd>{order.shipping > 0 ? formatCad(order.shipping, 2) : pickup ? "No charge" : "Free"}</dd></div>
            <div className="flex justify-between"><dt className="text-[var(--color-text-soft)]">{order.taxLabel}</dt><dd>{formatCad(order.tax, 2)}</dd></div>
            <div className="flex justify-between pt-1 text-base font-bold"><dt>Total</dt><dd>{formatCad(order.total, 2)}</dd></div>
          </dl>
          {order.shipTo && !pickup && (
            <p className="mt-4 text-sm text-[var(--color-text-soft)]">
              Shipping to {order.shipTo.recipient}, {order.shipTo.line1}, {order.shipTo.city}, {order.shipTo.province} {order.shipTo.postal}
            </p>
          )}
          {pickup && <p className="mt-4 text-sm text-[var(--color-text-soft)]">Pickup by {order.shipTo?.recipient ?? "you"} at {SHOP.address}</p>}
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/track-order" className="btn-secondary">Track an order</Link>
        <Link href="/shop" className="btn-primary">Keep shopping</Link>
      </div>
    </div>
  );
}
