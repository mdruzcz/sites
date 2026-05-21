const steps = [
  {
    num: "01",
    title: "Inspection",
    desc: "We evaluate the wood's condition, check for rot and structural issues, and recommend the right treatment plan.",
  },
  {
    num: "02",
    title: "Preparation",
    desc: "Deep cleaning and power washing to strip away dirt, old stains, mold, and contaminants. We wait 48–72 hours for proper drying.",
  },
  {
    num: "03",
    title: "Restoration",
    desc: "Multi-stage sanding opens the wood grain for maximum stain absorption and eliminates splinters.",
  },
  {
    num: "04",
    title: "Application",
    desc: "Expert staining or sealing using the best products in the industry, hand-brushed for even, thorough penetration.",
  },
  {
    num: "05",
    title: "Completion",
    desc: "A final inspection ensures every inch of your deck looks brand new. We don't leave until you're happy.",
  },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            How It Works
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "var(--slate)" }}
          >
            Our Proven 5-Step Process
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--slate-muted)" }}>
            Every project follows the same disciplined process — no shortcuts, no skipped steps.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 mx-[10%]"
            style={{ background: "var(--light-grey)" }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10 font-display text-2xl font-extrabold border-4"
                  style={{
                    background: i === 0 ? "var(--blue)" : "var(--white)",
                    borderColor: "var(--blue)",
                    color: i === 0 ? "white" : "var(--blue)",
                  }}
                >
                  {s.num}
                </div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "var(--slate)" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
