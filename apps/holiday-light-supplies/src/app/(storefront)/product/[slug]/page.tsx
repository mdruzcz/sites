import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, getCategories, primaryImage, priceRange, productCategorySlugs, relatedProducts } from "@/lib/catalog";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { RichText } from "@/components/rich-text";
import { Breadcrumbs, breadcrumbLd, FaqList, faqLd } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { SITE_URL, absoluteUrl } from "@/lib/utils";
import { FREE_SHIPPING_OVER } from "@/lib/site";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  const img = primaryImage(product);
  const title = (product.meta_title ?? product.name).replace(/\s*\|\s*Holiday Light Supplies\s*$/i, "");
  const description =
    product.meta_description && !/quantity$/i.test(product.meta_description)
      ? product.meta_description
      : `${product.name} — commercial-grade Christmas lighting from Holiday Light Supplies. Shipped from Ontario across Canada; volume pricing for installers, BIAs, malls and municipalities.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/product/${product.slug}` },
    openGraph: {
      title: `${title} | Holiday Light Supplies`,
      description,
      url: `${SITE_URL}/product/${product.slug}`,
      type: "website",
      images: img?.public_url ? [{ url: absoluteUrl(img.public_url), alt: img.alt_text }] : undefined
    },
    twitter: { card: "summary_large_image", title: `${title} | Holiday Light Supplies`, description }
  };
}

const PRODUCT_FAQ = (quoteOnly: boolean) => [
  {
    q: "How do I get pricing and shipping?",
    a: quoteOnly
      ? "Add the display to your quote list and submit it with your delivery address. We reply within one business day with the piece price, freight, lead time and any multi-piece or public-sector pricing."
      : "Add it to your quote list and submit with your delivery address. We email a line-item quote with shipping and timeline within one business day. Nothing is charged until you approve."
  },
  {
    q: "Is there volume pricing?",
    a: "Yes. Case quantities, installer accounts and municipal, BIA and property-management orders get volume pricing on the quote. Tell us the quantity and we price it accordingly."
  },
  {
    q: "Where does it ship from?",
    a: `Our warehouse in London, Ontario. Courier orders over $${FREE_SHIPPING_OVER} ship free; displays and trees ship freight and are quoted per order.`
  }
];

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([getCategories(), relatedProducts(product, 4)]);
  const catSlugs = productCategorySlugs(product, categories);
  const primaryCat = categories.find((c) => catSlugs.includes(c.slug) && c.slug !== "new-products") ?? categories.find((c) => catSlugs.includes(c.slug));
  const catTitle = primaryCat ? CATEGORY_META[primaryCat.slug]?.title ?? primaryCat.name : "Shop";

  const img = primaryImage(product);
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active);
  const range = priceRange(product);
  const quoteOnly = !!range?.quoteOnly;
  const faq = PRODUCT_FAQ(quoteOnly);
  const url = `${SITE_URL}/product/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description && !/quantity$/i.test(product.short_description) ? product.short_description : product.long_description?.slice(0, 300) ?? undefined,
    image: product.ecom_product_images.filter((i) => i.public_url).map((i) => absoluteUrl(i.public_url!)),
    sku: variants[0]?.sku,
    brand: { "@type": "Brand", name: "Holiday Light Supplies" },
    category: catTitle,
    url,
    offers: quoteOnly
      ? { "@type": "Offer", url, priceCurrency: "CAD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "CAD", description: "Quoted per project" } }
      : {
          "@type": "AggregateOffer",
          url,
          priceCurrency: "CAD",
          lowPrice: range?.min.toFixed(2),
          highPrice: range?.max.toFixed(2),
          offerCount: variants.length,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Holiday Light Supplies" }
        }
  };

  const crumbs = [
    { href: "/shop", label: "Shop" },
    ...(primaryCat ? [{ href: `/product-category/${primaryCat.slug}`, label: catTitle }] : []),
    { label: product.name }
  ];

  const shortDesc = product.short_description && !/quantity$/i.test(product.short_description) ? product.short_description : null;

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faq)) }} />

      <div className="shell py-6 md:py-10">
        <Breadcrumbs items={crumbs} />

        <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <ProductGallery images={product.ecom_product_images} name={product.name} />

          <div className="min-w-0">
            {primaryCat && (
              <Link href={`/product-category/${primaryCat.slug}`} className="eyebrow text-[var(--color-accent)] hover:underline">
                {catTitle}
              </Link>
            )}
            <h1 className="font-display mt-2 text-3xl leading-tight md:text-[2.6rem]">{product.name}</h1>
            {shortDesc && <p className="mt-4 text-[1.05rem] leading-relaxed text-[var(--color-text-soft)]">{shortDesc}</p>}

            <ProductPurchase
              productName={product.name}
              productSlug={product.slug}
              quoteOnly={quoteOnly}
              variants={variants.map((v) => {
                const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
                return {
                  id: v.id,
                  name: v.name,
                  price_cad: Number(v.price_cad),
                  compare_at_price_cad: v.compare_at_price_cad ? Number(v.compare_at_price_cad) : null,
                  on_hand: inv?.on_hand ?? 0,
                  sku: v.sku,
                  attribute_type: v.attribute_type,
                  attribute_value: v.attribute_value
                };
              })}
            />

            <ul className="mt-6 grid grid-cols-2 gap-2 text-xs text-[var(--color-text-soft)]">
              {[
                { icon: Icon.truck, text: `Free courier shipping over $${FREE_SHIPPING_OVER}` },
                { icon: Icon.shield, text: "5-year warranty on LED product" },
                { icon: Icon.tag, text: "Volume pricing on case orders" },
                { icon: Icon.invoice, text: "Net-30 for municipalities & BIAs" }
              ].map((b) => (
                <li key={b.text} className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5">
                  <b.icon size={16} className="shrink-0 text-[var(--color-brand)]" /> {b.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description + FAQ */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">About this product</h2>
            {product.long_description ? (
              <RichText text={product.long_description} className="mt-2" />
            ) : (
              <p className="mt-4 leading-relaxed text-[var(--color-text-soft)]">
                {product.name} is part of our commercial-grade catalog, stocked in London, Ontario and shipped across Canada. Ask us for a spec sheet or lead time on your quote.
              </p>
            )}
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Ordering</h2>
            <div className="mt-5">
              <FaqList items={faq} />
            </div>
            <div className="mt-6 rounded-2xl bg-[var(--color-night)] p-6 text-white">
              <p className="eyebrow text-[var(--color-gold-bright)]">Lighting a whole site?</p>
              <p className="font-display mt-2 text-xl leading-snug">Send us the pole count, tree list or site plan and we&rsquo;ll build the order for you.</p>
              <Link href="/request-a-quote" className="btn-gold mt-5">
                Request a commercial quote <Icon.arrow size={16} />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Pairs well with</p>
            <h2 className="font-display mt-3 text-2xl md:text-3xl">Often ordered together</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
