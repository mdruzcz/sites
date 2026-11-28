import Link from "next/link";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { loadResumableOrder } from "@/lib/orders/recovery";
import { ResumeCheckout } from "@/components/resume-checkout";
import { BILLER_PHONE } from "@/lib/store-brand";
import { formatCad } from "@/lib/utils";

export const metadata = { title: "Finish your order", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ o?: string; k?: string; stop?: string }>;
}

/** Landing page for the link in the checkout reminder email. */
export default async function ResumeCheckoutPage({ searchParams }: PageProps) {
  const { o, k, stop } = await searchParams;
  const store = await getStore();
  const state = store ? await loadResumableOrder(getServiceSupabase(), { id: store.id }, o, k) : ({ state: "invalid" } as const);

  if (state.state === "invalid" || state.state === "expired") {
    return (
      <Shell title={state.state === "expired" ? "This saved order has expired" : "We couldn't find that order"}>
        <p className="mt-3 text-[var(--color-text-soft)]">
          {state.state === "expired"
            ? "Saved orders are held for 14 days. You can start a new order in a couple of minutes."
            : "The link may be incomplete. You can start a new order, or call us and we will look it up."}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/permanent-lights" className="btn-primary">
            Shop kits
          </Link>
          <a href={`tel:${BILLER_PHONE.replace(/[^\d+]/g, "")}`} className="btn-secondary">
            Call {BILLER_PHONE}
          </a>
        </div>
      </Shell>
    );
  }

  const order = state.doc;
  if (state.state === "paid") {
    return (
      <Shell title="This order is already paid">
        <p className="mt-3 text-[var(--color-text-soft)]">
          Order <strong className="text-[var(--color-text)]">{order.number}</strong> went through. Thank you! Your confirmation
          and invoice were emailed to {order.email}.
        </p>
        <Link href="/track-order" className="btn-secondary mt-7">
          Track your order
        </Link>
      </Shell>
    );
  }

  const a = order.shipTo!;
  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">{stop ? "Checkout reminders" : "Finish your order"}</h1>
        <p className="mt-2 text-[var(--color-text-soft)]">
          {stop
            ? `Order ${order.number} is still saved if you want it.`
            : `Welcome back. Order ${order.number} is saved exactly as you left it. Nothing has been charged yet.`}
        </p>

        <div className="surface mt-6">
          <ul className="divide-y divide-[var(--color-border)]">
            {order.lines.map((l, i) => (
              <li key={i} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium text-[var(--color-text)]">{l.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {l.variant && !/^default$/i.test(l.variant) ? `${l.variant} · ` : ""}Qty {l.qty}
                  </p>
                </div>
                <p className="font-semibold">{formatCad(l.total)}</p>
              </li>
            ))}
          </ul>
          <dl className="space-y-1.5 border-t border-[var(--color-border)] px-5 py-4 text-sm">
            <Row label="Subtotal" value={formatCad(order.subtotal)} />
            <Row label={order.shippingLabel} value={order.shipping > 0 ? formatCad(order.shipping) : "Free"} />
            <Row label={order.taxLabel} value={formatCad(order.tax)} />
            <div className="flex justify-between gap-3 border-t border-[var(--color-border)] pt-3 text-base font-semibold">
              <dt>Total (CAD)</dt>
              <dd className="font-display text-xl text-[var(--color-brand)]">{formatCad(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="surface mt-4 p-5 text-sm">
          <p className="eyebrow-plain">Shipping to</p>
          <p className="mt-1.5 text-[var(--color-text)]">
            {a.recipient}
            {a.company ? `, ${a.company}` : ""}
            <br />
            {a.line1}
            {a.line2 ? `, ${a.line2}` : ""}
            <br />
            {a.city}, {a.province} {a.postal}
          </p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Wrong address or want to change the order?{" "}
            <Link href="/permanent-lights" className="underline">
              Start a new order
            </Link>{" "}
            instead.
          </p>
        </div>

        <ResumeCheckout
          orderId={order.id}
          token={k ?? ""}
          total={order.total}
          lines={order.lines.map((l) => ({ productName: l.name, variantName: l.variant, quantity: l.qty }))}
          stopMode={!!stop}
          phone={BILLER_PHONE}
        />

        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          Secure card payment through Stripe · 5-year LED warranty · Ships from London, Ontario · Invoiced by Master Decker Inc.
        </p>
      </div>
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="shell py-20 text-center md:py-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-[2rem] md:text-[2.6rem]">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-[var(--color-text-soft)]">
      <dt>{label}</dt>
      <dd className="font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}
