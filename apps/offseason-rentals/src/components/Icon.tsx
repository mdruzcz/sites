import type { SVGProps } from "react";

/**
 * Inline stroke icons at a consistent 24×24 grid. Kept in one file so the
 * whole set shares a stroke weight — mixing icon libraries is the fastest way
 * to make a clean layout look untidy.
 */
const PATHS: Record<string, string> = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  bed: "M3 7v11M3 12h18v6M21 18v-5a3 3 0 0 0-3-3h-7v5M7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 2-2h.5M7 19l-1 2M17 19l1 2",
  users: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19v-1a4 4 0 0 0-3-3.87M16.5 3.5a3.5 3.5 0 0 1 0 6.9",
  wifi: "M5 12.5a10 10 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0M12 19.5h.01M2 9a15 15 0 0 1 20 0",
  car: "M5 17h14M6.5 17v2M17.5 17v2M4 13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v4H4v-4ZM4 13h16M7.5 15h.01M16.5 15h.01",
  paw: "M6.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10 8a1.8 1.8 0 1 0 0-3.5A1.8 1.8 0 0 0 10 8ZM14 8a1.8 1.8 0 1 0 0-3.5A1.8 1.8 0 0 0 14 8ZM8 15.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5c0 2-1.5 3.5-4 3.5s-4-1.5-4-3.5Z",
  snow: "M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M12 6l2.5-2.5M12 6L9.5 3.5M12 18l2.5 2.5M12 18l-2.5 2.5",
  waves: "M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2",
  flame: "M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.5-4 .2 1.2 1 2 2 2 .8 0 1.5-.7 1.5-1.8C12 6.6 12 4.8 12 3Z",
  chevronDown: "M6 9l6 6 6-6",
  chevronLeft: "M15 5l-7 7 7 7",
  chevronRight: "M9 5l7 7-7 7",
  arrowRight: "M4 12h15M13 6l6 6-6 6",
  phone: "M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  check: "M4 12.5l5 5L20 6.5",
  mapPin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  home: "M4 11l8-7 8 7M6 10v10h12V10",
  ruler: "M4 14.5L14.5 4l5.5 5.5L9.5 20zM8 8.5l1.5 1.5M11 5.5L12.5 7M5.5 11l1.5 1.5",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z",
  upload: "M12 16V4M8 8l4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  trash: "M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6",
  link: "M9.5 14.5a4 4 0 0 1 0-5.7l2.8-2.8a4 4 0 1 1 5.7 5.7l-1.4 1.4M14.5 9.5a4 4 0 0 1 0 5.7l-2.8 2.8a4 4 0 1 1-5.7-5.7l1.4-1.4",
  plus: "M12 5v14M5 12h14",
  drag: "M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z",
  shield: "M12 3l8 3v6c0 4.6-3.3 8-8 9-4.7-1-8-4.4-8-9V6zM9 12l2 2 4-4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  key: "M14.5 4a5.5 5.5 0 1 0-4.4 8.8L4 19v3h3v-2h2v-2h2l1.6-1.6A5.5 5.5 0 0 0 14.5 4ZM16 8.5h.01",
  laptop: "M5 6h14v9H5zM3 18h18l-1.5-3H4.5z",
  stethoscope: "M6 3v5a4 4 0 0 0 8 0V3M6 3H4.5M14 3h1.5M10 12v2a5 5 0 0 0 10 0v-1M20 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  hardhat: "M4 17h16v2H4zM6 17V12a6 6 0 0 1 12 0v5M10 6.5V4h4v2.5",
  hammer: "M14 6l4-2 2 2-2 4-4-4ZM12.5 7.5L4 16v4h4l8.5-8.5",
  boxes: "M3 8h8v8H3zM13 8h8v8h-8zM7 8V4h10v4",
  book: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4ZM5 17h14",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14",
  anchor: "M12 8v13M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 13a8 8 0 0 0 16 0M4 13h3M20 13h-3",
  sofa: "M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 12h18v6H3zM6 18v2M18 18v2",
  desk: "M3 5h18v3H3zM5 8v11M19 8v11M9 12h6",
  door: "M6 3h12v18H6zM14 12h.01",
  filter: "M4 6h16M7 12h10M10 18h4"
};

export type IconName = keyof typeof PATHS | string;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  /** Strokes at 1.6 by default — 2 reads heavy at 16px. */
  strokeWidth?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }: IconProps) {
  const d = PATHS[name] ?? PATHS.check;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}

export const hasIcon = (name: string) => name in PATHS;
