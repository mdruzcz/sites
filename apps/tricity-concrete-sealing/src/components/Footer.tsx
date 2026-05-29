import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export function Footer() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/images/Logo-1-e1721313045424-394x132.png"
              alt="TriCity Concrete Sealing logo"
              width={157}
              height={53}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Professional concrete sealing across Southwestern Ontario. Driveways, patios, stamped concrete, walkways — protected by our {site.warrantyYears}-year written warranty.
            </p>
            <a
              href={site.emailHref}
              className="text-[var(--accent)] text-sm font-semibold hover:underline"
            >
              {site.email}
            </a>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--accent)]">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
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
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {city.name}, ON
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link href="/service-areas" className="text-[var(--accent)] text-xs font-semibold hover:underline">
                View all areas →
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--accent)]">Company</h4>
            <ul className="space-y-2 mb-6">
              <li><Link href="/about" className="text-white/60 text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-white/60 text-sm hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/warranty" className="text-white/60 text-sm hover:text-white transition-colors">Warranty Information</Link></li>
              <li><Link href="/contact" className="text-white/60 text-sm hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <ClockIcon className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>{site.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <PinIcon className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <span>London, ON — Southwestern Ontario</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/warranty" className="hover:text-white transition-colors">Warranty</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
