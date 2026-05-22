const steps = [
  {
    number: "01",
    title: "On-Site Assessment",
    description: "We analyze your soil conditions, drainage patterns, and slope to determine the best wall solution.",
  },
  {
    number: "02",
    title: "Professional Design",
    description: "A detailed plan including material selection, wall height, and drainage design tailored to your property.",
  },
  {
    number: "03",
    title: "The Deep Base Build",
    description: "We excavate to the correct depth, compact the granular base, and install drainage before any stone is placed.",
  },
  {
    number: "04",
    title: "Full Site Restoration",
    description: "We don't just leave a wall — we leave a clean, finished yard with proper grading and landscaping prep.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {steps.map((step) => (
        <div key={step.number} className="relative">
          <div className="text-4xl font-extrabold text-[var(--accent)]/20 mb-2">{step.number}</div>
          <h3 className="font-bold text-sm uppercase tracking-wide text-white mb-2">{step.title}</h3>
          <p className="text-sm text-[var(--concrete-200)] leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
