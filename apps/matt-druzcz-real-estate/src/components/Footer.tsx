import Link from "next/link";

const PhoneIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12" style={{ background: "#06090F", borderTop: "1px solid var(--navy-border)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-serif text-base font-bold transition-all group-hover:scale-105"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                MD
              </div>
              <div>
                <div className="font-serif font-semibold text-sm" style={{ color: "var(--cream)" }}>Matt Druzcz</div>
                <div className="text-xs" style={{ color: "var(--cream-muted)" }}>Realtor · London & Area</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--cream-muted)" }}>
              Honest real estate advice for buyers, sellers, and investors across London, Aylmer, St. Thomas, and Woodstock, Ontario.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/mattdruzcz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: "var(--navy-border)", color: "var(--cream-muted)" }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/mattdruzcz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: "var(--navy-border)", color: "var(--cream-muted)" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Matt", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Sell Your Home", href: "/services/selling" },
                { label: "Buy a Home", href: "/services/buying" },
                { label: "Investment Properties", href: "/services/investment-properties" },
                { label: "Service Areas", href: "/areas" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:underline transition-colors"
                    style={{ color: "var(--cream-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+15198786735" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--cream-muted)" }}>
                  <PhoneIcon /> (519) 878-6735
                </a>
              </li>
              <li>
                <a href="mailto:matt.druzcz@gmail.com" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--cream-muted)" }}>
                  <MailIcon /> matt.druzcz@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm" style={{ color: "var(--cream-muted)" }}>
                  <MapPinIcon /> London · Aylmer · St. Thomas · Woodstock, ON
                </span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--gold)", color: "#0A0F1E" }}
            >
              Get a Free Valuation
            </Link>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid var(--navy-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--cream-muted)" }}>
            © {year} Matt Druzcz. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--cream-muted)" }}>
            Realtor® serving London, Aylmer, St. Thomas &amp; Woodstock, Ontario
          </p>
        </div>
      </div>
    </footer>
  );
}
