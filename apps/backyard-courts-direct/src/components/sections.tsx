import Link from "next/link";
import Image from "next/image";
import { guides as allGuides, kitArea, kitRate, kitSize, kitTypeName, kits, kitsFor, money, rate, sports, type Guide, type Kit } from "@/lib/content";
import { photos, type PhotoKey } from "@/lib/photos";
import { site } from "@/lib/site";
import { KitBrowser } from "./kit-browser";
import { KitCard } from "./kit-card";
import { SizeFinder } from "./size-finder";

export function SectionHead({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: { label: string; href: string } }) {
  return (
    <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
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

/** The size finder, fed from the kit list on the server. */
export function Finder() {
  return (
    <SizeFinder
      sports={sports.map((s) => ({ slug: s.slug, name: s.name }))}
      kits={kits.map((k) => ({
        slug: k.slug,
        sport: k.sport,
        sportName: sports.find((s) => s.slug === k.sport)?.name ?? "",
        label: kitTypeName(k).replace(" Court Kit", "").replace(" Kit", ""),
        long: Math.max(k.w, k.d),
        short: Math.min(k.w, k.d),
        price: k.price,
      }))}
    />
  );
}

/** Square photo tiles, one per sport, beside one large feature tile. */
export function SportBento() {
  const feature = sports.find((s) => s.slug === "multi-sport") ?? sports[0];
  const rest = sports.filter((s) => s.slug !== feature.slug);
  const from = (slug: string) => `${kitsFor(slug).length} kits from ${money(Math.min(...kitsFor(slug).map((k) => k.price)))}`;
  return (
    <div className="reveal grid gap-3 lg:grid-cols-[1.25fr_1fr]">
      <div className="grid grid-cols-2 gap-3">
        {rest.map((s) => (
          <PhotoTile key={s.slug} href={`/sports/${s.slug}`} photo={s.photo} position={s.photoPosition} label={s.name} sub={from(s.slug)} alt={`${s.name} court surface, ${s.kitLabel.toLowerCase()} from ${site.name}`} className="aspect-square" />
        ))}
      </div>
      <PhotoTile
        href={`/sports/${feature.slug}`}
        photo={feature.photo}
        position={feature.photoPosition}
        label={feature.kitLabel}
        sub={feature.intro}
        tag={`Two games, one pad · from ${money(Math.min(...kitsFor(feature.slug).map((k) => k.price)))}`}
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
        quality={60}
        sizes={large ? "(min-width: 1024px) 520px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
        placeholder="blur"
        blurDataURL={p.blurDataURL}
        className="-z-[2] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="absolute inset-0 -z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {tag && <span className="pill absolute left-4 top-4">{tag}</span>}
      <span className={`flex items-center gap-2 font-black tracking-[-0.02em] ${large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
        {label} <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </span>
      {sub && <span className={`mt-1 text-white/85 ${large ? "max-w-md text-sm md:text-base" : "text-xs md:text-sm"}`}>{sub}</span>}
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
          <Link key={a.tag} href={a.href} className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden p-6 text-white md:min-h-[30rem] md:p-8">
            <Image src={p.src} alt={`${a.title}: court kits for ${a.tag.toLowerCase()} from ${site.name}`} fill quality={60} sizes="(min-width: 768px) 34vw, 100vw" placeholder="blur" blurDataURL={p.blurDataURL} className="-z-[2] object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            <div aria-hidden className={`absolute inset-0 -z-[1] bg-gradient-to-t ${washes[i % 3]} via-black/25 to-black/10`} />
            <span className="pill absolute left-6 top-6 md:left-8 md:top-8">{a.tag}</span>
            <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] md:text-3xl">{a.title}</h3>
            <p className="mt-2 max-w-xs text-white/90">{a.text}</p>
            <span className="mt-3 inline-flex min-h-[44px] items-center gap-1 font-black">
              See the kits <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Steps({ steps }: { steps: readonly { title: string; text: string }[] }) {
  return (
    <ol className="reveal grid gap-3 md:grid-cols-3">
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

const whyIcons = [
  "M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z",
  "M4 13c2.5-1 4-4 4-7h8c0 3 1.500 6 4 7-1 4-4 7-8 8-4-1-7-4-8-8z",
  "M4 6h16v12H4zM4 10h16M9 6v12M15 10v8",
  "M4 12a8 8 0 0 1 13.700-5.600L20 8.500M20 4v4.500h-4.500M20 12a8 8 0 0 1-13.700 5.600L4 15.500M4 20v-4.500h4.500",
];

/** Four reasons to build on tile, on a dark band. */
export function WhyTiles() {
  return (
    <section className="bg-[var(--ink)] text-white">
      <div className="shell section">
        <div className="reveal mb-8 md:mb-10">
          <p className="eyebrow mb-2 !text-[var(--cta-from)]">The surface</p>
          <h2 className="h2">{site.home.whyHeading}</h2>
        </div>
        <ul className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {site.home.why.map((w, i) => (
            <li key={w.title} className="rounded-[var(--radius)] border border-white/12 bg-white/[0.04] p-6">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--cta-from)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={whyIcons[i % whyIcons.length]} />
              </svg>
              <h3 className="h3 mt-4">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GuideCards({ list = allGuides, limit }: { list?: Guide[]; limit?: number }) {
  const shown = limit ? list.slice(0, limit) : list;
  return (
    <ul className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((g) => {
        const p = photos[g.photo];
        return (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="card kit-card group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--ink-deep)]">
                <Image src={p.src} alt={`${g.h1}, a guide from ${site.name}`} fill quality={60} sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">Guide</p>
                <h3 className="h3 mt-2">{g.h1}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{g.intro}</p>
                <span className="link-arrow mt-auto pt-3 text-sm">
                  Read the guide <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Every kit with footprint, coverage and price. Plain HTML so search engines and AI assistants can read it. */
export function PriceTable({ list = kits }: { list?: Kit[] }) {
  return (
    <div className="card reveal overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Kit</th>
            <th scope="col">Footprint</th>
            <th scope="col">Coverage</th>
            <th scope="col">Per sq ft</th>
            <th scope="col" className="text-right">
              Kit price (CAD)
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((k) => (
            <tr key={k.slug}>
              <th scope="row">
                <Link href={`/court-kits/${k.slug}`} className="font-bold hover:text-[var(--accent-ink)] hover:underline">
                  {kitTypeName(k).replace(" Court Kit", "").replace(" Kit", "")}
                </Link>
              </th>
              <td>{kitSize(k)}</td>
              <td>{kitArea(k).toLocaleString("en-CA")} sq ft</td>
              <td>{rate(kitRate(k))}</td>
              <td className="text-right font-black">{money(k.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuoteBand({ title = site.home.closingTitle, text = site.home.closingText, href = "/contact#quote" }: { title?: string; text?: string; href?: string }) {
  return (
    <section className="shell pb-16 md:pb-24">
      <div className="reveal quote-band flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] p-7 text-white md:flex-row md:items-center md:p-10">
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
