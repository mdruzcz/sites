import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Process, WhyUs } from "@/components/Sections";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS, SERVICE_HERO } from "@/lib/photos";
import { getServices } from "@/lib/content";

export const revalidate = 3600;
const TITLE = "Retaining Wall Services in London, Ontario | Block & Timber";
const DESC = "Retaining wall installation, repair and terracing in London, Ontario. Interlocking block, poured concrete, timber and natural stone walls, drainage built in.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/services` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/services`, images: [{ url: PICKS.services.image, alt: PICKS.services.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

export default function ServicesPage() {
  const services = getServices();
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.shortName, url: `${site.url}/${s.slug}` })) };
  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />
      <PageHero photo={PICKS.services} kicker="Services" title="Retaining wall services in London and Southwestern Ontario" intro="Seven ways we solve a grade problem. Pick the one that fits, or let Kyle recommend it on the site visit." crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <section className="section bg-paper">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const p = SERVICE_HERO[s.slug];
            return (
              <Link key={s.slug} href={`/${s.slug}`} className="group card grid overflow-hidden sm:grid-cols-[200px_1fr]">
                <div className="relative aspect-[4/3] sm:aspect-auto"><Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw, 200px" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
                <div className="p-5">
                  <h2 className="font-display text-xl font-extrabold uppercase tracking-tight group-hover:text-accent-2">{s.h1}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.cardBlurb}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">{s.bestFor.slice(0, 3).map((b) => <li key={b} className="tag">{b}</li>)}</ul>
                  <p className="mt-3 text-[13px] text-stone">{s.priceNote}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Process />
      <WhyUs />
      <CtaBand />
    </>
  );
}
