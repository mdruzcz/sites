export function SpecCallouts() {
  const specs = [
    { value: "1", unit: "coat", label: "No primer, no back-brushing" },
    { value: "9", unit: "colors", label: "Cedar to Dark Walnut" },
    { value: "<250", unit: "g/L VOC", label: "VOC compliant · biodegradable" },
    { value: "14", unit: "days", label: "To reach its true color" }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-[var(--color-brand)]">Why Ready Seal</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Professional results, every time.</h2>
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
