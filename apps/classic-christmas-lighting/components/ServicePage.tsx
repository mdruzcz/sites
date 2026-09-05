import Link from "next/link";
import Script from "next/script";
import { Contact } from "./Contact";
import { CtaBand } from "./CtaBand";
import { FAQ } from "./FAQ";
import { Testimonials } from "./Testimonials";
import { PageHero } from "./PageHero";
import { Photo } from "./Photo";
import { CheckIcon, ArrowRightIcon } from "./icons";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { getServices } from "@/lib/content";
import type { ServicePageContent } from "@/content/service-pages";

export function ServicePage({ c }: { c: ServicePageContent }) {
  const svc = getServices().find((s) => s.slug === c.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc?.title ?? c.h1,
    serviceType: c.serviceType,
    url: `${site.url}/services/${c.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: cities.map((x) => ({ "@type": "City", name: `${x.name}, Ontario` })),
    description: c.metaDescription,
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <Script id={`service-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqLd]) }} />
      <PageHero photo={c.hero} photoAlt={c.heroAlt} eyebrow={c.eyebrow} title={c.h1} intro={c.intro} crumbs={[{ label: "Services", href: "/services" }, { label: svc?.title ?? c.eyebrow }]} formService={c.formService} />

      <section className="bg-[var(--snow)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow-pill pine">What&apos;s included</p>
            <h2 className="font-display h2-fluid mt-4">{c.includedTitle}</h2>
            {c.includedIntro && <p className="lead mt-4 text-[var(--ink-soft)]">{c.includedIntro}</p>}
            <ul className="mt-6 space-y-4">
              {c.included.map((i) => (
                <li key={i.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--candy)] text-white"><CheckIcon className="w-3.5 h-3.5" /></span>
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
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--paper)] text-xl">{k.icon}</span>
                  <div><p className="font-bold">{k.title}</p><p className="mt-1 text-sm text-[var(--ink-soft)]">{k.body}</p></div>
                </div>
              ))}
              <Link href={c.crossLink.href} className="card block border-[var(--candy-soft)] bg-[var(--candy-soft)] p-5 transition hover:border-[var(--candy)]">
                <p className="font-bold text-[var(--candy-deep)]">{c.crossLink.label}</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{c.crossLink.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[var(--candy-deep)]">Learn more <ArrowRightIcon className="w-3.5 h-3.5" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow-pill">Recent work</p><h2 className="font-display h2-fluid mt-4">From our gallery</h2></div>
            <Link href="/gallery" className="btn-outline btn-sm">See all photos</Link>
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
      <Contact service={c.formService} />
    </>
  );
}
