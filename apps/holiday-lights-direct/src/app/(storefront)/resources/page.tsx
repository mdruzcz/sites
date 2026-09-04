import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";
import { articles, getArticlesByCategory, CATEGORY_PHOTO } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas & Permanent Lighting Guides",
  description:
    "Practical guides from Holiday Lights Direct: measuring rooflines, C9 bulbs and wire, clips, circuit loads, custom-length runs, storage, and installing 12V permanent LED kits. Written for Canadian homes and installers.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: "Christmas & Permanent Lighting Guides | Holiday Lights Direct",
    description: "How-tos and buying guides for C9 lighting, wire, clips and permanent LED roofline kits.",
    url: `${SITE_URL}/resources`,
  },
};

export default function ResourcesPage() {
  const groups = getArticlesByCategory();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/resources` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Holiday Lights Direct guides",
      itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${SITE_URL}/resources/${a.slug}` })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        photo="home-christmas-warm-white"
        photoAlt="Two-storey home outlined in warm white C9 Christmas lights at dusk"
        eyebrow="Guides & how-tos"
        title="Lighting done properly, explained plainly."
        intro="Measuring, wiring, clips, bulbs and permanent LED kits. The same advice we give installers, written for anyone lighting a home or a storefront in Canada."
        crumb="Guides"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section space-y-16">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">{group.category}</p>
                </div>
                <p className="text-sm text-[var(--color-muted)]">
                  {group.items.length} {group.items.length === 1 ? "guide" : "guides"}
                </p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((a) => (
                  <Link key={a.slug} href={`/resources/${a.slug}`} className="card group flex flex-col overflow-hidden">
                    <Photo
                      name={(CATEGORY_PHOTO[a.category] ?? "home-nighttime-lit") as PhotoKey}
                      alt={a.heroAlt}
                      ratio="aspect-[16/9]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs text-[var(--color-muted)]">{a.readMinutes} min read</p>
                      <h2 className="font-display mt-2 text-xl leading-snug transition group-hover:text-[var(--color-gold-text)]">
                        {a.title}
                      </h2>
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

      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section-lg text-center">
          <p className="eyebrow text-[var(--color-gold-text)]">Ready to order?</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Installer-grade gear, shipped from London, Ontario.</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">Shop the catalog</Link>
            <Link href="/permanent-lights" className="btn-secondary">Permanent lighting kits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
