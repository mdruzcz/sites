/**
 * Catalog additions for the 2026-10 commercial rebuild.
 *
 * - CCS entries map a Commercial Christmas Supply handle (scripts/data/ccs-source.json,
 *   USD list prices) to a fresh HLS product. Prices are converted to CAD at RATE and rounded.
 * - CD entries map a Classic Displays slug (scripts/data/cd-source.json) to a quote-only
 *   HLS product (price 0 → "Request a quote" on the storefront).
 *
 * All copy below is original. Images live in public/images/products/<prefix>-<handle>-<n>.webp.
 */

export const RATE = 1.4; // USD → CAD, Oct 2026 mid-market ~1.40

export function toCad(usd) {
  const x = usd * RATE;
  if (x < 200) return Math.ceil(x) - 0.01;
  if (x < 1000) return Math.round(x / 5) * 5;
  return Math.round(x / 10) * 10;
}

export const NEW_CATEGORIES = [
  { slug: "pole-mount-decor", name: "Pole-Mount Décor", sort_order: 11, description: "LED pole-mount Christmas decorations for street light poles: snowflakes, shooting stars, candy canes and lamp-post wreaths built for BIAs and municipalities." },
  { slug: "overhead-skyline-decor", name: "Overhead & Skyline Décor", sort_order: 11, description: "Overhead street spans, skyline starbursts and hanging LED décor that cross a street, atrium or entrance." },
  { slug: "commercial-bows", name: "Commercial Bows", sort_order: 7, description: "Outdoor-rated structural Christmas bows from 15 to 60 inches for wreaths, garland, poles and facades." }
];

export const CATEGORY_DESCRIPTION_UPDATES = {
  ornaments: "Giant fiberglass ornaments and stacks, lit props, nutcrackers and UV-treated shatterproof ornament sets for commercial displays.",
  trees: "Commercial Christmas trees from 6 ft lobby trees to 38 ft panel towers, pre-lit and pre-decorated, plus outdoor LED light trees.",
  "garlands-and-wreathes": "Commercial wreaths from 3 to 12 ft and 10 ft garland sections, pre-lit and decorated, for storefronts, lamp posts and facades.",
  "photo-op-displays": "Walk-through gift boxes, lit photo frames, archways and oversized characters sized so a family fits in the shot.",
  "3d": "Three-dimensional LED light sculptures on aluminum frames: reindeer, stars, snowmen, gift boxes, signs and archways, rated for Canadian winters.",
  "extension-cords-and-wire": "C7/C9 socket spools at 12-inch spacing, SPT-1 and SPT-2 wire, vampire plugs and extension cords for custom runs.",
  "large-strawberry-lights-c9": "Commercial-grade C9 faceted LED bulbs in 25-packs, twelve colours, plus socket spools and strands at 12-inch spacing."
};

/** Shared spec lines reused across the CCS copy. */
const WINTER = "Built for outdoor use in a Canadian winter.";

