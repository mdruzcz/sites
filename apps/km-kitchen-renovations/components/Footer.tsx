import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, SERVICE_AREAS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 max-w-6xl py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/images/logo.svg" alt="K&M Kitchen Renovations" width={160} height={50} className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Expert kitchen renovations, bathroom remodels, and basement finishing across Southwestern Ontario. Over a decade of craftsmanship.
            </p>
            <div className="space-y-2">
              <a href={`tel:${SITE.phonePlain}`} className="flex items-center gap-2 text-[var(--gold)] font-semibold hover:text-yellow-300 transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                London, Ontario
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 text-[var(--gold)]">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 text-[var(--gold)]">Service Areas</h3>
            <ul className="space-y-2">
              {SERVICE_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">
                    {a.city}, {a.province}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + CTA */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 text-[var(--gold)]">Company</h3>
            <ul className="space-y-2 mb-6">
              <li><Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/financing" className="text-white/70 hover:text-white text-sm transition-colors">Financing Options</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
            <Link href="/contact" className="btn btn-primary text-sm w-full justify-center">
              Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-white/50 text-xs">
          <p>© {new Date().getFullYear()} K&M Kitchen Renovations. All rights reserved.</p>
          <p>London, Ontario · Serving Southwestern Ontario</p>
        </div>
      </div>
    </footer>
  );
}
