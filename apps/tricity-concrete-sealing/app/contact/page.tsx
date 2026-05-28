import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Concrete Sealing Quote",
  description:
    "Get a free, no-obligation concrete sealing quote from TriCity Concrete Sealing. We serve London, Woodstock, Brantford, and all of SW Ontario. Reply within 4 business hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--navy)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Reach Out</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Get a Free Quote
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Tell us about your project and we&apos;ll respond within {site.responseTime} with pricing and availability.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-bold text-xl text-[var(--navy)] mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Email</p>
                      <a href={site.emailHref} className="text-[var(--navy)] font-medium hover:text-[var(--accent)] transition-colors text-sm">
                        {site.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Business Hours</p>
                      <p className="text-[var(--navy)] text-sm">{site.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Service Area</p>
                      <p className="text-[var(--navy)] text-sm">London, ON &amp; all of Southwestern Ontario</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-5">
                <p className="font-bold text-[var(--navy)] mb-2">What to Expect</p>
                <ul className="space-y-2 text-sm text-[var(--concrete)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold shrink-0">1.</span>
                    Submit the form with your project details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold shrink-0">2.</span>
                    We&apos;ll reply within {site.responseTime} to arrange a free site visit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold shrink-0">3.</span>
                    Receive a detailed written quote — no obligation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold shrink-0">4.</span>
                    We schedule at your convenience and get it done right
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <QuoteForm variant="card" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
