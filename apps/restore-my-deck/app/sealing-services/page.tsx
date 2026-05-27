import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Sealing Services | Deck Staining, Sealing, Sanding & Fence Staining",
  description: "Professional deck and fence sealing services in Kitchener-Waterloo — staining, sealing, sanding and painting using premium eco-friendly products.",
  openGraph: { title: "Sealing Services | Restore My Deck", url: `${site.url}/sealing-services` },
};

const services = [
  { name: "Deck Staining", href: "/deck-staining", desc: "Brush-applied oil-based staining using Ready Seal and Penofin Verde." },
  { name: "Deck Sealing", href: "/deck-sealing", desc: "Waterproof protection against moisture, UV fading and rot." },
  { name: "Deck Sanding", href: "/deck-sanding", desc: "80-grit buff sanding that opens wood pores for superior stain absorption." },
  { name: "Fence Staining", href: "/fence-staining", desc: "Premium stain for fences — deep penetration, never peels." },
  { name: "Fence Painting", href: "/fence-painting", desc: "Professional solid colour finish for fences." },
];

export default function SealingServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Sealing Services", href: "/sealing-services" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Sealing Services</h1>
          <p className="mt-4 text-gray-400 text-lg">Deck and fence staining, sealing, sanding and painting in Kitchener-Waterloo. Premium eco-friendly products. Brush-applied for lasting results.</p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="card p-6 group hover:border-[var(--accent)] border-2 border-transparent transition-colors">
              <h2 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{s.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
              <span className="text-[var(--accent)] text-sm font-semibold">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
