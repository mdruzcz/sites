export function ThreeStep() {
  const steps = [
    {
      n: "01",
      title: "Pick your kit",
      body: "Measure the perimeter you want lit. Pick a kit from 50–200 linear feet and the track color that matches your soffit."
    },
    {
      n: "02",
      title: "Install in a weekend",
      body: "Step-by-step guide walks you through mounting tracks, snapping in LEDs, and wiring the WiFi controller. Basic tools, no electrician."
    },
    {
      n: "03",
      title: "Light up the year",
      body: "Pair in the app. Pick a holiday scene, schedule sunset triggers, or paint a custom color. Year-round magic from one install."
    }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand)]">How they work</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">From box to roofline in a weekend.</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-[var(--color-border)] bg-white p-7">
              <span className="font-display absolute -top-5 left-6 grid size-12 place-items-center rounded-full gradient-cyan-green text-lg font-bold text-white shadow-md">
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
