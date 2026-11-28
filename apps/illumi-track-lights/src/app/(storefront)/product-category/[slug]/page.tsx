import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getCategories, listProducts } from "@/lib/catalog";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CategoryCopy {
  photo: PhotoKey;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** "More to know" block under the grid. */
  moreTitle: string;
  more: string[];
  qa: { q: string; a: string }[];
  guide?: { label: string; href: string };
}

const CATEGORY_COPY: Record<string, CategoryCopy> = {
  "diy-kits": {
    photo: "home-blue-night",
    title: "Track Lighting Kits",
    metaTitle: "Track Lighting Kits, 50 to 250 ft",
    description: "Complete 12V track lighting kits for 50 to 250 ft of roofline: track, lights, WiFi controller, power and connectors in one order. Free shipping in Canada.",
    intro: "Six sizes. Each one has everything for that length of roofline.",
    moreTitle: "More to know about kits",
    more: ["A kit is the parts list for one length of roofline, counted out so you do not have to. The bigger kits add track and lights, then a second or third power supply and the parts that keep a long run evenly bright."],
    qa: [],
    guide: { label: "Compare all six kits part by part", href: "/diy-kits" }
  },
  lights: {
    photo: "detail-pucks-closeup",
    title: "12V Lights",
    metaTitle: "12V RGBW Puck Lights & Soffit Lights",
    description: "12V RGBW puck lights for aluminum track, sold in strands of five, plus soffit downlights and outdoor string lights. Free shipping on every order in Canada.",
    intro: "Puck lights for the track, plus downlights and string lights that run from the same controller.",
    moreTitle: "More to know about the lights",
    more: [
      "The puck light is the heart of the system. Each one has red, green, blue and warm white diodes, so the same light can run a saturated holiday colour or a plain warm white. They come in strands of five on a sealed lead, the strands join end to end with twist connectors, and each light presses into a hole in the aluminum track.",
      "Every light is individually addressable, which means the controller can set each one to its own colour. That is what makes chasing patterns and split-colour scenes possible.",
      "The soffit downlight is a different tool: a recessed fixture that puts a pool of light on the ground at an entry, a garage or a porch. It runs from the same controller as the track lights, so both change colour together."
    ],
    qa: [
      { q: "How many lights do I need?", a: "Five for every 42-inch piece of track, which works out to roughly one and a half lights per foot of roofline. A 10 pack covers two pieces of track." },
      { q: "Is the track included?", a: "No. Lights and track are sold separately so you can buy exactly what a repair or an extension needs. A kit includes both." }
    ],
    guide: { label: "How track lighting goes together", href: "/how-it-works" }
  },
  controllers: {
    photo: "home-blue-app-control",
    title: "WiFi Controllers & Amplifiers",
    metaTitle: "12V WiFi LED Controllers (WLED)",
    description: "12V WiFi controllers with WLED pre-installed, in 2 and 4 channel versions, plus data amplifiers for long runs. Free shipping on every order in Canada.",
    intro: "The box that joins your WiFi and tells every light what colour to be.",
    moreTitle: "More to know about controllers",
    more: [
      "The controller is the brain. It joins your 2.4 GHz WiFi, and you set colours, scenes, schedules and zones from the free WLED app on Android or iPhone. Scenes are stored on the controller itself, so a sunset-to-midnight routine keeps running if your internet goes down.",
      "A 2-channel controller has two outputs and is the one in every kit. It suits most houses: one output runs left from the controller, the other runs right. The 4-channel version is for large homes, detached garages and commercial buildings where four separate runs meet at one point.",
      "A data amplifier is not a controller. It sits partway along a long run and boosts the control signal so the lights at the far end stay in step with the ones at the start."
    ],
    qa: [
      { q: "Do I need an account or a subscription?", a: "No. The WLED app is free and talks to the controller directly over your own WiFi." },
      { q: "Which controller do I need?", a: "If one kit covers your house, the 2-channel controller that comes with it is enough. Ask us before buying a 4-channel unit; most homes do not need one." }
    ],
    guide: { label: "Planning zones and segments", href: "/resources/planning-zones-and-segments-for-permanent-lighting" }
  },
  connectors: {
    photo: "soffit-lights-installed",
    title: "Connectors & Cables",
    metaTitle: "12V Extension Connectors & T-Connectors",
    description: "Sealed 12V extension connectors in 1, 5, 10 and 20 ft, T-connectors and power injection cables for track lighting runs. Free shipping in Canada.",
    intro: "The pieces that get a run around a corner, across a gap and back to power.",
    moreTitle: "More to know about connectors",
    more: [
      "A roofline is rarely one straight line. Extension connectors are sealed male-to-female jumpers that carry the run across a stretch you are not lighting: one foot for a corner board or a downspout, five or ten for a recessed entry or a garage door, twenty to reach a separate elevation or bring the run back to the controller.",
      "A light T-connector splits one run in two, so a single controller output can branch left and right. A power injection T-connector does a different job: it feeds extra 12V power into the middle of a long run so the far end stays as bright as the near end.",
      "Power injection cables carry that extra power from a supply to the T-connector, which lets the supply sit somewhere sheltered such as inside the garage."
    ],
    qa: [
      { q: "Which length do I need?", a: "Measure the gap and go one size up. A little slack is easier to deal with than a cable that will not reach." },
      { q: "When do I need power injection?", a: "On long runs. Kits of 100 ft and up already include the injection parts. If you are extending a run yourself, read the guide below first." }
    ],
    guide: { label: "What is power injection?", href: "/resources/what-is-power-injection" }
  },
  "power-supplies": {
    photo: "soffit-lights-day",
    title: "12V Power Supplies",
    metaTitle: "12V LED Power Supplies, 60 W to 300 W",
    description: "12V constant-voltage LED power supplies in 60 W, 150 W, 200 W and 300 W for track lighting controllers and power injection. Free shipping in Canada.",
    intro: "Household power in, safe 12V out. One for the controller, more for long runs.",
    moreTitle: "More to know about power supplies",
    more: [
      "A power supply turns household power into 12V for the lights. The 150 W unit is the one in every kit: it has a standard plug, goes into an outdoor or garage GFCI outlet, and powers the controller and up to roughly 300 lights. Larger kits include two or three so power can be fed into the run from more than one point.",
      "The 60 W supply has a sealed connector on its output and is made for one job, injecting power partway along a long run. The 300 W is for the largest runs and 4-channel controllers. The 200 W has a bare 12V lead that is cut to length and wired inside the controller.",
      "All of them put out 12V, so none of them can damage a light by being the wrong voltage. If you are doing anything beyond plugging a supply into an existing outlet, talk to an electrician."
    ],
    qa: [
      { q: "How do I know if I need a second supply?", a: "As a rule, add a 60 W injection supply for every 120 lights or so on a long run. Kits already include what their length needs." },
      { q: "Can it stay outside?", a: "The 60 W, 150 W and 300 W supplies have waterproof cases. Check the listing for the one you are buying, and plug it into a GFCI outlet." }
    ],
    guide: { label: "Choosing a power supply: 60 W, 150 W or 300 W", href: "/resources/choosing-led-power-supply-60w-150w-300w" }
  },
  hardware: {
    photo: "detail-tracks",
    title: "Aluminum Track & Screws",
    metaTitle: "Aluminum Lighting Track & Soffit Screws",
    description: "42-inch aluminum lighting track pre-drilled for five lights, in black, white, wicker and brown, plus colour-matched soffit screws. Free shipping in Canada.",
    intro: "The channel that holds the lights, and the screws that hold the channel.",
    moreTitle: "More to know about track",
    more: [
      "The track is what makes this a permanent install and not a string of lights. Each piece is a 42-inch aluminum channel, 1.5 inches wide and three quarters of an inch tall, with five holes already drilled for the lights. It screws up flat under the soffit, the cable sits inside it, and the aluminum carries heat away from the diodes.",
      "It comes in black, white, wicker and brown, which covers the common soffit colours. Screws are sold in boxes of 100 in matching colours so the heads disappear against the track.",
      "Track is sold in pairs for repairs and extensions, and white is also available as a 40 pack for bigger jobs, about 140 feet of channel."
    ],
    qa: [
      { q: "Which colour should I pick?", a: "Match the soffit, not the fascia. The track sits on the underside, so it is the soffit colour it has to blend into." },
      { q: "Are lights included with the track?", a: "No. Track is the channel only. Lights, connectors and screws are sold separately, or all together in a kit." }
    ],
    guide: { label: "Mounting track on vinyl, aluminum and wood soffits", href: "/resources/mounting-track-on-vinyl-aluminum-and-wood-soffits" }
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  const copy = CATEGORY_COPY[slug];
  const url = `${SITE_URL}/product-category/${slug}`;
  const title = copy?.metaTitle ?? cat.name;
  const description = copy?.description ?? cat.description ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Illumi Track Lights`, description, url, images: [`/images/photos/${copy?.photo ?? "home-blue-night"}.webp`] },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await listProducts({ categorySlug: slug });
  const copy = CATEGORY_COPY[slug];
  const title = copy?.title ?? cat.name;
  const url = `${SITE_URL}/product-category/${slug}`;

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      url,
      mainEntity: { "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/product/${p.slug}` })) }
    }
  ];
  if (copy?.qa.length) jsonLd.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.qa.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero compact photo={copy?.photo ?? "home-blue-night"} title={title} intro={copy?.intro ?? cat.description ?? undefined} crumbs={[{ label: "All parts", href: "/shop" }, { label: title }]} />
      <div className="shell section">
        <nav aria-label="Other shelves" className="border-b border-[var(--color-border)] pb-4">
          <ul className="flex flex-wrap items-center gap-y-1 text-[0.95rem]">
            {cats.map((c, i) => (
              <li key={c.slug} className={i > 0 ? "ml-3 border-l border-[var(--color-border-strong)] pl-3" : ""}>
                {c.slug === slug ? (
                  <span aria-current="page" className="inline-flex min-h-[44px] items-center font-semibold text-[var(--color-ink)]">{CATEGORY_COPY[c.slug]?.title ?? c.name}</span>
                ) : (
                  <Link href={c.slug === "diy-kits" ? "/diy-kits" : `/product-category/${c.slug}`} className="inline-flex min-h-[44px] items-center text-[var(--color-text-soft)] hover:text-[var(--color-accent)] hover:underline">{CATEGORY_COPY[c.slug]?.title ?? c.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{products.length} {products.length === 1 ? "product" : "products"}</p>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
        {products.length === 0 && <p className="mt-8 text-[var(--color-muted)]">Nothing on this shelf yet. <Link href="/shop" className="text-link">See every part</Link>.</p>}

        {copy && (
          <section className="mx-auto mt-16 max-w-[70ch] border-t border-[var(--color-border-strong)] pt-9">
            <h2 className="font-display h3-fluid">{copy.moreTitle}</h2>
            <div className="mt-4 space-y-4 text-[var(--color-text-soft)]">
              {copy.more.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {copy.qa.map((f) => (
              <div key={f.q} className="mt-5">
                <h3 className="font-semibold text-[var(--color-ink)]">{f.q}</h3>
                <p className="mt-1 text-[var(--color-text-soft)]">{f.a}</p>
              </div>
            ))}
            {copy.guide && (
              <p className="mt-6">
                <Link href={copy.guide.href} className="text-link inline-flex min-h-[44px] items-center">{copy.guide.label}</Link>
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
