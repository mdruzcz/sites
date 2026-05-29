export function SpecCallouts() {
  const specs = [
    { value: "46", unit: "lumens", label: "Per puck at max brightness" },
    { value: "0.3", unit: "watts", label: "Per LED · efficient by design" },
    { value: "50k", unit: "hours", label: "20+ years of typical use" },
    { value: "−40°C", unit: "tested", label: "Built for Canadian winters" }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-[var(--color-brand)]">The numbers</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Engineered for serious lighting.</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl text-[var(--color-brand)]">
                {s.value}
                <span className="ml-1 text-sm font-medium uppercase tracking-wide text-slate-500">
                  {s.unit}
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
