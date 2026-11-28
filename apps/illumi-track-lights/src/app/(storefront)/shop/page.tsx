import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

const DESCRIPTION =
  "Every 12V track lighting part on one page: puck lights, aluminum track, WiFi controllers, power supplies, connectors and screws. Free shipping in Canada.";

export const metadata: Metadata = {
  title: "All 12V Track Lighting Parts & Kits",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: { title: "All 12V Track Lighting Parts & Kits | Illumi Track Lights", description: DESCRIPTION, url: `${SITE_URL}/shop`, images: ["/images/photos/detail-tracks.webp"] },
  twitter: { card: "summary_large_image", title: "All 12V Track Lighting Parts & Kits", description: DESCRIPTION }
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
    const term = q.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(term) || (p.short_description ?? "").toLowerCase().includes(term) || p.slug.includes(term.replace(/\s+/g, "-")));
  }
  if (price) {
    const [lo, hi] = price.split("-").map(Number);
    products = products.filter((p) => {
      const r = priceRange(p);
      return r ? r.min >= (lo || 0) && r.min <= (hi || Infinity) : false;
    });
  }
  const isKit = (slug: string) => slug.startsWith("led-housing-package");
  if (sort === "price-asc") products = [...products].sort((a, b) => (priceRange(a)?.min ?? 0) - (priceRange(b)?.min ?? 0));
  else if (sort === "price-desc") products = [...products].sort((a, b) => (priceRange(b)?.min ?? 0) - (priceRange(a)?.min ?? 0));
  else if (sort === "name") products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  // Featured: kits first in size order, then parts by name.
  else products = [...products].sort((a, b) => Number(isKit(b.slug)) - Number(isKit(a.slug)) || (isKit(a.slug) ? (priceRange(a)?.min ?? 0) - (priceRange(b)?.min ?? 0) : a.name.localeCompare(b.name)));

  const categoryCounts = new Map<string, number>();
  for (const cat of categories) categoryCounts.set(cat.slug, allProducts.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)).length);

  return (
    <div className="shell pb-12">
      <nav aria-label="Breadcrumb" className="py-3 text-[0.8rem] text-[var(--color-muted)]">
        <Link href="/" className="hover:text-[var(--color-accent)] hover:underline">Home</Link>
        <span className="mx-1.5" aria-hidden>›</span>
        <span className="text-[var(--color-text-soft)]">All parts</span>
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <h1 className="font-display h1-fluid">{q ? `Results for “${q}”` : "Every kit and part, on one shelf"}</h1>
          {!q && <p className="mt-2 max-w-2xl text-[var(--color-text-soft)]">All of it is 12V, all of it ships free, and any part works with any other.</p>}
        </div>
        <p className="text-sm text-[var(--color-muted)]">Showing {products.length} of {allProducts.length}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <ShopFilters categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: categoryCounts.get(c.slug) ?? 0 }))} activeCategory={category} activePrice={price} activeSort={sort} activeQ={q} />
        <div>
          {products.length === 0 && (
            <div className="border border-[var(--color-border)] p-10 text-center">
              <p className="font-display text-xl">Nothing matches those filters.</p>
              <Link href="/shop" className="text-link mt-3 inline-flex min-h-[44px] items-center">Clear the filters</Link>
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
