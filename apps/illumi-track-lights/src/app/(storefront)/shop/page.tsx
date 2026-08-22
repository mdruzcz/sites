import Link from "next/link";
import { SITE_URL } from "@/lib/utils";
import { Photo } from "@/components/photo";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getCategories, listProducts, priceRange } from "@/lib/catalog";

export const revalidate = 3600;

export const metadata = {
  title: "Shop All LED Soffit Track Lighting Parts & Kits",
  description:
    "Browse every aluminum track, RGBW puck, controller, power supply and connector. Installer-grade gear, bulk priced, shipped from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: "Shop All LED Soffit Track Lighting Parts & Kits",
    description:
      "Browse every aluminum track, RGBW puck, controller, power supply and connector. Installer-grade gear, bulk priced, shipped from London, Ontario.",
    url: `${SITE_URL}/shop`
  }
};

interface PageProps {
  searchParams: Promise<{ category?: string; price?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const { category, price, sort } = await searchParams;
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

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div>
      {/* Banner photo with a scrim so the heading always reads */}
      <section className="relative isolate">
        <Photo
          name="home-wide"
          alt="Long home elevation lit end to end with permanent LED soffit track lighting"
          ratio="aspect-[16/7] md:aspect-[21/6]"
          sizes="100vw"
          priority
          scrim="strong"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="shell pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="text-xs text-white/70">
              <Link href="/" className="hover:text-white hover:underline">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-white">Shop</span>
            </nav>
            <h1 className="font-display mt-3 text-[2.1rem] text-white md:text-5xl">
              {activeCategory ? activeCategory.name : "Shop the catalog"}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
              Tracks, pucks, controllers, power supplies and cable &mdash; shipped from London, Ontario.
            </p>
          </div>
        </div>
      </section>

      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[268px_1fr] lg:gap-14">
        <ShopFilters
          categories={categories.map((c) => ({
            slug: c.slug,
            name: c.name,
            count: categoryCounts.get(c.slug) ?? 0
          }))}
          activeCategory={category}
          activePrice={price}
          activeSort={sort}
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
          <p className="mb-6 text-sm text-[var(--color-muted)]">Showing {products.length} of {allProducts.length} products</p>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
