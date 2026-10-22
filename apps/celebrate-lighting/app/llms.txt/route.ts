import { site } from "@/lib/site";
import { getCities, getGuides, getOccasions, getAllFaqs, getServiceLines } from "@/lib/content";

export const revalidate = 3600;

/** llms.txt: a plain-text map of the site for AI crawlers and answer engines. */
export function GET() {
  const cities = getCities();
  const guides = getGuides();
  const occasions = getOccasions();
  const faqs = getAllFaqs();
  const [perm, seas] = getServiceLines();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. Based at ${site.addressLine}, serving Southwestern Ontario within about 90 minutes: ${site.serviceAreas.join(", ")}. Phone ${site.phone}.`,
    "",
    "## What we do",
    `- Permanent outdoor LED lighting: colour-matched aluminum track in the soffit/fascia, 16M+ colours, app control, IP67, cold-rated to −40°C, no roof penetration, 1–2 day install, lifetime warranty on parts, hardware and workmanship. Typical one-time cost $2,500 to $8,000. Offer: free on-site demo (a live sample mounted and lit on the customer's house before purchase). ${site.url}/permanent-lighting`,
    `- Seasonal C9 Christmas lights: classic big-bulb roofline lighting, installed ${site.seasonal.installWindow}, taken down in ${site.seasonal.takedownWindow}, rent or buy, early-bird booking before ${site.seasonal.deadline}. ${site.url}/seasonal-lighting`,
    `- Commercial and municipal lighting: storefronts, plazas, dealerships, churches, civic buildings, parks and events. Insured, WSIB, tender-ready documentation. ${site.url}/commercial`,
    `- Free AI Home Preview: upload one photo of your house and receive an emailed preview with permanent lighting ${site.aiPreview.turnaround}. ${site.url}/ai-preview`,
    `- Repairs on any brand, maintenance plans, consultations and system upgrades. ${site.url}/services`,
    "",
    "## Key pages",
    `- Home: ${site.url}/`,
    `- Compare permanent vs seasonal: ${site.url}/compare`,
    `- Gallery: ${site.url}/gallery`,
    `- FAQ (${faqs.length} answers): ${site.url}/faq`,
    `- Contact / book a free demo: ${site.url}/contact`,
    `- About: ${site.url}/about`,
    `- Reviews: ${site.url}/reviews`,
    "",
    "## Service area pages",
    ...cities.map((c) => `- ${c.name}, ${c.county}: ${site.url}/service-areas/${c.slug} | permanent: ${site.url}/permanent-lighting/${c.slug} | seasonal: ${site.url}/seasonal-lighting/${c.slug}`),
    "",
    "## Guides",
    ...guides.map((g) => `- ${g.title}: ${site.url}/guides/${g.slug}`),
    "",
    "## Occasions",
    ...occasions.map((o) => `- ${o.name}: ${site.url}/occasions/${o.slug}`),
    "",
    "## Quick facts",
    `- Hours: ${site.hours}`,
    `- Response time: within ${site.responseTime}`,
    `- Permanent line tagline: ${perm.tagline}`,
    `- Seasonal line tagline: ${seas.tagline}`,
    "",
    "## Frequently asked questions",
    ...faqs.slice(0, 20).flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]),
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
