import Link from "next/link";
import Image from "next/image";
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
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Toronto Deck Stainers logo"
                width={160}
                height={71}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-[var(--concrete-200)] text-sm leading-relaxed">
              Toronto&apos;s trusted deck staining, sealing, and restoration experts since 2008. Premium eco-friendly stains built to withstand Canadian winters.
            </p>
            <div className="mt-4 flex gap-3">
              <a href={site.emailHref} className="text-xs text-[var(--concrete-200)] hover:text-white transition-colors">
                {site.email}
              </a>
            </div>
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
              {areas.cities.slice(0, 7).map((city) => (
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
                  <PhoneIcon />
                  {site.phone}
                </a>
              </li>
              <li className="text-[var(--concrete-200)] text-sm flex items-start gap-2">
                <ClockIcon />
                <span>{site.hours}</span>
              </li>
              <li className="text-[var(--concrete-200)] text-sm flex items-start gap-2">
                <MapIcon />
                <span>Toronto, ON — GTA Wide</span>
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

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
