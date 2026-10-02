import type { Metadata } from 'next';
import Link from 'next/link';
import { ClearCart } from '@/components/CartProvider';
import { Icon } from '@/components/icons';
import { getServiceSupabase } from '@/lib/supabase-admin';
import { loadOrderDoc } from '@/lib/orders/order-doc';
import { site, phoneHref } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Order Received', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let order = null;
  if (session_id) {
    const service = getServiceSupabase();
    const { data } = await service.from('ecom_orders').select('id').eq('stripe_checkout_session_id', session_id).maybeSingle();
    if (data) order = await loadOrderDoc(service, data.id as string);
  }

  return (
    <section className="bg-soft border-b border-line">
      {order && <ClearCart />}
      <div className="wrap max-w-3xl pt-12 pb-20">
        <div className="text-center">
          <span className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-accent text-ink"><Icon.check size={28} /></span>
          <h1 className="mt-5 text-4xl font-bold text-ink">Thank you for your order</h1>
          {order ? (
            <p className="mt-4 text-lg text-ink-soft">
              Order <strong className="text-ink">{order.number}</strong> {order.status === 'paid' ? 'is confirmed' : 'is being confirmed'}. Your order
              summary and invoice are on their way to <strong className="text-ink">{order.email}</strong>.
            </p>
          ) : (
            <p className="mt-4 text-lg text-ink-soft">Your payment went through. Your confirmation and invoice will arrive by email in a few minutes.</p>
          )}
          <p className="mt-2 text-muted">We pack kits within one to two business days and email tracking as soon as it ships.</p>
        </div>

        {order && (
          <div className="card p-6 mt-10">
            <ul className="divide-y divide-line text-[15px]">
              {order.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-4 py-3">
                  <span className="text-ink">{l.qty} × {l.name}{l.variant ? <span className="text-muted"> ({l.variant} track)</span> : null}</span>
                  <span className="font-semibold text-ink tabular-nums">{money(l.total)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 border-t border-line pt-3 space-y-1.5 text-[15px]">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{money(order.subtotal)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">{order.shippingLabel}</dt><dd className="tabular-nums">{order.shipping > 0 ? money(order.shipping) : 'Free'}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">{order.taxLabel}</dt><dd className="tabular-nums">{money(order.tax)}</dd></div>
              <div className="flex justify-between pt-2 text-lg font-bold text-ink"><dt>Total</dt><dd className="tabular-nums">{money(order.total)}</dd></div>
            </dl>
            {order.shipTo && (
              <p className="mt-5 text-sm text-ink-soft">
                Shipping to {order.shipTo.recipient}, {order.shipTo.line1}, {order.shipTo.city}, {order.shipTo.province} {order.shipTo.postal}
              </p>
            )}
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          <Link href="/support/getting-started" className="btn btn-dark">Read the getting-started guide</Link>
          <a href={phoneHref} className="btn btn-outline"><Icon.phone size={18} /> Questions? {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
