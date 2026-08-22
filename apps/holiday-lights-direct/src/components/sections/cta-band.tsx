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

      <div className="shell flex flex-col items-center gap-7 py-24 text-center md:py-32">
        <p className="eyebrow text-[var(--color-gold-bright)]">Ready when you are</p>
        <h2 className="font-display max-w-3xl text-[2.1rem] leading-tight text-white md:text-[3.25rem]">
          Stop putting lights up.
          <span className="block text-[var(--color-gold-bright)]">Start turning them on.</span>
        </h2>
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
          Build your permanent lighting system in under five minutes. Same-week shipping from London,
          Ontario.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <Link href="/permanent-lights" className="btn-gold">
            Build your system
          </Link>
          <Link href="/contact-us" className="btn-ghost-light">
            Talk to us first
          </Link>
        </div>
      </div>
    </section>
  );
}
