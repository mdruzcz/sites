import Link from "next/link";

export function CheckoutBar() {
  return (
    <>
      <Link href="/checkout" className="btn-primary mt-4 inline-flex w-full justify-center">
        Submit an inquiry →
      </Link>
      <p className="mt-3 text-center text-xs text-slate-500">
        No payment online — we&rsquo;ll reply with your shipping quote &amp; timeline within one business day.
      </p>
    </>
  );
}
