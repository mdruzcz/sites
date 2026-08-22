import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "FAQ — Permanent LED Soffit Track Lighting",
  description:
    "How aluminum-tracked LED soffit lighting installs, how it survives Canadian winters, how the app control works, and what ships in each kit from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ — Permanent LED Soffit Track Lighting",
    description: "Install, weatherproofing, app control and shipping questions answered.",
    url: `${SITE_URL}/faq`
  }
};

const FAQS = [
  {
    q: "What exactly is soffit track lighting?",
    a: "An extruded aluminum channel is screwed up under your soffit, and individually addressable 24V RGBW LED pucks sit inside it. By day the track reads as a trim line and the lights are hidden; at night the whole roofline can be any colour you choose."
  },
  {
    q: "Can I install it myself?",
    a: "Yes. Every kit ships complete with track, pucks, controller, power supply, connectors, colour-matched screws and the drill bit, along with our install guide. If you would rather not spend a weekend on a ladder, we also work with installers across Canada."
  },
  {
    q: "How do I know how much track to order?",
    a: "Measure the rooflines, soffits or fascia you want lit and pick the kit that covers that length. Kits run from 50 to 200 linear feet, and a little extra never hurts — offcuts are useful around corners and dormers."
  },
  {
    q: "Will it survive a Canadian winter?",
    a: "The pucks are potted and sealed to IP68 and the system is tested to −40°C. The aluminum track is the same extrusion professional installers use, and it stays up year-round — there is nothing to take down in January."
  },
  {
    q: "How is it controlled?",
    a: "The included WiFi controller pairs with a free phone app. You can pick colours, run pre-built holiday scenes, schedule on and off times against sunset, dim individual sections, or leave it on a warm-white accent all year."
  },
  {
    q: "How much power does it draw?",
    a: "Each LED draws roughly 0.3 W, so even a large home on a warm-white scene runs on very little. Kits ship with a correctly sized CSA-approved Class 2 power supply for the run length you order."
  },
  {
    q: "What is the warranty, and where do you ship?",
    a: "Five years against manufacturing defects on all LED components. We stock and ship from London, Ontario to anywhere in Canada, with free shipping on orders over $500 CAD."
  }
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo="home-cottage"
        photoAlt="Cottage eaves lit with warm permanent LED soffit lighting at dusk"
        eyebrow="Answers"
        title="Frequently asked questions"
        intro="What people ask us most before ordering a soffit track system."
        crumb="FAQ"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl">
            <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {FAQS.map((f) => (
                <div key={f.q} className="py-9">
                  <dt className="font-display text-xl md:text-2xl">{f.q}</dt>
                  <dd className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-amber-soft)] p-9 text-center md:p-12">
              <h2 className="font-display text-2xl">Still have a question?</h2>
              <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
                We answer the phone and the inbox from London, Ontario. Ask us anything before you order.
              </p>
              <Link href="/contact-us" className="btn-primary mt-8">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
