import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Pressure Washing Services | Deck & Fence Cleaning",
  description: "Professional pressure washing services in Kitchener-Waterloo — deck restoration, deck cleaning, power washing and fence cleaning using eco-friendly solutions.",
  openGraph: { title: "Pressure Washing Services | Restore My Deck", url: `${site.url}/pressure-washing-services` },
};

const services = [
  { name: "Deck Restoration", href: "/deck-restoration", desc: "Complete 4-step process: clean, repair, sand and stain." },
  { name: "Deck Cleaning", href: "/deck-cleaning", desc: "Deep eco-friendly clean removing mold, algae and grey wood fibres." },
  { name: "Deck Power Washing", href: "/deck-power-washing", desc: "Calibrated pressure washing that cleans without damaging wood." },
  { name: "Fence Cleaning", href: "/fence-cleaning", desc: "Clean wood and vinyl fences before staining or painting." },
];

export default function PressureWashingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Pressure Washing Services", href: "/pressure-washing-services" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Pressure Washing Services</h1>
          <p className="mt-4 text-gray-400 text-lg">Professional eco-friendly deck and fence washing in Kitchener-Waterloo and area. Removes mold, algae and weathering — essential before any staining.</p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 gap-6 max-w-4xl">
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
