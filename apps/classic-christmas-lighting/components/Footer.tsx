import Link from "next/link";
import { Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/Logo";
import { AwardBadge } from "@/components/award-badge";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Get a Free Quote" },
];

const serviceLinks = [
  { href: "/services/christmas-lighting-installation", label: "Christmas Lighting Installation" },
  { href: "/services/christmas-lighting-for-homes", label: "Lighting for Homes" },
  { href: "/services/christmas-lighting-for-businesses", label: "Lighting for Businesses" },
  { href: "/services/tree-lighting-services", label: "Tree Lighting" },
  { href: "/services/christmas-light-rental", label: "Light Rental" },
  { href: "/services/christmas-decoration-services", label: "Decoration Services" },
];

const areaLinks = [
  { href: "/service-areas/kitchener", label: "Kitchener" },
  { href: "/service-areas/waterloo", label: "Waterloo" },
  { href: "/service-areas/cambridge", label: "Cambridge" },
  { href: "/service-areas/guelph", label: "Guelph" },
  { href: "/service-areas/hamilton", label: "Hamilton" },
  { href: "/service-areas/woodstock", label: "Woodstock" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--dark-bg)] text-white/70">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Classic Christmas Lighting home" className="inline-block mb-5">
              <LogoMark size="md" variant="light" />
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Professional Christmas light installation serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton, and surrounding Southern Ontario communities.
            </p>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/10 hover:bg-[var(--accent)] transition-colors text-xs font-medium w-fit"
              aria-label="Facebook"
            >
              <ExternalLink className="h-3 w-3" />
              Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
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
            <ul className="space-y-2 mb-6">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-3">
              Service Areas
            </h4>
            <ul className="space-y-1.5">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.15em] mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-[var(--accent-gold)] shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{site.phone}</p>
                    <p className="text-xs">Call or text anytime</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-start gap-3 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-[var(--accent-gold)] shrink-0" />
                  <span className="text-sm break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-[var(--accent-gold)] shrink-0" />
                <div className="text-sm">
                  <p>Mon–Fri: 9:00 AM – 5:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
            <Link href="/contact" className="btn btn-primary mt-6 w-full justify-center min-h-[44px]">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border-dark)]">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Classic Christmas Lighting. All rights reserved.
          </p>
          <AwardBadge />
          <p className="text-xs text-white/40">
            Proudly serving Kitchener-Waterloo &amp; Southern Ontario
          </p>
        </div>
      </div>
    </footer>
  );
}
