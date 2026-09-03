// Minimal 24px stroke icon set (replaces emoji). All decorative by default.
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  phone: (p: P) => (
    <Base {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></Base>
  ),
  mail: (p: P) => (
    <Base {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Base>
  ),
  clock: (p: P) => (
    <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>
  ),
  pin: (p: P) => (
    <Base {...p}><path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Z" /><circle cx="12" cy="10" r="2.5" /></Base>
  ),
  smartphone: (p: P) => (
    <Base {...p}><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18h2" /></Base>
  ),
  eyeOff: (p: P) => (
    <Base {...p}><path d="M3 3l18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.1A10 10 0 0 1 12 5c5 0 9 4 10 7a11 11 0 0 1-2.4 3.6" /><path d="M6.6 6.6C4.3 8 2.7 10 2 12c1 3 5 7 10 7a9.7 9.7 0 0 0 4.4-1" /></Base>
  ),
  snowflake: (p: P) => (
    <Base {...p}><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /></Base>
  ),
  bolt: (p: P) => (
    <Base {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Base>
  ),
  shield: (p: P) => (
    <Base {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></Base>
  ),
  card: (p: P) => (
    <Base {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></Base>
  ),
  wrench: (p: P) => (
    <Base {...p}><path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9Z" /><path d="M14.7 6.3 18 3" /></Base>
  ),
  building: (p: P) => (
    <Base {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></Base>
  ),
  home: (p: P) => (
    <Base {...p}><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /></Base>
  ),
  sparkles: (p: P) => (
    <Base {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></Base>
  ),
  palette: (p: P) => (
    <Base {...p}><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="14.5" cy="7.5" r="1" /></Base>
  ),
  check: (p: P) => (
    <Base {...p}><path d="m5 12 5 5 9-10" /></Base>
  ),
  arrow: (p: P) => (
    <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>
  ),
  chevron: (p: P) => (
    <Base {...p}><path d="m6 9 6 6 6-6" /></Base>
  ),
  play: (p: P) => (
    <Base {...p}><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></Base>
  ),
  file: (p: P) => (
    <Base {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></Base>
  ),
  book: (p: P) => (
    <Base {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></Base>
  ),
  video: (p: P) => (
    <Base {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></Base>
  ),
  download: (p: P) => (
    <Base {...p}><path d="M12 4v11M7 10l5 5 5-5M4 19h16" /></Base>
  ),
  star: (p: P) => (
    <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5Z" /></svg>
  ),
  menu: (p: P) => (
    <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>
  ),
  close: (p: P) => (
    <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>
  ),
  ruler: (p: P) => (
    <Base {...p}><path d="m3 17 14-14 4 4L7 21l-4-4Z" /><path d="m7 13 2 2M10 10l2 2M13 7l2 2" /></Base>
  ),
  calendar: (p: P) => (
    <Base {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Base>
  ),
  wifi: (p: P) => (
    <Base {...p}><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.5" r="1" fill="currentColor" /></Base>
  ),
  leaf: (p: P) => (
    <Base {...p}><path d="M20 4c-8 0-14 4-14 12 0 2 .5 3 1 4 4-5 8-7 12-8-4 2-7 5-9 9 8 1 12-5 10-17Z" /></Base>
  ),
  headset: (p: P) => (
    <Base {...p}><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19a3 3 0 0 1-3 2h-3" /></Base>
  ),
};

export type IconName = keyof typeof Icon;
