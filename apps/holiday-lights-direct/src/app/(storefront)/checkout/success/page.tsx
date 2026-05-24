import Link from "next/link";

export const metadata = { title: "Order received", robots: { index: false } };

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccess({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
        ✓
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Thank you for your order</h1>
      <p className="mt-3 text-slate-600">
        We&rsquo;ll send a confirmation email within a few minutes and ship your order within 1 business day.
      </p>
      {session_id && (
        <p className="mt-2 font-mono text-xs text-slate-400">Stripe session: {session_id}</p>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
