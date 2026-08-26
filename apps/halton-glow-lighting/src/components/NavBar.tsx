"use client";

import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "/#why", label: "Why Halton Glow" },
  { href: "/#how", label: "How It Works" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/#service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
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
          ? "bg-[#0A0E1F]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#0A0E1F]/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2.5 group min-h-11">
            <Logo
              className="h-10 lg:h-12 w-auto"
              ariaLabel="Halton Glow Lighting — permanent LED lighting installer in Burlington and Oakville"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/75 hover:text-[var(--gold-bright)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 text-sm font-medium text-white/75 hover:text-white transition-colors min-h-11 px-2"
            >
              <PhoneIcon className="w-4 h-4" />
              {site.phone}
            </a>
            <a
              href="/#contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,194,107,0.4)]"
            >
              Free Estimate
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2 -mr-2 min-w-11 min-h-11 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0A0E1F]">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-white/80 hover:text-[var(--gold-bright)] py-3 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-white/80 py-3 border-t border-white/10 mt-2 pt-4"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-3.5 rounded-full text-sm font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] mt-3"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
