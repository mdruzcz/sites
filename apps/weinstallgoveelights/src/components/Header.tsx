"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07071A]/95 backdrop-blur-md border-b border-[#1E1E42]">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center shrink-0">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-colors text-sm"
          >
            Free Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
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
        <div className="md:hidden bg-[#0E0E24] border-t border-[#1E1E42] px-4 py-4 flex flex-col gap-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-200 hover:text-white py-2 text-base font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 px-5 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}
