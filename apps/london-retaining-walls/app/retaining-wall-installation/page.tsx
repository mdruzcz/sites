import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import gallery from "@/content/gallery.json";

const segmentalBlock = gallery.filter((p) => p.material === "segmental-block");
const timber = gallery.filter((p) => p.material === "timber");
// General installation page — a mix of block and timber walls.
const projectPhotos = [segmentalBlock[3], timber[4], segmentalBlock[5]];

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Retaining Wall Installation in London, Ontario | Free Quotes",
  description: "Professional retaining wall installation in London and Southwestern Ontario. Concrete, block and wood retaining walls. Ontario Building Code compliant. Free quotes from Kyle's team.",
  openGraph: { title: "Retaining Wall Installation | London Retaining Walls", url: `${site.url}/retaining-wall-installation` },
};

const faqs = [
  { q: "What is included in your retaining wall installation service?", a: "Our full installation service includes a site assessment, material recommendation, excavation and grading, base preparation and compaction, drainage engineering, wall construction, and backfill. We also handle permit requirements for walls over 1 metre." },
  { q: "How long does retaining wall installation take?", a: "A typical residential retaining wall (10–20 metres) takes 2–5 days depending on wall type, height, and site access conditions. Larger or more complex projects may take longer." },
  { q: "Do I need a permit for a retaining wall in London, Ontario?", a: "In the City of London, retaining walls over 1 metre (approximately 3.3 feet) typically require a building permit. We handle the compliance process and ensure all work meets Ontario Building Code." },
  { q: "What happens if my retaining wall isn't draining properly?", a: "Poor drainage is the leading cause of retaining wall failure. Every installation we do includes proper drainage — weeping tile, gravel backfill, and drainage outlets to prevent water pressure buildup behind the wall." },
];

export default function RetainingWallInstallationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Retaining Wall Installation", "Professional retaining wall installation in London and Southwestern Ontario. All wall types. Ontario Building Code compliant.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Retaining Wall Installation", href: "/retaining-wall-installation" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Our Services"
        title="Retaining Wall Installation"
        subtitle="Complete retaining wall installation from site assessment through construction and drainage. Serving London, Woodstock, Brantford, St. Thomas and all of Southwestern Ontario."
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
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our Retaining Wall Installation Process</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Site Assessment", desc: "We visit your property to assess the grade change, soil conditions, drainage requirements, and load bearing needs. This determines the right wall type, height, and construction approach." },
                  { step: "2", title: "Material Selection", desc: "Based on the assessment, we recommend the best wall material — concrete, interlocking block, or wood/timber — for your specific site, aesthetic goals and budget." },
                  { step: "3", title: "Excavation & Base Prep", desc: "Proper base preparation is critical. We excavate to the required depth, install compacted gravel base material, and ensure the foundation is level and stable before any wall blocks or forms are placed." },
                  { step: "4", title: "Drainage Engineering", desc: "We install weeping tile behind the wall, gravel backfill for drainage, and outlets to direct water away from the structure. This is the most commonly skipped step — and the leading cause of wall failure." },
                  { step: "5", title: "Wall Construction", desc: "We build the wall to spec, with proper batter (backward lean) for structural integrity, deadman anchors where required, and cap stones or finishing as needed." },
                  { step: "6", title: "Backfill & Clean Up", desc: "We compact the soil behind the wall in lifts to prevent settlement, restore any disturbed areas, and leave your property clean and ready to landscape." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold flex-shrink-0">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-[var(--dark)] mb-1">{s.title}</h3>
                      <p className="text-gray-600 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Wall Types We Install</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Concrete", href: "/concrete-retaining-walls", desc: "Most durable. Ideal for taller walls and heavy loads." },
                  { name: "Interlocking Block", href: "/block-retaining-walls", desc: "Versatile and attractive. Permacon, Allan Block and more." },
                  { name: "Wood & Timber", href: "/wood-and-timber-retaining-walls", desc: "Natural look. Blends with landscaping and gardens." },
                ].map((w) => (
                  <Link key={w.name} href={w.href} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[var(--accent)] transition-colors group">
                    <h3 className="font-bold text-[var(--dark)] group-hover:text-[var(--accent)] mb-1">{w.name}</h3>
                    <p className="text-gray-600 text-sm">{w.desc}</p>
                  </Link>
                ))}
              </div>
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

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-3 font-[family-name:var(--font-poppins)]">
            Recent Retaining Wall Installations
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            A sample of the block and timber retaining walls we&apos;ve installed across London and Southwestern Ontario.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectPhotos.map((p) => (
              <div key={p.image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-100">
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  placeholder="blur"
                  blurDataURL={p.blurDataURL}
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to Build Your Retaining Wall?" />
    </>
  );
}
