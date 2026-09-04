import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";

export function CtaBand() {
  const bg = photo("home-nighttime-lit");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={bg.src}
        alt={bg.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={bg.blurDataURL}
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(14,16,21,0.78)]" />

      <div className="reveal shell flex flex-col items-center gap-7 py-24 text-center md:py-32">
        <p className="eyebrow eyebrow-star text-[var(--color-gold-bright)]">Ready when you are</p>
        <h2 className="font-display h2-fluid max-w-3xl leading-tight text-white">
          Stop putting lights up.
          <span className="block text-[var(--color-gold-bright)]">Start turning them on.</span>
        </h2>
        <p className="lead max-w-xl text-white/75">
          Build your permanent lighting system in under five minutes. Same-week shipping from London,
          Ontario.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <Link href="/permanent-lights" className="btn-gold group">
            Build your system
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact-us" className="btn-ghost-light">
            Talk to us first
          </Link>
        </div>
      </div>
    </section>
  );
}
