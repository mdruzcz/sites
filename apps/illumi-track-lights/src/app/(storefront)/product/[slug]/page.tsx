import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, primaryImage, getCategories } from "@/lib/catalog";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { KitCoverage } from "@/components/kit-coverage";
import { relatedProducts } from "@/lib/related";
import { getKit, kitBom, kitLightCount, kitTrackFeet } from "@/lib/kits";
import { getArticle } from "@/lib/resources";
import { BRAND, SITE_URL, formatCad } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const clean = (s: string) => s.replace(/\s*\|\s*Illumi Track Lights\s*$/i, "");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  const img = primaryImage(product)?.public_url;
  const url = `${SITE_URL}/product/${product.slug}`;
  const title = clean(product.meta_title ?? product.name);
  const description = product.meta_description ?? product.short_description ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: `${title} | Illumi Track Lights`, description, images: img ? [img] : [] },
    twitter: { card: "summary_large_image", title, description }
  };
}

/** Tiny markdown subset renderer for long descriptions (## headings, - bullets, paragraphs, **bold**). */
function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const inline = (s: string) => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>));
  };
  const flush = () => {
    if (list.length) {
      const items = list;
      out.push(<ul key={`ul-${out.length}`}>{items.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>);
      list = [];
    }
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

/** What one of something costs, for packs and kits. */
function perUnitFor(slug: string, kitFeet: number | null, kitLights: number): { count: number; unit: string; extra?: string } | undefined {
  if (kitFeet) return { count: kitFeet, unit: "a foot", extra: `${kitLights} lights, with the controller, power, connectors and shipping included.` };
  if (slug.includes("lights-10-pack")) return { count: 10, unit: "a light", extra: "Lights only. Track is sold separately." };
  if (slug === "aluminum-track-12v-led-lights-2-pack") return { count: 2, unit: "a 42 in. piece", extra: "Track only. Lights and screws are sold separately." };
  if (slug === "40-white-track") return { count: 40, unit: "a 42 in. piece", extra: "Track only. Lights and screws are sold separately." };
  if (/soffit-screws.*100pk/.test(slug)) return { count: 100, unit: "a screw" };
  return undefined;
}

const GUIDES_BY_SHELF: Record<string, string[]> = {
  kit: ["how-to-install-permanent-soffit-lights", "mounting-track-on-vinyl-aluminum-and-wood-soffits", "gemstone-lights-vs-diy-track-lighting-kits"],
  lights: ["planning-zones-and-segments-for-permanent-lighting", "track-lights-vs-string-lights-permanent-outdoor-lighting", "permanent-lights-canadian-winter"],
  controllers: ["planning-zones-and-segments-for-permanent-lighting", "wiring-layouts-single-run-t-branch-and-multi-zone"],
  connectors: ["what-is-power-injection", "wiring-layouts-single-run-t-branch-and-multi-zone"],
  "power-supplies": ["choosing-led-power-supply-60w-150w-300w", "what-is-power-injection"],
  hardware: ["mounting-track-on-vinyl-aluminum-and-wood-soffits", "how-to-install-permanent-soffit-lights"]
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || product.status !== "active") notFound();

  const images = [...product.ecom_product_images].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order).filter((i) => !!i.public_url && !/^https?:\/\/[^/]*illumitracklights\.ca/.test(i.public_url));
  const variants = (product.ecom_variants ?? []).filter((v) => v.is_active);
  const prices = variants.map((v) => Number(v.price_cad));
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const kit = getKit(product.slug);
  const [related, categories] = await Promise.all([relatedProducts(product, 7), getCategories()]);
  const catIds = new Set((product.ecom_product_categories ?? []).map((j) => j.category_id));
  const category = categories.find((c) => catIds.has(c.id) && c.slug !== "diy-kits") ?? null;
  const url = `${SITE_URL}/product/${product.slug}`;
  const inStock = variants.some((v) => {
    const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
    return (inv?.on_hand ?? 0) > 0;
  });
  const pairs = related.slice(0, 3);
  const more = related.slice(3, 7);
  const guides = (GUIDES_BY_SHELF[kit ? "kit" : category?.slug ?? ""] ?? []).map((s) => getArticle(s)).filter((a): a is NonNullable<ReturnType<typeof getArticle>> => !!a);
  const perUnit = perUnitFor(product.slug, kit?.feet ?? null, kit ? kitLightCount(kit) : 0);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      sku: variants[0]?.sku,
      description: product.short_description ?? undefined,
      image: images.map((i) => (i.public_url!.startsWith("http") ? i.public_url : `${SITE_URL}${i.public_url}`)),
      brand: { "@type": "Brand", name: BRAND.name },
      category: kit ? "Track lighting kits" : category?.name,
      url,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CAD",
        lowPrice: min,
        highPrice: max,
        offerCount: variants.length,
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url,
        seller: { "@id": `${SITE_URL}/#organization` },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "CAD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 8, unitCode: "DAY" }
          }
        },
        hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "CA", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 30, returnMethod: "https://schema.org/ReturnByMail", returnFees: "https://schema.org/ReturnShippingFees" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: kit ? "Track lighting kits" : "All parts", item: `${SITE_URL}${kit ? "/diy-kits" : "/shop"}` },
        ...(category && !kit ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/product-category/${category.slug}` }] : []),
        { "@type": "ListItem", position: category && !kit ? 4 : 3, name: product.name, item: url }
      ]
    }
  ];

  const crumb = "transition hover:text-[var(--color-accent)] hover:underline";
  const summary = "flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[0.8rem] font-bold uppercase tracking-[0.13em] text-[var(--color-ink)]";

  return (
    <div className="shell pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="py-3 text-[0.8rem] text-[var(--color-muted)]">
        <Link href="/" className={crumb}>Home</Link>
        <span className="mx-1.5" aria-hidden>›</span>
        <Link href={kit ? "/diy-kits" : "/shop"} className={crumb}>{kit ? "Track lighting kits" : "All parts"}</Link>
        {category && !kit && (
          <>
            <span className="mx-1.5" aria-hidden>›</span>
            <Link href={`/product-category/${category.slug}`} className={crumb}>{category.name}</Link>
          </>
        )}
        <span className="mx-1.5" aria-hidden>›</span>
        <span className="text-[var(--color-text-soft)]">{product.name}</span>
      </nav>

      <div className="mt-3 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <ProductGallery cover={!!kit} images={images.map((i) => ({ id: i.id, url: i.public_url!, alt: i.alt_text || `${product.name} from Illumi Track Lights` }))} />

        <div>
          <h1 className="font-display text-[1.75rem] leading-tight md:text-[2.1rem]">{product.name}</h1>
          {product.short_description && <p className="mt-3 leading-relaxed text-[var(--color-text-soft)]">{product.short_description}</p>}

          <ProductPurchase
            productName={product.name}
            perUnit={perUnit}
            variants={variants.map((v) => {
              const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
              return { id: v.id, name: v.name, price_cad: Number(v.price_cad), on_hand: inv?.on_hand ?? 0, sku: v.sku, attribute_value: v.attribute_value };
            })}
          />

          {pairs.length > 0 && (
            <section className="mt-8">
              <h2 className="eyebrow text-[var(--color-ink)]">{kit ? "Often added to a kit" : "Pairs well with"}</h2>
              <ul className="mt-2 border-t border-[var(--color-border)]">
                {pairs.map((p) => {
                  const pi = primaryImage(p);
                  const pv = (p.ecom_variants ?? []).filter((v) => v.is_active).map((v) => Number(v.price_cad));
                  return (
                    <li key={p.id} className="border-b border-[var(--color-border)]">
                      <Link href={`/product/${p.slug}`} className="group flex items-center gap-4 py-3">
                        <span className="grid size-16 shrink-0 place-items-center overflow-hidden border border-[var(--color-border)] bg-white">
                          {pi?.public_url && <Image src={pi.public_url} alt="" width={64} height={64} className="size-16 object-contain" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.95rem] leading-snug text-[var(--color-ink)] group-hover:underline">{p.name}</span>
                          {pv.length > 0 && <span className="price mt-0.5 block text-sm">{formatCad(Math.min(...pv), 2)}</span>}
                        </span>
                        <span className="hidden text-[0.8rem] font-semibold text-[var(--color-accent)] sm:block">View details</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-6 border-t border-[var(--color-border-strong)]">
            <details className="group border-b border-[var(--color-border-strong)]">
              <summary className={summary}>Shipping &amp; pickup<span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span></summary>
              <div className="space-y-2 pb-5 text-[0.95rem] text-[var(--color-text-soft)]">
                <p>Ships free to any address in Canada. We pack orders within one to two business days and email the tracking number.</p>
                <p>Or choose pickup at checkout and collect it at {BRAND.address} once we email that it is ready. <Link href="/shipping-returns" className="text-link">Shipping and pickup details</Link></p>
              </div>
            </details>
            <details className="group border-b border-[var(--color-border-strong)]">
              <summary className={summary}>Warranty &amp; returns<span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span></summary>
              <div className="space-y-2 pb-5 text-[0.95rem] text-[var(--color-text-soft)]">
                <p>Five-year warranty on parts. Unused items in their original packaging can be returned within 30 days.</p>
                <p><Link href="/warranty" className="text-link">Read the warranty</Link></p>
              </div>
            </details>
            {guides.length > 0 && (
              <details className="group border-b border-[var(--color-border-strong)]">
                <summary className={summary}>Guides for this {kit ? "kit" : "part"}<span aria-hidden className="text-xl leading-none text-[var(--color-muted)] transition group-open:rotate-45">+</span></summary>
                <ul className="pb-4 text-[0.95rem]">
                  {guides.map((g) => (
                    <li key={g.slug}><Link href={`/resources/${g.slug}`} className="text-link inline-flex min-h-[40px] items-center font-normal">{g.title}</Link></li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      </div>

      {kit && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-10">
          <h2 className="font-display h2-fluid track-title">Everything in the {kit.feet} ft kit</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <div className="border border-[var(--color-border)]">
                <table className="table-clean">
                  <thead>
                    <tr><th scope="col">Part</th><th scope="col" className="text-right">In the box</th></tr>
                  </thead>
                  <tbody>
                    {kitBom(kit).map(({ component, qty }) => (
                      <tr key={component.key}>
                        <th scope="row" className="font-normal">
                          <Link href={`/product/${component.productSlug}`} className="flex items-center gap-3 text-[var(--color-ink)] hover:underline">
                            <Image src={component.image} alt="" width={40} height={40} className="size-10 shrink-0 border border-[var(--color-border)] bg-white object-contain" />
                            {component.name}
                          </Link>
                        </th>
                        <td className="text-right align-middle font-semibold">{qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {kitLightCount(kit)} lights and {kitTrackFeet(kit)} ft of track in all. Track comes in 42-inch pieces, so you get a little more than the kit&rsquo;s nominal length. Track and screws arrive in the colour you choose.
              </p>
            </div>
            <KitCoverage footage={kit.feet} />
          </div>
        </section>
      )}

      {product.long_description && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-10">
          <div className="mx-auto max-w-[70ch]">
            <h2 className="font-display h2-fluid">{kit ? "About this kit" : "About this part"}</h2>
            <article className="prose-clean mt-4 text-[1rem] text-[var(--color-text-soft)]">{renderMarkdown(product.long_description)}</article>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-10">
          <h2 className="font-display h3-fluid track-title">More from the shelf</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4">
            {more.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
