import { site, cities, services } from "@/lib/site";
import { ARTICLES } from "@/lib/resources";

export const revalidate = 3600;

/** Plain-text summary for AI crawlers and answer engines. */
export function GET() {
  const lines = [
    "# Festive Holiday Lighting",
    "",
    `> Professional holiday lighting company serving Southern Ontario (based in Hamilton, ON). Two service lines: classic seasonal Christmas light installation (design, install, mid-season maintenance, takedown and storage) and permanent app-controlled RGBW LED roofline lighting installed once for year-round use. Also commercial, municipal/BIA, tree and interior holiday lighting. $5M liability insurance, WSIB-compliant crews, 10+ years experience, family owned. Phone ${site.phone}. Quotes are free and requested through the website form; there is no monitored email address.`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.name}: ${s.tagline}. ${site.url}/services/${s.slug}`),
    "",
    "## Service areas (Southern Ontario)",
    ...cities.map((c) => `- ${c.name}: ${site.url}/service-areas/${c.slug}`),
    "",
    "## Key facts",
    "- Classic Christmas lights: commercial-grade LED C9 rooflines, tree wraps, garland and wreaths; installed November, removed January, stored by Festive",
    "- Permanent lighting: RGBW LEDs in discreet roofline channels, 16M colours, phone app with schedules; rated −40 °C to +60 °C; lifetime hardware warranty",
    "- Typical permanent residential install: $2,500–$8,000 depending on roofline; classic seasonal programs quoted per home",
    "- Booking: reserve by late September for the best availability",
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
