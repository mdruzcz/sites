import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "All Services" },
  { href: "/gallery", label: "Design Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Get a Free Quote" },
];

const serviceLinks = [
  { href: "/services/christmas-light-installation", label: "Christmas Light Installation" },
  { href: "/services/design-consultation", label: "Custom Lighting Design" },
  { href: "/services/wreaths-and-garlands", label: "Wreaths & Garlands" },
  { href: "/services/tree-and-shrub-lighting", label: "Tree & Shrub Lighting" },
  { href: "/services/interior-decorating", label: "Interior Decorating" },
  { href: "/services/commercial-displays", label: "Commercial Displays" },
];

const cityLinks = [
  { href: "/services/christmas-light-installation/toronto", label: "Toronto" },
  { href: "/services/christmas-light-installation/mississauga", label: "Mississauga" },
  { href: "/services/christmas-light-installation/vaughan", label: "Vaughan" },
  { href: "/services/christmas-light-installation/markham", label: "Markham" },
  { href: "/services/christmas-light-installation/richmond-hill", label: "Richmond Hill" },
  { href: "/services/christmas-light-installation/oakville", label: "Oakville" },
  { href: "/services/christmas-light-installation/burlington", label: "Burlington" },
  { href: "/services/christmas-light-installation/brampton", label: "Brampton" },
  { href: "/services/christmas-light-installation/pickering", label: "Pickering" },
  { href: "/services/christmas-light-installation/ajax", label: "Ajax" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] text-white/70">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              aria-label="GTA Christmas Lighting home"
              className="flex items-center gap-2.5 mb-5"
            >
              <span className="relative h-10 w-10 rounded-full bg-white p-1 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="GTA Christmas Lighting logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="40px"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span
                  className="text-white font-bold text-base"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  GTA Christmas Lighting
                </span>
                <span className="text-[var(--accent-gold)] text-[10px] uppercase tracking-[0.18em] font-medium">
                  Holiday Light Installation
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              GTA&apos;s top-rated Christmas light installer. All-inclusive
              holiday lighting — design, install, maintain, take down, and
              store. Rental or purchase.
            </p>
            <div className="flex flex-col gap-2 text-xs text-white/50">
              <span>✓ Fully Insured · WSIB Certified</span>
              <span>✓ Working-at-Heights Certified</span>
              <span>✓ Rental or Purchase Options</span>
              <span>✓ All-Holiday Lighting (Christmas, Diwali, Hanukkah)</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4 mt-7">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-sm text-[var(--accent-gold)] hover:text-white transition-colors"
                >
                  View all 14 service areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <a href={site.phoneHref} className="hover:text-white transition-colors">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <a href={site.phoneAltHref} className="hover:text-white transition-colors">
                  {site.phoneAlt}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <Link href="/contact" className="hover:text-white transition-colors">
                  Get a Free Quote
                </Link>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{site.addressLine}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-dark)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Proudly serving
            the Greater Toronto Area.
          </p>
          <div className="flex gap-5">
            <Link href="/sitemap.xml" className="hover:text-white/70 transition-colors">
              Sitemap
            </Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
