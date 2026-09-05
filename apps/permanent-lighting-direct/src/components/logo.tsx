/** Wordmark with a small roofline mark. Inherits currentColor so it works on ink or paper. */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg aria-hidden width="34" height="34" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <path d="M6 22 20 9l14 13" stroke="var(--color-accent-bright)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9.5" cy="27" r="2.2" fill="#ef4444" />
        <circle cx="14.75" cy="27" r="2.2" fill="#facc15" />
        <circle cx="20" cy="27" r="2.2" fill="#22c55e" />
        <circle cx="25.25" cy="27" r="2.2" fill="#3b82f6" />
        <circle cx="30.5" cy="27" r="2.2" fill="#a855f7" />
        <path d="M10 33h20" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="font-display leading-none">
          <span className="block text-[1.05rem] font-bold tracking-tight md:text-[1.2rem]">Permanent Lighting</span>
          <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent-bright)]">Direct</span>
        </span>
      )}
    </span>
  );
}
