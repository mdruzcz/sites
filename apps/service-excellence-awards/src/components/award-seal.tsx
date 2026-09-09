// Decorative circular award seal used on winner profiles.
export function AwardSeal({ year = 2026, size = 132, className = "" }: { year?: number; size?: number; className?: string }) {
  const id = `seal-${year}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label={`${year} Service Excellence Award winner seal`}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9b25b" />
          <stop offset="50%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8a6508" />
        </linearGradient>
        <path id={`${id}-top`} d="M 80 80 m -56 0 a 56 56 0 0 1 112 0" fill="none" />
        <path id={`${id}-bot`} d="M 80 80 m 56 0 a 56 56 0 0 1 -112 0" fill="none" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke={`url(#${id}-g)`} strokeWidth="2" />
      <circle cx="80" cy="80" r="58" fill="none" stroke={`url(#${id}-g)`} strokeWidth="1" opacity="0.6" />
      <text fill="#8a6508" fontSize="11" letterSpacing="3" fontWeight="600">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">SERVICE EXCELLENCE</textPath>
      </text>
      <text fill="#8a6508" fontSize="11" letterSpacing="3" fontWeight="600">
        <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">AWARD · CANADA</textPath>
      </text>
      <g transform="translate(80 60)" fill={`url(#${id}-g)`}>
        <path d="M0 -16 L4.7 -5.6 L16 -4.9 L7.5 2.6 L10.3 13.5 L0 7.6 L-10.3 13.5 L-7.5 2.6 L-16 -4.9 L-4.7 -5.6 Z" />
      </g>
      <text x="80" y="92" textAnchor="middle" fill="#1c1917" fontSize="26" fontWeight="700" fontFamily="Georgia, serif">{year}</text>
      <text x="80" y="108" textAnchor="middle" fill="#8a6508" fontSize="10" letterSpacing="4" fontWeight="600">WINNER</text>
    </svg>
  );
}
