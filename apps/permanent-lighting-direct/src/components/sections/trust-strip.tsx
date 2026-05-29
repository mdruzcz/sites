export function TrustStrip() {
  const badges = [
    { icon: "⚡", label: "DIY from $9/ft" },
    { icon: "🍁", label: "Ships from London, ON" },
    { icon: "❄️", label: "Tested to -40°C" },
    { icon: "🚚", label: "Free shipping over $500" }
  ];
  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[var(--color-border)] md:grid-cols-4">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-2 bg-white px-4 py-5 text-sm">
            <span aria-hidden className="text-lg">{b.icon}</span>
            <span className="font-medium text-slate-700">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
