import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { VisualizerApp } from "@/components/visualizer/VisualizerApp";
import { vzTheme } from "@/components/visualizer/theme";
import { getVisualizerCatalog } from "@/lib/visualizer/catalog";
import { addVisualizerLinesToCart } from "@/lib/actions/visualizer";
import { BRAND, SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

const url = `${SITE_URL}/visualizer`;

export const metadata: Metadata = {
  title: "Light Visualizer: Draw Your Lights on a Photo, Get the Right Kit",
  description:
    "Upload a photo of your home, draw where you want permanent LED lights and get the footage, the right 12V kit and the extras you need. Add it all to your cart or send it for a checked quote.",
  alternates: { canonical: url },
  openGraph: {
    title: "Light Visualizer | Permanent Lighting Direct",
    description: "Draw your lights on a photo of your home and get the right kit size, parts list and a checked quote.",
    url,
    images: ["/images/photos/home-daytime-hidden.webp"],
  },
  twitter: { card: "summary_large_image", title: "Light Visualizer | Permanent Lighting Direct", description: "Draw your lights on a photo of your home and get the right kit size, parts list and a checked quote." },
};

const faqs = [
  { q: "How accurate is the footage?", a: "Close enough to pick a kit. A photo flattens perspective, so we add a 10% fitting allowance and confirm the real numbers against your roofline before anything ships." },
  { q: "What if I cannot set a scale?", a: "Type your roofline length instead. You can still draw on the photo so we can see exactly where the lights go." },
  { q: "Can I just add it to my cart?", a: "Yes. Once the kit and extras look right, add everything to your cart and check out. Or send us the plan first and we will review it and email a payment link." },
  { q: "What if my house needs more than 250 ft?", a: "The tool adds extra puck packs and track beyond the largest kit. We will confirm whether two kits work out cheaper before you pay." },
];

export default async function VisualizerPage() {
  const catalog = await getVisualizerCatalog();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${BRAND.name} Light Visualizer`,
      url,
      applicationCategory: "DesignApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      description: "Plan permanent LED roofline lighting on a photo of your home and get a kit recommendation.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        photo="home-daytime-hidden"
        photoAlt="Two-storey home in daylight, the kind of straight-on photo that works best in the light visualizer"
        eyebrow="Light visualizer"
        title="Draw your lights on a photo. Get the right kit."
        intro="Upload a picture of your home, tap along the roofline where you want permanent lights, and see the footage, the kit that fits and the extras you may need. Add it to your cart, or send it to us for a checked quote."
        crumbs={[{ label: "Light Visualizer" }]}
        compact
      />

      <section className="bg-[var(--color-surface)]">
        <div className="shell py-10 md:py-14">
          <VisualizerApp
            catalog={catalog}
            theme={vzTheme}
            site={{ site: "pld", name: BRAND.name, domain: "permanentlightingdirect.ca", phone: "", path: "/visualizer", kitBasePath: "/product", samplePhoto: "/images/photos/home-daytime-hidden.webp" }}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            addToCart={addVisualizerLinesToCart}
            cartPath="/cart"
          />
        </div>
      </section>

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Tips for a good photo</p>
          <h2 className="font-display h2-fluid mt-5">Three things that make the estimate better</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Shoot straight on", "Stand across the street, centred on the house, in daylight. Steep angles shrink the far side of the roofline."],
              ["Include a ruler", "A garage door or front door in frame gives the tool a known size. A double garage door is 16 ft wide; a front door is 6 ft 8 in tall."],
              ["Draw every edge", "Follow each eave and gable you want lit. Use an unlit jump to skip a gap, and mark a detached garage as a separate building."],
            ].map(([t, d]) => (
              <div key={t} className="card p-6">
                <h3 className="font-display text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="shell section max-w-3xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Questions</p>
          <h2 className="font-display h2-fluid mt-5">About the visualizer</h2>
          <dl className="mt-6 divide-y divide-[var(--color-border)]">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 text-[var(--color-text-soft)] leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-secondary">Browse the kits</Link>
            <Link href="/resources/how-to-measure-your-roofline-for-permanent-lighting" className="btn-secondary">Measuring guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
