import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { Breadcrumbs, breadcrumbLd } from "@/components/ui";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";
import { searchCatalog } from "@/lib/search";
import { PRICE_BUCKETS, SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop Commercial Christmas Lights & Décor",
  description:
    "Browse every commercial-grade C9 bulb, socket spool, 3D LED display, pole-mount piece, wreath, garland and tree. Volume pricing for installers, BIAs, malls and municipalities. Ships from Ontario.",
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: { title: "Shop Commercial Christmas Lights & Décor | Holiday Light Supplies", url: `${SITE_URL}/shop` }
};

interface PageProps {
  searchParams: Promise<{ category?: string; price?: string; sort?: string; q?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { category, price, sort, q } = await searchParams;
  const [allProducts, categories] = await Promise.all([listProducts(), getCategories()]);
  const catName = (c: (typeof categories)[number]) => CATEGORY_META[c.slug]?.title ?? c.name;
  const catById = new Map(categories.map((c) => [c.id, c]));
  const inCategory = (p: (typeof allProducts)[number], id: string) => (p.ecom_product_categories ?? []).some((j) => j.category_id === id);

  // Search and price narrow the whole catalog first; the category list then counts
  // only what is left, so a category never promises products the search rules out.
  const query = q?.trim() ?? "";
  const search = query
    ? searchCatalog(allProducts, query, (p) => ({
        name: p.name,
        slug: p.slug,
        short_description: p.short_description,
        skus: (p.ecom_variants ?? []).map((v) => v.sku),
        categories: (p.ecom_product_categories ?? []).flatMap((j) => {
          const c = catById.get(j.category_id);
          return c ? [catName(c), c.slug.replace(/-/g, " ")] : [];
        })
      }))
    : { items: allProducts, loose: false };

  let matching = search.items;
  if (price) {
    if (price === "quote") {
      matching = matching.filter((p) => priceRange(p)?.quoteOnly);
    } else {
      const [lo, hi] = price.split("-").map(Number);
      matching = matching.filter((p) => {
        const r = priceRange(p);
        if (!r || r.quoteOnly) return false;
        return r.min >= (lo || 0) && r.min <= (hi || Infinity);
      });
    }
  }

  const activeCat = category ? categories.find((c) => c.slug === category) : undefined;
  let products = activeCat ? matching.filter((p) => inCategory(p, activeCat.id)) : matching;

  const minOf = (p: (typeof products)[number]) => priceRange(p)?.min ?? 0;
  if (sort === "price-asc") products = [...products].sort((a, b) => minOf(a) - minOf(b));
  else if (sort === "price-desc") products = [...products].sort((a, b) => minOf(b) - minOf(a));
  else if (sort === "name") products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "newest") products = [...products].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  else if (!query) products = [...products].sort((a, b) => Number(b.featured) - Number(a.featured));
  // With a search and no chosen sort, products stay in relevance order.

  const categoryCounts = new Map<string, number>();
  for (const cat of categories) categoryCounts.set(cat.slug, matching.filter((p) => inCategory(p, cat.id)).length);

  // Where the search did find things when the chosen category has none of them.
  const elsewhere = activeCat && products.length === 0 && matching.length > 0
    ? categories.filter((c) => (categoryCounts.get(c.slug) ?? 0) > 0).sort((a, b) => (categoryCounts.get(b.slug) ?? 0) - (categoryCounts.get(a.slug) ?? 0)).slice(0, 6)
    : [];

  const href = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { category, price, sort, q: query || undefined, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) next.set(k, v);
    const s = next.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  const priceLabel = price ? PRICE_BUCKETS.find((b) => b.value === price)?.label ?? price : undefined;
  const chips = [
    query && { label: `“${query}”`, href: href({ q: undefined }) },
    activeCat && { label: catName(activeCat), href: href({ category: undefined }) },
    priceLabel && { label: priceLabel, href: href({ price: undefined }) }
  ].filter((c): c is { label: string; href: string } => !!c);

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Shop" }])) }} />
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell py-8 md:py-10">
          <Breadcrumbs items={[{ label: "Shop" }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">{query ? <>Results for &ldquo;{query}&rdquo;</> : "Shop the commercial catalog"}</h1>
              <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
                Every product is commercial-grade and stocked in London, Ontario. Add to your quote list and we price shipping, volume and public-sector terms on the quote.
              </p>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              {products.length} of {allProducts.length} products
            </p>
          </div>
        </div>
      </div>

      <div className="shell grid gap-8 py-8 lg:grid-cols-[260px_1fr] lg:py-12">
        <ShopFilters
          categories={categories.map((c) => ({ slug: c.slug, name: catName(c), count: categoryCounts.get(c.slug) ?? 0 }))}
          total={matching.length}
          activeCategory={category}
          activePrice={price}
          activeSort={sort}
          activeQ={q}
        />

        <div>
          {chips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
              {chips.map((c) => (
                <Link key={c.label} href={c.href} className="chip min-h-[36px] gap-1.5 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]" aria-label={`Remove ${c.label}`}>
                  {c.label} <span aria-hidden className="text-base leading-none">&times;</span>
                </Link>
              ))}
              {chips.length > 1 && (
                <Link href="/shop" className="px-2 font-semibold text-[var(--color-brand)] hover:underline">Clear all</Link>
              )}
            </div>
          )}
          {search.loose && products.length > 0 && (
            <p className="mb-5 rounded-xl bg-[var(--color-bg-warm)] px-4 py-3 text-sm text-[var(--color-text-soft)]">
              Nothing matched every word of &ldquo;{query}&rdquo;, so these are the closest matches.
            </p>
          )}
          {products.length === 0 && (
            <div className="card p-10 text-center">
              {elsewhere.length > 0 && activeCat ? (
                <>
                  <p className="font-display text-xl">No &ldquo;{query}&rdquo; in {catName(activeCat)}.</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">It turns up in these categories:</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {elsewhere.map((c) => (
                      <Link key={c.slug} href={href({ category: c.slug })} className="chip min-h-[38px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
                        {catName(c)} <span className="text-xs text-[var(--color-muted)]">{categoryCounts.get(c.slug)}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-center gap-3">
                    <Link href={href({ category: undefined })} className="btn-secondary">All {matching.length} results</Link>
                    <Link href={href({ q: undefined })} className="btn-secondary">All of {catName(activeCat)}</Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-display text-xl">{query ? <>Nothing found for &ldquo;{query}&rdquo;.</> : "No products match those filters."}</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">Try a broader search, or tell us what you&rsquo;re after and we&rsquo;ll source it.</p>
                  <div className="mt-5 flex justify-center gap-3">
                    <Link href="/shop" className="btn-secondary">Clear filters</Link>
                    <Link href="/request-a-quote" className="btn-primary">Ask for a quote</Link>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
