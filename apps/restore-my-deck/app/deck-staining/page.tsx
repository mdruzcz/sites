import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Staining in Kitchener-Waterloo | Ready Seal & Penofin Verde",
  description: "Professional brush-applied deck staining in Kitchener-Waterloo using Ready Seal and Penofin Verde. Oil-based stains that fade gracefully and never peel. Free quotes.",
  openGraph: { title: "Deck Staining | Restore My Deck", url: `${site.url}/deck-staining` },
};

export default function DeckStainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Staining", "Professional brush-applied oil-based deck staining using Ready Seal and Penofin Verde.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Staining", href: "/deck-staining" }])) }} />

      <PageHero
        eyebrow="Sealing Services"
        title="Deck Staining"
        subtitle="Brush-applied premium oil-based staining for decks in Kitchener-Waterloo and surrounding areas. Products that fade gracefully and never peel."
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
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our Deck Staining Process</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Surface Preparation", desc: "Clean and 80-grit sand to open wood pores and remove surface contamination." },
                  { title: "Stain Selection", desc: "We help choose the right type: transparent, semi-transparent or semi-solid. Semi-transparent is most popular." },
                  { title: "Brush Application", desc: "We never spray — brush application drives stain deeper into the wood grain for a longer-lasting finish." },
                  { title: "Drying & Inspection", desc: "Final check to ensure even coverage and quality before we leave the site." },
                ].map((s) => (
                  <div key={s.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-2">{s.title}</h3>
                    <p className="text-gray-600 text-sm">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Preferred Products: Ready Seal &amp; Penofin Verde</h2>
              <p className="text-gray-600 leading-relaxed">We use <strong>Ready Seal</strong> and <strong>Penofin Verde</strong> — both VOC-compliant, eco-friendly oil-based stains. These products penetrate the wood fibres rather than sitting on top, so they fade gradually and never crack or peel. We recommend re-staining every 2–4 years.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Stain Types</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { type: "Transparent", desc: "Shows the most wood grain. Best for newer, high-quality wood." },
                  { type: "Semi-Transparent", desc: "Most popular choice. Balances colour and grain visibility. Best protection." },
                  { type: "Semi-Solid", desc: "More colour coverage. Good for weathered wood that needs even tone." },
                  { type: "Solid", desc: "Full colour coverage. Best for wood with significant blemishes." },
                ].map((t) => (
                  <div key={t.type} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <p className="font-bold text-[var(--accent)] mb-1">{t.type}</p>
                    <p className="text-gray-600 text-sm">{t.desc}</p>
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
