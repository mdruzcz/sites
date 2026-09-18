import { cities, services, industries, site } from "@/lib/site";

export const revalidate = 86400;

export function GET() {
  const body = `# ${site.name}

> Professional Christmas and holiday light installation for homes and businesses across South-Western Ontario and the western GTA. Family-owned since 2016, based in London, Ontario. Fully insured, WSIB-compliant crews. 5.0 Google rating (80+ reviews). 2026 Service Excellence Award, Best Holiday & Christmas Lighting (Mississauga).

Phone: ${site.phone}
Website: ${site.url}
Quotes: free, replied to within 24 hours.

## What we do
- All-inclusive residential program: custom design, commercial-grade LED lights supplied, installation (often in one day), mid-season maintenance at no charge, January takedown, optional storage from $100/season.
- Residential packages: Classic from $700, Festive from $1,400, Griswold from $2,800. Most homes land between $700 and $3,500.
- Commercial Christmas lighting: building outlines, tree wraps, lit cone trees, giant indoor/outdoor trees, garland, wreaths, lobby and atrium décor for plazas, offices, hotels, restaurants, dealerships, banks, malls, HOAs, churches, municipalities, events and production sets. After-hours installs, multi-year programs, custom quotes.
- Permanent Govee and Eufy LED lighting installs.

## Key pages
- Commercial hub: ${site.url}/commercial-christmas-lighting
- Residential services: ${site.url}/residential-services
- Packages and pricing: ${site.url}/lighting-packages
- Contact / quote: ${site.url}/contact-us

## Services
${services.map((s) => `- ${s.name}: ${site.url}/services/${s.slug}`).join("\n")}

## Property types (commercial)
${industries.map((i) => `- ${i.name}: ${site.url}/industries/${i.slug}`).join("\n")}

## Service areas
${cities.map((c) => `- ${c.name}: ${site.url}/cities/${c.slug}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
