import Link from "next/link";
import { site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* ── Column 1: About ── */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              {site.name}
            </h3>
            <p className="text-sm leading-relaxed text-white/75">
              Hot Tub Pads provides durable concrete solutions for your spa
              installations. Quality and service guaranteed.
            </p>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact Info ── */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                {/* mail icon */}
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={site.emailHref}
                  className="transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </li>

              <li className="flex items-start gap-2">
                {/* map-pin icon */}
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{site.addressLine}</span>
              </li>

              <li className="flex items-start gap-2">
                {/* clock icon */}
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                </svg>
                <div>
                  <p>{site.hours}</p>
                  <p>{site.hoursSaturday}</p>
                  <p>{site.hoursWeekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
          <p className="text-center text-xs text-white/50">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
