"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/images/logo.png" alt="London Retaining Walls logo" width={180} height={55} className="h-12 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[var(--dark)]">
          <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
          <li><Link href="/about-us" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors py-1">
              Services <span className="text-xs">▾</span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl rounded border border-gray-100 py-2 w-64 z-50">
                {site.services.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-4 py-2 hover:bg-orange-50 hover:text-[var(--accent)] transition-colors text-sm">
                    {s.name}
                  </Link>
                ))}
                <hr className="my-1 border-gray-100" />
                <Link href="/services" className="block px-4 py-2 text-[var(--accent)] font-semibold text-sm hover:bg-orange-50 transition-colors">
                  View All Services →
                </Link>
              </div>
            )}
          </li>
          <li><Link href="/service-areas" className="hover:text-[var(--accent)] transition-colors">Service Areas</Link></li>
          <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Helpful Tips</Link></li>
          <li><Link href="/contact-us" className="hover:text-[var(--accent)] transition-colors">Contact us</Link></li>
        </ul>

        <a
          href={site.phoneHref}
          className="hidden lg:flex items-center gap-2 btn btn-accent text-sm ml-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z"/>
          </svg>
          CALL {site.phone}
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 space-y-1">
            <span className={`block h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about-us" },
            { label: "Services", href: "/services" },
            { label: "Service Areas", href: "/service-areas" },
            { label: "Helpful Tips", href: "/blog" },
            { label: "Contact Us", href: "/contact-us" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 px-3 rounded hover:bg-orange-50 hover:text-[var(--accent)] font-medium text-[var(--dark)]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="btn btn-accent w-full mt-3 justify-center">
            Call {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
