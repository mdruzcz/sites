"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Pages WITHOUT a full-bleed photo hero. Everywhere else the header floats
 * transparent over the photo until the visitor scrolls. A page listed here
 * gets a solid sticky header instead, so white nav text never lands on the
 * light page background.
 */
function isSolid(pathname: string) {
  if (pathname === "/privacy" || pathname === "/terms") return true;
  // Kit detail pages open on the drawing, not a photo.
  return /^\/court-kits\/[^/]+/.test(pathname);
}

export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const floats = !isSolid(usePathname() ?? "/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header z-30" data-float={floats} data-scrolled={scrolled} data-overlay={floats && !scrolled}>
      {children}
    </header>
  );
}
