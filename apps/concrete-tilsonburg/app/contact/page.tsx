import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Concrete Estimate — Tillsonburg, ON",
  description:
    "Request a free on-site concrete estimate in Tillsonburg, Woodstock, Delhi, Ingersoll, or Simcoe. We respond within 4 business hours. Call (833) 243-3987.",
  openGraph: {
    title: "Get a Free Concrete Estimate — Tillsonburg, ON",
    description:
      "Request a free on-site concrete estimate across Oxford County. We respond within 4 business hours.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Contact", url: `${site.url}/contact` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Free Estimate</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            Get a Free Concrete Estimate
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            Tell us about your project — driveway, patio, repair, or garage floor. No obligation. We respond within {site.responseTime}.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <QuoteForm variant="inline" />
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-lg text-[var(--charcoal)] mb-4">Contact Info</h2>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="flex items-start gap-3 text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors"
                    >
                      <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-semibold">{site.phone}</p>
                        <p className="text-sm text-[var(--concrete)]">Call or text anytime</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[var(--charcoal)]">Business Hours</p>
                      <p className="text-sm text-[var(--concrete)]">{site.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[var(--charcoal)]">Service Area</p>
                      <p className="text-sm text-[var(--concrete)]">
                        Tillsonburg, Woodstock, Delhi, Ingersoll, Simcoe, and surrounding Oxford County
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-[var(--accent)]/5 border-[var(--accent)]/20">
                <h3 className="font-bold text-[var(--charcoal)] mb-2">Quick Response Guarantee</h3>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">
                  We respond to all estimate requests within {site.responseTime}. For urgent projects, call us directly at{" "}
                  <a href={site.phoneHref} className="text-[var(--accent)] font-semibold">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
