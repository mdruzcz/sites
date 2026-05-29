import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { NavBar, StatsStrip, Testimonials, ServiceAreas, Contact, Footer, FAQ } from "../../_components/sections";

export const metadata: Metadata = {
  title: "Fence Contractor Woodstock Ontario | Fence Installation | Woodstock Deck & Fence",
  description:
    "Professional fence installation in Woodstock, ON. Vinyl, wood, ornamental steel & chain-link fencing with 4-foot frost-proof posts and a 5-year workmanship warranty. Free quotes.",
  alternates: { canonical: "/services/fence-building" },
  openGraph: {
    url: "/services/fence-building",
    title: "Fence Contractor in Woodstock, Ontario | Fence Installation",
    description: "Vinyl, wood, steel & chain-link fencing in Woodstock and Oxford County. 5-year warranty. Permits handled. Free quotes.",
  },
};

export const revalidate = 3600;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Fence Installation",
  provider: {
    "@type": "LocalBusiness",
    name: "Woodstock Deck & Fence",
    telephone: "+1-519-914-5697",
    url: "https://woodstockdeckandfence.ca",
  },
  areaServed: ["Woodstock, ON", "Ingersoll, ON", "Tillsonburg, ON", "Brantford, ON", "Cambridge, ON", "Oxford County, ON"],
  description: "Professional fence installation in Woodstock and Oxford County — vinyl, wood, ornamental steel and chain-link fencing with a 5-year workmanship warranty.",
  url: "https://woodstockdeckandfence.ca/services/fence-building",
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

export default function FenceBuildingPage() {
  return (
    <main>
      <Script id="ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <NavBar homeHref="/" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28" style={{ backgroundColor: "var(--forest)" }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/legacy/Professional-Fencing-Solutions.png" alt="Professional fence installation in Woodstock, Ontario" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,53,40,0.95) 0%, rgba(26,53,40,0.75) 100%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <a href="/" className="hover:text-white">Home</a><span>/</span>
            <a href="/services" className="hover:text-white">Services</a><span>/</span>
            <span style={{ color: "var(--cedar-light)" }}>Fence Building</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Woodstock&apos;s Fence Specialists</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Fence Installation in Woodstock &amp; Oxford County
          </h1>
          <p className="text-xl text-white/75 max-w-2xl mb-8 leading-relaxed">
            Vinyl, wood, ornamental steel and chain-link fences installed with 4-foot posts set below Ontario&apos;s frost line. Zero leaning, zero shifting — guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white" style={{ backgroundColor: "var(--cedar)" }}>
              Get a Free Fence Quote
            </a>
            <a href="tel:5199145697" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white border border-white/30">
              519-914-5697
            </a>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* Fence types */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>Fence Options</p>
            <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--forest)" }}>Every Fence Type, One Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Whether you need privacy, security, curb appeal or a combination of all three — we install the right fence for your property.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Vinyl / PVC Fences", img: "/images/legacy/Professional-Fencing-Solutions.png", desc: "The most popular fence choice for Woodstock homeowners who want zero maintenance. Vinyl never rots, never warps, never needs painting, and holds its colour for decades. Available in privacy (solid), semi-privacy, picket and rail styles in white, tan and grey.", features: ["Never needs painting or staining", "Won't rot, warp or crack", "25+ year lifespan", "Available in multiple styles & colours"] },
              { title: "Wood / PT Fences", img: "/images/legacy/side-Fence-Staining-1.jpeg", desc: "A classic look that works on any property. We build board-on-board, shadowbox, solid privacy and picket styles in pressure-treated pine or cedar. Pressure-treated wood resists rot and insects at a lower cost point than cedar. Stain or paint to your exact preference.", features: ["Classic natural wood look", "Multiple style options", "Stainable & paintable", "Cost-effective choice"] },
              { title: "Ornamental Steel Fences", img: "/images/legacy/Fence-Staining-Restoration-2.png", desc: "Wrought-iron style without the maintenance headaches. Our powder-coated steel fences are available in flat-top and spear-top profiles, providing elegant security that lasts decades. Perfect for front yards, pool enclosures and properties where curb appeal matters.", features: ["Powder-coated rust protection", "Elegant spear-top & flat-top profiles", "Zero maintenance required", "Maximum security & curb appeal"] },
              { title: "Chain-Link Fences", img: "/images/legacy/Built-for-the-Woodstock-Climate.png", desc: "The most affordable way to secure a large property. Galvanized or vinyl-coated chain-link is nearly indestructible, allows full visibility, and works equally well for residential backyards, commercial boundaries and sports areas. We install with properly sized posts set 4 feet deep.", features: ["Most affordable secure option", "High visibility for large lots", "Galvanized or vinyl-coated", "Great for pets & commercial use"] },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <div className="relative md:w-48 flex-shrink-0 h-48 md:h-auto">
                  <Image src={f.img} alt={`${f.title} in Woodstock, Ontario by Woodstock Deck and Fence`} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--forest)" }}>{f.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{f.desc}</p>
                  <ul className="space-y-1">
                    {f.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--cedar)" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why deep posts matter */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">Why Post Depth Matters in Woodstock</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Oxford County&apos;s heavy clay soil expands when frozen and contracts when it thaws. A post set only 2 feet deep — as many contractors do — will heave, lean and eventually fail within 5–10 years. We set every post a minimum of 4 feet deep, below the frost line, so your fence stays perfectly straight for decades.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[["4 Ft", "Minimum post depth — always"], ["48 Hrs", "Average turnaround for quotes"], ["5 Years", "Workmanship warranty"]].map(([v, l]) => (
              <div key={l} className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div className="font-serif text-2xl font-bold text-white mb-1">{v}</div>
                <div className="text-sm text-white/65">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City links */}
      <section className="py-16" style={{ backgroundColor: "var(--cream-dark)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: "var(--forest)" }}>Fence Installation by City</h2>
          <p className="text-gray-600 mb-8">Find fence installation info specific to your community.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <a key={c.slug} href={`/services/fence-building/${c.slug}`}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--forest)" }}>
                Fence Contractor in {c.name}
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
