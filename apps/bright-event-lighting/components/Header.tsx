"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";

const eventLinks = [
  { href: "/events/weddings", label: "Weddings" },
  { href: "/events/corporate-events", label: "Corporate Events" },
  { href: "/events/holiday-parties", label: "Christmas Parties" },
  { href: "/events/private-parties", label: "Backyard & Private Parties" },
];

const serviceLinks = [
  { href: "/services/uplighting", label: "Uplighting" },
  { href: "/services/edison-string-lighting", label: "Edison String Lights" },
  { href: "/services/tent-lighting", label: "Tent & Outdoor Lighting" },
  { href: "/services/cold-sparks-dance-floor", label: "Cold Sparks & Dance Floor" },
  { href: "/services/pinspot-wash-lighting", label: "Pinspot & Wash" },
  { href: "/services/tree-and-landscape-lighting", label: "Tree & Landscape Lighting" },
  { href: "/services/indoor-garlands-wreaths", label: "Garlands, Wreaths & Trees" },
  { href: "/services/mall-holiday-decor", label: "Mall & Commercial Decor" },
  { href: "/services/commercial-holiday-lighting", label: "Commercial Holiday Lighting" },
];

const topLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Dropdown({ label, href, items }: { label: string; href: string; items: { href: string; label: string }[] }) {
  return (
    <div className="relative group">
      <Link href={href} className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-3">
        {label}
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </Link>
      <div className="absolute left-0 top-full pt-1 hidden group-hover:block group-focus-within:block">
        <div className="min-w-[240px] rounded-lg border border-[var(--border)] bg-[#141416] p-2 shadow-2xl">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="block rounded px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)] transition-colors">
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F10]/95 border-b border-[var(--border)]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
          Bright<span className="text-[var(--accent)]">Event</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
          <Dropdown label="Events" href="/events/weddings" items={eventLinks} />
          <Dropdown label="Services" href="/services" items={serviceLinks} />
          {topLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-3">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors min-h-[44px]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary min-h-[44px]">
            Get a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--foreground)]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-[var(--border)] bg-[#0F0F10] px-4 pb-6 max-h-[calc(100vh-64px)] overflow-y-auto" aria-label="Mobile">
          <p className="pt-4 pb-1 text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">Events</p>
          {eventLinks.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center min-h-[44px] text-sm text-[var(--foreground)]">{l.label}</Link>
          ))}
          <p className="pt-4 pb-1 text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">Services</p>
          {serviceLinks.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center min-h-[44px] text-sm text-[var(--foreground)]">{l.label}</Link>
          ))}
          <p className="pt-4 pb-1 text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">More</p>
          {topLinks.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center min-h-[44px] text-sm text-[var(--foreground)]">{l.label}</Link>
          ))}
          <a href={site.phoneHref} className="flex items-center gap-2 min-h-[44px] text-sm text-[var(--muted)] mt-2">
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary mt-3 w-full justify-center min-h-[48px]">
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
