"use client";

import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "/#why", label: "Why Spotless" },
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How It Works" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#service-areas", label: "Service Areas" },
  { href: "/#faq", label: "FAQ" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--greige)]/95 backdrop-blur-md shadow-warm"
          : "bg-[var(--greige)]/70 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2.5 group min-h-11">
            <Logo
              className="h-10 lg:h-12 w-auto"
              ariaLabel="Spotless Deck Staining — deck and fence staining in Kitchener, Waterloo, Cambridge and Guelph"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--driftwood)]/85 hover:text-[var(--terracotta-deep)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 text-sm font-semibold text-[var(--driftwood)] hover:text-[var(--terracotta-deep)] transition-colors min-h-11 px-2"
            >
              <PhoneIcon className="w-4 h-4" />
              {site.phone}
            </a>
            <a
              href="/#contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition-all hover:scale-105 shadow-warm"
            >
              Get a Quote
            </a>
          </div>

          <button
            className="lg:hidden text-[var(--driftwood)] p-2 -mr-2 min-w-11 min-h-11 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--greige)]">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-[var(--driftwood)] hover:text-[var(--terracotta-deep)] py-3 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-base font-semibold text-[var(--driftwood)] py-3 border-t border-[var(--line)] mt-2 pt-4"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-[var(--terracotta)] mt-3"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
