import Link from "next/link";
import Image from "next/image";
import { BLUR } from "./ui";

type Crumb = { name: string; href: string };

export function PageHead({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  /** Optional background image (path under /public, e.g. "/images/hero-about.jpg").
   *  When provided, the hero renders dark with the image dimmed underneath. */
  image?: string;
}) {
  // ── Light variant (no image) ───────────────────────────────────────────
  if (!image) {
    return (
      <section className="bg-[var(--bg-alt)] border-b border-[var(--hair)] pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="wrap">
          {crumbs && <Crumbs crumbs={crumbs} tone="dark" />}
          {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
          <h1 className="h-xl text-[2rem] md:text-[2.9rem] text-[var(--ink)] max-w-3xl">{title}</h1>
          {intro && <p className="muted text-[1.05rem] mt-3 max-w-2xl leading-relaxed">{intro}</p>}
        </div>
      </section>
    );
  }

  // ── Image variant (background photo, dimmed, white copy) ───────────────
  return (
    <section className="relative overflow-hidden bg-[var(--bg-deep)]">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
        placeholder="blur"
        blurDataURL={BLUR}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,36,26,0.55) 0%, rgba(20,36,26,0.7) 60%, rgba(20,36,26,0.92) 100%)",
        }}
      />
      <div className="wrap relative z-10 pt-20 pb-20 md:pt-28 md:pb-28">
        {crumbs && <Crumbs crumbs={crumbs} tone="light" />}
        {eyebrow && (
          <p
            className="font-bold text-[0.78rem] tracking-[0.14em] uppercase text-[var(--gold)] mb-3"
            style={{ fontFamily: "var(--font-head)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="h-xl text-[2.1rem] md:text-[3.1rem] text-white max-w-3xl">{title}</h1>
        {intro && (
          <p className="text-white/80 text-[1.1rem] mt-4 max-w-2xl leading-relaxed">{intro}</p>
        )}
      </div>
    </section>
  );
}

function Crumbs({ crumbs, tone }: { crumbs: Crumb[]; tone: "light" | "dark" }) {
  const muted = tone === "light" ? "text-white/55" : "text-[var(--ink-3)]";
  const link = tone === "light" ? "text-white/80 hover:text-white" : "hover:text-[var(--green)]";
  const current = tone === "light" ? "text-white" : "text-[var(--ink-2)]";
  return (
    <nav className={`flex items-center gap-2 text-sm ${muted} mb-4 flex-wrap`}>
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {i < crumbs.length - 1 ? (
            <Link href={c.href} className={`${link} transition-colors`}>{c.name}</Link>
          ) : (
            <span className={current}>{c.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
