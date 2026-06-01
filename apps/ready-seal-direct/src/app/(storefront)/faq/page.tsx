export const metadata = {
  title: "FAQ — Ready Seal Wood Stain & Sealer",
  description:
    "Common questions about Ready Seal oil-based wood stain & sealer: application, coverage, drying, colors, shipping across Ontario, and contractor pricing."
};

const faqs = [
  {
    q: "How do I apply Ready Seal?",
    a: "Apply one coat to clean, bare wood using a sprayer, roller, or brush. There's no primer, no back-brushing, no wet-line, and no thinning required — it blends itself and won't leave laps, runs, or streaks. You can apply it in any temperature."
  },
  {
    q: "How much Ready Seal do I need?",
    a: "Ready Seal covers roughly 125 sq ft per gallon on smooth wood and about 100 sq ft per gallon on rough or weathered wood. Use our stain calculator to estimate gallons for your deck or fence."
  },
  {
    q: "Why does the color look different when I first apply it?",
    a: "Ready Seal is darkest when first applied and reaches its true color in approximately 14 days as it cures. Give it about two weeks before judging the final shade."
  },
  {
    q: "Can I apply Ready Seal over paint or an existing stain?",
    a: "No. Ready Seal penetrates the wood, so it must go on bare, unsealed wood. Painted or previously sealed surfaces inhibit penetration. Strip or fully weather old finishes first."
  },
  {
    q: "Is Ready Seal safe and VOC compliant?",
    a: "Yes. Ready Seal is VOC compliant with under 250 grams/litre of volatile organic compounds, and it's biodegradable. Always dispose of it according to local, provincial, and federal laws."
  },
  {
    q: "Where do you ship?",
    a: "Online orders currently ship within Ontario, with free shipping on orders over $750. If you're outside Ontario, send us a message and we'll reply with a shipping quote for your province, usually within one business day."
  },
  {
    q: "Do you offer contractor or bulk pricing?",
    a: "Yes. Deck stainers, fence builders, painters, and property managers can apply for our contractor program to get special freight pricing on full-skid quantities. Visit the Contractor Program page to apply."
  }
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow text-[var(--color-brand)]">Ready Seal answers</p>
      <h1 className="font-display mt-2 text-3xl md:text-4xl">Frequently asked questions</h1>
      <dl className="mt-8 space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <dt className="text-base font-semibold">{f.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-700">{f.a}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
