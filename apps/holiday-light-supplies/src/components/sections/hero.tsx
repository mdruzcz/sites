import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      {/* Full-bleed lifestyle photograph */}
      <Image
        src="/images/IMG_8381-scaled.jpg"
        alt="Commercial-grade LED Christmas lights wrapping estate trees at night, installed across Ontario by Holiday Light Supplies"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Legibility gradient — deep evergreen, darker at the bottom-left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#08180f]/95 via-[#0b2417]/80 to-[#0e2c1d]/40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2 text-[var(--color-gold)]">
            🍁 Ontario&rsquo;s holiday lighting source since 2010
          </p>
          <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Christmas lights,<br />
            <span className="italic text-[var(--color-gold)]">done beautifully.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
            Commercial-grade C9 bulbs, G20 globes, mini strands, snowfall tubes, pre-lit trees and
            show-stopping 3D displays &mdash; shipped fast from our Ontario warehouse to homes,
            businesses and municipalities across Canada.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-accent text-base">
              Shop all Christmas lights →
            </Link>
            <Link
              href="/professional-installer"
              className="text-base font-semibold text-white underline-offset-4 hover:text-[var(--color-gold)] hover:underline"
            >
              Business &amp; municipality pricing
            </Link>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.18em] text-white/55">
            CSA certified · Fully insured · 1,000+ installations · Free shipping over $150
          </p>
        </div>
      </div>
    </section>
  );
}