export const CCS = [
  {
    handle: "100-light-wire-strands-c9-12-spacing",
    slug: "c9-socket-strand-100ft-12in-spacing",
    name: "C9 Socket Strand — 100 ft, 12\" Spacing",
    cats: ["large-strawberry-lights-c9", "extension-cords-and-wire"],
    featured: true,
    short: "100 ft of 18-gauge socket wire with 100 E17 (C9) sockets at 12-inch spacing and a moulded male plug. Add bulbs and it's a roofline run.",
    long: `## Description
A ready-to-hang 100 ft C9 strand: 18-gauge wire, 100 E17 sockets on 12-inch centres and a moulded male plug on the feed end. One bulb per socket means one bulb per foot, so a 100 ft run takes four 25-packs of C9 LED bulbs.

## Features
- 100 E17 (C9) sockets, 12-inch spacing
- 18 AWG SPT-1 wire, moulded male plug
- Green or white wire to match fascia and gutters
- Rated for interior and exterior use, 120 V
- Bulbs sold separately — pair with our C9 faceted LED 25-packs

## Specifications
- Length: 100 ft (30.5 m)
- Socket base: E17 intermediate (C9)
- Wire: 18 AWG, SPT-1
- Input: 120 V`,
    attributeType: "Wire colour",
    variantName: (v) => `${v.opts[0]} wire`
  },
  {
    handle: "500-light-spools-c7-c9-12-bulb-spacing",
    slug: "c7-c9-socket-spool-500ft-12in-spacing",
    name: "C7 / C9 Socket Spool — 500 ft, 12\" Spacing",
    cats: ["extension-cords-and-wire", "large-strawberry-lights-c9"],
    featured: true,
    short: "500 ft bulk spool of 18-gauge SPT-1 socket wire, 12-inch spacing, in C7 (E12) or C9 (E17) sockets. Cut to length and terminate with vampire plugs.",
    long: `## Description
The installer's spool. 500 ft of SPT-1 socket wire with sockets every 12 inches, cut on site to the exact length of each roofline, tree or fence run and terminated with slide-on vampire plugs. Choose C7 (E12) or C9 (E17) sockets and a wire colour that disappears against the trim.

## Features
- 500 sockets per spool at 12-inch spacing
- 18 AWG SPT-1 wire — pairs with our SPT-1 vampire plugs
- Green, white, brown or black wire
- C7 (E12) or C9 (E17) socket bases
- Interior / exterior rated, 120 V

## Specifications
- Length: 500 ft (152 m)
- Spacing: 12 in
- Wire: 18 AWG SPT-1
- Maximum run: depends on bulb load — see our power planning guide`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[1].replace("C7/E12", "C7 (E12)").replace("C9/E19", "C9 (E17)")} · ${v.opts[0]} wire`
  },
  {
    handle: "polarized-spt1-plugs-male-female",
    slug: "polarized-spt1-plugs-20-pack",
    name: "Polarized SPT-1 Vampire Plugs — 20-Pack",
    cats: ["extension-cords-and-wire", "accessories"],
    short: "Twenty slide-on polarized SPT-1 plugs, male or female, in green, white, brown or black. Terminate custom runs without a splice.",
    long: `## Description
Slide-on (vampire) plugs that bite through SPT-1 wire and lock with a sliding back cover, so a cut length of socket wire becomes a finished run in seconds. Sold in packs of twenty, male or female, in four wire-matching colours.

## Features
- 20 plugs per pack, all male or all female
- Fits 18 AWG SPT-1 wire
- 2-prong polarized, 10 A rated
- Sliding back cover for a clean, secure bite
- Indoor / outdoor use

## Specifications
- Quantity: 20
- Wire: SPT-1 (18 AWG)
- Rating: 10 A, 120 V`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[1]} · ${v.opts[0]}`
  },
  {
    handle: "led-flood-light",
    slug: "par38-led-flood-light-bulb",
    name: "PAR38 LED Flood Light Bulb",
    cats: ["accessories"],
    short: "Outdoor PAR38 LED flood bulb in warm white, cool white, red, green or blue. Uplight trees, facades and displays from a standard E26 socket.",
    long: `## Description
A weatherproof PAR38 LED flood for uplighting trees, columns, signage and 3D displays. Screws into any standard E26 (medium) socket or stake fixture, draws a fraction of a halogen flood and is rated for 50,000 hours.

## Features
- Warm white, cool white, red, green or blue
- 90 SMD LEDs, fully dimmable
- IP65 rated for outdoor use
- E26 medium base, 120 V
- 50,000-hour rated life

## Specifications
- Bulb: PAR38
- Base: E26
- Rating: IP65, 120 V`,
    attributeType: "Colour",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "15-red-structural-bow-no-trim-with-20-tails",
    slug: "red-structural-bow",
    name: "Red Structural Bow with Tails",
    cats: ["commercial-bows", "garlands-and-wreathes"],
    featured: true,
    short: "Commercial red structural bow on a wire-mesh frame with matching tails, 15 to 60 inches. Shapes on site and holds its form outdoors all season.",
    long: `## Description
The classic red bow for wreaths, garland, lamp posts and building facades. A sturdy wire-mesh frame with a foam core means the loops and tails can be bent to shape on the ladder and will still look right in February. Sizes 15 and 18 inch ship as sets of two; 24 inch and up are single bows.

## Features
- Wire-mesh frame with foam interior — holds shape outdoors
- Loops and tails bend to suit the install
- 15" and 18" sold in sets of two; 24", 36", 48" and 60" sold singly
- Outdoor rated

## Sizing
- Choose a bow roughly half the diameter of the wreath it sits on
- 15–18 in: door wreaths and garland swags
- 24–36 in: 4–6 ft wreaths, lamp posts, columns
- 48–60 in: 8–12 ft wreaths and building facades`,
    attributeType: "Size",
    variantName: (v) => v.opts[0].replace(" with ", " bow, ").replace(" Tails", " tails")
  },
  {
    handle: "premium-red-outdura-bow-multiple-options",
    slug: "premium-red-outdura-bow",
    name: "Premium Red Outdura Bow",
    cats: ["commercial-bows"],
    short: "Premium red Outdura fabric bow on a bendable linked-wire frame, 12 to 36 inches, two or four loops, with tie-on straps. Silver or gold trim on request.",
    long: `## Description
A step up in fabric and finish: Outdura is a solution-dyed outdoor fabric that keeps its red through sun and slush for years of commercial use. Built on a bendable linked-wire frame with tie-on straps for wreaths, garland, poles and railings. Available with no trim as listed, or with silver or gold metallic trim on request.

## Features
- Outdura solution-dyed outdoor fabric
- Linked-wire frame, shapes on site
- 2-loop or 4-loop styles
- Tie-on straps included
- Silver or gold metallic trim available — note it on your quote

## Sizes
- 12", 18", 24", 36" bows with proportional tails`,
    attributeType: "Size",
    filter: (v) => v.opts[1] === "None",
    variantName: (v) => `${v.opts[0]} · ${v.opts[2]} loops`
  },
  {
    handle: "24-multi-loop-bow-red",
    slug: "red-multi-loop-puff-bow",
    name: "Red Multi-Loop Puff Bow",
    cats: ["commercial-bows"],
    short: "Giant red multi-loop puff bow, 24 x 30 to 48 x 60 inches, with a suction-cup mount for vehicles and a tie for facades and displays.",
    long: `## Description
The big-reveal bow. A dense multi-loop red puff bow for dealership vehicles, giant gift box displays, storefronts and entrances. Comes with a suction-cup attachment for glass and paint plus a tie for frames and railings.

## Features
- Dense multi-loop puff construction
- Suction-cup mount for vehicles and glass
- Exterior and interior use

## Sizes
- 24 x 30 in
- 36 x 45 in
- 48 x 60 in`,
    attributeType: "Size",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "classic-decorated-commercial-wreath",
    slug: "classic-decorated-commercial-wreath",
    name: "Classic Decorated Commercial Wreath — Pre-Lit",
    cats: ["garlands-and-wreathes"],
    featured: true,
    short: "Pre-lit, pre-decorated commercial wreath in red, apple green and gold with a red structural bow, 3 to 12 ft. Arrives ready to hang.",
    long: `## Description
A finished wreath for a storefront, hotel entrance, parkade or civic building. Red, apple green and gold shatterproof ornaments, gold pinecones and ivy accents on UV-treated foliage, with a red structural bow and warm white LED mini lights woven through. Powder-coated steel frame; sizes 3 to 12 ft.

## Features
- Pre-lit warm white 5mm LED mini lights
- Pre-decorated with UV-treated shatterproof ornaments
- Red structural bow with gold trim included
- Powder-coated steel frame, outdoor rated

## Specifications
- 3 ft: 100 lights, 10 W, 15 lb
- 4 ft: 150 lights, 15 W, 25 lb
- 6 ft: 250 lights, 24 W, 85 lb
- 8 ft: 350 lights, 34 W, 105 lb
- 10 ft: 700 lights, 68 W, 250 lb
- 12 ft: 900 lights, 88 W, 320 lb
- 10 and 12 ft wreaths ship freight; mounting hardware specified on quote`,
    attributeType: "Size",
    variantName: (v) => `${v.opts[0]} diameter`
  },
  {
    handle: "candy-cane-commercial-wreath",
    slug: "candy-cane-commercial-wreath",
    name: "Candy Cane Commercial Wreath — Pre-Lit",
    cats: ["garlands-and-wreathes"],
    short: "Pre-lit commercial wreath decorated in red, white and silver with frosted pinecones and a candy-cane striped bow, 3 to 8 ft.",
    long: `## Description
A red-and-white theme for storefronts, malls and downtown cores. Red, white and silver shatterproof ornaments, silver ivy and frosted pinecones on UV-treated foliage, finished with a candy-cane striped structural bow and lit with warm white and red LED mini lights. Solid red bow or unlit versions available on request.

## Features
- Pre-lit warm white + red LED mini lights
- Shatterproof ornaments and frosted pinecones
- Candy-cane striped structural bow (solid red available)
- Powder-coated frame, outdoor rated

## Sizes
- 3 ft, 4 ft, 6 ft and 8 ft diameters`,
    attributeType: "Size",
    filter: (v) => v.opts[1].startsWith("Candy") && v.opts[2] === "LED Prelit",
    variantName: (v) => `${v.opts[0]} diameter`
  },
  {
    handle: "olympia-pine-wreath",
    slug: "olympia-pine-wreath",
    name: "Olympia Pine Wreath — Pre-Lit",
    cats: ["garlands-and-wreathes"],
    short: "Undecorated commercial pine wreath on a powder-coated frame with warm white LED mini lights, 3 to 6 ft. Add your own bow and ornaments.",
    long: `## Description
A plain, lush pine wreath for teams that decorate to their own theme. Built from 14-inch Olympia pine garland on a powder-coated metal frame and pre-lit with warm white LED mini lights. Pair with a structural bow about half the wreath diameter.

## Features
- Full 14 in Olympia pine garland foliage, UV-treated
- Pre-lit warm white 5mm LED mini lights
- Powder-coated metal frame, outdoor rated
- Undecorated — add bows and ornaments to suit

## Sizes
- 3 ft, 4 ft, 5 ft, 6 ft`,
    attributeType: "Size",
    variantName: (v) => `${v.opts[0]} diameter`
  },
  {
    handle: "mountain-pine-14-garland",
    slug: "mountain-pine-garland-10-ft",
    name: "Mountain Pine Garland — 10 ft x 14 in",
    cats: ["garlands-and-wreathes"],
    short: "Full 14-inch commercial pine garland in 10 ft sections, unlit or pre-lit warm white. UV-treated for outdoor storefronts and streetscapes.",
    long: `## Description
A natural-cut look with long, bristly branches on a brown core. Sold per 10 ft section; sections join end to end for any run. Choose unlit, or pre-lit with 150 warm white 5mm LED mini lights (15 W) per section.

## Features
- 14 in diameter, extra-full profile
- UV-treated PVC foliage for outdoor use
- Unlit or pre-lit warm white LED (150 lights / 15 W per 10 ft)
- Made to order — allow lead time on the quote

## Specifications
- Length: 10 ft per section
- Diameter: 14 in
- Weight: about 6 lb per section`,
    attributeType: "Lighting",
    variantName: (v) => (v.opts[0].startsWith("Prelit") ? "Pre-lit warm white LED" : "Unlit")
  },
  {
    handle: "scotch-pine-12-garland",
    slug: "scotch-pine-garland-10-ft",
    name: "Scotch Pine Garland — 10 ft x 12 in",
    cats: ["garlands-and-wreathes"],
    short: "Mixed-pine commercial garland in 10 ft sections, 12 in diameter, unlit or pre-lit warm white. Custom unlit lengths available.",
    long: `## Description
Mixed pine and greenery for a realistic commercial garland on railings, entrances and columns. Sold per 10 ft section, joined end to end; custom unlit lengths can be made to order.

## Features
- 12 in diameter mixed-pine profile
- Unlit or pre-lit warm white LED mini lights
- UV-treated for outdoor use
- Custom unlit lengths on request

## Specifications
- Length: 10 ft per section
- Diameter: 12 in`,
    attributeType: "Lighting",
    variantName: (v) => (v.opts[0].startsWith("Prelit") ? "Pre-lit warm white LED" : "Unlit")
  },
  {
    handle: "classic-14-prelit-decorated-garland",
    slug: "classic-decorated-garland-10-ft",
    name: "Classic Decorated Garland — Pre-Lit, 10 ft x 14 in",
    cats: ["garlands-and-wreathes"],
    short: "Fully decorated 14-inch commercial garland with warm white LED mini lights and UV-treated shatterproof ornaments, per 10 ft section.",
    long: `## Description
Garland that matches the Classic Decorated Wreath: red, apple green and gold ornaments, gold pinecones and ivy on full 14-inch foliage, pre-lit with warm white LED mini lights. Priced per 10 ft section and made to order.

## Features
- Pre-lit warm white LED mini lights
- UV-inhibited shatterproof ornaments and foliage
- Indoor or outdoor use
- Made to order — allow two to six weeks

## Specifications
- Length: 10 ft per section
- Diameter: 14 in`,
    attributeType: "Lighting",
    variantName: () => "Pre-lit warm white LED"
  },
  {
    handle: "3-center-mount-lamp-post-wreath-with-bow",
    slug: "36in-center-mount-lamp-post-wreath-with-bow",
    name: "36 in Centre-Mount Lamp Post Wreath with Bow",
    cats: ["pole-mount-decor", "garlands-and-wreathes"],
    featured: true,
    short: "36-inch pre-lit wreath engineered to mount around a lamp post below the luminaire, with a red structural bow. Thirty C7 faceted LEDs.",
    long: `## Description
A downtown classic: a 36-inch artificial wreath that mounts around the pole directly under the lamp head so the streetlight glows through it. Pre-lit with 30 C7 faceted LED bulbs and finished with an 18-inch red structural bow with gold trim.

## Features
- Centre-mount design fits standard lamp posts
- 30 C7 faceted LED bulbs, pre-lit (E12 base)
- 18 in red structural bow with gold trim included
- Outdoor rated

## Specifications
- Diameter: 36 in
- Power: 29 W, 120 V
- Weight: 9 lb`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "5-led-ropelight-brilliant-snowflake-pole-mount",
    slug: "5-ft-led-ropelight-brilliant-snowflake-pole-mount",
    name: "5 ft LED Ropelight Snowflake Pole Mount",
    cats: ["pole-mount-decor"],
    featured: true,
    short: "Five-foot aluminum snowflake wrapped in pure white LED rope light, double-sided, 24 V. The go-to pole piece for a main street.",
    long: `## Description
A five-foot snowflake built on a welded aluminum frame and traced in pure white LED rope light, visible from both sides of the street. Runs on 24 V through the supplied transformer and mounts to the pole with standard banding brackets.

## Features
- 5 ft aluminum frame, double-sided design
- Pure white LED rope light (slight icy-blue tint)
- 24 V low-voltage with transformer
- Pole mount — confirm pole diameter on your quote

## Specifications
- Height: 5 ft
- Weight: 25 lb
- Voltage: 24 V`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "7-led-shooting-star-pole-mount",
    slug: "7-ft-led-shooting-star-pole-mount",
    name: "7 ft LED Shooting Star Pole Mount",
    cats: ["pole-mount-decor"],
    featured: true,
    short: "Seven-foot aluminum shooting star with 55 LED bulbs for street light poles, with or without festive garland trim.",
    long: `## Description
The shooting star that runs down a boulevard: a 7 ft aluminum frame lit with 55 LED bulbs, mounted vertically to the pole so the tail sweeps toward the street. Add festive garland trim for a fuller daytime look.

## Features
- 55 LED bulbs
- Welded aluminum frame
- Optional garland trim
- Indoor / outdoor use

## Specifications
- Height: 7 ft
- Power: 54 W
- Weight: 19 lb`,
    attributeType: "Option",
    variantName: (v) => (v.opts[0] === "No Garland" ? "Without garland" : "With festive garland")
  },
  {
    handle: "6-led-candy-cane-garland-tree-pole-mount",
    slug: "6-ft-led-candy-cane-garland-tree-pole-mount",
    name: "6 ft LED Candy Cane Garland Tree Pole Mount",
    cats: ["pole-mount-decor"],
    short: "Six-foot aluminum candy-cane tree pole mount dressed in shimmering garland and lit with 66 LED bulbs.",
    long: `## Description
A tree-shaped pole piece made of candy canes, wrapped in garland and lit with 66 LED bulbs. Reads as red and white by day and a lit silhouette by night.

## Features
- 66 LED bulbs
- Aluminum frame with garland trim
- Indoor / outdoor use

## Specifications
- Height: 6 ft
- Power: 64 W
- Weight: 50 lb`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "8-2-led-lit-elegant-stars-pole-mount",
    slug: "8-ft-led-elegant-stars-pole-mount",
    name: "8 ft LED Elegant Stars Pole Mount",
    cats: ["pole-mount-decor"],
    short: "Eight-foot aluminum star-themed pole decoration traced in pure white LED rope light. Lightweight and a simple do-it-yourself install.",
    long: `## Description
A tall, understated star design for city streets, outdoor shopping centres and destination venues. Lightweight aluminum framing with pure white LED rope light, sized for 20 to 30 ft poles.

## Features
- Pure white LED rope lighting
- Aluminum frame, weather resistant
- Straightforward bracket install

## Specifications
- Height: 8 ft 2 in
- Power: 48 W`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "24-led-ropelight-diamond-snowflake",
    slug: "24in-led-ropelight-diamond-snowflake",
    name: "24 in LED Ropelight Diamond Snowflake",
    cats: ["2d", "pole-mount-decor"],
    short: "Two-foot aluminum-framed snowflake in cool white LED rope light for walls, fences, windows and small poles.",
    long: `## Description
A compact snowflake motif traced in heavy-duty half-inch LED rope light on an aluminum frame. Mounts to walls, fences, windows or small poles and reads cleanly from the street.

## Features
- 1/2 in heavy-duty LED rope light, cool white
- Aluminum frame, all-angle view
- Indoor / outdoor use

## Specifications
- Size: 24 in`,
    attributeType: null,
    variantName: () => "24 in"
  },
  {
    handle: "10-6-starburst-skyline-decor",
    slug: "starburst-skyline-decor-10-ft",
    name: "Starburst Skyline Décor — 10.6 ft",
    cats: ["overhead-skyline-decor"],
    featured: true,
    short: "A 10.6 ft wide suspended starburst with an eight-point compass star between illuminated shooting-star tails, 195 warm white LEDs.",
    long: `## Description
Overhead décor for atriums, concourses and streets: a powder-coated frame with clear mesh and 195 warm white LED mini lights, hung from ceiling points or catenary wire. Suitable for indoor and outdoor use.

## Features
- Eight-point compass-rose star with shooting-star tails
- 195 warm white LED mini lights
- Powder-coated frame, clear mesh wrap
- Exterior and interior use

## Specifications
- Size: 10.6 ft wide x 2.6 ft tall
- Power: 12 W`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "40-merry-christmas-overhead-or-ground-mount-display",
    slug: "40-ft-merry-christmas-overhead-display",
    name: "40 ft Merry Christmas Overhead / Ground Mount Display",
    cats: ["overhead-skyline-decor"],
    featured: true,
    short: "A 40-foot Merry Christmas span in 525 C7 LED bulbs with red mesh garland, built to cross a street or crown a main entrance. Overhead or ground mount.",
    long: `## Description
The piece that announces a downtown. Forty feet of script lettering in 525 C7 LED bulbs on a shimmering red mesh garland, built as an overhead span for streets and entrances or as a ground-mount display. Installation hardware is specified per site on the quote.

## Features
- 525 C7 LED bulbs
- Red carpet mesh garland
- Overhead or ground-mount configuration
- Ships freight; hardware and rigging specified on quote

## Specifications
- Size: 5 ft 4 in x 40 ft
- Power: 504 W
- Weight: 119 lb`,
    attributeType: "Mounting",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "led-lit-brighton-sparkle-accent",
    slug: "led-brighton-sparkle-accent",
    name: "LED Brighton Sparkle Accent",
    cats: ["overhead-skyline-decor", "2d"],
    short: "A four-point sparkle motif on a gold frame with warm white LED mini lights and twinkle, for ceilings, walls and overhead clusters. 3 or 4 ft.",
    long: `## Description
A versatile accent that hangs from a ceiling, clusters in an atrium or mounts at eye level. Gold frame, clear silicone netting and warm white 24 V LED mini lights with a twinkle percentage for movement.

## Features
- Gold frame with clear silicone netting
- Warm white LED mini lights with twinkle
- 24 V, UL plug
- Exterior and interior use

## Specifications
- 4 ft: 70 bulbs (8% twinkle), 5 W
- 3 ft: 28 bulbs (20% twinkle), 2 W`,
    attributeType: "Size",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "giant-led-lit-star-display",
    slug: "giant-led-lit-star-display",
    name: "Giant LED Lit Star Display",
    cats: ["3d", "overhead-skyline-decor"],
    featured: true,
    short: "Giant commercial LED stars in 3.3, 6.5 and 9.8 ft, metal frame with clear silicone netting and twinkling warm or cool white LEDs. Overhead or ground mount.",
    long: `## Description
A shimmering, twinkling star that reads from across a plaza. Metal frame wrapped in clear silicone netting with warm white or cool white LED mini lights. Use the 3.3 ft as an accent or topper, the 6.5 ft in Santa sets and entrances, and the 9.8 ft as a landmark.

## Features
- Metal frame with clear silicone netting
- Warm white or cool white LEDs, 10% twinkle
- Overhead or ground mount
- Outdoor rated

## Specifications
- 3.3 ft: 220 lights, 11 W, 11 lb
- 6.5 ft: 800 lights, 38 W, 76 lb
- 9.8 ft: 1,800 lights, 86 W, 168 lb`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "giant-illuminated-snowflake-prop",
    slug: "giant-illuminated-snowflake-prop",
    name: "Giant Illuminated Snowflake Prop — 6.5 ft",
    cats: ["3d"],
    short: "A 6.5 ft free-standing snowflake with gold or silver framing, clear silicone netting and warm or pure white LED mini lights. Lines walkways and fills Santa sets.",
    long: `## Description
Large-scale snowflakes for lining a walkway, flanking an entrance or filling out a Santa set. Metal frame wrapped in clear silicone netting with woven LED mini lights, on a base for ground display.

## Features
- 6.5 ft tall, free-standing
- Gold or silver framing
- Warm white or pure white LED mini lights
- Outdoor rated

## Specifications
- Height: 6.5 ft`,
    attributeType: "Light colour",
    variantName: (v) => v.opts[1]
  },
  {
    handle: "led-illuminated-reindeer-prop",
    slug: "3d-illuminated-reindeer-prop",
    name: "3D Illuminated Reindeer Prop",
    cats: ["3d", "animals"],
    featured: true,
    short: "Three-dimensional LED reindeer in 4, 6.6 and 9.8 ft, gold or silver frame with clear silicone netting and twinkling warm or cool white LEDs.",
    long: `## Description
A commercial-grade reindeer for flanking entrances and walkways or anchoring a Santa set. Gold or silver metal frame with clear silicone netting and LED mini lights, with a twinkle percentage for life. Three sizes so a herd scales to the site.

## Features
- 3D metal frame with clear silicone netting
- Warm white or cool white LEDs, 10% twinkle
- Base for ground display
- Outdoor rated

## Specifications
- 4 ft: 238 lights, 14 W, 20 lb
- 6.6 ft: 600 lights, 38 W, 40 lb
- 9.8 ft: 1,600 lights, 76 W, 117 lb`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "regal-led-illuminated-gift-box",
    slug: "regal-led-illuminated-gift-box",
    name: "Regal LED Illuminated Gift Box",
    cats: ["3d", "photo-op-displays"],
    short: "A 6 or 10 ft lit gift box on lightweight aluminum framing with a web of warm white or warm white and red LED mini lights. A plaza or entrance centrepiece.",
    long: `## Description
A giant lit gift box in two heights, built on lightweight aluminum framing with a dense web of LED mini lights in warm white, or warm white with a red bow and ribbon. Place at an entrance or pair two for a photo spot.

## Features
- Aluminum frame, LED mini light web
- Warm white or warm white + red
- Indoor or outdoor commercial use

## Specifications
- 6 ft: 800 lights, 38 W, 74 lb
- 10 ft: 1,000 lights, 48 W, 115 lb`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "giant-candy-cane-prop",
    slug: "giant-fiberglass-candy-cane-prop",
    name: "Giant Fiberglass Candy Cane Prop",
    cats: ["ornaments", "3d"],
    short: "Durable fiberglass candy canes in 6, 9 and 12 ft with a protective coating and base. Flank an entrance or line a walkway, indoors or out.",
    long: `## Description
Moulded fiberglass candy canes with a UV-protective finish and a weighted base, built for years of commercial use. Pair them at an entrance, line a walkway, or anchor a Santa set. Custom paint themes available on request.

## Features
- Fiberglass with protective coating
- Base included
- Interior or exterior use
- Custom colour themes available

## Specifications
- 6 ft: 64 lb
- 9 ft: 82 lb
- 12 ft: 100 lb`,
    attributeType: "Size",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "giant-light-bulb-prop",
    slug: "giant-fiberglass-christmas-light-bulb",
    name: "Giant Fiberglass Christmas Light Bulb — 6 ft",
    cats: ["ornaments", "photo-op-displays"],
    short: "A six-foot fiberglass C9-style bulb in red, blue, orange, yellow, green or gold. Group three or four for an oversized string-light photo-op.",
    long: `## Description
A larger-than-life C9 bulb in moulded fiberglass with a glossy finish, sold individually in six colours. Group several on a lawn or plaza for an oversized string of lights, and uplight them with our PAR38 LED floods for a night-time glow (the bulbs themselves are unlit).

## Features
- Fiberglass with gloss finish
- Six colours
- Indoor or outdoor use
- Priced per bulb

## Specifications
- Size: 6 ft wide x 2 ft tall`,
    attributeType: "Colour",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "giant-glitter-ornament",
    slug: "giant-glitter-fiberglass-ornament",
    name: "Giant Glitter Fiberglass Ornament",
    cats: ["ornaments"],
    featured: true,
    short: "Oversized fiberglass ornaments with a glitter finish and gloss top coat, 24 to 84 inches, in eleven colours, with base and silver cap.",
    long: `## Description
Statement ornaments for lobbies, plazas and lawns. Fiberglass with a glitter finish under a high-gloss poly-gel top coat for durability indoors and out. Each ornament ships with a ground base and a silver metallic cap; gold caps and metal hanging rings are available on request.

## Features
- Glitter finish with gloss poly-gel top coat
- Base and silver cap included
- Eleven colours
- Interior and exterior use

## Sizes
- 24 in, 36 in, 42 in, 84 in diameters`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "4-ball-giant-ornament-stack",
    slug: "4-ball-giant-ornament-stack",
    name: "4-Ball Giant Ornament Stack",
    cats: ["ornaments", "3d"],
    short: "A pyramid of four giant fiberglass ornaments on a steel frame, in 24, 36 or 42 inch ball sizes and your choice of colours.",
    long: `## Description
A solid stack of four fiberglass ornaments — three on the bottom, one on top — on a durable steel framework, finished with silver metallic caps. Choose ball size and a colour mix from red, green, purple, gold, silver and blue; custom colours available.

## Features
- Four fiberglass ornaments on a steel frame
- Removable caps with rings, or attached caps
- Colour mix specified on quote
- Indoor or outdoor use

## Specifications
- 24 in balls: 52 in diameter stack, 42 in tall
- 36 in balls: 80 in diameter stack, 65 in tall
- 42 in balls: 94 in diameter stack, 75 in tall`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0].replace(/4-Ball Ornament Stack:\s*/, "")} · ${v.opts[1].replace("Removable Cap with Rings", "removable caps + rings").replace("Attached Caps (No Ring)", "attached caps")}`
  },
  {
    handle: "8-shiny-uv-treated-ball-christmas-ornaments-case-of-12",
    slug: "shiny-round-ornaments-sets",
    name: "Shiny Round Commercial Ornaments — Sets",
    cats: ["ornaments"],
    short: "Shatterproof, UV-treated shiny ball ornaments from 2 to 12 inches, pre-stemmed for installation. Sets of 12 (2–4 in) or 6 (6–12 in).",
    long: `## Description
