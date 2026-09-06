import Link from "next/link";
import Script from "next/script";
import { QuoteDock } from "./QuoteDock";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { ArticleBody } from "./ArticleBody";
import { SheenSection } from "./SheenSection";
import { CheckIcon, MapPinIcon } from "./icons";
import { site } from "@/lib/site";
import { getServices, getCities, cityPhoto, servicePhoto, type CityContent } from "@/lib/content";
import { PICKS } from "@/lib/photos";

export function CityPage({ c }: { c: CityContent }) {
  const services = getServices();
  const url = `${site.url}/service-areas/${c.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `Concrete Sealing in ${c.city}`, serviceType: "Concrete sealing", url, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: `${c.city}, Ontario` }, description: c.metaDescription, hasOfferCatalog: { "@type": "OfferCatalog", name: `Concrete sealing services in ${c.city}`, itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${s.title} in ${c.city}`, url: `${site.url}/services/${s.slug}/${c.slug}` } })) } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const aside = (
    <div className="card-dark p-6">
      <p className="kicker">Neighbourhoods</p>
      <div className="mt-3 flex flex-wrap gap-2">{c.neighbourhoods.map((n) => <span key={n} className="inline-flex items-center gap-1 rounded bg-white/10 px-2.5 py-1 text-xs font-semibold text-white"><MapPinIcon className="w-3 h-3 text-[var(--orange)]" />{n}</span>)}</div>
      <p className="mt-4 text-sm text-white/75">{c.localFact}</p>
    </div>
  );
  return (
    <>
      <Script id={`city-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={cityPhoto(c.slug)} photoAlt={`Sealed concrete by All-Seal in ${c.city}, Ontario`} kicker={`${c.city} · ${c.region}`} title={c.h1} intro={c.intro} crumbs={[{ label: "Service areas", href: "/service-areas" }, { label: c.city }]} aside={aside} />

      <section className="bg-white">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="kicker">Services in {c.city}</p><h2 className="font-display h2-fluid mt-4">Everything we seal, locally.</h2></div><Link href="/services" className="btn-outline btn-sm">All services</Link></div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${c.slug}`} className="group bg-white">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 300px" />
                <div className="p-4"><h3 className="font-display text-xl group-hover:text-[var(--orange-deep)]">{s.title} in {c.city}</h3><p className="mt-1 text-xs text-[var(--muted)]">{s.recommendedSheen} recommended</p></div>
              </Link>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Free on-site inspection and written quote", "High gloss, semi-gloss or matte, samples in hand", "Anti-slip additive for pools, steps and walkways", "Works over sound previous sealer", "Two to five years of protection", "No travel charges in our service area"].map((f) => <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{f}</li>)}
          </ul>
        </div>
      </section>

      <article className="bg-[var(--fog)]"><div className="shell section"><div className="mx-auto max-w-[72ch]"><ArticleBody blocks={c.body} /></div></div></article>
      <SheenSection />
      <section className="bg-white"><div className="shell section grid grid-cols-2 gap-3 md:grid-cols-4">{[PICKS.estate, PICKS.patio, PICKS.walkway, PICKS.gloss].map((k) => <Photo key={k} name={k} ratio="aspect-[4/3]" rounded="rounded-lg" sizes="300px" />)}</div></section>
      <QuoteDock city={c.city} heading={`Free concrete sealing inspection in ${c.city}.`} />
      <FAQ faqs={c.faqs} title={`${c.city} questions`} />
      <section className="bg-[var(--fog)]"><div className="shell py-10"><p className="kicker">Nearby areas</p><div className="mt-4 flex flex-wrap gap-2">{getCities().filter((x) => x.slug !== c.slug).map((x) => <Link key={x.slug} href={`/service-areas/${x.slug}`} className="font-display rounded border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--orange)] hover:text-[var(--orange-deep)]">{x.city}</Link>)}</div></div></section>
      <CtaBand heading={`Seal your ${c.city} concrete before the next winter.`} />
    </>
  );
}
