export function ThreeStep() {
  const steps = [
    {
      n: "01",
      title: "Pick your kit",
      body: "Measure your perimeter, pick the right kit (50–200 ft). Choose your aluminum track color — beige, black, brown, or white — to match your soffit."
    },
    {
      n: "02",
      title: "Install in a weekend",
      body: "Our step-by-step guide walks you through mounting the track, snapping in the LEDs, and wiring the controller. Basic tools, no electrician needed."
    },
    {
      n: "03",
      title: "Light up the year",
      body: "Connect to WiFi, open the app, pick a holiday or scene. Red & green for Christmas, orange for Halloween, warm white as everyday accent. Year-round magic."
    }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand)]">How it works</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Set it up in a weekend &mdash; enjoy it all year.</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-[var(--color-border)] bg-white p-7"
            >
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
