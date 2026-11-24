import Link from "next/link";

export const metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <div className="shell py-12 md:py-20">
      <div className="surface mx-auto max-w-2xl p-7 md:p-10">
        <p className="eyebrow-plain">Account</p>
        <h1 className="font-display mt-3 text-[2rem] md:text-[2.6rem]">Customer accounts are on the way.</h1>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
          Sign-in, order history, saved addresses and trade status ship in the next phase. Until then you can
          check any order with its number, and apply for trade pricing below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/track-order" className="btn-primary">
            Track an order
          </Link>
          <Link href="/professional-installer" className="btn-secondary">
            Pro installer pricing
          </Link>
          <Link href="/municipalities" className="btn-secondary">
            Municipal accounts
          </Link>
        </div>
      </div>
    </div>
  );
}
