import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Wood & Timber Retaining Walls in London, Ontario | Natural Look",
  description: "Pressure-treated wood and hardwood timber retaining walls in London and Southwestern Ontario. Natural look that blends with landscaping. Free quotes from London Retaining Walls.",
  openGraph: { title: "Wood & Timber Retaining Walls | London Retaining Walls", url: `${site.url}/wood-and-timber-retaining-walls` },
};

const faqs = [
  { q: "How long do wood retaining walls last?", a: "Pressure-treated wood retaining walls typically last 20–40 years depending on wood grade, drainage quality, and maintenance. Hardwood timber walls (using oak, black locust, or similar) can last 30–50 years. Proper drainage is the biggest factor in longevity." },
  { q: "What type of wood do you use for retaining walls?", a: "We use CA-B or better pressure-treated lumber for standard garden walls. For walls that require higher durability or a more natural aesthetic, we can use hardwood timbers including oak, black locust, or similar species." },
  { q: "Can wood retaining walls be stained or sealed?", a: "Yes. Pressure-treated wood can be stained or sealed once it has dried out (typically 6–12 months after installation). This can help preserve the wood and achieve a desired colour. We recommend using a penetrating oil-based sealant for best results." },
  { q: "Are wood retaining walls good for garden areas?", a: "Yes — wood and timber walls are particularly well-suited for garden terraces, raised beds, and landscape areas where you want a natural, organic look. They blend beautifully with plants and landscaping in a way that concrete and block sometimes can't." },
];

export default function WoodTimberRetainingWallsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Wood & Timber Retaining Walls", "Pressure-treated wood and hardwood timber retaining wall installation in London and Southwestern Ontario.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Wood & Timber Retaining Walls", href: "/wood-and-timber-retaining-walls" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Our Services"
        title="Wood & Timber Retaining Walls"
        subtitle="Pressure-treated lumber and hardwood timber retaining walls — natural look that blends beautifully with landscaping and gardens in London and Southwestern Ontario."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-xl overflow-hidden h-72 w-full">
              <Image src="/images/service-wood.jpg" alt="Wood and timber retaining wall installation with deck in London, Ontario" fill className="object-cover" sizes="(max-width:1024px) 100vw, 66vw" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">The Natural Choice for Landscape Retaining Walls</h2>
              <p className="text-gray-600 leading-relaxed">Wood and timber retaining walls offer a natural, organic aesthetic that concrete and block simply can&apos;t match. For garden terraces, raised planting beds, residential landscape features, and low-to-medium height grade changes, wood walls are an excellent choice — and they&apos;re often more economical than concrete or block.</p>
              <p className="mt-4 text-gray-600 leading-relaxed">The key to a long-lasting wood retaining wall is using the right materials, proper post depth, adequate drainage, and correct construction technique. A well-built wood wall with good drainage will give you 20–40 years of service.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Wood & Timber Options</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Pressure-Treated Lumber", desc: "Most common choice. CA-B rated or better for ground contact. Economical and widely available.", lifespan: "20–30 years" },
                  { name: "Hardwood Timber", desc: "Oak, black locust, and similar hardwoods for premium appearance and extended durability.", lifespan: "30–50 years" },
                ].map((w) => (
                  <div key={w.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-2">{w.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{w.desc}</p>
                    <span className="inline-block bg-amber-100 text-[var(--accent)] text-xs font-semibold px-2 py-1 rounded-full">Typical lifespan: {w.lifespan}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Best Uses for Wood Retaining Walls</h2>
              <ul className="space-y-3">
                {[
                  "Garden terraces and planting bed borders",
                  "Low-to-medium height grade changes (up to 4 feet)",
                  "Landscape features where natural aesthetics are important",
                  "Areas with good natural drainage",
                  "Budget-conscious projects where lifespan tradeoff is acceptable",
                  "Temporary retaining solutions or phased projects",
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

      <CtaBand title="Get a Free Wood Wall Quote Today" />
    </>
  );
}
