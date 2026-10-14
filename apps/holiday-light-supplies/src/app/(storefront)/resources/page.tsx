import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { breadcrumbLd } from "@/components/ui";
import { articles, articlePhoto, getArticlesByCategory } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Commercial Christmas Lighting Guides",
  description: "Practical guides for buyers at malls, BIAs, municipalities and installation crews: budgeting, procurement, C9 and 3D display buying guides, tree wrapping, power planning and permanent LED lighting.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: { title: "Commercial Christmas Lighting Guides | Holiday Light Supplies", url: `${SITE_URL}/resources` }
};

export default function ResourcesPage() {
  const groups = getArticlesByCategory();
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Holiday Light Supplies guides",
    itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${SITE_URL}/resources/${a.slug}` }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Guides" }])) }} />
      <PageHero
        photo="downtown-boulevard"
        eyebrow="Guides & how-tos"
        title="Planning a commercial display, explained plainly."
        intro="Budgets, tenders, bulb math, display specs, tree wrapping and power. The advice we give BIAs, parks departments and installers, written down."
        crumbs={[{ label: "Guides" }]}
        compact
      />

      <section className="bg-white">
        <div className="shell section space-y-16">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="flex items-end justify-between gap-4">
                <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">{group.category}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  {group.items.length} {group.items.length === 1 ? "guide" : "guides"}
                </p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((a) => (
                  <Link key={a.slug} href={`/resources/${a.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                    <Photo name={articlePhoto(a)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" imgClassName="transition duration-700 group-hover:scale-[1.04]" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs text-[var(--color-muted)]">{a.readMinutes} min read</p>
                      <h2 className="font-display mt-2 text-xl leading-snug transition group-hover:text-[var(--color-brand)]">{a.title}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">{a.excerpt}</p>
                      <span className="mt-5 text-sm font-semibold text-[var(--color-accent)]">Read the guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Ready to price the project?" body="Send pole counts, tree lists or a site plan and we return a line-item quote within one business day." photo="town-park-arch" />
    </>
  );
}
