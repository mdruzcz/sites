import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { serviceAreas } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-[#06060e] border-t border-white/8 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Image
              src="/images/logo.jpg"
              alt="Forever Lights logo"
              width={140}
              height={56}
              className="h-12 w-auto mb-4 object-contain"
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional permanent LED lighting for homes across London, Ontario and Southwestern Ontario.
            </p>
            <div className="mt-4 flex gap-3">
              <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F5A623]/20 flex items-center justify-center text-slate-400 hover:text-[#F5A623] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={site.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F5A623]/20 flex items-center justify-center text-slate-400 hover:text-[#F5A623] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
                { href: '/warranty', label: 'Warranty' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-[#F5A623] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map(a => (
                <li key={a.slug}>
                  <Link href={`/locations/${a.slug}`} className="text-slate-400 hover:text-[#F5A623] text-sm transition-colors">
                    {a.city}, ON
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="hover:text-[#F5A623] transition-colors font-medium text-white">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-[#F5A623] transition-colors">
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
              <li>Weekends: Closed</li>
              <li className="pt-2">
                <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
