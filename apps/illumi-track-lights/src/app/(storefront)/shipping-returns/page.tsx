import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BRAND, SITE_URL } from "@/lib/utils";

const URL = `${SITE_URL}/shipping-returns`;
const DESCRIPTION =
  "Every Illumi Track Lights order ships free anywhere in Canada, with no minimum. Free pickup in Woodstock, Ontario. Orders packed in 1 to 2 business days.";

export const metadata: Metadata = {
  title: "Free Shipping, Pickup & Returns",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "Free Shipping, Woodstock Pickup & Returns | Illumi Track Lights", description: DESCRIPTION, url: URL, images: ["/images/photos/soffit-lights-installed.webp"] },
  twitter: { card: "summary_large_image", title: "Free Shipping, Woodstock Pickup & Returns", description: DESCRIPTION }
};

const FAQ: { q: string; a: string }[] = [
  { q: "Is there a minimum order for free shipping?", a: "No. Every order ships free to any address in Canada, whether it is a 250 ft kit or a single connector." },
  { q: "Do you charge extra for remote or northern postal codes?", a: "No. Shipping is free to every Canadian postal code, including the territories. Delivery takes longer to remote addresses." },
  { q: "Can I pick up my order instead?", a: `Yes. Choose pickup at checkout and collect your order at ${BRAND.address} after we email you that it is ready. Pickup is free and by appointment.` },
  { q: "Do you ship to the United States?", a: "Not at the moment. We ship within Canada only." },
  { q: "How long do I have to return something?", a: "Thirty days from delivery or pickup, for unused items in their original packaging. Kits must come back complete. Return shipping is paid by the customer." }
];

