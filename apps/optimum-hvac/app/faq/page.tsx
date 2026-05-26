import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getFaqs } from "@/lib/content";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "HVAC FAQ | Common Questions Answered | Oxford County",
  description: `Answers to common HVAC questions for Oxford County homeowners. Furnace, heat pumps, AC, rebates, maintenance, and emergency service — answered by ${site.name}.`,
};

export const revalidate = 3600;

const categories = ["Furnace", "Heat Pumps", "Air Conditioning", "Emergency", "Maintenance", "Indoor Air Quality", "Financing"];

export default function FaqPage() {
  const faqs = getFaqs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "FAQ", url: `${site.url}/faq` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">Frequently Asked Questions</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">HVAC Questions Answered</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Common questions from Oxford County homeowners about furnaces, heat pumps, AC, rebates, and more.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter((f) => f.category === category);
            if (!categoryFaqs.length) return null;
            return (
              <div key={category} className="mb-12">
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4 pb-2 border-b border-[var(--border)]">
                  {category}
                </h2>
                <div className="space-y-4">
                  {categoryFaqs.map((faq) => (
                    <div key={faq.question} className="card p-5 corner-accent">
                      <h3 className="font-bold text-[var(--navy)] mb-2">{faq.question}</h3>
                      <p className="text-[var(--slate)] text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="card p-8 text-center bg-[var(--surface)]">
            <h2 className="text-xl font-extrabold text-[var(--navy)] mb-2">Have a Different Question?</h2>
            <p className="text-[var(--slate)] mb-6">
              Our team is happy to answer any HVAC question. Call or request a free quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
              <Link href="/contact" className="btn btn-outline">Get a Free Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
