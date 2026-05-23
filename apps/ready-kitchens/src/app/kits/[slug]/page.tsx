import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllKits, getKitBySlug, getCabinetCodes } from "@/lib/kits";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatCad, SITE } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllKits()).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kit = await getKitBySlug(slug);
  if (!kit) return {};
  return {
    title: `${kit.name} — ${kit.pieces}-Piece White Shaker Kitchen Kit`,
    description: `${kit.tagline}. ${kit.summary} Assembled and ready for pickup in Belmont, Ontario.`,
    openGraph: {
      title: `${kit.name} · ${formatCad(kit.price_cad)} CAD`,
      description: kit.tagline ?? undefined,
    },
  };
}

export default async function KitPage({ params }: Props) {
  const { slug } = await params;
  const kit = await getKitBySlug(slug);
  if (!kit) notFound();

  const codes = getCabinetCodes();
  const codesInKit = new Set(
    kit.items.map((i) => i.sku.replace(/\d.*$/, "").replace(/^WP$/, "UC")),
  );

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kit.name,
    description: kit.summary,
    image: kit.gallery,
    sku: kit.slug,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: kit.price_cad,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "LocalBusiness", name: SITE.name },
    },
  };

  const totalWalls =
    (kit.wall_a_inches ?? 0) +
    (kit.wall_b_inches ?? 0) +
    (kit.wall_c_inches ?? 0) +
    (kit.island_inches ?? 0);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <nav className="mb-6 text-sm text-[var(--color-ink-soft)]">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/kits" className="hover:underline">Kits</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-ink)]">{kit.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] shadow-sm">
            <KitHeroSvg shape={kit.shape ?? "Kit"} />
            <span className="absolute left-4 top-4 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
              {kit.pieces} pieces
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink)]">
              {kit.shape}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-md border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-3 text-[11px] text-[var(--color-ink-soft)]">
              <div className="font-semibold text-[var(--color-ink)]">Plywood</div>
              Solid plywood boxes — no MDF, no particleboard.
            </div>
            <div className="aspect-square rounded-md border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-3 text-[11px] text-[var(--color-ink-soft)]">
              <div className="font-semibold text-[var(--color-ink)]">Soft-close</div>
              Every door &amp; drawer, undermount glides.
            </div>
            <div className="aspect-square rounded-md border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-3 text-[11px] text-[var(--color-ink-soft)]">
              <div className="font-semibold text-[var(--color-ink)]">36&quot; walls</div>
              Tall wall cabinets for pantry-height storage.
            </div>
          </div>
        </div>

        {/* Buy box */}
        <aside className="lg:sticky lg:top-24">
          <span className="inline-block rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
            {kit.shape} · {kit.layout_fits}
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">{kit.name}</h1>
          <p className="mt-2 text-lg text-[var(--color-ink-soft)]">{kit.tagline}</p>

          <div className="mt-5 flex items-end gap-3">
            <p className="font-display text-5xl leading-none">{formatCad(kit.price_cad)}</p>
            <p className="pb-1 text-sm text-[var(--color-ink-soft)]">CAD · pickup in Belmont</p>
          </div>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">No payment now — we confirm stock and pickup before billing.</p>

          {/* Savings vs retail */}
          {kit.savings_vs_retail_cad > 0 && (
            <div className="mt-5 rounded-md border border-[var(--color-sage-soft)] bg-[var(--color-sage-soft)]/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-sage)]">
                You save {formatCad(kit.savings_vs_retail_cad)}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                Buying these {kit.pieces} cabinets individually at{" "}
                <a href={SITE.parentUrl} target="_blank" rel="noopener" className="font-medium text-[var(--color-ink)] underline-offset-2 hover:underline">
                  {SITE.parentDomain}
                </a>{" "}
                would total <strong className="text-[var(--color-ink)]">{formatCad(kit.total_retail_cad)}</strong> — the kit price below already includes assembly &amp; bundle savings.
              </p>
            </div>
          )}

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            {kit.summary}
          </p>

          <div className="mt-5 rounded-md border border-[var(--color-line)] bg-white p-4">
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">Best for</p>
            <p className="mt-1 text-sm">{kit.best_for}</p>
          </div>

          {/* Hood note */}
          <div className="mt-3 rounded-md border border-[var(--color-line)] bg-white p-4 text-sm">
            <p className="font-semibold text-[var(--color-ink)]">Range &amp; hood</p>
            <p className="mt-1 text-[var(--color-ink-soft)]">
              The layout leaves a clean 30&quot; gap for a freestanding range with a wall-mounted <strong>chimney hood (not included)</strong>. No upper cabinet sits above the range — by design.
            </p>
          </div>

          <ul className="mt-5 space-y-2">
            {kit.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-white">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton slug={kit.slug} label={`Add to Cart — ${formatCad(kit.price_cad)}`} className="btn-primary flex-1" />
            <Link href="/contact" className="btn-secondary">
              Ask a question
            </Link>
          </div>
          <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
            🔒 No payment now · pickup at 50432 Yorke Line, Belmont · {SITE.leadTime}
          </p>
        </aside>
      </div>

      {/* Cabinet list */}
      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="accent-rule mb-3" />
            <h2 className="font-display text-3xl">What&rsquo;s in the {kit.name}</h2>
            <p className="mt-1 text-[var(--color-ink-soft)]">
              {kit.pieces} cabinets, every one assembled and ready.
              {totalWalls > 0 && (
                <> Designed for {formatInches(totalWalls)} of total cabinet wall.</>
              )}
            </p>
          </div>
          <p className="text-xs text-[var(--color-ink-soft)]">
            Need more pieces?{" "}
            <a href={SITE.parentUrl} target="_blank" rel="noopener" className="font-medium text-[var(--color-accent-dark)] underline-offset-2 hover:underline">
              Add individual cabinets from {SITE.parentDomain} →
            </a>
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white">
          <table className="w-full">
            <thead className="bg-[var(--color-paper-warm)] text-left text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
              <tr>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Cabinet</th>
                <th className="hidden px-4 py-3 sm:table-cell">Notes</th>
                <th className="px-4 py-3 text-right">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {kit.items.map((item, i) => (
                <tr key={`${item.sku}-${i}`}>
                  <td className="px-4 py-3 font-mono text-xs font-semibold tracking-wider text-[var(--color-accent-dark)]">
                    {item.sku}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-semibold">{item.name}</p>
                    {item.note && (
                      <p className="text-xs text-[var(--color-ink-soft)] sm:hidden">{item.note}</p>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-[var(--color-ink-soft)] sm:table-cell">{item.note ?? ""}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">×{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Forevercabinets upsell */}
        <div className="mt-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg">Need extra cabinets?</h3>
              <p className="mt-1 max-w-xl text-sm text-[var(--color-ink-soft)]">
                Additional cabinets, fillers, mouldings, and finishing panels can be purchased individually from our parent brand <strong>{SITE.parentBrand}</strong>. Add them to your order in the notes — we&rsquo;ll bundle pickup at no extra freight.
              </p>
            </div>
            <a href={SITE.parentUrl} target="_blank" rel="noopener" className="btn-ghost shrink-0">
              Shop forevercabinets.ca →
            </a>
          </div>
        </div>

        {/* Code key */}
        <div className="mt-8 rounded-lg border border-[var(--color-line)] bg-white p-6">
          <h3 className="font-display text-lg">Cabinet code key</h3>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Our codes follow standard cabinet-shop convention.</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {codes.map((c) => (
              <li key={c.code} className={`flex gap-3 ${codesInKit.has(c.code) ? "" : "opacity-60"}`}>
                <span className="font-mono text-xs font-bold text-[var(--color-accent-dark)] w-12 shrink-0">{c.code}</span>
                <span>
                  <span className="font-semibold">{c.label}.</span>{" "}
                  <span className="text-[var(--color-ink-soft)]">{c.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky bottom add bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-white p-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-[var(--color-ink-soft)]">{kit.name}</p>
            <p className="font-display text-xl leading-tight">{formatCad(kit.price_cad)}</p>
          </div>
          <AddToCartButton slug={kit.slug} label="Add to Cart" className="btn-primary !px-5" />
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-lg bg-[var(--color-ink)] p-8 text-center text-white sm:p-12">
        <h2 className="font-display text-3xl">Ready to claim this kitchen?</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/80">
          Add it to your cart and submit your order. No payment until we confirm stock, pickup, and final pricing.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AddToCartButton slug={kit.slug} label={`Add ${kit.name} to Cart`} className="btn-primary" />
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="text-sm font-semibold underline-offset-4 hover:underline">
            or call {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </article>
  );
}

function formatInches(n: number) {
  const feet = Math.floor(n / 12);
  const inches = n % 12;
  if (inches === 0) return `${feet} ft`;
  return `${feet} ft ${inches} in`;
}

function KitHeroSvg({ shape }: { shape: string }) {
  return (
    <svg viewBox="0 0 500 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="floor2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dad1be" />
          <stop offset="100%" stopColor="#b4a98f" />
        </linearGradient>
        <linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efece4" />
          <stop offset="100%" stopColor="#dad4c4" />
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#wall2)" />
      <rect y="290" width="500" height="110" fill="url(#floor2)" />
      <rect x="30" y="220" width="440" height="14" fill="#3a4252" />
      {/* Wall uppers, with 30" hood gap above range */}
      <rect x="40" y="60" width="180" height="100" fill="#ffffff" stroke="#c7bfae" />
      <line x1="100" y1="60" x2="100" y2="160" stroke="#c7bfae" />
      <line x1="160" y1="60" x2="160" y2="160" stroke="#c7bfae" />
      {/* Chimney hood */}
      <path d="M 225 60 L 235 110 L 285 110 L 295 60 Z" fill="#1f2532" />
      <rect x="240" y="110" width="40" height="50" fill="#2a3140" />
      {/* Right uppers */}
      <rect x="300" y="60" width="160" height="100" fill="#ffffff" stroke="#c7bfae" />
      <line x1="360" y1="60" x2="360" y2="160" stroke="#c7bfae" />
      <line x1="410" y1="60" x2="410" y2="160" stroke="#c7bfae" />
      {/* Base cabinets */}
      <rect x="40" y="234" width="180" height="90" fill="#ffffff" stroke="#c7bfae" />
      <line x1="100" y1="234" x2="100" y2="324" stroke="#c7bfae" />
      <line x1="160" y1="234" x2="160" y2="324" stroke="#c7bfae" />
      <line x1="100" y1="262" x2="160" y2="262" stroke="#c7bfae" />
      <line x1="100" y1="290" x2="160" y2="290" stroke="#c7bfae" />
      {/* Range */}
      <rect x="225" y="234" width="60" height="90" fill="#1f2532" />
      <circle cx="240" cy="255" r="5" fill="none" stroke="#888" strokeWidth="1.5" />
      <circle cx="270" cy="255" r="5" fill="none" stroke="#888" strokeWidth="1.5" />
      <rect x="232" y="270" width="46" height="40" fill="#2a3140" stroke="#888" />
      {/* Right bases */}
      <rect x="300" y="234" width="160" height="90" fill="#ffffff" stroke="#c7bfae" />
      <line x1="360" y1="234" x2="360" y2="324" stroke="#c7bfae" />
      <line x1="410" y1="234" x2="410" y2="324" stroke="#c7bfae" />
      <circle cx="70" cy="125" r="2.5" fill="#a8853e" />
      <circle cx="130" cy="125" r="2.5" fill="#a8853e" />
      <circle cx="190" cy="125" r="2.5" fill="#a8853e" />
      <circle cx="330" cy="125" r="2.5" fill="#a8853e" />
      <circle cx="385" cy="125" r="2.5" fill="#a8853e" />
      <circle cx="435" cy="125" r="2.5" fill="#a8853e" />
      <text x="250" y="382" textAnchor="middle" fontFamily="serif" fontSize="13" fill="#4a5263">
        {shape} — chimney hood above 30&quot; range bay
      </text>
    </svg>
  );
}