Commercial ornaments for trees, wreaths and garland that hold their colour outdoors. Shatterproof with a UV-protective coating, drilled and pre-stemmed so a crew can wire them on straight from the case. Additional colours available on request.

## Features
- Shatterproof, UV-treated
- Drilled and pre-stemmed
- Indoor or outdoor use
- Three-season warranty

## Sets
- 2 in, 2.75 in, 3.25 in, 4 in: sets of 12
- 6 in, 8 in, 10 in, 12 in: sets of 6`,
    attributeType: "Option",
    filter: (v) => ["Red", "Gold", "Burgundy", "Champagne"].includes(v.opts[0]),
    variantName: (v) => `${v.opts[1]} · ${v.opts[0]}`
  },
  {
    handle: "large-gift-boxes-with-bow",
    slug: "large-gift-boxes-with-bow",
    name: "Large Gift Boxes with Gold Bow",
    cats: ["ornaments", "photo-op-displays"],
    short: "Interior nylon gift boxes with a gold bow in 12, 18 and 24 inches and five colours. Ship flat and assemble in minutes.",
    long: `## Description
Stackable nylon gift boxes for under lobby trees, window displays and Santa sets. Each has a gold bow and ships flat, assembling in four steps.

## Features
- Nylon construction with gold bow
- Five colours: red, burgundy, green, blue, purple
- Ships flat
- Interior use

