import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const serviceLinks = [
  { label: "Permanent Lighting", href: "/permanent-lighting" },
  { label: "Christmas Lights (C9)", href: "/seasonal-lighting" },
  { label: "Commercial & Municipal", href: "/commercial" },
  { label: "New Installation", href: "/services/new-installation" },
  { label: "Repair Service", href: "/services/repair-service" },
  { label: "Maintenance", href: "/services/maintenance" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/our-process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function citySlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
}

export function Footer() {
  return (
    <footer style={{ background: "var(--deep)" }} className="text-white">
      {/* Closing offer strip — the demo promise gets one last placement,
          because the footer is where people land after reading everything. */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <p className="font-display text-lg font-bold text-white leading-snug">
                See it lit up on your own home — before you pay a cent.
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Free on-site demo. No deposit, no obligation, {site.responseTime} response.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact" className="btn btn-primary">
                {site.demo.cta}
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-white">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Celebrate Lighting home">
              <Image
                src="/images/logo.png"
                alt="Celebrate Lighting logo"
                width={180}
                height={50}
                className="h-11 w-auto object-contain brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 max-w-sm">
              Permanent outdoor LED lighting for homes and businesses across Southwestern Ontario.
              Colour-matched, app-controlled, IP67-sealed and cold-rated to −40°C — backed by a lifetime
              warranty.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @celebratelighting
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {site.serviceAreas.map((city) => (
                <li key={city}>
                  <Link
                    href={`/service-areas/${citySlug(city)}`}
                    className="text-sm text-[var(--muted)] hover:text-white transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a href={site.phoneHref} className="hover:text-white transition-colors font-semibold text-white">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="hover:text-white transition-colors break-all">
                  {site.email}
                </a>
              </li>
              <li className="pt-1">{site.addressLine}</li>
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mt-6 mb-3">Hours</h3>
            <ul className="space-y-1 text-xs text-[var(--muted)]">
              {site.hoursDetailed.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span className="text-right">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-[var(--muted)]"
          style={{ borderColor: "var(--border)" }}
        >
          <p>© {new Date().getFullYear()} Celebrate Lighting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center min-h-[44px] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex items-center min-h-[44px] hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
