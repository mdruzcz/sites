import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getCities, getCity, getImage, getSector, getServices } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHeading, CityChips, IconTile, RelatedLinks } from "@/components/ui";
import { PageHero, ClosingForm } from "@/components/sections";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const url = `${site.url}/service-areas/${c.slug}`;
  return {
    title: { absolute: `${c.title} | ${site.name}` },
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: `/service-areas/${c.slug}` },
    openGraph: { title: c.title, description: c.metaDescription, url, images: [{ url: getImage(c.heroImage).src, alt: getImage(c.heroImage).alt }] },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const url = `${site.url}/service-areas/${c.slug}`;
  const nearby = c.nearby.map(getCity).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const services = getServices().slice(0, 4);

  return (
    <>
      <JsonLd data={[serviceSchema({ name: "Commercial holiday decorating", description: c.metaDescription, url, city: c.name }), faqSchema(c.faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service areas", url: `${site.url}/service-areas` }, { name: c.name, url }])]} />

      <PageHero image={c.heroImage} eyebrow={`${c.region} · ${c.logistics.driveFromLondon}`} title={c.h1} sub={c.intro[0]} crumbs={<Breadcrumbs items={[{ name: "Service areas", href: "/service-areas" }, { name: c.name }]} />} />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16">
          <div>
            {c.intro.slice(1).map((p, i) => <p key={i} className="text-lg text-body leading-relaxed mb-5">{p}</p>)}
            <h2 className="font-display text-2xl md:text-3xl text-ink mt-10 mb-5">Where we work in {c.name}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.districts.map((d) => (
                <div key={d.name} className="card card-static p-5">
                  <IconTile className="!w-10 !h-10 mb-3"><Icon.Pin width={18} height={18} /></IconTile>
                  <h3 className="font-bold text-ink mb-1">{d.name}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 self-start">
            <div className="card card-static p-6">
              <h3 className="font-bold text-ink text-lg mb-3">Logistics in {c.name}</h3>
              <p className="text-sm text-body leading-relaxed">{c.logistics.access}</p>
              <div className="hairline my-4" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-ink)] mb-1">Timing</p>
              <p className="text-sm text-body leading-relaxed">{c.logistics.seasonNote}</p>
              <Link href="/contact" className="btn btn-primary w-full mt-5">{site.quote.cta}</Link>
            </div>
            <RelatedLinks title="Services" items={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
          </aside>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Property types" title={`What we decorate in ${c.name}`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.sectorsHere.map((sh) => {
              const sec = getSector(sh.sector);
              return (
                <Link key={sh.sector} href={`/${sh.sector}`} className="card card-lift p-6 flex flex-col">
                  <h3 className="font-bold text-ink text-lg">{sec?.name ?? sh.sector}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{sh.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Sector page <Icon.Arrow width={14} height={14} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.5fr] gap-10">
          <div>
            <span className="pill mb-4">FAQ</span>
            <h2 className="font-display text-3xl text-ink leading-tight">{c.name} questions</h2>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] mt-8 mb-3">Nearby</h3>
            <CityChips cities={nearby} basePath="/service-areas" />
            <Link href="/service-areas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-ink)] hover:underline">All service areas <Icon.Arrow width={14} height={14} /></Link>
          </div>
          <FaqList items={c.faqs} name={`${c.slug}-faq`} />
        </div>
      </section>

      <ClosingForm title={`Decorating a property in ${c.name}? Start with a site visit.`} body={`${site.quote.detail} ${c.logistics.driveFromLondon} from our London base, with crews on the road across ${c.region} every week of the season.`} image={c.heroImage} />
    </>
  );
}
