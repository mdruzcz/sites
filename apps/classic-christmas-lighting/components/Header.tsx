"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/christmas-lighting-installation", label: "Christmas Lighting Installation" },
      { href: "/services/christmas-lighting-for-homes", label: "Lighting for Homes" },
      { href: "/services/christmas-lighting-for-businesses", label: "Lighting for Businesses" },
      { href: "/services/tree-lighting-services", label: "Tree Lighting" },
      { href: "/services/christmas-light-rental", label: "Light Rental" },
      { href: "/services/christmas-decoration-services", label: "Decoration Services" },
    ],
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    children: [
      { href: "/service-areas/kitchener", label: "Kitchener" },
      { href: "/service-areas/waterloo", label: "Waterloo" },
      { href: "/service-areas/cambridge", label: "Cambridge" },
      { href: "/service-areas/guelph", label: "Guelph" },
      { href: "/service-areas/hamilton", label: "Hamilton" },
      { href: "/service-areas/woodstock", label: "Woodstock" },
      { href: "/service-areas/stratford", label: "Stratford" },
    ],
  },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
        <span className="mx-3 opacity-50">|</span>
        <span>Serving Kitchener-Waterloo &amp; Southern Ontario</span>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Classic Christmas Lighting home">
          <LogoMark size="md" variant="light" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 w-56 bg-[var(--dark-surface)] border border-[var(--border-dark)] rounded-lg shadow-xl py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary min-h-[44px] min-w-[44px]">
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
          className="lg:hidden border-t border-[var(--border-dark)] bg-[var(--dark-bg)] px-4 pb-4 max-h-[80vh] overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 text-sm font-medium text-white/80 hover:text-white transition-colors min-h-[44px] border-b border-[var(--border-dark)]"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4 border-b border-[var(--border-dark)]">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center py-2 text-sm text-white/60 hover:text-white transition-colors min-h-[44px]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
