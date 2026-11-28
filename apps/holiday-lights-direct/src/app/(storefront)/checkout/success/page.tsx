import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import { loadOrderDoc } from "@/lib/orders/order-doc";
import { formatCad } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  return { title: session_id ? "Order received" : "Request received", robots: { index: false } };
}

/**
 * Two arrivals land here:
 *  - Stripe sends a paid card order back with ?session_id=…  → order confirmation;
 *  - the request form (no payment) arrives with no parameters → request received.
 */
export default async function CheckoutSuccess({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  if (!session_id) return <RequestReceived />;

  const service = getServiceSupabase();
  const { data: row } = await service.from("ecom_orders").select("id").eq("stripe_checkout_session_id", session_id).maybeSingle();
  const order = row ? await loadOrderDoc(service, row.id) : null;
  const confirmed = order?.status === "paid";

  return (
    <div className="shell py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-green-soft)] text-2xl text-[var(--color-green)]">
            ✓
          </div>
          <h1 className="mt-4 font-display text-[2rem] md:text-[2.6rem]">Thank you for your order</h1>
          {order ? (
            <p className="mt-3 text-[var(--color-text-soft)]">
              Order <strong className="text-[var(--color-text)]">{order.number}</strong>{" "}
              {confirmed ? "is confirmed." : "is being confirmed with the bank."} Your order summary and invoice are on
              their way to <strong className="text-[var(--color-text)]">{order.email}</strong>.
            </p>
          ) : (
            <p className="mt-3 text-[var(--color-text-soft)]">
              Once your payment has gone through, your order summary and invoice arrive by email within a few minutes.
              If nothing arrives, email{" "}
              <a href="mailto:service@masterdecker.com" className="underline">
                service@masterdecker.com
              </a>
              .
            </p>
          )}
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Most orders leave our London, Ontario warehouse the same or next business day. October to December can add
            a day. We email you as soon as yours ships.
          </p>
        </div>

        {order && (
          <div className="surface mt-10 p-5 md:p-6">
            <ul className="divide-y divide-[var(--color-border)] text-sm">
              {order.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-4 py-2.5">
                  <span>
                    {l.qty} × {l.name}
                    {l.variant && !/^default$/i.test(l.variant) ? (
                      <span className="text-[var(--color-muted)]"> ({l.variant})</span>
                    ) : null}
                  </span>
                  <span className="font-medium">{formatCad(l.total)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1.5 border-t border-[var(--color-border)] pt-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--color-muted)]">Subtotal</dt>
                <dd>{formatCad(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--color-muted)]">{order.shippingLabel}</dt>
                <dd>{order.shipping > 0 ? formatCad(order.shipping) : "Free"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--color-muted)]">{order.taxLabel}</dt>
                <dd>{formatCad(order.tax)}</dd>
              </div>
              <div className="flex justify-between gap-3 pt-1 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatCad(order.total)}</dd>
              </div>
            </dl>
            {order.shipTo && (
              <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                Shipping to {order.shipTo.recipient}, {order.shipTo.line1}, {order.shipTo.city}, {order.shipTo.province}{" "}
                {order.shipTo.postal}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/track-order" className="btn-secondary">
            Track an order
          </Link>
          <Link href="/shop" className="btn-primary">
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

/** The request flow's landing page: nothing was charged, we reply by email. */
function RequestReceived() {
  return (
    <div className="shell py-16 md:py-24"><div className="surface mx-auto max-w-2xl p-8 text-center md:p-12">
      <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-green-soft)] text-2xl text-[var(--color-green)]">
        ✓
      </div>
      <h1 className="mt-4 font-display text-[2rem] md:text-[2.6rem]">Request received — check your inbox soon</h1>
      <p className="mt-3 text-[var(--color-text-soft)]">
        Thanks! We&rsquo;ve got your order details and delivery address. We&rsquo;ll email you to
        confirm your order, your delivery timeline and any shipping cost,{" "}
        <strong>usually within one business day</strong>. Shipping is free on orders over $500. No
        payment is taken until you approve.
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Nothing has been charged. Watch your inbox (and spam folder) for our reply.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Keep browsing
        </Link>
      </div>
    </div></div>
  );
}
