"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <a
              href={site.emailHref}
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs font-medium"
            >
              <EmailIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              {site.email}
            </a>
            <span className="hidden sm:block text-xs text-white/50">
              Serving London, Woodstock, Brantford &amp; SW Ontario
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <ClockIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span>Mon – Fri · 8 AM – 5 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/Logo-1-e1721313045424-394x132.png"
                alt="TriCity Concrete Sealing logo"
                width={157}
                height={53}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-semibold text-[var(--navy)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn btn-primary text-sm ml-2">
                Get a Free Quote
              </Link>
            </nav>

            <div className="lg:hidden flex items-center gap-2">
              <Link href="/contact" className="btn btn-primary text-sm py-2 px-3">
                Free Quote
              </Link>
              <button
                className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-6 h-6 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-white">
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-semibold text-[var(--navy)] hover:bg-[var(--surface)] rounded-lg uppercase tracking-wide transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function EmailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
