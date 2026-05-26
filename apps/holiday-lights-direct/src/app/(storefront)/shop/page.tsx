import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";

export const revalidate = 3600;

export const metadata = {
  title: "Shop — All products",
  description:
    "Browse every C9 LED bulb, mini-light strand, clip, wire, and permanent LED housing package. Bulk-priced for installers. Shipped from London, Ontario."
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
    if (cat) {
      products = products.filter((p) =>
        (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)
      );
    }
  }

  if (q) {
    const term = q.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(term));
  }

  if (price) {
    const [lo, hi] = price.split("-").map(Number);
    products = products.filter((p) => {
      const r = priceRange(p);
      if (!r) return false;
      return r.min >= (lo || 0) && r.min <= (hi || Infinity);
    });
  }

  if (sort === "price-asc") {
    products = [...products].sort((a, b) => (priceRange(a)?.min ?? 0) - (priceRange(b)?.min ?? 0));
  } else if (sort === "price-desc") {
    products = [...products].sort((a, b) => (priceRange(b)?.min ?? 0) - (priceRange(a)?.min ?? 0));
  } else if (sort === "name") {
    products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  }

  const categoryCounts = new Map<string, number>();
  for (const cat of categories) {
    const count = allProducts.filter((p) =>
      (p.ecom_product_categories ?? []).some((j) => j.category_id === cat.id)
    ).length;
    categoryCounts.set(cat.slug, count);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <span>Shop</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">Shop the catalog</h1>
        <p className="text-sm text-slate-500">
          {products.length} of {allProducts.length} products
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <ShopFilters
          categories={categories.map((c) => ({
            slug: c.slug,
            name: c.name,
            count: categoryCounts.get(c.slug) ?? 0
          }))}
          activeCategory={category}
          activePrice={price}
          activeSort={sort}
          activeQ={q}
        />

        <div>
          {products.length === 0 && (
            <div className="rounded-lg border border-[var(--color-border)] bg-white p-10 text-center">
              <p className="font-display text-lg">No products match those filters.</p>
              <Link href="/shop" className="mt-3 inline-block text-sm text-[var(--color-brand)] hover:underline">
                Clear filters →
              </Link>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
