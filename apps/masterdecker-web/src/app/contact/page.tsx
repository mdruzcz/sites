import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/contact` },
  title: "Contact Master Decker | Free Outdoor Living Estimates in London, ON",
  description: "Request a free estimate for deck staining, deck building, fence installation, or concrete work in London, ON. We respond within 1 business day.",
  openGraph: {
    title: "Contact Master Decker",
    description: "Free estimates for outdoor living projects in London, Ontario.",
    url: `${site.url}/contact`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Master Decker Inc.",
  url: `${site.url}/contact`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: site.legalName,
    telephone: site.phone,
    email: site.email,
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 10:00-17:00"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <section className="bg-[var(--surface)] section">
          <div className="container">
            <p className="eyebrow mb-2">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Estimate</h1>
            <p className="text-lg text-[var(--ink)]/70 max-w-xl">
              Fill out the form and we&apos;ll get back to you within one business day with a free, written estimate.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container grid gap-12 md:grid-cols-[1fr_380px]">
            <ContactForm />
            <div className="space-y-6">
              <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 space-y-4">
                {[
                  { label: "Phone", content: <a href={site.phoneHref} className="text-[var(--accent)] font-semibold hover:underline">{site.phone}</a> },
                  { label: "Email", content: <a href={`mailto:${site.email}`} className="text-[var(--accent)] font-semibold hover:underline text-sm">{site.email}</a> },
                  { label: "Hours", content: <p className="text-sm text-[var(--ink)]/70">{site.hours}</p> },
                  { label: "Location", content: <p className="text-sm text-[var(--ink)]/70">London, Ontario and surrounding areas</p> },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/40 mb-1">{item.label}</p>
                    {item.content}
                  </div>
                ))}
              </div>
              <div className="bg-[var(--accent-dark)] text-white rounded-xl p-6">
                <p className="font-bold mb-2">Need it done faster?</p>
                <p className="text-sm text-white/70 mb-4">Call us directly and we&apos;ll aim to have someone at your property within 48 hours.</p>
                <a href={site.phoneHref} className="btn-primary bg-[var(--accent-light)] text-[var(--ink)] w-full justify-center">{site.phone}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <a href={site.phoneHref} className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--accent)] text-white font-semibold rounded-full px-5 py-3 shadow-lg" aria-label={`Call ${site.name}`}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
        Call Now
      </a>
    </>
  );
}
