import type { CSSProperties } from "react";

// Service Excellence Awards — 2026 Winner badge. Links back to our award profile.
// Self-contained: inline styles only, no external CSS or dependencies.
export function AwardBadge({ style }: { style?: CSSProperties }) {
  const AWARD_URL = "https://serviceexcellenceawards.ca/winners/toronto/permanent-outdoor-lighting/ontario-light-shows-2026";
  const CATEGORY = "Permanent Outdoor Lighting";
  const CITY = "Toronto";
  return (
    <a
      href={AWARD_URL}
      target="_blank"
      rel="noopener"
      aria-label={`2026 Service Excellence Award Winner — Best ${CATEGORY} in ${CITY}. View our verified award profile.`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 18px 10px 12px",
        borderRadius: "12px",
        border: "1px solid rgba(184,134,11,0.4)",
        background: "#ffffff",
        textDecoration: "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      <svg width="46" height="46" viewBox="0 0 160 160" aria-hidden="true" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="seab-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9b25b" />
            <stop offset="50%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#8a6508" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="76" fill="none" stroke="url(#seab-g)" strokeWidth="3" />
        <circle cx="80" cy="80" r="62" fill="none" stroke="url(#seab-g)" strokeWidth="1.5" opacity="0.6" />
        <g transform="translate(80 58)" fill="url(#seab-g)">
          <path d="M0 -18 L5.3 -6.3 L18 -5.5 L8.4 2.9 L11.6 15.2 L0 8.6 L-11.6 15.2 L-8.4 2.9 L-18 -5.5 L-5.3 -6.3 Z" />
        </g>
        <text x="80" y="98" textAnchor="middle" fill="#1c1917" fontSize="30" fontWeight="700" fontFamily="Georgia, serif">2026</text>
        <text x="80" y="118" textAnchor="middle" fill="#8a6508" fontSize="12" letterSpacing="5" fontWeight="600">WINNER</text>
      </svg>
      <span style={{ lineHeight: 1.3 }}>
        <span style={{ display: "block", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a6508", fontWeight: 600 }}>2026 Winner</span>
        <span style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1c1917" }}>Service Excellence Award</span>
        <span style={{ display: "block", fontSize: "12px", color: "#6b7280" }}>Best {CATEGORY} · {CITY}</span>
      </span>
    </a>
  );
}
