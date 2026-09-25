import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getPackage, getPackages, getCabinetBySku } from "@/lib/catalog";
import AddPackageButton from "@/components/AddPackageButton";
import { KITCHEN_SALE, discounted, formatMoney } from "@/lib/sale";
import { SaleBadge } from "@/components/SaleBadge";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

export function generateStaticParams() {
  return getPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) return {};
  const desc = `${p.name} — ${p.tagline} Includes ${p.items.length} White Shaker RTA cabinets from $${p.subtotal_cad.toFixed(
    2
  )} CAD. Shipped across Canada.`;
  return {
    title: p.name.slice(0, 60),
    description: desc.slice(0, 160),
    alternates: { canonical: `/kitchen-packages/${p.slug}` },
    openGraph: {
      title: p.name,
      description: desc.slice(0, 160),
      images: [p.hero_image],
    },
    twitter: { card: "summary_large_image", title: p.name, description: desc.slice(0, 160) },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) notFound();
  const sale = discounted(p.subtotal_cad, KITCHEN_SALE.pct);
  const saved = Math.round((p.subtotal_cad - sale) * 100) / 100;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [`${site.url}${p.hero_image}`],
    description: p.tagline,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: sale.toFixed(2),
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
      url: `${site.url}/kitchen-packages/${p.slug}`,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Kitchen Packages", item: `${site.url}/kitchen-packages` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/kitchen-packages/${p.slug}` },
    ],
  };

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav className="text-sm text-ink-soft mb-6">
        <Link href="/kitchen-packages" className="hover:text-accent">Kitchen Packages</Link> / {p.name}
      </nav>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-sand">
          <Image
            src={p.hero_image}
            alt={`${p.name} - complete White Shaker RTA kitchen`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-3">{p.name}</h1>
          <p className="text-ink-soft mb-4">{p.tagline}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div>
              <dt className="font-medium">Layout</dt>
              <dd className="text-ink-soft">{p.layout}</dd>
            </div>
            <div>
              <dt className="font-medium">Best for</dt>
              <dd className="text-ink-soft">{p.bestFor}</dd>
            </div>
          </dl>
          <SaleBadge text={KITCHEN_SALE.badge} size="lg" className="mb-2" />
          <p className="flex flex-wrap items-baseline gap-x-3 mb-1">
            <span className="text-3xl font-bold text-red-700">{p.from_price ? "from " : ""}{formatMoney(sale)} CAD</span>
            <s className="text-lg text-ink-soft">{formatMoney(p.subtotal_cad)}</s>
          </p>
          <p className="text-sm font-semibold text-red-700 mb-2">You save {formatMoney(saved)} ({KITCHEN_SALE.pct}% kitchen sale)</p>
          <p className="text-sm text-ink-soft mb-6">
            Package price for all {p.items.length} cabinet types below. Free delivery within {site.freeDeliveryKm} km of London, Ontario; taxes &amp;
            shipping elsewhere confirmed in your written quote. Add expert assembly (${site.assemblyPerCabinet}/cabinet) in your quote list.
          </p>
          <AddPackageButton pkg={p} />
          <TrustStrip compact className="mt-6" />
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-sand text-left">
                <th className="px-4 py-3 font-medium">Cabinet</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium text-center">Qty</th>
                <th className="px-4 py-3 font-medium text-right">Unit</th>
                <th className="px-4 py-3 font-medium text-right">Line</th>
              </tr>
            </thead>
            <tbody>
              {p.items.map((it) => {
                const cab = getCabinetBySku(it.sku);
                return (
                  <tr key={it.sku} className="border-t border-border">
                    <td className="px-4 py-3">
                      {cab ? (
                        <Link href={`/cabinets/${cab.slug}`} className="hover:text-accent">
                          {it.name}
                        </Link>
                      ) : (
                        it.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{it.sku}</td>
                    <td className="px-4 py-3 text-center">{it.qty}</td>
                    <td className="px-4 py-3 text-right">
                      {it.unit_price_cad !== null ? `$${it.unit_price_cad.toFixed(2)}` : "Quote"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {it.line_total !== null ? `$${it.line_total.toFixed(2)}` : "Quote"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border font-semibold bg-sand">
                <td className="px-4 py-3" colSpan={4}>
                  Regular package price
                </td>
                <td className="px-4 py-3 text-right">
                  <s>{p.from_price ? "from " : ""}{formatMoney(p.subtotal_cad)}</s>
                </td>
              </tr>
              <tr className="border-t border-border font-semibold bg-red-50 text-red-800">
                <td className="px-4 py-3" colSpan={4}>
                  Kitchen sale price ({KITCHEN_SALE.pct}% off)
                </td>
                <td className="px-4 py-3 text-right">
                  {p.from_price ? "from " : ""}{formatMoney(sale)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
