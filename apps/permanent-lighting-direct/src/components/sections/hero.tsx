import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-night)] via-[#1a1f3a] to-[var(--color-brand-deep)]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-rainbow-red)] via-[var(--color-rainbow-purple)] to-[var(--color-rainbow-blue)] opacity-80" />

      <div className="pointer-events-none absolute inset-x-0 top-[28%] hidden gap-3 px-8 md:flex md:justify-between md:px-16">
        {[
          "var(--color-rainbow-red)",
          "var(--color-rainbow-orange)",
          "var(--color-rainbow-yellow)",
          "var(--color-rainbow-green)",
          "var(--color-rainbow-blue)",
          "var(--color-rainbow-purple)",
          "var(--color-rainbow-pink)"
        ].flatMap((c, repeat) =>
          Array.from({ length: 3 }).map((_, i) => (
            <span
              key={`${repeat}-${i}`}
              className={`twinkle twinkle-delay-${((repeat + i) % 5) as 0 | 1 | 2 | 3 | 4} inline-block size-2.5 rounded-full`}
              style={{ background: c, boxShadow: `0 0 14px 3px ${c}` }}
            />
          ))
        )}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[var(--color-accent)]">
            ⚡ DIY · Shipped from London, Ontario
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Permanent lighting,<br />
            <span className="rainbow-text">done yourself.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Pro-grade aluminum-tracked LED systems &mdash; sold as complete DIY kits. Pick your footage,
            wire it up in a weekend, control every color from your phone. Thousands less than
            professional installs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-accent">
              Pick your DIY kit
            </Link>
            <Link href="/how-it-works" className="btn-ghost-light">
              See how it works →
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
            From $9/ft · 5-year LED warranty · CSA Class 2 · IP68 weatherproof
          </p>
        </div>

        <div className="hidden self-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:block">
          <p className="eyebrow text-[var(--color-accent)]">Pro install vs DIY</p>
          <h3 className="font-display mt-2 text-2xl text-white">Save thousands.</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-slate-300">Trimlight / Jellyfish (install)</span>
              <span className="font-semibold text-rose-300">$25&ndash;40 / ft</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-slate-300">Govee / Eufy (basic DIY)</span>
              <span className="font-semibold text-amber-200">$2&ndash;4 / ft</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-[var(--color-accent)]/15 px-3 py-2 ring-1 ring-[var(--color-accent)]">
              <span className="font-semibold text-white">Permanent Lighting Direct</span>
              <span className="font-bold text-[var(--color-accent)]">$9&ndash;12 / ft</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            Pro-grade components. Aluminum track that hides the wire. Real human support.
          </p>
          <Link
            href="/diy-kits"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Compare in detail →
          </Link>
        </div>
      </div>
    </section>
  );
}
