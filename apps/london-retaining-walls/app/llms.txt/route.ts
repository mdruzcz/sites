import { site } from "@/lib/site";
import { getServices, getCities, getGuides, getServiceCities } from "@/lib/content";

export const revalidate = 3600;

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> Owner-led retaining wall contractor based in London, Ontario, Canada. Builds interlocking block (Permacon, Allan Block, Unilock), poured concrete, pressure-treated timber, natural stone and armour stone retaining walls, terraced hillside systems, and repairs or rebuilds failing walls. Every wall includes a compacted granular base, clear drainage stone, perforated weeping tile and filter fabric; geogrid on tall block walls and deadman anchors on timber. Handles Ontario building permits and engineering for walls over 1 metre. Free written quotes. Phone ${site.phone}. Hours ${site.hours}.`,
    "",
    "## Service area",
    site.cities.map((c) => `${c.name}, Ontario`).join("; "),
    "",
    "## Typical pricing (2026, installed)",
    "- Interlocking block walls: about $200 to $350 per linear foot depending on height and product",
    "- Timber walls: usually the lowest-cost option",
    "- Poured concrete walls: custom quoted, typically the highest cost",
    "- Repairs and assessments: quoted free after a site visit",
    "",
    "## Services",
    ...getServices().map((s) => `- [${s.h1}](${site.url}/${s.slug}): ${s.metaDescription}`),
    "",
    "## Service area pages",
    ...getCities().map((c) => `- [${c.h1}](${site.url}/${c.slug}): ${c.metaDescription}`),
    "",
    "## Service by town",
    ...getServiceCities().map((p) => `- [${p.h1}](${site.url}/${p.slug})`),
    "",
    "## Guides",
    ...getGuides().map((g) => `- [${g.h1}](${site.url}/${g.slug}): ${g.summary}`),
    "",
    "## Other pages",
    `- [Project gallery](${site.url}/gallery)`,
    `- [About](${site.url}/about-us)`,
    `- [Contact and free quote](${site.url}/contact-us)`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
