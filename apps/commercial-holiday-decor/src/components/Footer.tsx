import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";
import { products, services, serviceAreas } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-ink-deep)] text-white/70">
      {/* Gold hairline across the very top edge. */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent"
      />

      {/* Final CTA band */}
      <div className="border-b border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-6 py-10 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display h3-fluid text-white">Planning this season&rsquo;s decor?</p>
            <p className="mt-1.5 text-sm text-white/60">
              Book by {site.season.bookingOpens} for a same-season install. We reply within {site.responseTime}.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quote" className="btn-ember">{site.quote.ctaLong}</Link>
            <a href={site.phoneHref} className="btn-ghost-light">{site.phone}</a>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10">
        <ul className="shell grid grid-cols-2 gap-4 py-5 text-center text-xs md:grid-cols-4">
          <li className="text-white/60">Insured &amp; WSIB covered</li>
          <li className="text-white/60">Install, service &amp; takedown</li>
          <li className="text-white/60">Off-season storage included</li>
          <li className="text-white/60">Southwestern Ontario</li>
        </ul>
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-9" ring="var(--color-green-bright)" star="var(--color-gold-bright)" />
            <p className="font-display text-xl text-white">
              Commercial <span className="text-[var(--color-gold-bright)]">Holiday Decor</span>
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Commercial-grade Christmas decor, installed and serviced across Southwestern Ontario. Wreaths,
            mega trees, large displays and custom fabrication.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <a href={site.phoneHref} className="font-semibold text-white transition hover:text-[var(--color-gold-bright)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="transition hover:text-[var(--color-gold-bright)]">
                {site.email}
              </a>
            </p>
            <p className="text-white/50">{site.addressLine}</p>
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-white/45">Products</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="transition hover:text-[var(--color-gold-bright)]">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-semibold text-white/80 transition hover:text-[var(--color-gold-bright)]">
                All products →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white/45">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/installation" className="transition hover:text-[var(--color-gold-bright)]">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/gallery" className="transition hover:text-[var(--color-gold-bright)]">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition hover:text-[var(--color-gold-bright)]">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white/45">Service areas</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceAreas.slice(0, 8).map((a) => (
              <li key={a.slug}>
                <Link href={`/service-areas/${a.slug}`} className="transition hover:text-[var(--color-gold-bright)]">
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-areas" className="font-semibold text-white/80 transition hover:text-[var(--color-gold-bright)]">
                All areas →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="shell flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} · {site.addressLine}</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="transition hover:text-white/70">Privacy</Link>
            <Link href="/terms-of-service" className="transition hover:text-white/70">Terms</Link>
            <Link href="/contact" className="transition hover:text-white/70">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
