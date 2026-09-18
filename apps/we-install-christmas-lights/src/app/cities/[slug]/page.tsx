import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cities, getCityBySlug, site } from "@/lib/site";
import { getCityContent, pickPhotos, breadcrumbJsonLd } from "@/lib/content";
import { pageTitle } from "@/lib/seo";
import { PhotoHero, TrustBar, Prose, SectionList, CheckList, PhotoGrid, FaqSection, QuoteSection, CtaBand, Breadcrumbs } from "@/components/PageBlocks";
import { PackageGrid } from "@/components/PackageGrid";
import { Testimonials } from "@/components/Testimonials";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  const c = getCityContent(slug);
  if (!city) return {};
  const title = pageTitle(c?.metaTitle ?? city.metaTitle);
  const description = c?.metaDescription ?? city.metaDescription;
  const url = `${site.url}/cities/${city.slug}`;
  const hero = pickPhotos("residential-exterior", 1, slug)[0];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: hero?.src ?? "/images/og-default.jpg", alt: hero?.alt }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  const c = getCityContent(slug);
  if (!city || !c) notFound();

  const heroPhoto = pickPhotos("residential-exterior", 1, slug)[0] ?? null;
  const homePhotos = pickPhotos("residential-exterior", 5, slug + "-grid").filter((p) => p.file !== heroPhoto?.file);
  const commercialPhotos = pickPhotos(["commercial-exterior", "commercial-indoor"], 4, slug + "-com");
  const nearby = c.nearby.map(getCityBySlug).filter((x): x is NonNullable<typeof x> => !!x);
  const url = `${site.url}/cities/${city.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Christmas Light Installation in ${c.name}`,
    serviceType: "Christmas light installation",
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: `${c.name}, Ontario` },
    description: c.metaDescription,
    offers: { "@type": "Offer", priceCurrency: "CAD", price: "700", description: "Residential programs from $700; commercial custom-quoted" },
    url,
  };

  return (
    <>
      <script id={`service-schema-${city.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script id={`crumbs-${city.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }, { name: c.name }])) }} />

      <PhotoHero eyebrow={`Christmas light installers serving ${c.displayName}`} h1={c.h1} intro={c.heroIntro} photo={heroPhoto} formCity={c.name === "London" ? "London" : c.name} source={`city:${slug}`} />
      <TrustBar />

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: c.name }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{c.displayName}</p>
              <h2 className="heading-display mt-2 text-3xl">Holiday lighting done for you in {c.name}</h2>
              <Prose paragraphs={c.intro} className="mt-5" />
              <h3 className="heading-display mt-10 text-xl text-[color:var(--brand-green)]">Neighbourhoods we light in {c.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.neighbourhoods.map((n) => (
                  <li key={n} className="rounded-full border border-[color:var(--border)] bg-white px-3 py-1 text-sm text-[color:var(--ink-strong)]">{n}</li>
                ))}
              </ul>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">What every {c.name} program includes</p>
                <div className="mt-4">
                  <CheckList columns={1} items={["Free design and firm all-in quote", "Commercial-grade LED lights, supplied by us", "Custom-cut roofline, clips only (no staples)", "Mid-season maintenance at no charge", "January takedown and optional storage"]} />
                </div>
                <a href="#quote" className="btn btn-red mt-6 w-full">Get a {c.name} quote</a>
                <a href={site.phoneHref} className="mt-3 block text-center text-sm font-bold text-[color:var(--brand-green)]">or call {site.phone}</a>
              </div>
              <div className="rounded-2xl bg-[color:var(--bg-cream)] p-6 text-sm text-[color:var(--ink-soft)]">
                <p className="font-bold text-[color:var(--ink-strong)]">Residential packages</p>
                <p className="mt-2">Classic from $700 · Festive from $1,400 · Griswold from $2,800. <Link href="/lighting-packages" className="font-bold text-[color:var(--brand-red)] hover:underline">See what is included →</Link></p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PhotoGrid photos={homePhotos} title={`Homes we light near ${c.name}`} caption="Real installs by our crews across South-Western Ontario and the GTA." />

      <section className="section">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionList sections={c.sections} />
        </div>
      </section>

      {/* Commercial */}
      <section className="section bg-[color:var(--ink-strong)] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">For businesses and property managers</p>
            <h2 className="heading-display mt-3 text-3xl text-white">{c.commercial.heading}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/85">{c.commercial.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.commercial.examples.map((e) => <li key={e} className="rounded-full border border-white/25 px-3 py-1 text-sm text-white/90">{e}</li>)}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/commercial-christmas-lighting" className="btn btn-red">Commercial lighting services</Link>
              <a href="#quote" className="btn btn-outline-white">Request a site visit</a>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {commercialPhotos.map((p) => (
              <li key={p.file} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 300px, 50vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PackageGrid />
      <Testimonials />
      <FaqSection faqs={c.faq} title={`${c.name} Christmas lighting questions`} id={`faq-${slug}`} />
      <QuoteSection city={c.name} source={`city:${slug}`} title={`Get your ${c.name} quote`} />

      <section className="section bg-[color:var(--bg-soft)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-2xl">Also serving near {c.name}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/cities/${n.slug}`} className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand-green)] hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]">
                Christmas lights in {n.name}
              </Link>
            ))}
            <Link href="/service-areas" className="rounded-full border border-dashed border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--brand-red)]">All service areas →</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
