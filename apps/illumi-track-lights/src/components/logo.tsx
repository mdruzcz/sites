/** Illumi wordmark: heavy lettering with the amber moon from the logo. Inherits currentColor. */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className}`}>
      <span className="relative inline-block">
        <svg aria-hidden width="30" height="30" viewBox="0 0 30 30" className="absolute -top-4 left-1/2 -translate-x-1/2">
          <defs>
            <radialGradient id="illumi-moon" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#f6d693" />
              <stop offset="0.6" stopColor="#e5a93c" />
              <stop offset="1" stopColor="#b3801f" />
            </radialGradient>
          </defs>
          <circle cx="15" cy="15" r="11" fill="url(#illumi-moon)" />
          <circle cx="11" cy="12" r="2.2" fill="#c98f2c" opacity="0.5" />
          <circle cx="19" cy="18" r="1.6" fill="#c98f2c" opacity="0.45" />
        </svg>
        <span className="font-display block text-[1.7rem] font-bold leading-none tracking-[-0.04em] md:text-[1.9rem]">Illumi</span>
      </span>
      {!compact && <span className="mb-[3px] text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-bright)]">Track Lights</span>}
    </span>
  );
}
