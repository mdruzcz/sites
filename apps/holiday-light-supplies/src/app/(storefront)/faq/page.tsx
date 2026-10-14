import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList, faqLd, breadcrumbLd } from "@/components/ui";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ — Ordering, Shipping, Specs & Warranty",
  description: "Answers on how to order commercial Christmas lights from Holiday Light Supplies: quotes, volume pricing, net-30, shipping across Canada, 3D display specs, C9 bulb math and warranty.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: { title: "FAQ | Holiday Light Supplies", url: `${SITE_URL}/faq` }
};

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Ordering & pricing",
    items: [
      { q: "How do I order if there is no online checkout?", a: "Add products to your quote list and submit it with your delivery address, or send us a list. We email a line-item quote with shipping and timeline within one business day. Approve it and we ship. Nothing is charged until you approve." },
      { q: "Do you sell wholesale?", a: "Yes. Installers, property managers, malls, BIAs and municipalities get volume pricing on case and contract orders. Quantity is priced on the quote; there is no minimum to start." },
      { q: "What are the payment options?", a: "Card or e-transfer on approval of the quote. Verified public-sector accounts (municipalities, BIAs, school boards) can use net-30 purchase-order invoicing and tax-exempt handling." },
      { q: "Can you respond to a tender or RFP?", a: "Yes. Send the document and we return line-item pricing with specifications, warranty and delivery windows in the format the tender asks for." },
      { q: "Is the FIRST10 code real?", a: "Yes. Enter it in the notes when you submit your first inquiry and we take 10% off the product subtotal on that quote. It cannot be combined with installer or public-sector pricing." }
    ]
  },
  {
    title: "Shipping & lead times",
    items: [
      { q: "Where do orders ship from?", a: "Our warehouse in London, Ontario. Pickup is available by arrangement." },
      { q: "How much is shipping?", a: "Courier orders over $150 ship free within Canada. Displays, trees and pallet orders ship freight and are quoted per order so you pay the actual cost to your address." },
      { q: "How long does delivery take?", a: "In-stock bulbs, spools and accessories ship in one to two business days and arrive in two to five days within Ontario. Displays and made-to-order trees carry two to six week lead times plus freight; we confirm on the quote." },
      { q: "Do you ship outside Canada?", a: "We ship within Canada. Large US orders can be arranged by request." }
    ]
  },
  {
    title: "Product specs",
    items: [
      { q: "What is the difference between C7 and C9 bulbs?", a: "C7 bulbs use an E12 candelabra base; C9 bulbs use the larger E17 intermediate base. C9 is brighter and the standard for rooflines and commercial runs." },
      { q: "How many C9 bulbs do I need?", a: "One per foot. Our socket spools are 12-inch spacing, so a 100 ft run needs 100 bulbs, or four 25-packs." },
      { q: "Are the 3D displays rated for Canadian winters?", a: "Yes. Aluminum frames, LED netting, 24V low-voltage wiring through weatherproof transformers and an IP44 rating. LEDs are rated to −40°C." },
      { q: "What power do the 3D displays need?", a: "A standard 120V outlet feeding the supplied 24V transformer. Most pieces draw well under 300 W; the spec sheet on each product lists watts and transformer size." },
      { q: "How long do the LEDs last?", a: "Our LED bulbs and netting are rated for 25,000+ hours, which is decades of holiday seasons at typical use." }
    ]
  },
  {
    title: "Warranty & returns",
    items: [
      { q: "What is the warranty?", a: "Five years against manufacturing defects on LED lighting product. Damage from improper installation, electrical surges or normal wear is not covered. See the warranty page for details." },
      { q: "Can I return an order?", a: "Unused product in original packaging can be returned within 30 days for a refund of the product cost; return shipping is the customer's responsibility. Made-to-order displays and trees are not returnable." },
      { q: "Can I get replacement parts later?", a: "Yes. LED netting, transformers, bulbs and connectors are available for the displays we sell. Keep your quote number and we match the parts." }
    ]
  }
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.items);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(all)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "FAQ" }])) }} />
      <PageHero photo="lobby-atrium-tree" eyebrow="FAQ" title="Ordering, shipping, specs and warranty." intro="If it isn't here, ask us and we'll add it." crumbs={[{ label: "FAQ" }]} compact />
      <div className="shell section grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {GROUPS.map((g) => (
              <li key={g.title}>
                <a href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="chip min-h-[38px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">{g.title}</a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            Still stuck? <Link href="/contact-us" className="font-semibold text-[var(--color-brand)] hover:underline">Contact us</Link>.
          </p>
        </nav>
        <div className="space-y-12">
          {GROUPS.map((g) => (
            <section key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl">{g.title}</h2>
              <div className="mt-5">
                <FaqList items={g.items} />
              </div>
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
