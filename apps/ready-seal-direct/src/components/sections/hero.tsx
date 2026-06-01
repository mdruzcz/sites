import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      {/* Deck lifestyle background */}
      <Image
        src="/images/hero-deck.jpg"
        alt="Freshly stained backyard deck with Ready Seal wood stain and sealer"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-night)]/90 via-[var(--color-brand-deep)]/70 to-[var(--color-night)]/90" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.25fr_1fr] md:py-28">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[var(--color-gold)]">
            🍁 Proudly Canadian · Belmont, Ontario
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            The best place to buy<br />
            <span className="text-[var(--color-gold)]">Ready Seal in Canada.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-orange-50/90">
            Professional-grade oil-based wood stain &amp; sealer in one. Goof-proof, one-coat
            application &mdash; no primer, no back-brushing, no laps, runs, or streaks. Nine rich
            colors for decks, fences and outdoor wood.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-gold">
              Shop all colors
            </Link>
            <Link href="/contractor-program" className="btn-ghost-light">
              Contractor pricing →
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-orange-100/70">
            Oil-based · UV protection · VOC compliant · Free shipping over $750
          </p>
        </div>

        {/* Right-hand price card */}
        <div className="hidden self-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:block">
          <p className="eyebrow text-[var(--color-gold)]">Ready Seal Stain &amp; Sealer</p>
          <h3 className="font-display mt-2 text-2xl text-white">Straightforward pricing</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-semibold">1 Gallon</span>
              <span className="text-[var(--color-gold)]">
                <span className="mr-2 text-white/40 line-through">$108.13</span>$102.13 CAD
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-semibold">5 Gallon</span>
              <span className="text-right text-[var(--color-gold)]">
                $413.63 CAD
                <span className="block text-[11px] font-semibold text-emerald-300">save $97 vs 5 cans</span>
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-semibold">Stain Brush 5&Prime;</span>
              <span className="text-[var(--color-gold)]">$18.99 CAD</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-orange-100/70">
            Covers ~100&ndash;125 sq ft per gallon on rough wood, more on smooth.
          </p>
          <Link
            href="/calculator"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline"
          >
            How much do I need? →
          </Link>
        </div>
      </div>
    </section>
  );
}
