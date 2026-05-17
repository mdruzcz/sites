import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Deck Staining Quote",
  description: `Get a free deck staining quote from ${site.name}. Email ${site.email} or fill out our form. Serving ${site.serviceAreas.join(", ")}.`,
};

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Contact", url: `${site.url}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            Ready to transform your deck? Get a free quote — most quotes
            delivered within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-bold text-2xl mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Email</h3>
                    <a href={`mailto:${site.email}`} className="text-[var(--accent)] font-medium hover:underline">
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Hours</h3>
                    <p className="text-stone-600">{site.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Service Areas</h3>
                    <p className="text-stone-600">{site.serviceAreas.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[var(--stone)] rounded-xl">
                <h3 className="font-bold mb-2">What to Expect</h3>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent)]">1.</span> Submit your quote request</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent)]">2.</span> We&apos;ll reply within 24 hours</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent)]">3.</span> Free on-site assessment of your deck</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent)]">4.</span> Detailed quote with no hidden fees</li>
                </ol>
              </div>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
