import Link from "next/link";
import Image from "next/image";
import { type CatalogProduct, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

export function DiyKitFeature({ housingPackages }: { housingPackages: CatalogProduct[] }) {
  return (
    <section className="bg-[var(--color-brand)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-[var(--color-accent)]">
            ⚡ Flagship — DIY Kits
          </p>
          <h2 className="font-display mt-5 text-3xl leading-tight md:text-5xl">
            One box. Everything you need.<br />
            <span className="text-[var(--color-accent)]">Install in a weekend.</span>
          </h2>
          <p className="mt-5 text-lg text-purple-100">
            Pick the kit that matches your home perimeter. We ship the controller, RGBW LED lights,
            aluminum tracks (in your soffit color), every cable and connector, fuses, drill bit, and
            step-by-step instructions &mdash; one shipment, no guesswork.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-purple-100">
            <li>✓ Smart phone-app control</li>
            <li>✓ 24V RGBW LED pucks</li>
            <li>✓ Soffit-matched aluminum tracks</li>
            <li>✓ 50,000 hour LED life</li>
            <li>✓ IP68 weatherproof</li>
            <li>✓ CSA Class 2 power</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-accent">
              Pick your footage →
            </Link>
            <Link
              href="/product-category/lights"
              className="btn-ghost-light border-purple-200/40"
            >
              Browse the parts
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {housingPackages.map((p) => {
            const img = primaryImage(p);
            const range = priceRange(p);
            const footage = p.slug.replace(/.*-(\d+).*/, "$1");
            return (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[var(--color-night)] transition hover:border-[var(--color-accent)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--color-night-soft)]">
                  {img?.public_url ? (
                    <Image
                      src={img.public_url}
                      alt={img.alt_text}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-slate-500">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="eyebrow text-[var(--color-accent)]">{footage}&prime; linear feet</p>
                  <h3 className="font-display mt-1 text-lg">{p.name}</h3>
                  <p className="mt-1 text-sm text-purple-200">
                    {range ? `from ${formatCad(range.min)}` : "—"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
