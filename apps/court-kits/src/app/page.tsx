import Link from "next/link";
import Image from "next/image";
import { Audiences, KitShelf, QuoteBand, SectionHead, SportBento, Steps } from "@/components/sections";
import { FaqList } from "@/components/faq-list";
import { faqGroups, kits } from "@/lib/content";
import { JsonLd, faqLd, itemListLd } from "@/lib/jsonld";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

const icons = [
  <path key="a" d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />,
  <path key="b" d="M2 7h11v9H2zM13 10h4l3 3v3h-7zM6 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 19zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z" />,
  <path key="c" d="M6 4h12v17H6zM9 4V2.5h6V4M9 10h6M9 14h6" />,
];
const iconColours = ["#0E9384", "#D97706", "#6D4AD6"];

export default function HomePage() {
  const h = site.home;
  const hero = photos[site.photos.hero];
  const popular = kits.filter((k) => k.popular);
  const topFaqs = faqGroups.flatMap((g) => g.items).slice(0, 5);

  return (
    <>
      {/* Hero: one photo, edge to edge, header floating on top */}
      <section className="relative isolate flex min-h-[max(100svh,40rem)] flex-col justify-end overflow-hidden bg-[var(--ink-deep)] text-white">
        <Image
          src={hero.src}
          alt={site.photos.heroAlt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="-z-[2] object-cover"
          style={{ objectPosition: site.photos.heroPosition }}
        />
        <div aria-hidden className="hero-shade-top -z-[1]" />
        <div aria-hidden className="hero-shade-bottom -z-[1]" />
        <div className="shell flex flex-col gap-8 pb-10 pt-48 md:pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow !text-[var(--cta-from)]">{h.eyebrow}</p>
            <h1 className="hero-title mt-3 max-w-3xl">{h.title}</h1>
            <p className="mt-3 text-sm text-white/75">{h.caption}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/court-kits" className="btn btn-cta min-w-[15rem] !justify-between !py-4 text-base">
                {h.cta} <span aria-hidden>→</span>
              </Link>
              <Link href="/contact#quote" className="btn btn-ghost !py-4">
                Get a delivered price
              </Link>
            </div>
          </div>
          <div className="lg:text-right">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/70">Jump to a sport</p>
            <div className="mt-2 flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
              {[
                ["Basketball", "/sports/basketball"],
                ["Pickleball", "/sports/pickleball"],
                ["Multi-sport", "/sports/multi-sport"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="pill pill-dark !min-h-[44px] !px-4 !text-sm">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="shell grid gap-8 py-12 text-center sm:grid-cols-3 md:py-16">
        {h.trust.map((t, i) => (
          <div key={t.title}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={iconColours[i]} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" className="mx-auto" aria-hidden>
              {icons[i]}
            </svg>
            <h2 className="h3 mt-3">{t.title}</h2>
            <p className="mx-auto mt-1 max-w-[17rem] text-sm text-[var(--muted)]">{t.text}</p>
          </div>
        ))}
      </section>

      {/* Sport bento */}
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Shop by sport" title={h.sportsHeading} intro={h.sportsIntro} action={{ label: "All court kits", href: "/court-kits" }} />
        <SportBento />
      </section>

      {/* Audience triptych */}
      <Audiences />

      {/* Kit rail */}
      <section className="shell section">
        <SectionHead eyebrow="Court kits" title={h.railHeading} action={{ label: `See all ${kits.length} kits`, href: "/court-kits" }} />
        <KitShelf list={popular} mode="rail" />
      </section>

      {/* How it works */}
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="How it works" title={h.stepsHeading} action={{ label: "Read the full guide", href: "/how-it-works" }} />
        <Steps steps={h.steps} />
      </section>

      {/* FAQ */}
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Questions" title="Good to know before you order" action={{ label: "All questions", href: "/faq" }} />
        <FaqList items={topFaqs} />
      </section>

      <QuoteBand />
      <JsonLd data={faqLd(topFaqs)} />
      <JsonLd data={itemListLd(popular)} />
    </>
  );
}
