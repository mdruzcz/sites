import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Service Areas | Retaining Wall Contractor in Southwestern Ontario",
  description: "London Retaining Walls serves London, Woodstock, Brantford, St. Thomas, Strathroy, Dorchester, Aylmer, Ilderton, Komoka, Mount Brydges, Lucan, Delaware and surrounding areas.",
  openGraph: { title: "Service Areas | London Retaining Walls", url: `${site.url}/service-areas` },
};

const cities = [
  { name: "London", href: "/london-retaining-wall-contractor", desc: "Professional retaining wall installation and repair in London, ON." },
  { name: "Woodstock", href: "/woodstock-retaining-wall-contractor", desc: "Retaining wall contractor serving Woodstock and Oxford County." },
  { name: "Brantford", href: "/brantford-retaining-wall-contractor", desc: "Concrete, block and wood retaining walls in Brantford, ON." },
  { name: "St. Thomas", href: "/st-thomas-retaining-wall-contractor", desc: "Retaining wall installation and repair in St. Thomas, ON." },
  { name: "Strathroy", href: "/strathroy-retaining-wall-contractor", desc: "Retaining wall services in Strathroy and Middlesex County." },
  { name: "Dorchester", href: "/dorchester-retaining-wall-contractor", desc: "Professional retaining walls in Dorchester, ON." },
  { name: "Aylmer", href: "/aylmer-retaining-wall-contractor", desc: "Retaining wall installation and repair in Aylmer, ON." },
  { name: "Ilderton", href: "/ilderton-retaining-wall-contractor", desc: "Retaining wall contractor serving Ilderton and Middlesex Centre." },
  { name: "Komoka", href: "/komoka-retaining-wall-contractor", desc: "Retaining wall installation in Komoka, ON." },
  { name: "Mount Brydges", href: "/mount-brydges-retaining-wall-contractor", desc: "Professional retaining walls in Mount Brydges, ON." },
  { name: "Lucan", href: "/lucan-retaining-wall-contractor", desc: "Retaining wall services in Lucan and Biddulph Township." },
  { name: "Delaware", href: "/delaware-retaining-wall-contractor", desc: "Retaining wall installation and repair in Delaware, ON." },
];

export default function ServiceAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }])) }} />

      <PageHero
        title="Service Areas"
        subtitle="London Retaining Walls proudly serves communities across Southwestern Ontario — from London to Woodstock, Brantford, St. Thomas and all surrounding communities."
        center
      />

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
            <p className="text-gray-600 mb-6">We serve many more communities across Southwestern Ontario. Contact us to confirm we serve your area — chances are we do!</p>
            <Link href="/contact-us" className="btn btn-accent">Check Your Area</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
