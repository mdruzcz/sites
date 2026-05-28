export function Logo({
  className = "h-10 lg:h-12 w-auto",
  ariaLabel = "Spotless Deck Staining",
  variant = "dark",
}: {
  className?: string;
  ariaLabel?: string;
  variant?: "dark" | "light";
}) {
  const wordColor = variant === "dark" ? "#332E26" : "#FAF8F3";
  const subColor  = variant === "dark" ? "#4A4238" : "#E5E5E1";
  const drop      = "#B07D62";
  return (
    <svg
      viewBox="0 0 300 56"
      role="img"
      aria-label={ariaLabel}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Deck plank + droplet mark */}
      <g transform="translate(4 8)">
        <rect x="0"  y="14" width="42" height="6" rx="1.5" fill={drop} opacity="0.85" />
        <rect x="0"  y="22" width="42" height="6" rx="1.5" fill={drop} opacity="0.6" />
        <rect x="0"  y="30" width="42" height="6" rx="1.5" fill={drop} opacity="0.4" />
        {/* Droplet */}
        <path d="M21 0 C 27 8, 30 12, 30 17 C 30 21, 26 25, 21 25 C 16 25, 12 21, 12 17 C 12 12, 15 8, 21 0 Z" fill={drop} />
        <ellipse cx="19" cy="14" rx="2" ry="3.5" fill="#FAF8F3" opacity="0.55" />
      </g>

      <text
        x="56"
        y="26"
        fill={wordColor}
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="-0.3"
      >
        SPOTLESS
      </text>
      <text
        x="56"
        y="46"
        fill={subColor}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="500"
        fontSize="11"
        letterSpacing="2.5"
        opacity={variant === "dark" ? "0.7" : "0.85"}
      >
        DECK STAINING
      </text>
    </svg>
  );
}
