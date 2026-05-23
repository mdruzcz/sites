import Link from "next/link";
import { Wordmark } from "./wordmark";
import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-line)] bg-[var(--color-paper-warm)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Wordmark />
          <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
            Pre-built White Shaker kitchen packages — assembled, in stock, ready for pickup in Belmont, ON.
          </p>
          <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
            Supplied and assembled by <a className="underline underline-offset-2" href="https://forevercabinets.ca" target="_blank" rel="noopener">Forever Cabinets</a>.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/kits" className="hover:text-[var(--color-accent)]">All Kitchen Kits</Link></li>
            <li><Link href="/kits/kitchenette" className="hover:text-[var(--color-accent)]">The Kitchenette</Link></li>
            <li><Link href="/kits/urban-starter" className="hover:text-[var(--color-accent)]">Urban Starter</Link></li>
            <li><Link href="/kits/the-compact" className="hover:text-[var(--color-accent)]">The Compact</Link></li>
            <li><Link href="/kits/island-entertainer" className="hover:text-[var(--color-accent)]">Island Entertainer</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Info</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:text-[var(--color-accent)]">How It Works</Link></li>
            <li><Link href="/pickup" className="hover:text-[var(--color-accent)]">Pickup &amp; Delivery</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--color-accent)]">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-[var(--color-accent)]">About</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-accent)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Visit / Call</h3>
          <address className="not-italic mt-3 space-y-1 text-sm text-[var(--color-ink-soft)]">
            <div>50432 Yorke Line</div>
            <div>Belmont, ON {SITE.postalCode}</div>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="block pt-2 font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)]">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="block hover:text-[var(--color-accent)]">
              {SITE.email}
            </a>
            <p className="pt-2 text-xs">{SITE.pickupHours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-[var(--color-line)] px-4 py-4 text-center text-xs text-[var(--color-ink-soft)] lg:px-8">
        © {new Date().getFullYear()} Ready Kitchens. Premium plywood cabinets, fully assembled.
      </div>
    </footer>
  );
}
