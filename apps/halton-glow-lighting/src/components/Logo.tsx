/**
 * Halton Glow Lighting wordmark — gold gradient matching brand colors
 * #FFD884 (gold-bright) -> #F5C26B (gold) -> #E8A33D (amber)
 *
 * Inline SVG so it scales perfectly, never blurs, and always carries the
 * brand gold gradient without a PNG dependency.
 */
export function Logo({
  className = "h-10 lg:h-12 w-auto",
  ariaLabel = "Halton Glow Lighting",
}: {
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 280 56"
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD884" />
          <stop offset="55%" stopColor="#F5C26B" />
          <stop offset="100%" stopColor="#E8A33D" />
        </linearGradient>
      </defs>

      {/* Light bulb icon */}
      <g transform="translate(4 6)" fill="url(#hg-gold)">
        <path d="M22 0C11 0 4 8 4 18c0 6 3 11 8 14v4c0 1 1 2 2 2h16c1 0 2-1 2-2v-4c5-3 8-8 8-14C40 8 33 0 22 0zm-6 38v-2h12v2H16zm10-7v3H18v-3c-5-2-9-7-9-13 0-8 6-13 13-13s13 5 13 13c0 6-4 11-9 13z" />
        {/* Light filament rays */}
        <circle cx="22" cy="18" r="3.5" fill="#FFE5A8" />
        <path d="M22 7 v3 M22 26 v3 M11 18 h3 M30 18 h3" stroke="#FFE5A8" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Wordmark */}
      <text
        x="58"
        y="26"
        fill="url(#hg-gold)"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="-0.5"
      >
        HALTON GLOW
      </text>
      <text
        x="58"
        y="46"
        fill="#FFE5A8"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="500"
        fontSize="11"
        letterSpacing="3"
        opacity="0.75"
      >
        LIGHTING
      </text>
    </svg>
  );
}

/**
 * Compact variant for small spaces (favicon-style avatar)
 */
export function LogoMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Halton Glow Lighting"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hg-gold-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD884" />
          <stop offset="55%" stopColor="#F5C26B" />
          <stop offset="100%" stopColor="#E8A33D" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0A0E1F" />
      <g transform="translate(8 6)" fill="url(#hg-gold-mark)">
        <path d="M16 0C7 0 1 6 1 14c0 5 2 9 6 11v3c0 1 1 2 2 2h14c1 0 2-1 2-2v-3c4-2 6-6 6-11C31 6 25 0 16 0zm-4 30v-1h8v1h-8zm6-5v2H14v-2c-3-1-6-5-6-9 0-5 4-9 8-9s8 4 8 9c0 4-3 8-6 9z" />
        <circle cx="16" cy="14" r="2.5" fill="#FFE5A8" />
      </g>
    </svg>
  );
}
