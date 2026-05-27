import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Deck Power Washing in Kitchener-Waterloo | Professional Pressure Washing",
  description: "Professional deck power washing in Kitchener-Waterloo. We use calibrated pressure to clean without damaging wood fibres. Ideal prep for staining. Free quotes.",
  openGraph: { title: "Deck Power Washing | Restore My Deck", url: `${site.url}/deck-power-washing` },
};

export default function DeckPowerWashingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Deck Power Washing", "Professional deck pressure washing to remove dirt, mold and algae without damaging wood.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Deck Power Washing", href: "/deck-power-washing" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Pressure Washing Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Deck Power Washing</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">Professional pressure washing with calibrated PSI to clean your deck effectively without damaging the wood. Serving Kitchener-Waterloo and area.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Power Washing Done Right</h2>
            <p className="text-gray-600 leading-relaxed">DIY pressure washing can damage wood if done at the wrong pressure or angle. Our team uses the right PSI settings and specialized nozzles for each wood type. We also apply eco-friendly cleaning solutions before washing to break down stubborn mold and algae colonies.</p>
            <p className="text-gray-600 leading-relaxed">Power washing is typically the first step in any deck restoration. Properly cleaned wood absorbs stain more evenly and achieves a longer-lasting result.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Calibrated Pressure", desc: "Right PSI for each wood type — no splintering or grain raise." },
                { title: "Eco-Friendly Solutions", desc: "Pre-treatment with biodegradable cleaners for deep mold removal." },
                { title: "Annual Maintenance", desc: "Recommended yearly to prevent buildup and extend wood life." },
                { title: "Stain Preparation", desc: "Essential first step before any staining or sealing service." },
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
      <CtaBand />
    </>
  );
}
