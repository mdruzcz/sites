import Link from "next/link";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
      <Photo name={PICKS.heroHome} alt="Stamped concrete driveway sealed in a gloss finish in front of a brick estate home in London, Ontario by TriCity Concrete Sealing" ratio="absolute inset-0" sizes="100vw" priority scrim="hero" className="!absolute" />
      <div className="shell relative grid gap-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow-pill">London · Woodstock · Brantford · SW Ontario</p>
          <h1 className="font-display display mt-5 max-w-2xl text-white drop-shadow-sm">
            Concrete sealing that looks new <span className="text-gradient-accent">and stays that way.</span>
          </h1>
          <p className="lead mt-5 max-w-xl text-white/85">
            High-quality solvent-based sealers, applied in your choice of matte, semi-gloss or gloss. Driveways, patios, stamped concrete and exposed aggregate, cleaned, prepped and sealed by an insured crew and backed by a {site.warrantyYears}-year workmanship warranty.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/finishes" className="btn-white">Compare finishes</Link>
            <Link href="/gallery" className="btn-white">Before &amp; after</Link>
            <a href="#contact" className="btn-accent">Get a free quote</a>
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
        <div className="reveal">
          <HeroQuoteForm />
        </div>
      </div>
    </section>
  );
}
