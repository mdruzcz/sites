"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

const services = [
  { label: "Wood Fence Contractor", href: "/wood-fencing-contractor" },
  { label: "Chainlink Fencing", href: "/chainlink-fencing" },
  { label: "Vinyl Fence Installation", href: "/vinyl-fence-installation" },
  { label: "Metal Fence Installation", href: "/metal-fence-installation" },
  { label: "Black Aluminum Fencing", href: "/black-aluminum-fencing" },
  { label: "Fence Repair", href: "/fence-repair" },
  { label: "Fence Staining", href: "/fence-staining" },
  { label: "Noise Wall & Highway Fencing", href: "/noise-wall-and-highway-fencing" },
  { label: "Guardrail Installation", href: "/guardrail-installation" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-green-dark text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:block font-medium">{site.tagline}</span>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-bold hover:text-[var(--accent)] transition-colors ml-auto"
          >
            <PhoneIcon />
            Call – {site.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="London Fence Installer logo"
                width={110}
                height={110}
                className="h-14 lg:h-16 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about-us">About Us</NavLink>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:text-[var(--accent)] transition-colors"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <ChevronDown />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white text-[var(--foreground)] shadow-xl rounded-b-lg py-2 border-t-4 border-[var(--accent)]">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-sm font-semibold hover:bg-[var(--surface)] hover:text-[var(--green)] transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                    <div className="border-t border-[var(--border)] mt-2 pt-2 px-4 pb-2">
                      <Link
                        href="/services"
                        className="text-sm font-bold text-[var(--green)] hover:text-[var(--accent)] transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/contact-us">Contact Us</NavLink>

              <Link
                href="/contact-us"
                className="btn btn-primary ml-4 text-sm font-bold"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--green-light)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[var(--green-dark)] border-t border-[var(--green-light)]">
            <div className="px-4 py-3 flex flex-col gap-1">
              <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
              <MobileLink href="/about-us" onClick={() => setMobileOpen(false)}>About Us</MobileLink>

              {/* Services accordion on mobile */}
              <button
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[var(--green)] rounded-lg transition-colors"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDown />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {services.map((s) => (
                    <MobileLink key={s.href} href={s.href} onClick={() => setMobileOpen(false)} sub>
                      {s.label}
                    </MobileLink>
                  ))}
                  <MobileLink href="/services" onClick={() => setMobileOpen(false)} sub>
                    View All Services
                  </MobileLink>
                </div>
              )}

              <MobileLink href="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</MobileLink>

              <Link
                href="/contact-us"
                className="btn btn-primary mt-3 w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:text-[var(--accent)] transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  sub,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[var(--green)] rounded-lg transition-colors block ${sub ? "text-xs opacity-90" : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
