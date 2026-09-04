const BADGES = [
  { label: "Ships from London, ON", note: "Same or next business day" },
  { label: "Installer-grade, sold direct", note: "No middleman markup" },
  { label: "Tested to −40°C", note: "Built for Canadian winters" },
  { label: "Ships across Canada", note: "Shipping quoted per order" }
];

export function TrustStrip() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="shell grid grid-cols-2 gap-x-8 gap-y-9 py-10 md:grid-cols-4 md:py-12">
        {BADGES.map((b) => (
          <div key={b.label} className="reveal-sm text-center md:text-left">
            <p className="text-sm font-semibold leading-snug text-[var(--color-text)]">{b.label}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">{b.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
