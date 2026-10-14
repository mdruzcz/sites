import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { Breadcrumbs, breadcrumbLd } from "@/components/ui";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

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

  let products = allProducts;

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) products = products.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id));
  }

  if (q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    products = products.filter((p) => {
      const hay = `${p.name} ${p.short_description ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }

  if (price) {
    if (price === "quote") {
      products = products.filter((p) => priceRange(p)?.quoteOnly);
    } else {
      const [lo, hi] = price.split("-").map(Number);
      products = products.filter((p) => {
        const r = priceRange(p);
        if (!r || r.quoteOnly) return false;
        return r.min >= (lo || 0) && r.min <= (hi || Infinity);
      });
    }
  }

  const minOf = (p: (typeof products)[number]) => priceRange(p)?.min ?? 0;
  if (sort === "price-asc") products = [...products].sort((a, b) => minOf(a) - minOf(b));
  else if (sort === "price-desc") products = [...products].sort((a, b) => minOf(b) - minOf(a));
  else if (sort === "name") products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "newest") products = [...products].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  else products = [...products].sort((a, b) => Number(b.featured) - Number(a.featured));

  const categoryCounts = new Map<string, number>();
  for (const cat of categories) {
    categoryCounts.set(cat.slug, allProducts.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)).length);
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Shop" }])) }} />
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell py-8 md:py-10">
          <Breadcrumbs items={[{ label: "Shop" }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Shop the commercial catalog</h1>
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
          categories={categories.map((c) => ({ slug: c.slug, name: CATEGORY_META[c.slug]?.title ?? c.name, count: categoryCounts.get(c.slug) ?? 0 }))}
          activeCategory={category}
          activePrice={price}
          activeSort={sort}
          activeQ={q}
        />

        <div>
          {products.length === 0 && (
            <div className="card p-10 text-center">
              <p className="font-display text-xl">No products match those filters.</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Try a broader search, or tell us what you&rsquo;re after and we&rsquo;ll source it.</p>
              <div className="mt-5 flex justify-center gap-3">
                <Link href="/shop" className="btn-secondary">Clear filters</Link>
                <Link href="/request-a-quote" className="btn-primary">Ask for a quote</Link>
              </div>
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
