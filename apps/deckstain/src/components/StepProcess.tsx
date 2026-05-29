const steps = [
  {
    number: "01",
    title: "Submit Your Photos",
    description:
      "Fill out our contact form with your project details and location. After submitting, simply reply to our email with a few photos of your deck or fence.",
  },
  {
    number: "02",
    title: "Receive Your Quote",
    description:
      "We review your photos and assess the restoration level needed. You'll receive a detailed, itemized quote within 2 business days — no surprises.",
  },
  {
    number: "03",
    title: "We Complete the Work",
    description:
      "Our team arrives on schedule, completes the job with READY Seal® premium stains, and sends your final invoice by email once the work is done.",
  },
];

export default function StepProcess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <div key={step.number} className="relative">
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[var(--border)] z-0" style={{ width: "calc(100% - 4rem)", left: "calc(50% + 2rem)" }} />
          )}
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)] text-white font-bold text-xl font-[var(--font-montserrat)] mb-4 mx-auto md:mx-0">
              {step.number}
            </div>
            <h3 className="font-bold text-lg text-[var(--charcoal)] mb-3 font-[var(--font-montserrat)]">
              {step.title}
            </h3>
            <p className="text-[var(--concrete)] text-sm leading-relaxed normal-case font-normal">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
