const STEPS = [
  {
    title: "Design",
    body: "Our merry team of decorators guides you through:",
    items: ["Initial Consultation", "Creative Designing", "Final Approval"],
  },
  {
    title: "Décor",
    body: "We provide every essential element to make your season bright:",
    items: ["Festive Lights", "Holiday Decorations", "Installation Equipment"],
  },
  {
    title: "Installation",
    body: "When we arrive, the spirit of Christmas materialises. Our team is:",
    items: ["Highly Skilled", "Safety-Conscious", "Utterly Professional"],
  },
  {
    title: "Maintenance",
    body: "Throughout the season we're available for:",
    items: ["Any Inquiries", "Ongoing Support", "Necessary Repairs"],
  },
  {
    title: "Removal",
    body: "The service includes the removal process, featuring:",
    items: ["A pre-determined removal date", "Prompt and efficient dismantling", "Tissues for any sentimental farewells"],
  },
  {
    title: "Storage",
    body: "Every element is meticulously:",
    items: ["Stored away", "Set to rest", "Readied for next year"],
  },
];

export function ProcessSteps() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Simple and Easy Holiday Lighting</p>
          <h2 className="heading-display text-3xl sm:text-4xl mt-3">
            From Lighting Designs to Storage, We Make Holiday Lighting a Click
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[color:var(--brand-red)] text-white heading-display text-base flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-display text-lg text-[color:var(--brand-green)]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-[color:var(--ink-soft)]">{step.body}</p>
              <ul className="mt-3 space-y-1 text-sm text-[color:var(--ink-strong)]">
                {step.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-red)]" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
