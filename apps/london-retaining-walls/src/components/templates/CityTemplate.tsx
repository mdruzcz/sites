import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Sections, FaqList } from "@/components/ArticleBody";
import { PhotoStrip } from "@/components/PhotoGrid";
import { QuotePanel, WallTypes } from "@/components/Sections";
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { cityPhoto, finished, PICKS } from "@/lib/photos";
import type { CityPage } from "@/lib/content";

export default function CityTemplate({ page, index }: { page: CityPage; index: number }) {
  const hero = cityPhoto(index);
  const city = site.cities.find((c) => c.route === page.slug);
  const photos = finished(["segmental-block", "timber", "poured-concrete", "natural-stone"], 6, [hero]);
  const url = `${site.url}/${page.slug}`;
  return (
    <>
      <JsonLd data={serviceSchema("Retaining wall installation and repair", page.metaDescription, url, page.city)} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }, { name: page.city, href: `/${page.slug}` }])} />
      <PageHero photo={hero} kicker={`${page.city}, ${page.region} · ${page.county}`} title={page.h1} intro={page.intro} crumbs={[{ name: "Home", href: "/" }, { name: "Service areas", href: "/service-areas" }, { name: page.city, href: `/${page.slug}` }]} />

      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-x grid gap-6 py-8 md:grid-cols-3">
          <div><p className="kicker">Ground conditions</p><p className="mt-2 text-[15px] text-ink-2">{page.terrainNote}</p></div>
          <div><p className="kicker">Getting there</p><p className="mt-2 text-[15px] text-ink-2">{page.driveNote}</p></div>
          <div><p className="kicker">Areas we work in</p><p className="mt-2 text-[15px] text-ink-2">{page.areas.join(" · ")}</p></div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <article>
            <Sections sections={page.sections} />
            <FaqList faqs={page.faqs} title={`Questions from ${page.city} homeowners`} />
            {city?.primary && (
              <div className="mt-12 border border-[var(--line)] bg-white p-6">
                <p className="kicker">Services in {page.city}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {site.services.map((s) => <li key={s.slug}><Link href={`/${s.slug}/${city.slug}`} className="flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-accent-2"><span className="h-2 w-2 bg-accent" aria-hidden />{s.name} in {page.city}</Link></li>)}
                </ul>
              </div>
            )}
            <div className="mt-8 border border-[var(--line)] bg-white p-6">
              <p className="kicker">Nearby</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {page.nearby.map((n) => { const c = site.cities.find((x) => x.name === n); return <li key={n}>{c ? <Link href={`/${c.route}`} className="tag !text-ink hover:border-accent hover:bg-accent-soft">{n}</Link> : <span className="tag">{n}</span>}</li>; })}
              </ul>
            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <QuotePanel title={`Free quote in ${page.city}`} source={page.slug} />
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--line)]">
              <Image src={PICKS.drainageFabric.image} alt={PICKS.drainageFabric.alt} fill sizes="360px" placeholder="blur" blurDataURL={PICKS.drainageFabric.blurDataURL} className="object-cover" />
              <p className="absolute inset-x-0 bottom-0 bg-ink/80 px-3 py-2 text-[13px] text-paper">Filter fabric and clear stone behind every wall we build</p>
            </div>
          </aside>
        </div>
      </section>

      <PhotoStrip photos={photos} title={`Walls we have built near ${page.city}`} text="A sample of finished block, timber, concrete and stone walls from our crew's camera roll." />
      <WallTypes title={`Wall types we build in ${page.city}`} kicker="Options" />
      <CtaBand title={page.cta} />
    </>
  );
}
