import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { NavBar, StatsStrip, Testimonials, FAQ, ServiceAreas, Contact, Footer } from "../../_components/sections";

export const metadata: Metadata = {
  title: "Deck Restoration Woodstock Ontario | Deck Staining and Repair | Woodstock Deck and Fence",
  description:
    "Professional deck restoration in Woodstock, Brantford and Oxford County. Power washing, board replacement, sanding and premium staining. Save vs full replacement. Free quotes.",
  alternates: { canonical: "/services/deck-restoration" },
  openGraph: {
    url: "/services/deck-restoration",
    title: "Deck Restoration in Woodstock, Ontario | Woodstock Deck and Fence",
    description: "Restore your weathered deck instead of replacing it. Professional cleaning, repair and staining in Woodstock and Oxford County.",
  },
};

export const revalidate = 3600;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Deck Restoration",
  provider: {
    "@type": "LocalBusiness",
    name: "Woodstock Deck and Fence",
    telephone: "+1-519-914-5697",
    url: "https://woodstockdeckandfence.ca",
  },
  areaServed: ["Woodstock, ON", "Ingersoll, ON", "Tillsonburg, ON", "Brantford, ON", "Cambridge, ON", "Oxford County, ON"],
  url: "https://woodstockdeckandfence.ca/services/deck-restoration",
};

const steps = [
  { title: "Deep Power Washing", img: "/images/legacy/Power-Washing-Deep-Cleaning-2.png", alt: "Professional deck power washing in Woodstock Ontario", desc: "We use professional-grade pressure washers to remove years of dirt, mold, mildew and graying oxidation. The right pressure for the material.", features: ["Removes mold and mildew", "Opens wood pores for staining", "Reveals the true wood colour", "Safe for all deck materials"] },
  { title: "Board and Railing Repair", img: "/images/legacy/Deck-Restoration-before-washing-2.jpeg", alt: "Deck board and railing repair in Oxford County Ontario", desc: "Soft, cracked or rotten boards are replaced before any finishing work begins. We assess every board and railing post for structural integrity.", features: ["Board-by-board assessment", "Matching lumber sourced", "Structural post inspection", "Hardware tightening and replacement"] },
  { title: "Sanding and Preparation", img: "/images/legacy/Deck-Restoration-Refinishing-2.png", alt: "Deck sanding and surface preparation in Woodstock Ontario", desc: "Proper sanding removes splinters, opens the grain for maximum stain penetration, and ensures a smooth surface. Skipping this step is why most DIY jobs fail within one season.", features: ["Splinter-free surface", "Better stain penetration", "Professional orbital sanding", "Even surface prep throughout"] },
  { title: "Premium Stain Application", img: "/images/legacy/Deck-Staining-Sealing-2-1.png", alt: "Premium deck stain application in Woodstock Ontario", desc: "We apply oil-based and water-based penetrating stains from premium brands. The right stain for your wood type, applied in ideal conditions.", features: ["Oil-based and water-based options", "Multiple colour choices", "Applied in proper conditions", "Even coverage guaranteed"] },
];

export default function DeckRestorationPage() {
  return (
    <main>
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <NavBar homeHref="/" />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28" style={{ backgroundColor: "var(--forest)" }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/legacy/Deck-Stains-after-washing.webp" alt="Deck restoration in Woodstock Ontario" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,53,40,0.95) 0%, rgba(26,53,40,0.75) 100%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <a href="/" className="hover:text-white">Home</a><span>/</span>
            <a href="/services" className="hover:text-white">Services</a><span>/</span>
            <span style={{ color: "var(--cedar-light)" }}>Deck Restoration</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Restore, Not Replace</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Deck Restoration in Woodstock and Oxford County
          </h1>
          <p className="text-xl text-white/75 max-w-2xl mb-8 leading-relaxed">
            A weathered deck does not always need to be torn out. Professional power washing, board replacement and premium staining can make a 10-year-old deck look brand new at 20-40% of the cost of replacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>
              Get a Free Restoration Quote
            </a>
            <a href="tel:5199145697" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white border border-white/30">
              519-914-5697
            </a>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>What We Do</p>
            <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--forest)" }}>The Complete Restoration Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every restoration follows the same four-step process. Shortcuts produce short-lived results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <div className="relative h-48">
                  <Image src={s.img} alt={s.alt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>{i + 1}</span>
                    <h3 className="font-serif text-xl font-bold" style={{ color: "var(--forest)" }}>{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-1">
                    {s.features.map((f) => (
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

      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">Restore vs Replace: Which Is Right for You?</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            A restoration makes sense when the structure is sound. If more than 30% of boards are rotten or the frame is compromised, replacement is better value. We give you an honest assessment on the first visit.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[["20-40%", "Typical savings vs full replacement"], ["1-2 Days", "Average restoration timeline"], ["3-5 Years", "Extended life with premium stain"]].map((pair) => (
              <div key={pair[1]} className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div className="font-serif text-2xl font-bold text-white mb-1">{pair[0]}</div>
                <div className="text-sm text-white/65">{pair[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: "var(--forest)" }}>Before and After Gallery</h2>
                <p className="text-gray-600 mb-6">Our gallery shows real Woodstock-area decks transformed by professional restoration. The difference is dramatic.</p>
                <Link href="/gallery" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white" style={{ backgroundColor: "var(--cedar)" }}>
                  View the Gallery
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <Image src="/images/legacy/Deck-Restoration-before-washing-2.jpeg" alt="Weathered deck before restoration in Woodstock Ontario" fill className="object-cover" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <Image src="/images/legacy/Deck-Stains-after-washing.webp" alt="Deck after professional restoration by Woodstock Deck and Fence" fill className="object-cover" />
                </div>
              </div>
            </div>
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
