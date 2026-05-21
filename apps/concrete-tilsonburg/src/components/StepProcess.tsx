const steps = [
  {
    n: "01",
    title: "Precision Prep & Excavation",
    text: "We dig deep, compact a solid granular gravel base, and — for repairs — pressure-wash all surfaces to bare concrete. No shortcuts on the foundation.",
  },
  {
    n: "02",
    title: "Heavy-Duty Reinforcement",
    text: "Steel wire mesh or rebar grids are laid on every pour. For structural repairs, we use industrial-grade epoxies and crack-injection systems that bond permanently.",
  },
  {
    n: "03",
    title: "The Pour & Expert Finish",
    text: "High-strength locally batched concrete mix, air-entrained for freeze-thaw. We screed, float, and finish — broom, smooth trowel, or stamped — with control joints cut at the right spacing.",
  },
  {
    n: "04",
    title: "Curing & Protective Sealing",
    text: "Proper curing time is non-negotiable. Once cured, we apply premium penetrating or acrylic sealer with an anti-slip additive to lock out moisture and protect colour for years.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => (
        <div key={step.n} className="card p-6 sm:p-8 relative">
          <div className="text-5xl font-extrabold text-[var(--accent)]/20 absolute top-4 right-5 leading-none" aria-hidden="true">
            {step.n}
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-lg bg-[var(--charcoal)] flex items-center justify-center text-[var(--accent)] font-extrabold mb-4">
              {step.n.slice(-1)}
            </div>
            <h3 className="font-bold text-xl text-[var(--charcoal)] mb-2">{step.title}</h3>
            <p className="text-[var(--concrete)] leading-relaxed text-sm">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
