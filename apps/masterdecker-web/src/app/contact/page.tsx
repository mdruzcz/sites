import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/contact` },
  title: "Contact Us | Master Decker | Free Quotes in London Ontario",
  description:
    "Request a free quote for decks, fences, concrete driveways, or staining in London Ontario and Southwestern Ontario. We respond within 1 business day.",
  openGraph: {
    title: "Contact Master Decker",
    description: "Free quotes for outdoor living projects in London, Ontario.",
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
        <Hero
          eyebrow="Contact Us"
          title="Contact Us"
          subtitle="Talk to us today and see how easy it is to get started with Master Decker."
          background="/images/wp-deck-stained-cedar.jpg"
          align="center"
        />

        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="h-display text-3xl md:text-4xl mb-3">Contact Us Today</h2>
              <p className="text-[var(--ink-soft)]">Don&apos;t wait to improve your outdoor space.</p>
              <p className="text-xs text-[var(--ink-soft)] mt-2">&quot;*&quot; indicates required fields</p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_380px] max-w-5xl mx-auto">
              <ContactForm />
              <aside className="space-y-6">
                <div className="bg-[var(--surface)] p-7 border border-[var(--border)] space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1.5">Phone</p>
                    <a href={site.phoneHref} className="text-lg font-bold text-[var(--ink)] hover:text-[var(--accent)]">{site.phone}</a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1.5">Email</p>
                    <a href={`mailto:${site.email}`} className="font-bold text-[var(--ink)] hover:text-[var(--accent)] text-sm break-all">{site.email}</a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1.5">Hours</p>
                    <p className="text-sm text-[var(--ink-soft)]">{site.hours.weekday}</p>
                    <p className="text-sm text-[var(--ink-soft)]">{site.hours.saturday}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-1.5">Location</p>
                    <p className="text-sm text-[var(--ink-soft)]">London, Ontario and surrounding areas across Southwestern Ontario.</p>
                  </div>
                </div>
                <div className="bg-[var(--ink)] text-white p-7">
                  <p className="font-bold mb-2 text-lg">Need it done faster?</p>
                  <p className="text-sm text-white/80 mb-5">Call us directly and we&apos;ll aim to schedule a site visit within 48 hours.</p>
                  <a href={site.phoneHref} className="btn-primary w-full">{site.phone}</a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
