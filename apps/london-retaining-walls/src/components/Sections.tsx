import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { PICKS, finished, type Photo } from "@/lib/photos";
import QuoteForm from "@/components/QuoteForm";

export const WALL_TILES: { slug: string; name: string; photo: Photo; blurb: string }[] = [
  { slug: "block-retaining-walls", name: "Interlocking block", photo: PICKS.block, blurb: "Permacon, Allan Block and Unilock systems with geogrid. Curves, corners and steps built in." },
  { slug: "concrete-retaining-walls", name: "Poured concrete", photo: PICKS.concrete, blurb: "Formed, reinforced and parged walls for driveways, walkouts and tall grade changes." },
  { slug: "wood-and-timber-retaining-walls", name: "Timber", photo: PICKS.timber, blurb: "6x6 pressure-treated timber with deadman anchors. The most budget-friendly wall we build." },
  { slug: "natural-stone-retaining-walls", name: "Natural & armour stone", photo: PICKS.stone, blurb: "Armour stone, boulders and dry-laid natural stone set with an excavator." },
  { slug: "terraced-retaining-walls", name: "Terraced & tiered", photo: PICKS.terrace, blurb: "Multi-level walls that turn a steep, unusable slope into flat, planted terraces." },
  { slug: "retaining-wall-repair", name: "Repair & rebuild", photo: PICKS.repairInspect, blurb: "Leaning, bulging or collapsed walls assessed honestly and fixed at the cause." },
];

