import citiesJson from "@/content/cities.json";
import guidesJson from "@/content/guides.json";
import legalJson from "@/content/legal.json";
import { site } from "./site";

export type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What does “ready-to-assemble” (RTA) mean?",
    a: "RTA cabinets ship flat-packed and are assembled on site with simple tools. You skip the cost and long lead times of pre-assembled cabinets without sacrificing quality — our boxes use cam-lock and screw hardware that most homeowners and contractors can put together in 10–15 minutes per cabinet. If you'd rather not, add our expert assembly service ($75 per cabinet) when you request your quote.",
  },
  {
    q: "What are the cabinets made of?",
    a: "Our White Shaker cabinets feature solid hardwood face frames and doors, grade-A 3/4\" plywood boxes, soft-close concealed European hinges, and undermount full-extension soft-close drawer glides. They carry a limited lifetime warranty.",
  },
  {
    q: "Is delivery really free?",
    a: `Yes — delivery is free anywhere within ${site.freeDeliveryKm} km of our London, Ontario location. That covers London, Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Brantford, Woodstock, St. Thomas, Stratford, Sarnia, Chatham and most of Southwestern Ontario. Beyond ${site.freeDeliveryKm} km we ship across Canada and confirm the freight cost in your written quote.`,
  },
  {
    q: "Do you ship across Canada?",
    a: "Yes. We ship White Shaker RTA cabinets and complete kitchen packages to every province. Orders within 300 km of London, Ontario are delivered free; elsewhere the exact shipping cost is confirmed in your written quote based on your postal code and order size.",
  },
  {
    q: "How does the quote process work?",
    a: "Browse cabinets, design a kitchen in the free 3D planner, or start from a kitchen package, add what you need to your quote list, and submit your details. Our team reviews the list and emails a written quote — including taxes and shipping — usually within one business day. There is no obligation to buy.",
  },
  {
    q: "How do the sale prices work?",
    a: "Two promotions run at once. Every complete kitchen designed in the planner or bought as a package is 8% off. Individual cabinets we hold a lot of are marked with an overstock sale tag of 10–15% off. A cabinet never gets both — the better discount applies — and the sale price you see is the price on your quote.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. 0% APR financing is available on approved credit for complete kitchen orders. Tell us you'd like to finance when you request your quote and we'll send the details with your written pricing.",
  },
  {
    q: "What is the Lowest Price Guarantee?",
    a: "If you find the same White Shaker RTA cabinet (same size, construction and features) advertised for less by a Canadian retailer, send us the link with your quote request and we'll match it — in Canadian dollars, delivered. See the Lowest Price Guarantee page for the details.",
  },
  {
    q: "Can I order just a few cabinets instead of a whole kitchen?",
    a: "Absolutely. Add any combination of individual cabinets, accessories, and trim to your quote. Kitchen packages and the planner are simply convenient ways to price a complete kitchen (and unlock the 8% kitchen sale).",
  },
  {
    q: "How long does delivery take?",
    a: "Most in-stock White Shaker cabinets ship within about one week of order confirmation, and local free-delivery orders are usually on your driveway within 5–10 business days. Stock levels are shown on every cabinet page. Your written quote confirms the current lead time for your items and destination.",
  },
  {
    q: "Do you offer assembly?",
    a: `Yes. Tick “Assemble my cabinets” in your quote list and we assemble every cabinet before delivery for $${site.assemblyPerCabinet} per cabinet. Assembled cabinets arrive ready to hang — no cam locks, no instructions, no sore thumbs.`,
  },
  {
    q: "Are the door colours and finishes consistent?",
    a: "Yes. Our finishing process keeps colour and texture consistent from door to door, so your kitchen looks cohesive with no visible variation between cabinets.",
  },
  {
    q: "What if I'm not sure which cabinets I need?",
    a: "Use the free 3D Kitchen Planner or our How to Measure guide to map your kitchen, then send us your plan or measurements with your quote request. Our team double-checks everything and suggests adjustments before you commit.",
  },
];

export function getFaqs(): Faq[] {
  return FAQS;
}

// ---- City landing pages ---------------------------------------------------------

export type CitySection = { heading: string; body: string };
export type City = {
  slug: string;
  city: string;
  region: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  distanceNote: string;
  sections: CitySection[];
  faqs: Faq[];
  nearby: string[];
};

export function getCities(): City[] {
  return citiesJson as City[];
}

export function getCity(slug: string): City | undefined {
  return (citiesJson as City[]).find((c) => c.slug === slug);
}

// ---- Guides / resources ---------------------------------------------------------

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  readMinutes: number;
  intro: string;
  sections: CitySection[];
  faqs: Faq[];
};

export function getGuides(): Guide[] {
  return guidesJson as Guide[];
}

export function getGuide(slug: string): Guide | undefined {
  return (guidesJson as Guide[]).find((g) => g.slug === slug);
}

// ---- Legal ----------------------------------------------------------------------

export type LegalDoc = { title: string; updated: string; sections: CitySection[] };
export type LegalKey = "privacy" | "terms" | "warranty";

export function getLegal(key: LegalKey): LegalDoc {
  return (legalJson as Record<LegalKey, LegalDoc>)[key];
}

/** Split "para\n\npara" and "- item" lines into simple blocks for rendering. */
export function bodyBlocks(body: string): { type: "p" | "ul"; lines: string[] }[] {
  const out: { type: "p" | "ul"; lines: string[] }[] = [];
  for (const chunk of body.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^[-•]\s+/.test(l))) out.push({ type: "ul", lines: lines.map((l) => l.replace(/^[-•]\s+/, "")) });
    else {
      // mixed: paragraph lines followed by bullets
      const paras = lines.filter((l) => !/^[-•]\s+/.test(l));
      const bullets = lines.filter((l) => /^[-•]\s+/.test(l)).map((l) => l.replace(/^[-•]\s+/, ""));
      if (paras.length) out.push({ type: "p", lines: [paras.join(" ")] });
      if (bullets.length) out.push({ type: "ul", lines: bullets });
    }
  }
  return out;
}
