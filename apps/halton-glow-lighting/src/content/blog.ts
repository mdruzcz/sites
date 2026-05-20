export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readMinutes: number;
  /** Optional hero image shown on the article page + listing card */
  hero?: { src: string; alt: string };
  /** Sections rendered as <h2> + paragraphs/lists */
  sections: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; text: string }
  >;
};

export const posts: BlogPost[] = [
  {
    slug: "permanent-track-lights-vs-govee",
    title: "Permanent Track Lights vs. Retail Govee LEDs: What's the Real Difference?",
    excerpt:
      "Govee is great indoors. For year-round outdoor lighting on the eaves of your home, here's why permanent track-mounted LEDs win every time.",
    metaTitle: "Permanent Track Lights vs Govee Retail LEDs | Halton Glow",
    metaDescription:
      "Govee strip lights vs permanent track LEDs for your home exterior — IP rating, mounting, longevity, app control, warranty. The honest comparison.",
    publishedAt: "2026-05-20",
    category: "Buying Guide",
    readMinutes: 6,
    hero: {
      src: "/images/uploads/rainbow-house.jpg",
      alt: "Permanent LED roofline lighting set to a full rainbow on a Halton home — a level of control retail strips can't match",
    },
    sections: [
      {
        type: "p",
        text: "Govee, Philips Hue Outdoor, and other retail LED strips are everywhere on TikTok and Instagram — and for indoor decor or short-term patio fun, they're fantastic value. But homeowners in Burlington and Oakville often ask us: 'Could I just stick Govee strips on my soffit instead of paying for a professional permanent install?' Honest answer: you could try, but you'll regret it within a season. Here's why.",
      },
      { type: "h2", text: "1. They're rated for different worlds" },
      {
        type: "p",
        text: "Most Govee outdoor strips are rated IP65 — meaning they resist water spray but not full immersion. Our commercial permanent track LEDs are IP67, sealed against driving rain, ice dams, and the standing water that pools on a Canadian roofline in March. That gap shows up after the second hard freeze-thaw cycle.",
      },
      { type: "h2", text: "2. The mounting changes everything" },
      {
        type: "p",
        text: "Retail strips use 3M adhesive or screw-in clips. On vinyl soffit at -25 °C the adhesive hardens and lets go, and screws into aluminum trim are an invitation for water infiltration. Permanent track systems use a color-matched channel that hides the wires, locks each LED node into a fixed position, and clips under your existing trim — no penetrations, no glue.",
      },
      { type: "h2", text: "3. Lifespan: 1–2 seasons vs. 10+ years" },
      {
        type: "p",
        text: "Govee rates most outdoor models at 20,000–30,000 hours, but that's lab-perfect conditions. In real Halton weather we typically see retail strips fail or fade within 12–24 months. Our LEDs are commercial-grade, rated for 50,000+ hours, and warrantied for life. A $400 Govee setup that fails in two years is more expensive than the $4,500 install that lasts 15+.",
      },
      { type: "h2", text: "4. App control: same idea, different league" },
      {
        type: "p",
        text: "Both have apps. But the Govee app is consumer software designed for indoor décor — it handles one strip at a time, drops Wi-Fi often, and doesn't speak to whole-home lighting controllers. Our system supports zone control (front, garage, soffit, eaves all independent), schedules tied to sunset/sunrise, and integrates with smart home platforms.",
      },
      { type: "h2", text: "5. What the install actually involves" },
      {
        type: "p",
        text: "A retail strip install is a Saturday, a ladder, and some prayers. A permanent system is a one-day professional install: site visit, color matching to your soffit/fascia, custom-cut tracks, weatherproof power supplies, hardwired controller, and a walkthrough of the app. Done right, it disappears into the architecture during the day.",
      },
      {
        type: "callout",
        text: "Bottom line: Govee is the right answer for a backyard fence or a kid's room. For year-round, weatherproof, architectural lighting on your home, permanent track LEDs are the only system designed for the job.",
      },
      { type: "h2", text: "When Govee actually wins" },
      {
        type: "ul",
        items: [
          "Renters who can't make permanent modifications",
          "Indoor accent lighting (under cabinets, behind TVs, gaming setups)",
          "Backyard fences or pergolas where seasonal use is fine",
          "Anyone with a sub-$300 budget for a small accent zone",
        ],
      },
      { type: "h2", text: "When you want a permanent install" },
      {
        type: "ul",
        items: [
          "You're tired of putting up and taking down Christmas lights every year",
          "You want consistent lighting from October through May without flicker, fade or failure",
          "You care about how the system looks during the day, not just at night",
          "You're investing in your home's curb appeal and resale value",
          "You want one app that controls everything with reliable schedules",
        ],
      },
    ],
  },
  {
    slug: "permanent-lights-vs-seasonal-christmas-lights",
    title: "Permanent LED Lighting vs. Seasonal Christmas Lights: Which Costs Less Long-Term?",
    excerpt:
      "Putting up Christmas lights every November adds up — in time, ladder risk, and replacement string lights. We ran the 10-year math.",
    metaTitle: "Permanent LED Lighting vs. Seasonal Christmas Lights | Halton Glow",
    metaDescription:
      "Real 10-year cost comparison of permanent outdoor LED lighting vs putting up seasonal Christmas lights every year in Burlington and Oakville.",
    publishedAt: "2026-05-20",
    category: "Buying Guide",
    readMinutes: 7,
    hero: {
      src: "/images/uploads/warm-white-christmas-house.jpg",
      alt: "Home at night during Christmas season with red and white permanent LED roofline lighting — no ladder required",
    },
    sections: [
      {
        type: "p",
        text: "Permanent outdoor lighting feels like a splurge at the quote stage — most Halton installs land between $2,500 and $8,000. Putting up seasonal Christmas lights feels nearly free. So why do almost all of our clients tell us it's the best home upgrade they've made in a decade? Because once you actually price out 10 years of the seasonal alternative, the math flips fast.",
      },
      { type: "h2", text: "The hidden cost of seasonal lights" },
      {
        type: "p",
        text: "A typical mid-size Burlington home spends about $400 every couple of years on replacement string lights — they tangle in storage, GFCI breakers blow, raccoons get to the cord, that one stubborn strand fails in December. Add the time and risk of climbing a ladder twice a year (once to install in November, once to remove in January), and a few hundred dollars to pay someone if you don't want to do it yourself. Multiply over 10 years.",
      },
      { type: "h2", text: "10-year cost breakdown" },
      {
        type: "h3",
        text: "Seasonal Christmas lights (DIY)",
      },
      {
        type: "ul",
        items: [
          "Replacement string lights: ~$200/year average = $2,000",
          "Extension cords, clips, timers: ~$50/year = $500",
          "Storage tubs, replacement bulbs: ~$30/year = $300",
          "Your time: ~6 hours per year × 10 years = 60 hours of weekend",
          "Total cash: ~$2,800 + 60 hours of ladder time",
        ],
      },
      {
        type: "h3",
        text: "Seasonal Christmas lights (hire installers)",
      },
      {
        type: "ul",
        items: [
          "Pro install + removal: ~$400–$600/year = $4,000–$6,000",
          "Lights still need replacing every 3-4 years: ~$1,000",
          "Total cash over 10 years: $5,000–$7,000",
        ],
      },
      {
        type: "h3",
        text: "Permanent Halton Glow install",
      },
      {
        type: "ul",
        items: [
          "Average mid-size home install: ~$4,500 one time",
          "Lifetime warranty — no replacement costs",
          "Electricity: pennies per night (LEDs draw ~25W for a full home)",
          "Total cash over 10 years: ~$4,500",
          "Total ladder time: 0 hours",
        ],
      },
      {
        type: "callout",
        text: "The permanent system pays for itself somewhere between year 4 and year 7 for most Halton homes — and from year 8 onward you're saving money every year, on top of getting year-round curb appeal you couldn't get from seasonal lights at any price.",
      },
      { type: "h2", text: "What you can't put a price on" },
      {
        type: "p",
        text: "Numbers aside, the part our clients mention most isn't the savings — it's the moment in October when their neighbours are dragging out ladders and they tap their phone to turn on warm-white lighting that frames the whole house. Two months later when the snow's blowing sideways, they swap to red and green from inside. April rolls around and the lights become a soft accent for spring entertaining. Lights you actually use 12 months a year.",
      },
      { type: "h2", text: "When seasonal still makes sense" },
      {
        type: "p",
        text: "If you only want lights up for 4 weeks at Christmas and the house is a starter or a flip, seasonal is fine. If you've owned the home for 5+ years and plan to stay, the permanent system will earn back the spend, and the resale value bump is icing.",
      },
      {
        type: "p",
        text: "Want a real number for your home? We do free site visits across Burlington, Oakville, Milton and the rest of Halton — measurements, color match, and a firm quote on the spot. Book a visit from the form on our home page or call (519) 266-6796.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
