const steps = [
  { n: "1", title: "Free quote", body: "Call, or send a photo of the house through the form. You get a clear price within one business day." },
  { n: "2", title: "Design", body: "We match bulb style, colour and coverage to your home. Roofline, trees, wreaths, garland, or all of it." },
  { n: "3", title: "Install day", body: "Our insured crew arrives with everything. Most homes take two to four hours, usually while you are at work." },
  { n: "4", title: "Enjoy, then we take it down", body: "Mid-season service included. After the holidays we remove, label and store everything for next year." },
];

export function Process() {
  return (
    <section className="bg-[var(--paper)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill candy">How it works</p>
          <h2 className="font-display h2-fluid mt-4">Four steps. Zero ladders for you.</h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card relative p-6 pt-8">
              <span className="font-display absolute -top-5 left-6 grid size-10 place-items-center rounded-full bg-[var(--candy)] text-lg text-white shadow-[var(--shadow-candy)]">{s.n}</span>
              <h3 className="font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="bulb-string mt-12" aria-hidden>{Array.from({ length: 18 }).map((_, i) => <span key={i} />)}</div>
      </div>
    </section>
  );
}
