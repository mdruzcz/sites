# Content brief: commercialholidaydecorators.ca

## The business (facts you may state; do not invent others)
- Brand: **Commercial Holiday Decorators** (commercialholidaydecorators.ca). The commercial division of a Southwestern Ontario holiday-lighting company operating since 2016 (sister brand: We Install Christmas Lights). Base: London, Ontario. Serves commercial clients across Southwestern Ontario, the Greater Toronto Area, Hamilton-Niagara and beyond.
- Phone 519-266-6796. Response within 24 hours (one business day). Insured crews, WSIB-compliant, bucket trucks and aerial lifts, after-hours / overnight installs so tenants, guests and parking are not disrupted.
- Full-service and turnkey: design, supply, install, maintain all season (no charge for any fault), January takedown, labelled storage in our warehouse, priority dates next season. Multi-year agreements lock pricing and schedule.
- Commercial-grade LED strings and C9 bulbs, tree wraps, lit cone trees, giant outdoor trees, pre-lit lobby trees (7 to 20+ ft), garland, wreaths, bows, ribbon, ornaments, planters, Santa photo sets, mall village displays, animated pixel light shows. Everything is our own inventory so we can warranty it; we do not install customer-supplied product.
- Interior work: lobby and atrium trees, elevator-lobby and reception trees, staircase and railing garland, entrance arches, planters, wreaths, custom themed displays, colour schemes matched to brand or interior finishes. Exterior work: building outlines and rooflines, porte-cochère and canopy lighting, columns and entrances, tree wrapping, cone trees, hedges, walkways, boulevards, parking-lot trees, giant trees.
- Leasing / rental model: client leases the décor per season (design + product + install + maintenance + removal + storage in one price), or buys the product and pays for the service program each year. Explain both honestly; leasing is the default recommendation for lobby trees and large displays.
- Timeline: site visits and design from July to September; installs run October to late November so displays are lit before Black Friday / late-November; takedown first three weeks of January. Early bookings get first pick of dates.
- Pricing: custom quoted from a site visit or plans and photos. Price drivers: linear footage, tree count and height, lift requirements, indoor décor scope, one season vs multi-year. Give honest *ranges* only where asked in FAQs (e.g. lobby tree programs commonly start around $1,500 per season for a 9 ft decorated tree and run to five figures for atrium and mall programs; exterior programs from a few thousand for a storefront to tens of thousands for a plaza or campus). Mark ranges as typical, not quotes.
- No fabricated testimonials or named clients. You may describe *types* of projects (e.g. "a 20-foot atrium tree for an office tower lobby in downtown London") because the gallery has those photos. Never name a hotel chain, REIT or mall as a client.

## Target search terms (work them in naturally: titles, H1s, first paragraphs, FAQs, alt-level phrasing)
High intent: commercial holiday decorating services [City/Ontario]; hotel lobby Christmas decorators near me; commercial Christmas light installation [City]; commercial interior holiday decor company; lobby Christmas tree rental and setup.
Sector: hotel Christmas decorating contractors; porte-cochere holiday lighting setup; atrium holiday decor leasing; condo lobby Christmas decorator; property management holiday lighting contractor; multi-residential holiday decor setup; shopping center holiday lighting company; commercial plaza Christmas tree installation.
Operational: turnkey commercial Christmas decor leasing; commercial holiday lighting installation and storage; insured commercial holiday decorators.

## Voice
Clear, confident, specific, grade 8-10 reading level. Written for property managers, hotel GMs, facilities and marketing managers, condo boards and BIA coordinators. No em dashes (use commas or full stops). Canadian spelling (colour, centre). Short paragraphs (2-4 sentences). No hype words like "magical" more than once per page. Every page should read as if written by the crew that does the work.

## Media
`apps/commercial-holiday-decorators/src/content/media.json` has `images[]` with `key`, `alt`, `category` (lobbies | malls | storefronts | exteriors | municipal) and `videos[]` with `key`, `alt`, `category`. Reference media only by `key`. Pick keys whose alt text actually matches the page.

## Output rules
- Valid JSON only, UTF-8, no trailing commas, no comments. Write the file, then run `node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log('ok')" <file>` to prove it parses.
- Slugs are kebab-case and must match exactly what the brief assigns.
- Internal links in body text are plain text, not markdown; the components add links.
