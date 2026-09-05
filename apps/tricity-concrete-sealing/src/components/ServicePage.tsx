import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { CheckIcon, ArrowRightIcon, MapPinIcon } from "./icons";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { getServices } from "@/lib/content";
import { getFinish } from "@/lib/finishes";
import type { ServicePageContent } from "@/content/service-pages";

export function ServicePage({ c }: { c: ServicePageContent }) {
  const svc = getServices().find((s) => s.slug === c.slug);
  const finish = getFinish(c.recommendedFinish.slug)!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc?.title ?? c.h1,
    serviceType: c.serviceType,
    url: `${site.url}/services/${c.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: cities.map((x) => ({ "@type": "City", name: `${x.name}, Ontario` })),
    description: c.metaDescription,
    hasOfferCatalog: { "@type": "OfferCatalog", name: `${svc?.title ?? c.eyebrow} finishes`, itemListElement: ["Matte", "Semi-Gloss", "Gloss"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${svc?.title ?? c.eyebrow}, ${n} finish` } })) },
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id={`service-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqLd]) }} />
      <PageHero photo={c.hero} photoAlt={c.heroAlt} eyebrow={c.eyebrow} title={c.h1} intro={c.intro} crumbs={[{ label: "Services", href: "/services" }, { label: svc?.title ?? c.eyebrow }]} formService={c.formService} />

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow-pill navy">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">{c.includedTitle}</h2>
            {c.includedIntro && <p className="lead mt-4 text-[var(--ink-soft)]">{c.includedIntro}</p>}
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
            <h3 className="font-display text-xl">{c.cardsTitle}</h3>
            <div className="mt-4 space-y-3">
              {c.cards.map((k) => (
                <div key={k.title} className="card flex gap-4 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--stone)] text-xl">{k.icon}</span>
                  <div><p className="font-bold">{k.title}</p><p className="mt-1 text-sm text-[var(--ink-soft)]">{k.body}</p></div>
                </div>
              ))}
              <Link href={c.crossLink.href} className="card block border-[var(--accent-soft)] bg-[var(--accent-soft)] p-5 transition hover:border-[var(--accent)]">
                <p className="font-bold text-[var(--accent-deep)]">{c.crossLink.label}</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{c.crossLink.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-3.5 h-3.5" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended finish */}
      <section className="bg-white">
        <div className="shell section grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative">
            <Photo name={finish.photo} ratio="aspect-[4/3]" rounded="rounded-[var(--radius)]" sizes="(max-width: 1024px) 100vw, 580px" className="shadow-[var(--shadow-lg)]" />
            <span className={`swatch ${finish.swatch} absolute bottom-4 left-4 size-16 border-2 border-white shadow-md`} aria-hidden />
          </div>
          <div>
            <p className="eyebrow-pill">Recommended finish</p>
            <h2 className="font-display h2-fluid mt-4">{finish.name} for {svc?.title.toLowerCase() ?? c.eyebrow.toLowerCase()}</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">{c.recommendedFinish.why}</p>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">All three finishes use the same high-quality solvent-based sealer. Sheen is the only difference, and we bring samples to every site assessment.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/finishes/${finish.slug}`} className="btn-navy">About the {finish.name.toLowerCase()} finish</Link>
              <Link href="/finishes" className="btn-outline">Compare all three</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Recent work</p><h2 className="font-display h2-fluid mt-4">From our projects</h2></div>
            <Link href="/gallery" className="btn-outline btn-sm">Before &amp; after gallery</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {c.photos.map((k, i) => (
              <Photo key={k} name={k} ratio={i === 0 ? "aspect-[4/3] col-span-2 md:col-span-1" : "aspect-[4/3]"} rounded="rounded-2xl" sizes="(max-width: 768px) 50vw, 300px" />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand heading={c.ctaHeading} sub={c.ctaSub} />
      <FAQ faqs={c.faqs} title={`${svc?.title ?? c.eyebrow} questions`} />

      <section className="bg-[var(--navy-soft)]">
        <div className="shell py-10">
          <p className="eyebrow text-[var(--muted)]">{svc?.title ?? c.eyebrow} by city</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map((x) => (
              <Link key={x.slug} href={`/services/${c.slug}/${x.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[var(--navy)] hover:text-[var(--navy)]"><MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{x.name}</Link>
            ))}
          </div>
        </div>
      </section>
      <Contact service={c.formService} />
    </>
  );
}
