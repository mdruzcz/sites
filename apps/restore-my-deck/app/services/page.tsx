import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Services | Deck & Fence Restoration, Staining & Repair",
  description: "Explore all Restore My Deck services — deck restoration, staining, cleaning, power washing, sealing, sanding, repair, rebuilding, fence staining and painting in Kitchener-Waterloo.",
  openGraph: { title: "Services | Restore My Deck", url: `${site.url}/services` },
};

const categories = [
  {
    title: "Pressure Washing Services",
    href: "/pressure-washing-services",
    desc: "Deep cleaning for decks and fences to remove mold, algae and weathered wood fibres.",
    services: [
      { name: "Deck Restoration", href: "/deck-restoration" },
      { name: "Deck Cleaning", href: "/deck-cleaning" },
      { name: "Deck Power Washing", href: "/deck-power-washing" },
      { name: "Fence Cleaning", href: "/fence-cleaning" },
    ],
  },
  {
    title: "Sealing Services",
    href: "/sealing-services",
    desc: "Staining, sealing, sanding and painting to protect and beautify your wood.",
    services: [
      { name: "Deck Staining", href: "/deck-staining" },
      { name: "Deck Sealing", href: "/deck-sealing" },
      { name: "Deck Sanding", href: "/deck-sanding" },
      { name: "Fence Staining", href: "/fence-staining" },
      { name: "Fence Painting", href: "/fence-painting" },
    ],
  },
  {
    title: "Deck Repair & Maintenance",
    href: "/deck-repair-and-maintenance",
    desc: "Fix loose boards, rot, unstable railings and structural damage.",
    services: [
      { name: "Deck Repair & Maintenance", href: "/deck-repair-and-maintenance" },
    ],
  },
  {
    title: "Deck Rebuilding",
    href: "/deck-rebuilding",
    desc: "Complete teardown and rebuild with custom sizing, layouts and features.",
    services: [
      { name: "Deck Rebuilding", href: "/deck-rebuilding" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])) }} />

      <PageHero
        title="Our Services"
        subtitle="From a basic power wash to a full deck rebuild — we offer a complete range of professional wood restoration services."
        center
      />

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 space-y-12">
          {categories.map((cat) => (
            <div key={cat.href} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[var(--dark)] p-6 md:p-8">
                <Link href={cat.href} className="text-xl font-bold text-white hover:text-[var(--accent)] transition-colors">{cat.title}</Link>
                <p className="mt-2 text-gray-400 text-sm">{cat.desc}</p>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.services.map((s) => (
                  <Link key={s.href} href={s.href} className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium transition-all group">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:scale-110 transition-transform" />
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
