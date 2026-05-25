import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact Celebrate Lighting | Free Quote for LED Lighting in Ontario",
  description:
    "Ready to transform your home? Contact Celebrate Lighting for a free, no-obligation consultation and quote for permanent outdoor LED lighting anywhere in Southwestern Ontario.",
  openGraph: {
    title: "Contact Celebrate Lighting | Free Quote for LED Lighting in Ontario",
    description: "Get your free consultation and quote for permanent outdoor LED lighting in Southwestern Ontario. We reply within 24 hours.",
    url: "https://celebratelighting.ca/contact",
  },
};

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
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <div>
              <p className="section-eyebrow mb-3">Get in Touch</p>
              <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
                Ready to Transform Your Home?
              </h1>
              <p className="text-[var(--muted)] leading-relaxed mb-10">
                Get your free consultation and quote today. Our team is available 7 days a week to answer your questions and get your lighting project started.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <svg className="w-5 h-5" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Phone</div>
                    <a href={site.phoneHref} className="text-[var(--accent)] font-medium">{site.phone}</a>
                    <div className="text-xs text-[var(--muted)] mt-1">Available 7 days a week, 8 AM – 8 PM</div>
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
                    <a href={site.emailHref} className="text-[var(--accent)] font-medium">{site.email}</a>
                    <div className="text-xs text-[var(--muted)] mt-1">We respond within 24 hours</div>
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
                    <div className="font-semibold text-[var(--foreground)]">Address</div>
                    <div className="text-[var(--muted)] text-sm">{site.addressLine}</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <h3 className="font-bold text-[var(--foreground)] mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  {site.hoursDetailed.map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-[var(--muted)]">{h.day}</span>
                      <span className="font-medium text-[var(--foreground)]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Request Your Free Quote</h2>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
