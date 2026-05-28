import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="how" className="py-20 lg:py-28 bg-[var(--greige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            How It Works
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Our 5-step process
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            From the first quote to the final walk-through &mdash; exactly how every
            Spotless deck job runs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="bg-[var(--cream)] rounded-2xl p-6 border border-[var(--line)] shadow-warm"
            >
              <div className="text-5xl font-display font-extrabold text-[var(--terracotta)]/30 mb-3 leading-none">
                {s.step}
              </div>
              <h3 className="font-display text-lg font-bold mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--driftwood)]/75 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
