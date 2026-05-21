import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Deck Staining & Sealing", href: "/services/deck-staining-sealing" },
  { label: "Deck Restoration", href: "/services/deck-restoration-refinishing" },
  { label: "Power Washing", href: "/services/power-washing-cleaning" },
  { label: "Fence Staining", href: "/services/fence-staining-restoration" },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--slate)", color: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/Deck-Medic-Logo-Updated-2-1-rkeqandwm6nvjvcu7jpw9wbck6ynkxq32rbqwqiczk.png"
                alt="Deck Medic logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-display font-bold text-xl text-white">
                Deck <span style={{ color: "#60A5FA" }}>Medic</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/65 mb-5 max-w-xs">
              Canada&apos;s trusted specialist in professional deck restoration and wood preservation.
              Expert sanding, structural repairs, and premium staining designed to withstand the Canadian elements.
            </p>
            <div className="space-y-2">
              <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01L6.62 10.79z" /></svg>
                {site.phone}
              </a>
<p className="flex items-center gap-2 text-sm text-white/70">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Mon – Fri · 8 AM – 5 PM
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/50">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/50">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Deck Medic. All rights reserved.
          </p>
          <p className="text-sm text-white/45">
            Serving Toronto, Mississauga, Oakville &amp; Burlington, ON
          </p>
        </div>
      </div>
    </footer>
  );
}
