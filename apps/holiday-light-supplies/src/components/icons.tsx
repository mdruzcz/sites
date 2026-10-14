import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...rest }: P) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest
  };
}

export const Icon = {
  truck: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  tag: (p: P) => (
    <svg {...base(p)}>
      <path d="M20 12.5 12.5 20 4 11.5V4h7.5z" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </svg>
  ),
  invoice: (p: P) => (
    <svg {...base(p)}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 12h6M9 16h6" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  ),
  maple: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l1.6 3 2.4-1-.6 3 3.6-.6-1.8 2.6 2.8 1.4-3.2 1.4.8 2.6-3.4-.6L12 20l-2.2-5.2-3.4.6.8-2.6-3.2-1.4 2.8-1.4L5 7.4l3.6.6-.6-3 2.4 1z" />
    </svg>
  ),
  arrow: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base(p)}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  ),
  search: (p: P) => (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  ),
  cart: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 4h2.5l2 11h10l2-7H7" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="16" cy="19" r="1.4" />
    </svg>
  ),
  user: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  mail: (p: P) => (
    <svg {...base(p)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  menu: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: P) => (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  chevron: (p: P) => (
    <svg {...base(p)}>
      <path d="m7 10 5 5 5-5" />
    </svg>
  ),
  star: (p: P) => (
    <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
      <path d="m12 3 2.7 5.6 6.2.9-4.5 4.3 1.1 6.2L12 17l-5.5 3 1.1-6.2L3.1 9.5l6.2-.9z" />
    </svg>
  ),
  sparkle: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
  ),
  snowflake: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M12 3l-2 2M12 3l2 2M12 21l-2-2M12 21l2-2" />
    </svg>
  ),
  building: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 21V5l8-2v18M12 21V9l8 2v10M4 21h16" />
      <path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" />
    </svg>
  ),
  clock: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  box: (p: P) => (
    <svg {...base(p)}>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </svg>
  ),
  pole: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 21V4M12 4l4 2.5M12 7l4 2.5M12 10l4 2.5M9 21h6" />
    </svg>
  ),
  gift: (p: P) => (
    <svg {...base(p)}>
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
      <path d="M3.5 13h17M12 9v11M12 9c-2.5 0-4.5-1.3-4.5-3S9.5 3.5 12 6c2.5-2.5 4.5-1.2 4.5 0S14.5 9 12 9z" />
    </svg>
  ),
  bolt: (p: P) => (
    <svg {...base(p)}>
      <path d="M13 3 5 13h6l-1 8 8-10h-6z" />
    </svg>
  ),
  phone: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  quote: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 4h16v12H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  )
};

export type IconName = keyof typeof Icon;
