import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Concrete Retaining Walls in London, Ontario | Poured & Precast",
  description: "Poured concrete and precast concrete retaining walls in London and Southwestern Ontario. The most durable option for taller walls and heavy loads. Ontario Building Code compliant. Free quotes.",
  openGraph: { title: "Concrete Retaining Walls | London Retaining Walls", url: `${site.url}/concrete-retaining-walls` },
};

const faqs = [
  { q: "What is the difference between poured concrete and precast concrete retaining walls?", a: "Poured concrete walls are formed and poured on-site, creating a monolithic structure with maximum strength. Precast concrete panels are manufactured off-site and installed in sections. Both are extremely durable — the choice depends on the project size, budget, and aesthetic goals." },
  { q: "How tall can a concrete retaining wall be?", a: "Concrete retaining walls can be built to virtually any height with proper engineering. Walls over 1 metre require a permit in Ontario, and walls over approximately 2 metres typically require an engineer's stamp. We handle all compliance requirements." },
  { q: "How long does a concrete retaining wall last?", a: "A properly built concrete retaining wall with good drainage typically lasts 50–100 years. Concrete is extremely resistant to freeze-thaw cycles, which is important for Ontario's climate." },
  { q: "Is concrete the most expensive retaining wall option?", a: "Concrete typically costs more upfront than block or wood walls, but has the lowest lifetime cost due to its extreme durability and minimal maintenance requirements. For taller walls and commercial applications, it's often the most cost-effective long-term choice." },
];

export default function ConcreteRetainingWallsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Concrete Retaining Walls", "Poured concrete and precast concrete retaining wall installation in London and Southwestern Ontario.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Concrete Retaining Walls", href: "/concrete-retaining-walls" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Our Services"
        title="Concrete Retaining Walls"
        subtitle="Poured concrete and precast concrete panel retaining walls — the most durable option for taller walls, heavy loads, and long-term performance in London and Southwestern Ontario."
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
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Why Choose Concrete for Your Retaining Wall?</h2>
              <p className="text-gray-600 leading-relaxed">Concrete is the most durable retaining wall material available. It creates a monolithic, continuous structure that resists lateral soil pressure better than any other option. For walls taller than 4–5 feet, walls retaining heavy loads (like a driveway above), or commercial applications, concrete is almost always the right choice.</p>
              <p className="mt-4 text-gray-600 leading-relaxed">Ontario&apos;s freeze-thaw climate is hard on retaining walls. Concrete handles temperature cycling better than most other materials, making it particularly well-suited for our region. With proper drainage and good construction, a concrete retaining wall will outlast your home.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Poured Concrete vs. Precast Panels</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Poured Concrete", pros: ["Maximum structural strength", "Custom shapes and curves", "Monolithic — no joints to fail", "Best for tall or heavily loaded walls"] },
                  { title: "Precast Concrete Panels", pros: ["Faster installation", "Consistent quality", "Good for straight runs", "More economical for mid-height walls"] },
                ].map((option) => (
                  <div key={option.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-3">{option.title}</h3>
                    <ul className="space-y-2">
                      {option.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[var(--accent)] mt-0.5">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
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

      <CtaBand title="Build a Concrete Retaining Wall That Lasts 100 Years" />
    </>
  );
}
