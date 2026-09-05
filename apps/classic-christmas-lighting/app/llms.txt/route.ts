import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import servicesData from "@/content/services.json";
import { ARTICLES } from "@/lib/resources";

export const revalidate = 3600;

/** Plain-text summary for AI crawlers and answer engines. */
export function GET() {
  const lines = [
    "# Classic Christmas Lighting",
    "",
    `> Family-owned professional Christmas light installation company based in Kitchener, Ontario, serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Woodstock and Stratford. 15 years of experience, fully insured, no travel charges in the service area. Full service: design, commercial-grade LED lights supplied, installation, mid-season maintenance, takedown after the holidays and storage. Also commercial lighting, tree wrapping, seasonal light rental for BIAs, municipalities and events, and decoration services (wreaths, garland, bows). Phone ${site.phone}. Email ${site.email}. Free quotes through the website form or by phone, typically answered within one business day.`,
    "",
    "## Services",
    ...servicesData.map((s) => `- ${s.title}: ${s.shortDescription} ${site.url}/services/${s.slug}`),
    "",
    "## Service areas",
    ...cities.map((c) => `- ${c.name}, Ontario: ${site.url}/service-areas/${c.slug}`),
    "",
    "## Key facts",
    "- Lights are supplied by the company: commercial-grade LED C9 rooflines, mini-light tree wraps, net lights, wreaths and garland",
    "- Installed November to early December, removed in January, stored by Classic Christmas Lighting for the next season",
    "- Typical residential install takes two to four hours; quotes are per property, usually from a photo and a phone call",
    "- Hours: Monday to Friday 9 AM to 5 PM, Saturday 10 AM to 4 PM",
    "- Booking: reserve by late September or October for the best install dates",
    "- 2026 Service Excellence Award winner, Holiday & Christmas Lighting, Kitchener",
    "",
    "## Pages",
    `- Home: ${site.url}`,
    `- Services: ${site.url}/services`,
    `- Gallery: ${site.url}/gallery`,
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
