import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";
import { AwardBadge } from "@/components/award-badge";

export function Footer() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <footer className="bg-midnight relative overflow-hidden border-t border-soft">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-violet blur-3xl opacity-30" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-accent blur-3xl opacity-20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-extrabold text-lg text-white mb-4">
              Ontario<span className="text-accent">Light</span>Shows
            </div>
            <p className="text-muted-strong text-sm leading-relaxed">
              {site.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="spec-chip">IP67</span>
              <span className="spec-chip">IP68</span>
              <span className="spec-chip">Addressable</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-accent">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-strong text-sm hover:text-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-accent">Service Areas</h4>
            <ul className="space-y-2">
              {areas.cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="text-muted-strong text-sm hover:text-accent transition-colors"
                  >
                    {city.name}, ON
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-accent">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={site.phoneHref} className="text-muted-strong text-sm hover:text-accent transition-colors flex items-center gap-2">
                  <PhoneIcon /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="text-muted-strong text-sm hover:text-accent transition-colors flex items-center gap-2">
                  <MailIcon /> {site.email}
                </a>
              </li>
              <li className="text-muted-strong text-sm flex items-start gap-2">
                <ClockIcon /> <span>{site.hours}</span>
              </li>
              <li className="text-muted-strong text-sm flex items-start gap-2">
                <PinIcon /> <span>{site.addressLine}</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-primary text-sm">Get a Quote</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <AwardBadge />
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
              <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-accent transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
