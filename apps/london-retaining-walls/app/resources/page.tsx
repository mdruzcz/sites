import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS, HERO_BY_MATERIAL } from "@/lib/photos";
import { getGuides } from "@/lib/content";

export const revalidate = 3600;
const TITLE = "Retaining Wall Guides: Cost, Permits, Drainage | Ontario";
const DESC = "Plain-language retaining wall guides for Ontario homeowners: 2026 costs, permits, drainage, clay soil, material choice, lifespan, repair signs and maintenance.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/resources` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/resources`, images: [{ url: PICKS.resources.image, alt: PICKS.resources.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

export default function ResourcesPage() {
  const guides = getGuides();
  const cats = [...new Set(guides.map((g) => g.category))];
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: `${site.url}/${g.slug}` })) };
  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }])} />
      <PageHero photo={PICKS.resources} kicker="Guides and resources" title="Everything we tell customers on the site visit, written down" intro="Costs, permits, drainage, clay soil and how to spot a wall that is about to fail. Written by the crew that builds them." crumbs={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }]} />
      {cats.map((cat) => (
        <section key={cat} className="border-b border-[var(--line)] bg-paper py-12">
          <div className="container-x">
            <h2 className="display text-2xl md:text-3xl">{cat}</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.filter((g) => g.category === cat).map((g) => {
                const p = HERO_BY_MATERIAL[g.photoMaterial] ?? PICKS.homeAlt;
                return (
                  <li key={g.slug} className="group card flex flex-col overflow-hidden">
                    <Link href={`/${g.slug}`} className="relative block aspect-[16/9]"><Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw, 33vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" /></Link>
                    <div className="flex flex-1 flex-col p-5">
                      <Link href={`/${g.slug}`} className="font-display text-lg font-bold leading-snug hover:text-accent-2">{g.h1}</Link>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-2">{g.summary}</p>
                      <p className="mt-3 text-[12px] text-stone">{g.readMinutes} min read</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand title="Still have a question the guides did not answer?" text="Call or send a photo of the wall. Kyle will tell you what he sees, free, before you decide anything." />
    </>
  );
}
