import Link from "next/link";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/services/furnace-repair-installation", label: "Furnace Repair & Installation" },
  { href: "/services/air-conditioner-repair-installation", label: "Air Conditioner Service" },
  { href: "/services/heat-pump-installation", label: "Heat Pump Installation" },
  { href: "/services/ductless-mini-split", label: "Ductless Mini-Split" },
  { href: "/services/indoor-air-quality", label: "Indoor Air Quality" },
  { href: "/services/tankless-water-heaters", label: "Tankless Water Heaters" },
  { href: "/services/smart-thermostats", label: "Smart Thermostats" },
  { href: "/services/maintenance-plans", label: "Maintenance Plans" },
];

const areaLinks = [
  { href: "/service-areas/woodstock", label: "Woodstock" },
  { href: "/service-areas/ingersoll", label: "Ingersoll" },
  { href: "/service-areas/tillsonburg", label: "Tillsonburg" },
  { href: "/service-areas/brantford", label: "Brantford" },
  { href: "/service-areas/london", label: "London" },
  { href: "/service-areas/st-thomas", label: "St. Thomas" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/heat-pump-rebates", label: "Heat Pump Rebates" },
  { href: "/maintenance-plans", label: "Maintenance Plans" },
  { href: "/financing", label: "Financing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/emergency", label: "Emergency Service" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--navy-900)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--heat)] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <span className="font-extrabold text-lg text-white">Optimum HVAC</span>
            </Link>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Oxford County&apos;s TSSA-certified heating and cooling specialists. Serving Woodstock, Ingersoll, Tillsonburg, and southwestern Ontario.
            </p>
            <div className="space-y-2">
              <a href={site.phoneHref} className="flex items-center gap-2 text-[var(--heat)] font-bold hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors">
                {site.email}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.certifications.map((cert) => (
                <span key={cert} className="text-xs px-2 py-1 bg-white/10 rounded text-white/70 font-medium">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas" className="text-sm text-[var(--cool)] hover:text-white transition-colors font-medium">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-[var(--heat)]/10 rounded-lg border border-[var(--heat)]/20">
              <p className="text-xs font-bold text-[var(--heat)] uppercase tracking-wider mb-1">24/7 Emergency</p>
              <a href={site.phoneHref} className="text-white font-bold text-sm hover:text-[var(--heat)] transition-colors">
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Serving Oxford County, Brant County, Norfolk County &amp; southwestern Ontario</p>
        </div>
      </div>
    </footer>
  );
}
