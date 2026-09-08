import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Sections, FaqList, TableOfContents } from "@/components/ArticleBody";
import { PhotoStrip } from "@/components/PhotoGrid";
import { QuotePanel, Process } from "@/components/Sections";
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { finished, SERVICE_HERO, HERO_BY_MATERIAL } from "@/lib/photos";
import type { ServicePage } from "@/lib/content";
import { getGuides } from "@/lib/content";

const MATERIALS_FOR: Record<string, string | string[]> = {
  "retaining-wall-installation": ["segmental-block", "timber", "poured-concrete", "natural-stone"],
  "block-retaining-walls": "segmental-block",
  "concrete-retaining-walls": "poured-concrete",
  "wood-and-timber-retaining-walls": "timber",
  "natural-stone-retaining-walls": ["natural-stone", "armour-stone", "boulder"],
  "terraced-retaining-walls": ["timber", "segmental-block"],
  "retaining-wall-repair": ["segmental-block", "timber"],
};

export default function ServiceTemplate({ page }: { page: ServicePage }) {
  const hero = SERVICE_HERO[page.slug] ?? HERO_BY_MATERIAL[page.photoMaterial];
  const photos = finished(MATERIALS_FOR[page.slug] ?? page.photoMaterial, 6, [hero]);
  const guides = getGuides().filter((g) => page.relatedGuides?.includes(g.slug));
  const url = `${site.url}/${page.slug}`;
  const cities = site.cities.filter((c) => c.primary);
  return (
    <>
      <JsonLd data={serviceSchema(page.shortName, page.metaDescription, url)} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: page.shortName, href: `/${page.slug}` }])} />
      <PageHero photo={hero} kicker="Retaining wall service" title={page.h1} intro={page.intro} crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: page.shortName, href: `/${page.slug}` }]} />

      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-x grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="kicker">Best for</p>
            <ul className="mt-2 flex flex-wrap gap-2">{page.bestFor.map((b) => <li key={b} className="tag !text-ink">{b}</li>)}</ul>
          </div>
          <p className="max-w-sm text-[15px] text-ink-2"><span className="font-display font-bold uppercase tracking-wide text-ink">Pricing. </span>{page.priceNote}</p>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <article>
            <Sections sections={page.sections} />
            <FaqList faqs={page.faqs} />
            <div className="mt-12 border border-[var(--line)] bg-white p-6">
              <p className="kicker">Where we build this</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cities.map((c) => <li key={c.slug}><Link href={`/${page.slug}/${c.slug}`} className="tag !text-ink hover:border-accent hover:bg-accent-soft">{page.shortName} in {c.name}</Link></li>)}
                <li><Link href="/service-areas" className="tag !text-accent-2">All areas</Link></li>
              </ul>
            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <QuotePanel title={`${page.shortName} quote`} source={page.slug} />
            <TableOfContents sections={page.sections} />
            {guides.length > 0 && (
              <div className="border border-[var(--line)] bg-white p-5">
                <p className="kicker">Read before you decide</p>
                <ul className="mt-3 space-y-3">
                  {guides.map((g) => <li key={g.slug}><Link href={`/${g.slug}`} className="font-semibold text-ink hover:text-accent-2">{g.h1}</Link><p className="text-[13px] text-stone">{g.readMinutes} min read</p></li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {photos.length > 0 && <PhotoStrip photos={photos} title={`${page.shortName} we have built`} text="Real jobs across London and Southwestern Ontario, photographed by our crew." />}
      <Process />
      <CtaBand title={page.cta} />
    </>
  );
}
