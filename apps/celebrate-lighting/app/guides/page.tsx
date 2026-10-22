import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getGuides, getGuideCategories } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Permanent Lighting Guides: Cost, Winters, Soffits & More";
const description = "Plain-English guides to permanent outdoor LED lighting in Ontario: what it costs, how it survives winter, soffit compatibility, app control, warranties, C9 installs and choosing an installer.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/guides" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/guides`, images: [{ url: "/images/gallery/daytime-colour-matched-permanent-light-track-in-white-soffit.jpg", alt: "Permanent lighting guides" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function GuidesPage() {
  const guides = getGuides();
  const cats = getGuideCategories();
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/guides` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Guides", url: `${site.url}/guides` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guides" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Learn before you buy</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Permanent Lighting Guides for Ontario Homeowners</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">Honest, specific answers to the questions we hear at every demo. Written for Southwestern Ontario homes and winters.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          {cats.map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="font-bold text-2xl text-ink mb-5">{cat}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.filter((g) => g.category === cat).map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="card card-lift p-6 flex flex-col group">
                    <span className="text-xs text-[var(--muted)]">{g.readingMinutes} min read</span>
                    <h3 className="font-bold text-lg text-ink mt-2 leading-snug">{g.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-3 flex-1">{g.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Read guide <Icon.Arrow width={16} height={16} /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <BookCta />
    </>
  );
}
