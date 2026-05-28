"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--dark-bg)]/97 backdrop-blur shadow-lg"
          : "bg-[var(--dark-bg)]"
      } border-b border-[var(--border-dark)]`}
    >
      {/* Top bar */}
      <div className="bg-[var(--accent)] text-white text-xs py-1.5 text-center hidden md:block">
        <a href={site.phoneHref} className="hover:underline font-medium">
          Call Now: {site.phone}
        </a>
        <span className="mx-3 opacity-50">|</span>
        <span>{site.hours}</span>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center" aria-label="Christmas Lights London home">
          <Image
            src="/images/christmaslightslondon-logo-white-e1716963772339.png"
            alt="Christmas Lights London logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="btn btn-primary min-h-[44px] min-w-[44px]"
          >
            Free Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t border-[var(--border-dark)] bg-[var(--dark-bg)] px-4 pb-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center py-3 text-sm font-medium text-white/80 hover:text-white transition-colors min-h-[44px] border-b border-[var(--border-dark)] last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 btn btn-ghost w-full min-h-[44px]"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full justify-center min-h-[44px]"
            >
              Get a Free Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
