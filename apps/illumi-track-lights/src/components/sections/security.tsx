import Image from "next/image";
import Link from "next/link";

export function Security() {
  return (
    <section className="bg-[var(--color-night)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 md:aspect-square">
          <Image
            src="/images/showcase/security-house.webp"
            alt="Home with Illumi Track Lights set to security mode at night"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
        </div>

        <div>
          <p className="eyebrow text-[var(--color-brand-bright)]">Light it up for security</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            Between holidays?<br />
            <span className="gradient-text">Keep it bright.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Switch to a security setting and keep your home beautifully lit. Set your lights to warm or
            bright white &mdash; a layer of protection that doubles as architectural accent.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Control your Illumi system from anywhere in the world with an internet connection.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-peach">
              Shop DIY Kits
            </Link>
            <Link href="/how-it-works" className="btn-ghost-light">
              See app features →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
