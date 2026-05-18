import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Pressure Washing Quote",
  description: `Get a free pressure washing quote from ${site.name}. Call ${site.phone} or fill out our form. Serving London, St. Thomas, Woodstock, Brantford, and Cambridge.`,
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

      <section className="relative overflow-hidden">
        <Image
          src="/images/hero-pressure-washing.jpg"
          alt="Spotless Property Cleaning team ready for a pressure washing project in London, Ontario"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Ready for a spotless property? Get a free on-site estimate
            and no-obligation quote — most quotes delivered within 24 hours.
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
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <a href={site.phoneHref} className="text-[var(--accent-700)] font-medium hover:underline">
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <a href={`mailto:${site.email}`} className="text-[var(--accent-700)] font-medium hover:underline">
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Hours</h3>
                    <p className="text-slate-600">{site.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--accent-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Service Areas</h3>
                    <p className="text-slate-600">{site.serviceAreas.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[var(--surface)] rounded-xl">
                <h3 className="font-bold mb-2">What to Expect</h3>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent-700)]">1.</span> Submit your quote request</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent-700)]">2.</span> We&apos;ll call within 24 hours to discuss</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent-700)]">3.</span> Free on-site inspection and assessment</li>
                  <li className="flex gap-2"><span className="font-bold text-[var(--accent-700)]">4.</span> Detailed quote with no hidden fees</li>
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
