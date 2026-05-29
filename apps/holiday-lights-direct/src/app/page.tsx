import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { PermanentLightsFeature } from "@/components/sections/permanent-lights-feature";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { ProcessSteps } from "@/components/sections/process-steps";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonial } from "@/components/sections/testimonial";
import { ServiceAreas } from "@/components/sections/service-areas";
import { CtaBand } from "@/components/sections/cta-band";
import type { Metadata } from "next";
import { getCategories, listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export const revalidate = 3600;

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    listProducts({ limit: 8 })
  ]);

  const housingPackages = products
    .filter((p) => p.slug.startsWith("led-housing-package-"))
    .sort((a, b) => {
      const n = (s: string) => parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
      return n(a.slug) - n(b.slug);
    });

  return (
    <>
      <Hero />
      <TrustStrip />
      <PermanentLightsFeature housingPackages={housingPackages.slice(0, 4)} />
      <SpecCallouts />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-brand)]">The catalog</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Shop by category</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            See all 41 products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/product-category/${c.slug}`}
              className="group rounded-lg border border-[var(--color-border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-md"
            >
              <h3 className="text-base font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1 text-xs text-slate-500 group-hover:text-[var(--color-brand)]">
                Shop →
              </p>
            </Link>
          ))}
        </div>
      </section>
      <UseCases />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-brand)]">Best sellers</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">What pros are ordering</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <ProcessSteps />
      <Testimonial />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
