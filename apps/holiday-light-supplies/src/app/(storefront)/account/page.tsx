import Link from "next/link";

export const metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <div className="shell max-w-2xl py-16">
      <h1 className="font-display text-3xl md:text-4xl">Trade accounts</h1>
      <p className="mt-4 text-[var(--color-text-soft)]">
        Installer tiers and public-sector terms are set up on the account by our team. Register once and every quote after that carries your pricing and payment terms automatically.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/professional-installer" className="card p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
          <p className="font-display text-xl">Installer program</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Case pricing and priority fulfilment for installation crews.</p>
        </Link>
        <Link href="/municipalities" className="card p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
          <p className="font-display text-xl">Municipal & BIA accounts</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Net-30 PO invoicing, tax-exempt handling and tender-ready quotes.</p>
        </Link>
      </div>
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Looking for an order? <Link href="/track-order" className="font-semibold text-[var(--color-brand)] hover:underline">Track it here</Link>.
      </p>
    </div>
  );
}
