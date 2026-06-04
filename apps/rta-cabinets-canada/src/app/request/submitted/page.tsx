import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quote Request Received",
  description:
    "Thanks for your quote request. The RTA Cabinets Canada team will review your list and email a written quote within one business day.",
  alternates: { canonical: "/request/submitted" },
  robots: { index: false },
};

export default function SubmittedPage() {
  return (
    <div className="container py-20 max-w-xl text-center">
      <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">Quote Request Received</h1>
      <p className="text-ink-soft mb-8">
        Thank you! We&apos;ve received your cabinet list. Our team will review it and
        email you a written quote — including taxes and Canada-wide shipping —{" "}
        <strong>within one business day</strong>.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/shop" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
          Keep Shopping
        </Link>
        <Link href="/" className="border border-accent text-accent px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-sand">
          Back Home
        </Link>
      </div>
    </div>
  );
}
