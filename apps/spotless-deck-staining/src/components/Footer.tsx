import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MapPinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--greige-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Logo className="h-12 w-auto mb-5" />
            <p className="text-sm text-[var(--driftwood)]/75 leading-relaxed max-w-md">
              Kitchener-Waterloo&apos;s deck and fence staining specialists. We
              protect, restore and transform outdoor wood with premium
              penetrating stains and proper prep — every time.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--terracotta-deep)]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Why Spotless",     href: "/#why" },
                { label: "Services",         href: "/#services" },
                { label: "How It Works",     href: "/#how" },
                { label: "Gallery",          href: "/#gallery" },
                { label: "Service Areas",    href: "/#service-areas" },
                { label: "FAQ",              href: "/#faq" },
                { label: "Get a Quote",      href: "/#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--driftwood)]/75 hover:text-[var(--terracotta-deep)] transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--terracotta-deep)]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[var(--driftwood)]/75">
                <PhoneIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--terracotta)]" />
                <a
                  href={site.phoneHref}
                  className="hover:text-[var(--driftwood-dark)] transition font-medium"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--driftwood)]/75">
                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--terracotta)]" />
                <span>Kitchener · Waterloo · Cambridge · Guelph</span>
              </li>
            </ul>
            <div className="mt-5 text-xs text-[var(--driftwood)]/60">
              {site.hoursList.map((h) => (
                <p key={h.days}>
                  <span className="font-medium">{h.days}:</span> {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--line)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--driftwood)]/55">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--driftwood)]/45">
            Deck &amp; Fence Staining · Kitchener · Waterloo · Cambridge · Guelph
          </p>
        </div>
      </div>
    </footer>
  );
}
