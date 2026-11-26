import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { GuideCards, QuoteBand, SectionHead, Steps } from "@/components/sections";
import { JsonLd, howToLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.how;

export const metadata: Metadata = pageMeta({ title: p.title, description: p.description, path: "/how-it-works" });

const stages = [
  {
    title: "1. Measure the space",
    body: [
      "Start with the flat area you can give to a court. Measure the length and width, then note anything that will not move: fences, trees, a shed, a slope.",
      "Leave room to play. A ball that leaves the court needs somewhere to go, and players need a step or two beyond the lines. For pickleball that means about 5 feet behind each baseline at a minimum.",
    ],
  },
  {
    title: "2. Sort out the base",
    body: [
      "Modular tiles need a flat, hard surface underneath. A concrete pad is the best base and the one that lasts longest. Asphalt also works well. An existing driveway, patio slab or old tennis court is fine if it is firm and reasonably level.",
      "If you are pouring a new pad, ask your concrete contractor for a broom finish with a gentle slope for drainage, about 1 percent. Send us the pad size before the pour and we will confirm the kit fits with a small expansion gap around the edge.",
      "Tiles should not go directly on grass, soil or loose gravel. The surface will move and the ball will not bounce.",
    ],
  },
  {
    title: "3. Choose the kit and colours",
    body: [
      "Pick the kit closest to your space. If nothing matches, we resize one. Then choose three colours: the main court, the key or kitchen, and the border.",
      "Want a second sport? Extra game lines go on in a contrasting colour. Basketball with pickleball is the pairing we draw most.",
    ],
  },
  {
    title: "4. Approve the layout",
    body: ["We send a drawing of your court with every line and colour in place, along with a delivered price to your postal code. Nothing is produced until you approve it."],
  },
  {
    title: "5. Delivery day",
    body: ["Kits ship on pallets by freight carrier. Most residential deliveries use a truck with a liftgate that lowers the pallet to the end of your driveway. Have a couple of people ready to carry the boxes to the pad."],
  },
  {
    title: "6. Snap it together",
    body: [
      "Sweep the pad clean. Start in one corner and follow the numbered plan, pressing each section into the last. A rubber mallet helps seat the locks. Edge pieces go on last.",
      "Two or three people can lay a half court in an afternoon. A full pickleball or multi-sport court is a comfortable day. Set the hoop or roll out the net and play.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero photo={site.photos.how} position={p.heroPosition} photoAlt={p.heroAlt} eyebrow="Planning guide" title={p.h1} intro={p.intro} crumb="How it works" path="/how-it-works" />
      <section className="shell section">
        <SectionHead eyebrow="The short version" title={p.summaryTitle} />
        <Steps steps={site.home.steps} />
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Step by step" title="The full guide" />
        <div className="grid gap-3 md:grid-cols-2">
          {stages.map((s) => (
            <article key={s.title} className="card prose-block reveal p-6 md:p-7">
              <h3 className="h3 mb-3 !text-xl">{s.title}</h3>
              {s.body.map((t) => (
                <p key={t.slice(0, 24)} className="text-[var(--muted)]">
                  {t}
                </p>
              ))}
            </article>
          ))}
        </div>
        <p className="mt-8 text-[var(--muted)]">
          Still deciding on a size? Browse the{" "}
          <Link href="/court-kits" className="font-bold text-[var(--accent-ink)] underline underline-offset-4">
            court kits and prices
          </Link>
          , try the{" "}
          <Link href="/custom-court" className="font-bold text-[var(--accent-ink)] underline underline-offset-4">
            size finder
          </Link>{" "}
          or read the{" "}
          <Link href="/faq" className="font-bold text-[var(--accent-ink)] underline underline-offset-4">
            common questions
          </Link>
          .
        </p>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Guides" title="Go deeper" action={{ label: "All guides", href: "/guides" }} />
        <GuideCards limit={3} />
      </section>
      <QuoteBand />
      <JsonLd data={howToLd(p.h1, p.description, stages)} />
    </>
  );
}
