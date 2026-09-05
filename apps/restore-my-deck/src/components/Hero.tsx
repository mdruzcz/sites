import Link from "next/link";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { PhoneIcon, CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
      <Photo name={PICKS.heroHome} alt="Restored and stained backyard deck with planters behind a brick home in Kitchener, by Restore My Deck" ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className="shell relative grid gap-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow-pill">Kitchener-Waterloo &amp; Southwestern Ontario</p>
          <h1 className="font-display display mt-5 max-w-2xl text-white drop-shadow-sm">
            Restore your deck. <span className="text-gradient-accent">Don&apos;t replace it.</span>
          </h1>
          <p className="lead mt-5 max-w-xl text-white/85">
            Eco-friendly cleaning, 80-grit sanding and brush-applied oil-based stain that soaks into the wood instead of sitting on top. Grey, tired decks and fences come back in about two days, for a fraction of the cost of new.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/deck-staining" className="btn-white">Deck staining</Link>
            <Link href="/projects" className="btn-white">Before &amp; after</Link>
            <a href={site.phoneHref} className="btn-accent"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {site.trustBadges.map((b) => (
              <li key={b.label} className="flex items-start gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white"><CheckIcon className="w-3 h-3" /></span>
                <span><span className="block font-bold leading-tight">{b.label}</span><span className="text-xs text-white/70">{b.value}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal"><HeroQuoteForm /></div>
      </div>
    </section>
  );
}
