import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DoorIllustration } from "@/components/door-illustration";
import { formatCad, SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Cabinets — White Shaker Construction, Finish, Hardware",
  description:
    "How our White Shaker cabinets are built: solid wood face frames, plywood boxes, soft-close hinges and drawer slides, durable conversion-varnish finish. Get a sample door before you order.",
  alternates: { canonical: "/our-cabinets" },
};

const SPECS = [
  {
    label: "Door material",
    value: "Painted birch face frame with painted MDF center panel — not melamine or thermofoil.",
  },
  {
    label: "Cabinet box",
    value: "All-plywood (½″ sides, ⅜″ back) — not particleboard. Painted white interior, not raw natural like most suppliers.",
  },
  {
    label: "Wall cabinet height",
    value: "36″ standard — most suppliers default to 30″. The extra 6″ gives kitchens a premium, ceiling-reaching look without paying for a custom upgrade.",
  },
  {
    label: "Door style",
    value: "Shaker — five-piece, center recessed panel, square edges",
  },
  {
    label: "Finish",
    value: "Off-white, low-sheen conversion varnish. UV- and yellow-resistant.",
  },
  {
    label: "Face frame",
    value: "Solid hardwood, 1¼″ stiles and rails",
  },
  {
    label: "Drawer box",
    value: "Solid wood, dovetail joints, ⅝″ thick",
  },
  {
    label: "Drawer slides",
    value: "Full-extension, soft-close, undermount (Blum-equivalent), 100-lb rated",
  },
  {
    label: "Hinges",
    value: "6-way adjustable, soft-close concealed hinges",
  },
  {
    label: "Assembly",
    value: "Ready-to-assemble (RTA) — clamp-and-cam system, ~30 minutes per cabinet. Assembled correctly, they outlast cabinets that cost twice as much.",
  },
];

