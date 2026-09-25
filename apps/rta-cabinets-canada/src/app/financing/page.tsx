import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { KITCHEN_SALE } from "@/lib/sale";
import TrustStrip from "@/components/TrustStrip";
import { FaqList, faqJsonLd } from "@/components/ArticleBody";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "0% APR Kitchen Cabinet Financing",
  description:
    "Finance your White Shaker RTA kitchen at 0% APR on approved credit. Spread a complete kitchen from RTA Cabinets Canada over monthly payments with no interest. Free delivery within 300 km of London, Ontario.",
  alternates: { canonical: "/financing" },
  openGraph: { title: "0% APR Kitchen Cabinet Financing | RTA Cabinets Canada", description: "Spread a complete White Shaker kitchen over monthly payments with no interest, on approved credit." },
  twitter: { card: "summary_large_image", title: "0% APR Kitchen Cabinet Financing", description: "Spread a complete White Shaker kitchen over monthly payments with no interest, on approved credit." },
};

const FAQS = [
  { q: "Who qualifies for 0% APR financing?", a: "Financing is offered on approved credit to Canadian residents 18+ for complete kitchen orders (a kitchen package or a planner design). Approval, term and minimum order are confirmed with your written quote." },
  { q: "Is there really no interest?", a: "Yes — pay the agreed amount on time each month and you pay no interest for the promotional term. Missed or late payments may end the promotional rate; the full terms are provided before you sign anything." },
  { q: "Can I combine financing with the kitchen sale?", a: `Yes. The ${KITCHEN_SALE.pct}% kitchen sale, overstock sale prices and free local delivery all apply to financed orders. The lowest price guarantee applies too.` },
  { q: "How do I apply?", a: "Build your kitchen in the planner or add a package to your quote list, tick that you'd like financing details in the message box, and submit. We reply with your written quote and the financing application together — usually within one business day." },
];

export default function FinancingPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">On approved credit</p>
      <h1 className="text-4xl font-bold mb-4">0% APR Kitchen Cabinet Financing</h1>
      <p className="text-lg text-ink-soft mb-8">
        A new White Shaker kitchen shouldn&rsquo;t have to wait for a lump sum. Finance a complete kitchen from {site.name} at 0% APR on approved credit and pay it off in equal monthly payments — with no interest for the promotional term.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { t: "0% interest", d: "Pay only the price of your cabinets during the promotional term." },
          { t: "Fast decision", d: "Apply with your written quote; most decisions come back the same day." },
          { t: "Sale prices apply", d: `The ${KITCHEN_SALE.pct}% kitchen sale and overstock deals stay on financed orders.` },
        ].map((v) => (
          <div key={v.t} className="rounded-lg border border-border bg-white p-5">
            <p className="font-semibold mb-1">{v.t}</p>
            <p className="text-sm text-ink-soft">{v.d}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">How it works</h2>
      <ol className="list-decimal pl-5 space-y-2 text-ink-soft mb-10">
        <li>Design your kitchen in the free <Link href="/planner" className="text-accent underline">3D Kitchen Planner</Link> or pick a <Link href="/kitchen-packages" className="text-accent underline">kitchen package</Link>.</li>
        <li>Add everything to your quote list and mention financing in the message box.</li>
        <li>We email your written quote (taxes, delivery, assembly if selected) with the financing application.</li>
        <li>Once approved, your cabinets ship — free within {site.freeDeliveryKm} km of London, Ontario.</li>
      </ol>

      <p className="text-sm text-ink-soft mb-10">
        Financing is provided through a third-party lender, subject to credit approval. Terms, minimum purchase and promotional period are disclosed in writing before you commit; nothing on this page is an offer of credit. See our <Link href="/terms-of-service" className="underline">terms of service</Link>.
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
          Start a kitchen in the planner
        </Link>
        <Link href="/request" className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
          Request a quote
        </Link>
      </div>

      <FaqList faqs={FAQS} />
      <TrustStrip compact className="mt-10" />
    </div>
  );
}
