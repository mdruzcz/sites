import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Block Retaining Walls in London, Ontario | Permacon & Allan Block",
  description: "Interlocking block retaining walls in London and Southwestern Ontario. Permacon, Allan Block and similar systems. Versatile, attractive and Ontario Building Code compliant. Free quotes.",
  openGraph: { title: "Block Retaining Walls | London Retaining Walls", url: `${site.url}/block-retaining-walls` },
};

const faqs = [
  { q: "What block brands do you use?", a: "We work with all major interlocking block manufacturers including Permacon, Allan Block, Unilock, and other quality Canadian brands. We'll recommend the right product based on your wall height, aesthetic preferences and budget." },
  { q: "Are block retaining walls Ontario Building Code compliant?", a: "Yes. Properly engineered and installed interlocking block walls meet Ontario Building Code requirements. Walls over 1 metre require a permit, which we handle for you." },
  { q: "How do interlocking block walls compare to concrete walls?", a: "Block walls are easier to install, offer more aesthetic variety, and are typically less expensive than poured concrete. They're excellent for walls up to approximately 4–5 feet. For taller walls or heavily loaded applications, concrete may be the better choice." },
  { q: "Can block retaining walls be curved?", a: "Yes — one of the advantages of interlocking block systems is that they can be curved or angled to follow your property's natural contours, creating a more natural and aesthetically pleasing result." },
];

export default function BlockRetainingWallsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Block Retaining Walls", "Interlocking block retaining wall installation in London and Southwestern Ontario. Permacon, Allan Block and more.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Block Retaining Walls", href: "/block-retaining-walls" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Our Services"
        title="Block Retaining Walls"
        subtitle="Permacon, Allan Block and interlocking block retaining walls — versatile, attractive, and Ontario Building Code compliant. Serving London and all of Southwestern Ontario."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Why Interlocking Block Retaining Walls?</h2>
              <p className="text-gray-600 leading-relaxed">Interlocking concrete block is the most popular retaining wall system for residential applications in Ontario. Systems like Permacon and Allan Block are engineered for structural performance, freeze-thaw resistance, and long-term durability — while offering a wide range of colours, textures, and styles to complement your landscape.</p>
              <p className="mt-4 text-gray-600 leading-relaxed">Unlike mortar-based masonry, interlocking block systems use gravity, geogrid reinforcement, and engineered setback (batter) to resist soil pressure. When properly installed with good drainage, they perform exceptionally well in Ontario&apos;s climate.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Block Systems We Install</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Permacon", desc: "Canadian-manufactured blocks with a wide range of styles from natural stone-look to smooth contemporary." },
                  { name: "Allan Block", desc: "Engineered interlocking system designed specifically for retaining wall applications. Excellent for larger walls." },
                  { name: "Other Quality Systems", desc: "Unilock, Oaks, and other premium Canadian and North American block systems." },
                ].map((b) => (
                  <div key={b.name} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-2">{b.name}</h3>
                    <p className="text-gray-600 text-sm">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Key Advantages of Block Walls</h2>
              <ul className="space-y-3">
                {[
                  "Wide range of colours and textures to match your home and landscaping",
                  "Can be curved or angled to follow natural property contours",
                  "Freeze-thaw resistant when properly installed",
                  "Ontario Building Code compliant with proper engineering",
                  "Typically faster installation than poured concrete",
                  "Excellent drainage characteristics with proper backfill",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-2">{f.q}</h3>
                    <p className="text-gray-600 text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="bg-[var(--accent)] -mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6">
                <h3 className="text-lg font-bold text-white text-center">Get a Free Quote</h3>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Get a Free Block Wall Quote Today" />
    </>
  );
}
