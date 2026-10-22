import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getImage, getSector, getService, getServices } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, SectionHeading, PhotoGrid, RelatedLinks, CheckList } from "@/components/ui";
import { PageHero, IncludesGrid, ProcessTimeline, ClosingForm } from "@/components/sections";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `${site.url}/services/${s.slug}`;
  const img = getImage(s.heroImage);
  return {
    title: { absolute: `${s.title} | ${site.name}` },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description: s.metaDescription, url, images: [{ url: img.src, alt: img.alt }] },
    twitter: { card: "summary_large_image", title: s.title, description: s.metaDescription },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const url = `${site.url}/services/${s.slug}`;
  const sectors = s.relatedSectors.map(getSector).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const services = s.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd data={[serviceSchema({ name: s.name, description: s.metaDescription, url }), faqSchema(s.faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }, { name: s.name, url }])]} />

      <PageHero image={s.heroImage} eyebrow={s.eyebrow} title={s.h1} sub={s.intro[0]} crumbs={<Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: s.name }]} />} />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
          <div>
            {s.intro.slice(1).map((p, i) => <p key={i} className="text-lg text-body leading-relaxed mb-5">{p}</p>)}
            <h2 className="font-display text-2xl text-ink mt-8 mb-4">Ideal for</h2>
            <CheckList items={s.idealFor} />
          </div>
          <aside className="card card-static p-6 lg:sticky lg:top-28">
            <h3 className="font-bold text-ink text-lg mb-4">At a glance</h3>
            <dl className="divide-y divide-[var(--border)]">
              {s.specs.map((sp) => (
                <div key={sp.label} className="py-3 flex justify-between gap-4 text-sm"><dt className="text-[var(--muted)]">{sp.label}</dt><dd className="font-semibold text-ink text-right">{sp.value}</dd></div>
              ))}
            </dl>
            <Link href="/contact" className="btn btn-primary w-full mt-5">{site.quote.cta}</Link>
            <a href={site.phoneHref} className="btn btn-outline w-full mt-2"><Icon.Phone width={16} height={16} /> {site.phone}</a>
          </aside>
        </div>
      </section>

      <IncludesGrid items={s.includes} eyebrow="What's included" title={`Everything in a ${s.shortName.toLowerCase()} program`} />
      <ProcessTimeline steps={s.process.map((p) => ({ title: p.title, desc: p.body }))} eyebrow="How it works" title="Four steps, no surprises" sub="" />

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Our work" title={`${s.shortName} from the gallery`} />
          <PhotoGrid images={s.gallery.map(getImage)} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.5fr] gap-10">
          <div>
            <span className="pill mb-4">FAQ</span>
            <h2 className="font-display text-3xl text-ink leading-tight">{s.shortName} questions</h2>
            <div className="mt-8 space-y-8">
              <RelatedLinks title="Who this is for" items={sectors.map((r) => ({ label: r.name, href: `/${r.slug}`, desc: r.navDescription }))} />
              <RelatedLinks title="Pairs well with" items={services.map((r) => ({ label: r.name, href: `/services/${r.slug}`, desc: r.navDescription }))} />
            </div>
          </div>
          <FaqList items={s.faqs} name={`${s.slug}-faq`} />
        </div>
      </section>

      <ClosingForm eyebrow={s.eyebrow} title={s.ctaTitle} body={s.ctaBody} image={s.gallery[0] ?? s.heroImage} />
    </>
  );
}
