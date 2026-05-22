import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Toronto Deck Stainers | Free Estimate Request",
  description: "Get a free, no-obligation deck staining estimate. Call (647) 478-7379 or submit your project details — we reply within 24 hours.",
  openGraph: { title: "Contact Toronto Deck Stainers", description: "Free estimates across Toronto and all GTA communities. Call or submit your project details.", url: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Get In Touch</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5">
            Get a Free Deck Staining Estimate
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            No obligation, no high-pressure sales. Fill out the form and we&apos;ll reply within {site.responseTime}.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <QuoteForm variant="inline" />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-bold text-xl text-[var(--charcoal)] mb-5">Contact Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Phone</p>
                      <a href={site.phoneHref} className="font-bold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors">{site.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Email</p>
                      <a href={site.emailHref} className="font-bold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors">{site.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Hours</p>
                      <p className="font-bold text-[var(--charcoal)]">{site.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold mb-0.5">Service Area</p>
                      <p className="font-bold text-[var(--charcoal)]">Toronto &amp; All GTA</p>
                      <p className="text-sm text-[var(--concrete)]">Richmond Hill, Vaughan, Markham, Mississauga, and more</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--charcoal)] mb-3">What to Expect</h3>
                <ol className="space-y-2 text-sm text-[var(--concrete)]">
                  <li className="flex gap-3"><span className="font-bold text-[var(--accent)] shrink-0">1.</span>Submit your estimate request or call us</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--accent)] shrink-0">2.</span>We reply within {site.responseTime} to confirm details</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--accent)] shrink-0">3.</span>Free on-site assessment at your convenience</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--accent)] shrink-0">4.</span>Written estimate with no obligation</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--accent)] shrink-0">5.</span>Schedule your project when you&apos;re ready</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
