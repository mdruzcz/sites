const steps = [
  {
    n: "01",
    title: "Discovery Call",
    text: "Tell us about the venue, the event, the building, or the holiday vision. We listen for the moment you want to create — and the soundtrack you want it scored to.",
  },
  {
    n: "02",
    title: "Design + Sequence",
    text: "We map the pixels, draft the show, and storyboard the sequencing. You see a sample animation before we touch a single fixture.",
  },
  {
    n: "03",
    title: "Install + Light It Up",
    text: "Our crew installs IP67/IP68 hardware, loads the show, and trains your team on the app. For events, we operate live alongside the band or announcer.",
  },
];

export function StepProcess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.n} className="card p-7 relative overflow-hidden">
          <div
            className="text-5xl font-extrabold leading-none mb-4 gradient-text"
            aria-hidden="true"
          >
            {step.n}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
          <p className="text-muted-strong text-sm leading-relaxed">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
