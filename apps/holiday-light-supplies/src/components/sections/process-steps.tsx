export function ProcessSteps() {
  const steps = [
    {
      n: "01",
      title: "Browse the catalog",
      body: "C9, G20, mini strands, snowfall tubes, LED trees and 3D displays — every spec listed, transparent pricing, no quote required."
    },
    {
      n: "02",
      title: "Order online",
      body: "Add to cart and check out securely. Free shipping across Ontario over $150, and up to 40% off on bulk and commercial orders."
    },
    {
      n: "03",
      title: "Ships fast from Ontario",
      body: "Packed and dispatched from our Ontario warehouse so your strands arrive in days, not weeks — ready for the season."
    }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-accent)]">How it works</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">From cart to doorstep in 3 steps.</h2>
        </div>
        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-warm)] p-8"
            >
              <span className="font-display absolute -top-5 left-7 grid size-12 place-items-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
