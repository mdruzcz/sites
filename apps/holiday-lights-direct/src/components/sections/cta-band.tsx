import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";

/**
 * Closing call to action. Light card on an ivory band: the photo supplies the
 * festive glow, the copy stays on a bright surface so the page ends open rather
 * than dropping into a dark slab.
 */
export function CtaBand() {
  const bg = photo("home-nighttime-lit");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-warm)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(224,177,85,0.28), rgba(224,177,85,0) 70%)" }}
      />
      <div className="shell section">
        <div className="reveal overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]">
          <div className="grid items-stretch gap-0 md:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-9 sm:p-12 lg:p-14">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Ready when you are</p>
              <h2 className="font-display h2-fluid mt-6 leading-tight text-[var(--color-text)]">
                Stop putting lights up.
                <span className="block text-[var(--color-gold-text)]">Start turning them on.</span>
              </h2>
              <p className="lead mt-6 max-w-md text-[var(--color-text-soft)]">
                Build your permanent lighting system in under five minutes. Same-week shipping from
                London, Ontario, anywhere in Canada.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/permanent-lights" className="btn-primary group">
                  Build your system
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/contact-us" className="btn-secondary">
                  Talk to us first
                </Link>
              </div>
            </div>
            <div className="relative min-h-[16rem] md:min-h-full">
              <Image
                src={bg.src}
                alt={bg.alt}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                placeholder="blur"
                blurDataURL={bg.blurDataURL}
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
