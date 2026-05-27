import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Professional Deck & Fence Restoration in Kitchener-Waterloo",
  description: "Restore My Deck offers professional deck & fence staining, cleaning, repair and restoration in Kitchener, Waterloo, Guelph, Cambridge, Hamilton and surrounding areas.",
  openGraph: {
    title: "Professional Deck & Fence Restoration | Restore My Deck",
    description: "Expert deck & fence restoration in Kitchener-Waterloo and surrounding areas. Free quotes. Projects completed in 2 days.",
    url: site.url,
    images: [{ url: "/images/hero-deck.jpg", width: 1200, height: 630, alt: "Professionally restored deck in Kitchener-Waterloo" }],
  },
};

const faqs = [
  { q: "Are the products you use eco-friendly?", a: "Yes — we use VOC-compliant, eco-friendly cleaning solutions and stains including Ready Seal and Penofin Verde." },
  { q: "How long does the process take?", a: "Most projects are completed in about 2 days including drying time. Larger decks or fences may take 3 days." },
  { q: "Do you spray or brush the stain?", a: "We always brush-apply the stain. This forces the stain deeper into the wood grain for a longer-lasting finish compared to spraying." },
  { q: "What stain do you recommend?", a: "We prefer semi-transparent oil-based stains such as Ready Seal or Penofin Verde. They fade gracefully and never peel." },
  { q: "How often should I re-stain my deck?", a: "With a quality oil-based stain we recommend every 2–4 years. We also offer full restoration every 5–7 years." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-[var(--dark)]">
        <div className="absolute inset-0">
          <Image src="/images/hero-deck.jpg" alt="Professionally restored cedar deck in Kitchener-Waterloo" fill className="object-cover opacity-40" priority sizes="100vw" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: headline */}
          <div>
            <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Kitchener-Waterloo Region
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight font-[var(--font-montserrat)]">
              PROFESSIONAL<br />DECK AND FENCE<br />
              <span className="text-[var(--accent)]">RESTORATION</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 font-medium">Restore Your Wood Without Replacement!</p>
            <p className="mt-3 text-gray-400 leading-relaxed max-w-lg">Expert staining, cleaning, sealing and repair for decks and fences. Eco-friendly products, brush-applied for a lasting finish. Most projects done in 2 days.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact-us" className="btn btn-accent text-base px-8 py-4">Get a Free Quote</Link>
              <a href={site.phoneHref} className="btn btn-white text-base px-8 py-4 text-[var(--dark)]">Call {site.phone}</a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Brush-Applied Stain</span>
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Eco-Friendly Products</span>
              <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Free Quotes</span>
            </div>
          </div>

          {/* Right: quote form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:max-w-md w-full">
            <div className="bg-[var(--accent)] -mx-6 -mt-6 md:-mx-8 md:-mt-8 px-6 py-4 md:px-8 rounded-t-2xl mb-6">
              <h2 className="text-xl font-bold text-white text-center">Get Your FREE Quote Today!</h2>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services Overview */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Our Restoration Services</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">From a complete deck restoration to a simple fence staining — we handle it all with care, quality products and expert technique.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Deck Restoration", href: "/deck-restoration", icon: "🔄", desc: "Complete 4-step process: clean, repair, sand, stain. Brings old decks back to life." },
              { name: "Deck Staining", href: "/deck-staining", icon: "🖌️", desc: "Brush-applied oil-based stains that fade gracefully — Ready Seal & Penofin Verde." },
              { name: "Deck Cleaning", href: "/deck-cleaning", icon: "🪣", desc: "Eco-friendly deep clean that removes mold, algae and weathered grey wood fibres." },
              { name: "Deck Power Washing", href: "/deck-power-washing", icon: "💦", desc: "Professional pressure washing that prepares wood for staining or sealing." },
              { name: "Deck Repair", href: "/deck-repair-and-maintenance", icon: "🔧", desc: "Loose boards, rotted sections, unstable railings — we fix it all before finishing." },
              { name: "Deck Rebuilding", href: "/deck-rebuilding", icon: "🏗️", desc: "Complete teardown and rebuild. Custom size, layout and built-in features available." },
              { name: "Fence Staining", href: "/fence-staining", icon: "🏡", desc: "Restore your fence with premium stain for a long-lasting, beautiful finish." },
              { name: "Fence Cleaning", href: "/fence-cleaning", icon: "🧹", desc: "Remove grime, algae and weathering from wood or vinyl fences." },
              { name: "Fence Painting", href: "/fence-painting", icon: "🎨", desc: "Quality paint finish for fences requiring a solid colour coverage." },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="card p-6 group hover:border-[var(--accent)] border-2 border-transparent transition-colors">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{s.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-flex items-center text-[var(--accent)] text-sm font-semibold gap-1">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image src="/images/deck-before-after.jpg" alt="Deck restoration before and after in Kitchener" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div>
            <span className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest">Why Restore My Deck?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] mt-2 font-[var(--font-montserrat)]">Over a Decade of Wood Restoration Expertise</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Founded by Cameron, Restore My Deck was built on identifying better products and techniques to deliver results that last. We collaborate with other leading companies and stay up to date with the best eco-friendly wood care solutions.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Brush-applied stain (not sprayed) for deeper penetration",
                "80-grit buff sanding before every stain application",
                "Ready Seal & Penofin Verde — premium oil-based, VOC compliant",
                "Oil-based stains that fade gracefully — never peel",
                "Transparent pricing, no hidden fees",
                "Most projects complete in 2 days including drying",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about-us" className="btn btn-accent mt-8">Learn About Us</Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-[var(--dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[var(--font-montserrat)]">Our 4-Step Restoration Process</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">Every deck restoration follows our proven process for the best possible result.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Thorough Cleaning", desc: "Deep clean with eco-friendly solutions to remove algae, mold and greyed wood fibres." },
              { step: "02", title: "Repair & Replacement", desc: "Loose boards, rotted sections and unstable railings fixed before finishing." },
              { step: "03", title: "Quality Staining", desc: "80-grit sanding then brush-applied premium oil-based stain for deep penetration." },
              { step: "04", title: "Final Inspection", desc: "Full walkthrough to ensure every surface meets our quality standard." },
            ].map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-white/10 hover:border-[var(--accent)] transition-colors">
                <div className="text-5xl font-extrabold text-[var(--accent)] opacity-30 mb-4">{s.step}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Transparent Pricing</h2>
            <p className="mt-3 text-gray-600">No hidden fees — here&apos;s what most projects cost. Get a free quote for your specific deck.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { service: "Power Washing / Fence Cleaning", price: "$800–$1,200", note: "Based on sq footage" },
              { service: "Staining / Painting", price: "$950–$1,350", note: "Includes prep work" },
              { service: "Repair / Rebuilding", price: "Custom Quote", note: "Based on scope" },
            ].map((p) => (
              <div key={p.service} className="card p-6 text-center border-2 border-transparent hover:border-[var(--accent)] transition-colors">
                <h3 className="font-bold text-[var(--dark)] mb-2">{p.service}</h3>
                <p className="text-2xl font-extrabold text-[var(--accent)] my-3">{p.price}</p>
                <p className="text-xs text-gray-500">{p.note}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact-us" className="btn btn-accent">Get Your Exact Quote</Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Service Areas</h2>
            <p className="mt-3 text-gray-600">Serving Southwestern Ontario from Kitchener-Waterloo to Guelph, Hamilton, Stratford and beyond.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {site.serviceAreas.map((area) => (
              <Link key={area.name} href={area.href} className="px-4 py-2 rounded-full border-2 border-gray-200 text-gray-700 hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium text-sm transition-colors">
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[var(--dark)] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
