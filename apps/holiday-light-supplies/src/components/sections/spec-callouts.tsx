export function SpecCallouts() {
  const specs = [
    { value: "2010", unit: "since", label: "Ontario's trusted lighting source" },
    { value: "1,000+", unit: "installs", label: "Homes, businesses & municipalities" },
    { value: "500+", unit: "customers", label: "Happy repeat buyers every season" },
    { value: "40%", unit: "off", label: "Up to, on bulk & commercial orders" }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-[var(--color-accent)]">By the numbers</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Canada trusts us to light the season.</h2>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-6xl text-[var(--color-brand)]">
                {s.value}
                <span className="ml-1 text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  {s.unit}
                </span>
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
