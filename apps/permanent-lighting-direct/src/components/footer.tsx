import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-brand-deep)] text-slate-300">
      <div className="bg-[var(--color-brand)] py-3">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 text-center text-xs text-white md:grid-cols-4">
          <span>⚡ DIY kits from $9/ft</span>
          <span>🚚 Free shipping over $500</span>
          <span>🛡️ 5-year LED warranty</span>
          <span>🍁 Ships from London, ON</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <h4 className="font-display text-xl font-bold text-white">
            Permanent Lighting <span className="rainbow-text">Direct</span>
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            DIY permanent LED lighting kits shipped direct from London, Ontario. Pro results without the
            pro install price tag.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--color-gold)]">
            🍁 Proudly Canadian · Ships from London, ON
          </p>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Shop</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/diy-kits" className="hover:text-white">DIY Kits ★</Link></li>
            <li><Link href="/shop" className="hover:text-white">All products</Link></li>
            <li><Link href="/product-category/lights" className="hover:text-white">Lights</Link></li>
            <li><Link href="/product-category/controllers" className="hover:text-white">Controllers</Link></li>
            <li><Link href="/product-category/connectors" className="hover:text-white">Connectors</Link></li>
            <li><Link href="/product-category/power-supplies" className="hover:text-white">Power supplies</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Resources</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
            <li><Link href="/professional-installer" className="hover:text-white">Installer Program</Link></li>
            <li><Link href="/installers" className="hover:text-white">Find an installer</Link></li>
          </ul>
          <h5 className="eyebrow mt-6 text-white/80">Self-service</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/track-order" className="hover:text-white">Track your order</Link></li>
            <li><Link href="/account" className="hover:text-white">Your account</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Support</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shipping-returns" className="hover:text-white">Shipping & returns</Link></li>
            <li><Link href="/warranty" className="hover:text-white">5-year warranty</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-white">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Permanent Lighting Direct · Proudly Canadian · Shipping out of London, Ontario
      </div>
    </footer>
  );
}
