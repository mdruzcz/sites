import Link from "next/link";
import {
  COMPANY_NAME,
  PHONE,
  PHONE_HREF,
  EMAIL,
  SERVICES,
  CITIES,
} from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-dark text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-sand-light">
              {COMPANY_NAME}
            </h3>
            <p className="text-sm text-cream-dark leading-relaxed">
              Professional deck staining, sealing, and refinishing services
              proudly serving Southwestern Ontario.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-cream-dark hover:text-sand-light transition-colors"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-cream-dark hover:text-sand-light transition-colors"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand-light mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-cream-dark hover:text-sand-light transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand-light mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2 text-sm">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/areas/${c.slug}`}
                    className="text-cream-dark hover:text-sand-light transition-colors"
                  >
                    {c.name}, {c.province}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-sand-light mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/stain-choices" className="text-cream-dark hover:text-sand-light transition-colors">
                  Stain Choices
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-cream-dark hover:text-sand-light transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-cream-dark hover:text-sand-light transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream-dark hover:text-sand-light transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-dark hover:text-sand-light transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-wood-light/30 pt-8 text-center text-sm text-cream-dark">
          <p>
            &copy; {currentYear} {COMPANY_NAME}. All rights reserved. Proudly
            serving London, Woodstock, St Thomas, Strathroy, Brantford, and
            Hamilton, Ontario.
          </p>
        </div>
      </div>
    </footer>
  );
}
