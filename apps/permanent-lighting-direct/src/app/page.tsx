import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { DiyKitFeature } from "@/components/sections/diy-kit-feature";
import { ThreeStep } from "@/components/sections/three-step";
import { OccasionGallery } from "@/components/sections/occasion-gallery";
import { ComparePricing } from "@/components/sections/compare-pricing";
import { CustomerReviews } from "@/components/sections/customer-reviews";
import { SpecCallouts } from "@/components/sections/spec-callouts";
import { CtaBand } from "@/components/sections/cta-band";
import { listProducts } from "@/lib/catalog";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await listProducts({ limit: 16 });

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
      <DiyKitFeature housingPackages={housingPackages.slice(0, 4)} />
      <ThreeStep />
      <OccasionGallery />
      <ComparePricing />
      <SpecCallouts />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-brand)]">Pieces & parts</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Best sellers</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            See all products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <CustomerReviews />
      <CtaBand />
    </>
  );
}
