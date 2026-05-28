import type { ReactNode } from "react";

type IconKey = "fence" | "deck" | "concrete" | "boat" | "spray" | "pergola" | "gazebo" | "wall" | "driveway" | "heated" | "stamp" | "walkway" | "turf" | "rail";

const paths: Record<IconKey, ReactNode> = {
  fence: <g><path d="M4 7L7 4v16M10 9l3-3v14M16 7l3-3v16" /><path d="M2 11h20M2 16h20" /></g>,
  deck: <g><path d="M3 5h18v3H3zM3 10h18v3H3zM3 15h18v3H3z" /><path d="M5 18v3M19 18v3" /></g>,
  concrete: <g><path d="M3 7h18v10H3z" /><path d="M3 11h18M7 7v10M11 7v10M15 7v10M19 7v10" /></g>,
  boat: <g><path d="M2 18s2 2 5 2c3 0 5-2 10-2s5 2 5 2" /><path d="M4 14l8-9 8 9" /></g>,
  spray: <g><circle cx="6" cy="6" r="2" /><path d="M8 8l10 10M14 14l4-4M16 16l3-3" /></g>,
  pergola: <g><path d="M4 6h16M5 6v14M19 6v14" /><path d="M4 10h16M4 14h16" /></g>,
  gazebo: <g><path d="M2 10L12 3l10 7" /><path d="M5 10v11M19 10v11M5 14h14" /></g>,
  wall: <g><path d="M3 6h6v4H3zM9 10h6v4H9zM15 6h6v4h-6zM3 14h6v4H3zM15 14h6v4h-6z" /></g>,
  driveway: <g><path d="M3 4l6 16M21 4l-6 16M3 4h18" /><path d="M7 8h10M5 12h14M7 16h10" /></g>,
  heated: <g><path d="M12 3v18M5 7c2 2 5 2 7 0s5-2 7 0M5 12c2 2 5 2 7 0s5-2 7 0M5 17c2 2 5 2 7 0s5-2 7 0" /></g>,
  stamp: <g><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /></g>,
  walkway: <g><path d="M4 4l4 4M12 4l4 4M20 4l-4 4M4 12l4 4M12 12l4 4M20 12l-4 4M4 20l4-4M12 20l4-4M20 20l-4-4" /></g>,
  turf: <g><path d="M3 20v-3l4-4 4 4 4-4 4 4 2-2v5z" /><path d="M5 13v-4M9 11v-5M13 9v-3M17 11v-4M21 13v-3" /></g>,
  rail: <g><path d="M3 5h18M3 11h18M3 17h18M6 5v12M18 5v12" /></g>,
};

export function ServiceIcon({ icon, className = "w-10 h-10" }: { icon: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
