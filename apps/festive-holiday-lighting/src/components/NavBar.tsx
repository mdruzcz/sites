"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

const navLinks = [
  { label: "Classic Lights", href: "/services/christmas-light-installation" },
  { label: "Permanent Lights", href: "/services/permanent-lighting" },
  { label: "All Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040408]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)] border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Festive Holiday Lighting logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/75 hover:text-[var(--gold-bright)] transition"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all min-h-11 flex items-center"
              style={{
                background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(178,34,34,0.4)",
              }}
            >
              Free Quote
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition min-h-11"
            >
              <PhoneIcon className="w-4 h-4" />
              {site.phone}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-2">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-full text-sm font-semibold text-center text-white transition min-h-11 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))" }}
              >
                Get a Free Quote
              </a>
              <a
                href={site.phoneHref}
                className="px-4 py-3 rounded-full text-sm font-semibold text-white border border-white/20 text-center min-h-11 flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-4 h-4" />
                {site.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
