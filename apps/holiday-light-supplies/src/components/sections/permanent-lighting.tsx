import Link from "next/link";
import Image from "next/image";
import kitImages from "@/content/kit-images.json";
import { Icon } from "@/components/icons";
import { CheckList } from "@/components/ui";
import { FOREVER_LIGHTS_KITS_URL, FOREVER_LIGHTS_URL } from "@/lib/site";

const KITS = [
  { feet: 50, price: 1455, slug: "permanent-lighting-kit-50ft" },
  { feet: 75, price: 1709, slug: "permanent-lighting-kit-75ft" },
  { feet: 100, price: 1989, slug: "permanent-lighting-kit-100ft" },
  { feet: 150, price: 2579, slug: "permanent-lighting-kit-150ft" },
  { feet: 200, price: 3049, slug: "permanent-lighting-kit-200ft" },
  { feet: 250, price: 3629, slug: "permanent-lighting-kit-250ft" }
];

const images = kitImages as Record<string, { src: string; blurDataURL: string }>;

/** Permanent lighting cross-sell — kits come from sister brand Forever Lights. */
export function PermanentLighting() {
  const cad = (n: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0">
        <Image src="/images/kits/permanent-led-lights-red-white-canada-day-commercial-building.webp" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09201a] via-[#09201a]/92 to-[#09201a]/60" />
      </div>
      <div className="shell section relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">Permanent lighting · by Forever Lights</p>
          <h2 className="font-display h2-fluid mt-4">Install once. Light every season for a decade.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            12V RGBW puck lights in a colour-matched aluminum track that disappears into the soffit. Run warm white on an ordinary evening, red and white for Canada Day, orange for Halloween, a full show for Christmas. No ladders in December.
          </p>
          <CheckList
            tone="dark"
            className="mt-6"
            items={[
              "Complete kits for 50 to 250 ft of roofline — track, lights, controller, power and every connector",
              "WiFi controller with scenes and schedules; runs offline once set",
              "Track in white, black, brown or wicker to match fascia",
              "Supplied and supported by our sister brand Forever Lights; DIY or installed"
            ]}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/product-category/permanent-lighting-kits" className="btn-gold">
              Shop the six kit sizes <Icon.arrow size={16} />
            </Link>
            <a href={FOREVER_LIGHTS_URL} target="_blank" rel="noopener" className="btn-ghost-light">
              Visit foreverlights.ca
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-3">
            {["rgbw-light-strand", "aluminum-track", "power-supply-150w"].map((k) => (
              <div key={k} className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                <Image src={images[k].src} alt={k.replace(/-/g, " ")} fill sizes="140px" placeholder="blur" blurDataURL={images[k].blurDataURL} className="object-contain p-3" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Kit pricing</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {KITS.map((k) => (
                <li key={k.feet}>
                  <Link href={`/product/${k.slug}`} className="flex items-baseline justify-between gap-3 border-b border-white/10 py-1.5 transition hover:text-[var(--color-gold-bright)]">
                    <span className="font-medium">{k.feet} ft kit</span>
                    <span className="font-display text-base">{cad(k.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-white/55">
              Same kits and pricing as{" "}
              <a href={FOREVER_LIGHTS_KITS_URL} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-white">foreverlights.ca/kits</a>. Add-on parts available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
