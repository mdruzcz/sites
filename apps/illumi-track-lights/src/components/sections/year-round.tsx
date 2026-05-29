import Image from "next/image";
import Link from "next/link";

export function YearRound() {
  return (
    <section className="bg-[var(--color-brand)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-[var(--color-peach)]">Smart year-round lighting</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            One install.<br />
            <span className="text-[var(--color-peach)]">Every season.</span>
          </h2>
          <p className="mt-4 text-lg text-cyan-50">
            Transform your home with smart permanent lighting. With easy app control, built-in
            scheduling, and curated scenes, every day becomes something worth celebrating.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-cyan-50">
            <li>🎃 Halloween orange + purple</li>
            <li>🎄 Christmas red + green</li>
            <li>🍁 Canada Day patriotic</li>
            <li>💖 Valentine&rsquo;s pink</li>
            <li>✨ Everyday warm white</li>
            <li>🌈 Custom RGBW any colour</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-peach">
              Shop DIY Kits
            </Link>
            <Link href="/gallery" className="btn-ghost-light">
              See the gallery →
            </Link>
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15">
          <Image
            src="/images/showcase/four-seasons.webp"
            alt="Illumi Track Lights set to different seasonal colour schemes"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
