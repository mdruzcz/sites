type Props = {
  className?: string;
};

// A higher-detail SVG render of the White Shaker door style — center panel,
// shaker rail/stile frame, brass pull, hinge cup. Used on /our-cabinets.
export function DoorIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 480"
      className={className}
      role="img"
      aria-label="White Shaker cabinet door — center recessed panel with brass bar pull"
    >
      <defs>
        <linearGradient id="door-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f3ec" />
        </linearGradient>
        <linearGradient id="panel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ede3" />
          <stop offset="100%" stopColor="#ebe2d2" />
        </linearGradient>
        <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4b06b" />
          <stop offset="60%" stopColor="#c5a059" />
          <stop offset="100%" stopColor="#a8853e" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="480" fill="#e0d2c3" />

      {/* Door body */}
      <rect
        x="40"
        y="30"
        width="240"
        height="420"
        fill="url(#door-fill)"
        stroke="#0d1b2a"
        strokeWidth="1.5"
      />

      {/* Shaker frame (rail/stile) — recessed center panel */}
      <rect
        x="68"
        y="58"
        width="184"
        height="364"
        fill="url(#panel-fill)"
        stroke="#c8b8a6"
        strokeWidth="1"
      />
      {/* Inner shadow line — gives the "recessed" look */}
      <path
        d="M 68 58 L 68 422 L 72 418 L 72 62 L 248 62 L 252 58 Z"
        fill="#0d1b2a"
        opacity="0.06"
      />
      <path
        d="M 252 58 L 248 62 L 248 418 L 252 422 L 252 58 Z"
        fill="#ffffff"
        opacity="0.4"
      />

      {/* Bar pull (brass) */}
      <rect
        x="208"
        y="230"
        width="56"
        height="6"
        rx="2"
        fill="url(#brass)"
        stroke="#7d6024"
        strokeWidth="0.5"
      />
      <rect x="214" y="234" width="4" height="14" fill="#7d6024" opacity="0.5" />
      <rect x="254" y="234" width="4" height="14" fill="#7d6024" opacity="0.5" />

      {/* Hinge cup marks (subtle, left edge) */}
      <circle cx="56" cy="90" r="6" fill="none" stroke="#0d1b2a" strokeWidth="0.5" opacity="0.3" />
      <circle cx="56" cy="390" r="6" fill="none" stroke="#0d1b2a" strokeWidth="0.5" opacity="0.3" />

      {/* Subtle wood-edge highlight */}
      <line x1="40" y1="30" x2="280" y2="30" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
