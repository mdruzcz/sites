import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--dark)] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Image src="/images/logo.png" alt="London Retaining Walls logo" width={160} height={50} className="h-12 w-auto object-contain brightness-0 invert mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">Professional retaining wall installation and repair serving London and Southwestern Ontario. Concrete, block and wood walls.</p>
          <p className="mt-4 text-sm text-gray-400">{site.hours}</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href={site.phoneHref} className="hover:text-[var(--accent)] transition-colors">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-[var(--accent)] transition-colors">{site.email}</a></li>
            <li>London, Ontario &amp; Surrounding Areas</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-lg mb-4">Our Services</h3>
          <ul className="space-y-1 text-sm">
            {site.services.map((s) => (
              <li key={s.href}><Link href={s.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors">{s.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h3 className="font-bold text-lg mb-4">Service Areas</h3>
          <ul className="space-y-1 text-sm">
            {site.serviceAreas.slice(0, 9).map((a) => (
              <li key={a.name}><Link href={a.href} className="text-gray-400 hover:text-[var(--accent)] transition-colors">{a.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4 text-center text-xs text-gray-500">
        <p>&copy; {year} {site.name}. All rights reserved. &nbsp;|&nbsp;
          <Link href="/privacy-policy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link>
          &nbsp;|&nbsp;
          <Link href="/terms-of-service" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