export default function ShippingReturnsPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero compact photo="soffit-lights-installed" eyebrow="Shipping, pickup & returns" title="Every order ships free." intro="Anywhere in Canada, with no minimum and nothing added at checkout but tax. Or collect it yourself in Woodstock." crumbs={[{ label: "Shipping & pickup" }]} />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 max-w-[70ch]">
            <div className="space-y-4 text-[1.0625rem] text-[var(--color-text-soft)]">
              <p><strong className="text-[var(--color-text)]">Short answer:</strong> shipping is free on everything we sell, to any Canadian address. Pickup in Woodstock is free too.</p>
              <p><strong className="text-[var(--color-text)]">Long answer:</strong> there is no minimum order, no flat rate and no distance rule. A full kit ships free. One replacement connector ships free. The price on the product page plus GST or HST for your province is what you pay.</p>
            </div>

            <h2 className="font-display mt-11 text-[1.6rem]">Shipping</h2>
            <div className="mt-3 space-y-4 text-[var(--color-text-soft)]">
              <p>Orders are packed at our shop in Woodstock, Ontario. Orders placed before noon Eastern usually leave the same or the next business day, and everything else within two business days. We email the tracking number when it leaves.</p>
              <div className="overflow-x-auto border border-[var(--color-border)]">
                <table className="table-clean min-w-[26rem]">
                  <thead>
                    <tr><th scope="col">Going to</th><th scope="col">Shipping</th><th scope="col">Usual time in transit</th></tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row" className="font-semibold">Ontario and Quebec</th><td>Free</td><td>2 to 4 business days</td></tr>
                    <tr><th scope="row" className="font-semibold">Atlantic, Prairies and BC</th><td>Free</td><td>4 to 8 business days</td></tr>
                    <tr><th scope="row" className="font-semibold">Territories and remote areas</th><td>Free</td><td>Longer. We confirm by email.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Kits ship in one or two boxes depending on size. The track travels in a rigid carton, and the lights, controller and connectors are in the same shipment.</p>
            </div>

            <h2 id="pickup" className="font-display mt-11 scroll-mt-28 text-[1.6rem]">Pickup in Woodstock</h2>
            <div className="mt-3 space-y-4 text-[var(--color-text-soft)]">
              <p>If you are within a drive of Woodstock, you can collect your order and have it the day it is ready. Pickup is free.</p>
              <ol className="ml-5 list-decimal space-y-2 marker:font-semibold marker:text-[var(--color-ink)]">
                <li className="pl-1">At checkout, choose <strong className="text-[var(--color-text)]">Pick it up in Woodstock</strong>. You will not be asked for a delivery address.</li>
                <li className="pl-1">Wait for our &ldquo;ready for pickup&rdquo; email. It usually arrives within one to two business days and tells you how to arrange a time.</li>
                <li className="pl-1">Come to <strong className="text-[var(--color-text)]">{BRAND.address}</strong> with the email or your order number.</li>
              </ol>
              <p className="note">
                <strong>Please do not drive over before the email arrives.</strong> Pickups are by appointment, and your order may not be packed yet. Pickup orders are charged Ontario HST, since the goods change hands in Ontario.
              </p>
              <p><a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">Open the address in Google Maps</a></p>
            </div>

            <h2 className="font-display mt-11 text-[1.6rem]">Before you order: a checklist</h2>
            <div className="mt-3 space-y-3 text-[var(--color-text-soft)]">
              <p>Shipping is free, but a second order still costs you a week. Four things to check first:</p>
              <ul className="ml-5 list-disc space-y-2 marker:text-[var(--color-gold)]">
                <li className="pl-1"><strong className="text-[var(--color-text)]">Footage.</strong> Add up every edge you want lit and round up to the next kit. <Link href="/diy-kits" className="text-link">Compare the kits</Link>.</li>
                <li className="pl-1"><strong className="text-[var(--color-text)]">Track colour.</strong> Black, white, wicker or brown. Hold a paint chip to your soffit in daylight.</li>
                <li className="pl-1"><strong className="text-[var(--color-text)]">The outlet.</strong> The power supply plugs into an outdoor GFCI outlet. If the nearest one is far from where the lights start, add a longer extension connector.</li>
                <li className="pl-1"><strong className="text-[var(--color-text)]">Gaps.</strong> Count the breaks in your roofline, such as a garage door header you are skipping, and check the kit has an extension long enough for each.</li>
              </ul>
              <p>Not sure? <Link href="/contact-us" className="text-link">Send us your measurements</Link> and we will check the list for you.</p>
            </div>

            <h2 className="font-display mt-11 text-[1.6rem]">Returns</h2>
            <div className="mt-3 space-y-4 text-[var(--color-text-soft)]">
              <p>Unused items in their original packaging can be returned within 30 days of delivery or pickup for a full refund of the product price. Kits must come back complete, with every component. Return shipping is paid by the customer, and we recommend a tracked service.</p>
              <p>Controllers and power supplies that have been opened and powered up are exchanged under <Link href="/warranty" className="text-link">warranty</Link> instead of refunded.</p>
            </div>

            <h2 className="font-display mt-11 text-[1.6rem]">Damaged or missing items</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">Open the boxes and check the contents when they arrive. If anything is damaged or missing, email a photo to <a href={`mailto:${BRAND.email}`} className="text-link">{BRAND.email}</a> within seven days and we ship the replacement right away.</p>

            <h2 className="font-display mt-11 text-[1.6rem]">Outside Canada</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">We do not ship to the United States at the moment. For larger commercial orders, <Link href="/contact-us" className="text-link">contact us</Link>.</p>

            <h2 className="font-display mt-11 text-[1.6rem]">Questions people ask</h2>
            <div className="mt-4 border-t border-[var(--color-border-strong)]">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-[var(--color-border-strong)]">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-[var(--color-ink)]">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-6 leading-relaxed text-[var(--color-text-soft)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="border border-[var(--color-border)] p-5">
              <p className="eyebrow text-[var(--color-gold-text)]">At a glance</p>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-[var(--color-text-soft)]">
                <li><strong className="text-[var(--color-text)]">Shipping:</strong> free, every order, all of Canada</li>
                <li><strong className="text-[var(--color-text)]">Pickup:</strong> free, Woodstock, by appointment</li>
                <li><strong className="text-[var(--color-text)]">Packed in:</strong> 1 to 2 business days</li>
                <li><strong className="text-[var(--color-text)]">Returns:</strong> 30 days, unused</li>
              </ul>
            </div>
            <div className="border border-[var(--color-border)] p-5">
              <p className="eyebrow text-[var(--color-gold-text)]">Pickup address</p>
              <address className="font-display mt-2 text-[1.15rem] not-italic leading-snug">
                {BRAND.street}
                <br />
                {BRAND.city}, {BRAND.regionCode} {BRAND.postal}
              </address>
            </div>
            <Link href="/track-order" className="btn-primary w-full">Track an order</Link>
            <Link href="/warranty" className="btn-secondary w-full">Warranty</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
