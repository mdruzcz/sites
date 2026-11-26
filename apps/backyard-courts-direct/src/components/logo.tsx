import { site } from "@/lib/site";

/**
 * Brand mark. Two drawings, picked in site.ts:
 *  - "court": a badge with a basketball key and arc seen from above
 *  - "tiles": four interlocking tiles, one snapping into place
 */
export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  if (site.logo.mark === "tiles") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className={className}>
        <rect width="40" height="40" rx="10" fill="var(--ink-deep)" />
        <rect x="7" y="7" width="11.5" height="11.5" rx="2.6" fill="var(--accent)" />
        <rect x="7" y="21.5" width="11.5" height="11.5" rx="2.6" fill="var(--accent)" />
        <rect x="21.5" y="21.5" width="11.5" height="11.5" rx="2.6" fill="var(--accent)" />
        <rect x="22.6" y="5.4" width="11.5" height="11.5" rx="2.6" fill="var(--cta-from)" transform="rotate(9 28.3 11.1)" />
        <path d="M18.5 12.7h3M12.7 18.5v3M18.5 27.2h3" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className={className}>
      <rect width="40" height="40" rx="10" fill="var(--accent)" />
      <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="8" width="26" height="24" rx="2.5" />
        <path d="M15 8v9.5h10V8" />
        <path d="M15 17.5a5 5 0 0 0 10 0" />
        <path d="M9.5 8.2c.6 9.8 4.6 15.8 10.5 15.8s9.9-6 10.5-15.8" />
      </g>
      <circle cx="20" cy="11.4" r="1.5" fill="#fff" />
    </svg>
  );
}

/** Mark plus wordmark. `tone="light"` is for dark backgrounds such as the footer. */
export function Logo({ tone = "auto", className = "" }: { tone?: "auto" | "light"; className?: string }) {
  const l = site.logo;
  return (
    <span className={`logo ${tone === "light" ? "logo-light" : ""} ${className}`}>
      <LogoMark className="logo-mark" />
      <span className="logo-text">
        <span className="logo-line1">
          {l.line1}
          {l.inlineAccent && <span className="logo-accent">{l.inlineAccent}</span>}
        </span>
        {l.line2 && <span className="logo-line2">{l.line2}</span>}
      </span>
    </span>
  );
}
