import Link from "next/link";
import Script from "next/script";
import { QuoteDock } from "./QuoteDock";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { ArticleBody } from "./ArticleBody";
import { Testimonials } from "./Testimonials";
import { CheckIcon, ArrowRightIcon, MapPinIcon } from "./icons";
import { site } from "@/lib/site";
import { getService, getCities, servicePhoto, servicePhotos, type ServiceContent } from "@/lib/content";
import { SERVICE_OPTIONS } from "./QuoteForm";

const FORM: Record<string, string> = { "driveway-sealing": SERVICE_OPTIONS[0], "patio-sealing": SERVICE_OPTIONS[1], "stamped-concrete-sealing": SERVICE_OPTIONS[2], "decorative-concrete-sealing": SERVICE_OPTIONS[3], "walkway-sealing": SERVICE_OPTIONS[4], "pool-deck-sealing": SERVICE_OPTIONS[5], "garage-floor-sealing": SERVICE_OPTIONS[6] };
export const formService = (slug: string) => FORM[slug] ?? SERVICE_OPTIONS[7];

export function ServicePage({ c }: { c: ServiceContent }) {
  const cities = getCities();
  const related = c.related.map(getService).filter(Boolean) as ServiceContent[];
  const url = `${site.url}/services/${c.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: c.title, serviceType: c.title, url, provider: { "@id": `${site.url}/#organization` }, areaServed: cities.map((x) => ({ "@type": "City", name: `${x.city}, Ontario` })), description: c.metaDescription },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const aside = (
    <div className="card-dark p-6">
      <p className="kicker">Recommended finish</p>
      <p className="font-display mt-3 text-4xl text-white">{c.recommendedSheen}</p>
      <p className="mt-2 text-sm text-white/75">{c.sheenWhy}</p>
      <Link href="/finishes" className="font-display mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[var(--orange)]">Compare finishes <ArrowRightIcon className="w-4 h-4" /></Link>
    </div>
  );
  return (
    <>
      <Script id={`service-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={servicePhoto(c.slug)} kicker={c.eyebrow} title={c.h1} intro={c.intro} crumbs={[{ label: "Services", href: "/services" }, { label: c.title }]} aside={aside} />

      <section className="bg-white">
        <div className="shell section grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="kicker">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">How we seal {c.title.toLowerCase().replace(" sealing", "").replace("sealing", "it")}</h2>
            <ol className="mt-8 space-y-5">
              {c.included.map((i, n) => (
                <li key={i.title} className="flex gap-4">
                  <span className="font-display grid size-10 shrink-0 place-items-center rounded bg-[var(--graphite)] text-lg font-bold text-[var(--orange)]">{n + 1}</span>
                  <div><p className="font-display text-xl">{i.title}</p><p className="mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">{i.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {c.keyPoints.map((k) => <li key={k} className="flex items-start gap-3 py-3 text-sm"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{k}</li>)}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3">{servicePhotos(c.slug).slice(1, 3).map((k) => <Photo key={k} name={k} ratio="aspect-[4/3]" rounded="rounded-lg" sizes="260px" />)}</div>
          </div>
        </div>
      </section>

      <article className="bg-[var(--fog)]"><div className="shell section"><div className="mx-auto max-w-[72ch]"><ArticleBody blocks={c.body} /></div></div></article>

      <section className="bg-white">
        <div className="shell section">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="kicker">Recent work</p><h2 className="font-display h2-fluid mt-4">From the field</h2></div><Link href="/gallery" className="btn-outline btn-sm">Before &amp; after gallery</Link></div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{servicePhotos(c.slug).map((k, i) => <Photo key={k} name={k} ratio={i === 0 ? "aspect-[4/3] col-span-2 md:col-span-1" : "aspect-[4/3]"} rounded="rounded-lg" sizes="(max-width: 768px) 50vw, 300px" />)}</div>
          {related.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="card card-lift group flex items-center gap-4 p-4"><Photo name={servicePhoto(r.slug)} ratio="aspect-square w-16 shrink-0" rounded="rounded" sizes="64px" /><span><span className="font-display block text-lg group-hover:text-[var(--orange-deep)]">{r.title}</span><span className="text-xs text-[var(--muted)]">{r.recommendedSheen} recommended</span></span></Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      <QuoteDock service={formService(c.slug)} heading={`Book ${c.title.toLowerCase()} with a free inspection.`} />
      <FAQ faqs={c.faqs} title={`${c.title} questions`} />
      <section className="bg-[var(--fog)]">
        <div className="shell py-10">
          <p className="kicker">{c.title} by city</p>
          <div className="mt-4 flex flex-wrap gap-2">{cities.map((x) => <Link key={x.slug} href={`/services/${c.slug}/${x.slug}`} className="font-display inline-flex items-center gap-1.5 rounded border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--orange)] hover:text-[var(--orange-deep)]"><MapPinIcon className="w-3.5 h-3.5 text-[var(--orange)]" />{x.city}</Link>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
