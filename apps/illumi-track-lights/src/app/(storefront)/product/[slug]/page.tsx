import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, primaryImage, getCategories } from "@/lib/catalog";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { Photo } from "@/components/photo";
import { relatedProducts } from "@/lib/related";
import { getKit, kitBom, kitLightCount, kitTrackFeet, kitSaving } from "@/lib/kits";
import { SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  const img = primaryImage(product)?.public_url;
  const url = `${SITE_URL}/product/${product.slug}`;
  return {
    title: (product.meta_title ?? product.name).replace(/\s*\|\s*Illumi Track Lights\s*$/i, ""),
    description: product.meta_description ?? product.short_description ?? undefined,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: product.name, description: product.short_description ?? undefined, images: img ? [img] : [] },
    twitter: { card: "summary_large_image", title: product.name, description: product.short_description ?? undefined }
  };
}

/** Tiny markdown subset renderer for long descriptions (## headings, - bullets, paragraphs, **bold**). */
function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(<ul key={`ul-${out.length}`}>{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>);
      list = [];
    }
  };
  const inline = (s: string) => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>));
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith("### ")) { flush(); out.push(<h3 key={out.length}>{line.slice(4)}</h3>); continue; }
    if (line.startsWith("## ")) { flush(); out.push(<h2 key={out.length}>{line.slice(3)}</h2>); continue; }
    if (line.startsWith("# ")) { flush(); out.push(<h2 key={out.length}>{line.slice(2)}</h2>); continue; }
    if (/^[-•]\s+/.test(line)) { list.push(line.replace(/^[-•]\s+/, "")); continue; }
    flush();
    out.push(<p key={out.length}>{inline(line)}</p>);
  }
  flush();
  return out;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const images = [...product.ecom_product_images].sort((a, b) => a.sort_order - b.sort_order);
  const img = primaryImage(product);
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active);
  const prices = variants.map((v) => Number(v.price_cad));
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const kit = getKit(product.slug);
  const [related, categories] = await Promise.all([relatedProducts(product, 5), getCategories()]);
  const catIds = new Set((product.ecom_product_categories ?? []).map((j) => j.category_id));
  const category = categories.find((c) => catIds.has(c.id)) ?? null;
  const url = `${SITE_URL}/product/${product.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      sku: variants[0]?.sku,
      description: product.short_description ?? undefined,
      image: images.map((i) => i.public_url).filter(Boolean).map((u) => (u!.startsWith("http") ? u : `${SITE_URL}${u}`)),
      brand: { "@type": "Brand", name: "Illumi Track Lights" },
      category: category?.name,
      url,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CAD",
        lowPrice: min,
        highPrice: max,
        offerCount: variants.length,
        availability: "https://schema.org/InStock",
        url,
        shippingDetails: { "@type": "OfferShippingDetails", shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" } }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: kit ? "Kits" : "Shop", item: `${SITE_URL}${kit ? "/diy-kits" : "/shop"}` },
        ...(category && !kit ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/product-category/${category.slug}` }] : []),
        { "@type": "ListItem", position: category && !kit ? 4 : 3, name: product.name, item: url }
      ]
    }
  ];

  return (
    <div className="shell py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={kit ? "/diy-kits" : "/shop"} className="hover:underline">{kit ? "Kits" : "Shop"}</Link>
        {category && !kit && (
          <>
            <span className="mx-1.5">/</span>
            <Link href={`/product-category/${category.slug}`} className="hover:underline">{category.name}</Link>
          </>
        )}
        <span className="mx-1.5">/</span>
        <span className="text-[var(--color-text)]">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            {img?.public_url ? (
              <Image src={img.public_url} alt={img.alt_text || product.name} width={1200} height={1200} className={`aspect-square w-full ${kit ? "object-cover" : "object-contain"}`} priority sizes="(max-width: 1024px) 100vw, 600px" />
            ) : (
              <div className="grid aspect-square place-items-center bg-[var(--color-bg-warm)] text-sm text-[var(--color-muted)]">Photo coming soon</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2 md:grid-cols-6">
              {images.slice(0, 12).map((i) => (
                <div key={i.id} className="aspect-square overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                  {i.public_url && <Image src={i.public_url} alt={i.alt_text || product.name} width={160} height={160} className="h-full w-full object-cover" />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow text-[var(--color-accent-dark)]">{category?.name ?? "Illumi Track Lights"}</p>
          <h1 className="font-display mt-2 text-[2rem] leading-tight md:text-[2.6rem]">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold">{min === max ? formatCad(min, 2) : `${formatCad(min, 2)} – ${formatCad(max, 2)}`}</p>
          {product.short_description && <p className="mt-4 leading-relaxed text-[var(--color-text-soft)]">{product.short_description}</p>}

          {kit && (
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              <li className="rounded-xl bg-[var(--color-bg)] px-3 py-2">{kitLightCount(kit)} RGBW pucks</li>
              <li className="rounded-xl bg-[var(--color-bg)] px-3 py-2">{kitTrackFeet(kit)} ft aluminum track</li>
              <li className="rounded-xl bg-[var(--color-bg)] px-3 py-2">{kit.bom.powerSupply} × 12V power supply</li>
              <li className="rounded-xl bg-[var(--color-bg)] px-3 py-2">Saves about {formatCad(kitSaving(kit), 0)} vs installed</li>
            </ul>
          )}

          <ProductPurchase
            productName={product.name}
            productSlug={product.slug}
            variants={variants.map((v) => {
              const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
              return { id: v.id, name: v.name, price_cad: Number(v.price_cad), on_hand: inv?.on_hand ?? 0, sku: v.sku, attribute_value: v.attribute_value };
            })}
          />

          <ul className="mt-5 grid grid-cols-2 gap-2 text-xs text-[var(--color-text-soft)]">
            {["Free shipping over $500 (Canada)", "30-day returns", "5-year parts warranty", "Ships from London, Ontario"].map((t) => (
              <li key={t} className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {kit && (
        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">In the box</p>
            <h2 className="font-display h3-fluid mt-5">Everything for {kit.feet} feet of roofline.</h2>
            <p className="mt-3 text-[var(--color-text-soft)]">{kit.suits}</p>
            <ul className="mt-6 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
              {kitBom(kit).map(({ component, qty }) => (
                <li key={component.key} className="flex items-center gap-4 px-4 py-3">
                  <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
                    <Image src={component.image} alt={component.name} width={48} height={48} className="size-12 object-contain" />
                  </span>
                  <Link href={`/product/${component.productSlug}`} className="flex-1 text-sm font-medium hover:text-[var(--color-accent-dark)]">{component.name}</Link>
                  <span className="font-mono text-sm text-[var(--color-accent-dark)]">×{qty}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo name="detail-tracks" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="280px" />
            <Photo name="detail-pucks-closeup" ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="280px" />
            <Photo name="soffit-lights-installed" ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="280px" />
            <Photo name="home-blue-app-control" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="280px" />
          </div>
        </section>
      )}

      {product.long_description && (
        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Details</p>
            <h2 className="font-display h3-fluid mt-5">Specifications and notes.</h2>
          </div>
          <article className="prose-clean max-w-none text-[0.98rem] text-[var(--color-text-soft)]">{renderMarkdown(product.long_description)}</article>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Pairs well with</p>
          <h2 className="font-display h3-fluid mt-5">Often bought together</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
