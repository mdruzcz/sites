import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ARTICLES, getByCategory, articlePhoto } from "@/lib/resources";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Sealing Guides: Finishes, Costs, Timing, Problems",
  description: "Fifteen guides from TriCity Concrete Sealing: matte vs semi-gloss vs gloss, solvent vs water-based sealers, how sealing is priced, when to seal new concrete, stamped and aggregate guides, white haze, slip resistance and more.",
  alternates: { canonical: `${site.url}/resources` },
  openGraph: { title: "Concrete Sealing Guides | TriCity Concrete Sealing", description: "Finishes, costs, timing, surfaces and problem-solving guides from Southwestern Ontario's concrete sealing specialists.", url: `${site.url}/resources` },
};

export default function ResourcesPage() {
  const groups = getByCategory();
  const listLd = { "@context": "https://schema.org", "@type": "ItemList", name: "TriCity Concrete Sealing guides", itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${site.url}/resources/${a.slug}` })) };
  return (
    <>
      <Script id="guides-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <PageHero photo={PICKS.heroResources} eyebrow="Guides & tips" title="Concrete sealing, explained by the people who do it." intro="Which finish, which sealer, what it costs, when to do it and how to fix what went wrong last time. Written for Southwestern Ontario driveways and patios." crumbs={[{ label: "Guides" }]} form={false} compact />
      <section className="bg-[var(--stone)]">
        <div className="shell section space-y-14">
          {groups.map((g) => (
            <div key={g.category}>
              <div className="flex items-end justify-between gap-4">
                <p className="eyebrow-pill">{g.category}</p>
                <p className="text-sm text-[var(--muted)]">{g.items.length} {g.items.length === 1 ? "guide" : "guides"}</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((a) => (
                  <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group flex flex-col overflow-hidden">
                    <Photo name={articlePhoto(a.slug)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, 380px" />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs text-[var(--muted)]">{a.readMinutes} min read</p>
                      <h2 className="font-display mt-2 text-xl leading-snug group-hover:text-[var(--accent-deep)]">{a.title}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{a.excerpt}</p>
                      <span className="mt-4 text-sm font-bold text-[var(--accent-deep)]">Read the guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
