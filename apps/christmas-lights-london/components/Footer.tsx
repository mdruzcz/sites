import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Get a Free Quote" },
];

const serviceLinks = [
  { href: "/services/residential-installation", label: "Residential Installation" },
  { href: "/services/commercial-installation", label: "Commercial Installation" },
  { href: "/services/custom-design", label: "Custom Design" },
  { href: "/services/takedown-storage", label: "Takedown & Storage" },
  { href: "/services/wreath-installation", label: "Wreath Installation" },
  { href: "/services/garland-installation", label: "Garland Installation" },
];

const cityLinks = [
  { href: "/services/christmas-light-installation/london", label: "London" },
  { href: "/services/christmas-light-installation/kitchener", label: "Kitchener" },
  { href: "/services/christmas-light-installation/hamilton", label: "Hamilton" },
  { href: "/services/christmas-light-installation/mississauga", label: "Mississauga" },
  { href: "/services/christmas-light-installation/brantford", label: "Brantford" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] text-white/70">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Christmas Lights London home">
              <Image
                src="/images/christmaslightslondon-logo-white-e1716963772339.png"
                alt="Christmas Lights London white logo"
                width={180}
                height={54}
                className="h-12 w-auto object-contain mb-5"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Professional Christmas light installation in London, Ontario and surrounding areas.
              Custom-cut lights, aerial lifts, no ladders needed.
            </p>
            <div className="flex gap-3">
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 h-9 rounded-full bg-white/10 hover:bg-[var(--accent)] transition-colors text-xs font-medium"
                aria-label="Facebook"
              >
                <ExternalLink className="h-3 w-3" />
                FB
              </a>
              <a
                href={site.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 h-9 rounded-full bg-white/10 hover:bg-[var(--accent)] transition-colors text-xs font-medium"
                aria-label="YouTube"
              >
                <ExternalLink className="h-3 w-3" />
                YT
              </a>
            </div>
          </div>

          {/* Quick Links */}
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
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
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

          {/* Contact */}
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
                <Mail className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <a href={site.emailHref} className="hover:text-white transition-colors break-all">
                  {site.email}
                </a>
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
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/sitemap.xml" className="hover:text-white/70 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
