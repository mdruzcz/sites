import Link from "next/link";
import Script from "next/script";
import { QuoteDock } from "./QuoteDock";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { formService } from "./ServicePage";
import { CheckIcon, MapPinIcon, ArrowRightIcon } from "./icons";
import { site } from "@/lib/site";
import { getServices, getCities, servicePhoto, servicePhotos, type ServiceContent, type CityContent } from "@/lib/content";

export function ServiceCityPage({ s, c }: { s: ServiceContent; c: CityContent }) {
  const url = `${site.url}/services/${s.slug}/${c.slug}`;
  const blurb = s.cityBlurb.replaceAll("{city}", c.city);
  const faqs = [
    { q: `What does ${s.title.toLowerCase()} cost in ${c.city}?`, a: `Every quote is per property, based on square footage, the type of concrete and whether it was sealed before. The inspection in ${c.city} is free and the written quote includes the recommended sheen.` },
    ...s.faqs.slice(0, 3),
    { q: `Do you charge extra to come to ${c.city}?`, a: `No. ${c.city} is inside our regular service area and inspections there are free.` },
  ];
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `${s.title} in ${c.city}`, serviceType: s.title, url, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: `${c.city}, Ontario` }, description: `${s.excerpt} Serving ${c.city}, ${c.region}.` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const aside = (
    <div className="card-dark p-6">
      <p className="kicker">Recommended finish</p>
      <p className="font-display mt-3 text-4xl text-white">{s.recommendedSheen}</p>
      <p className="mt-2 text-sm text-white/75">{s.sheenWhy}</p>
      <p className="mt-4 border-t border-[var(--line-dark)] pt-4 text-sm text-white/75">{c.localFact}</p>
    </div>
  );
  return (
    <>
      <Script id={`svc-${s.slug}-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={servicePhoto(s.slug)} photoAlt={`${s.title} in ${c.city}, Ontario by All-Seal Concrete Sealing`} kicker={`${c.city} · ${c.region}`} title={<>{s.title} in <span className="text-[var(--orange)]">{c.city}</span></>} intro={blurb} crumbs={[{ label: "Services", href: "/services" }, { label: s.title, href: `/services/${s.slug}` }, { label: c.city }]} aside={aside} />

      <section className="bg-white">
        <div className="shell section grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <p className="kicker">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">{s.title} done properly in {c.city}</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">{s.intro}</p>
            <ol className="mt-8 space-y-4">{s.included.map((i, n) => <li key={i.title} className="flex gap-4"><span className="font-display grid size-10 shrink-0 place-items-center rounded bg-[var(--graphite)] text-lg font-bold text-[var(--orange)]">{n + 1}</span><div><p className="font-display text-xl">{i.title}</p><p className="mt-1 text-sm text-[var(--ink-soft)]">{i.body}</p></div></li>)}</ol>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">{s.keyPoints.map((k) => <li key={k} className="flex items-start gap-3 py-3 text-sm"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{k}</li>)}</ul>
            <div className="grid grid-cols-2 gap-3">{servicePhotos(s.slug).slice(0, 4).map((k) => <Photo key={k} name={k} ratio="aspect-[4/3]" rounded="rounded-lg" sizes="260px" />)}</div>
            <div className="card p-5"><p className="kicker">Neighbourhoods</p><div className="mt-3 flex flex-wrap gap-2">{c.neighbourhoods.map((n) => <span key={n} className="inline-flex items-center gap-1 rounded bg-[var(--fog)] px-2.5 py-1 text-xs font-semibold"><MapPinIcon className="w-3 h-3 text-[var(--orange)]" />{n}</span>)}</div></div>
            <Link href={`/services/${s.slug}`} className="font-display inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[var(--orange-deep)]">Full {s.title.toLowerCase()} guide <ArrowRightIcon className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--fog)]">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><h2 className="font-display h2-fluid">Other services in {c.city}</h2><Link href={`/service-areas/${c.slug}`} className="btn-outline btn-sm">All {c.city} services</Link></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{getServices().filter((x) => x.slug !== s.slug).map((x) => <Link key={x.slug} href={`/services/${x.slug}/${c.slug}`} className="card card-lift group flex items-center gap-4 p-4"><Photo name={servicePhoto(x.slug)} ratio="aspect-square w-16 shrink-0" rounded="rounded" sizes="64px" /><span className="font-display text-lg group-hover:text-[var(--orange-deep)]">{x.title} in {c.city}</span></Link>)}</div>
        </div>
      </section>

      <QuoteDock city={c.city} service={formService(s.slug)} heading={`${s.title} in ${c.city}, quoted free.`} />
      <FAQ faqs={faqs} title={`${s.title} in ${c.city}`} />
      <section className="bg-[var(--fog)]"><div className="shell py-10"><p className="kicker">{s.title} in nearby cities</p><div className="mt-4 flex flex-wrap gap-2">{getCities().filter((x) => x.slug !== c.slug).map((x) => <Link key={x.slug} href={`/services/${s.slug}/${x.slug}`} className="font-display inline-flex items-center gap-1.5 rounded border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--orange)] hover:text-[var(--orange-deep)]"><MapPinIcon className="w-3.5 h-3.5 text-[var(--orange)]" />{x.city}</Link>)}</div></div></section>
      <CtaBand heading={`${s.title} in ${c.city}, done right.`} />
    </>
  );
}
