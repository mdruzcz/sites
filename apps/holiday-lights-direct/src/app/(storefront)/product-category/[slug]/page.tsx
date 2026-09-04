import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { PageHero } from "@/components/page-hero";
import { getCategories, listProducts } from "@/lib/catalog";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

/** Category slug → lifestyle photo used for the page header. */
const CATEGORY_PHOTOS: Record<string, PhotoKey> = {
  "permanent-lights": "track-night-glow",
  "permanent-lighting-kits": "home-nighttime-lit",
  "aluminum-tracks": "track-daytime-discreet",
  "led-puck-lights": "detail-led-pucks",
  "christmas-light-bulbs": "home-christmas-warm-white",
  "mini-light-strands": "home-cottage-evening",
  "light-attachment-clips": "detail-track-mounting",
  "wires-plugs": "track-residential",
  "led-connectors": "track-daytime-discreet",
  "power-injection-cables": "home-side-elevation",
  "decor-other-lights": "home-rainbow"
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };

  const description =
    cat.description ??
    `Shop ${cat.name} from Holiday Lights Direct — installer-grade lighting hardware, bulk priced and shipped from London, Ontario. Free Canadian shipping over $500.`;

  return {
    title: `${cat.name} — Installer-Grade Lighting Supplies`,
    description,
    alternates: { canonical: `${SITE_URL}/product-category/${cat.slug}` },
    openGraph: {
      title: `${cat.name} — Installer-Grade Lighting Supplies`,
      description,
      url: `${SITE_URL}/product-category/${cat.slug}`
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await listProducts({ categorySlug: slug });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.name,
        item: `${SITE_URL}/product-category/${cat.slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo={CATEGORY_PHOTOS[cat.slug] ?? "home-nighttime-lit"}
        photoAlt={`${cat.name} from Holiday Lights Direct, shipped from London, Ontario`}
        eyebrow="Catalog"
        title={cat.name}
        intro={cat.description ?? undefined}
        crumb={cat.name}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-muted)]">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <Link href="/shop" className="text-sm font-semibold text-[var(--color-gold-text)] hover:underline">
              Browse all categories →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-12 text-center">
              <p className="font-display text-xl">Nothing in this category yet.</p>
              <Link href="/shop" className="btn-secondary mt-6">
                Back to the shop
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
