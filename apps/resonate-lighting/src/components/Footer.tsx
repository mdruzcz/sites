import Link from "next/link";
import { site } from "@/lib/site";
import { getCities, getKits, getMarkets } from "@/lib/content";
import { formatCad } from "@/lib/pricing";
import { ResonateMark } from "./ResonateMark";

const linkClass = "text-muted-strong text-sm hover:text-resonant transition-colors inline-flex min-h-[32px] items-center";

export function Footer() {
  const kits = getKits();
  const markets = getMarkets();
  const cities = getCities();

  return (
    <footer className="bg-ink relative overflow-hidden border-t border-soft">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-resonant blur-3xl opacity-15" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-cool blur-3xl opacity-10" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <ResonateMark id="footer" className="w-9 h-9" />
              <div>
                <div className="h-display text-base leading-none text-white">Resonate</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-resonant mt-1 font-semibold">Lighting</div>
              </div>
            </div>
            <p className="text-muted-strong text-sm leading-relaxed">
              Music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities. Installed anywhere in Canada, with lifetime access to the software that runs them.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="spec-chip">Pi 5 Light Show engine</span>
              <span className="spec-chip spec-chip-cool">12 V WS2811</span>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Kits &amp; pricing</h2>
            <ul className="space-y-1">
              {kits.map((kit) => (
                <li key={kit.slug}>
                  <Link href={`/kits#${kit.slug}`} className={linkClass}>
                    {kit.name} · {formatCad(kit.pkg.price)}
                  </Link>
                </li>
              ))}
              <li><Link href="/pricing" className={linkClass}>Pricing &amp; budget planner</Link></li>
              <li><Link href="/how-it-works" className={linkClass}>How it works</Link></li>
              <li><Link href="/quick-start" className={linkClass}>Quick-start guide</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Services</h2>
            <ul className="space-y-1">
              <li><Link href="/services" className={linkClass}>Installation &amp; services</Link></li>
              <li><Link href="/care" className={linkClass}>Care &amp; seasonal service</Link></li>
              {markets.map((m) => (
                <li key={m.slug}>
                  <Link href={`/${m.slug}`} className={linkClass}>{m.name}</Link>
                </li>
              ))}
              <li><Link href="/gallery" className={linkClass}>Gallery</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/about" className={linkClass}>About</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Locations</h2>
            <ul className="grid grid-cols-2 gap-x-3">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/locations/${c.slug}`} className={linkClass}>{c.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/locations" className="text-cool text-sm underline underline-offset-2 inline-flex min-h-[44px] items-center">All locations</Link>
          </div>

          <div>
            <h2 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Contact</h2>
            <ul className="space-y-3 text-sm text-muted-strong">
              <li><a href={site.phoneHref} className="hover:text-resonant transition-colors">{site.phone}</a></li>
              <li><a href={site.emailHref} className="hover:text-resonant transition-colors break-all">{site.email}</a></li>
              <li>{site.hours}</li>
              <li>{site.addressLine}</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact#quote" className="btn btn-primary text-sm">Request a Quote</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} {site.name}. Prices in CAD, plus applicable taxes.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-resonant transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-resonant transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-resonant transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
