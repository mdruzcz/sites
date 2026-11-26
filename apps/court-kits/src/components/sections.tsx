import Link from "next/link";
import Image from "next/image";
import { kits, sports, kitsFor, type Kit } from "@/lib/content";
import { photos, type PhotoKey } from "@/lib/photos";
import { site } from "@/lib/site";
import { KitBrowser } from "./kit-browser";
import { KitCard } from "./kit-card";

export function SectionHead({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h2">{title}</h2>
        {intro && <p className="lede mt-3">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link-arrow">
          {action.label} <span aria-hidden>↗</span>
        </Link>
      )}
    </div>
  );
}

/** Kit cards with sport chips. Used as a rail on the homepage and a grid on /court-kits. */
export function KitShelf({ list = kits, mode = "grid" }: { list?: Kit[]; mode?: "grid" | "rail" }) {
  const tabs = sports.filter((s) => list.some((k) => k.sport === s.slug)).map((s) => ({ slug: s.slug, label: s.name }));
  return <KitBrowser mode={mode} tabs={tabs} items={list.map((k) => ({ sport: k.sport, node: <KitCard kit={k} className="h-full" /> }))} />;
}

/** Square photo tiles, one per sport, beside one large feature tile. */
export function SportBento() {
  const feature = sports.find((s) => s.slug === "multi-sport") ?? sports[0];
  const rest = sports.filter((s) => s.slug !== feature.slug);
  return (
    <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
      <div className="grid grid-cols-2 gap-3">
        {rest.map((s) => (
          <PhotoTile key={s.slug} href={`/sports/${s.slug}`} photo={s.photo} position={s.photoPosition} label={s.name} sub={`${kitsFor(s.slug).length} kits`} alt={`${s.name} court surface, ${s.kitLabel.toLowerCase()} from ${site.name}`} className="aspect-square" />
        ))}
      </div>
      <PhotoTile
        href={`/sports/${feature.slug}`}
        photo={feature.photo}
        position={feature.photoPosition}
        label={feature.kitLabel}
        sub={feature.intro}
        tag="Two games, one pad"
        alt={`Backyard court with pickleball lines and a basketball hoop, ${feature.kitLabel.toLowerCase()} from ${site.name}`}
        className="min-h-[22rem]"
        large
      />
    </div>
  );
}

function PhotoTile({ href, photo, position, label, sub, tag, alt, className = "", large = false }: { href: string; photo: PhotoKey; position?: string; label: string; sub?: string; tag?: string; alt: string; className?: string; large?: boolean }) {
  const p = photos[photo];
  return (
    <Link href={href} className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-[var(--radius)] bg-[var(--ink-deep)] p-4 text-white md:p-5 ${className}`}>
      <Image
        src={p.src}
        alt={alt}
        fill
        sizes={large ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"}
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className="-z-[2] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {tag && <span className="pill absolute left-4 top-4">{tag}</span>}
      <span className={`flex items-center gap-2 font-black tracking-[-0.02em] ${large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
        {label} <span aria-hidden>↗</span>
      </span>
      {sub && <span className={`mt-1 text-white/80 ${large ? "max-w-md text-sm md:text-base" : "text-xs md:text-sm"}`}>{sub}</span>}
    </Link>
  );
}

/** Three full-bleed photo panels, one per kind of buyer. */
export function Audiences() {
  const washes = ["from-[#C2410C]/85", "from-[#1D4ED8]/85", "from-[#A16207]/85"];
  return (
    <div className="grid md:grid-cols-3">
      {site.home.audiences.map((a, i) => {
        const p = photos[a.photo];
        return (
          <Link key={a.tag} href={a.href} className="group relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden p-6 text-white md:min-h-[32rem] md:p-8">
            <Image src={p.src} alt={`${a.title}: court kits for ${a.tag.toLowerCase()} from ${site.name}`} fill sizes="(min-width: 768px) 34vw, 100vw" placeholder="blur" blurDataURL={p.blurDataURL} className="-z-[2] object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div aria-hidden className={`absolute inset-0 -z-[1] bg-gradient-to-t ${washes[i % 3]} via-black/25 to-black/10`} />
            <span className="pill absolute left-6 top-6 md:left-8 md:top-8">{a.tag}</span>
            <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] md:text-3xl">{a.title}</h3>
            <p className="mt-2 max-w-xs text-white/90">{a.text}</p>
            <span className="mt-3 inline-flex min-h-[44px] items-center gap-1 font-black">
              See the kits <span aria-hidden>↗</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Steps({ steps }: { steps: readonly { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-soft)] font-black text-[var(--accent-ink)]">{i + 1}</span>
          <h3 className="h3 mt-4">{s.title}</h3>
          <p className="mt-2 text-[var(--muted)]">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function QuoteBand({ title = site.home.closingTitle, text = site.home.closingText, href = "/contact#quote" }: { title?: string; text?: string; href?: string }) {
  return (
    <section className="shell pb-16 md:pb-24">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] bg-[var(--ink)] p-7 text-white md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="h2">{title}</h2>
          <p className="mt-2 max-w-xl text-white/80">{text}</p>
        </div>
        <Link href={href} className="btn btn-cta shrink-0">
          Get a delivered price <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
