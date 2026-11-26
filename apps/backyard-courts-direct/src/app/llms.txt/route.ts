import { cities, faqGroups, guides, kitArea, kitName, kitRate, kits, lowestPrice, money, rate, sports } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

/** Plain-text summary of the site for AI assistants and answer engines. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} (${site.url}) sells do-it-yourself backyard sport court kits made from interlocking modular tiles. Kits ship by freight anywhere in Canada. Buyers choose a size, pick colours and receive a delivered price and a layout drawing before ordering.`,
    "",
    "## Key facts",
    `- ${kits.length} kit sizes across ${sports.length} sports, priced from ${money(lowestPrice())} to ${money(Math.max(...kits.map((k) => k.price)))} CAD.`,
    "- Prices are for the tile kit with game lines, edge pieces and a numbered layout plan. Freight and sales tax are extra.",
    "- Tiles sit on a flat concrete or asphalt base. The base, hoops, nets, lighting and fencing are not included.",
    "- Any kit can be resized in steps of about one foot. Custom sizes are quoted by area.",
    "- Ships to every Canadian province by palletized freight.",
    "",
    "## Court kits and prices (CAD, before freight and tax)",
    ...kits.map((k) => `- [${kitName(k)}](${site.url}/court-kits/${k.slug}): ${money(k.price)}, ${kitArea(k)} sq ft, ${rate(kitRate(k))}/sq ft. ${k.bestFor}.`),
    "",
    "## Sports",
    ...sports.map((s) => `- [${s.kitLabel}](${site.url}/sports/${s.slug}): ${s.intro}`),
    "",
    "## Court dimensions",
    ...sports.flatMap((s) => s.facts.map((f) => `- ${s.name}, ${f.label.toLowerCase()}: ${f.value}`)),
    "",
    "## Guides",
    ...guides.map((g) => `- [${g.h1}](${site.url}/guides/${g.slug}): ${g.answer}`),
    "",
    "## Common questions",
    ...faqGroups.flatMap((g) => g.items).map((f) => `- **${f.q}** ${f.a}`),
    "",
    "## Delivery areas",
    `Ships to every province in Canada. Local pages: ${cities.map((c) => `[${c.name}](${site.url}/locations/${c.slug})`).join(", ")}.`,
    "",
    "## Links",
    `- [All court kits and prices](${site.url}/court-kits)`,
    `- [Custom sizes and size finder](${site.url}/custom-court)`,
    `- [How to build a backyard court](${site.url}/how-it-works)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Request a quote](${site.url}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
