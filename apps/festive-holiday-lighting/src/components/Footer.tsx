import Image from "next/image";
import Link from "next/link";
import { site, cities, services } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--night-deep)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image src="/images/logo.png" alt="Festive Holiday Lighting" width={140} height={44} className="h-11 w-auto object-contain mb-5" />
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              Southern Ontario's most trusted holiday lighting company. Seasonal installs, permanent LED systems, and commercial programs — all insured, all guaranteed.
            </p>
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-[var(--gold-bright)] hover:text-white transition min-h-11">
              <PhoneIcon className="w-4 h-4" />
              {site.phone}
            </a>
            <p className="text-xs text-white/40 mt-2">{site.hoursShort}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/65 hover:text-[var(--gold-bright)] transition">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Service Areas</h3>
            <ul className="space-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="text-sm text-white/65 hover:text-[var(--gold-bright)] transition">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Company</h3>
            <ul className="space-y-2.5 mb-8">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 hover:text-[var(--gold-bright)] transition">{l.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3">Contact</h3>
            <a href={`mailto:${site.email}`} className="text-sm text-white/65 hover:text-[var(--gold-bright)] transition block mb-2">{site.email}</a>
            <p className="text-xs text-white/40">Extended hours Nov–Jan</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Festive Holiday Lighting. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/35">$5M Liability · WSIB Compliant · Family Owned</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
