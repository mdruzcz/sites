import Link from "next/link";

export function CheckoutBar() {
  return (
    <>
      <Link href="/checkout" className="btn-primary mt-4 inline-flex w-full justify-center">
        Checkout →
      </Link>
      <p className="mt-3 text-center text-xs text-slate-500">
        Secure checkout. Apple Pay · Google Pay · all major cards. Returns within 30 days.
      </p>
    </>
  );
}
