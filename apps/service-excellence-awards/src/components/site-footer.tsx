import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="font-serif text-lg">Service Excellence Awards</div>
          <p className="mt-2 text-sm text-stone-600">
            Honouring the best home renovation and service contractors in Ontario.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-stone-500">Awards</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/winners" className="hover:text-[var(--gold)]">Search Winners</Link></li>
            <li><Link href="/why-awards-matter" className="hover:text-[var(--gold)]">Why Awards Matter</Link></li>
            <li><Link href="/nominate" className="hover:text-[var(--gold)]">Request Consideration</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-stone-500">Program</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[var(--gold)]">About Us</Link></li>
            <li><Link href="/about#methodology" className="hover:text-[var(--gold)]">Methodology</Link></li>
            <li><Link href="/about#contact" className="hover:text-[var(--gold)]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-stone-500">Categories</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>Concrete &amp; Foundations</li>
            <li>Decks, Fences &amp; Outdoor</li>
            <li>Kitchens, Baths &amp; Interior</li>
            <li>Roofing, Siding &amp; Exterior</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <span>© {year} Service Excellence Awards Canada. All rights reserved.</span>
          <span>Independent recognition program · No pay-to-win.</span>
        </div>
      </div>
    </footer>
  );
}
