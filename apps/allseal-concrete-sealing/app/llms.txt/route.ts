import { site } from "@/lib/site";
import { getServices, getCities, getGuides, SHEENS } from "@/lib/content";

export const revalidate = 3600;

export function GET() {
  const lines = [
    "# All-Seal Concrete Sealing",
    "",
    `> Concrete sealing company based in Woodstock, Ontario (Oxford County), serving Woodstock, St. Thomas, Brantford, Hamilton, Kitchener-Waterloo, Cambridge and surrounding Southwestern Ontario. Tagline: "${site.tagline}". 10+ years of experience; ${site.stats.driveways} driveways, ${site.stats.patios} patios and ${site.stats.happyCustomers} happy customers so far. Premium acrylic, polyurethane and penetrating sealers in three finishes (High Gloss, Semi-Gloss, Matte), anti-slip additive available, works on previously sealed surfaces, protection lasts 2–5 years. Free on-site inspections and written quotes. Phone ${site.phone}. Hours ${site.hours}. Contact via the website form or phone.`,
    "",
    "## Services",
    ...getServices().map((s) => `- ${s.title} (recommended finish: ${s.recommendedSheen}): ${s.excerpt} ${site.url}/services/${s.slug}`),
    "",
    "## Finishes",
    ...SHEENS.map((f) => `- ${f.key}: ${f.short}. Best for ${f.bestFor.join("; ").toLowerCase()}. ${site.url}/finishes`),
    "",
    "## Service areas",
    ...getCities().map((c) => `- ${c.city}, Ontario (${c.region}): ${site.url}/service-areas/${c.slug}`),
    "",
    "## Key facts",
    "- Process: free inspection, pressure washing, crack and joint repair, full dry, even sealer application, anti-slip where needed",
    "- Cure: foot traffic next day, vehicles after 48 to 72 hours",
    "- Season: late spring through fall, dry slab, roughly 10 to 30°C",
    "- Pricing: quoted per property after a free inspection; no flat rates published",
    "",
    "## Pages",
    `- Home: ${site.url}`, `- Services: ${site.url}/services`, `- Finishes: ${site.url}/finishes`, `- Before & after: ${site.url}/gallery`, `- Service areas: ${site.url}/service-areas`, `- Guides: ${site.url}/resources`, `- About: ${site.url}/about`, `- Contact / free quote: ${site.url}/contact`,
    "",
    "## Guides",
    ...getGuides().map((g) => `- ${g.title}: ${site.url}/resources/${g.slug}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
