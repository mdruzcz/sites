import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { servicePhoto } from "./ServicesGrid";
import { CheckIcon, MapPinIcon, ArrowRightIcon } from "./icons";
import { site } from "@/lib/site";
import { cities, type City } from "@/lib/cities";
import { getServices } from "@/lib/content";
import { getFinish } from "@/lib/finishes";
import type { ServicePageContent } from "@/content/service-pages";

export function ServiceCityPage({ c, city }: { c: ServicePageContent; city: City }) {
  const svc = getServices().find((s) => s.slug === c.slug)!;
  const finish = getFinish(c.recommendedFinish.slug)!;
  const url = `${site.url}/services/${c.slug}/${city.slug}`;
  const blurb = c.cityBlurb.replaceAll("{city}", city.name);
  const faqs = [
    { q: `How much does ${svc.title.toLowerCase()} cost in ${city.name}?`, a: `Every quote is per property, based on square footage, the type of concrete and whether it was sealed before. The site assessment in ${city.name} is free and the written quote includes the ${site.warrantyYears}-year warranty terms.` },
    ...c.faqs.slice(0, 3),
    { q: `Do you charge extra to come to ${city.name}?`, a: `No. ${city.name} is inside our regular service area and there is never a travel charge.` },
  ];
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `${svc.title} in ${city.name}`, serviceType: c.serviceType, url, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "City", name: `${city.name}, Ontario` }, description: `${svc.shortDescription} Serving ${city.name}, ${city.region}.` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`svc-${c.slug}-${city.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={c.hero} photoAlt={`${svc.title} in ${city.name}, Ontario by TriCity Concrete Sealing`} eyebrow={`${city.name} · ${city.region}`} title={<>{svc.title} in <span className="text-gradient-accent">{city.name}</span></>} intro={blurb} crumbs={[{ label: "Services", href: "/services" }, { label: svc.title, href: `/services/${c.slug}` }, { label: city.name }]} formCity={city.name} formService={c.formService} />

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow-pill navy">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">{c.includedTitle}</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">{svc.description}</p>
            <ul className="mt-6 space-y-3">
              {c.included.map((i) => (
                <li key={i.title} className="flex gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span><div><p className="font-bold">{i.title}</p><p className="text-sm text-[var(--ink-soft)]">{i.body}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow-pill">Recommended finish</p>
              <h3 className="font-display mt-3 text-xl">{finish.name}</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{c.recommendedFinish.why}</p>
              <Link href={`/finishes/${finish.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-deep)]">About the {finish.name.toLowerCase()} finish <ArrowRightIcon className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="card p-6">
              <p className="font-bold">Why {city.name} homeowners choose TriCity</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
                {[`Local crew familiar with ${city.name} and ${city.region} conditions`, `${site.warrantyYears}-year workmanship warranty`, "High-quality solvent-based sealers", `Free on-site assessment in ${city.name}`, "Fully insured"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{x}</li>
                ))}
              </ul>
            </div>
            <p className="card border-[var(--gold)] bg-[var(--gold-soft)] p-5 text-sm">{city.localFact}</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {c.photos.map((k) => <Photo key={k} name={k} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="(max-width: 768px) 50vw, 300px" />)}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl">Other services in {city.name}</h2>
            <Link href={`/service-areas/${city.slug}`} className="btn-outline btn-sm">All {city.name} services</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {getServices().filter((s) => s.slug !== c.slug).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${city.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="240px" />
                <div className="p-3"><h3 className="text-sm font-bold leading-snug group-hover:text-[var(--accent-deep)]">{s.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading={`${svc.title} in ${city.name}, done right.`} sub={c.ctaSub ?? "Free site assessment and written quote. Spring and fall fill fast."} />
      <FAQ faqs={faqs} title={`${svc.title} in ${city.name}`} />
      <section className="bg-[var(--navy-soft)]">
        <div className="shell py-10">
          <p className="eyebrow text-[var(--muted)]">{svc.title} in nearby cities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.filter((x) => x.slug !== city.slug).map((x) => (
              <Link key={x.slug} href={`/services/${c.slug}/${x.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--navy)] hover:text-[var(--navy)]"><MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{x.name}</Link>
            ))}
          </div>
        </div>
      </section>
      <Contact cityName={city.name} service={c.formService} />
    </>
  );
}
