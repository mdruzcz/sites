/**
 * SEO copy for category landing pages. The DB description is a one-liner; this
 * adds an H1 title, intro, hero photo, buyer tips and FAQ per category so each
 * /product-category/<slug> page targets a real commercial keyword.
 */
export interface CategoryContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  photo: string;
  tips?: string[];
  faq?: { q: string; a: string }[];
  guide?: { href: string; label: string };
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  "large-strawberry-lights-c9": {
    h1: "Commercial C9 LED Christmas Lights & Bulbs",
    metaTitle: "Commercial C9 LED Christmas Lights Canada",
    metaDescription: "Commercial-grade C9 LED bulbs in 25-packs, 12 colours, with socket spools, SPT wire and plugs. Case pricing for installers, BIAs and municipalities. Ships from Ontario.",
    intro: "The bulb on every main street and roofline. Faceted C9 LEDs on an E17 base, sold in 25-packs in twelve colours and paired with 12-inch-spaced socket spools so every foot of wire gets one bulb. Case pricing on quotes.",
    photo: "commercial-roofline",
    tips: ["One bulb per foot at 12\" spacing — a 100 ft spool needs four 25-packs.", "Warm white (3000K) reads traditional; pure white reads modern and icy.", "Pair with SPT-1 spools and vampire plugs for custom runs with no splices."],
    faq: [
      { q: "How many C9 bulbs do I need?", a: "One per socket. Our socket spools are 12-inch spacing, so a 100 ft run needs 100 bulbs, which is four 25-packs." },
      { q: "Do you sell by the case?", a: "Yes. Tell us the quantity on your quote and we apply case pricing automatically for installers, BIAs, malls and municipalities." }
    ],
    guide: { href: "/resources/c9-led-christmas-lights-commercial-buying-guide", label: "Read the C9 buying guide" }
  },
  "3d": {
    h1: "3D LED Christmas Light Displays for Commercial Spaces",
    metaTitle: "3D LED Christmas Light Displays Canada",
    metaDescription: "Commercial 3D LED Christmas displays: reindeer, stars, snowmen, gift boxes, archways and signs. Aluminum frames, 24V, IP44, winter-rated. Quoted with freight across Canada.",
    intro: "Large-format sculptures that anchor a plaza, atrium or town square. Aluminum frames wrapped in LED netting, 24V low voltage through weatherproof transformers, IP44 rated, 1.2 m to 5 m tall. Quoted per project with freight and lead time.",
    photo: "golden-cone-tree",
    tips: ["Pair a centrepiece with two flanking pieces for a photo spot that reads from the street.", "Walk-through pieces (archways, gift boxes, The Toque) drive dwell time and social posts.", "Most pieces ship assembled or in two to four sections; we confirm on the quote."],
    faq: [
      { q: "Are 3D displays priced online?", a: "Most are quoted per project because freight, lead time and multi-piece pricing change the number. Add them to your quote list and we reply within one business day." },
      { q: "Can they stay out all winter?", a: "Yes. Aluminum structure, LED netting and IP44-rated 24V wiring are built for a Canadian season outdoors." }
    ],
    guide: { href: "/resources/3d-led-christmas-light-displays-buying-guide", label: "Read the 3D display buying guide" }
  },
  "2d": {
    h1: "2D LED Christmas Motifs & Silhouettes",
    metaTitle: "2D LED Christmas Motifs for Walls & Poles",
    metaDescription: "Flat 2D LED Christmas motifs and silhouettes for walls, fences, poles and rooflines. Commercial-grade, winter-rated, shipped across Canada from Ontario.",
    intro: "Flat-profile LED motifs that mount to walls, fences and rooflines where a 3D piece won't fit. Lightweight, quick to hang and bright from the street.",
    photo: "commercial-entrance-drive"
  },
  "photo-op-displays": {
    h1: "Photo-Op & Walk-Through Christmas Displays",
    metaTitle: "Photo-Op Christmas Displays for Malls & BIAs",
    metaDescription: "Walk-through gift boxes, lit archways, photo frames and selfie-ready Christmas displays for malls, BIAs and municipalities. Commercial-grade, quoted across Canada.",
    intro: "The displays that turn visitors into marketing. Lit photo frames, walk-through present boxes, archways and oversized characters sized so a family fits in the shot.",
    photo: "mall-photo-booth",
    tips: ["Place photo-ops where the queue won't block a corridor or doorway.", "Warm white photographs best on phones; add one red or green accent piece for contrast.", "Add a ground-mount sign or hashtag so posts credit the property."]
  },
  "pole-mount-decor": {
    h1: "Pole-Mount Christmas Decorations for Street Lights",
    metaTitle: "Pole Mount Christmas Decorations Canada",
    metaDescription: "LED pole-mount Christmas décor for street light poles: snowflakes, shooting stars, candy canes and lamp-post wreaths. Built for BIAs and municipalities, shipped across Canada.",
    intro: "Aluminum-framed, LED-lit pole décor sized for 20 to 30 ft street light poles. The fastest way to transform a main street: one piece per pole, mounted with standard banding brackets.",
    photo: "downtown-street-trees",
    tips: ["Order one design per block for rhythm, then a feature piece at intersections.", "Confirm pole diameter and banding before ordering brackets.", "Pure white reads crisp against sodium or LED streetlights; warm white softens older downtowns."],
    guide: { href: "/resources/bia-downtown-holiday-lighting-guide", label: "Read the BIA lighting guide" }
  },
  "overhead-skyline-decor": {
    h1: "Overhead & Skyline Christmas Décor",
    metaTitle: "Overhead Christmas Decorations & Street Spans",
    metaDescription: "Overhead Christmas spans, skyline starbursts and hanging LED décor that cross a street, atrium or parkade entrance. Commercial-grade, quoted with hardware across Canada.",
    intro: "Spans and suspended pieces that fill the air above a street or atrium: 40 ft Merry Christmas banners in C7 LED, starburst skylines and hanging chandeliers.",
    photo: "lobby-archway"
  },
  "garlands-and-wreathes": {
    h1: "Commercial Christmas Wreaths & Garland",
    metaTitle: "Commercial Christmas Wreaths & Garland Canada",
    metaDescription: "Commercial wreaths from 3 to 12 ft, pre-lit and decorated, plus 10 ft garland sections for storefronts, lamp posts and building facades. Shipped across Canada.",
    intro: "Wreaths from 3 ft over a door to 12 ft on a parking structure, pre-lit and pre-decorated, plus 10 ft garland sections in 12 and 14 inch diameters. UV-treated foliage on powder-coated frames.",
    photo: "lobby-potted-trees",
    tips: ["Size the wreath to the wall: 3–4 ft over doors, 6–8 ft on a facade, 10–12 ft on a parkade.", "A bow about half the wreath diameter looks proportional.", "Garland is priced per 10 ft section — measure the run and round up."],
    guide: { href: "/resources/commercial-wreaths-garland-bows-sizing-guide", label: "Read the sizing guide" }
  },
  "commercial-bows": {
    h1: "Commercial Christmas Bows",
    metaTitle: "Commercial Christmas Bows 15 to 60 Inches",
    metaDescription: "Outdoor-rated structural Christmas bows from 15 to 60 inches in red velvet, Outdura and nylon, with gold or silver trim. For wreaths, garland, poles and facades. Shipped across Canada.",
    intro: "Structural bows on bendable wire frames that hold their shape through a wet December. Red velvet, Outdura and nylon, 15 to 60 inches, with tails sized to match.",
    photo: "estate-roofline"
  },
  trees: {
    h1: "Commercial Christmas Trees",
    metaTitle: "Commercial Christmas Trees Canada",
    metaDescription: "Commercial Christmas trees from 6 ft lobby trees to 38 ft panel towers, pre-lit and optionally pre-decorated, plus LED light trees. Quoted with freight across Canada.",
    intro: "Lobby trees on commercial stands, pre-decorated theme packages, outdoor cone trees and 14 to 38 ft steel-frame panel towers for plazas and town squares.",
    photo: "plaza-tree",
    tips: ["Leave 3 ft between tree top and ceiling for a topper.", "Pre-decorated packages save a day of labour per tree.", "Panel towers ship freight in sections; confirm site access on the quote."],
    guide: { href: "/resources/shopping-mall-christmas-decor-checklist", label: "Read the mall décor checklist" }
  },
  ornaments: {
    h1: "Giant Christmas Ornaments & Props",
    metaTitle: "Giant Christmas Ornaments & Fiberglass Props",
    metaDescription: "Giant fiberglass ornaments, ornament stacks, nutcrackers, candy canes, gift boxes and shatterproof ornament sets for commercial Christmas displays. Shipped across Canada.",
    intro: "Oversized fiberglass ornaments and stacks, lit nutcrackers, giant candy canes and gift boxes, plus UV-treated shatterproof ornament sets for trees and wreaths.",
    photo: "plaza-vintage-truck"
  },
  animals: {
    h1: "LED Animal Christmas Displays",
    metaTitle: "LED Animal Christmas Displays",
    metaDescription: "Lit reindeer, polar bears, penguins, moose and more in 2D and 3D LED for parks, plazas and malls. Commercial-grade, winter-rated, quoted across Canada.",
    intro: "Reindeer, polar bears, penguins, moose, horses and the rest of the menagerie in LED netting on aluminum frames. From 3 ft accents to 9 m giants.",
    photo: "mall-reindeer"
  },
  "mini-lights": {
    h1: "Commercial 5mm Mini Lights",
    metaTitle: "Commercial 5mm LED Mini Lights Canada",
    metaDescription: "Commercial-grade 5mm LED mini light strands for tree wraps, shrubs and garland. Warm and pure white, twinkle options, case pricing. Shipped from Ontario across Canada.",
    intro: "The strand for tree trunks, canopies, shrubs and garland. Sealed 5mm LEDs on green wire, warm or pure white, with twinkle options.",
    photo: "town-park-trees",
    guide: { href: "/resources/how-to-wrap-trees-with-christmas-lights-commercial", label: "How to wrap trees" }
  },
  "super-bright-globe-lights-g20": {
    h1: "G20 Globe Lights",
    metaTitle: "G20 LED Globe Lights for Patios & Cafés",
    metaDescription: "Super-bright G20 LED globe bulbs for patios, cafés, market lights and statement displays. Commercial-grade, shipped across Canada from Ontario.",
    intro: "Smooth G20 globes for patios, café strings and market lights that need to glow year-round.",
    photo: "brewery-tree-wrap"
  },
  "snowfall-lights": {
    h1: "LED Snowfall Tubes",
    metaTitle: "LED Snowfall Tube Lights",
    metaDescription: "Cascading LED snowfall tubes in 12 to 36 inch lengths for trees, canopies and entrances. Commercial-grade meteor lights shipped across Canada.",
    intro: "Cascading meteor tubes that make a canopy look like falling snow. 12 to 36 inch, pure white, with C9, E12 or plug bases.",
    photo: "venue-fountain"
  },
  "extension-cords-and-wire": {
    h1: "Christmas Light Wire, Socket Spools & Plugs",
    metaTitle: "C9 Socket Spools, SPT Wire & Plugs",
    metaDescription: "C7/C9 socket spools at 12-inch spacing, SPT-1 and SPT-2 wire, vampire plugs and extension cords for custom commercial Christmas light runs. Shipped across Canada.",
    intro: "Build runs to the exact length: socket spools at 12-inch spacing, SPT-1 and SPT-2 wire by the spool, and vampire plugs that terminate without a splice.",
    photo: "office-tower"
  },
  accessories: {
    h1: "Christmas Lighting Accessories",
    metaTitle: "Christmas Lighting Accessories & Hardware",
    metaDescription: "Timers, clips, lawn stakes, replacement sockets and PAR38 LED floodlights for commercial Christmas lighting installs. Shipped across Canada from Ontario.",
    intro: "The small parts that make an install hold: timers, clips, stakes, replacement sockets and floodlights.",
    photo: "commercial-roofline"
  },
  "permanent-lighting-kits": {
    h1: "Permanent LED Roofline Lighting Kits",
    metaTitle: "Permanent LED Roofline Lighting Kits Canada",
    metaDescription: "12V RGBW permanent LED roofline lighting kits for 50 to 250 ft, with colour-matched aluminum track, WiFi controller and all connectors. By Forever Lights. Shipped across Canada.",
    intro: "Install once, light every season. 12V RGBW pucks in colour-matched aluminum track that hides in the soffit, with a WiFi controller for scenes and schedules. Six kit sizes from 50 to 250 ft, supplied by our sister brand Forever Lights.",
    photo: "commercial-roofline",
    tips: ["Measure the lit roofline and round up to the next kit size — corners and offcuts eat a few feet.", "Track in white, black, brown or wicker disappears against fascia in daylight.", "Add-on strands, track and connectors are available for odd rooflines."],
    faq: [
      { q: "Who makes the kits?", a: "Forever Lights, our sister brand in London, Ontario. Same kits and pricing as foreverlights.ca, with DIY or professional installation available." },
      { q: "Do I need an electrician?", a: "No. The 150 W power supply plugs into a standard GFCI-protected outdoor outlet and the run is 12V low voltage." }
    ],
    guide: { href: "/resources/permanent-led-lighting-for-commercial-buildings", label: "Permanent lighting for commercial buildings" }
  },
  "new-products": {
    h1: "New Commercial Christmas Products",
    metaTitle: "New Commercial Christmas Lighting & Décor",
    metaDescription: "The newest commercial Christmas displays, lighting and décor added to the Holiday Light Supplies catalog this season. Shipped across Canada from Ontario.",
    intro: "Fresh arrivals for the season: new displays, décor and lighting added to the catalog.",
    photo: "plaza-tree-night"
  },
  "last-chance": {
    h1: "Last Chance Christmas Lighting Deals",
    metaTitle: "Last Chance Commercial Christmas Lighting",
    metaDescription: "Discontinued and limited-stock commercial Christmas lighting and décor at last-chance pricing. While supplies last, shipped across Canada.",
    intro: "Discontinued lines and limited stock at last-chance pricing. When it's gone, it's gone.",
    photo: "cone-tree"
  }
};
