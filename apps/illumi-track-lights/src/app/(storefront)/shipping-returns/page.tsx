import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Shipping & Returns — Free Canadian Shipping Over $500",
  description:
    "Free shipping anywhere in Canada on orders over $500 CAD, same or next business day dispatch from London, Ontario, and full refunds on returns in original packaging.",
  alternates: { canonical: `${SITE_URL}/shipping-returns` },
  openGraph: {
    title: "Shipping & Returns — Free Canadian Shipping Over $500",
    description:
      "Free Canadian shipping over $500, dispatched same or next business day from London, Ontario.",
    url: `${SITE_URL}/shipping-returns`
  }
};

const SECTIONS = [
  {
    heading: "Free shipping",
    body: "Shipping is free on every order over $500 CAD, anywhere in Canada. Orders below that are quoted live at checkout using Canada Post rates for your postal code."
  },
  {
    heading: "Dispatch times",
    body: "We hold the full catalog in stock in London, Ontario. Most orders leave the warehouse the same or next business day. Peak season (October to December) can add a day."
  },
  {
    heading: "Returns policy",
    body: "Products can be returned for a full refund provided all items are in their original packaging and no components are missing from the kit."
  },
  {
    heading: "Return shipping",
    body: "Customers are responsible for return shipping costs. We recommend a trackable shipping method for your own protection."
  },
  {
    heading: "On arrival",
    body: "Please inspect your order when it arrives and contact us promptly if anything is damaged or missing so we can put it right quickly."
  }
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        photo="home-wide"
        photoAlt="Long home elevation lit end to end with permanent LED soffit track lighting"
        eyebrow="Logistics"
        title="Shipping & returns"
        intro="Stocked, packed and shipped from London, Ontario — with free delivery anywhere in Canada on orders over $500."
        crumb="Shipping & returns"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {SECTIONS.map((s) => (
                <div key={s.heading} className="grid gap-3 py-9 md:grid-cols-[minmax(0,200px)_1fr] md:gap-10">
                  <dt className="font-display text-xl">{s.heading}</dt>
                  <dd className="text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{s.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/track-order" className="btn-primary">
                Track your order
              </Link>
              <Link href="/contact-us" className="btn-secondary">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
