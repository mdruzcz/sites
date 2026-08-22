import { PageHero } from "@/components/page-hero";
import { TrackOrderForm } from "@/components/track-order-form";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Track Your Order — Holiday Lights Direct",
  description:
    "Enter your order number and checkout email to see the latest status and Canada Post tracking for your Holiday Lights Direct order.",
  alternates: { canonical: `${SITE_URL}/track-order` },
  openGraph: {
    title: "Track Your Order — Holiday Lights Direct",
    description: "Check the latest status and tracking for your Holiday Lights Direct order.",
    url: `${SITE_URL}/track-order`
  }
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        photo="track-daytime-discreet"
        photoAlt="Daytime view of a home where the aluminum LED track blends into the soffit line"
        eyebrow="Order status"
        title="Track your order"
        intro="Enter your order number and the email you used at checkout to see the latest status and tracking information."
        crumb="Track order"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <TrackOrderForm />
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-6 text-sm leading-relaxed text-[var(--color-text-soft)]">
              Lost the confirmation email?{" "}
              <a
                href="mailto:service@masterdecker.com"
                className="font-semibold text-[var(--color-gold-text)] underline"
              >
                Email us
              </a>{" "}
              with your name and approximate order date and we will find you in our system.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
