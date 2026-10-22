import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getGuides, getImage } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, Photo } from "@/components/ui";
import { ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Holiday Decor Planning Guides";
const description = "Practical guides for property managers, hotels and condo boards: the Ontario decorating timeline, lease vs buy, lobby tree sizing, hotel planning checklist, safety and insurance questions, and budgeting.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/guides" },
  openGraph: { title, description, url: `${site.url}/guides` },
};

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/guides` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Guides", url: `${site.url}/guides` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guides" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Planning guides</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Read before you budget</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{description}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card card-lift overflow-hidden flex flex-col group">
              <Photo img={getImage(g.heroImage)} ratio="aspect-[16/10]" className="!rounded-none" />
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-[var(--muted)]">{g.readingTime}</p>
                <h2 className="mt-1 font-bold text-ink text-lg leading-snug">{g.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{g.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Read the guide <Icon.Arrow width={14} height={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ClosingForm />
    </>
  );
}
