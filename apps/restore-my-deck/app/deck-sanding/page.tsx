import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Sanding in Kitchener-Waterloo | 80-Grit Buff Sanding",
  description: "Professional 80-grit deck sanding in Kitchener-Waterloo. Opens wood pores for better stain absorption and removes splinters and rough grain. Free quotes.",
  openGraph: { title: "Deck Sanding | Restore My Deck", url: `${site.url}/deck-sanding` },
};

export default function DeckSandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Sanding", "Professional 80-grit deck sanding to open wood pores for superior stain absorption.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Sanding", href: "/deck-sanding" }])) }} />

      <PageHero
        eyebrow="Sealing Services"
        title="Deck Sanding"
        subtitle="80-grit buff sanding that opens wood pores for superior stain absorption — one of the key steps that sets our results apart."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Why 80-Grit Sanding Matters</h2>
            <p className="text-gray-600 leading-relaxed">Sanding is not just cosmetic. At 80-grit, we open the wood pores just enough to allow stain to penetrate deeply — without removing too much material. The result is a stain that lasts significantly longer than on an un-sanded surface.</p>
            <p className="text-gray-600 leading-relaxed">Sanding also removes splinters, rough grain and surface contamination that cleaning alone can&apos;t address. It&apos;s a step many other services skip — we don&apos;t.</p>
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
