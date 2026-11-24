import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { getProduct, primaryImage } from "@/lib/catalog";
import { relatedProducts } from "@/lib/related";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { KitCoverage } from "@/components/kit-coverage";
import { SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}


/**
 * Catalog copy is often a single short line. Meta descriptions under roughly 110
 * characters get truncated or rewritten by Google, so top them up with the
 * shipping and stock facts every product on this store shares.
 */
function metaDescription(base: string | null | undefined, name: string): string {
  const lead = (base ?? `${name} from Holiday Lights Direct.`).trim().replace(/\s+/g, " ");
  const tail = " Installer-grade, in stock and shipped from London, Ontario. Free Canadian shipping over $500.";
  if (lead.length >= 110) return lead.slice(0, 165);
  return (lead.endsWith(".") ? lead + tail : lead + "." + tail).slice(0, 165);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    // Titles run through the layout template (" | Holiday Lights Direct", 24
    // chars), so keep the page half short enough that the pair fits in a SERP.
    title: (product.meta_title ?? product.name).slice(0, 36).trim(),
    description: metaDescription(product.meta_description ?? product.short_description, product.name),
    alternates: { canonical: `${SITE_URL}/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.short_description ?? undefined,
      images: primaryImage(product)?.public_url ? [primaryImage(product)!.public_url!] : []
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const img = primaryImage(product);
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active);
  const prices = variants.map((v) => Number(v.price_cad));
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;

  // "Often bought together": rule-based companions (C9 bulbs pair with the
  // socket spool, male/female plugs, SPT-2 wire and clips), filled from the
  // same category when a rule leaves gaps.
  const others = await relatedProducts(product, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description ?? product.long_description ?? undefined,
    image: img?.public_url ? [img.public_url] : undefined,
    brand: { "@type": "Brand", name: "Holiday Lights Direct" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: min,
      highPrice: max,
      offerCount: variants.length,
      availability: "https://schema.org/InStock"
    }
  };

  // Kits are photographed installed on a house rather than cut out on white.
  const lifestyle = /\/permanent-led-|\/permanent-lighting-kit-|\/professional-permanent-/.test(img?.public_url ?? "");
  const kitFeet = Number(/^led-housing-package-(\d+)/.exec(product.slug)?.[1] ?? 0);

  return (
    <div className="shell py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="crumbs-plain">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/shop">Shop</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <div className="surface overflow-hidden">
            <Image
              src={img?.public_url || "/images/products/placeholder.webp"}
              alt={img?.alt_text || product.name}
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 560px"
              className={`aspect-square w-full ${lifestyle ? "object-cover" : "object-contain p-6"}`}
              priority
            />
          </div>
          {product.ecom_product_images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2.5">
              {product.ecom_product_images.slice(0, 10).map((i) => (
                <div key={i.id} className="surface aspect-square overflow-hidden rounded-[10px]">
                  <Image
                    src={i.public_url || "/images/products/placeholder.webp"}
                    alt={i.alt_text || product.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow-plain">{kitFeet ? "Permanent lighting kit" : "Holiday Lights Direct"}</p>
          <h1 className="font-display mt-3 text-[2rem] md:text-[2.6rem]">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--color-text)]">
            {min === max ? formatCad(min) : `${formatCad(min)} \u2013 ${formatCad(max)}`}
          </p>
          {product.short_description && (
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">{product.short_description}</p>
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

          <ul className="mt-5 grid grid-cols-2 gap-2.5 text-sm font-semibold text-[var(--color-text)]">
            {TRUST.map((t) => (
              <li key={t.label} className="surface flex items-center gap-2.5 px-3.5 py-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={t.color}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden
                >
                  <path d={t.icon} />
                </svg>
                {t.label}
              </li>
            ))}
          </ul>

          {product.long_description && (
            <article className="mt-10 max-w-none border-t border-[var(--color-border)] pt-8 text-[0.9375rem]">
              <RichText text={product.long_description} />
            </article>
          )}
        </div>
      </div>

      {/* Kits only: the example home this footage covers */}
      {kitFeet > 0 && (
        <section className="mt-16 md:mt-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow-plain">What {kitFeet} ft covers</p>
              <h2 className="section-title mt-3">Picture it on a home.</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                The drawing shows one way a {kitFeet} foot kit lays out, with every lit run measured. Your
                roofline will differ, so add up your own eaves and gables before you choose a size.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/permanent-lights#sizes" className="btn-primary">
                  Compare all six sizes
                </Link>
                <Link href="/resources/how-to-measure-your-roofline-for-lights" className="btn-secondary">
                  How to measure
                </Link>
              </div>
            </div>
            <KitCoverage footage={kitFeet} />
          </div>
        </section>
      )}

      {/* Often bought together */}
      {others.length > 0 && (
        <section className="mt-16 md:mt-24">
          <p className="eyebrow-plain">Pairs well with</p>
          <h2 className="section-title mt-3">Often bought together</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/** Reassurance points under the buy box. Wording matches the live store. */
const TRUST: { label: string; color: string; icon: string }[] = [
  {
    label: "Free over $500 (Canada)",
    color: "var(--color-green)",
    icon: "M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
  },
  {
    label: "30-day returns",
    color: "#3b74c9",
    icon: "M4 9h11a5 5 0 0 1 0 10H8M4 9l4-4M4 9l4 4"
  },
  {
    label: "5-year warranty",
    color: "var(--color-gold)",
    icon: "M12 3 4.5 6v5.5c0 4.4 3 8 7.5 9.5 4.5-1.5 7.5-5.1 7.5-9.5V6L12 3Zm-3.2 9 2.3 2.3 4.3-4.6"
  },
  {
    label: "Ships from London, ON",
    color: "var(--color-red)",
    icon: "M12 21s7-5.6 7-11.5a7 7 0 1 0-14 0C5 15.4 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
  }
];
