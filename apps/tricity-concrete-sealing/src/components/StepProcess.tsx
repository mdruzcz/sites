const steps = [
  {
    number: "01",
    title: "Free Site Assessment",
    description:
      "We visit your property to inspect the concrete surfaces, assess their condition, measure the area, and identify any preparation needed. You'll receive a detailed written quote — no surprises.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Surface Preparation",
    description:
      "We deep-clean the surface using professional equipment, removing dirt, oil stains, moss, and any previous failed sealer. Hairline cracks are addressed before sealing begins.",
    icon: "🧹",
  },
  {
    number: "03",
    title: "Premium Sealer Application",
    description:
      "Using professional sprayers and rollers, we apply an even, streak-free coat of premium sealer. Every application is inspected in real time for full coverage and proper penetration.",
    icon: "🎨",
  },
  {
    number: "04",
    title: "Quality Inspection & Warranty",
    description:
      "We walk through the finished work with you to ensure complete satisfaction. Your 5-year written warranty starts from this point — you're protected from day one.",
    icon: "✅",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {steps.map((step, i) => (
        <div key={step.number} className="relative">
          {i < steps.length - 1 && (
            <div
              className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[var(--border)] -translate-y-0.5 z-0"
              aria-hidden="true"
            />
          )}
          <div className="relative z-10 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-black text-sm shrink-0">
                {step.number}
              </div>
            </div>
            <h3 className="font-bold text-[var(--navy)] mb-2 text-base">{step.title}</h3>
            <p className="text-[var(--concrete)] text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
