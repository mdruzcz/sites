import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";

const PACKAGES: [string, string][] = [
  ["50 ft", "$949"],
  ["75 ft", "$1,375"],
  ["100 ft", "$1,690"],
  ["125 ft", "$1,995"],
  ["150 ft", "$2,310"],
  ["200 ft", "$2,800"]
];

export function Hero() {
  const bg = photo("hero-warm-white-home");

  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed photograph */}
      <Image
        src={bg.src}
        alt={bg.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={bg.blurDataURL}
        className="-z-10 object-cover object-center"
      />
      {/* Scrim — headline legibility never depends on the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(14,16,21,0.94)] via-[rgba(14,16,21,0.78)] to-[rgba(14,16,21,0.45)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
      />

      <div className="shell grid gap-14 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-32 lg:py-36">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-white/10 px-4 py-2 text-[var(--color-gold-bright)] backdrop-blur">
            Proudly Canadian · London, Ontario
          </p>

          <h1 className="font-display mt-7 text-[2.6rem] leading-[1.04] text-white sm:text-5xl md:text-[4.2rem]">
            Permanent LED lighting,
            <span className="mt-1 block text-[var(--color-gold-bright)]">shipped to your door.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 md:text-lg">
            Soffit-matched aluminum tracks holding 24V RGBW pucks — the same kit professional installers
            buy, sold direct from London, Ontario. One system covers Christmas, Halloween, game day and
            everyday warm-white accent.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/permanent-lights" className="btn-gold">
              Build your system
            </Link>
            <Link href="/shop" className="btn-ghost-light">
              Shop the catalog
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.14em] text-white/70">
            <li>5-year warranty</li>
            <li>CSA approved</li>
            <li>Tested to −40°C</li>
            <li>50,000 hour life</li>
          </ul>
        </div>

        {/* Pricing card */}
        <div className="hidden self-center rounded-3xl border border-white/15 bg-[rgba(20,23,30,0.72)] p-8 backdrop-blur-md md:block">
          <p className="eyebrow text-[var(--color-gold-bright)]">LED housing packages</p>
          <h2 className="font-display mt-3 text-[1.75rem] text-white">Priced by linear foot</h2>
          <ul className="mt-7 space-y-0">
            {PACKAGES.map(([span, price]) => (
              <li
                key={span}
                className="flex items-center justify-between border-b border-white/10 py-3 text-sm last:border-0"
              >
                <span className="font-semibold text-white">{span}</span>
                <span className="text-[var(--color-gold-bright)]">from {price} CAD</span>
              </li>
            ))}
          </ul>
          <Link href="/permanent-lights" className="btn-gold mt-7 w-full">
            See what is in the box
          </Link>
        </div>
      </div>
    </section>
  );
}
