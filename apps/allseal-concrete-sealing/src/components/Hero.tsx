import Link from "next/link";
import { site } from "@/lib/site";
import { PAIRS, photo } from "@/lib/photos";
import { CompareSlider } from "./CompareSlider";
import { PhoneIcon } from "./icons";

export function Hero() {
  const p = PAIRS[0];
  return (
    <section className="relative overflow-hidden bg-[var(--graphite)] text-white">
      <div className="pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-[var(--orange)] opacity-[0.12] blur-3xl" aria-hidden />
      <div className="shell grid gap-10 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="reveal">
          <p className="kicker">Woodstock · St. Thomas · Brantford · Hamilton · K-W · Cambridge</p>
          <h1 className="font-display display mt-5 text-white">
            Protect.<br />Preserve.<br /><span className="text-[var(--orange)]">Seal.</span>
          </h1>
          <p className="lead mt-6 max-w-lg text-white/75">Driveways, patios, garage floors, pool decks and stamped concrete sealed against salt, water and sun with premium acrylic and polyurethane sealers. Your choice of high gloss, semi-gloss or matte. Free inspection first.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#quote" className="btn-orange">Get a free quote</a>
            <a href={site.phoneHref} className="btn-ghost"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line-dark)] pt-6">
            {[[site.stats.driveways, "driveways sealed"], [site.stats.patios, "patios sealed"], [site.stats.happyCustomers, "happy customers"]].map(([n, l]) => (
              <div key={String(l)}><p className="font-display text-4xl font-extrabold text-white md:text-5xl">{n}<span className="text-[var(--orange)]">+</span></p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">{l}</p></div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <CompareSlider before={photo(p.before)} after={photo(p.after)} priority tall />
          <div className="mt-3 flex items-center justify-between text-sm text-white/60">
            <span>Drag to compare. {p.title}, {p.sheen.toLowerCase()} finish.</span>
            <Link href="/gallery" className="font-display font-bold uppercase tracking-wider text-[var(--orange)] hover:text-white">More before &amp; afters →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