## Sizes
- 12 x 12 in, 18 x 18 in, 24 x 24 in`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "75-5-lit-jewelled-nutcracker",
    slug: "lit-jewelled-nutcracker-75in",
    name: "Lit Jewelled Nutcracker — 75.5 in",
    cats: ["ornaments", "3d"],
    short: "A 75.5-inch fiberglass nutcracker with jewelled detailing and built-in multicolour LEDs for storefronts, entrances and plazas.",
    long: `## Description
A formal, vertical figure for entrances and streetscapes: moulded fiberglass with jewelled detailing and 22 built-in multicolour LEDs. Pair two at a doorway.

## Features
- Fiberglass figure, jewelled finish
- 22 multicolour LEDs, 3.5 W
- Outdoor rated

## Specifications
- Height: 75.5 in
- Weight: 68 lb`,
    attributeType: null,
    variantName: () => "Standard"
  },
  {
    handle: "lit-pixie-elve-props",
    slug: "lit-pixie-elf-props",
    name: "Lit Pixie Elf Props",
    cats: ["ornaments", "photo-op-displays"],
    short: "Free-standing lit elf figures about three feet tall, each playing a different instrument, with multicolour LEDs. Fiddle, horn or drum.",
    long: `## Description
Playful musical elves for lobbies, Santa sets and storefront windows. Each wears a different tunic colour and plays a different instrument, with 12 multicolour LEDs for a soft glow.

