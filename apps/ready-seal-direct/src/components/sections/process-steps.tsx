export function ProcessSteps() {
  const steps = [
    {
      n: "01",
      title: "Prep the wood",
      body: "Clean the surface and let it dry. Ready Seal needs no primer — just bare, unsealed wood. Don't apply over paint or fresh stain."
    },
    {
      n: "02",
      title: "Apply one coat",
      body: "Spray, roll, or brush in any temperature. No wet-line, no diluting, no back-brushing. It blends itself and never leaves laps, runs, or streaks."
    },
    {
      n: "03",
      title: "Let it cure",
      body: "Ready Seal is darkest when first applied and settles into its true color in about 14 days. Trans-oxide pigments protect against UV and moisture."
    }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand)]">Goof-proof application</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Stain like a pro in 3 steps.</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-[var(--color-border)] bg-white p-7">
              <span className="font-display absolute -top-5 left-6 grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
