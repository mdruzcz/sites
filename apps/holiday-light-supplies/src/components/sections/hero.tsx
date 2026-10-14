import Link from "next/link";
import Image from "next/image";
import { photo } from "@/lib/photos";
import { Icon } from "@/components/icons";
import { AUDIENCES, audienceHref } from "@/lib/site";

export function Hero() {
  const main = photo("plaza-tree-night");
  const a = photo("downtown-street-trees");
  const b = photo("mall-reindeer");
  const c = photo("office-tower-entrance");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      {/* Backdrop photo (mobile) */}
      <div className="absolute inset-0 lg:hidden">
        <Image src={main.src} alt="" aria-hidden fill priority sizes="100vw" placeholder="blur" blurDataURL={main.blurDataURL} className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09201a]/70 via-[#09201a]/85 to-[#09201a]" />
      </div>

      <div className="shell relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="fade-up">
          <p className="eyebrow inline-flex items-center gap-2 text-[var(--color-gold-bright)]">
            <Icon.maple size={14} /> Canada&rsquo;s commercial &amp; wholesale Christmas lighting supplier
          </p>
          <h1 className="font-display h1-fluid mt-5 max-w-2xl">
            Light up the whole property.
            <span className="block italic text-[var(--color-gold-bright)]">Priced for the trade.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Commercial-grade C9 lighting, 3D LED displays, pole-mount décor, wreaths and garland for malls, BIAs, municipalities, property managers and installers. Shipped from London, Ontario to every province.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/request-a-quote" className="btn-accent text-base">
              Request a commercial quote <Icon.arrow size={18} />
            </Link>
            <Link href="/shop" className="btn-ghost-light text-base">
              Shop the catalog
            </Link>
          </div>

          {/* Audience chips */}
          <div className="mt-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Built for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AUDIENCES.map((aud) => (
                <li key={aud.slug}>
                  <Link href={audienceHref(aud)} className="chip min-h-[38px] !border-white/25 !bg-white/10 !text-white transition hover:!border-[var(--color-gold-bright)] hover:!bg-white/15">
                    {aud.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm">
            <div>
              <dt className="font-display text-2xl text-white">15+</dt>
              <dd className="text-white/65">seasons supplying Canada</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-white">1 day</dt>
              <dd className="text-white/65">typical quote turnaround</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-white">Net-30</dt>
              <dd className="text-white/65">for municipalities &amp; BIAs</dd>
            </div>
          </dl>
        </div>

        {/* Photo mosaic (desktop) */}
        <div className="fade-up fade-up-2 hidden lg:grid lg:h-[620px] grid-cols-[1.3fr_1fr] grid-rows-[1fr_1fr] gap-3">
          <div className="relative row-span-2 overflow-hidden rounded-3xl">
            <Image src={main.src} alt={main.alt} fill priority sizes="40vw" placeholder="blur" blurDataURL={main.blurDataURL} className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-bright)]">Plaza centrepiece</p>
              <p className="mt-1 text-sm text-white/90">Commercial tree, red &amp; gold ornament package</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <Image src={a.src} alt={a.alt} fill sizes="20vw" placeholder="blur" blurDataURL={a.blurDataURL} className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">BIA tree wraps</span>
          </div>
          <div className="grid grid-cols-2 gap-3 min-h-0">
            <div className="relative overflow-hidden rounded-3xl">
              <Image src={b.src} alt={b.alt} fill sizes="10vw" placeholder="blur" blurDataURL={b.blurDataURL} className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <Image src={c.src} alt={c.alt} fill sizes="10vw" placeholder="blur" blurDataURL={c.blurDataURL} className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
