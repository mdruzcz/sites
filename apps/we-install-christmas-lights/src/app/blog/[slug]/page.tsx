import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

export const revalidate = 3600;

const POSTS: Record<string, { title: string; intro: string; body: string[] }> = {
  "from-homes-to-businesses-professional-christmas-decorating-services-that-shine-bright-all-season": {
    title: "From Homes to Businesses: Professional Christmas Decorating Services That Shine Bright All Season",
    intro: "Professional Christmas decorating elevates curb appeal for homes and creates atmosphere for businesses — without the ladder time, knotted strings, or burned-out bulbs.",
    body: [
      "Whether it's a single-family home or a multi-store plaza, professional installers bring a level of craft most DIY setups can't match. Custom-cut light strings, commercial-grade clips, and proper power planning result in displays that stay vibrant all season.",
      "For businesses, holiday lighting is a marketing investment. Plazas with festive lighting see measurably more foot traffic, restaurants book more bookings, and hotels generate more guest photography across the entire holiday season.",
      "For homeowners, the value is even simpler: one phone call replaces a weekend on a ladder, plus mid-season maintenance, takedown, and storage are all included in one package.",
    ],
  },
  "how-much-does-it-really-cost-to-install-christmas-lights-in-ontario": {
    title: "How Much Does It Really Cost To Install Christmas Lights in Ontario?",
    intro: "Most Ontario homes pay $700 to $2,500 for a full-service install. Here's what drives the number.",
    body: [
      "Pricing is driven by linear footage of roofline, number of trees and hedges, complexity of the design, and whether the install includes maintenance, takedown, and storage.",
      "Our packages start at $700 for a classic front-of-home design and go up from there. The most popular package, Festive, lands around $1,400 for full-perimeter lighting plus trees and hedges.",
      "Storage adds about $100/season. Permanent (year-round) systems are a different category — Govee and Eufy installs typically run $3,000–$8,000 depending on house size.",
    ],
  },
  "enhancing-your-outdoor-space-with-lighting-on-a-new-deck-or-concrete-patio": {
    title: "Enhancing Your Outdoor Space With Lighting on a New Deck or Concrete Patio",
    intro: "Your new deck or patio is your most-used outdoor room — but it's invisible nine months of the year. Lighting changes that.",
    body: [
      "Permanent LED lighting installed in the deck fascia or patio retaining wall extends the usable hours of your outdoor space.",
      "We work with deck builders and concrete contractors across South-Western Ontario to install permanent lighting during construction — cleaner cabling, hidden routes, no warranty conflicts.",
      "Already have a deck or patio? We can retrofit. The work is more involved but the result is the same: an outdoor room you can use after dark.",
    ],
  },
  "professional-christmas-light-installation-how-much-does-it-cost": {
    title: "Professional Christmas Light Installation: How Much Does It Cost?",
    intro: "Short answer: $700–$3,500 for residential, depending on home size and design complexity.",
    body: [
      "Three things drive your quote: how much linear footage we're lighting, how many discrete elements (trees, hedges, archways, ground stakes) you want included, and whether the design uses standard clip mounting or more time-intensive techniques like wraps.",
      "Every quote includes free design and onsite measurement. There's no surprise pricing — we present packages with clear inclusions before any work begins.",
    ],
  },
  "professional-christmas-lighting-services-what-additional-services-are-included": {
    title: "Professional Christmas Lighting Services: What Additional Services Are Included?",
    intro: "A real \"full-service\" install means more than just hanging the lights.",
    body: [
      "Our full-service program includes free design and quote, custom on-site measurement, professional installation, mid-season maintenance, scheduled takedown, and year-round storage.",
      "Mid-season maintenance is the one most homeowners don't realise they need. Bulbs burn out. Wind shifts strings. Our team handles it — typically the same week you call.",
      "Storage solves the next problem: where do you put 800 feet of holiday lights for nine months? Our climate-controlled storage cataloges your strands and inspects them before the next install.",
    ],
  },
  "professional-lighting-companies-are-able-to-handle-large-or-complex-lighting-setups": {
    title: "Professional Lighting Companies Handle Large and Complex Setups",
    intro: "Estates, multi-story homes, condo buildings, and commercial properties need specialised gear and training.",
    body: [
      "Our crews are equipped for work above one story — fall protection, commercial ladders, and on-call electrical knowledge to manage circuit loads.",
      "We've decorated mall storefronts, hotel lobbies, casinos, multi-story commercial properties, and estates that stretch well over 1,000 feet of linear lighting.",
    ],
  },
  "how-long-does-it-take-for-professionals-to-install-christmas-lights": {
    title: "How Long Does It Take for Professionals to Install Christmas Lights?",
    intro: "Most residential installs are completed in one day. Some larger jobs run two.",
    body: [
      "Our crew comes with the entire kit — custom-cut strings, clips, extension cords, timers — and a clear plan from your free design. That means we're not measuring on site or running to the store mid-day.",
      "Large estates and commercial properties can take two days. Multi-story buildings sometimes a third for safety reasons.",
    ],
  },
  "holiday-lighting-warranties-offered-by-professional-christmas-light-installations": {
    title: "Holiday Lighting Warranties Offered by Professional Installers",
    intro: "Bulb failure, string failure, weather damage — what's covered?",
    body: [
      "Our installs include a workmanship and product guarantee for the season. If a bulb burns out, a string fails, or a connector breaks, we replace it free of charge.",
      "We can only warranty lights we supply — third-party or homeowner-supplied lights are installed at the homeowner's risk.",
    ],
  },
  "the-benefits-of-permanent-lighting-vs-traditional-christmas-lighting": {
    title: "The Benefits of Permanent Lighting vs Traditional Christmas Lighting",
    intro: "Permanent LED systems give you Christmas, Halloween, sports team colors, birthdays, and accent lighting — all from one app.",
    body: [
      "Permanent outdoor lighting (Govee, Eufy, and others) is installed once and stays in your roofline year-round.",
      "The pixels are individually addressable, so you can run any colour, pattern, or schedule from your phone — green for Christmas, orange for Halloween, your team colors on game day, warm white for everyday accent lighting.",
      "Cost ranges from $3,000 to $8,000 depending on house size. Compared to 8–10 years of seasonal installs, most homes pay for the system in 3–4 years.",
    ],
  },
  "top-3-best-light-installers-in-london-ontario": {
    title: "Top 3 Best Light Installers in London Ontario",
    intro: "London Ontario has a handful of professional holiday lighting companies. Here's what to look for.",
    body: [
      "The three things that matter: insurance, return rate, and warranty. A reputable installer carries $2M+ in liability insurance, has a return rate above 80%, and offers a same-season workmanship guarantee.",
      "We Install Christmas Lights leads on all three — fully insured, 96% return rate, and free in-season maintenance.",
    ],
  },
  "christmas-light-hanging-prep-is-everything": {
    title: "Christmas Light Hanging — Prep Is Everything",
    intro: "The difference between a brilliant display and a sad one is hours of prep before a single strand goes up.",
    body: [
      "We measure rooflines on-site, custom-cut every string to the linear inch, and pre-stage all clips and connectors before climbing a ladder.",
      "That prep is why we can deliver most residential installs in a single day — and why our customers come back at a 96% rate.",
    ],
  },
  "christmas-light-takedown-the-when-and-the-how": {
    title: "Christmas Light Takedown: The When and the How",
    intro: "Takedown is part of the package — but timing depends on Canadian weather.",
    body: [
      "We schedule takedowns through January and into early February. The order is weather-dependent — we won't put a crew on an icy roof.",
      "Your timer can be unplugged any time after the holidays end. We'll text you a takedown window when conditions are safe.",
    ],
  },
  "do-professional-installations-include-maintenance-and-repair-services-throughout-the-holiday-season": {
    title: "Do Professional Installations Include Maintenance Throughout the Season?",
    intro: "Ours do. Mid-season maintenance is included in every package.",
    body: [
      "Bulbs burn out, wind shifts strings, animals occasionally nibble. Our customers call or text and we're typically out within a few days.",
      "There's no per-visit charge during the season — maintenance is built into the package price.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: `${post.title} | We Install Christmas Lights Blog`,
    description: post.intro,
    alternates: { canonical: `${site.url}/blog/${slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();
  return (
    <article>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <Link href="/blog" className="text-xs uppercase tracking-widest font-bold text-[color:var(--brand-red)] hover:underline">
            ← Back to all posts
          </Link>
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl mt-4">{post.title}</h1>
          <p className="mt-4 text-lg text-[color:var(--ink-soft)]">{post.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose space-y-5 text-[color:var(--ink-soft)] text-lg leading-relaxed">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
        </div>
      </section>
    </article>
  );
}
