import Link from "next/link";

export function CheckoutBar() {
  return (
    <>
      <Link href="/checkout" className="btn-primary mt-4 inline-flex w-full justify-center">
        Request a shipping quote →
      </Link>
      <p className="mt-3 text-center text-xs text-slate-500">
        No payment is taken online — we&rsquo;ll email your shipping cost. Usually within one business day.
      </p>
    </>
  );
}
