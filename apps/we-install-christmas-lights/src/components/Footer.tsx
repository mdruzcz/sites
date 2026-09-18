import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, PinterestIcon, YoutubeIcon, PhoneIcon, MailIcon, MapPinIcon } from "./icons";
import { AwardBadge } from "@/components/award-badge";

export function Footer() {
  return (
    <footer className="bg-[color:var(--bg-cream)] text-[color:var(--ink-strong)] border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="We Install Christmas Lights logo"
              width={260}
              height={64}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-5 text-sm text-[color:var(--ink-soft)] leading-relaxed">
            Professional Christmas and holiday lighting service for homes and businesses across South-Western Ontario. 5-star rated and family-owned.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={site.social.facebook} aria-label="Follow on Facebook" className="text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]"><FacebookIcon /></a>
            <a href={site.social.pinterest} aria-label="Follow on Pinterest" className="text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]"><PinterestIcon /></a>
            <a href={site.social.instagram} aria-label="Follow on Instagram" className="text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]"><InstagramIcon /></a>
            <a href={site.social.youtube} aria-label="Follow on YouTube" className="text-[color:var(--brand-green)] hover:text-[color:var(--brand-red)]"><YoutubeIcon /></a>
          </div>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--brand-green)]">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
            <li><Link href="/services/residential-christmas-light-installation" className="hover:text-[color:var(--brand-red)]">Residential Light Installation</Link></li>
            <li><Link href="/services/residential-christmas-decorators" className="hover:text-[color:var(--brand-red)]">Residential Decorators</Link></li>
            <li><Link href="/services/commercial-christmas-light-installation" className="hover:text-[color:var(--brand-red)]">Commercial Light Installation</Link></li>
            <li><Link href="/services/commercial-christmas-decorators" className="hover:text-[color:var(--brand-red)]">Commercial Decorators</Link></li>
            <li><Link href="/services/commercial-christmas-trees-and-decorations" className="hover:text-[color:var(--brand-red)]">Commercial Trees & Décor</Link></li>
            <li><Link href="/services/full-season-holiday-service" className="hover:text-[color:var(--brand-red)]">Full Season Service</Link></li>
            <li><Link href="/services/christmas-light-year-long-storage" className="hover:text-[color:var(--brand-red)]">Year-Long Storage</Link></li>
            <li><Link href="/lighting-packages" className="hover:text-[color:var(--brand-red)]">Cost Estimator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--brand-green)]">Industries We Serve</h4>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
            <li><Link href="/industries/christmas-decorators-for-banks" className="hover:text-[color:var(--brand-red)]">Banks</Link></li>
            <li><Link href="/industries/christmas-decorator-for-malls" className="hover:text-[color:var(--brand-red)]">Malls</Link></li>
            <li><Link href="/industries/christmas-decorators-for-restaurants" className="hover:text-[color:var(--brand-red)]">Restaurants</Link></li>
            <li><Link href="/industries/christmas-decorators-for-hotels" className="hover:text-[color:var(--brand-red)]">Hotels</Link></li>
            <li><Link href="/industries/christmas-decorators-for-hoas" className="hover:text-[color:var(--brand-red)]">HOAs</Link></li>
            <li><Link href="/industries/christmas-decorators-for-churches" className="hover:text-[color:var(--brand-red)]">Churches</Link></li>
            <li><Link href="/industries/christmas-decorators-for-municipalities" className="hover:text-[color:var(--brand-red)]">Municipalities</Link></li>
            <li><Link href="/industries/christmas-decorators-for-car-dealerships" className="hover:text-[color:var(--brand-red)]">Car Dealerships</Link></li>
            <li><Link href="/industries/christmas-decorators-for-casinos" className="hover:text-[color:var(--brand-red)]">Casinos</Link></li>
            <li><Link href="/industries/christmas-decorators-for-retail" className="hover:text-[color:var(--brand-red)]">Retail</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--brand-green)]">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
              <span>{site.addressLine}</span>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
              <a href={site.phoneHref} className="hover:text-[color:var(--brand-red)]">{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--brand-red)]" />
              <a href={`mailto:${site.email}`} className="hover:text-[color:var(--brand-red)] break-all">{site.email}</a>
            </li>
          </ul>

          <h4 className="heading-display text-sm text-[color:var(--brand-green)] mt-8">Affiliates</h4>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--ink-soft)]">
            {site.affiliates.map((a) => (
              <li key={a.name}><a href={a.url} className="hover:text-[color:var(--brand-red)]" target="_blank" rel="noopener">{a.name}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[color:var(--ink-soft)]">
          <AwardBadge />
          <div>© {new Date().getFullYear()} We Install Christmas Lights. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <Link href="/disclaimer" className="hover:text-[color:var(--brand-red)]">Disclaimer</Link>
            <Link href="/terms-of-use" className="hover:text-[color:var(--brand-red)]">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:text-[color:var(--brand-red)]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