export function WallTypes({ title = "Every wall type, built the same careful way", kicker = "What we build" }: { title?: string; kicker?: string }) {
  return (
    <section className="section bg-paper-2">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker">{kicker}</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 text-[17px] text-ink-2">Material changes the look and the price. The base, the drainage stone, the weeping tile and the compaction behind the wall never change. That is why our walls stay straight.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WALL_TILES.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="group card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image src={t.photo.image} alt={t.photo.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" placeholder="blur" blurDataURL={t.photo.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">{t.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{t.blurb}</p>
                <span className="mt-4 font-display text-[12px] font-bold uppercase tracking-[0.14em] text-accent-2">Details and pricing →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Site walk and honest assessment", text: "Kyle measures the grade change, checks where water goes today, looks at what the wall has to hold up, and tells you which materials make sense and which are a waste of money.", photo: PICKS.repairInspect },
  { n: "02", title: "Written quote and permit check", text: "A line-item quote within a day. If the wall is over 1 metre, or carries a driveway or structure, we flag the permit and engineering before you commit.", photo: PICKS.homeAlt },
  { n: "03", title: "Excavation and compacted base", text: "We dig below the frost-affected zone, place and compact granular A in lifts, and set the first course dead level. Everything above depends on this.", photo: PICKS.blockBase },
  { n: "04", title: "Drainage that actually drains", text: "Clear stone, perforated weeping tile to daylight, and filter fabric between soil and stone. On timber, deadman anchors every course. On tall block, geogrid layers.", photo: PICKS.drainage },
  { n: "05", title: "Backfill, grading and clean-up", text: "Backfill compacted in layers, topsoil graded away from the wall, site raked and swept. You get a wall that looks finished and a yard you can use that afternoon.", photo: PICKS.curve },
];

export function Process({ title = "How a wall gets built when it is built to last" }: { title?: string }) {
  return (
    <section className="section bg-ink text-paper">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="kicker text-accent">The process</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 text-[17px] text-stone-2">Most failed walls we replace were built on topsoil with no drainage. Our five steps are boring on purpose.</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <li key={s.n} className="flex flex-col border border-white/10 bg-ink-2/60">
              <div className="relative aspect-[4/3]">
                <Image src={s.photo.image} alt={s.photo.alt} fill sizes="(max-width:768px) 100vw, 20vw" placeholder="blur" blurDataURL={s.photo.blurDataURL} className="object-cover" />
                <span className="absolute left-3 top-3 bg-accent px-2 py-1 font-display text-sm font-extrabold text-ink">{s.n}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const SIGNS = [
  { title: "Leaning or bulging outward", text: "Hydrostatic pressure from trapped water. The wall is being pushed, not pulled." },
  { title: "Blocks or timbers stepping apart", text: "Base has settled or frost has heaved it. Usually a base with no compaction." },
  { title: "Cracks that grow each spring", text: "Freeze-thaw working on a wall with no drainage stone behind it." },
  { title: "Soil washing through the face", text: "No filter fabric. Fines migrate, voids form, the wall drops." },
  { title: "Rotting timber at soil line", text: "Untreated or ground-contact-rated timber past its life, often 15 to 25 years." },
  { title: "Tilted fence or patio above it", text: "The wall has moved and taken the yard with it. Act before the next winter." },
];

export function RepairSigns() {
  const photos = [PICKS.repair, PICKS.repairOvergrown, PICKS.repairWeathered];
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="kicker">Retaining wall repair</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">Six signs a wall is failing, and what is really causing it</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {SIGNS.map((s) => (
              <li key={s.title} className="border border-[var(--line)] bg-white p-4">
                <h3 className="font-display text-[15px] font-bold uppercase tracking-wide">{s.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{s.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/retaining-wall-repair" className="btn btn-ink">Repair and rebuild service</Link>
            <Link href="/signs-your-retaining-wall-is-failing" className="btn btn-outline">Read the full guide</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((p, i) => (
            <div key={p.image} className={`relative overflow-hidden border border-[var(--line)] ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}>
              <Image src={p.image} alt={p.alt} fill sizes="(max-width:1024px) 100vw, 50vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-[var(--line)] bg-white">
      <div className="container-x grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex gap-1 text-accent" aria-label="Five star review">{"★★★★★".split("").map((s, i) => <span key={i} className="text-2xl">{s}</span>)}</div>
        {site.testimonials.map((t) => (
          <blockquote key={t.name}>
            <p className="font-display text-xl font-semibold leading-snug md:text-2xl">“{t.quote}”</p>
            <footer className="mt-3 text-[15px] text-stone">{t.name}, {t.place}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  const points = [
    ["Owner on every site", "Kyle quotes it, builds it and answers the phone. No sales rep, no subcontracted crew you have never met."],
    ["Drainage on every wall", "Clear stone, weeping tile and filter fabric are in every quote, not an upsell. Water is what kills walls in Ontario."],
    ["Permits handled", "We know which municipalities want a permit over 1 metre and when an engineer's stamp is needed. We manage it."],
    ["Built for clay and frost", "Bases dug below the frost-affected zone and compacted in lifts. Geogrid on tall block, deadman anchors on timber."],
    ["Written, line-item quotes", "Materials, labour, disposal and drainage broken out so you can compare properly."],
    ["Repairs welcome", "Many contractors only want new builds. We assess and fix walls other people built."],
  ];
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="kicker">Why homeowners call us</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">Small crew. Straight walls. No surprises.</h2>
          <p className="mt-4 text-[17px] text-ink-2">{site.yearsLabel} years of retaining walls across Middlesex, Elgin, Oxford and Brant counties, from a two-course garden bed to engineered walls holding up a driveway.</p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-[var(--line)]">
            <Image src={PICKS.tieback.image} alt={PICKS.tieback.alt} fill sizes="(max-width:1024px) 100vw, 40vw" placeholder="blur" blurDataURL={PICKS.tieback.blurDataURL} className="object-cover" />
          </div>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {points.map(([t, d]) => (
            <div key={t} className="border border-[var(--line)] bg-white p-5">
              <dt className="font-display text-lg font-extrabold uppercase tracking-tight">{t}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AreasBand() {
  return (
    <section className="border-y border-[var(--line)] bg-white">
      <div className="container-x flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="kicker">Where we build</p>
          <p className="mt-2 font-display text-xl font-bold">London and 40 minutes in every direction</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {site.cities.map((c) => (
            <li key={c.slug}><Link href={`/${c.route}`} className="tag !text-ink hover:border-accent hover:bg-accent-soft">{c.name}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function QuotePanel({ title = "Free quote", source }: { title?: string; source?: string }) {
  return (
    <div id="quote" className="scroll-mt-28 border border-[var(--line)] bg-paper-2 p-5 md:p-6">
      <div className="courses -mx-5 -mt-5 mb-5 bg-ink px-5 py-3 md:-mx-6 md:-mt-6 md:px-6">
        <p className="font-display text-lg font-extrabold uppercase tracking-wide text-paper">{title}</p>
        <p className="text-[13px] text-stone-2">Site visit and written quote, usually within a day</p>
      </div>
      <QuoteForm compact source={source} />
    </div>
  );
}

export function RelatedPhotos({ material, n = 3, exclude }: { material: string | string[]; n?: number; exclude?: Photo[] }) {
  const photos = finished(material, n, exclude);
  if (!photos.length) return null;
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((p) => (
        <div key={p.image} className="relative aspect-square overflow-hidden border border-[var(--line)]">
          <Image src={p.image} alt={p.alt} fill sizes="200px" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
        </div>
      ))}
    </div>
  );
}
