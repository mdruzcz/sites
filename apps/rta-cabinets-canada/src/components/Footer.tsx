import Link from "next/link";
import { site } from "@/lib/site";
import { GROUPS } from "@/lib/catalog";
import { Wordmark } from "./Logo";
import { getCities } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="container py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg mb-3">
            <Wordmark light />
          </p>
          <p className="text-sm leading-relaxed">{site.tagline}</p>
          <p className="text-sm leading-relaxed mt-2">Based in {site.city}, {site.province}. Free delivery within {site.freeDeliveryKm} km.</p>
          <p className="text-sm mt-4">
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-white break-all">
              {site.email}
            </a>
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Shop by Type</p>
          <ul className="space-y-2 text-sm">
            {GROUPS.slice(0, 6).map((g) => (
              <li key={g.slug}>
                <Link href={`/shop/${g.slug}`} className="hover:text-white">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white">All Cabinets</Link></li>
            <li><Link href="/sale" className="hover:text-white">Sale</Link></li>
            <li><Link href="/planner" className="hover:text-white">3D Kitchen Planner</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Kitchen Gallery</Link></li>
            <li><Link href="/resources" className="hover:text-white">Guides &amp; Resources</Link></li>
            <li><Link href="/kitchen-packages" className="hover:text-white">Kitchen Packages</Link></li>
            <li><Link href="/how-to-measure" className="hover:text-white">How to Measure</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/request" className="hover:text-white">Request a Quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/shipping-and-delivery" className="hover:text-white">Shipping &amp; Free Delivery</Link></li>
            <li><Link href="/financing" className="hover:text-white">0% APR Financing</Link></li>
            <li><Link href="/lowest-price-guarantee" className="hover:text-white">Lowest Price Guarantee</Link></li>
            <li><Link href="/assembly-service" className="hover:text-white">Expert Assembly</Link></li>
            <li><Link href="/warranty" className="hover:text-white">Warranty &amp; Returns</Link></li>
          </ul>
          <p className="font-semibold text-white mb-3 mt-6">Free Delivery To</p>
          <ul className="space-y-2 text-sm">
            {getCities().map((c) => (
              <li key={c.slug}>
                <Link href={`/kitchen-cabinets/${c.slug}`} className="hover:text-white">
                  Kitchen Cabinets {c.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {site.name}. White Shaker RTA cabinets, shipped Canada-wide.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link href="/warranty" className="hover:text-white">Warranty</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
