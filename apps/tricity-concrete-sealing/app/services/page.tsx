import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { FinishesSection } from "@/components/FinishesSection";
import { servicePhoto } from "@/components/ServicesGrid";
import { ArrowRightIcon } from "@/components/icons";
import { getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Sealing Services | Driveways, Patios, Stamped & More",
  description: "Driveway, patio, stamped concrete, walkway, exposed aggregate and commercial sealing across London, Woodstock, Brantford and SW Ontario. Solvent-based sealers in matte, semi-gloss or gloss.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero photo={PICKS.heroHome} eyebrow="All services" title="Every concrete surface, sealed to last." intro="Six services, one product line, one warranty. Every job is pressure washed, prepped, sprayed and back-rolled with a high-quality solvent-based sealer in the finish you choose." crumbs={[{ label: "Services" }]} compact />
      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group flex flex-col overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl group-hover:text-[var(--accent-deep)]">{svc.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{svc.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {svc.benefits.slice(0, 3).map((b) => <li key={b} className="rounded-full bg-[var(--stone)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-soft)]">{b}</li>)}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FinishesSection compact />
      <CtaBand />
      <Contact />
    </>
  );
}
