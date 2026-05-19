import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";

export function Footer() {
  const services = getServices();

  return (
    <footer className="bg-[var(--navy)]">
      {/* Accent strip */}
      <div className="h-1 bg-accent-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pb-10 mb-10 border-b border-white/10">
          {["Licensed General Contractor", "Fully Insured & Bonded", "Permit Specialists", "2-Year Warranty"].map((badge) => (
            <span key={badge} className="flex items-center gap-2 text-white/50 text-sm">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/images/logo-white.svg"
              alt={`${site.name} — basement renovations in London, Ontario`}
              width={200}
              height={50}
              className="h-10 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              London Ontario&apos;s trusted experts in legal basement apartments,
              second suites, underpinning, waterproofing, and full basement
              renovations. {site.yearsExperience}+ years of experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {site.serviceAreas.map((area) => (
                <li key={area} className="text-slate-400 text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="text-slate-400 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {site.phone}
                </a>
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {site.hours}
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-white text-sm">
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/30 text-sm">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            Licensed and insured general contractor serving London, Ontario and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  );
}
