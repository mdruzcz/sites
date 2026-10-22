import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, SECTOR_SLUGS } from "@/lib/site";
import { getCities, getImage, getSector, getSectors, getService } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHeading, PhotoGrid, RelatedLinks, CityChips } from "@/components/ui";
import { PageHero, SpacesGrid, Programs, SeasonTimeline, ClosingForm } from "@/components/sections";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return SECTOR_SLUGS.map((sector) => ({ sector }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) return {};
  const url = `${site.url}/${s.slug}`;
  return {
    title: { absolute: `${s.title} | ${site.name}` },
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: s.title, description: s.metaDescription, url, images: [{ url: getImage(s.heroImage).src, alt: getImage(s.heroImage).alt }] },
    twitter: { card: "summary_large_image", title: s.title, description: s.metaDescription },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) notFound();
  const url = `${site.url}/${s.slug}`;
  const related = s.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const otherSectors = getSectors().filter((o) => o.slug !== s.slug);
  const propertyType = { "hotels-hospitality": "Hotel / hospitality", "condo-apartment-lobbies": "Condo or apartment building", "plazas-malls": "Plaza or shopping centre", "office-buildings": "Office building", "property-management": "Property management portfolio", "restaurants-retail": "Restaurant, retail or dealership", "municipalities-bias": "Municipality / BIA" }[s.slug] ?? "";

  return (
    <>
      <JsonLd data={[serviceSchema({ name: `Commercial holiday decorating for ${s.name.toLowerCase()}`, description: s.metaDescription, url, type: "Commercial holiday decorating" }), faqSchema(s.faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: s.name, url }])]} />

      <PageHero image={s.heroImage} video={s.heroVideo} eyebrow={s.eyebrow} title={s.h1} sub={s.intro[0]} crumbs={<Breadcrumbs items={[{ name: s.name }]} />}>
        <div className="card-light p-5 sm:p-7">
          <span className="pill mb-3"><Icon.Calendar width={14} height={14} /> {site.quote.short}</span>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">Get a fixed seasonal price</h2>
          <p className="text-sm text-slate-600 mt-1 mb-4">{site.quote.promise}</p>
          <SectorForm propertyType={propertyType} />
        </div>
      </PageHero>

      {/* Intro + challenges */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
          <div>
            <span className="pill mb-4">What you’re dealing with</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink text-balance">The problems a holiday program has to solve</h2>
            {s.intro.slice(1).map((p, i) => <p key={i} className="mt-4 text-[var(--muted)] leading-relaxed">{p}</p>)}
            <Link href="/contact" className="btn btn-primary mt-7">{site.quote.cta} <Icon.Arrow width={16} height={16} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {s.challenges.map((c, i) => (
              <div key={c.title} className="card card-static p-5">
                <span className="stat-num text-xl block mb-2 text-[var(--gold-ink)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-bold text-ink mb-1">{c.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpacesGrid items={s.spaces} eyebrow="Spaces we decorate" title={`Where the decor goes in ${s.shortName.toLowerCase()}`} />
      <Programs programs={s.programs} />
      <SeasonTimeline items={s.timeline} />

      {/* Gallery */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Our work" title={`${s.shortName} projects from our gallery`} sub="Real installs by our crews. Browse the full gallery for more." />
          <PhotoGrid images={s.gallery.map(getImage)} />
          <div className="text-center mt-8"><Link href="/gallery" className="btn btn-outline btn-sm">Full gallery <Icon.Arrow width={14} height={14} /></Link></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.5fr] gap-10">
          <div>
            <span className="pill mb-4">FAQ</span>
            <h2 className="font-display text-3xl text-ink leading-tight">{s.shortName} questions, answered</h2>
            <p className="mt-3 text-[var(--muted)]">Still unsure? <Link href="/faq" className="text-[var(--accent-ink)] underline underline-offset-2">Read all 40 FAQs</Link> or send the form.</p>
            <div className="mt-8"><RelatedLinks title="Related services" items={related.map((r) => ({ label: r.name, href: `/services/${r.slug}`, desc: r.navDescription }))} /></div>
          </div>
          <FaqList items={s.faqs} name={`${s.slug}-faq`} />
        </div>
      </section>

      {/* Cities + other sectors */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-2 gap-10">
          <div>
            <span className="pill mb-4">Where we work</span>
            <h2 className="font-display text-2xl text-ink mb-4">{s.shortName} across Ontario</h2>
            <CityChips cities={getCities()} basePath="/service-areas" />
          </div>
          <div>
            <span className="pill mb-4">Other sectors</span>
            <h2 className="font-display text-2xl text-ink mb-4">Also decorating</h2>
            <div className="flex flex-wrap gap-2">
              {otherSectors.map((o) => <Link key={o.slug} href={`/${o.slug}`} className="chip">{o.name}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <ClosingForm eyebrow={s.eyebrow} title={s.ctaTitle} body={s.ctaBody} image={s.gallery[1] ?? s.heroImage} formProps={{ defaultPropertyType: propertyType }} />
    </>
  );
}

import { QuoteFormCompact } from "@/components/QuoteFormCompact";
function SectorForm({ propertyType }: { propertyType: string }) {
  return <QuoteFormCompact formId="sector-hero" defaultPropertyType={propertyType} />;
}
