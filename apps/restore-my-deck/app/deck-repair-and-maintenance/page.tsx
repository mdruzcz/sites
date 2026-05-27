import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Repair & Maintenance in Kitchener-Waterloo | Fix Before Replace",
  description: "Professional deck repair in Kitchener-Waterloo — loose boards, rotted wood, unstable railings, structural damage. We fix it before staining. Free quotes.",
  openGraph: { title: "Deck Repair & Maintenance | Restore My Deck", url: `${site.url}/deck-repair-and-maintenance` },
};

const faqs = [
  { q: "Can you repair before staining?", a: "Yes — we always complete all repairs before any staining or sealing. This ensures a seamless final result." },
  { q: "Do you handle rot?", a: "We can replace rotted boards and sections. If structural joists or beams are compromised, we&apos;ll let you know and discuss rebuilding options." },
  { q: "Do you work on composite decks?", a: "We handle wood, composite and other deck types for repair and maintenance." },
];

export default function DeckRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Repair & Maintenance", "Professional deck repair including loose boards, rot, unstable railings and structural damage.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Repair & Maintenance", href: "/deck-repair-and-maintenance" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Repair & Maintenance</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Deck Repair & Maintenance</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">Loose boards, rotted sections, unstable railings, structural issues — we fix it all before finishing. Serving Kitchener-Waterloo and area.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">What We Repair</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "🔧", title: "Loose Boards", desc: "Re-secure or replace boards that have lifted, split or become unstable." },
                  { icon: "🪵", title: "Rotted Wood", desc: "Remove and replace rotted decking boards, posts and beams." },
                  { icon: "🛡️", title: "Unstable Railings", desc: "Reinforce or replace railings that no longer meet safety standards." },
                  { icon: "🏗️", title: "Structural Damage", desc: "Address joist, beam and post issues that compromise the deck&apos;s structure." },
                ].map((r) => (
                  <div key={r.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="text-2xl mb-2">{r.icon}</div>
                    <h3 className="font-bold text-[var(--dark)] mb-1">{r.title}</h3>
                    <p className="text-gray-600 text-sm">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our Repair Process</h2>
              <div className="space-y-3">
                {["Thorough inspection to identify all issues", "Detailed repair plan and transparent quote", "Complete all repairs using quality materials", "Full safety check before finishing work"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white text-sm flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                    <span className="text-gray-700 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
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
      <CtaBand />
    </>
  );
}
