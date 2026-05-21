import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/content";

export function Footer() {
  const services = getServices();
  const areas = getServiceAreas();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-extrabold text-lg mb-4">
              <span style={{ color: "#60A5FA" }}>Ontario</span>
              <span className="text-white"> Ramp</span>
              <span className="text-gray-400 font-semibold text-sm ml-1 tracking-widest uppercase"> Solutions</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Professional wheelchair ramp installation and rental across Ontario. Permanent installs, flexible rentals, and event accessibility — barrier-free for every guest.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="trust-chip" style={{ background: "rgba(96,165,250,0.1)", color: "#93C5FD", borderColor: "rgba(96,165,250,0.2)" }}>AODA Compliant</span>
              <span className="trust-chip" style={{ background: "rgba(96,165,250,0.1)", color: "#93C5FD", borderColor: "rgba(96,165,250,0.2)" }}>Licensed & Insured</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-300">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-300">Service Areas</h4>
            <ul className="space-y-2">
              {areas.cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {city.name}, ON
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-300">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href={site.phoneHref} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <PhoneIcon /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <MailIcon /> {site.email}
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <ClockIcon /> <span>{site.hours}</span>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <PinIcon /> <span>{site.addressLine}</span>
              </li>
            </ul>
            <Link href="/contact" className="btn btn-cta text-sm">Get a Free Quote</Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
