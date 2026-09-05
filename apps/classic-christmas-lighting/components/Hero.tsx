import Link from "next/link";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { PhoneIcon, CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
      <Photo name={PICKS.heroHome} alt="Estate home in Kitchener-Waterloo with warm white roofline Christmas lights and lit front-yard trees installed by Classic Christmas Lighting" ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className="shell relative grid gap-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow-pill">Kitchener-Waterloo &amp; Southern Ontario</p>
          <h1 className="font-display display mt-5 max-w-2xl text-white drop-shadow-sm">
            Christmas lights, hung by pros. <span className="text-[var(--gold)]">You just plug in the hot chocolate.</span>
          </h1>
          <p className="lead mt-5 max-w-xl text-white/85">
            Family-owned installers with 15 years on Waterloo Region rooflines. We design your display, supply commercial-grade LEDs, install, keep it lit all season and take it down in January.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services/christmas-lighting-for-homes" className="btn-white">🏠 For homes</Link>
            <Link href="/services/christmas-lighting-for-businesses" className="btn-white">🏬 For businesses</Link>
            <a href={site.phoneHref} className="btn-candy"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {site.trustBadges.map((b) => (
              <li key={b.label} className="flex items-start gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)]"><CheckIcon className="w-3 h-3" /></span>
                <span><span className="block font-bold leading-tight">{b.label}</span><span className="text-xs text-white/70">{b.value}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <HeroQuoteForm />
        </div>
      </div>
    </section>
  );
}
