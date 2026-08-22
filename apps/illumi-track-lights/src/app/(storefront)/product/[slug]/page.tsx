import { notFound } from "next/navigation";
import Image from "next/image";
import { RichText } from "@/components/rich-text";
import { productPhoto, PRODUCT_PLACEHOLDER } from "@/lib/product-photos";
import Link from "next/link";
import { getProduct, listProducts, type CatalogProduct } from "@/lib/catalog";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.meta_title ?? product.name,
    description: product.meta_description ?? product.short_description ?? undefined,
    alternates: { canonical: `${SITE_URL}/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.short_description ?? undefined,
      images: [productPhoto(product.slug)?.src ?? PRODUCT_PLACEHOLDER]
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // Catalog rows still hold dead wp-content URLs; use the recovered local photo.
  const photo = productPhoto(product.slug);
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active);
  const prices = variants.map((v) => Number(v.price_cad));
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;

  // "Often bought with" rail — naive: 4 other products from the same store
  const others = (await listProducts({ limit: 8 })).filter((p) => p.id !== product.id).slice(0, 4) as CatalogProduct[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description ?? product.long_description ?? undefined,
    image: [productPhoto(product.slug)?.src ?? PRODUCT_PLACEHOLDER],
    brand: { "@type": "Brand", name: "Illumi Track Lights" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: min,
      highPrice: max,
      offerCount: variants.length,
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-xs text-slate-500">
        <Link href="/shop" className="hover:underline">Shop</Link>
        <span className="mx-1">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            <Image
              src={photo?.src ?? PRODUCT_PLACEHOLDER}
              alt={photo?.alt ?? product.name}
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="aspect-square w-full object-contain p-6"
              priority
            />
          </div>
        </div>

        <div>
          <p className="eyebrow text-[var(--color-brand)]">Illumi Track Lights</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold text-[var(--color-brand)]">
            {min === max ? formatCad(min) : `${formatCad(min)} – ${formatCad(max)}`}
          </p>
          {product.short_description && (
            <p className="mt-4 text-base leading-relaxed text-slate-600">{product.short_description}</p>
          )}

          <ProductPurchase
            productName={product.name}
            productSlug={product.slug}
            variants={variants.map((v) => {
              const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
              return {
                id: v.id,
                name: v.name,
                price_cad: Number(v.price_cad),
                on_hand: inv?.on_hand ?? 0,
                sku: v.sku
              };
            })}
          />

          {/* Trust badges */}
          <ul className="mt-6 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <li className="flex items-center gap-2 rounded-md bg-white border border-[var(--color-border)] px-3 py-2">
              🚚 Free over $500 (Canada)
            </li>
            <li className="flex items-center gap-2 rounded-md bg-white border border-[var(--color-border)] px-3 py-2">
              ↩️ 30-day returns
            </li>
            <li className="flex items-center gap-2 rounded-md bg-white border border-[var(--color-border)] px-3 py-2">
              🛡️ 5-year warranty
            </li>
            <li className="flex items-center gap-2 rounded-md bg-white border border-[var(--color-border)] px-3 py-2">
              🍁 Ships from London, ON
            </li>
          </ul>

          {product.long_description && (
            <article className="mt-12 max-w-none border-t border-[var(--color-border)] pt-10 text-[0.9375rem]">
              <RichText text={product.long_description} />
            </article>
          )}
        </div>
      </div>

      {/* Often bought together */}
      {others.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow text-[var(--color-brand)]">Pairs well with</p>
          <h2 className="font-display mt-2 text-2xl md:text-3xl">Often bought together</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
