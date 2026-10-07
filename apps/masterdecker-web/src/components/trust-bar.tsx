const items = [
  { label: "Since 2014", sub: "10+ years in SW Ontario" },
  { label: "WSIB + Fully Insured", sub: "Documentation on request" },
  { label: "Free Written Quotes", sub: "No surprises, ever" },
  { label: "Workmanship Guarantee", sub: "We stand behind our work" },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--ink)] text-white">
      <div className="container grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 px-4 py-4">
            <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-bold text-sm leading-tight">{it.label}</div>
              <div className="text-xs text-white/60">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
