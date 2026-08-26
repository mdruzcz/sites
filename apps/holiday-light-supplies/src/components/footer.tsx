import Link from "next/link";
import { TruckIcon } from "@/components/truck-icon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-muted)]">
      {/* Policies row */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)] py-3.5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 text-center text-xs font-medium text-[var(--color-brand)] md:grid-cols-4">
          <span className="inline-flex items-center justify-center gap-1.5">
            <TruckIcon className="size-4" /> Free shipping over $150
          </span>
          <span>↩️ 30-day returns</span>
          <span>🛡️ 5-year LED warranty</span>
          <span>🍁 Ships across Ontario</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <h4 className="font-display text-2xl font-bold text-[var(--color-brand)]">
            Holiday Light <span className="text-[var(--color-accent)]">Supplies</span>
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Commercial-grade C9 bulbs, G20 globes, mini strands, snowfall tubes, LED trees and 3D
            displays — professional Christmas lighting gear shipped direct from our Ontario warehouse.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand)]">
            🍁 Proudly Canadian · Ships across Ontario
          </p>
        </div>
        <div>
          <h5 className="eyebrow text-[var(--color-brand)]">Shop</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-[var(--color-accent)]">All products</Link></li>
            <li><Link href="/product-category/large-strawberry-lights-c9" className="hover:text-[var(--color-accent)]">C9 Strawberry bulbs</Link></li>
            <li><Link href="/product-category/super-bright-globe-lights-g20" className="hover:text-[var(--color-accent)]">G20 globe lights</Link></li>
            <li><Link href="/product-category/3d" className="hover:text-[var(--color-accent)]">3D displays</Link></li>
            <li><Link href="/product-category/trees" className="hover:text-[var(--color-accent)]">Pre-lit LED trees</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-[var(--color-brand)]">Programs</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/professional-installer" className="hover:text-[var(--color-accent)]">Pro Installer Program</Link></li>
            <li><Link href="/municipalities" className="hover:text-[var(--color-accent)]">Municipalities & BIAs</Link></li>
          </ul>
          <h5 className="eyebrow mt-6 text-[var(--color-brand)]">Self-service</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/track-order" className="hover:text-[var(--color-accent)]">Track your order</Link></li>
            <li><Link href="/account" className="hover:text-[var(--color-accent)]">Your account</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-[var(--color-brand)]">Support</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/gallery" className="hover:text-[var(--color-accent)]">Gallery</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-[var(--color-accent)]">Shipping & returns</Link></li>
            <li><Link href="/warranty" className="hover:text-[var(--color-accent)]">5-year warranty</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--color-accent)]">FAQ</Link></li>
            <li><Link href="/contact-us" className="hover:text-[var(--color-accent)]">Contact</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-[var(--color-accent)]">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--color-accent)]">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-5 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} Holiday Light Supplies · Proudly Canadian · Shipping across Ontario
      </div>
    </footer>
  );
}
