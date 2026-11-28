import Link from "next/link";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";
import { loadResumableOrder } from "@/lib/orders/recovery";
import { ResumeCheckout } from "@/components/resume-checkout";
import { BILLER_PHONE } from "@/lib/store-brand";
import { BRAND, formatCad } from "@/lib/utils";

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
        <p className="mt-3 text-slate-600">
          {state.state === "expired"
            ? "Saved orders are held for 14 days. Your kit is still available, so you can start a new order in a couple of minutes."
            : "The link may be incomplete. You can start a new order, or call us and we will look it up."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-primary">
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
        <p className="mt-3 text-slate-600">
          Order <strong className="text-slate-900">{order.number}</strong> went through. Thank you! Your confirmation and invoice
          were emailed to {order.email}.
        </p>
        <Link href="/track-order" className="btn-secondary mt-6 inline-flex">
          Track your order
        </Link>
      </Shell>
    );
  }

  const a = order.shipTo!;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl tracking-tight">{stop ? "Checkout reminders" : "Finish your order"}</h1>
      <p className="mt-2 text-slate-600">
        {stop
          ? `Order ${order.number} is still saved if you want it.`
          : `Welcome back. Order ${order.number} is saved exactly as you left it. Nothing has been charged yet.`}
      </p>

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-white">
        <ul className="divide-y divide-[var(--color-border)]">
          {order.lines.map((l, i) => (
            <li key={i} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">{l.name}</p>
                <p className="text-xs text-slate-500">
                  {l.variant && !/^default$/i.test(l.variant) ? `${l.variant} · ` : ""}Qty {l.qty}
                </p>
              </div>
              <p className="font-semibold">{formatCad(l.total, 2)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-1.5 border-t border-[var(--color-border)] px-5 py-4 text-sm">
          <Row label="Subtotal" value={formatCad(order.subtotal, 2)} />
          <Row label={order.shippingLabel} value={order.shipping > 0 ? formatCad(order.shipping, 2) : "FREE"} />
          <Row label={order.taxLabel} value={formatCad(order.tax, 2)} />
          <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base font-semibold">
            <dt>Total (CAD)</dt>
            <dd className="font-display text-xl text-[var(--color-brand)]">{formatCad(order.total, 2)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-white p-5 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Shipping to</p>
        <p className="mt-1 text-slate-800">
          {a.recipient}
          {a.company ? `, ${a.company}` : ""}
          <br />
          {a.line1}
          {a.line2 ? `, ${a.line2}` : ""}
          <br />
          {a.city}, {a.province} {a.postal}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Wrong address or want to change the order?{" "}
          <Link href="/diy-kits" className="underline">
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

      <p className="mt-6 text-center text-xs text-slate-400">
        Secure payment on Stripe · {BRAND.warrantyYears}-year warranty · Invoiced by Master Decker Inc.
      </p>
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl tracking-tight">{title}</h1>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-slate-600">
      <dt>{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
