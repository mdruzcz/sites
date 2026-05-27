import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import satellites from "@/content/satellites.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  title: `${site.name} | London's Outdoor Living Experts Since 2014`,
  description: site.description,
  openGraph: { title: `${site.name} | London's Outdoor Living Experts`, description: site.description, url: site.url },
};

const services = [
  { icon: "🪵", title: "Deck Staining", desc: "Restore and protect your deck with premium stains built for Ontario's freeze-thaw climate." },
  { icon: "🏗️", title: "Deck Building", desc: "Custom deck design and construction — pressure-treated, composite, or cedar." },
  { icon: "🏠", title: "Fence Installation", desc: "Wood, vinyl, and ornamental fence solutions for privacy, security, and curb appeal." },
  { icon: "🛤️", title: "Concrete Driveways & Patios", desc: "Reinforced concrete poured right — driveways, patios, walkways, and curbs." },
  { icon: "🔒", title: "Concrete Sealing", desc: "Professional sealing that guards against staining, spalling, and weather wear." },
  { icon: "🧱", title: "Retaining Walls", desc: "Wood and concrete retaining walls that level uneven terrain and hold strong." },
];

const pillars = [
  { title: "10+ Years Experience", desc: "Serving London and surrounding areas since 2014 with hundreds of completed projects." },
  { title: "One Team, Every Trade", desc: "Deck, fence, and concrete crews under one roof — fewer headaches, tighter timelines." },
  { title: "Written Estimates", desc: "No surprise pricing. Every quote is detailed, written, and honoured." },
  { title: "Rapid Communication", desc: "Most inquiries answered same day. We keep you in the loop from start to finish." },
];

const categories = [...new Set(satellites.map((s) => s.category))];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  description: site.description,
  foundingDate: String(site.foundedYear),
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 10:00-17:00"],
  areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[var(--accent-dark)] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container section relative">
            <div className="max-w-2xl">
              <p className="eyebrow text-[var(--accent-light)] mb-3">London, Ontario · Est. 2014</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                London&apos;s Outdoor Living Experts
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                Decks, fences, concrete, and everything in between. Master Decker Inc. has transformed outdoor spaces across London and Southwestern Ontario for over a decade.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary bg-[var(--accent-light)] text-[var(--ink)] hover:bg-white">
                  Get a Free Estimate
                </Link>
                <a href={site.phoneHref} className="btn-outline border-white text-white hover:bg-white hover:text-[var(--ink)]">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section bg-[var(--surface)]">
          <div className="container">
            <p className="eyebrow mb-2">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-[var(--ink)]/60 mb-10 max-w-xl">
              From a fresh stain on your weathered deck to a fully poured driveway, our crews handle it all.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-xl border border-[var(--border)] p-6 hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--ink)]/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/services" className="btn-primary">View All Services</Link>
            </div>
          </div>
        </section>

        {/* Why Master Decker */}
        <section className="section">
          <div className="container">
            <p className="eyebrow mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">One team. Every outdoor trade.</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => (
                <div key={p.title}>
                  <div className="w-8 h-0.5 bg-[var(--accent)] mb-4" />
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--ink)]/70 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Network Hub */}
        <section className="section bg-[var(--surface)]" id="network">
          <div className="container">
            <p className="eyebrow mb-2">Our Network</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Specialized Services Across Ontario</h2>
            <p className="text-[var(--ink)]/60 mb-10 max-w-2xl">
              Master Decker is part of a network of specialized home service brands operating across Ontario — each focused on a specific trade or region. Browse by category to find the expert you need.
            </p>
            {categories.map((cat) => (
              <div key={cat} className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4 pb-2 border-b border-[var(--border)]">{cat}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {satellites.filter((s) => s.category === cat).map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-lg border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:shadow-sm transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">{s.name}</span>
                        <svg className="w-4 h-4 text-[var(--border)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </div>
                      <p className="text-xs text-[var(--ink)]/60 leading-relaxed">{s.description}</p>
                      <span className="text-xs text-[var(--accent)]/70 mt-auto">{s.region}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4">
              <Link href="/our-network" className="btn-outline">View Full Network Directory →</Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section bg-[var(--accent-dark)] text-white">
          <div className="container text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your outdoor space?</h2>
            <p className="text-white/70 mb-8">Free estimates, fast response, and work you&apos;ll be proud of. Serving London and all of Southwestern Ontario.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-[var(--accent-light)] text-[var(--ink)]">Get a Free Estimate</Link>
              <a href={site.phoneHref} className="btn-outline border-white text-white hover:bg-white hover:text-[var(--ink)]">{site.phone}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Mobile FAB */}
      <a
        href={site.phoneHref}
        className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--accent)] text-white font-semibold rounded-full px-5 py-3 shadow-lg"
        aria-label={`Call ${site.name} at ${site.phone}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
        Call Now
      </a>
    </>
  );
}
