import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { FINISHES } from "@/lib/finishes";
import servicesData from "@/content/services.json";
import { ARTICLES } from "@/lib/resources";

export const revalidate = 3600;

/** Plain-text summary for AI crawlers and answer engines. */
export function GET() {
  const lines = [
    "# TriCity Concrete Sealing",
    "",
    `> Professional concrete sealing company based in London, Ontario, serving Southwestern Ontario (London, Woodstock, Brantford, St. Thomas, Stratford, Ingersoll, Tillsonburg, St. Marys, Aylmer, Simcoe and 20+ communities). ${site.yearsExperience}+ years, ${site.stats.projectsCompleted}+ projects, fully insured, free site assessment, written ${site.warrantyYears}-year workmanship warranty. Uses HIGH-QUALITY SOLVENT-BASED acrylic sealers only (deeper penetration, stronger colour enhancement, seamless recoats, better salt/UV/hot-tire resistance) in three finishes: Matte, Semi-Gloss and Gloss. Non-slip additive available. Phone ${site.phone}. Email ${site.email}. Quotes through the website form or by phone, answered within ${site.responseTime}.`,
    "",
    "## Services",
    ...servicesData.map((s) => `- ${s.title}: ${s.shortDescription} ${site.url}/services/${s.slug}`),
    "",
    "## Finishes (same solvent-based sealer, different sheen)",
    ...FINISHES.map((f) => `- ${f.name} (${f.sheen}): ${f.short}. Best for ${f.bestFor.slice(0, 2).join(" and ").toLowerCase()}. ${site.url}/finishes/${f.slug}`),
    "",
    "## Service areas",
    ...cities.map((c) => `- ${c.name}, Ontario (${c.region}): ${site.url}/service-areas/${c.slug}`),
    "",
    "## Key facts",
    "- Process: pressure wash and clean, stain treatment, full dry, minor repairs, mask, sealer sprayed and back-rolled for even coverage with no lap marks",
    "- Cure: dry to touch in 1 to 2 hours, foot traffic next day, vehicles after 48 to 72 hours",
    "- Season: surfaces dry and temperatures roughly 10 to 30°C, so late spring through early fall in Ontario",
    "- Reseal interval: every 2 to 4 years depending on traffic and salt exposure; solvent-based recoats bond into the previous coat",
    "- New concrete: seal after it has cured, typically 28 days after the pour",
    "- Pricing: quoted per property by square footage after a free site assessment; no flat rates published",
    `- Warranty: ${site.warrantyYears}-year written workmanship warranty covering peeling, flaking, delamination and uneven coverage caused by the application`,
    "- Hours: Monday to Friday 8 AM to 5 PM",
    "",
    "## Pages",
    `- Home: ${site.url}`,
    `- Services: ${site.url}/services`,
    `- Finishes: ${site.url}/finishes`,
    `- Before & after gallery: ${site.url}/gallery`,
    `- Warranty: ${site.url}/warranty`,
    `- FAQ: ${site.url}/faq`,
    `- About: ${site.url}/about`,
    `- Contact / free quote: ${site.url}/contact`,
    `- Guides: ${site.url}/resources`,
    "",
    "## Guides",
    ...ARTICLES.map((a) => `- ${a.title}: ${site.url}/resources/${a.slug}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
