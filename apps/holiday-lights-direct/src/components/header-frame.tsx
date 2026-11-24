"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Pages that open on a full-bleed photo hero (`<PageHero>` or the homepage
 * hero). On these the header floats transparent over the photo until the
 * visitor scrolls. Anything not listed here (product, cart, checkout, account)
 * has no photo behind the header, so it stays solid and sticky.
 *
 * Adding a route here without giving the page a PageHero would put white nav
 * text on an ivory page, so keep the two in step.
 */
const HERO_ROUTES = [
  "/permanent-lights",
  "/shop",
  "/product-category",
  "/professional-installer",
  "/municipalities",
  "/resources",
  "/faq",
  "/contact-us",
  "/shipping-returns",
  "/warranty",
  "/track-order"
];

function opensOnHero(pathname: string) {
  return pathname === "/" || HERO_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

/**
 * Client shell for the header. It only decides which skin applies:
 *  - hero page, top of page → transparent overlay on the photo
 *  - hero page, scrolled    → solid, announcement bar tucked away
 *  - every other page       → solid and sticky
 * The skin itself lives in globals.css (`.site-header[data-*]`), so the header's
 * children stay server components.
 */
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const floats = opensOnHero(usePathname() ?? "/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="site-header z-30"
      data-float={floats}
      data-scrolled={scrolled}
      data-overlay={floats && !scrolled}
    >
      {children}
    </header>
  );
}
