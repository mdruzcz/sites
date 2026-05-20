export type ServiceCity = {
  slug: string;
  name: string;
  region: string;
  postal_prefix: string;
  distance_km: number;
  blurb: string;
  neighborhoods: string[];
  intro: string;
  why_local: string;
};

export const CITIES: ServiceCity[] = [
  {
    slug: "woodstock",
    name: "Woodstock",
    region: "Ontario",
    postal_prefix: "N4S",
    distance_km: 50,
    blurb: "Premium deck building serving Woodstock and Oxford County — PT, cedar, composite & PVC decks with a 5-year workmanship warranty.",
    neighborhoods: ["Fairview", "Vansittart", "Beachville", "Sweaburg", "Springbank Park"],
    intro:
      "From historic homes on Vansittart Avenue to newer builds near Pittock Lake, Woodstock homeowners trust London Deck Builder to design and build outdoor spaces that handle Oxford County's full four-season weather. Whether you want a classic pressure-treated deck for the family or a low-maintenance composite build with a built-in pergola, our team in Woodstock delivers detailed, permit-ready work — and a transparent quote before any boards get cut.",
    why_local:
      "We've completed deck projects across Woodstock, Ingersoll and Embro for over a decade. Our crews know the local soil conditions, frost-line depths, and the Oxford County permit process inside out — so your build moves quickly and passes inspection the first time.",
  },
  {
    slug: "st-thomas",
    name: "St. Thomas",
    region: "Ontario",
    postal_prefix: "N5P",
    distance_km: 30,
    blurb: "Decks built for St. Thomas homes — composite, cedar, PT and PVC, with permit help and a 5-year workmanship warranty.",
    neighborhoods: ["Lake Margaret", "Courtright", "Mitchell Hepburn", "Fingal Line", "Pinafore Park"],
    intro:
      "From Lake Margaret's family neighbourhoods to mature streets near Pinafore Park, St. Thomas homeowners deserve a deck that looks great and lasts. Our St. Thomas builds use top-grade lumber, hidden fasteners on composite decks, and footings sized for Elgin County's clay-rich soil. Whether it's a small back deck or a multi-level outdoor living space, we handle design, permits and construction end-to-end.",
    why_local:
      "We've built dozens of decks across St. Thomas and Central Elgin and know exactly how to work with the City of St. Thomas building department to fast-track your permit. Most St. Thomas projects start within 2–4 weeks of finalizing the design.",
  },
  {
    slug: "strathroy",
    name: "Strathroy",
    region: "Ontario",
    postal_prefix: "N7G",
    distance_km: 38,
    blurb: "Strathroy's trusted deck contractor — composite, cedar, PT & PVC builds with a 5-year warranty. Free quotes in Strathroy-Caradoc.",
    neighborhoods: ["Mount Brydges", "Melbourne", "Adelaide", "Caradoc", "Rockwood"],
    intro:
      "Strathroy-Caradoc homes — from rural acreages to in-town builds — need a deck that handles wide-open wind exposure and Middlesex County's freeze-thaw cycles. We build with properly sized footings, code-correct beam spans, and decking laid to drain. Strathroy quotes typically come back within 48 hours, and we'll walk through every line item with you in person.",
    why_local:
      "We regularly work across Strathroy, Mount Brydges and Adelaide-Metcalfe. Our team understands the Strathroy-Caradoc building permit requirements and can pull your permit on your behalf as part of the project.",
  },
  {
    slug: "ingersoll",
    name: "Ingersoll",
    region: "Ontario",
    postal_prefix: "N5C",
    distance_km: 38,
    blurb: "Deck building in Ingersoll, Ontario — PT, cedar and composite decks with permit assistance and a 5-year workmanship warranty.",
    neighborhoods: ["Centreville", "Thames Street", "Carnegie", "Beachville", "Salford"],
    intro:
      "Ingersoll homeowners get the same craftsmanship we deliver across London — without the inflated city pricing. Our Ingersoll builds blend with the town's character: rich-stained cedar on heritage homes, clean composite on newer builds in Centreville, and PVC on rentals where maintenance has to be near-zero.",
    why_local:
      "We know the Town of Ingersoll's deck permit process and have a steady backlog of happy homeowners across Oxford County. Our crews stage trucks and lumber from London, so Ingersoll site visits and material drops happen quickly.",
  },
  {
    slug: "dorchester",
    name: "Dorchester",
    region: "Ontario",
    postal_prefix: "N0L",
    distance_km: 18,
    blurb: "Deck builder serving Dorchester and Thames Centre — composite, cedar, PT & PVC decks with a 5-year workmanship warranty.",
    neighborhoods: ["Hamilton Road", "Crampton", "Putnam", "Mossley", "Harrietsville"],
    intro:
      "Dorchester sits right between London and the rural Thames Centre countryside, and we build a lot of decks here. Larger lot sizes mean we can design wraparound decks, multi-level builds, and integrated pergolas without compromise. Our Dorchester builds use galvanized hardware and ground contact-rated PT for footings to handle wet seasons along the Thames.",
    why_local:
      "Dorchester is in our backyard — we're based in nearby Belmont. That means faster site visits, shorter response times on warranty calls, and a crew that knows every back road in Thames Centre.",
  },
  {
    slug: "tillsonburg",
    name: "Tillsonburg",
    region: "Ontario",
    postal_prefix: "N4G",
    distance_km: 55,
    blurb: "Tillsonburg deck construction — premium composite, cedar and PT decks, permit help and a 5-year workmanship warranty.",
    neighborhoods: ["North Broadway", "Hickory Hills", "Annandale", "Bridge Street", "Glendale"],
    intro:
      "Tillsonburg's mix of family homes, retirement communities like Hickory Hills, and rural properties means we design each deck to the lifestyle of the owner. Low rise-no step entries for older homeowners, kid-friendly composite decks for younger families, and full outdoor living suites with built-in benches and lighting for entertainers.",
    why_local:
      "We've completed projects in Tillsonburg, Brownsville, and Otterville. Our team knows Oxford County permitting and can usually have your deck inspected and signed off in a single visit.",
  },
  {
    slug: "aylmer",
    name: "Aylmer",
    region: "Ontario",
    postal_prefix: "N5H",
    distance_km: 45,
    blurb: "Aylmer's deck contractor — PT, cedar and composite decks with full permit help and a 5-year warranty.",
    neighborhoods: ["Hacienda", "Beach Road", "Springfield", "Port Bruce", "Springwater"],
    intro:
      "Aylmer and the surrounding Elgin County towns get the full London Deck Builder treatment — same crews, same materials, same warranty. Whether you're looking for a simple back deck off the kitchen, a pool-side composite build, or a Lake Erie cottage deck near Port Bruce, our quotes are detailed and honest.",
    why_local:
      "We're regularly working across Aylmer, Springfield and Port Bruce. We understand the Town of Aylmer's deck permit and zoning requirements and pull permits on your behalf.",
  },
  {
    slug: "lambeth",
    name: "Lambeth",
    region: "Ontario",
    postal_prefix: "N6P",
    distance_km: 14,
    blurb: "Deck builder serving Lambeth — composite, cedar, PT & PVC decks with permit help and a 5-year workmanship warranty.",
    neighborhoods: ["Talbot Village", "Westdel", "Bostwick", "Colonel Talbot", "Wickerson"],
    intro:
      "Lambeth has grown fast over the past decade with new builds across Talbot Village and Bostwick, and we've built a lot of decks here. Our Lambeth projects often include integrated lighting, low-maintenance composite surfaces, and modular pergolas — everything you want in a brand-new outdoor space.",
    why_local:
      "We work with the City of London's permit process daily, so Lambeth builds move quickly. We also know how to design around sloped lots common in the Talbot Village area.",
  },
  {
    slug: "komoka",
    name: "Komoka",
    region: "Ontario",
    postal_prefix: "N0L",
    distance_km: 20,
    blurb: "Komoka & Kilworth deck builder — composite, cedar and PT decks with full permit help and a 5-year warranty.",
    neighborhoods: ["Kilworth", "Coldstream", "Delaware", "Middlemiss", "Tempo"],
    intro:
      "Komoka, Kilworth and Coldstream homeowners want decks that work as hard as they play — sturdy enough for a hot tub, finished to match a high-end home, and big enough for entertaining. We've built across Middlesex Centre for years and know how to spec footings for the township's varied soil conditions.",
    why_local:
      "Komoka is a short drive from our Belmont shop. We know Middlesex Centre's permit process and the local inspectors, so projects move quickly and pass first time.",
  },
  {
    slug: "mt-brydges",
    name: "Mount Brydges",
    region: "Ontario",
    postal_prefix: "N0L",
    distance_km: 30,
    blurb: "Deck building in Mount Brydges and Strathroy-Caradoc — composite, cedar, PT & PVC builds with a 5-year warranty.",
    neighborhoods: ["Caradoc", "Wardsville", "Glencoe", "Newbury", "Appin"],
    intro:
      "Mount Brydges sits at the heart of Strathroy-Caradoc — country lots, big yards, and homeowners who want decks they can host on for years. We build large multi-level decks here regularly, with attention to drainage, screened privacy panels, and integrated planters or benches.",
    why_local:
      "We're regularly working across Mount Brydges, Glencoe and Wardsville. Our crews stage from London, so site visits and quotes happen quickly across all of Strathroy-Caradoc.",
  },
  {
    slug: "belmont",
    name: "Belmont",
    region: "Ontario",
    postal_prefix: "N0L",
    distance_km: 25,
    blurb: "Local Belmont, Ontario deck builder — we're based right here. Composite, cedar, PT & PVC decks with a 5-year warranty.",
    neighborhoods: ["Yorke Line", "Belmont Village", "Mapleton", "Avon", "Springfield Line"],
    intro:
      "We're based in Belmont — our shop is on Yorke Line. That means our Belmont neighbours get the fastest response times, the most flexible scheduling, and our personal attention from the first quote to the final inspection. We've been building decks across Central Elgin for years.",
    why_local:
      "We're locals. We know every Central Elgin building inspector, every soil type, and every back road. Belmont projects often start within a week of accepting the quote.",
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCity(slug: string): ServiceCity | undefined {
  return CITIES.find((c) => c.slug === slug);
}
