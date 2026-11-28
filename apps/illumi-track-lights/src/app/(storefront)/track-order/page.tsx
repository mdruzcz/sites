import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TrackOrderForm } from "@/components/track-order-form";
import { photo } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/track-order`;
const TITLE = "Track Your Order";
const DESCRIPTION =
  "Look up an Illumi Track Lights order with your order number and checkout email to see its status, the carrier and tracking number, or whether pickup is ready.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("soffit-lights-installed").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: false, follow: true }
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        compact
        photo="soffit-lights-installed"
        eyebrow="Orders"
        title="Where is my order?"
        intro="Two things find it: the order number from your confirmation email and the email address you checked out with."
        crumbs={[{ label: "Track order" }]}
      />
      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display h2-fluid">Look up an order</h2>
            <div className="mt-5">
              <TrackOrderForm />
            </div>
            <p className="note mt-6">
              <strong>Lost the confirmation email?</strong> <Link href="/contact-us" className="text-link">Send us a message</Link> with your name and roughly when you ordered, and we will find it.
            </p>
          </div>

          <aside>
            <h2 className="eyebrow text-[var(--color-gold-text)]">What to expect</h2>
            <dl className="mt-3 border-t border-[var(--color-border)] text-[0.95rem]">
              {[
                ["Packing", "Orders are packed within one to two business days."],
                ["Shipping", "Free to any address in Canada. The tracking number is emailed when the parcel leaves and shows here as well."],
                ["Pickup", `Chose pickup? Wait for the "ready for pickup" email, usually one to two business days after you order, then collect at ${BRAND.address}. Pickups are by appointment.`],
                ["Something wrong", "If a box arrives damaged or a part is missing, tell us and include a photo."]
              ].map(([k, v]) => (
                <div key={k} className="border-b border-[var(--color-border)] py-3">
                  <dt className="eyebrow text-[var(--color-text-soft)]">{k}</dt>
                  <dd className="mt-0.5 text-[var(--color-text-soft)]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <Link href="/shipping-returns" className="text-link inline-flex min-h-[44px] items-center">Shipping and returns</Link>
              <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[44px] items-center">How pickup works</Link>
              <Link href="/warranty" className="text-link inline-flex min-h-[44px] items-center">Warranty</Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
