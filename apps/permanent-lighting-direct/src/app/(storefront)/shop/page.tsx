import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop 12V Permanent Lighting Parts & Kits",
  description:
    "Every 12V permanent lighting part in one place: RGBW puck lights, aluminum soffit track, WiFi controllers, power supplies, connectors and colour-matched screws. Ships from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/shop` }
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
  if (sort === "price-asc") products = [...products].sort((a, b) => (priceRange(a)?.min ?? 0) - (priceRange(b)?.min ?? 0));
  else if (sort === "price-desc") products = [...products].sort((a, b) => (priceRange(b)?.min ?? 0) - (priceRange(a)?.min ?? 0));
  else if (sort === "name") products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  else products = [...products].sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));

  const categoryCounts = new Map<string, number>();
  for (const cat of categories) categoryCounts.set(cat.slug, allProducts.filter((p) => (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)).length);

  return (
    <div className="shell py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-[var(--color-text)]">Shop</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-[var(--color-accent-dark)]">Catalogue</p>
          <h1 className="font-display h1-fluid mt-2">{q ? `Results for “${q}”` : "Shop all 12V parts and kits"}</h1>
        </div>
        <p className="text-sm text-[var(--color-muted)]">{products.length} of {allProducts.length} products</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        <ShopFilters categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: categoryCounts.get(c.slug) ?? 0 }))} activeCategory={category} activePrice={price} activeSort={sort} activeQ={q} />
        <div>
          {products.length === 0 && (
            <div className="card p-10 text-center">
              <p className="font-display text-lg">No products match those filters.</p>
              <Link href="/shop" className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">Clear filters →</Link>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
