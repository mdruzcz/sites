import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Rebuilding in Kitchener-Waterloo | Custom Decks Built to Last",
  description: "Professional deck rebuilding in Kitchener-Waterloo — complete teardown and rebuild with custom sizing, layouts and features. Free quotes from Restore My Deck.",
  openGraph: { title: "Deck Rebuilding | Restore My Deck", url: `${site.url}/deck-rebuilding` },
};

export default function DeckRebuildingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Rebuilding", "Complete deck teardown and rebuild with custom sizing, layouts and features.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Rebuilding", href: "/deck-rebuilding" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Deck Rebuilding</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Deck Rebuilding</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">When restoration isn&apos;t enough, we do complete teardown and rebuilds. Custom size, design, features — built to last and finished beautifully.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Complete Deck Rebuild Services</h2>
            <p className="text-gray-600 leading-relaxed">Sometimes a deck is beyond restoration — structural damage, severe rot or simply the desire for a new design. We handle complete teardowns and rebuilds from start to finish, including permits (where required), framing, decking, railings and finishing.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Custom Sizing", desc: "Resize or expand your deck to better suit your outdoor space." },
                { title: "New Design", desc: "Change the layout, shape or level configuration." },
                { title: "Built-in Features", desc: "Add built-in seating, planters, lighting and more." },
                { title: "Quality Materials", desc: "Pressure-treated lumber, cedar, composite or composite/wood hybrid." },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[var(--dark)] mb-1">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
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
      <CtaBand title="Ready to Build Your Dream Deck?" />
    </>
  );
}
