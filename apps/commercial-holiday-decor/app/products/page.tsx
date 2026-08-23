import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { products } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Commercial Christmas Decor Products",
  description:
    "Commercial Christmas trees to 100 feet, 4-foot wreaths, pole motifs, snowflakes, giant ornaments, holiday displays, topiaries, florals and custom fabrication for commercial and municipal properties in Southwestern Ontario.",
  alternates: { canonical: `${site.url}/products` },
  openGraph: {
    title: "Commercial Christmas Decor Products",
    description: "Trees, wreaths, pole motifs, ornaments, displays and custom fabrication for commercial properties.",
    url: `${site.url}/products`
  }
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Christmas Decor Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/products/${p.slug}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="tree-lighting-row"
        photoAlt="Row of large illuminated commercial Christmas trees at night"
        eyebrow="What we build"
        title="Commercial decor products"
        intro="Ten product lines, all built on steel and commercial LED, all sized on site before anything is quoted."
        crumb="Products"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="space-y-16 md:space-y-24">
            {products.map((p, i) => (
              <article
                key={p.slug}
                className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure>
                  <Photo
                    name={p.scenePhoto}
                    ratio="aspect-[4/3]"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    rounded="rounded-3xl"
                  />
                </figure>
                <div>
                  <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">{p.eyebrow}</p>
                  <h2 className="font-display mt-6 text-[1.9rem] md:text-[2.5rem]">{p.headline}</h2>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{p.summary}</p>
                  <ul className="mt-7 space-y-2.5">
                    {p.items.slice(0, 4).map((it) => (
                      <li key={it.name} className="flex items-start gap-2.5 text-sm text-[var(--color-text-soft)]">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                        <span>
                          <span className="font-semibold text-[var(--color-text)]">{it.name}</span> — {it.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link href={`/products/${p.slug}`} className="btn-primary">
                      {p.name} in detail
                    </Link>
                    <Link href="/quote" className="btn-secondary">
                      {site.quote.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
