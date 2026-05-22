import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export function Footer() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 18h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V8zm0-5h18v2H3V3z" />
                </svg>
              </div>
              <div className="font-extrabold text-lg">
                Concrete<span className="text-[var(--accent)]">Tilsonburg</span>
              </div>
            </div>
            <p className="text-[var(--concrete-200)] text-sm leading-relaxed">
              Oxford County&apos;s trusted concrete contractor. Custom driveways, stamped patios, and structural repairs — engineered for {site.yearsExperience}+ years of Ontario winters.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--accent)]">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[var(--concrete-200)] text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--accent)]">Service Areas</h4>
            <ul className="space-y-2">
              {areas.cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="text-[var(--concrete-200)] text-sm hover:text-white transition-colors"
                  >
                    {city.name}, ON
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/service-areas" className="text-[var(--accent)] text-xs font-semibold hover:underline">
                View all service areas →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--accent)]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="text-[var(--concrete-200)] text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {site.phone}
                </a>
              </li>
              <li className="text-[var(--concrete-200)] text-sm flex items-start gap-2">
                <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{site.hours}</span>
              </li>
              <li className="text-[var(--concrete-200)] text-sm flex items-start gap-2">
                <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tillsonburg, ON — Oxford County</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-primary text-sm">
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--concrete-200)]">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
