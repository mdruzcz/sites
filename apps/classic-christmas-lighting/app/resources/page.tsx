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
  title: "Christmas Lighting Guides: Pricing, Prep, Design, Commercial",
  description: "Guides from Classic Christmas Lighting: what to expect from a professional install in Waterloo Region, how installers price a home, LED vs incandescent, tree wrapping, entrance décor and commercial ideas.",
  alternates: { canonical: `${site.url}/resources` },
  openGraph: { title: "Christmas Lighting Guides | Classic Christmas Lighting", description: "Pricing, prep, design and commercial guides from Kitchener-Waterloo's Christmas light installers.", url: `${site.url}/resources` },
};

export default function ResourcesPage() {
  const groups = getByCategory();
  const listLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Classic Christmas Lighting guides", itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${site.url}/resources/${a.slug}` })) };
  return (
    <>
      <Script id="guides-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <PageHero photo={PICKS.heroResources} eyebrow="Guides & tips" title="Christmas lighting, explained by the people who hang it." intro="How installs are priced, how to get the house ready, which lights suit Ontario winters and how to light a storefront. Written for Waterloo Region homes and businesses." crumbs={[{ label: "Guides" }]} form={false} compact />
      <section className="bg-[var(--snow)]">
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
                      <h2 className="font-display mt-2 text-xl leading-snug group-hover:text-[var(--candy)]">{a.title}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{a.excerpt}</p>
                      <span className="mt-4 text-sm font-bold text-[var(--candy-deep)]">Read the guide →</span>
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
