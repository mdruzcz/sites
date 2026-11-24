const BADGES: { label: string; note: string; color: string; icon: React.ReactNode }[] = [
  {
    label: "Ships from London, ON",
    note: "Same or next business day",
    color: "var(--color-green)",
    icon: (
      <path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    )
  },
  {
    label: "Installer-grade, sold direct",
    note: "No middleman markup",
    color: "var(--color-gold)",
    icon: <path d="M12 3 4.5 6v5.5c0 4.4 3 8 7.500 9.500 4.500-1.500 7.500-5.100 7.500-9.500V6L12 3Zm-3.200 9 2.300 2.300 4.300-4.600" />
  },
  {
    label: "Tested to −40°C",
    note: "Built for Canadian winters",
    color: "#3b74c9",
    icon: <path d="M12 2.500v19M4 7l16 10M20 7 4 17M9.500 4.500 12 7l2.500-2.500M9.500 19.500 12 17l2.500 2.500" />
  },
  {
    label: "Free shipping over $500",
    note: "Anywhere in Canada",
    color: "var(--color-red)",
    icon: <path d="M12 21s7-5.600 7-11.500a7 7 0 1 0-14 0C5 15.400 12 21 12 21Zm0-9a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Z" />
  }
];

/** Four reassurance points, each with its own coloured line icon. */
export function TrustStrip() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-16">
        {BADGES.map((b) => (
          <div key={b.label} className="reveal-sm text-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke={b.color}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
              aria-hidden
            >
              {b.icon}
            </svg>
            <p className="mt-4 text-[0.9375rem] font-bold leading-snug text-[var(--color-text)]">{b.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{b.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
