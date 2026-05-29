import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Restoration in Kitchener-Waterloo | Complete 4-Step Process",
  description: "Professional deck restoration in Kitchener-Waterloo — deep cleaning, repair, 80-grit sanding and brush-applied oil stain. Restore your deck without replacement. Free quotes.",
  openGraph: { title: "Deck Restoration | Restore My Deck", url: `${site.url}/deck-restoration` },
};

const faqs = [
  { q: "What does the deck restoration process include?", a: "Our 4-step process: thorough eco-friendly cleaning, board repair and replacement, 80-grit buff sanding, then brush-applied premium oil-based stain." },
  { q: "How long does deck restoration take?", a: "Most projects are completed in about 2 days including drying time. Large decks may take up to 3 days." },
  { q: "What stain do you use for deck restoration?", a: "We use semi-transparent oil-based stains — primarily Ready Seal and Penofin Verde. Both are VOC compliant and eco-friendly." },
  { q: "How often should I restore my deck?", a: "We recommend a full restoration every 5–7 years, with maintenance re-staining every 2–4 years in between." },
];

export default function DeckRestorationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Restoration", "Complete 4-step professional deck restoration including cleaning, repair, sanding and oil-based staining.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Restoration", href: "/deck-restoration" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Pressure Washing Services"
        title="Deck Restoration"
        subtitle="Complete 4-step restoration that brings weathered decks back to life — without replacement. Serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton and area."
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
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our 4-Step Deck Restoration Process</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Thorough Cleaning", desc: "We use eco-friendly cleaning solutions to remove mold, algae, dirt and weathered grey wood fibres." },
                  { step: "2", title: "Repair & Replacement", desc: "Loose boards, rotted sections and unstable railings are repaired or replaced before any finishing work." },
                  { step: "3", title: "Quality Staining", desc: "After 80-grit buff sanding, we brush-apply a premium oil-based stain — deeply penetrating the wood grain." },
                  { step: "4", title: "Final Inspection", desc: "We walk through the completed work with you to ensure everything meets our quality standard." },
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
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Why Choose Brush-Applied Stain?</h2>
              <p className="text-gray-600 leading-relaxed">Unlike spraying, brush application forces the stain deeper into the wood grain. This means better protection, a more even finish and a result that lasts 2–4 years before re-staining is needed. We use semi-transparent oil-based stains that fade gracefully — they never peel.</p>
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

      <CtaBand title="Restore Your Deck Without Replacement" />
    </>
  );
}
