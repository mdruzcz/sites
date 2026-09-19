import Link from "next/link";
import { Wordmark } from "./wordmark";
import { CITIES } from "@/lib/cities";
import { SITE } from "@/lib/utils";
import { AwardBadge } from "@/components/award-badge";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-navy)] text-[var(--color-sandstone)]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <div className="rounded-sm bg-[var(--color-cream)] inline-block px-3 py-3">
              <Wordmark size="sm" />
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              {SITE.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-brass)]">
              Shop
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/base-cabinets" className="hover:text-white">Base Cabinets</Link></li>
              <li><Link href="/drawer-cabinets" className="hover:text-white">Drawer Cabinets</Link></li>
              <li><Link href="/wall-cabinets" className="hover:text-white">Wall Cabinets</Link></li>
              <li><Link href="/accessories" className="hover:text-white">Accessories</Link></li>
              <li><Link href="/cabinets/sample-door" className="hover:text-white">Order a Sample Door</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-brass)]">
              Buying From Us
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/planner" className="hover:text-white">Kitchen Planner</Link></li>
              <li><Link href="/our-kitchens" className="hover:text-white">Kitchens We&rsquo;ve Built</Link></li>
              <li><Link href="/service-area" className="hover:text-white">Service Area (SW Ontario)</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/our-cabinets" className="hover:text-white">Our Cabinets</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-white">Shipping &amp; Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-brass)]">
              Service Area
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/cabinets-${c.slug}`} className="hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-area" className="hover:text-white opacity-70">
                  See all areas →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-brass)]">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs opacity-60">
              Trade pricing for contractors &amp; designers — <Link href="/contact" className="underline">get in touch</Link>.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
          <AwardBadge />
        </div>
        <div className="mt-4 flex flex-col gap-2 text-xs opacity-60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Forever Cabinets. All rights reserved.</p>
          <p>{SITE.shippingNote} · {SITE.leadTime} lead time · {SITE.returnsWindow}</p>
        </div>
      </div>
    </footer>
  );
}
