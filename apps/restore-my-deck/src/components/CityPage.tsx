import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { ArticleBody } from "./ArticleBody";
import { PricingBand } from "./PricingBand";
import { BeforeAfterSection } from "./BeforeAfterSection";
import { CheckIcon, MapPinIcon } from "./icons";
import { site } from "@/lib/site";
import { getCoreServices, getCities, getCity, cityPhoto, servicePhoto, type CityContent } from "@/lib/content";
import { PICKS } from "@/lib/photos";

export function CityPage({ c }: { c: CityContent }) {
  const services = getCoreServices();
  const url = `${site.url}/${c.slug}`;
  const nearby = c.nearby.map(getCity).filter(Boolean) as CityContent[];
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `Deck & Fence Staining in ${c.city}`, serviceType: "Deck and fence restoration and staining", url, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: `${c.city}, Ontario` }, description: c.metaDescription, hasOfferCatalog: { "@type": "OfferCatalog", name: `Deck and fence services in ${c.city}`, itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/${s.slug}` } })) } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`city-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={cityPhoto(c.slug)} photoAlt={`Deck restored and stained by Restore My Deck in ${c.city}, Ontario`} eyebrow={`Serving ${c.city}, ${c.region}`} title={c.h1} intro={c.intro} crumbs={[{ label: "Service areas", href: "/service-areas" }, { label: c.city }]} formCity={c.city} />

      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow-pill moss">Local crew</p>
            <h2 className="font-display h2-fluid mt-4">Deck and fence restoration in {c.city}</h2>
            <p className="card mt-6 border-[var(--gold)] bg-[var(--gold-soft)] p-5 text-sm">{c.localFact}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Free quote from your photos", "Eco-friendly, plant-safe cleaning", "80-grit buff sand before staining", "Brush-applied oil-based stain", "Most projects done in 2 days", "Repairs handled before finishing"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--moss)] text-white"><CheckIcon className="w-3 h-3" /></span>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">Neighbourhoods and nearby</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.neighbourhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-3.5 py-2 text-sm font-semibold"><MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{n}</span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Photo name={PICKS.stairs} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={PICKS.fenceCedar} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]"><ArticleBody blocks={c.body} /></div>
        </div>
      </article>

      <section className="bg-[var(--cream)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill">Services in {c.city}</p><h2 className="font-display h2-fluid mt-4">Everything we do, right here.</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 280px" />
                <div className="p-4"><h3 className="font-display text-base leading-snug group-hover:text-[var(--accent-deep)]">{s.title} in {c.city}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <PricingBand city={c.city} />
      <CtaBand heading={`Bring your ${c.city} deck back this season.`} />
      <FAQ faqs={c.faqs} title={`${c.city} questions`} />
      {nearby.length > 0 && (
        <section className="bg-[var(--moss-soft)]">
          <div className="shell py-10">
            <p className="eyebrow text-[var(--muted)]">Nearby areas we serve</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {getCities().filter((x) => x.slug !== c.slug).map((x) => (
                <Link key={x.slug} href={`/${x.slug}`} className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--moss)] hover:text-[var(--moss-deep)]">{x.city}</Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Contact cityName={c.city} />
    </>
  );
}
