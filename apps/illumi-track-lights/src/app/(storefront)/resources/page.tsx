import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ARTICLES, getByCategory, heroPhotoFor } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Soffit Lighting Guides: Install, Cost, Power, Rules",
  description:
    "Fourteen practical guides on permanent soffit track lighting in Canada: installing on vinyl, aluminum and wood soffits, costs, power injection, wiring layouts, zones, winter performance, bylaws and resale value.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: { title: "Soffit Lighting Guides | Illumi Track Lights", description: "How-tos, costs and parts education for permanent LED soffit lighting.", url: `${SITE_URL}/resources`, images: ["/images/photos/home-night-lit.webp"] }
};

export default function ResourcesPage() {
  const groups = getByCategory();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Illumi Track Lights guides",
    itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${SITE_URL}/resources/${a.slug}` }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="home-night-lit" eyebrow="Guides & how-tos" title="Soffit lighting, explained by the people who install it." intro="Measuring, mounting on every soffit type, power, wiring layouts, costs, bylaws and what holds up through an Ontario winter." crumbs={[{ label: "Guides" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section space-y-16">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="flex items-end justify-between gap-4">
                <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">{group.category}</p>
                <p className="text-sm text-[var(--color-muted)]">{group.articles.length} {group.articles.length === 1 ? "guide" : "guides"}</p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.articles.map((a) => (
                  <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group flex flex-col overflow-hidden">
                    <Photo name={heroPhotoFor(a.slug)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="transition duration-500 group-hover:scale-[1.04]" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs text-[var(--color-muted)]">{a.readMinutes} min read</p>
                      <h2 className="font-display mt-2 text-xl leading-snug transition group-hover:text-[var(--color-gold-text)]">{a.title}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">{a.excerpt}</p>
                      <span className="mt-5 text-sm font-semibold text-[var(--color-gold-text)]">Read the guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-ink)] text-white">
        <div className="shell section-lg text-center">
          <p className="eyebrow text-[var(--color-gold)]">Ready?</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Kits shipped Canada-wide, installs across Southwestern Ontario.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
            <Link href="/installation" className="btn-ghost-light">Book an install</Link>
          </div>
        </div>
      </section>
    </>
  );
}
