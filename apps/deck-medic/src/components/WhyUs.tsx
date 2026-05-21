const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Quality Craftsmanship",
    desc: "We focus on the details — sanding the corners, replacing worn screws, and ensuring an even coat every time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: "Durable Protection",
    desc: "We use industrial-strength products designed to last through Southern Ontario's extreme temperature swings.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Local Expertise",
    desc: "We understand the specific needs of pressure-treated wood and cedar common in Canadian homes.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Hassle-Free Experience",
    desc: "From the initial estimate to the final walkthrough, we keep our job site clean and our communication clear.",
  },
];

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--blue)", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-blue-200">
            Why Homeowners Choose Us
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
            Deck Medic is the Preferred Choice
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-white/75">
            We take a surgical approach. 80% of our time is spent on preparation — because a finish is only as good as the prep beneath it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                {r.icon}
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-white">{r.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
