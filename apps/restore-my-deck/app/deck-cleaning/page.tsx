import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Cleaning in Kitchener-Waterloo | Eco-Friendly Deep Clean",
  description: "Professional eco-friendly deck cleaning in Kitchener-Waterloo. Remove mold, algae and weathered wood fibres to prepare your deck for staining or sealing. Free quotes.",
  openGraph: { title: "Deck Cleaning | Restore My Deck", url: `${site.url}/deck-cleaning` },
};

export default function DeckCleaningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Cleaning", "Eco-friendly professional deck cleaning to remove mold, algae and weathered wood fibres.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Cleaning", href: "/deck-cleaning" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Pressure Washing Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Deck Cleaning</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">Deep eco-friendly cleaning that removes mold, algae, dirt and greyed wood fibres — preparing your deck for staining or just refreshing its appearance.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Why Annual Deck Cleaning Matters</h2>
            <p className="text-gray-600 leading-relaxed">Ontario&apos;s climate brings moisture, freeze-thaw cycles and UV exposure that degrade wood over time. Mold and algae growth accelerates this decay. Annual professional cleaning extends your deck&apos;s lifespan, keeps it safe (reduces slippery surfaces) and maintains curb appeal.</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {[
                { icon: "🌿", title: "Eco-Friendly", desc: "Safe for plants, pets and the surrounding environment." },
                { icon: "🧹", title: "Deep Clean", desc: "Removes mold, algae, tannins and grey wood surface fibres." },
                { icon: "🖌️", title: "Stain-Ready", desc: "Proper cleaning is essential before any stain or sealant application." },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm text-center">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-[var(--dark)] mb-1">{f.title}</h3>
                  <p className="text-gray-600 text-xs">{f.desc}</p>
                </div>
              ))}
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
