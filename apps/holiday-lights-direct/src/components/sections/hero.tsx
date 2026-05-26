import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      {/* Background gradient + decorative twinkling roofline */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-night)] via-[#0f1e36] to-[var(--color-night)]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-40" />

      {/* Twinkling "lights along the roofline" */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 hidden gap-3 px-8 md:flex md:justify-between md:px-16">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={`twinkle twinkle-delay-${(i % 5) as 0 | 1 | 2 | 3 | 4} inline-block size-2 rounded-full bg-[var(--color-gold)]`}
            style={{ boxShadow: "0 0 12px 2px rgba(212,175,55,0.6)" }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[var(--color-gold)]">
            🍁 Proudly Canadian · London, Ontario
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Permanent LED lighting,<br />
            <span className="text-[var(--color-gold)]">shipped to your door.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Aluminum-tracked, soffit-mounted RGBW LED systems and pro-grade Christmas lighting gear &mdash;
            the same kit installers buy, sold direct to you from London, Ontario. Free shipping anywhere in
            Canada on orders over $500.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/permanent-lights" className="btn-gold">
              Build your system
            </Link>
            <Link href="/shop" className="btn-ghost-light">
              Shop the catalog →
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
            5-year warranty · CSA approved · -40°C tested · 50,000 hour life
          </p>
        </div>

        {/* Right-hand spec card */}
        <div className="hidden self-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:block">
          <p className="eyebrow text-[var(--color-gold)]">Permanent Lights · LED Housing Package</p>
          <h3 className="font-display mt-2 text-2xl text-white">By linear footage</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["50 ft", "$949"],
              ["75 ft", "$1,375"],
              ["100 ft", "$1,690"],
              ["125 ft", "$1,995"],
              ["150 ft", "$2,310"],
              ["175 ft", "$2,549"],
              ["200 ft", "$2,800"]
            ].map(([span, price]) => (
              <li key={span} className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-semibold">{span}</span>
                <span className="text-[var(--color-gold)]">from {price} CAD</span>
              </li>
            ))}
          </ul>
          <Link
            href="/permanent-lights"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline"
          >
            See what&rsquo;s in the box →
          </Link>
        </div>
      </div>
    </section>
  );
}
