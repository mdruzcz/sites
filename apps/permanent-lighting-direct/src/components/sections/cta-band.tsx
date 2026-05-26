import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-night)] via-[var(--color-brand-deep)] to-[var(--color-night)] opacity-95" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center">
        <p className="eyebrow text-[var(--color-accent)]">Ready when you are</p>
        <h2 className="font-display max-w-3xl text-3xl leading-tight md:text-5xl">
          Stop renting lights. Stop paying installers.<br />
          <span className="rainbow-text">Own the show.</span>
        </h2>
        <p className="max-w-xl text-slate-300">
          Build your kit in five minutes. Same-week shipping from London, Ontario.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/diy-kits" className="btn-accent">
            Pick your DIY kit
          </Link>
          <Link href="/contact-us" className="btn-ghost-light">
            Talk to us first →
          </Link>
        </div>
      </div>
    </section>
  );
}
