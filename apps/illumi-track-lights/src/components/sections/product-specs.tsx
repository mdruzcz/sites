export function ProductSpecs() {
  const specs = [
    { label: "RGBW", body: "All colors + true warm white" },
    { label: "50,000 hours", body: "20+ years typical LED life" },
    { label: "70 lumens", body: "Per puck at max brightness" },
    { label: "4 billion+", body: "Color combinations" },
    { label: "200+ scenes", body: "Pre-built holiday + custom patterns" },
    { label: "5-year warranty", body: "Plus 1-year labor on every install" }
  ];
  return (
    <section className="bg-gradient-to-b from-[var(--color-brand-deep)] to-[var(--color-night)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-bright)]">The specs</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            Pro-grade lighting,<br />
            <span className="gradient-text">in the box.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Every Illumi kit ships with the same components professional installers use &mdash; nothing
            stripped down for the DIY market.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="font-display text-3xl text-[var(--color-brand-bright)]">{s.label}</p>
              <p className="mt-2 text-sm text-slate-300">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
