import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "@/lib/catalog";
import { primaryImage, priceRange } from "@/lib/catalog";
import { formatCadRound, imageSrc } from "@/lib/utils";
import { SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";

/** Editorial rail of signature display pieces — large photos, horizontal scroll on mobile. */
export function FeaturedDisplays({ products }: { products: CatalogProduct[] }) {
  if (!products.length) return null;
  return (
    <section className="bg-white">
      <div className="shell section">
        <SectionHeading
          eyebrow="Signature displays"
          title="The pieces people cross the street to photograph."
          sub="Walk-through gift boxes, lit archways, 16 ft snowmen and giant stars — aluminum frames, LED netting, 24V low-voltage and rated for a Canadian January."
          action={{ href: "/product-category/3d", label: "All 3D displays" }}
        />
      </div>
      <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-4 pb-6 sm:px-6 lg:mx-auto lg:max-w-[76rem] lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-6">
        {products.slice(0, 4).map((p) => {
          const img = primaryImage(p);
          const range = priceRange(p);
          return (
            <Link key={p.id} href={`/product/${p.slug}`} className="group relative isolate min-w-[78%] snap-start overflow-hidden rounded-3xl bg-[var(--color-night)] text-white sm:min-w-[46%] lg:min-w-0">
              <div className="relative aspect-[4/5]">
                <Image src={imageSrc(img?.public_url)} alt={img?.alt_text ?? p.name} fill sizes="(max-width: 1024px) 80vw, 300px" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="scrim-strong absolute inset-0" aria-hidden />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-white/75">
                  {range?.quoteOnly ? "Quote on request" : range ? `From ${formatCadRound(range.min)}` : ""}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold-bright)]">
                  View display <Icon.arrow size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
