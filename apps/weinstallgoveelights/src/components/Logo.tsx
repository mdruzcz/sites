interface LogoProps {
  className?: string;
  /** "full" shows icon + wordmark, "icon" shows icon only */
  variant?: "full" | "icon";
}

export default function Logo({ className = "", variant = "full" }: LogoProps) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="We Install Govee Lights icon"
      >
        <defs>
          <linearGradient id="ledGrad-icon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="glow-icon">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* House body */}
        <rect x="8" y="24" width="32" height="18" rx="1.5" fill="#1E1B4B" />
        {/* Roof */}
        <path d="M4 26 L24 8 L44 26" stroke="#4C1D95" strokeWidth="2" fill="none" strokeLinejoin="round" />
        {/* LED strip along roofline */}
        <path d="M6 25 L24 9 L42 25" stroke="url(#ledGrad-icon)" strokeWidth="2.5" fill="none" strokeLinejoin="round" filter="url(#glow-icon)" />
        {/* LED dots */}
        {[
          { cx: 9, cy: 23 }, { cx: 13.5, cy: 18.5 }, { cx: 18, cy: 14 },
          { cx: 24, cy: 9.5 }, { cx: 30, cy: 14 }, { cx: 34.5, cy: 18.5 }, { cx: 39, cy: 23 }
        ].map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r="1.8"
            fill={`hsl(${260 - i * 18}, 90%, 72%)`}
            filter="url(#glow-icon)"
          />
        ))}
        {/* Door */}
        <rect x="20" y="33" width="8" height="9" rx="1" fill="#2D1B69" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="We Install Govee Lights"
      role="img"
    >
      <defs>
        <linearGradient id="ledGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#67E8F9" />
        </linearGradient>
        <filter id="ledGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Icon (house + LED roofline) ── */}
      {/* House body */}
      <rect x="4" y="28" width="44" height="22" rx="2" fill="#1E1B4B" />
      {/* Roof outline */}
      <path d="M2 30 L26 6 L50 30" stroke="#312E81" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* LED strip — glowing */}
      <path d="M4 29 L26 7 L48 29" stroke="url(#ledGrad)" strokeWidth="3" fill="none"
        strokeLinecap="round" strokeLinejoin="round" filter="url(#ledGlow)" />
      {/* LED bulb dots */}
      {[
        { cx: 6, cy: 27, hue: 265 },
        { cx: 11, cy: 21, hue: 255 },
        { cx: 16, cy: 15.5, hue: 245 },
        { cx: 21, cy: 10.5, hue: 235 },
        { cx: 26, cy: 7, hue: 220 },
        { cx: 31, cy: 10.5, hue: 210 },
        { cx: 36, cy: 15.5, hue: 200 },
        { cx: 41, cy: 21, hue: 195 },
        { cx: 46, cy: 27, hue: 190 },
      ].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2.2"
          fill={`hsl(${d.hue}, 85%, 72%)`}
          filter="url(#dotGlow)"
        />
      ))}
      {/* Door */}
      <rect x="22" y="38" width="8" height="12" rx="1.5" fill="#2D1B69" />
      {/* Window */}
      <rect x="10" y="33" width="8" height="7" rx="1" fill="#4C1D95" opacity="0.8" />
      <rect x="34" y="33" width="8" height="7" rx="1" fill="#4C1D95" opacity="0.8" />

      {/* ── Wordmark ── */}
      {/* "WE INSTALL" — small, light */}
      <text
        x="60"
        y="22"
        fontFamily="system-ui, -apple-system, 'Helvetica Neue', sans-serif"
        fontWeight="400"
        fontSize="11"
        letterSpacing="3"
        fill="#A78BFA"
      >
        WE INSTALL
      </text>

      {/* "GOVEE LIGHTS" — bold, gradient */}
      <text
        x="60"
        y="42"
        fontFamily="system-ui, -apple-system, 'Helvetica Neue', sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="1"
        fill="url(#textGrad)"
      >
        GOVEE LIGHTS
      </text>

      {/* Thin accent underline */}
      <rect x="60" y="46" width="176" height="1.5" rx="1" fill="url(#ledGrad)" opacity="0.6" />
    </svg>
  );
}
