import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { KitCard } from "@/components/kit-card";
import { PageHero } from "@/components/page-hero";
import { Finder, QuoteBand, SectionHead, Steps } from "@/components/sections";
import { cities, getCity, kits, lowestPrice, money } from "@/lib/content";
import { JsonLd, faqLd } from "@/lib/jsonld";
import { fitTitle, pageMeta } from "@/lib/seo";
import { fill, site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.city;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const c = getCity((await params).city);
  if (!c) return {};
  const v = { city: c.name, code: c.provinceCode, province: c.province, from: money(lowestPrice()) };
  return pageMeta({ title: fitTitle(fill(p.title, v), fill(p.titleShort, v)), description: fill(p.description, v), path: `/locations/${c.slug}` });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const v = { city: c.name, code: c.provinceCode, province: c.province };
  const popular = kits.filter((k) => k.popular).slice(0, 4);
  const others = cities.filter((x) => x.slug !== c.slug && x.provinceCode === c.provinceCode).concat(cities.filter((x) => x.provinceCode !== c.provinceCode)).slice(0, 6);
  const faqs = [
    { q: `Do you deliver court kits to ${c.name}?`, a: `Yes. Kits ship on pallets by freight carrier to ${c.name} and the rest of ${c.province}. Send your postal code and we quote the kit and delivery together.` },
    { q: `How much is a backyard court kit in ${c.name}?`, a: `Kit prices start at ${money(lowestPrice())} CAD for the smallest size and are the same across Canada. Freight to ${c.name} and sales tax are added on your quote.` },
    { q: `Do I need a permit for a backyard court in ${c.name}?`, a: `Rules are set locally. Check lot coverage, setbacks, fencing and lighting rules with the municipality before you pour a pad.` },
  ];

  return (
    <>
      <PageHero photo={site.photos.locations} photoAlt={fill(p.heroAlt, v)} eyebrow={`Shipping to ${c.name}`} title={fill(p.h1, v)} intro={c.intro} crumb={c.name} trail={[{ label: "Court kits", href: "/court-kits" }]} path={`/locations/${c.slug}`}>
        <Link href="/contact#quote" className="btn btn-cta mt-6">
          Get a price delivered to {c.name} <span aria-hidden>→</span>
        </Link>
      </PageHero>

      <section className="shell section grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-block reveal">
          <h2 className="h2 !mt-0">{fill(p.bodyHeading, v)}</h2>
          {c.local.map((t) => (
            <p key={t.slice(0, 24)} className="text-[1.0625rem] text-[var(--ink)]/85">
              {t}
            </p>
          ))}
        </div>
        <aside className="card reveal h-fit p-6">
          <h2 className="h3">Also delivering near {c.name}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.nearby.map((n) => (
              <li key={n} className="pill pill-accent">
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">Kits ship on pallets by freight carrier. Include your postal code and we will quote the kit and delivery together.</p>
        </aside>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Court kits" title={fill(p.kitsHeading, v)} action={{ label: "All kits and prices", href: "/court-kits" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((k) => (
            <KitCard key={k.slug} kit={k} />
          ))}
        </div>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Size finder" title={site.home.finderHeading} intro={site.home.finderIntro} />
        <Finder />
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="How it works" title="From quote to game on" />
        <Steps steps={site.home.steps} />
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Other areas" title="More places we ship to" />
        <ul className="reveal flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/locations/${o.slug}`} className="chip">
                {o.name}, {o.provinceCode}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <QuoteBand title={`Planning a court in ${c.name}?`} />
      <JsonLd data={faqLd(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: fill(p.h1, v),
          serviceType: "Modular sport court kit supply and delivery",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: [{ "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.province } }, ...c.nearby.map((n) => ({ "@type": "City", name: n }))],
          offers: { "@type": "AggregateOffer", priceCurrency: "CAD", lowPrice: lowestPrice(), highPrice: Math.max(...kits.map((k) => k.price)), offerCount: kits.length },
          url: `${site.url}/locations/${c.slug}`,
        }}
      />
    </>
  );
}
