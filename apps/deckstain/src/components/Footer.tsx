import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--charcoal-900)] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Logo + info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="DeckStain.ca logo"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {site.tagline}
            </p>
            <a
              href={site.phoneHref}
              className="text-[var(--accent)] font-bold text-lg hover:text-white transition-colors block mb-2"
            >
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="text-white/60 text-sm hover:text-white transition-colors block mb-4"
            >
              {site.email}
            </a>
            <p className="text-white/50 text-sm">{site.hours}</p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Stain Choices", href: "/stain-choices" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[var(--accent)] rounded-full shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Service Areas</h3>
            <ul className="space-y-2.5">
              {[
                { label: "London, ON", href: "/service-areas/london-on" },
                { label: "Woodstock, ON", href: "/service-areas/woodstock-on" },
                { label: "St. Thomas, ON", href: "/service-areas/st-thomas-on" },
                { label: "Stratford, ON", href: "/service-areas/stratford-on" },
                { label: "Brantford, ON", href: "/service-areas/brantford-on" },
              ].map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[var(--accent)] rounded-full shrink-0" />
                    {area.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-[var(--accent)] hover:text-white text-sm font-bold transition-colors"
                >
                  View All Service Areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
          <p className="text-white/40 text-xs">
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/service-areas" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Service Areas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
