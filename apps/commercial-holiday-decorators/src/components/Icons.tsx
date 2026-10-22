import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const Icon = {
  Phone: (p: P) => (
    <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
  ),
  Mail: (p: P) => (
    <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  Pin: (p: P) => (
    <svg {...base(p)}><path d="M12 22s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  Clock: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  Shield: (p: P) => (
    <svg {...base(p)}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  Snow: (p: P) => (
    <svg {...base(p)}><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /></svg>
  ),
  App: (p: P) => (
    <svg {...base(p)}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
  ),
  Palette: (p: P) => (
    <svg {...base(p)}><path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2v-1a2 2 0 0 1 2-2h1a4 4 0 0 0 4-4 9 9 0 0 0-9-9Z" /><circle cx="7.5" cy="11.5" r="1" /><circle cx="10.5" cy="7.5" r="1" /><circle cx="15.5" cy="7.5" r="1" /></svg>
  ),
  Eye: (p: P) => (
    <svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Bolt: (p: P) => (
    <svg {...base(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
  ),
  Home: (p: P) => (
    <svg {...base(p)}><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" /></svg>
  ),
  Camera: (p: P) => (
    <svg {...base(p)}><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></svg>
  ),
  Sparkle: (p: P) => (
    <svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /><circle cx="12" cy="12" r="2.5" /></svg>
  ),
  Check: (p: P) => (
    <svg {...base(p)}><path d="m5 12 4 4L19 7" /></svg>
  ),
  Arrow: (p: P) => (
    <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  Star: (p: P) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.5 7-6.3-3.6L5.7 21l1.5-7L2 9.3l7-.8L12 2Z" /></svg>
  ),
  Calendar: (p: P) => (
    <svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  ),
  Wrench: (p: P) => (
    <svg {...base(p)}><path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 1-2-2Z" /></svg>
  ),
  Users: (p: P) => (
    <svg {...base(p)}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.5" /></svg>
  ),
  Building: (p: P) => (
    <svg {...base(p)}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></svg>
  ),
  Lamp: (p: P) => (
    <svg {...base(p)}><path d="M9 21h6M12 17v4M6 13a6 6 0 1 1 12 0c0 2-1.5 3-2 4H8c-.5-1-2-2-2-4Z" /></svg>
  ),
  Ruler: (p: P) => (
    <svg {...base(p)}><path d="m3 17 14-14 4 4L7 21l-4-4Z" /><path d="m8 8 2 2M11 5l2 2M14 11l2 2M5 11l2 2" /></svg>
  ),
  X: (p: P) => (
    <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
  ),
  Menu: (p: P) => (
    <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  Chevron: (p: P) => (
    <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
  ),
  Upload: (p: P) => (
    <svg {...base(p)}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>
  ),
  Instagram: (p: P) => (
    <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  ),
  Google: (p: P) => (
    <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9l3.3-2.5Z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
