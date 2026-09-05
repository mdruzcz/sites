import { site } from "@/lib/site";
import { getServices, getCities, getGuides } from "@/lib/content";

export const revalidate = 3600;

export function GET() {
  const lines = [
    "# Restore My Deck",
    "",
    `> Deck and fence restoration company based in Kitchener, Ontario, serving Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Stratford, Woodstock, Fergus, Paris and surrounding Southwestern Ontario. Founded by Cameron; 10+ years of wood restoration. Method: eco-friendly, plant-safe, VOC-compliant cleaning; power washing or soft washing depending on the wood; 80-grit buff sanding before every stain; stain is brush-applied (never sprayed) using penetrating oil-based products (Ready Seal and Penofin Verde) that fade gracefully and never peel; transparent, semi-transparent (most popular), semi-solid and solid options; most projects finished in about 2 days including drying. Services: deck restoration, staining, cleaning, power washing, sealing, sanding, repair and maintenance, rebuilding; fence cleaning, staining and painting. Phone ${site.phone}. Email ${site.email}. Hours ${site.hours}. Free no-obligation quotes, usually from photos, answered within 24 hours.`,
    "",
    "## Services",
    ...getServices().map((s) => `- ${s.title}: ${s.excerpt} ${site.url}/${s.slug}`),
    "",
    "## Service areas",
    ...getCities().map((c) => `- ${c.city}, Ontario: ${site.url}/${c.slug}`),
    `- Also: ${site.extraAreas.join(", ")}`,
    "",
    "## Pricing guidance",
    ...site.pricing.map((p) => `- ${p.service}: ${p.price} (${p.note})`),
    "- Maintenance re-stain every 2–4 years; full restoration every 5–7 years",
    "",
    "## Pages",
    `- Home: ${site.url}`,
    `- Services: ${site.url}/services`,
    `- Projects (before & after): ${site.url}/projects`,
    `- Service areas: ${site.url}/service-areas`,
    `- Helpful tips: ${site.url}/blog`,
    `- About: ${site.url}/about-us`,
    `- Contact / free quote: ${site.url}/contact-us`,
    "",
    "## Guides",
    ...getGuides().map((g) => `- ${g.title}: ${site.url}/${g.slug}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
