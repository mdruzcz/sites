import Link from "next/link";
import { site } from "@/lib/site";
import { getKits, getMarkets, getServices } from "@/lib/content";
import { ResonateMark } from "./ResonateMark";

export function Footer() {
  const kits = getKits();
  const markets = getMarkets();
  const services = getServices();

  return (
    <footer className="bg-ink relative overflow-hidden border-t border-soft">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-resonant blur-3xl opacity-15" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-cool blur-3xl opacity-10" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ResonateMark id="footer" className="w-9 h-9" />
              <div>
                <div className="h-display text-base leading-none text-white">Resonate</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-resonant mt-1 font-semibold">Lighting</div>
              </div>
            </div>
            <p className="text-muted-strong text-sm leading-relaxed">
              Music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities across Ontario. Design, supply, installation and seasonal service.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="spec-chip">Pi 5 + LedFx</span>
              <span className="spec-chip spec-chip-cool">12 V WS2811</span>
              <span className="spec-chip">FPP</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Kits</h4>
            <ul className="space-y-2">
              {kits.map((kit) => (
                <li key={kit.slug}>
                  <Link href={`/kits#${kit.slug}`} className="text-muted-strong text-sm hover:text-resonant transition-colors">
                    {kit.name}
                  </Link>
                </li>
              ))}
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-muted-strong text-sm hover:text-resonant transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Who we serve</h4>
            <ul className="space-y-2">
              {markets.map((m) => (
                <li key={m.slug}>
                  <Link href={`/${m.slug}`} className="text-muted-strong text-sm hover:text-resonant transition-colors">
                    {m.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/gallery" className="text-muted-strong text-sm hover:text-resonant transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-strong text-sm hover:text-resonant transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-strong text-sm hover:text-resonant transition-colors">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-resonant">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-strong">
              <li>
                <a href={site.phoneHref} className="hover:text-resonant transition-colors">{site.phone}</a>
              </li>
              <li>
                <a href={site.emailHref} className="hover:text-resonant transition-colors">{site.email}</a>
              </li>
              <li>{site.hours}</li>
              <li>{site.addressLine}</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="btn btn-primary text-sm">Request a Quote</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} {site.name}. Ontario, Canada. Prices quoted in CAD.</p>
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
