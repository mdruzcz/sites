/**
 * Illumi wordmark: the amber moon from the original logo over serif capitals,
 * "Track Lights" spaced out beneath. `stacked` is the centred header version;
 * the inline version sits in the mobile bar and the footer.
 */
export function Logo({ className = "", stacked = false, onDark = false }: { className?: string; stacked?: boolean; onDark?: boolean }) {
  const word = onDark ? "text-white" : "text-[var(--color-ink)]";
  const sub = onDark ? "text-[var(--color-accent-bright)]" : "text-[var(--color-gold-text)]";
  const moon = (size: number) => (
    <svg aria-hidden width={size} height={size} viewBox="0 0 22 22" className="shrink-0">
      <circle cx="11" cy="11" r="9.5" fill="#e5a93c" />
      <circle cx="8" cy="8.5" r="2" fill="#c98f2c" opacity="0.55" />
      <circle cx="14.2" cy="13.6" r="1.5" fill="#c98f2c" opacity="0.5" />
      <circle cx="9.2" cy="15" r="0.9" fill="#c98f2c" opacity="0.45" />
    </svg>
  );
  if (stacked) {
    return (
      <span className={`inline-flex flex-col items-center leading-none ${className}`}>
        {moon(20)}
        <span style={{ fontFamily: "var(--font-display)" }} className={`mt-1 pl-[0.2em] text-[2.1rem] font-semibold tracking-[0.2em] ${word}`}>ILLUMI</span>
        <span className={`mt-1.5 pl-[0.42em] text-[0.62rem] font-semibold uppercase tracking-[0.42em] ${sub}`}>Track Lights</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 leading-none ${className}`}>
      {moon(22)}
      <span className="flex flex-col">
        <span style={{ fontFamily: "var(--font-display)" }} className={`text-[1.3rem] font-semibold tracking-[0.16em] ${word}`}>ILLUMI</span>
        <span className={`mt-[3px] text-[0.5rem] font-semibold uppercase tracking-[0.36em] ${sub}`}>Track Lights</span>
      </span>
    </span>
  );
}
