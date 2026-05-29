"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Areas", href: "/areas" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const solid = !isHome || scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(10,15,30,0.97)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid rgba(201,168,76,0.15)" : "none",
        boxShadow: solid ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-lg font-bold border-2 transition-all group-hover:scale-105"
            style={{ borderColor: "var(--gold)", color: "var(--gold)", background: "rgba(201,168,76,0.08)" }}
          >
            MD
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-base font-semibold leading-none" style={{ color: "var(--cream)" }}>Matt Druzcz</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--cream-muted)" }}>Realtor · London & Area</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: pathname.startsWith(l.href) ? "var(--gold)" : "var(--cream-muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Free Valuation
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md"
          style={{ color: "var(--cream)" }}
          aria-label="Toggle menu"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(10,15,30,0.98)" }}
        >
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-base font-medium border-b"
              style={{
                color: pathname.startsWith(l.href) ? "var(--gold)" : "var(--cream)",
                borderColor: "var(--navy-border)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+15198786735"
            className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold border mt-1"
            style={{ borderColor: "var(--navy-border)", color: "var(--cream)" }}
          >
            <PhoneIcon /> (519) 878-6735
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-full text-sm font-semibold text-center"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}
          >
            Get a Free Home Valuation
          </Link>
        </div>
      )}
    </nav>
  );
}
