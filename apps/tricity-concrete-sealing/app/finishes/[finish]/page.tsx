import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import { FINISHES, getFinish } from "@/lib/finishes";
import { photo, PICKS } from "@/lib/photos";
import { getServices } from "@/lib/content";
import { servicePhoto } from "@/components/ServicesGrid";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ finish: string }> };

export function generateStaticParams() {
  return FINISHES.map((f) => ({ finish: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { finish } = await params;
  const f = getFinish(finish);
  if (!f) return { title: "Finish not found" };
  const url = `${site.url}/finishes/${f.slug}`;
  return {
    title: { absolute: `${f.metaTitle} | TriCity` },
    description: f.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: f.metaTitle, description: f.metaDescription, url, siteName: site.name, type: "website", images: [{ url: photo(f.photo).image }] },
    twitter: { card: "summary_large_image", title: f.metaTitle, description: f.metaDescription },
  };
}

const PHOTO_SETS: Record<string, string[]> = {
  matte: [PICKS.heroAggregate, PICKS.aggregateClose, PICKS.broomDriveway, PICKS.frontWalkway],
  "semi-gloss": [PICKS.heroStamped, PICKS.ashlar, PICKS.greySatin, PICKS.heroWalkway],
  gloss: [PICKS.gloss, PICKS.heroHome, PICKS.heroPatio, PICKS.wideLondon],
};

export default async function FinishPage({ params }: Props) {
  const { finish } = await params;
  const f = getFinish(finish);
  if (!f) notFound();
  const others = FINISHES.filter((x) => x.slug !== f.slug);
  const url = `${site.url}/finishes/${f.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: `${f.name} finish concrete sealing`, serviceType: "Concrete sealing", url, provider: { "@id": `${site.url}/#organization` }, description: f.metaDescription, areaServed: site.serviceAreas.map((n) => ({ "@type": "City", name: n })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: f.faqs.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })) },
  ];
  return (
    <>
      <Script id={`finish-${f.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={f.photo} eyebrow={`${f.name} finish · ${f.sheen}`} title={<>{f.name} finish. <span className="text-gradient-accent">{f.tagline}</span></>} intro={f.description} crumbs={[{ label: "Finishes", href: "/finishes" }, { label: f.name }]} />

      <section className="bg-[var(--stone)]">
        <div className="shell section grid gap-10 lg:grid-cols-3">
          <div className="card p-6">
            <p className="eyebrow-pill moss">Best for</p>
            <ul className="mt-4 space-y-2.5">{f.bestFor.map((x) => <li key={x} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--moss)]" />{x}</li>)}</ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow-pill">The look</p>
            <ul className="mt-4 space-y-2.5">{f.look.map((x) => <li key={x} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--accent)]" />{x}</li>)}</ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow-pill navy">Worth knowing</p>
            <ul className="mt-4 space-y-2.5">{f.considerations.map((x) => <li key={x} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--navy)]" />{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow-pill">{f.name} in the field</p><h2 className="font-display h2-fluid mt-4">What it looks like on real concrete</h2></div><Link href="/gallery" className="btn-outline btn-sm">Before &amp; after gallery</Link></div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PHOTO_SETS[f.slug].map((k, i) => <Photo key={k} name={k} ratio={i === 0 ? "aspect-[4/3] col-span-2 md:col-span-1" : "aspect-[4/3]"} rounded="rounded-2xl" sizes="(max-width: 768px) 50vw, 300px" />)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stone)]">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow-pill navy">Services</p><h2 className="font-display h2-fluid mt-4">Where we apply a {f.name.toLowerCase()} finish</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getServices().map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-lift group overflow-hidden">
                <Photo name={servicePhoto(s.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" />
                <div className="p-4"><h3 className="font-display text-base group-hover:text-[var(--accent-deep)]">{s.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell section grid gap-5 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/finishes/${o.slug}`} className="card card-lift group flex items-center gap-5 p-5">
              <span className={`swatch ${o.swatch} size-16 shrink-0`} aria-hidden />
              <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{o.sheen}</p><h3 className="font-display text-xl group-hover:text-[var(--accent-deep)]">{o.name} finish</h3><p className="mt-1 text-sm text-[var(--ink-soft)]">{o.short}</p></div>
              <ArrowRightIcon className="ml-auto w-5 h-5 text-[var(--accent)]" />
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />
      <CtaBand heading={`Want to see ${f.name.toLowerCase()} on your concrete?`} sub="We bring finish samples to every free site assessment." photo={f.photo} />
      <FAQ faqs={f.faqs} title={`${f.name} finish questions`} />
      <Contact />
    </>
  );
}
