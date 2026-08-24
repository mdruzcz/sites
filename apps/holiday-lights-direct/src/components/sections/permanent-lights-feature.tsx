import Link from "next/link";
import { Photo } from "@/components/photo";
import { type CatalogProduct, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";

const FEATURES = [
  "Smart phone-app control",
  "Beige, black, brown or white tracks",
  "Custom colour match available",
  "50,000 hour LED life",
  "IP68 weatherproof",
  "CSA Class 2 power supply"
];

export function PermanentLightsFeature({ housingPackages }: { housingPackages: CatalogProduct[] }) {
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Flagship — Permanent Lights</p>
            <h2 className="font-display h2-fluid mt-6">
              The lights pros install,
              <span className="block text-[var(--color-gold-text)]">sold as a complete kit.</span>
            </h2>
            <p className="mt-6 max-w-xl lead text-[var(--color-text-soft)]">
              Soffit-matched aluminum tracks holding 24V RGBW LED pucks. Pick your house perimeter, pick your
              track colour, and we ship the whole system to your door — lights, tracks, controller, power
              supply, connectors, screws and the drill bit.
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-soft)]">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/permanent-lights" className="btn-primary group">
                Pick your footage
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/product-category/permanent-lights" className="btn-secondary">
                Browse just the parts
              </Link>
            </div>
          </div>

          {/* Day / night pair — the clearest way to explain the product */}
          <div className="grid gap-5 sm:grid-cols-2">
            <figure className="reveal-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)]">
              <Photo
                name="track-daytime-discreet"
                ratio="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <figcaption className="px-5 py-4">
                <p className="eyebrow text-[var(--color-muted)]">By day</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  The track tucks into the soffit line and disappears.
                </p>
              </figcaption>
            </figure>
            <figure className="reveal-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)] sm:mt-10">
              <Photo
                name="track-night-glow"
                ratio="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <figcaption className="px-5 py-4">
                <p className="eyebrow text-[var(--color-muted)]">By night</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  One tap and the whole roofline lights up.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Kit sizes */}
        {housingPackages.length > 0 && (
          <div className="mt-20 border-t border-[var(--color-border-strong)] pt-14">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h3 className="font-display h3-fluid">Popular kit sizes</h3>
              <Link
                href="/permanent-lights"
                className="text-sm font-semibold text-[var(--color-gold-text)] hover:underline"
              >
                Compare every size
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {housingPackages.map((p) => {
                const range = priceRange(p);
                const footage = p.slug.replace(/.*?-(\d+).*/, "$1");
                return (
                  <Link key={p.id} href={`/product/${p.slug}`} className="card group reveal-sm p-6">
                    <p className="font-display text-4xl text-[var(--color-gold-text)]">
                      {footage}
                      <span className="ml-1 align-top text-base">ft</span>
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-snug">{p.name}</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {range ? `from ${formatCad(range.min)}` : "—"}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-[var(--color-gold-text)] opacity-0 transition group-hover:opacity-100">
                      View kit →
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
