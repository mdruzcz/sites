import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/services` },
  title: "Outdoor Services | Decks, Fences, Concrete — Master Decker",
  description: "Deck staining, deck building, fence installation, concrete driveways and patios, concrete sealing, and retaining walls in London, ON and surrounding areas.",
  openGraph: {
    title: "Outdoor Services | Master Decker",
    description: "Deck, fence, and concrete services across London and Southwestern Ontario.",
    url: `${site.url}/services`,
  },
};

const services = [
  {
    icon: "🪵",
    title: "Deck Staining",
    desc: "Your deck takes a beating from Ontario winters. Our deck staining service restores natural beauty and protects against fading, cracking, and peeling. We use premium stain products matched to your deck material.",
    benefits: ["Extends deck life by 5–10 years", "UV-resistant stain formulas", "Colour matching available", "Pressure wash + prep included"],
  },
  {
    icon: "🏗️",
    title: "Deck Building",
    desc: "Looking to add or replace a deck? Our crew designs and builds custom decks using pressure-treated lumber, composite decking, or cedar — whatever fits your budget and style.",
    benefits: ["Free design consultation", "Composite and wood options", "Built to Ontario building codes", "Permit assistance available"],
  },
  {
    icon: "🏠",
    title: "Fence Building",
    desc: "Whether you need privacy, security, or a classic look, we install wood, vinyl, and ornamental fences that complement your property and last for years.",
    benefits: ["Wood, vinyl, and chain-link options", "Privacy, picket, and rail styles", "Gate installation", "Post-setting in concrete footings"],
  },
  {
    icon: "🛤️",
    title: "Concrete Driveways & Patios",
    desc: "Properly reinforced concrete is the most durable choice for Ontario's freeze-thaw cycle. We form, pour, and finish driveways, patios, walkways, and curbs that hold up for decades.",
    benefits: ["Rebar + wire mesh reinforced", "Broom, stamped, and exposed finishes", "Proper drainage and grading", "30-year expected lifespan"],
  },
  {
    icon: "🔒",
    title: "Concrete Sealing",
    desc: "New or existing concrete benefits from professional sealing. We apply penetrating sealants that block moisture, salt damage, oil stains, and efflorescence.",
    benefits: ["Penetrating and topical sealants", "Extends surface life significantly", "Reduces maintenance costs", "Restores colour and sheen"],
  },
  {
    icon: "🧱",
    title: "Retaining Walls",
    desc: "Sloped or uneven terrain? A retaining wall creates level, usable outdoor space while preventing erosion. We build wood, interlocking, and concrete block retaining walls.",
    benefits: ["Interlocking block options", "Timber and concrete styles", "Drainage planning included", "Terracing for large slopes"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "LocalBusiness",
    name: site.legalName,
    url: site.url,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: site.address.city, addressRegion: site.address.region },
  },
  name: "Outdoor Home Services",
  description: "Deck staining, deck building, fence installation, concrete work, and retaining walls in London, Ontario.",
  areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <section className="bg-[var(--surface)] section">
          <div className="container">
            <p className="eyebrow mb-2">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Outdoor Services</h1>
            <p className="text-lg text-[var(--ink)]/70 max-w-2xl">
              We offer a wide range of outdoor services to enhance the beauty and functionality of your home. Our team has years of experience and is committed to your complete satisfaction.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container space-y-12">
            {services.map((s, i) => (
              <div key={s.title} className={`grid gap-8 md:grid-cols-2 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                  <p className="text-[var(--ink)]/70 leading-relaxed mb-4">{s.desc}</p>
                  <Link href="/contact" className="btn-primary text-sm">Get a Free Estimate</Link>
                </div>
                <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">What&apos;s included</p>
                  <ul className="space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[var(--ink)]/80">
                        <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section bg-[var(--accent-dark)] text-white">
          <div className="container text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Start with a free estimate</h2>
            <p className="text-white/70 mb-6">Contact us and we&apos;ll visit your property to provide a detailed, written quote — no obligation.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-[var(--accent-light)] text-[var(--ink)]">Request a Quote</Link>
              <a href={site.phoneHref} className="btn-outline border-white text-white hover:bg-white hover:text-[var(--ink)]">{site.phone}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
