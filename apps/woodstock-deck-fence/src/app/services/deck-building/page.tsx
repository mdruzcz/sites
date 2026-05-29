import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { NavBar, StatsStrip, Testimonials, ServiceAreas, Contact, Footer, FAQ } from "../../_components/sections";

export const metadata: Metadata = {
  title: "Deck Builder Woodstock Ontario | Custom Deck Building | Woodstock Deck & Fence",
  description:
    "Expert deck building in Woodstock, ON. Pressure-treated, cedar and composite decks with 4-foot frost-proof footings, permit assistance and a 5-year workmanship warranty. Free quotes.",
  alternates: { canonical: "/services/deck-building" },
  openGraph: {
    url: "/services/deck-building",
    title: "Deck Builder in Woodstock, Ontario | Custom Deck Building",
    description: "Custom PT, cedar & composite decks in Woodstock and Oxford County. 5-year warranty. Permits handled. Free on-site quotes.",
  },
};

export const revalidate = 3600;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Deck Building",
  provider: {
    "@type": "LocalBusiness",
    name: "Woodstock Deck & Fence",
    telephone: "+1-519-914-5697",
    url: "https://woodstockdeckandfence.ca",
  },
  areaServed: ["Woodstock, ON", "Ingersoll, ON", "Tillsonburg, ON", "Brantford, ON", "Cambridge, ON", "Oxford County, ON"],
  description: "Custom deck building in Woodstock and Oxford County — pressure-treated, cedar and composite decks with frost-proof footings and a 5-year workmanship warranty.",
  url: "https://woodstockdeckandfence.ca/services/deck-building",
};

const cities = [
  { name: "Woodstock", slug: "woodstock" },
  { name: "Brantford", slug: "brantford" },
  { name: "Cambridge", slug: "cambridge" },
  { name: "Ingersoll", slug: "ingersoll" },
  { name: "Tillsonburg", slug: "tillsonburg" },
  { name: "Norwich", slug: "norwich" },
  { name: "Paris, ON", slug: "paris" },
];

export default function DeckBuildingPage() {
  return (
    <main>
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <NavBar homeHref="/" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28" style={{ backgroundColor: "var(--forest)" }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/legacy/Custom-Deck-Design-Installation.png" alt="Custom deck building in Woodstock, Ontario" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,53,40,0.95) 0%, rgba(26,53,40,0.75) 100%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <a href="/" className="hover:text-white">Home</a><span>/</span>
            <a href="/services" className="hover:text-white">Services</a><span>/</span>
            <span style={{ color: "var(--cedar-light)" }}>Deck Building</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Woodstock&apos;s Deck Specialists</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Deck Building in Woodstock &amp; Oxford County
          </h1>
          <p className="text-xl text-white/75 max-w-2xl mb-8 leading-relaxed">
            Custom-built pressure-treated, cedar and composite decks engineered for Ontario&apos;s freeze-thaw cycles. Every post goes 4 feet deep. Every build comes with a 5-year workmanship warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>
              Get a Free Deck Quote
            </a>
            <a href="tel:5199145697" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white border border-white/30">
              519-914-5697
            </a>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* Deck types */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>What We Build</p>
            <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--forest)" }}>Deck Types &amp; Materials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every Woodstock homeowner has different needs, a different yard, and a different budget. We build it all.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Pressure-Treated (PT) Decks", img: "/images/legacy/Deck-Restoration-before-washing-2.jpeg", desc: "The most popular choice in Oxford County. PT lumber is strong, affordable and looks beautiful when stained. We use #1 grade lumber throughout and properly sized footings for Woodstock's clay-heavy soil. Ideal for families who want a quality deck without overpaying.", features: ["Most affordable option", "Natural wood look", "Stainable & paintable", "Perfect for any size deck"] },
              { title: "Cedar Decks", img: "/images/legacy/Deck-after-cleaning-1.jpeg", desc: "Western Red Cedar is naturally rot and insect resistant — no chemical treatment required. It has a beautiful natural grain, a distinctive aroma, and it weathers to a distinguished silver-grey if left unstained. Cedar is the premium natural choice for Woodstock homeowners.", features: ["Naturally rot resistant", "No pressure chemicals", "Beautiful grain & aroma", "Ages gracefully"] },
              { title: "Composite Decks", img: "/images/legacy/Deck-Stains-after-washing-1.webp", desc: "Trex, TimberTech and similar composite brands offer 25-year warranties against fading and rot. Once installed, they never need sanding, staining or sealing — a huge advantage for busy families. Composite is the fastest-growing choice for Woodstock homeowners who want a deck, not a chore.", features: ["25-year material warranty", "Zero maintenance", "Splinter-free surface", "Eco-friendly options"] },
              { title: "Multi-Level Decks", img: "/images/legacy/Specialized-Outdoor-Structures.png", desc: "Multi-level decks let you make the most of a sloped lot or a larger yard. We design and engineer structures with multiple tiers, integrated stairs, and distinct zones for dining, lounging and entertaining. Every level is supported with properly engineered footings.", features: ["Maximizes sloped lots", "Multiple entertaining zones", "Engineered for safety", "Custom stairs & railings"] },
              { title: "Pool Decks", img: "/images/legacy/Deck-Restoration-Refinishing-2.png", desc: "Pool surrounds require special attention to drainage, slip resistance and City of Woodstock safety by-laws for pool fencing. We build pool decks that look stunning, handle constant moisture, and meet all local code requirements.", features: ["Slip-resistant surfaces", "Proper drainage design", "Pool fence code compliance", "Composite or PT options"] },
              { title: "Deck Restoration", img: "/images/legacy/Deck-Staining-Sealing-2-1.png", desc: "Don't replace your old deck — restore it. We bring weathered and graying decks back to life with professional pressure washing, sanding, structural repairs and premium staining. A restoration typically costs 20–40% of a full replacement.", features: ["Deep pressure washing", "Board & railing repairs", "Premium stain application", "Structural assessment"] },
            ].map((d) => (
              <div key={d.title} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <div className="relative h-48">
                  <Image src={d.img} alt={`${d.title} in Woodstock, Ontario by Woodstock Deck and Fence`} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "var(--forest)" }}>{d.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{d.desc}</p>
                  <ul className="space-y-1">
                    {d.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--cedar)" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City links */}
      <section className="py-16" style={{ backgroundColor: "var(--cream-dark)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: "var(--forest)" }}>Deck Building by City</h2>
          <p className="text-gray-600 mb-8">Find deck building info specific to your community.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <a key={c.slug} href={`/services/deck-building/${c.slug}`}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--forest)" }}>
                Deck Builder in {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}
