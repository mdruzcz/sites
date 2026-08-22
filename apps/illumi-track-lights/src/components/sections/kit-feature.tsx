import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, priceRange } from "@/lib/catalog";
import { productPhoto, PRODUCT_PLACEHOLDER } from "@/lib/product-photos";
import { formatCad } from "@/lib/utils";

export function KitFeature({ housingPackages }: { housingPackages: CatalogProduct[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow text-[var(--color-brand)]">★ Flagship — Soffit Track Kits</p>
            <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
              One kit. Everything you need.<br />
              <span className="gradient-text">Install in a weekend.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Pick the kit that matches your home perimeter. Each kit ships with 24V RGBW LED pucks, the
              aluminum tracks, the WiFi controller, every cable and connector, color-matched soffit
              screws, the drill bit, and step-by-step install instructions &mdash; one shipment, no
              guesswork.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
              <li>✓ Smart phone-app control</li>
              <li>✓ Beige · Black · Brown · White tracks</li>
              <li>✓ 50,000 hour LED life</li>
              <li>✓ IP68 weatherproof</li>
              <li>✓ CSA Class 2 power</li>
              <li>✓ 5-year warranty</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/diy-kits" className="btn-primary">
                Pick your footage →
              </Link>
              <Link href="/product-category/lights" className="btn-secondary">
                Browse the parts
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {housingPackages.map((p) => {
              const photo = productPhoto(p.slug);
              const range = priceRange(p);
              const footage = p.slug.replace(/.*-(\d+).*/, "$1");
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-warm)]">
                    <Image
                      src={photo?.src ?? PRODUCT_PLACEHOLDER}
                      alt={photo?.alt ?? p.name}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 50vw, 260px"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="eyebrow text-[var(--color-brand)]">{footage}&prime; linear feet</p>
                    <h3 className="font-display mt-1 text-lg">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {range ? `from ${formatCad(range.min)}` : "—"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
