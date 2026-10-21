type Props = { id?: string; className?: string };

/** Inline SVG version of brand/resonate-mark.svg — sound wave resolving into pixels. */
export function ResonateMark({ id = "rl", className }: Props) {
  const g = `${id}-grad`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FF9A3C" />
          <stop offset="1" stopColor="#4CC9F0" />
        </linearGradient>
      </defs>
      <rect x="6" y="24" width="5" height="16" rx="2.5" fill={`url(#${g})`} />
      <rect x="14" y="14" width="5" height="36" rx="2.5" fill={`url(#${g})`} />
      <rect x="22" y="19" width="5" height="26" rx="2.5" fill={`url(#${g})`} />
      <circle cx="35" cy="20" r="2.2" fill={`url(#${g})`} opacity="0.55" />
      <circle cx="35" cy="32" r="2.6" fill={`url(#${g})`} opacity="0.7" />
      <circle cx="35" cy="44" r="2.2" fill={`url(#${g})`} opacity="0.55" />
      <circle cx="46" cy="20" r="2.8" fill={`url(#${g})`} opacity="0.8" />
      <circle cx="46" cy="32" r="3.2" fill={`url(#${g})`} opacity="0.9" />
      <circle cx="46" cy="44" r="2.8" fill={`url(#${g})`} opacity="0.8" />
      <circle cx="57" cy="20" r="3.2" fill={`url(#${g})`} />
      <circle cx="57" cy="32" r="3.6" fill={`url(#${g})`} />
      <circle cx="57" cy="44" r="3.2" fill={`url(#${g})`} />
    </svg>
  );
}
