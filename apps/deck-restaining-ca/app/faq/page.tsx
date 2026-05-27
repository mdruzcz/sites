import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ | Deck Staining Questions Answered",
  description: `Common questions about deck staining, oil vs water-based stains, prep, timelines, and pricing — answered by ${site.name}.`,
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    category: "Stain & Products",
    questions: [
      { question: "Why do you only use oil-based stains?", answer: "Oil-based stains penetrate deep into wood fibres, creating a bond at the molecular level. Water-based stains sit on the surface like paint and inevitably peel, crack, and flake — often within 1–2 years. Our oil-based products flex with the wood through freeze-thaw cycles and wear away gradually over 3–5 years without any peeling." },
      { question: "Do you use oil or water based stains?", answer: "Exclusively oil-based. We've seen too many decks ruined by water-based products that peel within a year. Oil-based stains cost more and take longer to apply, but the results speak for themselves — 3–5 years of protection with zero peeling." },
      { question: "What stain colours do you offer?", answer: "We offer a range of semi-transparent and solid oil-based stain colours including Natural Cedar, Dark Walnut, Honey Gold, Mahogany, and Driftwood Grey. We can also custom-match colours. During your free quote, we'll bring colour samples so you can see them on your actual wood." },
      { question: "Are your products environmentally friendly?", answer: "Yes. We use premium low-VOC oil-based stains that meet all Canadian environmental regulations. They're safe for families, pets, and gardens once cured (typically 24–48 hours after application)." },
      { question: "Can you stain over existing stain?", answer: "It depends on the condition. If your existing stain is oil-based and still in reasonable shape, we can often apply a fresh coat after proper cleaning and light sanding. If it's water-based or peeling, we need to strip it completely first — which is included in our restoration service." },
    ],
  },
  {
    category: "Process & Timeline",
    questions: [
      { question: "How long does a typical deck staining project take?", answer: "Most projects take 2–3 days. Day 1: stripping and cleaning. Day 2: sanding and first coat. Day 3: second coat and touch-ups (if needed). Larger decks or full restorations may take 3–4 days. We'll give you an exact timeline during your free quote." },
      { question: "What's the best time of year to stain a deck?", answer: "Late spring through early fall (May–October) when temperatures are consistently above 10°C and rain isn't in the forecast for 48 hours after application. We monitor weather closely and will reschedule if conditions aren't ideal — we never apply stain in risky weather." },
      { question: "Why can't you just pressure wash and stain?", answer: "Pressure washing alone doesn't remove failed coatings, and it can damage wood fibres if done improperly. Our process uses chemical stripping to dissolve old finishes, followed by controlled power washing, then professional sanding. This proper prep is why our stain jobs last 3–5 years while DIY pressure-wash-and-stain jobs often fail within one season." },
    ],
  },
  {
    category: "Pricing & Warranty",
    questions: [
      { question: "How much does deck staining cost?", answer: "Pricing depends on deck size, condition, and whether stripping is needed. A typical 200–300 sq ft deck restaining runs $1,200–$2,500. Full restorations (strip + sand + stain) run $2,000–$3,500+. Fence staining starts at $800. Every quote is free, on-site, and includes a detailed breakdown with no hidden fees." },
      { question: "Do you offer warranties on your work?", answer: "Yes. We stand behind every project with a workmanship guarantee. If your stain peels, cracks, or flakes within the first year due to our application, we'll fix it at no cost. Our oil-based stains typically last 3–5 years before needing a maintenance coat." },
      { question: "Do you offer free quotes?", answer: "Absolutely. Every quote is free, on-site, and no-obligation. We assess your deck's condition in person, discuss your colour preferences, and provide a written quote within 24 hours. No pressure, no gimmicks." },
    ],
  },
  {
    category: "General",
    questions: [
      { question: "What areas do you serve?", answer: "We serve Oakville, Burlington, Milton, Mississauga, Hamilton, and surrounding communities in the Halton Region and western GTA. If you're unsure whether you're in our service area, just ask — we'll let you know." },
      { question: "How long does deck staining last?", answer: "With our oil-based products and proper prep, expect 3–5 years before you need a maintenance coat. The stain wears away gradually and evenly — it won't peel or flake. When it's time for a refresh, the prep work is much simpler since there's no failed coating to strip." },
      { question: "Do I need to be home during the work?", answer: "Not necessarily. As long as we have access to the deck area and a water source, we can work while you're away. We'll communicate progress via text/email and do a final walkthrough with you when the project is complete." },
    ],
  },
];

export default function FaqPage() {
  const allQuestions = faqs.flatMap((cat) => cat.questions);
  const schema = faqSchema(allQuestions);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            Everything you need to know about our deck and fence staining services.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="h-display text-2xl text-stone-900 mb-6 pb-2 border-b border-[var(--border)]">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-bold text-lg text-stone-900 mb-2">{faq.question}</h3>
                    <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
