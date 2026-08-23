import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { faqs, faqsByCategory } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "FAQ — Commercial Christmas Decor & Installation";
const DESCRIPTION =
  "Booking lead times, wreath and mega tree sizing, insurance and WSIB, in-season maintenance, takedown and storage, and why commercial holiday decor is quoted per property.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/faq` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/faq` }
};

export default function FaqPage() {
  const groups = faqsByCategory();
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="wreath-building-front"
        photoAlt="Decorated commercial wreath mounted on a stone building facade"
        eyebrow="Answers"
        title="Frequently asked questions"
        intro="Lead times, sizing, insurance and what a commercial contract actually covers."
        crumb="FAQ"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl space-y-16">
            {groups.map((g) => (
              <div key={g.category}>
                <h2 className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">{g.category}</h2>
                <dl className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                  {g.items.map((f) => (
                    <div key={f.q} className="py-8">
                      <dt className="font-display text-lg md:text-xl">{f.q}</dt>
                      <dd className="mt-3.5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-9 text-center md:p-12">
              <h2 className="font-display text-2xl">Still have a question?</h2>
              <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                Call us or send the property details and we will tell you straight away whether it is
                something we can do this season.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/quote" className="btn-primary">{site.quote.cta}</Link>
                <a href={site.phoneHref} className="btn-secondary">Call {site.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
