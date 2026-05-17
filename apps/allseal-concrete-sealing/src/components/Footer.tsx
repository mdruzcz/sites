import Link from "next/link";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";

export function Footer() {
  const services = getServices();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{site.name}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Professional concrete sealing protecting driveways, patios, and
              more across Southwestern Ontario. {site.yearsExperience}+ years of
              experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {site.serviceAreas.map((area) => (
                <li key={area} className="text-slate-300 text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="text-slate-300 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {site.phone}
                </a>
              </li>
              <li className="text-slate-300 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {site.hours}
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-primary text-sm">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              We accept cheques and all major credit cards
            </p>
            <div className="flex items-center gap-3">
              {/* Visa */}
              <div className="bg-white rounded px-2 py-1">
                <svg viewBox="0 0 48 32" className="h-6 w-9">
                  <rect width="48" height="32" rx="4" fill="#1A1F71" />
                  <path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm12.9-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.2.6 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.4-2.3zm7.9-.3h-2.3c-.7 0-1.3.2-1.6.9L32.5 21h3.2l.6-1.7h3.9l.4 1.7h2.8l-2.5-11.5h-2.6zm-2.3 7.4l1.2-3.3c0 0 .3-.7.4-1.1l.2 1 .7 3.4h-2.5zM17.2 9.5l-3 7.9-.3-1.5c-.5-1.8-2.2-3.8-4.1-4.8l2.7 10h3.2l4.8-11.6h-3.3z" fill="white" />
                  <path d="M12.5 9.5H7.6l0 .2c3.8.9 6.3 3.2 7.3 5.9l-1.1-5.2c-.2-.7-.7-.9-1.3-.9z" fill="#F9A51A" />
                </svg>
              </div>
              {/* Mastercard */}
              <div className="bg-white rounded px-2 py-1">
                <svg viewBox="0 0 48 32" className="h-6 w-9">
                  <rect width="48" height="32" rx="4" fill="#252525" />
                  <circle cx="19" cy="16" r="8" fill="#EB001B" />
                  <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                  <path d="M24 10.3c1.9 1.4 3.1 3.5 3.1 5.7s-1.2 4.3-3.1 5.7c-1.9-1.4-3.1-3.5-3.1-5.7s1.2-4.3 3.1-5.7z" fill="#FF5F00" />
                </svg>
              </div>
              {/* American Express */}
              <div className="bg-white rounded px-2 py-1">
                <svg viewBox="0 0 48 32" className="h-6 w-9">
                  <rect width="48" height="32" rx="4" fill="#016FD0" />
                  <path d="M24 22.5V10h5.8l.7 1.6.7-1.6H37v.8l.6-.8h3.5l.6.9V10h2.7v12.5h-3l-.5-1v1H37l-.4-1h-1l-.4 1h-2.7c-.8 0-1.4-.3-1.8-.7v.7h-4.3l-.5-1.2-.5 1.2H24z" fill="#016FD0" />
                  <text x="10" y="20" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="white">AMEX</text>
                </svg>
              </div>
              {/* Cheque */}
              <div className="bg-white rounded px-2 py-1 flex items-center">
                <svg viewBox="0 0 24 16" className="h-5 w-7">
                  <rect x="1" y="2" width="22" height="12" rx="1" fill="none" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="4" y1="11" x2="14" y2="11" stroke="#6B7280" strokeWidth="1" />
                  <line x1="4" y1="8.5" x2="10" y2="8.5" stroke="#6B7280" strokeWidth="0.7" />
                  <text x="16" y="7" fontFamily="Arial" fontSize="4" fill="#6B7280">$</text>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
