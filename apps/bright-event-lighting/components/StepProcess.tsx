import { CalendarCheck, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "1. Check Your Date",
    description: "Tell us the date, the venue or address, and what you're picturing: a wedding, a gala, a holiday party, a storefront.",
  },
  {
    icon: Send,
    title: "2. Get a Flat-Rate Quote",
    description: "We confirm availability and send a package recommendation with one all-inclusive price within 4 business hours.",
  },
  {
    icon: CheckCircle,
    title: "3. We Install, You Enjoy",
    description: "Our crew sets up before guests arrive, runs the lighting live where a technician is included, and takes everything down after.",
  },
];

export function StepProcess() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step) => (
        <div key={step.title} className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
            <step.icon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{step.title}</h3>
          <p className="text-[var(--muted)] text-sm leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
