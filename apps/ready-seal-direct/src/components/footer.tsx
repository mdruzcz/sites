import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-brand-deep)] text-orange-100/80">
      {/* Policies row */}
      <div className="bg-[var(--color-brand)] py-3">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 text-center text-xs text-white md:grid-cols-4">
          <span>🚚 Free shipping over $750</span>
          <span>↩️ 30-day returns</span>
          <span>🛡️ Oil-based · UV protection</span>
          <span>🍁 Ships from Belmont, ON</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <h4 className="font-display text-xl font-bold text-white">
            Ready Seal <span className="text-[var(--color-gold)]">Direct</span>
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-orange-100/70">
            Premium Ready Seal oil-based wood stain &amp; sealer, shipped direct across Ontario.
            Easy to apply, long-lasting protection against UV, moisture and mildew.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--color-gold)]">
            🍁 Proudly Canadian · Belmont, Ontario
          </p>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Shop</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white">All Stains &amp; Sealers</Link></li>
            <li><Link href="/shop?size=1-gallon" className="hover:text-white">1 Gallon Pails</Link></li>
            <li><Link href="/shop?size=5-gallon" className="hover:text-white">5 Gallon Pails</Link></li>
            <li><Link href="/product-category/staining-accessories" className="hover:text-white">Staining Accessories</Link></li>
            <li><Link href="/calculator" className="hover:text-white">Stain Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Programs</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/contractor-program" className="hover:text-white">Contractor Pricing ★</Link></li>
            <li><Link href="/calculator" className="hover:text-white">Stain Calculator</Link></li>
          </ul>
          <h5 className="eyebrow mt-6 text-white/80">Get it stained for you</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://masterdecker.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Master Decker ↗</a></li>
            <li><a href="https://deckstain.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white">DeckStain.ca ↗</a></li>
            <li><a href="https://restoremydeck.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white">Restore My Deck ↗</a></li>
          </ul>
        </div>
        <div>
          <h5 className="eyebrow text-white/80">Support</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shipping-returns" className="hover:text-white">Shipping &amp; returns</Link></li>
            <li><Link href="/track-order" className="hover:text-white">Track your order</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
          <h5 className="eyebrow mt-6 text-white/80">Contact</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="tel:+18772666415" className="hover:text-white">(877) 266-6415</a></li>
            <li><a href="mailto:sales@readysealdirect.ca" className="hover:text-white">sales@readysealdirect.ca</a></li>
            <li className="text-orange-100/60">50432 Yorke Line, Belmont, ON</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-orange-100/50">
        © {new Date().getFullYear()} Ready Seal Direct · Proudly Canadian · Shipping from Belmont, Ontario
      </div>
    </footer>
  );
}
