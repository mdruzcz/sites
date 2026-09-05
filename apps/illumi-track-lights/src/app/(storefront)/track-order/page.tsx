import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TrackOrderForm } from "@/components/track-order-form";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Check the status and tracking number of your Illumi Track Lights order using your order number and email.",
  alternates: { canonical: `${SITE_URL}/track-order` },
  robots: { index: false, follow: true }
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero photo="soffit-lights-installed" eyebrow="Orders" title="Track your order." crumbs={[{ label: "Track order" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section max-w-2xl">
          <p className="text-[var(--color-text-soft)]">Enter your order number and the email you used at checkout to see the latest status and carrier tracking.</p>
          <TrackOrderForm />
          <div className="card mt-8 p-5 text-sm text-[var(--color-text-soft)]">
            Lost the confirmation email? <Link href="/contact-us" className="font-semibold text-[var(--color-accent-dark)] hover:underline">Contact us</Link> with your name and approximate order date and we will find it.
          </div>
        </div>
      </section>
    </>
  );
}
