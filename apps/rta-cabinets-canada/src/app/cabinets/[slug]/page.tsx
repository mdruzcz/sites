import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  getCabinet,
  getCabinets,
  getCabinetsByGroup,
  groupLabel,
} from "@/lib/catalog";
import AddToQuoteButton from "@/components/AddToQuoteButton";
import CabinetCard, { StockLine } from "@/components/CabinetCard";
import { getInventoryMap, stockKey } from "@/lib/inventory";
import CabinetGallery from "@/components/CabinetGallery";
import { pricingFor } from "@/lib/sale";
import { PriceTag, SaleBadge } from "@/components/SaleBadge";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 300;

export function generateStaticParams() {
  return getCabinets().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCabinet(slug);
  if (!c) return {};
  const price = c.price_cad !== null ? `$${c.price_cad.toFixed(2)} CAD` : "Request a quote";
  const desc =
    c.description ||
    `${c.name} — premium White Shaker ready-to-assemble cabinet (SKU ${c.sku}, ${price}). Shipped across Canada.`;
  const ogTitle = `${c.name} (${c.sku})`;
  return {
    title: c.name,
    description: desc.slice(0, 160),
    alternates: { canonical: `/cabinets/${c.slug}` },
    openGraph: {
      title: ogTitle,
      description: desc.slice(0, 160),
      images: c.images[0] ? [c.images[0]] : undefined,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc.slice(0, 160) },
  };
}

export default async function CabinetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCabinet(slug);
  if (!c) notFound();
  const img = c.images[0] ?? "/images/placeholder.svg";
  const related = getCabinetsByGroup(c.group)
    .filter((r) => r.slug !== c.slug)
    .slice(0, 4);
  const inventory = await getInventoryMap();
  const stock = inventory[stockKey(c.sku)];
  const comingSoon = !!c.coming_soon;
  const pricing = pricingFor(c.sku, c.price_cad, { comingSoon });
  const availability = comingSoon
    ? "https://schema.org/PreOrder"
    : stock && !stock.in_stock
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    sku: c.sku,
    image: c.images.map((i) => `${site.url}${i}`),
    description: c.description || `${c.name} — White Shaker RTA cabinet.`,
    brand: { "@type": "Brand", name: site.name },
    category: c.group_label,
    ...(c.price_cad !== null
      ? {
          offers: {
            "@type": "Offer",
            price: (pricing?.price ?? c.price_cad).toFixed(2),
            priceCurrency: "CAD",
            availability,
            ...(pricing?.onSale ? { priceValidUntil: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10) } : {}),
            url: `${site.url}/cabinets/${c.slug}`,
          },
        }
      : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: c.group_label,
        item: `${site.url}/shop/${c.group}`,
      },
      { "@type": "ListItem", position: 4, name: c.name, item: `${site.url}/cabinets/${c.slug}` },
    ],
  };

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav className="text-sm text-ink-soft mb-6">
        <Link href="/shop" className="hover:text-accent">Shop</Link> /{" "}
        <Link href={`/shop/${c.group}`} className="hover:text-accent">{c.group_label}</Link> /{" "}
        {c.name}
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <CabinetGallery images={c.images} name={c.name} />

        <div>
          <p className="text-sm text-accent font-medium mb-1">{c.group_label}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{c.name}</h1>
          <p className="text-sm text-ink-soft mb-4">SKU: {c.sku}</p>
          {pricing?.onSale && <SaleBadge text={pricing.label ?? "Sale"} size="lg" className="mb-2" />}
          <PriceTag pricing={pricing} size="lg" suffix=" CAD" fallback={comingSoon ? "Coming soon" : "Request a quote"} className="mb-2 text-accent" />
          {pricing?.onSale && (
            <p className="mb-2 text-sm text-ink-soft">Overstock pricing — we have plenty on the shelf, so this one ships right away. Design a whole kitchen in the planner for at least 8% off everything.</p>
          )}
          <StockLine stock={stock} comingSoon={comingSoon} className="mb-6 text-sm" />
          {c.description && <p className="text-ink-soft mb-6">{c.description}</p>}

          {c.width_in !== null && (
            <table className="w-full text-sm mb-6 border border-border rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b border-border">
                  <th className="text-left bg-sand px-3 py-2 font-medium w-32">Width</th>
                  <td className="px-3 py-2">{c.width_in}&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-left bg-sand px-3 py-2 font-medium">Height</th>
                  <td className="px-3 py-2">{c.height_in != null ? `${c.height_in}"` : '34.5" (base) / 36" (wall)'}</td>
                </tr>
                <tr>
                  <th className="text-left bg-sand px-3 py-2 font-medium">Depth</th>
                  <td className="px-3 py-2">{c.depth_in != null ? `${c.depth_in}"` : '24" (base) / 12" (wall)'}</td>
                </tr>
              </tbody>
            </table>
          )}

          {comingSoon ? (
            <div className="rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm">
              <p className="font-semibold text-ink">Part of our new 30&Prime;-tall wall cabinet line — arriving soon.</p>
              <p className="mt-1 text-ink-soft">
                You can already place it in the{" "}
                <Link href="/planner" className="text-accent font-medium underline">Kitchen Planner</Link> to design around it. Email{" "}
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(`ETA for ${c.sku}`)}`} className="text-accent font-medium underline">
                  {site.email}
                </a>{" "}
                for timing and pricing.
              </p>
            </div>
          ) : (
            <>
              {stock && !stock.in_stock && (
                <p className="mb-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  This cabinet is out of stock right now. You can still add it to your quote — we&rsquo;ll confirm the restock date before anything is charged.
                </p>
              )}
              <AddToQuoteButton
                slug={c.slug}
                name={c.name}
                price_cad={pricing ? pricing.price : c.price_cad}
                list_price_cad={pricing?.onSale ? pricing.list : null}
                sale_label={pricing?.label ?? null}
                image={img}
                kind="cabinet"
                className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-md font-medium min-h-[48px]"
                label={stock && !stock.in_stock ? "Add to Quote (backorder)" : c.price_cad !== null ? "Add to Quote" : "Add to Quote (request price)"}
              />
            </>
          )}
          <p className="mt-4 text-sm text-ink-soft">
            Planning a whole kitchen?{" "}
            <Link href="/planner" className="text-accent font-medium underline">Design it in 3D with the Kitchen Planner</Link>.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>• Solid hardwood face frame &amp; doors, plywood box</li>
            <li>• Soft-close doors and drawers</li>
            <li>• Ready to assemble — ships flat-packed, or add expert assembly for ${site.assemblyPerCabinet}/cabinet in your quote</li>
            <li>• Free delivery within {site.freeDeliveryKm} km of London, Ontario · shipped across Canada</li>
            <li>• <Link href="/warranty" className="underline">Limited lifetime warranty</Link> · <Link href="/lowest-price-guarantee" className="underline">lowest price guarantee</Link> · <Link href="/financing" className="underline">0% APR financing</Link></li>
          </ul>
          <TrustStrip compact className="mt-6" />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More {c.group_label}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((r) => (
              <CabinetCard key={r.slug} cabinet={r} stock={inventory[stockKey(r.sku)]} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
