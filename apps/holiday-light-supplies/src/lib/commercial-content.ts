/** Copy for the /commercial hub and the per-segment landing pages. */
export interface SegmentContent {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  photo: string;
  intro: string;
  orgType: string;
  interests: string[];
  painPoints: { title: string; body: string }[];
  picks: { title: string; body: string; href: string }[];
  /** Category slugs whose products are shown on the page */
  categories: string[];
  productSlugs?: string[];
  process: string[];
  faq: { q: string; a: string }[];
  guides: { href: string; label: string }[];
  gallery: string[];
}

export const SEGMENTS: SegmentContent[] = [
  {
    slug: "malls-shopping-centres",
    name: "Malls & shopping centres",
    h1: "Christmas Décor & Displays for Malls and Shopping Centres",
    metaTitle: "Shopping Mall Christmas Decorations Canada",
    metaDescription: "Commercial Christmas décor for malls and shopping centres: atrium trees, Santa sets, walk-through displays and photo-ops that drive foot traffic. Quoted and shipped across Canada.",
    photo: "mall-red-tree",
    intro: "Atrium trees sized to the ceiling, Santa sets, walk-through displays and photo-ops that fill a feed. Pre-decorated so your team sets it in a night, built to survive eight weeks of crowds.",
    orgType: "Mall / shopping centre",
    interests: ["3D displays & photo-ops", "Commercial trees", "Wreaths, garland & bows"],
    painPoints: [
      { title: "The centre court needs a centrepiece", body: "Pre-lit, pre-decorated trees from 12 to 38 ft on commercial stands, with theme packages that change year to year without replacing the tree." },
      { title: "Guests want a photo spot", body: "Walk-through gift boxes, lit frames, archways and giant ornaments sized so a family fits in the shot. Position near the anchor tenants and let the posts do the marketing." },
      { title: "Install windows are tight", body: "Everything ships assembled or in a few sections with a clear plan, so an overnight crew can set it. We confirm crate sizes for your loading dock." }
    ],
    picks: [
      { title: "Tabora walk-through present box", body: "An 11.6 ft lit gift box visitors step inside. The piece that fills a centre court.", href: "/product/tabora-walk-through-present-box" },
      { title: "Hanna photo frame", body: "Our best-selling photo-op: a 7.7 ft lit frame with a removable bow for year-round use.", href: "/product/hanna-frame" },
      { title: "Classic pre-decorated trees", body: "6 to 12 ft lobby and court trees in red, apple green and gold, pre-lit warm white.", href: "/product/classic-theme-pre-decorated-christmas-tree" },
      { title: "Premium panel tower trees", body: "14 to 38 ft steel-frame towers for atriums and exterior plazas.", href: "/product/premium-commercial-panel-tree" }
    ],
    categories: ["photo-op-displays", "trees", "3d", "garlands-and-wreathes"],
    process: ["Send ceiling heights, court dimensions and last year's photos.", "We propose a centrepiece, two or three photo-ops and the garland package, priced with freight.", "Approve, we ship to your dock before the install window."],
    faq: [
      { q: "Can you theme the display to our brand colours?", a: "Yes. Trees come with theme ornament packages (classic, jewel tone, coastal, silver and gold) and giant ornaments come in eight colours. Custom colour matches are available on fiberglass pieces." },
      { q: "Is the foliage fire-rated?", a: "Our commercial trees and garland use UV-treated, flame-retardant PVC foliage. Ask for the spec sheet on your quote for your fire marshal." },
      { q: "How early should we order?", a: "For a December install, order by late September. Large trees and custom pieces are made to order with two to six week lead times plus freight." }
    ],
    guides: [
      { href: "/resources/shopping-mall-christmas-decor-checklist", label: "Shopping mall Christmas décor checklist" },
      { href: "/resources/commercial-christmas-decoration-budget-planning-guide", label: "Budget planning guide" }
    ],
    gallery: ["mall-atrium-tree", "mall-reindeer", "mall-santa-cabin", "lobby-archway"]
  },
  {
    slug: "bias-downtowns",
    name: "BIAs & downtowns",
    h1: "Holiday Lighting for BIAs and Downtown Main Streets",
    metaTitle: "BIA Holiday Lighting & Pole Decorations",
    metaDescription: "Pole-mount décor, warm-white tree wraps, overhead street spans and lit photo-ops for BIAs and downtown associations. Net-30, tender-ready quotes, shipped across Canada.",
    photo: "downtown-street-trees",
    intro: "One lit piece per pole, every street tree wrapped, a span across the main intersection and a photo-op at the square. That is the formula that makes a downtown the place to be in December, and we supply all of it.",
    orgType: "BIA / downtown association",
    interests: ["Pole-mount décor", "Tree wraps & mini lights", "Overhead spans", "3D displays & photo-ops"],
    painPoints: [
      { title: "Poles are the backbone", body: "Aluminum-framed, LED-lit snowflakes, stars and candy canes sized for 20 to 30 ft street light poles. Order one design per block, a feature piece at intersections." },
      { title: "Street trees need thousands of lights", body: "Commercial 5mm mini light strands by the case, with timers and the power planning to run them from existing pole receptacles." },
      { title: "Budgets are approved by a board", body: "Line-item, tender-ready quotes, net-30 PO invoicing and a three-season phasing plan so the display grows with the budget." }
    ],
    picks: [
      { title: "LED shooting star pole mount", body: "7 ft aluminum frame, 55 LEDs, double-sided. The classic main-street pole piece.", href: "/product/7-ft-led-shooting-star-pole-mount" },
      { title: "Ropelight snowflake pole mount", body: "5 ft pure white LED rope light on an aluminum frame, 25 lb.", href: "/product/5-ft-led-ropelight-brilliant-snowflake-pole-mount" },
      { title: "40 ft Merry Christmas span", body: "525 C7 LEDs and red mesh garland across a street or entrance, overhead or ground mount.", href: "/product/40-ft-merry-christmas-overhead-display" },
      { title: "Otaki archway", body: "A 13 ft lit ornament archway for the square. Seen in downtown Oakville.", href: "/product/otaki-archway" }
    ],
    categories: ["pole-mount-decor", "overhead-skyline-decor", "mini-lights", "photo-op-displays"],
    process: ["Send a pole count, pole heights and a map of the streets.", "We propose a per-pole piece, tree-wrap quantities, a span and a photo-op, priced per block.", "Approve by PO; we ship before your install contractor's window."],
    faq: [
      { q: "Do you supply mounting brackets?", a: "Pole pieces are supplied with standard banding brackets; confirm pole diameter on the quote. Some custom poles need an arm bracket, which we can source." },
      { q: "Can we phase the display over a few years?", a: "Yes, most BIAs do. Year one is usually poles on the main street, year two adds tree wraps and a span, year three adds the photo-op." },
      { q: "Who installs it?", a: "Your contractor or municipal crew. We can refer installers in Southwestern Ontario and the GTA." }
    ],
    guides: [
      { href: "/resources/bia-downtown-holiday-lighting-guide", label: "BIA downtown holiday lighting guide" },
      { href: "/resources/how-to-wrap-trees-with-christmas-lights-commercial", label: "How to wrap street trees" }
    ],
    gallery: ["downtown-boulevard", "downtown-street-trees-2", "town-park-arch", "golden-cone-tree"]
  },
  {
    slug: "municipalities-parks",
    name: "Municipalities & parks",
    h1: "Christmas Lighting & Displays for Municipalities and Parks",
    metaTitle: "Municipal Christmas Lights & Displays Canada",
    metaDescription: "Commercial 3D displays, pole décor, park tree lighting and tender-ready quotes for municipalities, parks departments and public works. Net-30, tax-exempt, shipped across Canada.",
    photo: "town-park-trees",
    intro: "Public spaces need pieces that survive the public: aluminum frames, 24V wiring, IP44 ratings and parts you can replace in year five. We quote to your spec, invoice net-30 and ship on your schedule.",
    orgType: "Municipality / parks & rec",
    interests: ["3D displays & photo-ops", "Pole-mount décor", "Tree wraps & mini lights", "Commercial trees"],
    painPoints: [
      { title: "Procurement needs specs", body: "Line-item quotes with dimensions, LED counts, wattage, IP rating, structure material and lead time, formatted for tenders and RFPs." },
      { title: "Public works installs it", body: "Displays ship with anchoring plans and transformer requirements so your crew can set and power them without a contractor." },
      { title: "It has to last", body: "Aluminum structure, replaceable LED netting and transformers, and a 5-year warranty on LED product." }
    ],
    picks: [
      { title: "Kodiak 16 ft snowman", body: "5 m tall, 4,578 LEDs, aluminum frame. A town-square landmark.", href: "/product/kodiak-snowman" },
      { title: "Waterloo 3D star", body: "The best-selling 3D display, in 1, 2 and 3 m sizes for parks and plazas.", href: "/product/waterloo-star-3d" },
      { title: "Town-square tree lighting", body: "Commercial mini lights and C9 by the case for park trees and the civic tree.", href: "/product-category/mini-lights" },
      { title: "Lamp-post wreath", body: "36 in centre-mount lamppost wreath, pre-lit C7, red structural bow.", href: "/product/36in-center-mount-lamp-post-wreath-with-bow" }
    ],
    categories: ["3d", "pole-mount-decor", "animals", "large-strawberry-lights-c9"],
    process: ["Send the RFP, spec sheet or a list of sites and what you want where.", "We return a tender-formatted quote with specs, lead times and freight to each site.", "Approve by PO; net-30 invoicing and tax-exempt handling are set up on the account."],
    faq: [
      { q: "Can you respond to a formal tender?", a: "Yes. Send the document and we return line-item pricing with the specifications, warranty terms and delivery windows the tender asks for." },
      { q: "Do you offer net-30 and tax-exempt pricing?", a: "Yes for municipalities, BIAs, school boards and other public-sector buyers. Register on the municipalities page and we set up the account." },
      { q: "What about replacement parts in later years?", a: "LED netting, transformers and connectors are available for the displays we sell. Keep your quote number and we match the parts." }
    ],
    guides: [
      { href: "/resources/municipal-holiday-lighting-procurement-guide", label: "Municipal holiday lighting procurement guide" },
      { href: "/resources/power-planning-for-large-holiday-light-displays", label: "Power planning for large displays" }
    ],
    gallery: ["town-square", "town-park-arch", "boulevard-cone-trees", "downtown-boulevard"]
  },
  {
    slug: "property-managers",
    name: "Property managers & hotels",
    h1: "Commercial Christmas Lighting for Property Managers, Hotels and Office Buildings",
    metaTitle: "Christmas Lighting for Property Managers & Hotels",
    metaDescription: "Lobby trees, lit garland, roofline C9, entrance displays and permanent LED lighting for office towers, hotels, plazas and condos. Quoted per property, shipped across Canada.",
    photo: "lobby-warm-white-trees",
    intro: "A lobby tree that photographs well, garland on the entrance, C9 along the roofline and a lit piece at the drive. Everything a tenant or guest sees in December, quoted per property and repeatable every year.",
    orgType: "Property manager / REIT",
    interests: ["Commercial trees", "Wreaths, garland & bows", "C9 / roofline lighting", "Permanent LED lighting"],
    painPoints: [
      { title: "Lobbies need a signature piece", body: "Pre-decorated trees on commercial stands with a theme package, plus matching garland for desks, railings and entrances." },
      { title: "Exteriors need to be installed fast", body: "C9 on 12-inch socket spools, SPT wire and plugs cut to the roofline, or a permanent LED track that never comes down." },
      { title: "Multiple properties, one order", body: "Send a site list and we quote each address with its own freight, so one PO covers the portfolio." }
    ],
    picks: [
      { title: "Classic pre-decorated tree", body: "6 to 12 ft lobby trees, pre-lit and dressed in red, green and gold.", href: "/product/classic-theme-pre-decorated-christmas-tree" },
      { title: "Classic decorated wreath", body: "3 to 12 ft pre-lit, pre-decorated wreaths for entrances and facades.", href: "/product/classic-decorated-commercial-wreath" },
      { title: "C9 warm white 25-pack", body: "The roofline bulb, by the case, with spools and plugs.", href: "/product/c9-faceted-bulb-warm-white" },
      { title: "Permanent lighting kit, 100 ft", body: "12V RGBW roofline track that stays up year-round.", href: "/product/permanent-lighting-kit-100ft" }
    ],
    categories: ["trees", "garlands-and-wreathes", "large-strawberry-lights-c9", "permanent-lighting-kits"],
    process: ["Send the property list with lobby ceiling heights and roofline feet.", "We quote per site: tree, garland, exterior lighting and freight.", "Approve on one PO; we ship to each site or your central warehouse."],
    faq: [
      { q: "Can you ship to multiple addresses on one order?", a: "Yes. Each site gets its own line on the quote with freight to that address." },
      { q: "Can you recommend an installer?", a: "We work with installation crews across Southwestern Ontario and the GTA and can make a referral, or supply your own contractor." },
      { q: "What is the advantage of permanent lighting for a commercial building?", a: "No annual install labour, programmable colours for Canada Day, Halloween and Christmas, and a track that reads as trim in daylight. See the Forever Lights kits." }
    ],
    guides: [
      { href: "/resources/permanent-led-lighting-for-commercial-buildings", label: "Permanent LED lighting for commercial buildings" },
      { href: "/resources/commercial-wreaths-garland-bows-sizing-guide", label: "Wreath, garland and bow sizing" }
    ],
    gallery: ["office-tower", "lobby-atrium-tree", "office-tower-entrance", "luxury-venue"]
  }
];

export function getSegment(slug: string) {
  return SEGMENTS.find((s) => s.slug === slug) ?? null;
}
