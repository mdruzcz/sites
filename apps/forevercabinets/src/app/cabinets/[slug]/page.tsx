import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCabinets,
  getCabinetBySlug,
  getOtherWidthsInSeries,
  getRelatedAccessories,
  TYPE_LABEL,
  TYPE_PATH,
} from "@/lib/catalog";
import { PdpGallery } from "@/components/pdp-gallery";
import { PdpActions } from "@/components/pdp-actions";
import { getStockForSku } from "@/lib/inventory";
import { formatCad, formatDim, SITE } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllCabinets().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCabinetBySlug(slug);
  if (!c) return {};
  const dims = [c.width_in, c.height_in, c.depth_in]
    .filter((v) => v != null)
    .map((v) => formatDim(v!))
    .join(" × ");
  return {
    title: `${c.name} (${c.sku})`,
    description: `${c.name} in White Shaker — ${dims}. ${formatCad(c.price_cad)} CAD. Ships across Canada in ${SITE.leadTime}. Request a quote, no payment required.`,
    alternates: { canonical: `/cabinets/${c.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cabinet = getCabinetBySlug(slug);
  if (!cabinet) notFound();

  const stock = await getStockForSku(cabinet.sku);
  const inStock = stock ? stock.in_stock : true;
  const lowStock = stock?.low_stock ?? false;
  const related = getRelatedAccessories(cabinet, 4);
  const series = getOtherWidthsInSeries(cabinet);
  const isSampleDoor = cabinet.sku === "SAMPLE-DOOR-WS";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cabinet.name,
    sku: cabinet.sku,
    brand: { "@type": "Brand", name: SITE.name },
    description: cabinet.description ?? `${cabinet.name} in White Shaker finish.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: cabinet.price_cad,
      availability: cabinet.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/cabinets/${cabinet.slug}`,
    },
    additionalProperty: [
      cabinet.width_in != null && {
        "@type": "PropertyValue",
        name: "Width",
        value: `${cabinet.width_in} in`,
      },
      cabinet.height_in != null && {
        "@type": "PropertyValue",
        name: "Height",
        value: `${cabinet.height_in} in`,
      },
      cabinet.depth_in != null && {
        "@type": "PropertyValue",
        name: "Depth",
        value: `${cabinet.depth_in} in`,
      },
    ].filter(Boolean),
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href={TYPE_PATH[cabinet.type]} className="hover:text-[var(--color-navy)]">
          {TYPE_LABEL[cabinet.type]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-navy)]">{cabinet.sku}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <PdpGallery cabinet={cabinet} />
          <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
            Painted birch &amp; MDF doors, plywood box, painted white interior. <Link href="/our-cabinets" className="underline">See full construction →</Link>
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
            {cabinet.sku} · {TYPE_LABEL[cabinet.type]}
          </p>
          <h1 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
            {cabinet.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="font-display text-3xl text-[var(--color-navy)]">
              {formatCad(cabinet.price_cad)}
            </p>
            {!inStock ? (
              <span className="inline-flex items-center rounded-sm bg-red-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-red-800">
                Out of stock
              </span>
            ) : lowStock ? (
              <span className="inline-flex items-center rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-amber-800">
                Low stock — {stock?.on_hand} left
              </span>
            ) : (
              <span className="inline-flex items-center rounded-sm bg-green-50 px-2 py-0.5 text-xs font-medium uppercase tracking-widest text-green-800">
                In stock
              </span>
            )}
          </div>
          {cabinet.description && (
            <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)]">
              {cabinet.description}
            </p>
          )}

          <dl className="mt-6 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {cabinet.width_in != null && (
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[var(--color-ink-soft)]">Width</dt>
                <dd className="font-medium">{formatDim(cabinet.width_in)}</dd>
              </div>
            )}
            {cabinet.height_in != null && (
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[var(--color-ink-soft)]">Height</dt>
                <dd className="font-medium">{formatDim(cabinet.height_in)}</dd>
              </div>
            )}
            {cabinet.depth_in != null && (
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[var(--color-ink-soft)]">Depth</dt>
                <dd className="font-medium">{formatDim(cabinet.depth_in)}</dd>
              </div>
            )}
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-[var(--color-ink-soft)]">Finish</dt>
              <dd className="font-medium">White Shaker</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-[var(--color-ink-soft)]">Assembly</dt>
              <dd className="font-medium">Ready to assemble (RTA)</dd>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <dt className="text-[var(--color-ink-soft)]">Lead time</dt>
              <dd className="font-medium">{SITE.leadTime}</dd>
            </div>
          </dl>

          <PdpActions sku={cabinet.sku} />

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[var(--color-ink-soft)] sm:grid-cols-4">
            <div>🚚 Ships Canada-wide</div>
            <div>📦 {SITE.leadTime}</div>
            <div>✓ {SITE.returnsWindow}</div>
            <div>💳 No payment now</div>
          </div>

          {!isSampleDoor && (
            <div className="mt-6 border border-[var(--color-line)] bg-[var(--color-sandstone-soft)] p-4">
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                Not sure it&apos;ll match?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">
                Order a <Link href="/cabinets/sample-door" className="font-medium underline underline-offset-2">White Shaker sample door</Link> for {formatCad(SITE.sampleDoorPrice)}. Refundable on your first order.
              </p>
            </div>
          )}
        </div>
      </div>

      {series.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">
            Other widths in this series
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {series.map((s) => (
              <Link
                key={s.sku}
                href={`/cabinets/${s.slug}`}
                className="inline-flex items-center gap-2 border border-[var(--color-line)] bg-white px-3 py-2 text-sm hover:border-[var(--color-navy)]"
              >
                <span className="font-medium">{s.width_in != null ? formatDim(s.width_in) : s.sku}</span>
                <span className="text-[var(--color-ink-soft)]">{formatCad(s.price_cad)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">
            Finishing touches
          </h2>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            Mouldings, fillers, and trim that pair with this cabinet.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.sku}
                href={`/cabinets/${r.slug}`}
                className="block border border-[var(--color-line)] bg-white p-4 hover:shadow-[0_4px_20px_rgba(13,27,42,0.07)]"
              >
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                  {r.sku}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug">{r.name}</p>
                <p className="mt-2 font-display text-lg">{formatCad(r.price_cad)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
