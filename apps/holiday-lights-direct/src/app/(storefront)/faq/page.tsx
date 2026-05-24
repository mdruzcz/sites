export const metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Do you offer installation services?",
    a: "Yes! We offer professional installation services for residential and commercial properties. Contact us for a quote."
  },
  {
    q: "What is the difference between C7 and C9 bulbs?",
    a: "C7 bulbs use an E12 (candelabra) base; C9 bulbs use the larger E17 (intermediate) base. C9 bulbs are brighter and more popular for residential rooflines."
  },
  {
    q: "Are your LED lights weather-resistant?",
    a: "All of our LED light strands and permanent LED housing systems are designed for year-round outdoor use, with sealed sockets and weatherproof connectors."
  },
  {
    q: "How long do your LED bulbs last?",
    a: "Our LED bulbs are rated for 25,000+ hours of use — that&rsquo;s decades of holiday seasons with typical usage."
  },
  {
    q: "Do you ship to the United States?",
    a: "Currently we ship within Canada only. Contact us for special arrangements for large US orders."
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
      <h1 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h1>
      <dl className="mt-8 space-y-6">
        {faqs.map((f, i) => (
          <div key={i}>
            <dt className="text-base font-semibold">{f.q}</dt>
            <dd className="mt-1 text-sm text-slate-700">{f.a}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
