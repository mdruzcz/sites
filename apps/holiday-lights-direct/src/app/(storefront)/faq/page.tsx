import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "FAQ — Permanent LED & Christmas Lighting Questions",
  description:
    "Answers on C7 vs C9 bulbs, LED lifespan, weather resistance, installation and Canadian shipping for permanent LED and Christmas lighting from Holiday Lights Direct.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ — Permanent LED & Christmas Lighting Questions",
    description:
      "Answers on bulb types, LED lifespan, weatherproofing, installation and Canadian shipping.",
    url: `${SITE_URL}/faq`
  }
};

const FAQS = [
  {
    q: "Do you offer installation services?",
    a: "Yes. We offer professional installation for residential and commercial properties. Contact us for a quote, or hand the kit to your own installer — everything needed is in the box."
  },
  {
    q: "What is the difference between C7 and C9 bulbs?",
    a: "C7 bulbs use an E12 (candelabra) base; C9 bulbs use the larger E17 (intermediate) base. C9 bulbs are brighter and are the more popular choice for residential rooflines."
  },
  {
    q: "Are your LED lights weather-resistant?",
    a: "Yes. All of our LED light strands and permanent LED housing systems are designed for year-round outdoor use, with sealed sockets and weatherproof connectors. The permanent system is rated IP68 and tested to −40°C."
  },
  {
    q: "How long do your LED bulbs last?",
    a: "Our LED bulbs are rated for 25,000+ hours of use, and the permanent LED pucks for 50,000 hours — decades of holiday seasons at typical usage."
  },
  {
    q: "Do you ship to the United States?",
    a: "Currently we ship within Canada only. Contact us for special arrangements on large US orders."
  }
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="home-cottage-evening"
        photoAlt="Cottage lit at dusk with warm permanent LED lighting along the eaves"
        eyebrow="Answers"
        title="Frequently asked questions"
        intro="The things customers ask us most about permanent LED systems, C9 bulbs and shipping across Canada."
        crumb="FAQ"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {FAQS.map((f) => (
                <div key={f.q} className="py-9">
                  <dt className="font-display text-xl md:text-2xl">{f.q}</dt>
                  <dd className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-9 text-center md:p-12">
              <h2 className="font-display text-2xl">Still have a question?</h2>
              <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                We answer the phone and the inbox from London, Ontario. Ask us anything before you order.
              </p>
              <Link href="/contact-us" className="btn-primary mt-8">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
