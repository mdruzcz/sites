import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Book Your Free On-Site Demo",
  description:
    "Book a free on-site demo of permanent LED lighting. We come to your home, colour-match your soffit and light up a live sample before you pay. Southwestern Ontario.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Free On-Site Demo | Celebrate Lighting",
    description:
      "We come to you, mount a live sample on your house and turn the lights on — before you spend a cent. Free, no obligation. Southwestern Ontario.",
    url: "https://celebratelighting.ca/contact",
    images: [{ url: "/images/hero-main.jpg", alt: "Contact Celebrate Lighting to book a free on-site permanent LED lighting demo" }],
  },
};

const whatToExpect = [
  "We call you back within 24 hours to agree a time — evenings included, since the lights show best after dark.",
  "A specialist walks your property, measures your rooflines and takes a physical colour sample of your soffit.",
  "We mount a live sample section on your house and turn it on, so you see it on your own home.",
  "You get a transparent, itemized quote before we leave. No deposit and no pressure to sign.",
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Contact", url: `${site.url}/contact` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Book a Demo</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
            {/* Left — the offer, then contact details */}
            <div>
              <p className="section-eyebrow mb-3">Free On-Site Demo</p>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-5 text-balance">
                See it on your home before you pay a cent.
              </h1>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                {site.demo.detail}
              </p>

              <h2 className="font-semibold text-[var(--foreground)] mb-4">What happens next</h2>
              <ol className="space-y-4 mb-10">
                {whatToExpect.map((item, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span
                      className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--muted)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>

              <div className="hairline mb-8" />

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Prefer to talk?</div>
                    <a href={site.phoneHref} className="text-[var(--accent)] font-semibold text-lg hover:underline">
                      {site.phone}
                    </a>
                    <div className="text-xs text-[var(--muted)] mt-1">Open 7 days a week</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Email</div>
                    <a href={site.emailHref} className="text-[var(--accent)] font-medium break-all hover:underline">
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Based in</div>
                    <div className="text-[var(--muted)] text-sm">{site.addressLine}</div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      Serving {site.serviceAreas.slice(0, 4).join(", ")} and across Southwestern Ontario
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <h3 className="font-bold text-[var(--foreground)] mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  {site.hoursDetailed.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <span className="text-[var(--muted)]">{h.day}</span>
                      <span className="font-medium text-[var(--foreground)]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form. .card-light because QuoteForm renders dark text
                on white fields; a dark .card would hide every label. */}
            <div>
              <div className="card-light p-7 sm:p-8 lg:sticky lg:top-24">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-1.5">
                  Book your free on-site demo
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  No cost, no deposit, no obligation. We reply within {site.responseTime}.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
