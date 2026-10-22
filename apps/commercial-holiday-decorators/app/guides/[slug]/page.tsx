import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getGuide, getGuides, getImage, getSector, getService } from "@/lib/content";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, RelatedLinks, Photo } from "@/components/ui";
import { ClosingForm } from "@/components/sections";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `${site.url}/guides/${g.slug}`;
  return {
    title: { absolute: `${g.title} | ${site.name}` },
    description: g.metaDescription,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.metaDescription, url, publishedTime: g.publishedAt, images: [{ url: getImage(g.heroImage).src, alt: getImage(g.heroImage).alt }] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const url = `${site.url}/guides/${g.slug}`;
  const hero = getImage(g.heroImage);
  const services = g.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const sectors = g.relatedSectors.map(getSector).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const more = getGuides().filter((o) => o.slug !== g.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[articleSchema({ title: g.title, description: g.metaDescription, url, image: hero.src, datePublished: g.publishedAt }), faqSchema(g.faqs), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Guides", url: `${site.url}/guides` }, { name: g.title, url }])]} />
      <section className="section !pb-8" style={{ background: "var(--surface)" }}>
        <div className="wrap max-w-4xl">
          <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: g.title }]} />
          <span className="pill mt-6 mb-4">{g.readingTime} · {new Date(g.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">{g.title}</h1>
          <p className="mt-5 text-lg text-body leading-relaxed">{g.excerpt}</p>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap max-w-4xl">
          <Photo img={hero} ratio="aspect-[16/9]" className="rounded-3xl mb-10" sizes="(max-width: 1024px) 100vw, 896px" priority />
          <article className="prose-dark">
            {g.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                {s.bullets && s.bullets.length > 0 && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                {s.table && (
                  <table>
                    <thead><tr>{s.table.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
                    <tbody>{s.table.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                )}
              </section>
            ))}
          </article>
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink mb-4">Questions this guide raises</h2>
            <FaqList items={g.faqs} name={`${g.slug}-faq`} />
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <RelatedLinks title="Related services" items={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
            <RelatedLinks title="Sectors" items={sectors.map((s) => ({ label: s.name, href: `/${s.slug}` }))} />
          </div>
          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink mb-4">More guides</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {more.map((m) => (
                <li key={m.slug}><Link href={`/guides/${m.slug}`} className="card card-lift p-5 block h-full"><p className="text-xs text-[var(--muted)]">{m.readingTime}</p><p className="mt-1 font-bold text-ink leading-snug">{m.title}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-ink)]">Read <Icon.Arrow width={14} height={14} /></span></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <ClosingForm />
    </>
  );
}
