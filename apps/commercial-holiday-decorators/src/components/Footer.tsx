import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getCities, getServices } from "@/lib/content";
import { Icon } from "./Icons";

export function Footer() {
  const cities = getCities();
  const services = getServices();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t on-photo" style={{ background: "var(--deep)", borderColor: "var(--border)" }}>
      <div className="wrap py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Image src="/images/logo-dark.png" alt={site.name} width={3015} height={522} className="h-12 w-auto mb-4" />
            <p className="text-sm text-[#c9d3cf] leading-relaxed max-w-xs">
              Turnkey commercial holiday decorating and lighting for hotels, lobbies, plazas, offices and municipalities across Ontario. Insured, WSIB-compliant, since {site.since}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {Object.entries(site.socials).map(([k, url]) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${k}`} className="icon-tile !w-10 !h-10 hover:bg-[var(--gold)] hover:text-[#1a1300] transition-colors">
                  {k === "instagram" ? <Icon.Instagram width={18} height={18} /> : k === "youtube" ? <Icon.Camera width={18} height={18} /> : <Icon.Users width={18} height={18} />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#9fb3ab] mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-[#d6e0dc] hover:text-white transition-colors inline-block py-0.5">{s.shortName}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#9fb3ab] mb-4">Who we serve</h3>
            <ul className="space-y-2.5 text-sm">
              {site.nav.sectors.map((s) => (
                <li key={s.href}><Link href={s.href} className="text-[#d6e0dc] hover:text-white transition-colors inline-block py-0.5">{s.label}</Link></li>
              ))}
              <li><Link href="/gallery" className="text-[#d6e0dc] hover:text-white inline-block py-0.5">Gallery</Link></li>
              <li><Link href="/guides" className="text-[#d6e0dc] hover:text-white inline-block py-0.5">Guides</Link></li>
              <li><Link href="/faq" className="text-[#d6e0dc] hover:text-white inline-block py-0.5">FAQ</Link></li>
              <li><Link href="/about" className="text-[#d6e0dc] hover:text-white inline-block py-0.5">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#9fb3ab] mb-4">Service area</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-[#d6e0dc] hover:text-white transition-colors inline-block py-0.5">{c.name}</Link></li>
              ))}
            </ul>
            <Link href="/service-areas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e9c66f] hover:underline">All service areas <Icon.Arrow width={14} height={14} /></Link>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#9fb3ab] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 text-white font-semibold hover:text-[#e9c66f] min-h-[44px]">
                  <span className="icon-tile !w-9 !h-9"><Icon.Phone width={16} height={16} /></span>{site.phone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-3 text-white font-semibold hover:text-[#e9c66f] min-h-[44px]">
                  <span className="icon-tile !w-9 !h-9"><Icon.Mail width={16} height={16} /></span>{site.quote.cta}
                </Link>
              </li>
              <li className="flex items-start gap-3 text-[#d6e0dc]">
                <span className="icon-tile !w-9 !h-9 shrink-0"><Icon.Pin width={16} height={16} /></span>
                <span className="pt-2">{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postal}</span>
              </li>
              <li className="flex items-start gap-3 text-[#d6e0dc]">
                <span className="icon-tile !w-9 !h-9 shrink-0"><Icon.Clock width={16} height={16} /></span>
                <span className="pt-2">{site.hoursDetailed.map((h) => (<span key={h.day} className="block">{h.day}: {h.hours}</span>))}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9fb3ab]">
          <p>© {year} {site.name}. A division of <a href={site.sisterBrand.url} className="hover:text-white underline underline-offset-2">{site.sisterBrand.name}</a>. Serving {site.regionLabel}.</p>
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
