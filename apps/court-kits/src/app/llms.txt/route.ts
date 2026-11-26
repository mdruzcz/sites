import { cities, faqGroups, kitArea, kitName, kitPrice, kits, money, sports } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

/** Plain-text summary of the site for AI assistants and answer engines. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} sells do-it-yourself backyard sport court kits made from interlocking modular tiles. Kits ship by freight anywhere in Canada. Buyers choose a size, pick colours and receive a delivered price and a layout drawing before ordering.`,
    "",
    "## Court kits",
    ...kits.map((k) => {
      const price = kitPrice(k);
      return `- [${kitName(k)}](${site.url}/court-kits/${k.slug}): ${kitArea(k)} sq ft. ${k.bestFor}.${price ? ` From ${money(price)} CAD.` : ""}`;
    }),
    "",
    "## Sports",
    ...sports.map((s) => `- [${s.kitLabel}](${site.url}/sports/${s.slug}): ${s.intro}`),
    "",
    "## Court dimensions",
    ...sports.flatMap((s) => s.facts.map((f) => `- ${s.name}, ${f.label.toLowerCase()}: ${f.value}`)),
    "",
    "## Common questions",
    ...faqGroups.flatMap((g) => g.items).map((f) => `- **${f.q}** ${f.a}`),
    "",
    "## Delivery areas",
    `Ships to every province in Canada. Local pages: ${cities.map((c) => `[${c.name}](${site.url}/locations/${c.slug})`).join(", ")}.`,
    "",
    "## Links",
    `- [All court kits](${site.url}/court-kits)`,
    `- [How to build a backyard court](${site.url}/how-it-works)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Request a quote](${site.url}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
