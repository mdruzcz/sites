import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { BLUR } from "./ui";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <Image src="/images/deck-02.jpg" alt="Premium stained backyard deck by DeckStain.ca" fill className="object-cover" placeholder="blur" blurDataURL={BLUR} sizes="100vw" />
      <div className="absolute inset-0 bg-[var(--bg-deep)]/88" />
      <div className="wrap relative z-10 py-32 md:py-44 text-center">
        <h2 className="h-xl text-white text-[1.9rem] md:text-[2.7rem] max-w-2xl mx-auto">Your deck is one photo away from looking incredible.</h2>
        <p className="text-white/75 mt-3 max-w-lg mx-auto">{SITE.promise} No pressure, no obligation.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
          <Link href="/contact" className="btn btn-green btn-lg">Get My Free Photo Quote</Link>
          <a href={SITE.phoneHref} className="btn btn-clear btn-lg">Call {SITE.phone}</a>
        </div>
      </div>
    </section>
  );
}
