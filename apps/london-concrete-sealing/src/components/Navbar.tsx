'use client';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/content';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    href: '/services',
    label: 'Services',
    children: [
      { href: '/services/driveway-sealing', label: 'Driveway Sealing' },
      { href: '/services/concrete-sealing', label: 'Concrete Sealing' },
      { href: '/services/concrete-driveway-installation', label: 'Driveway Installation' },
      { href: '/services/stamped-concrete-sealing', label: 'Stamped Concrete' },
      { href: '/services/concrete-finishes', label: 'Concrete Finishes' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              <span style={{ color: 'var(--accent)' }}>London</span> Concrete Sealing
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <button className="text-gray-700 hover:text-[var(--accent)] font-medium flex items-center gap-1 py-5">
                    {link.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--accent)] text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[var(--accent)] font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="accent-btn px-4 py-2 rounded-md font-semibold text-sm min-h-[44px] flex items-center"
            >
              Get Free Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full text-left text-gray-700 font-medium py-2 flex items-center justify-between min-h-[44px]"
                >
                  {link.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={servicesOpen ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'} />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="ml-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block text-gray-600 py-2 min-h-[44px] flex items-center"
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
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium py-2 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="accent-btn block text-center px-4 py-3 rounded-md font-semibold mt-2"
          >
            Get Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}
