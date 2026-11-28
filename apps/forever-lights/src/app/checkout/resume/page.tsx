import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceSupabase, getStoreId } from '@/lib/supabase-admin';
import { loadResumableOrder } from '@/lib/orders/recovery';
import { ResumeCheckout } from '@/components/ResumeCheckout';
import { site, phoneHref } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Finish Your Order', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

/** Landing page for the link in the checkout reminder email. */
export default async function ResumeCheckoutPage({ searchParams }: { searchParams: Promise<{ o?: string; k?: string; stop?: string }> }) {
  const { o, k, stop } = await searchParams;
  const storeId = await getStoreId();
  const state = storeId ? await loadResumableOrder(getServiceSupabase(), { id: storeId }, o, k) : ({ state: 'invalid' } as const);

  if (state.state === 'invalid' || state.state === 'expired') {
    return (
      <Shell title={state.state === 'expired' ? 'This saved order has expired' : "We couldn't find that order"}>
        <p className="mt-3 text-ink-soft">
          {state.state === 'expired'
            ? 'Saved orders are held for 14 days. Your kit is still available, so you can start a new order in a couple of minutes.'
            : 'The link may be incomplete. You can start a new order, or call us and we will look it up.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/kits" className="btn btn-primary">Shop DIY kits</Link>
          <a href={phoneHref} className="btn btn-dark">Call {site.phone}</a>
        </div>
      </Shell>
    );
  }

  const order = state.doc;
  if (state.state === 'paid') {
    return (
      <Shell title="This order is already paid">
        <p className="mt-3 text-ink-soft">
          Order <strong className="text-ink">{order.number}</strong> went through. Thank you! Your confirmation and invoice were emailed to {order.email}.
        </p>
        <Link href="/kits" className="btn btn-dark mt-6">Back to DIY kits</Link>
      </Shell>
    );
  }

  const a = order.shipTo!;
  return (
    <section className="bg-soft border-b border-line">
      <div className="wrap max-w-3xl pt-10 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-ink">{stop ? 'Checkout reminders' : 'Finish your order'}</h1>
        <p className="mt-3 text-ink-soft">
          {stop
            ? `Order ${order.number} is still saved if you want it.`
            : `Welcome back. Order ${order.number} is saved exactly as you left it. Nothing has been charged yet.`}
        </p>

        <div className="card mt-8 divide-y divide-line">
          {order.lines.map((l, i) => (
            <div key={i} className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-bold text-ink">{l.name}</p>
                <p className="text-sm text-muted">{l.variant ? `${l.variant} · ` : ''}Qty {l.qty}</p>
              </div>
              <p className="font-bold text-ink tabular-nums">{money(l.total)}</p>
            </div>
          ))}
          <dl className="p-5 space-y-2 text-[15px]">
            <Row label="Subtotal" value={money(order.subtotal)} />
            <Row label={order.shippingLabel} value={order.shipping > 0 ? money(order.shipping) : 'Free'} />
            <Row label={order.taxLabel} value={money(order.tax)} />
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="font-bold text-ink">Total (CAD)</dt>
              <dd className="font-heading text-3xl font-bold text-ink tabular-nums">{money(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="card mt-4 p-5 text-sm">
          <p className="label">Shipping to</p>
          <p className="mt-1 text-ink">
            {a.recipient}{a.company ? `, ${a.company}` : ''}<br />
            {a.line1}{a.line2 ? `, ${a.line2}` : ''}<br />
            {a.city}, {a.province} {a.postal}
          </p>
          <p className="mt-2 text-xs text-muted">
            Wrong address or want to change the order? <Link href="/kits" className="underline">Start a new order</Link> instead.
          </p>
        </div>

        <ResumeCheckout
          orderId={order.id}
          token={k ?? ''}
          totalLabel={money(order.total)}
          lines={order.lines.map(l => ({ productName: l.name, variantName: l.variant, quantity: l.qty }))}
          stopMode={!!stop}
          phone={site.phone}
        />

        <p className="mt-6 text-center text-xs text-muted">
          Secure payment on Stripe · 5-year parts warranty · Invoiced by Master Decker Inc.
        </p>
      </div>
    </section>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-soft border-b border-line">
      <div className="wrap max-w-2xl py-20 text-center">
        <h1 className="text-4xl font-bold text-ink">{title}</h1>
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink tabular-nums">{value}</dd>
    </div>
  );
}
