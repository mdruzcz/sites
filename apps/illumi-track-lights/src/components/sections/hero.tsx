import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/showcase/install-banner.jpg"
          alt="Home with Illumi Track Lights installed under the soffit"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-night)]/95 via-[var(--color-night)]/70 to-[var(--color-night)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night)]/80 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-bright)] to-transparent opacity-70" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[var(--color-brand-bright)] backdrop-blur">
            ⚡ Your #1 permanent lighting choice
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            This is the last year<br />
            you hang <span className="gradient-text">Christmas lights.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200 md:text-xl">
            Pro-grade aluminum-tracked LED systems &mdash; sold as complete kits and shipped direct from
            London, Ontario. Install once. Light every holiday from your phone. Built for Canadian winters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-peach text-base">
              Shop DIY Kits →
            </Link>
            <Link href="/installers" className="btn-ghost-light">
              Get a Pro Install
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1"><span className="text-[var(--color-peach)]">★★★★★</span> 4.9 from verified customers</span>
            <span className="hidden text-white/40 md:inline">·</span>
            <span>5-year warranty</span>
            <span className="hidden text-white/40 md:inline">·</span>
            <span>50,000 hour life</span>
            <span className="hidden text-white/40 md:inline">·</span>
            <span>−40°C tested</span>
          </div>
        </div>
      </div>
    </section>
  );
}
