const steps = [
  {
    n: "01",
    title: "Snap & Send",
    text: "Take a couple of photos of your driveway, patio, or project area. Send them with a quick description through our quote form.",
  },
  {
    n: "02",
    title: "Free On-Site Quote",
    text: "We book a 20-minute site visit within 48 hours. You get a written, itemized quote — finish options, timing, and the warranty in writing.",
  },
  {
    n: "03",
    title: "Pour & Cure",
    text: "We prep, pour, finish, and clean up. Most driveways are ready to walk on in 24 hours and ready to drive on in 7 days. Warranty starts day one.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.n} className="card p-6 sm:p-8 relative">
          <div className="text-5xl font-extrabold text-[var(--accent)]/20 absolute top-4 right-5 leading-none">
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
