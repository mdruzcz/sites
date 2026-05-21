const steps = [
  {
    number: "01",
    title: "Free On-Site Assessment",
    description: "We visit your Brantford property to measure, check soil conditions, and discuss design options at no cost.",
  },
  {
    number: "02",
    title: "Site Preparation & Excavation",
    description: "We remove old surfacing and excavate to the proper depth to ensure a stable, frost-resistant base.",
  },
  {
    number: "03",
    title: "Forming & Reinforcement",
    description: "We install precise forms and lay wire mesh or rebar to reinforce the concrete against shifting and cracking.",
  },
  {
    number: "04",
    title: "Pouring & Finishing",
    description: "Our team pours high-PSI concrete and applies your chosen finish (stamped, broom, or smooth) with expert timing.",
  },
  {
    number: "05",
    title: "Curing & Cutting",
    description: "We apply cure-and-seal compounds and cut control joints to manage natural expansion and prevent random cracking.",
  },
  {
    number: "06",
    title: "Final Inspection",
    description: "We walk through the finished project with you to ensure total satisfaction and leave a spotless job site.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-extrabold text-xs">
            {step.number}
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-1">{step.title}</h3>
            <p className="text-sm text-[var(--concrete)] leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