export default function OurCabinetsPage() {
  return (
    <>
      <section className="bg-[var(--color-sandstone-soft)] border-b border-[var(--color-line)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1fr_1fr] lg:py-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
              Our Cabinets
            </p>
            <h1 className="mt-4 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
              One door style. <span className="font-medium">Built to outlast.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              We sell one cabinet, in one finish, at one quality: White Shaker. Plywood boxes (not particleboard). Painted birch and MDF doors (not melamine or thermofoil). Painted white interiors (not raw natural like other suppliers). Assembled correctly, these cabinets outlast the cabinets in most kitchens twice their price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cabinets/sample-door" className="btn-primary">
                Order a sample door — {formatCad(SITE.sampleDoorPrice)}
              </Link>
              <Link href="/cabinets" className="btn-secondary">
                Browse the catalog
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <DoorIllustration className="h-auto w-full max-w-[320px]" />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-[var(--color-line)]">
        <Image
          src="/images/hero/kitchen-lifestyle.jpg"
          alt="A White Shaker kitchen with 36-inch wall cabinets, brass bar pulls, marble counters, and integrated range hood — Forever Cabinets installed."
          width={819}
          height={1024}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-32 lg:py-48 text-white">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
            36″ wall cabinets — standard
          </p>
          <h2 className="mt-3 font-display text-3xl max-w-2xl sm:text-4xl">
            The 6 extra inches that make a kitchen feel custom.
          </h2>
          <p className="mt-4 max-w-xl text-white/85">
            Most cabinet sellers ship 30″ tall walls and charge extra for the upgrade. Ours start at 36″ — closer to the ceiling, less wasted vertical space, and the look most kitchen designers reach for first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
              Specifications
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)]">
              What&rsquo;s inside every cabinet
            </h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">
              These specs apply to every cabinet in our catalog, from a 9″ filler to a 36″ sink base.
            </p>
          </div>
          <dl className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {SPECS.map((s) => (
              <div key={s.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-brass-dark)]">
                  {s.label.replace(/&amp;/g, "&")}
                </dt>
                <dd className="text-[var(--color-ink)]">{s.value.replace(/&amp;/g, "&")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
                Trust the match
              </p>
              <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)]">
                Sample doors — see it in your kitchen
              </h2>
              <p className="mt-4 text-[var(--color-ink-soft)]">
                Photos can&rsquo;t show finish sheen, panel depth, or how a door looks under your kitchen lights. Order a single White Shaker door for {formatCad(SITE.sampleDoorPrice)}. Hold it next to your existing cabinets, look at it in daylight and lamplight, see if it&rsquo;s a match.
              </p>
              <p className="mt-3 text-[var(--color-ink-soft)]">
                We refund the {formatCad(SITE.sampleDoorPrice)} on your first cabinet order. Zero risk.
              </p>
              <Link href="/cabinets/sample-door" className="btn-primary mt-6 inline-flex">
                Order a sample door
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="border border-[var(--color-line)] bg-white p-5">
                <p className="font-display text-2xl text-[var(--color-navy)]">11″ × 15″</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                  Sample door size
                </p>
              </div>
              <div className="border border-[var(--color-line)] bg-white p-5">
                <p className="font-display text-2xl text-[var(--color-navy)]">{SITE.leadTime}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                  Same as cabinets
                </p>
              </div>
              <div className="border border-[var(--color-line)] bg-white p-5">
                <p className="font-display text-2xl text-[var(--color-navy)]">$0</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                  Net cost if you order
                </p>
              </div>
              <div className="border border-[var(--color-line)] bg-white p-5">
                <p className="font-display text-2xl text-[var(--color-navy)]">Identical</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                  Material &amp; finish to cabinets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Common questions
        </p>
        <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)]">
          What people ask before ordering
        </h2>
        <dl className="mt-8 space-y-6">
          <Faq q="Will this match my existing white shaker kitchen?">
            <p>Probably — White Shaker is the most consistent door style in the industry. Manufacturers tend to land within a hair of each other on dimensions, panel depth, and off-white shade.</p>
            <p className="mt-2">That said, &ldquo;probably&rdquo; isn&rsquo;t good enough when you&rsquo;re spending hundreds of dollars on a single cabinet. <Link href="/cabinets/sample-door" className="underline">Order a sample door</Link> and look at it next to your existing kitchen before you commit.</p>
          </Faq>
          <Faq q="Are the cabinets pre-assembled?">
            <p>No — they ship flat-packed (RTA). Each cabinet takes about 30 minutes to assemble with a screwdriver. Hardware, instructions, and finished pieces come in the box. We ship pre-assembled for an extra fee if you ask; let us know in the quote.</p>
          </Faq>
          <Faq q="How is shipping handled?">
            <p>Freight by LTL across Canada in {SITE.leadTime}. You&rsquo;ll get a tracking number and a delivery appointment. The driver will lower the pallet curbside; help moving it inside is on you (most cabinets weigh 50–80 lb in their box).</p>
          </Faq>
          <Faq q="What if something arrives damaged?">
            <p>Inspect the pallet when it arrives. If you see damage, take photos before you sign and email us — we replace any damaged cabinet at our cost.</p>
          </Faq>
          <Faq q="What&rsquo;s actually different about your cabinets?">
            <p>Three things, in this order:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li><strong>Plywood boxes</strong> — most online RTA cabinets use particleboard or MDF for the box. Plywood holds screws better, survives water exposure under sinks, and won&rsquo;t crumble if it gets bumped during install.</li>
              <li><strong>Painted birch + MDF doors</strong> — not melamine or thermofoil. Real paint on real wood. The thermofoil cabinets you see on big-box store shelves peel when they get hot near an oven. Ours don&rsquo;t.</li>
              <li><strong>Painted white interiors</strong> — most suppliers leave the inside raw or stained natural maple. Ours match the door colour, so opening a cabinet feels finished.</li>
            </ul>
          </Faq>
        </dl>
      </section>
    </>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-display text-lg text-[var(--color-navy)]">{q}</dt>
      <dd className="mt-2 leading-relaxed text-[var(--color-ink-soft)]">{children}</dd>
    </div>
  );
}
