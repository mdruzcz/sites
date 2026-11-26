import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { Finder, PriceTable, QuoteBand, SectionHead } from "@/components/sections";
import { kitRate, kits, rate } from "@/lib/content";
import { JsonLd, faqLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.custom;

export const metadata: Metadata = pageMeta({ title: p.title, description: p.description, path: "/custom-court" });

export default function CustomCourtPage() {
  const ball = kits.filter((k) => k.sport !== "shuffleboard");
  const low = rate(Math.min(...ball.map(kitRate)));
  const high = rate(Math.max(...ball.map(kitRate)));
  const faqs = [
    { q: "How much does a custom size court cost?", a: `Custom sizes are priced by area. Basketball, pickleball, tennis and multi-sport kits work out to between ${low} and ${high} per square foot, with larger courts at the lower end. Narrow shuffleboard lanes cost more per square foot. Freight and sales tax are added on your quote.` },
    { q: "How exact can a custom size be?", a: "Tiles are roughly a foot square, so length and width can be set in steps of about one foot. Tiles can also be trimmed with a fine-tooth saw to fit around a post, a drain or an angled edge." },
    { q: "Can a custom court be an L shape or have a cut-out?", a: "Yes. Send a sketch with measurements. The layout plan will show where each section goes and which tiles need trimming." },
    { q: "Can I add lines for more than one sport?", a: "Yes. Extra game lines are drawn into the layout in a second colour before the kit is produced." },
  ];
  const points = [
    { title: "Send the space", text: "Length, width and anything in the way: a post, a drain, a curve in the fence line." },
    { title: "Get a drawing", text: "We lay the court out on your dimensions and mark every line and colour." },
    { title: "Approve and build", text: "Once you sign off the drawing, the kit is prepared to that plan and shipped." },
  ];

  return (
    <>
      <PageHero photo={site.photos.custom} photoAlt={p.heroAlt} eyebrow="Any size" title={p.h1} intro={p.intro} crumb="Custom sizes" trail={[{ label: "Court kits", href: "/court-kits" }]} path="/custom-court" />
      <section className="shell section">
        <SectionHead eyebrow="Size finder" title="Start with your space" intro="Enter the flat area you have. Standard kits that fit are listed first, with a ballpark for a court cut to your exact size." />
        <Finder />
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="How custom works" title="From sketch to court" />
        <ol className="reveal grid gap-3 md:grid-cols-3">
          {points.map((s, i) => (
            <li key={s.title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-soft)] font-black text-[var(--accent-ink)]">{i + 1}</span>
              <h3 className="h3 mt-4">{s.title}</h3>
              <p className="mt-2 text-[var(--muted)]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Reference" title="Standard kit sizes and prices" intro="Use these as a guide to what a size near yours costs." />
        <PriceTable />
      </section>
      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Questions" title="Custom court questions" />
        <FaqList items={faqs} />
      </section>
      <QuoteBand title="Have an awkward space?" text="Send a rough sketch with measurements. We will tell you what fits and what it costs delivered." />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
