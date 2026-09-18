import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, getIndustryBySlug, site } from "@/lib/site";
import { getIndustryContent, pickPhotos, breadcrumbJsonLd } from "@/lib/content";
import { pageTitle } from "@/lib/seo";
import { PhotoHero, TrustBar, Prose, SectionList, CheckList, PhotoGrid, FaqSection, QuoteSection, CtaBand, Breadcrumbs } from "@/components/PageBlocks";

export const revalidate = 3600;

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const PHOTO_CATS: Record<string, string[]> = {
  "christmas-decorator-for-malls": ["commercial-mall", "commercial-indoor"],
  "christmas-decorators-for-office-lobbies": ["commercial-indoor"],
  "christmas-decorators-for-hotels": ["commercial-indoor", "commercial-exterior"],
  "christmas-decorators-for-special-events": ["light-show", "commercial-exterior"],
  "christmas-decorators-for-production-sets": ["light-show", "commercial-indoor"],
  "christmas-decorators-for-municipalities": ["commercial-exterior", "light-show"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const c = getIndustryContent(slug);
  if (!industry) return {};
  const title = pageTitle(c?.metaTitle ?? industry.name);
  const description = c?.metaDescription ?? industry.description;
  const url = `${site.url}/industries/${industry.slug}`;
  const hero = pickPhotos(PHOTO_CATS[slug] ?? ["commercial-exterior"], 1, slug)[0];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: hero?.src ?? "/images/og-default.jpg", alt: hero?.alt }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const c = getIndustryContent(slug);
  if (!industry || !c) notFound();

  const cats = PHOTO_CATS[slug] ?? ["commercial-exterior"];
  const heroPhoto = pickPhotos(cats, 1, slug)[0] ?? null;
  const photos = pickPhotos([...cats, "install-action"], 5, slug + "-grid").filter((p) => p.file !== heroPhoto?.file);
  const url = `${site.url}/industries/${industry.slug}`;
  const others = industries.filter((i) => i.slug !== slug).slice(0, 12);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: c.name,
    serviceType: "Commercial Christmas decorating and lighting",
    audience: { "@type": "BusinessAudience", name: c.shortName },
    provider: { "@id": `${site.url}/#business` },
    areaServed: ["London", "Kitchener-Waterloo", "Hamilton", "Mississauga", "Greater Toronto Area", "South-Western Ontario"].map((n) => ({ "@type": "Place", name: n })),
    description: c.metaDescription,
    url,
  };

  return (
    <>
      <script id={`industry-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script id={`crumbs-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Commercial", path: "/commercial-christmas-lighting" }, { name: c.shortName }])) }} />

      <PhotoHero eyebrow="Commercial Christmas decorating" h1={c.h1} intro={c.heroIntro} photo={heroPhoto} formType="Commercial" source={`industry:${slug}`} ctaLabel="Request a Commercial Quote" />
      <TrustBar />

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Commercial", href: "/commercial-christmas-lighting" }, { name: c.shortName }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{c.shortName}</p>
              <h2 className="heading-display mt-2 text-3xl">Holiday décor that works as hard as your property</h2>
              <Prose paragraphs={c.intro} className="mt-5" />
              <h3 className="heading-display mt-10 text-xl text-[color:var(--brand-green)]">What we install for {c.shortName.toLowerCase()}</h3>
              <div className="mt-4"><CheckList items={c.whatWeInstall} /></div>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">How it works</p>
                <ol className="mt-4 space-y-3">
                  {c.process.map((s, i) => (
                    <li key={s} className="flex gap-3 text-[15px] text-[color:var(--ink-strong)]"><span className="heading-display text-[color:var(--brand-red)]">{i + 1}.</span>{s}</li>
                  ))}
                </ol>
                <a href="#quote" className="btn btn-red mt-6 w-full">Request a site visit</a>
                <a href={site.phoneHref} className="mt-3 block text-center text-sm font-bold text-[color:var(--brand-green)]">or call {site.phone}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PhotoGrid photos={photos} title="Commercial installs by our crews" caption="Building outlines, tree wraps, lit cone trees, giant trees and lobby décor across Ontario." />

      <section className="section">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Why it pays</p>
          <div className="mt-4"><SectionList sections={c.whyItPays} /></div>
        </div>
      </section>

      <FaqSection faqs={c.faq} title={`${c.shortName}: questions we get asked`} id={`faq-${slug}`} />
      <QuoteSection type="Commercial" source={`industry:${slug}`} />

      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-2xl">Other property types we decorate</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {others.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand-green)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]">{i.shortName}</Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand type="Commercial" />
    </>
  );
}
