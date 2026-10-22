import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getCities } from "@/lib/content";
import { Icon } from "./Icons";

export function Footer() {
  const cities = getCities();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t on-photo" style={{ background: "var(--deep)", borderColor: "var(--border)" }}>
      <div className="wrap py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image src="/images/logo-dark.png" alt="Celebrate Lighting" width={1881} height={522} className="h-14 w-auto mb-4" />
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Permanent outdoor LED lighting and seasonal C9 Christmas lights, installed across Southwestern Ontario from our base in Woodstock.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Celebrate Lighting on Instagram" className="icon-tile !w-10 !h-10 hover:bg-[var(--accent)] hover:text-[#04121a] transition-colors">
                <Icon.Instagram width={18} height={18} />
              </a>
              <Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--accent)]">
                <Icon.Google width={18} height={18} /> Read our reviews
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Quick links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Permanent Lighting", "/permanent-lighting"],
                ["Seasonal C9 Lights", "/seasonal-lighting"],
                ["Commercial", "/commercial"],
                ["Free AI Home Preview", "/ai-preview"],
                ["Gallery", "/gallery"],
                ["Occasions", "/occasions"],
                ["Guides", "/guides"],
                ["Compare Options", "/compare"],
                ["FAQ", "/faq"],
                ["About", "/about"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#c3cddc] hover:text-white transition-colors inline-block py-0.5">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Service area</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="text-[#c3cddc] hover:text-white transition-colors inline-block py-0.5">{c.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/service-areas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline">
              All service areas <Icon.Arrow width={14} height={14} />
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="flex items-center gap-3 text-white font-semibold hover:text-[var(--accent)] min-h-[44px]">
                  <span className="icon-tile !w-9 !h-9"><Icon.Mail width={16} height={16} /></span>Send us a request
                </Link>
              </li>
              <li className="flex items-start gap-3 text-[#c3cddc]">
                <span className="icon-tile !w-9 !h-9 shrink-0"><Icon.Pin width={16} height={16} /></span>
                <span className="pt-2">{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postal}</span>
              </li>
              <li className="flex items-start gap-3 text-[#c3cddc]">
                <span className="icon-tile !w-9 !h-9 shrink-0"><Icon.Clock width={16} height={16} /></span>
                <span className="pt-2">{site.hoursDetailed.map((h) => (<span key={h.day} className="block">{h.day}: {h.hours}</span>))}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p>© {year} {site.name}. All rights reserved. Serving Southwestern Ontario.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
