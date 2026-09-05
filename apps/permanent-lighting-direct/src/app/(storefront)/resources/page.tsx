import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { articles, getArticlesByCategory, articlePhoto } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Permanent Lighting Guides: Measuring, Installing, Controlling",
  description:
    "Practical guides for DIY permanent roofline lighting in Canada: measuring, cost vs professional install, soffit installation, 12V power injection, WLED setup, track colours, winter performance and troubleshooting.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: { title: "Permanent Lighting Guides | Permanent Lighting Direct", description: "How-tos and buying guides for DIY permanent LED roofline lighting.", url: `${SITE_URL}/resources`, images: ["/images/photos/home-daytime-hidden.webp"] }
};

export default function ResourcesPage() {
  const groups = getArticlesByCategory();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Permanent Lighting Direct guides",
    itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${SITE_URL}/resources/${a.slug}` }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        photo="home-daytime-hidden"
        eyebrow="Guides & how-tos"
        title="Permanent lighting, explained plainly."
        intro="Measuring, costs, installation, power, the app and what to do when something flickers. The same advice we give installers, written for anyone lighting a home in Canada."
        crumbs={[{ label: "Guides" }]}
      />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section space-y-16">
          {groups.map((group) => (
            <div key={group.category}>
              <div className="flex items-end justify-between gap-4">
                <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">{group.category}</p>
                <p className="text-sm text-[var(--color-muted)]">{group.items.length} {group.items.length === 1 ? "guide" : "guides"}</p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((a) => (
                  <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group flex flex-col overflow-hidden">
                    <Photo name={articlePhoto(a)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="transition duration-500 group-hover:scale-[1.04]" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs text-[var(--color-muted)]">{a.readMinutes} min read</p>
                      <h2 className="font-display mt-2 text-xl leading-snug transition group-hover:text-[var(--color-accent-dark)]">{a.title}</h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">{a.excerpt}</p>
                      <span className="mt-5 text-sm font-semibold text-[var(--color-accent-dark)]">Read the guide →</span>
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
          <p className="eyebrow text-[var(--color-gold)]">Ready to order?</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Installer-grade 12V hardware, shipped from London, Ontario.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Pick a kit</Link>
            <Link href="/shop" className="btn-ghost-light">Shop parts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
