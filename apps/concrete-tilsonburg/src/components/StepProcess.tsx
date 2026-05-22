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
      {steps.map((step, i) => (
        <div key={step.n} className="relative group">
          {/* Connector line (desktop) */}
          {i < steps.length - 1 && (
            <div
              className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-[var(--border)] z-0"
              style={{ left: "calc(100% - 0px)", width: "calc(100% - 3rem)", top: "2rem" }}
              aria-hidden="true"
            />
          )}

          <div className="card p-6 sm:p-8 h-full relative overflow-hidden">
            {/* Ghost number watermark */}
            <span
              className="absolute top-3 right-4 text-7xl font-black text-[var(--charcoal)]/[0.05] leading-none select-none"
              aria-hidden="true"
            >
              {step.n}
            </span>

            {/* Step badge */}
            <div className="relative w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-black text-lg mb-5 shadow-md">
              {step.n.slice(-1)}
            </div>

            <h3 className="font-bold text-[var(--charcoal)] text-lg mb-2 leading-snug">
              {step.title}
            </h3>
            <p className="text-[var(--concrete)] leading-relaxed text-sm">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
