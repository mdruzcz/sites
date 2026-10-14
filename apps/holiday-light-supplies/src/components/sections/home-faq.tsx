import Link from "next/link";
import { FaqList, faqLd } from "@/components/ui";

export const HOME_FAQ = [
  {
    q: "Do you sell wholesale or only retail?",
    a: "Both. Anyone can order from the catalog, and businesses, installers, BIAs and municipalities get volume pricing on case and contract orders. Submit an inquiry or request a quote and we price it for your volume."
  },
  {
    q: "How does ordering work if there is no online checkout?",
    a: "Add products to your quote list and submit it with your delivery address, or send us a list. We email a line-item quote with shipping and timeline within one business day. Approve it and we ship. Nothing is charged until you approve."
  },
  {
    q: "Can a municipality or BIA pay by purchase order?",
    a: "Yes. Public-sector buyers can be set up for net-30 PO invoicing and tax-exempt handling, and we format quotes for tenders and RFPs with line items, specs and lead times."
  },
  {
    q: "Where do orders ship from and how long do they take?",
    a: "Everything ships from our warehouse in London, Ontario. Bulbs, spools and accessories go by courier and typically arrive in two to five business days in Ontario. Displays and trees ship freight and are quoted per order."
  },
  {
    q: "Are the 3D displays rated for Canadian winters?",
    a: "Yes. They use aluminum frames with LED netting, run on 24V low voltage through a weatherproof transformer, and are IP44 rated for outdoor use. The LEDs are rated to −40°C."
  }
];

export function HomeFaq() {
  return (
    <section className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(HOME_FAQ)) }} />
      <div className="shell section grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Good to know</p>
          <h2 className="font-display h2-fluid mt-4">Questions buyers ask before their first order.</h2>
          <p className="mt-4 text-[var(--color-muted)]">Everything else is on the FAQ page, or ask us directly.</p>
          <Link href="/faq" className="btn-secondary mt-6">Read the full FAQ</Link>
        </div>
        <FaqList items={HOME_FAQ} />
      </div>
    </section>
  );
}
