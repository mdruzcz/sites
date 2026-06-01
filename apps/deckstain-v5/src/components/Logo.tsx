export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const text = tone === "light" ? "#ffffff" : "#1a1f1b";
  return (
    <span className="inline-flex items-center gap-2" aria-label="DeckStain.ca">
      <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--green)]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="14" height="2.3" rx="1.15" fill="#fff" opacity=".95" />
          <rect x="3" y="9" width="14" height="2.3" rx="1.15" fill="#fff" opacity=".8" />
          <rect x="3" y="13" width="14" height="2.3" rx="1.15" fill="#fff" opacity=".62" />
        </svg>
      </span>
      <span className="font-extrabold text-[1.2rem] tracking-tight" style={{ fontFamily: "var(--font-head)", color: text }}>
        Deck<span style={{ color: "var(--wood)" }}>Stain</span>
      </span>
    </span>
  );
}
