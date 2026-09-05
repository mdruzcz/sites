import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { getGuides, guidePhoto } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck & Fence Care Guides: Staining, Costs, Timing, Maintenance",
  description: "Helpful tips from Restore My Deck: how much deck staining costs, when to restain, oil vs water-based stain, cedar vs pressure-treated, prep, cleaning, maintenance and fence staining vs painting.",
  alternates: { canonical: `${site.url}/blog` },
};

const ORDER = ["Costs", "Maintenance", "Stains", "Process", "Fences"];

export default function BlogPage() {
  const guides = getGuides();
  const groups = ORDER.map((category) => ({ category, items: guides.filter((g) => g.category === category) })).filter((g) => g.items.length);
  const listLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Restore My Deck guides", itemListElement: guides.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${site.url}/${a.slug}` })) };
  return (
    <>
      <Script id="guides-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <PageHero photo={PICKS.heroBlog} eyebrow="Helpful tips" title="Deck care, explained by the people who do it." intro="What staining costs, when to do it, which stain suits your wood and how to keep a finished deck looking good between visits." crumbs={[{ label: "Helpful tips" }]} form={false} compact />
      <section className="bg-[var(--paper)]">
        <div className="shell section space-y-14">
          {groups.map((g) => (
            <div key={g.category}>
              <div className="flex items-end justify-between gap-4"><p className="eyebrow-pill">{g.category}</p><p className="text-sm text-[var(--muted)]">{g.items.length} {g.items.length === 1 ? "guide" : "guides"}</p></div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((a) => (
                  <Link key={a.slug} href={`/${a.slug}`} className="card card-lift group flex flex-col overflow-hidden">
                    <Photo name={guidePhoto(a.slug)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, 380px" />
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
