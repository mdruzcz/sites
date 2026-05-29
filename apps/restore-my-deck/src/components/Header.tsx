"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const serviceCategories = [
  { label: "Pressure Washing", href: "/pressure-washing-services" },
  { label: "Sealing Services", href: "/sealing-services" },
  { label: "Deck Repair", href: "/deck-repair-and-maintenance" },
  { label: "Deck Rebuilding", href: "/deck-rebuilding" },
];

const allServices = site.services.slice(0, 8);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[var(--dark)] text-white text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          <span className="hidden sm:block opacity-80">{site.tagline}</span>
          <a href={site.phoneHref} className="font-semibold hover:text-[var(--accent)] transition-colors ml-auto">
            Call {site.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/images/logo.png" alt="Restore My Deck logo" width={160} height={50} className="h-10 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
          <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
          <li><Link href="/about-us" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
          <li><Link href="/projects" className="hover:text-[var(--accent)] transition-colors">Projects</Link></li>
          <li
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors py-1">
              Services <span className="text-xs">▾</span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 p-4 w-64 z-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Categories</p>
                {serviceCategories.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-2 py-1.5 rounded-lg hover:bg-orange-50 hover:text-[var(--accent)] transition-colors text-sm">
                    {s.label}
                  </Link>
                ))}
                <hr className="my-2 border-gray-100" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">All Services</p>
                {allServices.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-2 py-1.5 rounded-lg hover:bg-orange-50 hover:text-[var(--accent)] transition-colors text-sm">
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><Link href="/service-areas" className="hover:text-[var(--accent)] transition-colors">Service Areas</Link></li>
          <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Helpful Tips</Link></li>
          <li><Link href="/contact-us" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link></li>
        </ul>

        <a href={site.phoneHref} className="hidden lg:flex btn btn-dark text-sm gap-2 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z"/>
          </svg>
          CALL {site.phone}
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 space-y-1">
            <span className={`block h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about-us" },
            { label: "Projects", href: "/projects" },
            { label: "Services", href: "/services" },
            { label: "Service Areas", href: "/service-areas" },
            { label: "Helpful Tips", href: "/blog" },
            { label: "Contact Us", href: "/contact-us" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-[var(--accent)] font-medium" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="btn btn-accent w-full mt-3 justify-center">Call {site.phone}</a>
        </div>
      )}
    </header>
  );
}
