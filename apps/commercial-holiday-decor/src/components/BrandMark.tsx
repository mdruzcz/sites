interface BrandMarkProps {
  className?: string;
  /** Evergreen ring colour. */
  ring?: string;
  /** Gold star colour. */
  star?: string;
  title?: string;
}

/**
 * Commercial Holiday Decor monogram — an evergreen wreath ring with a gold
 * four-point star. Crisp down to ~24px. Colours are passed in so it can sit on
 * both the light header and the dark footer without a second asset.
 */
export function BrandMark({
  className = "",
  ring = "var(--color-green)",
  star = "var(--color-gold)",
  title = "Commercial Holiday Decor"
}: BrandMarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={title} fill="none">
      {/* Wreath ring, drawn as a dotted evergreen circle. */}
      <circle cx="20" cy="20" r="14.5" stroke={ring} strokeWidth="2.6" opacity="0.25" />
      <circle
        cx="20"
        cy="20"
        r="14.5"
        stroke={ring}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.2 6.6"
      />
      {/* Bow / berries hint at the base. */}
      <circle cx="20" cy="34.5" r="2.1" fill={ring} />
      {/* Gold star in the centre. */}
      <path
        d="M20 9.5l2.4 5.6 6 .5-4.6 3.9 1.5 5.9L20 28.1l-5.3 3.2 1.5-5.9-4.6-3.9 6-.5L20 9.5z"
        fill={star}
      />
    </svg>
  );
}
