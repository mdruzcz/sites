"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Data ─── */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: [
      { label: "London", href: "/hot-tub-pad-installation-in-london" },
      { label: "Hamilton", href: "/hot-tub-pad-installation-in-hamilton" },
      { label: "Kitchener", href: "/hot-tub-pad-installation-in-kitchener" },
      { label: "Woodstock", href: "/hot-tub-pad-installation-in-woodstock-on" },
      { label: "Sarnia", href: "/hot-tub-pad-installation-in-sarnia" },
      { label: "St. Thomas", href: "/hot-tub-pad-installation-in-st-thomas" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

/* ─── Component ─── */

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  /* close mobile menu on route change (resize as proxy) */
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  /* desktop dropdown hover handlers */
  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdownOpen(false), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="shrink-0" aria-label="Hot Tub Pads home">
          <Image
            src="/images/logo.png"
            alt="Hot Tub Pads"
            width={140}
            height={105}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-orange"
                >
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* dropdown panel */}
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                    desktopDropdownOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="min-w-[220px] rounded-lg bg-navy-dark py-2 shadow-xl ring-1 ring-white/10">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/90 transition-colors hover:bg-navy-light hover:text-orange"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-orange"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* ── Desktop CTA ── */}
        <Link
          href="/contact-us"
          className="hidden rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-dark lg:inline-block"
        >
          Get A Quote
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            /* X icon */
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* hamburger icon */
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile menu panel ── */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-[600px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-4 pb-6 pt-4">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-white transition-colors hover:text-orange"
                  onClick={() => setMobileAreasOpen((v) => !v)}
                >
                  {link.label}
                  <svg
                    className={`h-5 w-5 transition-transform ${mobileAreasOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <ul
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileAreasOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <li>
                    <Link
                      href={link.href}
                      className="block rounded-md py-2.5 pl-8 pr-3 text-sm text-white/80 transition-colors hover:text-orange"
                      onClick={() => setMobileOpen(false)}
                    >
                      All Service Areas
                    </Link>
                  </li>
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-md py-2.5 pl-8 pr-3 text-sm text-white/80 transition-colors hover:text-orange"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white transition-colors hover:text-orange"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}

          {/* Mobile CTA */}
          <li className="pt-3">
            <Link
              href="/contact-us"
              className="block rounded-lg bg-orange px-5 py-3 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-orange-dark"
              onClick={() => setMobileOpen(false)}
            >
              Get A Quote
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
