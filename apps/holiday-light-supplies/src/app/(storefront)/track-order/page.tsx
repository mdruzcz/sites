import type { Metadata } from "next";
import { TrackOrderForm } from "@/components/track-order-form";
import { Breadcrumbs } from "@/components/ui";
import { SITE_EMAIL } from "@/lib/site";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = { title: "Track your order", description: "Check the status and tracking of your Holiday Light Supplies order.", alternates: { canonical: `${SITE_URL}/track-order` } };

export default function TrackOrderPage() {
  return (
    <div className="shell max-w-2xl py-10 md:py-16">
      <Breadcrumbs items={[{ label: "Track your order" }]} />
      <h1 className="font-display mt-3 text-3xl md:text-4xl">Track your order</h1>
      <p className="mt-2 text-[var(--color-muted)]">Enter your order number and the email on the quote. We show the latest status and any tracking numbers.</p>
      <TrackOrderForm />
      <div className="mt-10 rounded-2xl bg-[var(--color-brand-soft)] p-5 text-sm text-[var(--color-brand-dark)]">
        Lost the email? <a href={`mailto:${SITE_EMAIL}`} className="font-semibold underline">Email us</a> with your name and approximate order date and we&rsquo;ll find you in the system.
      </div>
    </div>
  );
}