## Features
- Three styles: fiddle (blue), horn (green), drum (red)
- 12 multicolour LEDs
- Outdoor rated

## Specifications
- Height: about 36–37 in
- Width: 16–20 in`,
    attributeType: "Style",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "gold-moravian-led-tree-top-star",
    slug: "gold-moravian-led-tree-top-star",
    name: "Moravian LED Tree Top Star",
    cats: ["trees", "ornaments"],
    short: "A three-dimensional metal-mesh Moravian star lit from within, 36 or 48 inches, in gold with warm white or silver with cool white LEDs.",
    long: `## Description
The finishing piece for a commercial tree: a 3D metal-mesh Moravian (Bethlehem) star illuminated from inside. Gold with warm white LEDs or silver with cool white, sized for 12 to 38 ft trees.

## Features
- 3D metal mesh construction
- Internal LED illumination
- Gold / warm white or silver / cool white

## Sizes
- 36 in and 48 in`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1].replace(" LEDs", "").replace(" with Cool White Lights", " / cool white")}`
  },
  {
    handle: "crystal-star-tree-topper-pure-white-leds",
    slug: "crystal-star-tree-topper",
    name: "Crystal Star LED Tree Topper",
    cats: ["trees", "ornaments"],
    short: "A crystal-beaded star topper that throws a faceted glow, 24 or 36 inches, warm or cool white LEDs. Made for large outdoor trees.",
    long: `## Description
Opaque crystal beads over an LED core give this topper a faceted sparkle that reads from the street. Built for high-visibility outdoor trees at hotel entrances, plazas and storefronts.

## Features
- Crystal-beaded star
- Warm white or cool white LEDs
- Outdoor rated

## Specifications
- 24 in: 9.5 lb, 9 W
- 36 in: 16 lb, 13.8 W`,
    attributeType: "Option",
    variantName: (v) => `${v.opts[0]} · ${v.opts[1]}`
  },
  {
    handle: "mountain-pine-tree",
    slug: "mountain-pine-commercial-tree",
    name: "Mountain Pine Commercial Tree — Pre-Lit",
    cats: ["trees"],
    featured: true,
    short: "A full, natural-cut commercial tree pre-lit with warm white LED mini lights on a rolling commercial stand, 6.5 to 12 ft. Decorate to your theme.",
    long: `## Description
A lobby and atrium tree built to commercial standards: life-like natural-cut foliage, extra-full branches fully lit with warm white LED mini lights, and a commercial stand on casters so it moves into place. Add ornaments and ribbon to suit.

## Features
- Natural-cut Mountain Pine foliage, extra-full
- Pre-lit warm white LED mini lights
- Commercial stand on casters included
- Indoor use

## Sizes
- 6.5 ft, 7.5 ft, 9.5 ft, 12 ft`,
    attributeType: "Size",
    variantName: (v) => v.opts[0]
  },
  {
    handle: "classic-tree-ornament-package",
    slug: "classic-theme-pre-decorated-christmas-tree",
    name: "Classic Theme Pre-Decorated Christmas Tree",
    cats: ["trees"],
    featured: true,
    short: "A pre-lit Mountain Pine tree dressed in red, apple green and gold ornaments with gold tea-leaf sprays and berry accents, 6.5 to 12 ft. Arrives ready to set.",
    long: `## Description
The tree that saves a day of labour. Mountain Pine pre-lit with warm white 5mm LED mini lights and pre-decorated in the Classic theme: red, apple green and gold shatterproof ornaments, gold tea-leaf sprays and red and green berry accents. Pairs with the Classic Decorated Wreath and Garland.

## Features
- Pre-lit warm white LED mini lights
- Pre-decorated, ready for installation
- Commercial stand included
- Indoor use

## Sizes
- 6.5 ft, 7.5 ft, 9.5 ft, 12 ft on Mountain Pine`,
    attributeType: "Size",
    filter: (v) => v.opts[1].startsWith("Mountain Pine"),
    variantName: (v) => `${v.opts[0]} Mountain Pine`
  },
  {
    handle: "premium-commercial-panel-trees",
    slug: "premium-commercial-panel-tree",
    name: "Premium Commercial Panel Tower Tree",
    cats: ["trees", "3d"],
    featured: true,
    short: "Steel-frame panel tower trees from 14 to 38 ft, wrapped in natural pine garland and lit with C7 LEDs. Plaza, atrium and town-square centrepieces.",
    long: `## Description
A tower tree engineered for public spaces: a solid steel frame for balance in wind and crowds, garland-wrapped panels in natural pine and C7 LED lighting. Assembles in sections on site. Two-tone brown-core, white, gold, silver and custom garland colours available on request.

## Features
- Solid steel frame
- Natural pine garland wrap (custom colours on request)
- C7 LED lighting
- Ships freight in sections; site access confirmed on quote

## Sizes
- 14, 18, 22, 26, 30, 34 and 38 ft`,
    attributeType: "Height",
    filter: (v) => v.opts[2] === "Natural Pine",
    variantName: (v) => `${v.opts[0]} · natural pine · C7 LED`
  },
  {
    handle: "snow-blanket",
    slug: "artificial-snow-blanket-roll",
    name: "Artificial Snow Blanket Roll — 24 in x 90 ft",
    cats: ["accessories"],
    short: "Fluffy flame-retardant artificial snow in a 24 in x 90 ft roll for Santa sets, window displays and under-tree scenes.",
    long: `## Description
The base layer for a Santa set or window display. Flame-retardant, non-allergenic artificial snow that pulls apart and shapes easily.

## Specifications
- Roll: 24 in wide x 90 ft long
- Flame retardant, non-allergenic
- Interior use`,
    attributeType: null,
    variantName: () => "24 in x 90 ft"
  }
];

