const steps = [
  {
    n: "01",
    title: "Free On-Site Quote",
    text: "We visit your property in Woodstock or Oxford County to measure, discuss materials, and email a transparent itemized quote within 48 hours.",
  },
  {
    n: "02",
    title: "Permits & Locates",
    text: "We handle the red tape — City of Woodstock permits, Ontario One Call locates for gas, water, and hydro lines. All before we touch shovel to dirt.",
  },
  {
    n: "03",
    title: "The Deep-Set Build",
    text: "Every post hole dug to a 4-foot minimum to beat Ontario frost heave. Premium-grade lumber, galvanized fasteners, and structural fastening to code.",
  },
  {
    n: "04",
    title: "Final Walk-Through",
    text: "We don't leave until the site is spotless and you're 100% satisfied. Final safety check on every railing, gate, and post before you sign off.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
