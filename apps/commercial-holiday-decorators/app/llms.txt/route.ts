import { site, SECTOR_SLUGS } from "@/lib/site";
import { getCities, getFaqGroups, getGuides, getSectors, getServices } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description} Based at ${site.addressLine}. Phone ${site.phone}. Serving ${site.regionLabel} and travelling province-wide for larger programs. In business since ${site.since}; the commercial division of ${site.sisterBrand.name}.`,
    "",
    "## Services",
    ...getServices().map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.navDescription}`),
    "",
    "## Sectors",
    ...getSectors().filter((s) => (SECTOR_SLUGS as readonly string[]).includes(s.slug)).map((s) => `- [${s.name}](${site.url}/${s.slug}): ${s.navDescription}`),
    "",
    "## Service areas",
    ...getCities().map((c) => `- [${c.name}](${site.url}/service-areas/${c.slug}): ${c.metaDescription}`),
    "",
    "## Guides",
    ...getGuides().map((g) => `- [${g.title}](${site.url}/guides/${g.slug}): ${g.excerpt}`),
    "",
    "## Frequently asked questions",
    ...getFaqGroups().flatMap((g) => g.items.slice(0, 2).map((q) => `- Q: ${q.question} A: ${q.answer}`)),
    "",
    `## Contact`,
    `- Quote form: ${site.url}/contact`,
    `- Phone: ${site.phone}`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
