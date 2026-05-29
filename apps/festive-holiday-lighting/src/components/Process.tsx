const steps = [
  {
    number: "01",
    title: "Free Quote & Design",
    body: "We talk with you about your vision, measure your home or business, and provide a detailed quote. No obligation, no pressure. Most quotes are ready within 24 hours.",
  },
  {
    number: "02",
    title: "Professional Installation",
    body: "Our insured, WSIB-compliant crew arrives on schedule with all materials. We install safely and efficiently — most residential installs are done in a day.",
  },
  {
    number: "03",
    title: "Mid-Season Maintenance",
    body: "We check your display mid-season to fix any outages or adjustments. Your lights stay bright and beautiful from the first switch-on to New Year's.",
  },
  {
    number: "04",
    title: "Takedown & Storage",
    body: "After the season, we carefully remove and store everything — labelled and organized for next year. You do nothing except enjoy the holidays.",
  },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--midnight)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            How It Works
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Simple Process,{" "}
            <span className="text-gradient-gold">Stunning Results</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Four steps from first call to fully lit. We handle every detail so you can focus on the holidays.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.3) 80%, transparent)" }}
          />

          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center px-2">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center font-display text-xl font-extrabold relative z-10"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))"
                    : "linear-gradient(135deg, var(--gold-bright), var(--gold))",
                  color: i % 2 === 0 ? "#fff" : "#0A0A14",
                  boxShadow: i % 2 === 0
                    ? "0 4px 24px rgba(178,34,34,0.5)"
                    : "0 4px 24px rgba(201,168,76,0.4)",
                }}
              >
                {step.number}
              </div>
              <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
            style={{
              background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
              boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
            }}
          >
            Start with a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
