import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Sections, FaqList } from "@/components/ArticleBody";
import { PhotoStrip } from "@/components/PhotoGrid";
import { QuotePanel } from "@/components/Sections";
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { finished, SERVICE_HERO, HERO_BY_MATERIAL, cityPhoto } from "@/lib/photos";
import type { ServiceCityPage } from "@/lib/content";

export default function ServiceCityTemplate({ page }: { page: ServiceCityPage }) {
  const svc = site.services.find((s) => s.slug === page.service)!;
  const city = site.cities.find((c) => c.slug === page.slug.split("/")[1])!;
  const cityIdx = site.cities.indexOf(city);
  const svcIdx = site.services.indexOf(svc);
  // Alternate hero between the service photo and a city rotation so the 28 pages do not all share one image.
  const hero = (cityIdx + svcIdx) % 2 === 0 ? SERVICE_HERO[page.service] ?? HERO_BY_MATERIAL[page.photoMaterial] : cityPhoto(cityIdx * 3 + svcIdx);
  const photos = finished(page.photoMaterial === "repair" ? ["segmental-block", "timber"] : page.photoMaterial === "mixed" ? ["segmental-block", "timber", "poured-concrete"] : page.photoMaterial, 3, [hero]);
  const url = `${site.url}/${page.slug}`;
  const crumbs = [{ name: "Home", href: "/" }, { name: svc.short, href: `/${svc.slug}` }, { name: city.name, href: `/${page.slug}` }];
  return (
    <>
      <JsonLd data={serviceSchema(svc.name, page.metaDescription, url, city.name)} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero photo={hero} kicker={`${svc.name} · ${city.name}, ON`} title={page.h1} intro={page.intro} crumbs={crumbs} compact />
      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <article>
            <Sections sections={page.sections} />
            <FaqList faqs={page.faqs} />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/${svc.slug}`} className="btn btn-outline">All about {svc.short.toLowerCase()} walls</Link>
              <Link href={`/${city.route}`} className="btn btn-outline">Retaining walls in {city.name}</Link>
            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <QuotePanel title={`${svc.short} quote, ${city.name}`} source={page.slug} />
            <div className="border border-[var(--line)] bg-white p-5">
              <p className="kicker">Same service, nearby</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {site.cities.filter((c) => c.primary && c.slug !== city.slug).map((c) => <li key={c.slug}><Link href={`/${svc.slug}/${c.slug}`} className="font-semibold text-ink hover:text-accent-2">{svc.short} in {c.name}</Link></li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      {photos.length > 0 && <PhotoStrip photos={photos} title={`${svc.short} walls from our crew`} />}
      <CtaBand title={page.cta} />
    </>
  );
}
