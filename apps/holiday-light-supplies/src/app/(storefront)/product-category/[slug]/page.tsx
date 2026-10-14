import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { PageHero } from "@/components/page-hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { CtaBand } from "@/components/sections/cta-band";
import { breadcrumbLd, CheckList, FaqList, faqLd } from "@/components/ui";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { getCategories, listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";
import { Icon } from "@/components/icons";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  const content = CATEGORY_CONTENT[slug];
  const title = content?.metaTitle ?? CATEGORY_META[slug]?.title ?? cat.name;
  const description = content?.metaDescription ?? cat.description ?? `Shop ${cat.name} — commercial-grade Christmas lighting from Holiday Light Supplies, shipped across Canada.`;
  const url = `${SITE_URL}/product-category/${cat.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Holiday Light Supplies`, description, url },
    twitter: { card: "summary_large_image", title: `${title} | Holiday Light Supplies`, description }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await listProducts({ categorySlug: slug });
  const content = CATEGORY_CONTENT[slug];
  const title = content?.h1 ?? CATEGORY_META[slug]?.title ?? cat.name;
  const url = `${SITE_URL}/product-category/${cat.slug}`;

  const siblings = categories.filter((c) => c.slug !== slug && c.slug !== "new-products" && c.slug !== "last-chance").slice(0, 10);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 50).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/product/${p.slug}` }))
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ href: "/shop", label: "Shop" }, { label: title }])) }} />
      {content?.faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(content.faq)) }} />}

      <PageHero
        photo={content?.photo ?? "plaza-tree-night"}
        eyebrow={`${products.length} product${products.length === 1 ? "" : "s"} · ships from Ontario`}
        title={title}
        intro={content?.intro ?? cat.description ?? undefined}
        crumbs={[{ href: "/shop", label: "Shop" }, { label: title }]}
        cta={{ href: "/request-a-quote", label: "Quote a whole project" }}
        compact
      />
      <TrustStrip compact />

      <div className="shell section">
        {/* Sibling category rail */}
        <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {siblings.map((c) => (
            <li key={c.id} className="shrink-0">
              <Link href={`/product-category/${c.slug}`} className="chip min-h-[38px] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
                {CATEGORY_META[c.slug]?.title ?? c.name}
              </Link>
            </li>
          ))}
        </ul>

        {products.length === 0 ? (
          <div className="card mt-8 p-10 text-center">
            <p className="font-display text-xl">Nothing listed here yet.</p>
            <p className="mt-2 text-[var(--color-muted)]">We can usually source it. Tell us what you need.</p>
            <Link href="/request-a-quote" className="btn-primary mt-5">Ask for a quote</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}

        {(content?.tips || content?.faq || content?.guide) && (
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {content.tips && (
              <div className="card p-7">
                <p className="eyebrow text-[var(--color-accent)]">Buying tips</p>
                <h2 className="font-display mt-3 text-2xl">Before you order {title.toLowerCase()}</h2>
                <CheckList className="mt-5" items={content.tips} />
                {content.guide && (
                  <Link href={content.guide.href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline">
                    {content.guide.label} <Icon.arrow size={14} />
                  </Link>
                )}
              </div>
            )}
            {content.faq && (
              <div>
                <p className="eyebrow text-[var(--color-accent)]">Questions</p>
                <h2 className="font-display mt-3 text-2xl">Ordering {title.toLowerCase()}</h2>
                <div className="mt-5">
                  <FaqList items={content.faq} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CtaBand title={`Need ${title.toLowerCase()} for a whole site?`} body="Send the quantities, pole count or tree list and we quote it line by line with freight and lead time, usually within one business day." />
    </>
  );
}
