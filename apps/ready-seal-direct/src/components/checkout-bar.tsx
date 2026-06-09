import Link from "next/link";

export function CheckoutBar({
  belowMinimum = false,
  gallonsShort = 0
}: {
  belowMinimum?: boolean;
  gallonsShort?: number;
}) {
  if (belowMinimum) {
    return (
      <div className="mt-4">
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          <strong>2-gallon minimum order.</strong> We don&rsquo;t ship single gallons on their own — add{" "}
          {gallonsShort} more gallon{gallonsShort === 1 ? "" : "s"} of stain to check out. (Tip: a 5-gallon
          pail qualifies on its own and works out cheaper per gallon.)
        </div>
        <button
          type="button"
          disabled
          className="btn-primary mt-3 inline-flex w-full cursor-not-allowed justify-center opacity-50"
        >
          Checkout →
        </button>
      </div>
    );
  }

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
