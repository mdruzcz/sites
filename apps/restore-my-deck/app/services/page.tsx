import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { PricingBand } from "@/components/PricingBand";
import { ArrowRightIcon } from "@/components/icons";
import { getServices, servicePhoto } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck & Fence Services: Cleaning, Staining, Repair, Rebuilding",
  description: "Every deck and fence service Restore My Deck offers across Kitchener-Waterloo and Southwestern Ontario: power washing, cleaning, sanding, sealing, staining, painting, repair and rebuilding.",
  alternates: { canonical: `${site.url}/services` },
};

const GROUPS: { key: "pressure-washing" | "sealing" | "repair"; title: string; blurb: string; hub?: string }[] = [
  { key: "pressure-washing", title: "Cleaning and power washing", blurb: "Eco-friendly detergents and the right pressure for the wood. The first step of every restoration.", hub: "pressure-washing-services" },
  { key: "sealing", title: "Staining, sealing and painting", blurb: "80-grit sand, then brush-applied oil-based stain or paint that soaks in and lasts.", hub: "sealing-services" },
  { key: "repair", title: "Repair, restoration and rebuilding", blurb: "Loose boards, soft spots and railings fixed, or a full rebuild when the structure is past saving." },
];

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero photo={PICKS.heroServices} eyebrow="All services" title="Every deck and fence service, one crew." intro="From a quick power wash to a full teardown and rebuild. Most restorations run clean, repair, sand and stain over two days." crumbs={[{ label: "Services" }]} compact />
      {GROUPS.map((g, gi) => {
        const items = services.filter((s) => s.category === g.key && s.slug !== g.hub);
        return (
          <section key={g.key} className={gi % 2 ? "bg-white" : "bg-[var(--paper)]"}>
            <div className="shell section">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl"><p className="eyebrow-pill">{g.title}</p><p className="mt-4 text-[var(--ink-soft)]">{g.blurb}</p></div>
                {g.hub && <Link href={`/${g.hub}`} className="btn-outline btn-sm">About {g.title.toLowerCase()}</Link>}
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((svc) => (
                  <Link key={svc.slug} href={`/${svc.slug}`} className="card card-lift group flex flex-col overflow-hidden">
                    <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-xl group-hover:text-[var(--accent-deep)]">{svc.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{svc.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <PricingBand />
      <CtaBand />
      <Contact />
    </>
  );
}
