"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, CloseIcon, ChevronDown } from "./icons";
import { site } from "@/lib/site";

const COMMERCIAL_LINKS = [
  { label: "Commercial Holiday Lighting", href: "/services/commercial-holiday-lighting-services" },
  { label: "Commercial Christmas Light Installation", href: "/services/commercial-christmas-light-installation" },
  { label: "Commercial Christmas Decorators", href: "/services/commercial-christmas-decorators" },
  { label: "Commercial Christmas Trees", href: "/services/commercial-christmas-trees-and-decorations" },
];

const RESIDENTIAL_LINKS = [
  { label: "Residential Light Installation", href: "/services/residential-christmas-light-installation" },
  { label: "Residential Christmas Decorators", href: "/services/residential-christmas-decorators" },
  { label: "Full Season Holiday Service", href: "/services/full-season-holiday-service" },
  { label: "Christmas Light Takedown", href: "/services/christmas-light-takedown" },
  { label: "Year-Long Storage", href: "/services/christmas-light-year-long-storage" },
  { label: "Govee Light Installation", href: "/services/govee-light-installer" },
  { label: "Eufy Light Installation", href: "/services/eufy-light-installer" },
  { label: "Lighting Packages", href: "/lighting-packages" },
];

const CITIES = [
  { label: "London Ontario", href: "/cities/london-ontario" },
  { label: "Brampton", href: "/cities/brampton" },
  { label: "Burlington", href: "/cities/burlington" },
  { label: "Cambridge", href: "/cities/cambridge" },
  { label: "Etobicoke", href: "/cities/etobicoke" },
  { label: "Georgetown", href: "/cities/georgetown" },
  { label: "Guelph", href: "/cities/guelph" },
  { label: "Hamilton", href: "/cities/hamilton" },
  { label: "Ingersoll", href: "/cities/ingersoll" },
  { label: "Kitchener", href: "/cities/kitchener" },
  { label: "Milton", href: "/cities/milton" },
  { label: "Mississauga", href: "/cities/mississauga" },
  { label: "Oakville", href: "/cities/oakville" },
  { label: "St. Thomas", href: "/cities/st-thomas" },
  { label: "Strathroy", href: "/cities/strathroy" },
  { label: "Waterloo", href: "/cities/waterloo" },
  { label: "Woodstock", href: "/cities/woodstock" },
  { label: "Ancaster", href: "/cities/ancaster" },
  { label: "London Surrounding Areas", href: "/cities/london-surrounding-areas" },
];

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="We Install Christmas Lights — Home">
            <Image
              src="/images/logo.png"
              alt="We Install Christmas Lights logo"
              width={300}
              height={76}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 text-[14px] font-bold tracking-[0.12em] uppercase text-[color:var(--brand-green)]">
            <li>
              <Link href="/about-us" className="hover:text-[color:var(--brand-red)] transition-colors">About Us</Link>
            </li>

            <li className="group relative">
              <button className="flex items-center gap-1 hover:text-[color:var(--brand-red)] transition-colors">
                Commercial Services <ChevronDown className="w-3 h-3" />
              </button>
              <div className="invisible group-hover:visible absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
                <div className="bg-white border border-[color:var(--border)] rounded-lg shadow-lg min-w-[280px] py-2">
                  {COMMERCIAL_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2 text-[12px] hover:bg-[color:var(--bg-soft)] hover:text-[color:var(--brand-red)]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li className="group relative">
              <button className="flex items-center gap-1 hover:text-[color:var(--brand-red)] transition-colors">
                Residential Services <ChevronDown className="w-3 h-3" />
              </button>
              <div className="invisible group-hover:visible absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
                <div className="bg-white border border-[color:var(--border)] rounded-lg shadow-lg min-w-[280px] py-2">
                  {RESIDENTIAL_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2 text-[12px] hover:bg-[color:var(--bg-soft)] hover:text-[color:var(--brand-red)]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li className="group relative">
              <Link href="/service-areas" className="flex items-center gap-1 hover:text-[color:var(--brand-red)] transition-colors">
                Service Areas <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="invisible group-hover:visible absolute right-0 top-full pt-3 z-50">
                <div className="bg-white border border-[color:var(--border)] rounded-lg shadow-lg min-w-[260px] py-2 grid grid-cols-2 gap-0">
                  {CITIES.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-1.5 text-[11px] hover:bg-[color:var(--bg-soft)] hover:text-[color:var(--brand-red)]"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link href="/faq" className="hover:text-[color:var(--brand-red)] transition-colors">FAQ</Link>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/contact-us" className="btn btn-red text-sm">Contact Us</Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -mr-2 text-[color:var(--brand-green)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[color:var(--border)] py-3 max-h-[80vh] overflow-y-auto">
            <ul className="space-y-1 text-sm">
              <MobileLink href="/about-us" onClick={() => setMobileOpen(false)}>About Us</MobileLink>
              <li className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Commercial</li>
              {COMMERCIAL_LINKS.map((l) => (
                <MobileLink key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</MobileLink>
              ))}
              <li className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Residential</li>
              {RESIDENTIAL_LINKS.map((l) => (
                <MobileLink key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</MobileLink>
              ))}
              <li className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Service Areas</li>
              {CITIES.map((c) => (
                <MobileLink key={c.href} href={c.href} onClick={() => setMobileOpen(false)}>{c.label}</MobileLink>
              ))}
              <MobileLink href="/faq" onClick={() => setMobileOpen(false)}>FAQ</MobileLink>
              <MobileLink href="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</MobileLink>
              <li className="pt-3 flex flex-col gap-2 px-3">
                <Link href={site.phoneHref} className="btn btn-green">Call {site.phone}</Link>
                <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block px-3 py-2 text-[color:var(--brand-green)] font-semibold hover:bg-[color:var(--bg-soft)] rounded"
      >
        {children}
      </Link>
    </li>
  );
}
