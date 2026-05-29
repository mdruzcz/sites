import Link from 'next/link';
import { site, services } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-white text-xl font-bold mb-3">
              <span style={{ color: 'var(--accent)' }}>London</span> Concrete Sealing
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Professional concrete sealing and repair across London, St. Thomas, Woodstock, and Stratford.
            </p>
            <p className="text-sm">{site.hours.weekdays}</p>
            <p className="text-sm">{site.hours.weekends}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[var(--accent)] transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="hover:text-[var(--accent)] transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-[var(--accent)] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-[var(--accent)] transition-colors">
                  {site.email}
                </a>
              </li>
              <li>{site.city}, {site.province}</li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2 text-sm">Service Areas</h4>
              <p className="text-sm text-gray-400">London · St. Thomas · Woodstock · Stratford · Ingersoll</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} London Concrete Sealing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
