import Link from "next/link";
import { site } from "@/lib/site";
import { GROUPS } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="container py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold text-white text-lg mb-3">
            RTA Cabinets <span className="text-accent">Canada</span>
          </p>
          <p className="text-sm leading-relaxed">{site.tagline}</p>
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
          </ul>
          <p className="text-sm mt-4">Ships across {site.serviceArea}.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {site.name}. White Shaker RTA cabinets, shipped Canada-wide.</p>
          <p>Premium ready-to-assemble kitchen cabinets.</p>
        </div>
      </div>
    </footer>
  );
}
