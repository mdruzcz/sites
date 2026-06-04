import Link from 'next/link';
import Image from 'next/image';
import { site, services, serviceAreas } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-deep text-slate-300">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="bg-white inline-flex rounded-lg p-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="London Concrete Sealing logo"
                width={200}
                height={60}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Discover more about our services and how we can help protect and beautify your
              concrete surfaces. Experience the commitment, quality, and care that set London
              Concrete Sealing apart.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/our-services" className="hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link href="/contact-us" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.urlPath} className="hover:text-accent transition-colors">
                    {s.menuName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + areas */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${site.phone}`} className="hover:text-accent transition-colors">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors break-all">
                  {site.email}
                </a>
              </li>
              <li className="text-slate-400">{site.hours.weekdays}</li>
              <li className="text-slate-400">{site.hours.weekends}</li>
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-3">Service Areas</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
              {serviceAreas.filter((a) => a.slug !== 'london-surrounding-areas').map((a) => (
                <Link key={a.slug} href={a.urlPath} className="hover:text-accent transition-colors">
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} London Concrete Sealing. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
