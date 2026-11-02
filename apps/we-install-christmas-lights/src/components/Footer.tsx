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
            <a href={site.social.facebook} aria-label="Follow on Facebook" className="text-[color:var(--accent)] hover:text-[color:var(--accent)]"><FacebookIcon /></a>
            <a href={site.social.pinterest} aria-label="Follow on Pinterest" className="text-[color:var(--accent)] hover:text-[color:var(--accent)]"><PinterestIcon /></a>
            <a href={site.social.instagram} aria-label="Follow on Instagram" className="text-[color:var(--accent)] hover:text-[color:var(--accent)]"><InstagramIcon /></a>
            <a href={site.social.youtube} aria-label="Follow on YouTube" className="text-[color:var(--accent)] hover:text-[color:var(--accent)]"><YoutubeIcon /></a>
          </div>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--accent)]">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
            <li><Link href="/services/residential-christmas-light-installation" className="hover:text-[color:var(--accent)]">Residential Light Installation</Link></li>
            <li><Link href="/services/residential-christmas-decorators" className="hover:text-[color:var(--accent)]">Residential Decorators</Link></li>
            <li><Link href="/services/commercial-christmas-light-installation" className="hover:text-[color:var(--accent)]">Commercial Light Installation</Link></li>
            <li><Link href="/services/commercial-christmas-decorators" className="hover:text-[color:var(--accent)]">Commercial Decorators</Link></li>
            <li><Link href="/services/commercial-christmas-trees-and-decorations" className="hover:text-[color:var(--accent)]">Commercial Trees & Décor</Link></li>
            <li><Link href="/services/full-season-holiday-service" className="hover:text-[color:var(--accent)]">Full Season Service</Link></li>
            <li><Link href="/services/christmas-light-year-long-storage" className="hover:text-[color:var(--accent)]">Year-Long Storage</Link></li>
            <li><Link href="/estimator" className="hover:text-[color:var(--accent)]">Cost Estimator</Link></li>
            <li><Link href="/rebook" className="hover:text-[color:var(--accent)]">Rebook Last Year&rsquo;s Design</Link></li>
            <li><Link href="/refer" className="hover:text-[color:var(--accent)]">Refer a Neighbour</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--accent)]">Industries We Serve</h4>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
            <li><Link href="/industries/christmas-decorators-for-banks" className="hover:text-[color:var(--accent)]">Banks</Link></li>
            <li><Link href="/industries/christmas-decorator-for-malls" className="hover:text-[color:var(--accent)]">Malls</Link></li>
            <li><Link href="/industries/christmas-decorators-for-restaurants" className="hover:text-[color:var(--accent)]">Restaurants</Link></li>
            <li><Link href="/industries/christmas-decorators-for-hotels" className="hover:text-[color:var(--accent)]">Hotels</Link></li>
            <li><Link href="/industries/christmas-decorators-for-hoas" className="hover:text-[color:var(--accent)]">HOAs</Link></li>
            <li><Link href="/industries/christmas-decorators-for-churches" className="hover:text-[color:var(--accent)]">Churches</Link></li>
            <li><Link href="/industries/christmas-decorators-for-municipalities" className="hover:text-[color:var(--accent)]">Municipalities</Link></li>
            <li><Link href="/industries/christmas-decorators-for-car-dealerships" className="hover:text-[color:var(--accent)]">Car Dealerships</Link></li>
            <li><Link href="/industries/christmas-decorators-for-casinos" className="hover:text-[color:var(--accent)]">Casinos</Link></li>
            <li><Link href="/industries/christmas-decorators-for-retail" className="hover:text-[color:var(--accent)]">Retail</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="heading-display text-sm text-[color:var(--accent)]">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--accent)]" />
              <span>{site.addressLine}</span>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--accent)]" />
              <a href={site.phoneHref} className="hover:text-[color:var(--accent)]">{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--accent)]" />
              <a href={`mailto:${site.email}`} className="hover:text-[color:var(--accent)] break-all">{site.email}</a>
            </li>
          </ul>

          <h4 className="heading-display text-sm text-[color:var(--accent)] mt-8">Affiliates</h4>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--ink-soft)]">
            {site.affiliates.map((a) => (
              <li key={a.name}><a href={a.url} className="hover:text-[color:var(--accent)]" target="_blank" rel="noopener">{a.name}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[color:var(--ink-soft)]">
          <AwardBadge />
          <div>© {new Date().getFullYear()} We Install Christmas Lights. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <Link href="/disclaimer" className="hover:text-[color:var(--accent)]">Disclaimer</Link>
            <Link href="/terms-of-use" className="hover:text-[color:var(--accent)]">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:text-[color:var(--accent)]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
