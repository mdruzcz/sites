export function ProcessSteps() {
  const steps = [
    {
      n: "01",
      title: "Pick your footage",
      body: "Measure your home perimeter, pick a kit from 50 to 200 linear feet. One-click pricing, no quotes."
    },
    {
      n: "02",
      title: "Match your soffit",
      body: "Choose beige, black, brown, or white aluminum tracks — or send us a paint sample for a custom color."
    },
    {
      n: "03",
      title: "Install or hire a pro",
      body: "DIY-friendly with our install guide, or hand the kit to your installer. Every part is in the box."
    }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand)]">How it works</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">From order to install in 3 steps.</h2>
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
