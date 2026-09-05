import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { servicePhoto } from "@/components/ServicesGrid";
import { ArrowRightIcon } from "@/components/icons";
import { getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lighting Services Kitchener-Waterloo | Classic",
  description: "Christmas light installation, residential and commercial lighting, tree wrapping, light rental and decoration services for Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Free quote.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero photo={PICKS.heroHome} eyebrow="All services" title="Everything from the roofline to the front door." intro="One local crew for homes, storefronts, trees and events across Waterloo Region and Southern Ontario. Lights supplied, installed, maintained and taken down." crumbs={[{ label: "Services" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group flex flex-col overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl group-hover:text-[var(--candy)]">{svc.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{svc.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--candy-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
      <Contact />
    </>
  );
}
