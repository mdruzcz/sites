import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { AwardBadge } from "@/components/award-badge";
import {
  PhoneIcon,
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
} from "./icons";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--night-deep)",
        borderColor: "rgba(245,194,107,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Logo className="h-12 w-auto mb-5" />
            <p className="text-sm text-white/55 leading-relaxed max-w-md mb-5">
              Halton Region's permanent outdoor LED lighting experts. We design,
              install and warranty smart, weatherproof lighting that makes your
              home shine — every season of the year.
            </p>
            <div className="flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Halton Glow Lighting on Instagram"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-white/55 hover:text-[var(--gold-bright)] hover:border-[var(--gold)]/40 transition"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <InstagramIcon />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Halton Glow Lighting on Facebook"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-white/55 hover:text-[var(--gold-bright)] hover:border-[var(--gold)]/40 transition"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--gold-bright)" }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Why Halton Glow", href: "/#why" },
                { label: "How It Works", href: "/#how" },
                { label: "Gallery", href: "/#gallery" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Service Areas", href: "/#service-areas" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/55 hover:text-white transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--gold-bright)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/55">
                <PhoneIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href={site.phoneHref}
                  className="hover:text-white transition"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/55">
                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Burlington & Oakville, ON</span>
              </li>
            </ul>
            <div className="mt-5 text-xs text-white/35">
              <p>Mon – Fri: 8 AM – 8 PM</p>
              <p>Sat: 9 AM – 6 PM · Sun: 10 AM – 4 PM</p>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <AwardBadge />
          <p className="text-xs text-white/30">
            Permanent Outdoor LED Lighting · Burlington · Oakville · Halton Region
          </p>
        </div>
      </div>
    </footer>
  );
}
