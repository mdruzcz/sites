import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { servicePhoto } from "@/components/ServicesGrid";
import { services } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Holiday Lighting Services: Classic & Permanent Lights",
  description: "Two ways to light your home or business in Southern Ontario: classic seasonal Christmas light installation, or permanent app-controlled LED roofline systems. Plus commercial, municipal, tree and interior lighting.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services" },
};

export default function ServicesPage() {
  return (
    <>
      <NavBar />
      <PageHero photo={PICKS.heroHome} eyebrow="All services" title="Classic lights that go up each November, or permanent lights that never come down." intro="Many clients do both. We handle everything for homes and businesses across Southern Ontario." crumbs={[{ label: "Services" }]} compact />
      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group flex flex-col overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
              <div className="flex flex-1 flex-col p-6">
                <p className={`eyebrow-pill ${svc.slug === "permanent-lighting" ? "candy" : "pine"}`}>{svc.slug === "permanent-lighting" ? "Year-round" : svc.slug === "christmas-light-installation" ? "Seasonal" : svc.shortName}</p>
                <h2 className="font-display mt-3 text-xl group-hover:text-[var(--candy)]">{svc.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{svc.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--candy-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
