import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Service Areas | Deck & Fence Restoration in Southwestern Ontario",
  description: "Restore My Deck serves Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Stratford, Woodstock, Fergus, Paris, Brantford, Elmira and surrounding areas in Ontario.",
  openGraph: { title: "Service Areas | Restore My Deck", url: `${site.url}/service-areas` },
};

const cities = [
  { name: "Kitchener", href: "/kitchener-deck-fence-staining", desc: "Professional deck and fence restoration in Kitchener, ON." },
  { name: "Waterloo", href: "/waterloo-deck-fence-staining", desc: "Deck staining and fence restoration services in Waterloo, ON." },
  { name: "Cambridge", href: "/cambridge-deck-staining", desc: "Expert deck staining and restoration in Cambridge, ON." },
  { name: "Guelph", href: "/guelph-deck-fence-staining", desc: "Deck and fence staining services in Guelph, ON." },
  { name: "Hamilton", href: "/hamilton-deck-fence-staining", desc: "Professional deck restoration in Hamilton, ON." },
  { name: "Stratford", href: "/stratford-deck-staining", desc: "Deck staining and restoration in Stratford, ON." },
  { name: "Woodstock", href: "/woodstock-deck-staining", desc: "Deck and fence services in Woodstock, ON." },
  { name: "Fergus", href: "/fergus-deck-staining", desc: "Professional deck restoration in Fergus, ON." },
  { name: "Paris", href: "/paris-deck-staining", desc: "Deck staining services in Paris, ON." },
  { name: "Brantford", href: "/service-areas", desc: "Also serving Brantford and area." },
  { name: "Elmira", href: "/service-areas", desc: "Serving Elmira and Woolwich Township." },
  { name: "St. Jacobs", href: "/service-areas", desc: "Serving St. Jacobs and surrounding area." },
];

export default function ServiceAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Service Areas</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Restore My Deck proudly serves communities across Southwestern Ontario — from Kitchener-Waterloo to Guelph, Hamilton, Stratford and beyond.</p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link key={city.name} href={city.href} className="card p-6 group hover:border-[var(--accent)] border-2 border-transparent transition-colors">
                <h2 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{city.name}</h2>
                <p className="text-gray-600 text-sm">{city.desc}</p>
                <span className="mt-4 inline-flex items-center text-[var(--accent)] text-sm font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">Don&apos;t See Your City?</h2>
            <p className="text-gray-600 mb-6">We serve many more communities in the region. Contact us to confirm we serve your area — chances are we do!</p>
            <Link href="/contact-us" className="btn btn-accent">Check Your Area</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
