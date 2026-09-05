import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { ArticleBody } from "./ArticleBody";
import { PricingBand } from "./PricingBand";
import { CheckIcon, ArrowRightIcon, MapPinIcon } from "./icons";
import { site } from "@/lib/site";
import { getService, getCities, servicePhoto, servicePhotos, type ServiceContent } from "@/lib/content";
import { SERVICE_OPTIONS } from "./HeroQuoteForm";

const FORM_SERVICE: Record<string, string> = {
  "deck-staining": SERVICE_OPTIONS[0], "deck-sealing": SERVICE_OPTIONS[0], "deck-sanding": SERVICE_OPTIONS[0], "sealing-services": SERVICE_OPTIONS[0],
  "deck-restoration": SERVICE_OPTIONS[1],
  "deck-cleaning": SERVICE_OPTIONS[2], "deck-power-washing": SERVICE_OPTIONS[2], "pressure-washing-services": SERVICE_OPTIONS[2],
  "deck-repair-and-maintenance": SERVICE_OPTIONS[3], "deck-rebuilding": SERVICE_OPTIONS[3],
  "fence-staining": SERVICE_OPTIONS[4], "fence-cleaning": SERVICE_OPTIONS[5], "fence-painting": SERVICE_OPTIONS[6],
};

export function ServicePage({ c }: { c: ServiceContent }) {
  const cities = getCities();
  const related = c.related.map(getService).filter(Boolean) as ServiceContent[];
  const url = `${site.url}/${c.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: c.title, serviceType: c.title, url, provider: { "@id": `${site.url}/#organization` }, areaServed: cities.map((x) => ({ "@type": "City", name: `${x.city}, Ontario` })), description: c.metaDescription },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <Script id={`service-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={servicePhoto(c.slug)} eyebrow={c.eyebrow} title={c.h1} intro={c.intro} crumbs={[{ label: "Services", href: "/services" }, { label: c.title }]} formService={FORM_SERVICE[c.slug]} />

      <section className="bg-[var(--paper)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow-pill moss">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">How we handle {c.title.toLowerCase()}</h2>
            <ul className="mt-6 space-y-4">
              {c.included.map((i) => (
                <li key={i.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span>
                  <div><p className="font-bold">{i.title}</p><p className="text-sm text-[var(--ink-soft)]">{i.body}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">Why it matters</h3>
            <ul className="mt-4 space-y-3">
              {c.keyPoints.map((k) => (
                <li key={k} className="card flex items-start gap-3 p-4 text-sm"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--moss)] text-white"><CheckIcon className="w-3 h-3" /></span>{k}</li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {servicePhotos(c.slug).slice(1, 3).map((k) => <Photo key={k} name={k} ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="260px" />)}
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white">
        <div className="shell section">
          <div className="mx-auto max-w-[72ch]">
            <ArticleBody blocks={c.body} />
          </div>
        </div>
      </article>

      <section className="bg-[var(--cream)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Recent work</p><h2 className="font-display h2-fluid mt-4">From our projects</h2></div>
            <Link href="/projects" className="btn-outline btn-sm">Before &amp; after gallery</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {servicePhotos(c.slug).map((k, i) => <Photo key={k} name={k} ratio={i === 0 ? "aspect-[4/3] col-span-2 md:col-span-1" : "aspect-[4/3]"} rounded="rounded-2xl" sizes="(max-width: 768px) 50vw, 300px" />)}
          </div>
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-xl">Related services</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="card card-lift group overflow-hidden">
                    <Photo name={servicePhoto(r.slug)} ratio="aspect-[16/10]" sizes="280px" />
                    <div className="p-4"><h4 className="font-display text-base group-hover:text-[var(--accent-deep)]">{r.title}</h4><p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{r.excerpt}</p><span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-3 h-3" /></span></div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PricingBand />
      <CtaBand heading={`Book ${c.title.toLowerCase()} before the season fills up.`} />
      <FAQ faqs={c.faqs} title={`${c.title} questions`} />
      <section className="bg-[var(--moss-soft)]">
        <div className="shell py-10">
          <p className="eyebrow text-[var(--muted)]">{c.title} near you</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map((x) => (
              <Link key={x.slug} href={`/${x.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--moss)] hover:text-[var(--moss-deep)]"><MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{x.city}</Link>
            ))}
          </div>
        </div>
      </section>
      <Contact service={FORM_SERVICE[c.slug]} />
    </>
  );
}
