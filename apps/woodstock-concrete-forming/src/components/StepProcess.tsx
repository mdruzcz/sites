const steps = [
  {
    n: "01",
    title: "On-Site Quote",
    text: "We visit your property, measure, and give you a written itemized quote within 48 hours. No surprises — the number doesn't change when we start.",
  },
  {
    n: "02",
    title: "Precision Forming",
    text: "We prep the base, set forms precisely, lay rebar, and ensure drainage is right before a single yard of concrete is ordered.",
  },
  {
    n: "03",
    title: "The Perfect Pour",
    text: "Concrete is placed, finished to your chosen texture, control joints are cut, and the site is cleaned. Walk on it in 24 hours, drive on it in 7 days.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.n} className="relative bg-[var(--surface)] rounded-xl p-6 sm:p-8 border border-[var(--border)]">
          <div className="text-6xl font-extrabold text-[var(--charcoal)]/8 absolute top-4 right-5 leading-none select-none">
            {step.n}
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded bg-[var(--charcoal)] flex items-center justify-center text-[var(--accent)] font-extrabold text-lg mb-5">
              {step.n.slice(-1)}
            </div>
            <h3 className="font-extrabold text-base uppercase tracking-wider text-[var(--charcoal)] mb-3">
              {step.title}
            </h3>
            <p className="text-[var(--concrete)] leading-relaxed text-sm">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