/** Classic Displays pieces — quote-only, specs pulled from scripts/data/cd-source.json. */
export const CD = [
  { key: "waterloo-reindeer-3d", slug: "waterloo-reindeer-3d", name: "Waterloo Reindeer 3D", cats: ["3d", "animals"], featured: true, short: "A sleek 3D aluminum-frame reindeer in warm white LED netting, in 1.2 m, 2 m and 3 m sizes. A mall, atrium and plaza centrepiece.", blurb: "Three sizes let a single reindeer accent a lobby or a herd fill a plaza. Aluminum structure with latex-webbing LED netting, 24 V low-voltage, IP44 for outdoor use." },
  { key: "waterloo-star-3d", slug: "waterloo-star-3d", name: "Waterloo Star 3D", cats: ["3d", "overhead-skyline-decor"], featured: true, short: "The best-selling 3D illuminated star, in 1 m, 2 m and 3 m, for plazas, parks, rooftops and tree-top mounting.", blurb: "Versatile enough to top a tower tree, line a walkway or crown a town square. Aluminum frame with LED netting, 24 V, IP44." },
  { key: "waterloo-snowflake-3d", slug: "waterloo-snowflake-3d", name: "Waterloo Snowflake 3D", cats: ["3d"], short: "A 3D illuminated snowflake in 1.2 m, 2 m and 3 m sizes for winter-themed plazas, parks and entrances.", blurb: "Ground-mounted on a base or clustered in different sizes for depth. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "waterloo-moose-3d", slug: "waterloo-moose-3d", name: "Waterloo Moose 3D", cats: ["3d", "animals"], featured: true, short: "An illuminated 3D moose family from 3 m to a 9 m giant, the unmistakably Canadian landmark for parks, plazas and resorts.", blurb: "Four sizes, from a 3 m calf to a 9 m bull that stops traffic. Aluminum structure, LED netting, 24 V, IP44; large sizes ship in sections with an anchoring plan." },
  { key: "spokane-reindeer", slug: "spokane-reindeer", name: "Spokane Reindeer", cats: ["3d", "animals", "photo-op-displays"], short: "A 3 m cartoon-style reindeer holding a gift, in 2,022 LEDs on an aluminum frame. A photo-op for malls and festive plazas.", blurb: "Bright, friendly and sized for selfies. Aluminum frame with LED netting, 24 V through a 200 W transformer, IP44." },
  { key: "kodiak-snowman", slug: "kodiak-snowman", name: "Kodiak Snowman — 5 m", cats: ["3d", "photo-op-displays"], featured: true, short: "A 16-foot illuminated snowman in 4,578 pure white LEDs with a 20% twinkle. A town-square landmark.", blurb: "Five metres tall, three metres wide and visible from the far end of a park. Aluminum frame, latex-webbing LED netting, two 200 W transformers, IP44." },
  { key: "mosby-snowman", slug: "mosby-snowman", name: "Mosby Snowman Photo-Op", cats: ["photo-op-displays", "3d"], featured: true, short: "A reclining 3.5 m snowman with a lit seat built in: a photo-op visitors sit on, for malls, markets and plazas.", blurb: "Designed to be climbed on and photographed with. Pure white, warm white and red LEDs on an aluminum frame, 24 V, outdoor rated." },
  { key: "3d-gingerbread-man", slug: "3d-gingerbread-man", name: "3D Gingerbread Man — 2.6 m", cats: ["3d", "photo-op-displays"], short: "A 2.6 m lit gingerbread man with a bow tie and gumdrop buttons, in warm white and pure white LEDs. Pairs with the Cassel Gingerbread House.", blurb: "A crowd favourite beside the gingerbread house or on its own at a mall entrance. Aluminum frame with LED netting, 24 V." },
  { key: "cassel-gingerbread-house", slug: "cassel-gingerbread-house", name: "Cassel Gingerbread House", cats: ["photo-op-displays", "3d"], featured: true, short: "A 3.6 m walk-in gingerbread house in 3,252 LEDs with a window and door for photos. A destination piece for malls and festivals.", blurb: "Four metres long and tall enough to walk into, with candy-cane trim and a lit roofline. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "tabora-walk-through-present-box", slug: "tabora-walk-through-present-box", name: "Tabora Walk-Through Present Box", cats: ["photo-op-displays", "3d"], featured: true, short: "An 11.6 ft lit gift box visitors walk through, in 8,676 LEDs with a red bow and ribbon. The centre-court piece for a shopping centre.", blurb: "Three metres square and three and a half metres tall, with an open passage through the middle. Aluminum frame, LED netting, 24 V, IP44; ships in sections." },
  { key: "the-toque", slug: "the-toque", name: "The Toque Walk-Through Display", cats: ["photo-op-displays", "3d"], featured: true, short: "A walk-in illuminated toque in warm white and red or pure white and blue LEDs. An immersive, unmistakably Canadian attraction for plazas and festivals.", blurb: "Visitors step inside a giant knitted hat lined with light. Aluminum frame with LED netting, 24 V, outdoor rated; two colourways." },
  { key: "otaki-archway", slug: "otaki-archway", name: "Otaki Ornament Archway", cats: ["photo-op-displays", "3d"], featured: true, short: "A 4 m wide, 3.5 m tall lit ornament archway in 1,596 warm white LEDs with heavy twinkle, as seen in downtown Oakville.", blurb: "An entrance to a square or path that frames every photo taken beneath it. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "hanna-frame", slug: "hanna-frame", name: "Hanna Photo Frame", cats: ["photo-op-displays"], featured: true, short: "The best-selling photo-op: a 2.3 m lit frame with a removable bow, 708 warm white LEDs. Remove the bow and use it year-round.", blurb: "A standing lit frame sized so a family fits inside. Aluminum frame, LED netting, 24 V, IP44, 26 kg." },
  { key: "oakdale-3d-gift-box", slug: "oakdale-3d-gift-box", name: "Oakdale 3D Gift Box", cats: ["photo-op-displays", "3d"], short: "A 2.6 m lit gift box with a window opening for photos, 2,100 warm white LEDs, IP67. For plazas, shopping centres and holiday photo areas.", blurb: "Stand in the window, take the photo. Aluminum frame with LED netting, 24 V and an IP67 rating for the wettest sites." },
  { key: "lavina-gift-box", slug: "lavina-gift-box", name: "Lavina Gift Box", cats: ["2d", "overhead-skyline-decor"], short: "A 2.2 m tall flat lit gift box for facades, overhead areas and tree groupings, 160 LEDs.", blurb: "A slim-profile gift box that hangs on a wall or stands between trees. Aluminum frame, LED netting, 24 V, IP44, 15 kg." },
  { key: "lapua-star-totem", slug: "lapua-star-totem", name: "Lapua Star Totem", cats: ["3d"], short: "A 3.5 m vertical stack of illuminated 3D stars, 1,104 LEDs, for narrow sites that want height.", blurb: "A column of stars for medians, corners and lobby ends. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "kadoka-ornament", slug: "kadoka-ornament", name: "Kadoka Ornament", cats: ["ornaments", "3d"], short: "An elegant lit 3D ornament sphere in 1.5 m and 2.1 m, for lobbies, plazas and boulevards.", blurb: "A clean, modern ornament that clusters well in different sizes. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "tiksi-polar-bear", slug: "tiksi-polar-bear", name: "Tiksi Polar Bear", cats: ["3d", "animals"], featured: true, short: "A pure white 3D polar bear in two sizes, 3.9 m and 2 m, for parks, resorts and winter plazas.", blurb: "A mother-and-cub pair or a single bear on its own. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "denton-candy-canes", slug: "denton-candy-canes", name: "Denton Candy Canes", cats: ["3d"], short: "Illuminated 3D candy canes in 2.5 m and 3.4 m, flanking entrances in pairs or standing alone.", blurb: "Red and white LED netting on an aluminum frame, 24 V, outdoor rated." },
  { key: "joy-3d-sign", slug: "joy-3d-sign", name: "JOY 3D Sign", cats: ["3d", "photo-op-displays"], short: "A 2.7 m wide JOY sign in 1,512 warm white LEDs, 1.5 m tall. A photo-op for malls, plazas and events.", blurb: "Three letters, read from the street and the feed. Aluminum frame, LED netting, 24 V, IP44." },
  { key: "noel-3d-sign", slug: "noel-3d-sign", name: "NOËL 3D Sign", cats: ["3d", "photo-op-displays"], short: "A 3 m wide NOËL sign in warm white or pure white LEDs, 1.5 m tall, assembled. A photo-op for bilingual downtowns.", blurb: "Aluminum frame with LED netting, IP44, ships assembled." },
  { key: "eh-3d-sign", slug: "eh-3d-sign", name: "eh! 3D Sign", cats: ["3d", "photo-op-displays"], short: "A 90-inch wide eh! sign in warm white and red LEDs — a uniquely Canadian photo-op for downtowns and malls.", blurb: "Aluminum frame with LED netting, 24 V, IP44." },
  { key: "infinity-santa", slug: "infinity-santa", name: "Infinity Santa", cats: ["2d", "photo-op-displays"], short: "A 1.8 m Santa with an infinity-mirror LED effect that reads in depth from every angle. Red, pure white, blue, green and warm white.", blurb: "A flat panel that looks like a tunnel of light. Part of the Infinity line with the Snowman and Nutcracker." },
  { key: "infinity-snowman", slug: "infinity-snowman", name: "Infinity Snowman", cats: ["2d", "photo-op-displays"], short: "A 1.8 m snowman with an infinity-mirror LED effect in green, red, pure white and orange.", blurb: "Part of the Infinity line — pair with the Santa and Nutcracker along a corridor or plaza edge." },
  { key: "infinity-nutcracker", slug: "infinity-nutcracker", name: "Infinity Nutcracker", cats: ["2d", "photo-op-displays"], short: "A 1.8 m nutcracker with an infinity-mirror LED effect in pure white, red and warm white.", blurb: "Part of the Infinity line — a standing guard for entrances and corridors." }
];

export const KIT_PRICES = {
  "permanent-lighting-kit-50ft": 1455,
  "permanent-lighting-kit-75ft": 1709,
  "permanent-lighting-kit-100ft": 1989,
  "permanent-lighting-kit-150ft": 2579,
  "permanent-lighting-kit-200ft": 3049,
  "permanent-lighting-kit-250ft": 3629
};

export const KIT_FOOTER = `

## Supplied by Forever Lights
These kits are supplied by our sister brand Forever Lights in London, Ontario, at the same price as foreverlights.ca. Add-on strands, track, connectors and controllers are available, and professional installation can be arranged through Forever Lights across Southwestern Ontario. Learn more at https://foreverlights.ca/kits.`;
