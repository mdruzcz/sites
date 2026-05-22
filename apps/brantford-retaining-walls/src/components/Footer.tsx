import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export function Footer() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <footer className="bg-[var(--charcoal)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[var(--accent)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l4-4h10l4 4v13M7 21v-4h4v4M13 21v-4h4v4" />
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-base tracking-tight leading-none">Brantford</p>
                <p className="font-bold text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mt-0.5">Retaining Walls</p>
              </div>
            </div>
            <p className="text-[var(--concrete-200)] text-sm leading-relaxed mb-4">
              Professional retaining wall installation and hardscape solutions in Brantford and nearby areas.
              Engineered for Ontario winters with a focus on proper drainage and structural integrity.
            </p>
            <p className="text-[var(--concrete-200)] text-xs">
              Also serving: Paris · Cambridge · Hamilton · St. George
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-[0.15em] text-[var(--accent)]">Services</h4>
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
            <h4 className="font-bold mb-4 text-xs uppercase tracking-[0.15em] text-[var(--accent)]">Service Areas</h4>
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
          </div>

          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-[0.15em] text-[var(--accent)]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={site.phoneHref} className="text-[var(--concrete-200)] text-sm hover:text-white transition-colors flex items-center gap-2">
                  <PhoneIcon />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="text-[var(--concrete-200)] text-sm hover:text-white transition-colors flex items-center gap-2">
                  <MailIcon />
                  {site.email}
                </a>
              </li>
              <li className="text-[var(--concrete-200)] text-sm flex items-start gap-2">
                <ClockIcon />
                <span>{site.hours}</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-primary text-xs w-full">
                Get a Free Quote
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
    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
