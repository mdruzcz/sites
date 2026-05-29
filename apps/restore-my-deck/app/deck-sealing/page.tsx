import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Sealing in Kitchener-Waterloo | Waterproof Protection",
  description: "Professional deck sealing in Kitchener-Waterloo. Protect your deck from moisture, UV damage and rot with quality sealants. Free quotes from Restore My Deck.",
  openGraph: { title: "Deck Sealing | Restore My Deck", url: `${site.url}/deck-sealing` },
};

export default function DeckSealingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Sealing", "Professional deck sealing to protect against moisture, UV damage and wood rot.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Sealing", href: "/deck-sealing" }])) }} />

      <PageHero
        eyebrow="Sealing Services"
        title="Deck Sealing"
        subtitle="Quality deck sealants that protect against moisture penetration, UV fading and wood rot. Extending your deck's lifespan significantly."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Why Seal Your Deck?</h2>
            <p className="text-gray-600 leading-relaxed">Unsealed wood absorbs water with every rain. Over time this leads to swelling, cracking, mold growth and eventually rot. A quality sealant creates a moisture barrier while allowing the wood to breathe — dramatically extending its lifespan.</p>
            <p className="text-gray-600 leading-relaxed">Our oil-based stains include built-in sealers, meaning the staining and sealing step are combined into one efficient service. For decks that don&apos;t need colour, we offer clear sealant applications as well.</p>
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
