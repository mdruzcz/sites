import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { ProcessSteps } from "@/components/sections/process-steps";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonial } from "@/components/sections/testimonial";
import { ServiceAreas } from "@/components/sections/service-areas";
import { DoneForYou } from "@/components/sections/done-for-you";
import { CtaBand } from "@/components/sections/cta-band";
import type { Metadata } from "next";
import { listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export const revalidate = 3600;

export default async function HomePage() {
  const products = await listProducts({});
  const stains = products.filter((p) => p.slug !== "synthetic-stain-brush");
  const featured = stains.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <TrustStrip />
      <SpecCallouts />

      {/* Shop by color */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-brand)]">The full range</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Shop Ready Seal by color</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            See all colors →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {stains.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <UseCases />

      {/* Best sellers */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <p className="eyebrow text-[var(--color-brand)]">Best sellers</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Our most-ordered colors</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <ProcessSteps />

      {/* Contractor band */}
      <section className="bg-[var(--color-night)] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--color-gold)]">For the pros</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Buying by the skid?</h2>
            <p className="mt-3 text-orange-50/80">
              Deck and fence contractors get special freight pricing on full-skid quantities,
              plus priority support and consistent color across every job. Apply once and unlock
              wholesale rates.
            </p>
          </div>
          <Link href="/contractor-program" className="btn-gold shrink-0">
            Get contractor pricing →
          </Link>
        </div>
      </section>

      <Testimonial />
      <DoneForYou />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
