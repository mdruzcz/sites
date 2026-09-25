import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import TrustStrip from "@/components/TrustStrip";
import { FaqList, faqJsonLd } from "@/components/ArticleBody";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lowest Price Guarantee on RTA Cabinets",
  description:
    "Find the same White Shaker RTA cabinet advertised for less by a Canadian retailer and RTA Cabinets Canada will match it, in Canadian dollars, delivered. How the lowest price guarantee works.",
  alternates: { canonical: "/lowest-price-guarantee" },
  openGraph: { title: "Lowest Price Guarantee | RTA Cabinets Canada", description: "Find the same White Shaker RTA cabinet cheaper in Canada and we match it." },
  twitter: { card: "summary_large_image", title: "Lowest Price Guarantee | RTA Cabinets Canada", description: "Find the same White Shaker RTA cabinet cheaper in Canada and we match it." },
};

const FAQS = [
  { q: "What counts as the same cabinet?", a: "Same nominal size, same construction (solid hardwood doors and face frame, plywood box, soft-close hinges and undermount glides) and a comparable painted white Shaker door. Particleboard boxes, MDF doors or non-soft-close hardware are not the same cabinet." },
  { q: "Do US prices count?", a: "We compare landed Canadian prices. A US listing has to be converted to Canadian dollars and include shipping, duty and brokerage to your address in Canada — once you do that, we're normally well under it, but send it anyway and we'll check." },
  { q: "Does the guarantee apply to sale prices?", a: "Yes. If a competitor's advertised sale price on the same cabinet is lower than our price (sale or regular), we match it. Clearance, floor-model, damaged or auction listings are excluded." },
  { q: "How long do I have?", a: "Send the comparison with your quote request or within 14 days of your written quote. After your order ships, price adjustments are at our discretion." },
];

export default function PriceGuaranteePage() {
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Shop with confidence</p>
      <h1 className="text-4xl font-bold mb-4">Lowest Price Guarantee</h1>
      <p className="text-lg text-ink-soft mb-8">
        We price our White Shaker RTA cabinets to be the best value in Canada — in Canadian dollars, with free delivery within {site.freeDeliveryKm} km of London, Ontario. If you find the same cabinet advertised for less by a Canadian retailer, we&rsquo;ll match it.
      </p>

      <h2 className="text-2xl font-bold mb-3">How to claim it</h2>
      <ol className="list-decimal pl-5 space-y-2 text-ink-soft mb-10">
        <li>Find the lower advertised price on the same cabinet (size, construction and features) from a retailer selling in Canada.</li>
        <li>Paste the link — or attach a screenshot — in the message box when you <Link href="/request" className="text-accent underline">request your quote</Link>, or email it to <a href={`mailto:${site.email}`} className="text-accent underline">{site.email}</a>.</li>
        <li>We verify it and match the delivered Canadian price on your written quote. No haggling, no forms.</li>
      </ol>

      <div className="rounded-lg border border-border bg-sand p-5 text-sm text-ink-soft mb-10">
        <p className="font-semibold text-ink mb-1">Why we can do this</p>
        <p>We import container loads directly and sell online from a warehouse in London, Ontario — no showroom overhead, no middle distributor, no US-dollar surprises. Most competing “RTA cabinet” prices you&rsquo;ll see online are in US dollars before shipping and duty; converted and landed in Canada they are usually 20–40% above ours.</p>
      </div>

      <FaqList faqs={FAQS} />
      <TrustStrip compact className="mt-10" />
    </div>
  );
}
