import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate FAQ — Common Questions About Buying & Selling",
  description:
    "Answers to common real estate questions for buyers, sellers, and investors in London, Ontario and surrounding areas. Honest guidance from Matt Druzcz, Realtor.",
  openGraph: {
    title: "Real Estate FAQ — Matt Druzcz, London Ontario",
    description:
      "Clear, honest answers to your most common real estate questions — buying, selling, investing, and working with a realtor.",
  },
};

const faqs = [
  {
    category: "Selling Your Home",
    questions: [
      {
        q: "How do I know what my home is worth?",
        a: "Matt provides a free Comparative Market Analysis (CMA) based on recent sales of similar homes in your area. He'll give you an honest number — not an inflated estimate to win your listing.",
      },
      {
        q: "How long will it take to sell my home?",
        a: "Depends on pricing, condition, and the market. A well-priced, well-presented home in London or St. Thomas often receives offers within 1–2 weeks. Matt will give you realistic expectations up front.",
      },
      {
        q: "Do I need to renovate before selling?",
        a: "Not always. Matt's contractor background lets him identify what actually moves the needle vs. what's unnecessary spend. Often, strategic staging and minor fixes outperform costly renovations on ROI.",
      },
      {
        q: "What does it cost to sell my home?",
        a: "Typical seller costs include realtor commission, legal fees, and any agreed adjustments on closing. Matt walks you through the full net proceeds picture before you list so there are no surprises.",
      },
      {
        q: "What if my home needs significant repairs?",
        a: "Matt can help you decide whether to fix, price accordingly, or disclose and negotiate. His contractor network means he can get you accurate quotes quickly — and coordinate the work if needed.",
      },
    ],
  },
  {
    category: "Buying a Home",
    questions: [
      {
        q: "Should I get pre-approved before looking at homes?",
        a: "Yes — always. Pre-approval tells you your real budget, makes your offers competitive, and saves everyone time. Matt can connect you with trusted mortgage professionals if you need one.",
      },
      {
        q: "What's the difference between pre-qualification and pre-approval?",
        a: "Pre-qualification is a rough estimate based on self-reported information. Pre-approval involves a full application and credit check — it carries real weight with sellers. You want pre-approval.",
      },
      {
        q: "How much do I need for a down payment?",
        a: "In Canada, the minimum is 5% for homes under $500K. Between $500K–$999K, it's 5% on the first $500K and 10% above that. At $1M+, you need 20%. Matt can connect you with mortgage advice tailored to your situation.",
      },
      {
        q: "What are closing costs?",
        a: "Typically 1.5–4% of the purchase price. This includes land transfer tax, legal fees, title insurance, and any adjustments. Matt walks every buyer through this in detail before they make an offer.",
      },
      {
        q: "How does a home inspection work?",
        a: "You hire a licensed home inspector to assess the property's condition before finalizing your purchase. Matt recommends trusted inspectors and reviews the findings with you — his contractor experience helps him interpret what's serious and what's routine.",
      },
    ],
  },
  {
    category: "Investment Properties",
    questions: [
      {
        q: "What is an ARV and why does it matter for flipping?",
        a: "ARV stands for After Repair Value — what the property will be worth once renovated. For flipping to work, you need to buy low enough that the ARV minus renovation costs minus purchase price leaves a healthy profit margin. Matt calculates this before every offer.",
      },
      {
        q: "What is the BRRRR strategy?",
        a: "BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. You buy a distressed property, renovate it, rent it out, refinance based on the new appraised value, and pull your equity out to buy the next one. Matt has personal experience executing this strategy.",
      },
      {
        q: "What makes a good rental property?",
        a: "Location (proximity to employers, schools, transit), condition, and the numbers. Gross yield, net cash flow after expenses, and cap rate are the key metrics. Matt helps you run these properly — not just the optimistic version.",
      },
      {
        q: "Should I buy single-family or multi-family for rental income?",
        a: "Both have merit. Single-family is simpler to manage and finance. Multi-family often produces better yield but requires more oversight. The right choice depends on your goals, capital, and risk tolerance — Matt can model both for you.",
      },
      {
        q: "Are there good investment markets near London?",
        a: "Absolutely. St. Thomas has exceptional growth potential ahead of the VW plant. Aylmer offers affordable entry points. Woodstock has strong cap rates. Matt knows all these markets and can identify where the numbers work best for your investment strategy.",
      },
    ],
  },
  {
    category: "Working With Matt",
    questions: [
      {
        q: "Do buyers have to pay Matt's commission?",
        a: "In Ontario, the seller typically pays both the listing and buyer agent commissions. As a buyer, you generally receive Matt's representation at no direct cost to you.",
      },
      {
        q: "Will I work directly with Matt or be passed to an assistant?",
        a: "You work directly with Matt — from the first call to the final signature. No assistants, no hand-offs. He handles every aspect of your transaction personally.",
      },
      {
        q: "How quickly does Matt respond?",
        a: "Matt is responsive and communicates proactively. You'll hear from him directly — not through a coordinator. For urgent matters (offers, inspection issues), he's reachable by phone.",
      },
      {
        q: "What areas does Matt serve?",
        a: "Matt primarily serves London, Aylmer, St. Thomas, Woodstock, and surrounding Elgin and Oxford County communities. He also lives in Belmont, giving him personal knowledge of the rural market east of London.",
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap(cat =>
      cat.questions.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 50% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto px-6 relative text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>FAQ</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Common Real Estate Questions
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--cream-muted)" }}>
            Straight answers to what buyers, sellers, and investors ask most — no jargon, no spin.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {faqs.map(cat => (
            <div key={cat.category}>
              <h2 className="font-serif text-2xl font-bold mb-8 pb-4" style={{ color: "var(--gold)", borderBottom: "1px solid var(--navy-border)" }}>
                {cat.category}
              </h2>
              <div className="space-y-6">
                {cat.questions.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl" style={{ background: "var(--navy-card)", border: "1px solid var(--navy-border)" }}>
                    <h3 className="font-serif text-lg font-bold mb-3" style={{ color: "var(--cream)" }}>{faq.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Have a question not listed here?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            Reach out — Matt gives straightforward answers, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}>
              Ask Matt Directly
            </Link>
            <a href="tel:+15198786735" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}>
              (519) 878-6735
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
