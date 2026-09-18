import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug, site } from "@/lib/site";
import { getServiceContent, pickPhotos, breadcrumbJsonLd } from "@/lib/content";
import { pageTitle } from "@/lib/seo";
import { PhotoHero, TrustBar, Prose, SectionList, CheckList, PhotoGrid, FaqSection, QuoteSection, CtaBand, Breadcrumbs } from "@/components/PageBlocks";
import { Testimonials } from "@/components/Testimonials";

export const revalidate = 3600;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const c = getServiceContent(slug);
  if (!service) return {};
  const title = pageTitle(c?.metaTitle ?? service.name);
  const description = c?.metaDescription ?? service.description;
  const url = `${site.url}/services/${service.slug}`;
  const commercial = service.category === "commercial";
  const hero = pickPhotos(commercial ? "commercial-exterior" : "residential-exterior", 1, slug)[0];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: hero?.src ?? "/images/og-default.jpg", alt: hero?.alt }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const c = getServiceContent(slug);
  if (!service || !c) notFound();

  const commercial = service.category === "commercial";
  const cats = commercial ? ["commercial-exterior", "commercial-indoor"] : slug.includes("takedown") || slug.includes("storage") ? ["install-action", "residential-exterior"] : ["residential-exterior"];
  const heroPhoto = pickPhotos(cats, 1, slug)[0] ?? null;
  const photos = pickPhotos([...cats, "install-action"], 5, slug + "-grid").filter((p) => p.file !== heroPhoto?.file);
  const url = `${site.url}/services/${service.slug}`;
  const related = services.filter((s) => s.slug !== slug && s.category === service.category).slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: c.name,
    serviceType: c.name,
    provider: { "@id": `${site.url}/#business` },
    areaServed: ["London", "Kitchener-Waterloo", "Hamilton", "Mississauga", "Greater Toronto Area", "South-Western Ontario"].map((n) => ({ "@type": "Place", name: n })),
    description: c.metaDescription,
    url,
  };

  return (
    <>
      <script id={`service-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script id={`crumbs-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: commercial ? "Commercial" : "Residential", path: commercial ? "/commercial-christmas-lighting" : "/residential-services" }, { name: service.shortName }])) }} />

      <PhotoHero eyebrow={commercial ? "Commercial service" : "Residential service"} h1={c.h1} intro={c.heroIntro} photo={heroPhoto} formType={commercial ? "Commercial" : "Residential"} source={`service:${slug}`} ctaLabel={commercial ? "Request a Commercial Quote" : "Get a Free Quote"} />
      <TrustBar />

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: commercial ? "Commercial" : "Residential", href: commercial ? "/commercial-christmas-lighting" : "/residential-services" }, { name: service.shortName }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{service.shortName}</p>
              <h2 className="heading-display mt-2 text-3xl">{service.tagline}</h2>
              <Prose paragraphs={c.intro} className="mt-5" />
              <h3 className="heading-display mt-10 text-xl text-[color:var(--brand-green)]">What is included</h3>
              <div className="mt-4"><CheckList items={c.included} /></div>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Pricing</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--ink-strong)]">{c.pricing}</p>
                <a href="#quote" className="btn btn-red mt-6 w-full">{commercial ? "Request a quote" : "Get my free quote"}</a>
                <a href={site.phoneHref} className="mt-3 block text-center text-sm font-bold text-[color:var(--brand-green)]">or call {site.phone}</a>
              </div>
              {!commercial && (
                <div className="rounded-2xl bg-[color:var(--bg-cream)] p-6 text-sm text-[color:var(--ink-soft)]">
                  <p className="font-bold text-[color:var(--ink-strong)]">Compare packages</p>
                  <p className="mt-2">Classic, Festive and Griswold, with everything supplied, installed, maintained and removed. <Link href="/lighting-packages" className="font-bold text-[color:var(--brand-red)] hover:underline">See packages →</Link></p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <PhotoGrid photos={photos} title="Recent work" caption="Every photo is a real install by our crews." />

      <section className="section">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionList sections={c.sections} />
        </div>
      </section>

      {!commercial && <Testimonials />}
      <FaqSection faqs={c.faq} title={`${service.shortName}: common questions`} id={`faq-${slug}`} />
      <QuoteSection type={commercial ? "Commercial" : "Residential"} source={`service:${slug}`} />

      {related.length > 0 && (
        <section className="section bg-[color:var(--bg-soft)]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-display text-2xl">Related services</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {related.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand-green)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]">{s.shortName}</Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand type={commercial ? "Commercial" : "Residential"} />
    </>
  );
}
