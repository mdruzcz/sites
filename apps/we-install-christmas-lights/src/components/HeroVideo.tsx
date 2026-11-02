"use client";

import { useEffect, useState } from "react";

/**
 * Background reel for the homepage hero. The poster image underneath is what paints
 * first, so the video starts only after hydration, and phones get a vertical cut.
 * Skipped for reduced-motion and data-saver visitors, who just keep the poster.
 */
export function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSrc(window.innerWidth >= 768 ? "/videos/hero-reel-1920.mp4" : "/videos/hero-reel-portrait.mp4");
  }, []);

  if (!src) return null;
  return <video src={src} autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />;
}
