import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";

// Kit pricing mirrors the foreverlights.ca DIY kits (same supplier, same box).
const PACKAGES: [string, string][] = [
  ["50 ft", "$1,265"],
  ["75 ft", "$1,485"],
  ["100 ft", "$1,729"],
  ["150 ft", "$2,241"],
  ["200 ft", "$2,649"],
  ["250 ft", "$3,157"]
];

const PROOF = ["5-year warranty", "CSA approved", "Tested to −40°C", "50,000 hour life"];

/**
 * Light, airy hero. The night photography still carries the festive mood, but it
 * sits inside a rounded card on an ivory page instead of being dimmed behind the
 * headline — so the page opens bright and the lights are the only dark thing.
 */
export function Hero() {
  const bg = photo("home-christmas-warm-white");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg)]">
      {/* soft warm glow, top-right — festive without weight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-52 -z-10 h-[36rem] w-[36rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(224,177,85,0.30), rgba(224,177,85,0) 68%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,107,68,0.16), rgba(47,107,68,0) 70%)" }}
      />

      <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow eyebrow-star inline-flex rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2 text-[var(--color-gold-text)] shadow-[var(--shadow-xs)]">
            Proudly Canadian · London, Ontario
          </p>

          <h1 className="font-display display mt-7 text-[var(--color-text)]">
            Permanent LED lighting,
            <span className="mt-1 block text-[var(--color-gold-text)]">shipped to your door.</span>
          </h1>

          <p className="lead mt-7 max-w-xl text-[var(--color-text-soft)]">
            Soffit-matched aluminum tracks holding 12V RGBW pucks, the same kit professional installers
            buy, sold direct from London, Ontario. One system covers Christmas, Halloween, game day and
            everyday warm-white accent.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/permanent-lights" className="btn-primary group">
              Build your system
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/shop" className="btn-secondary">
              Shop the catalog
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {PROOF.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo card + pricing, stacked so the night shot reads as artwork */}
        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-lg)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src={bg.src}
                alt={bg.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                placeholder="blur"
                blurDataURL={bg.blurDataURL}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="eyebrow text-[var(--color-gold-text)]">LED housing packages</p>
              <p className="text-xs text-[var(--color-muted)]">Priced by linear foot</p>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {PACKAGES.map(([span, price]) => (
                <li key={span} className="flex items-baseline justify-between gap-2 border-b border-[var(--color-border)] py-2.5 text-sm last:border-0 sm:last:border-b">
                  <span className="font-semibold text-[var(--color-text)]">{span}</span>
                  <span className="text-[var(--color-gold-text)]">{price}</span>
                </li>
              ))}
            </ul>
            <Link href="/permanent-lights" className="btn-primary mt-6 w-full">
              See what is in the box
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
