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
    distance_km: 0,
    blurb: "Woodstock's trusted deck and fence contractor — custom PT, cedar & composite decks plus vinyl, wood and steel fencing with a 5-year workmanship warranty.",
    neighborhoods: ["North Woodstock", "Vansittart", "Sally Creek", "Devonshire", "Pittock Lake"],
    intro:
      "From heritage homes on Vansittart Avenue to newer builds in Sally Creek and Devonshire, Woodstock homeowners trust Woodstock Deck & Fence for outdoor structures built to handle Oxford County's full four seasons. Whether you want a low-maintenance composite deck, a classic pressure-treated build, or a vinyl privacy fence that stays white without painting, we deliver detailed, permit-ready work — and a transparent quote before a single board gets cut.",
    why_local:
      "We live and work in Woodstock. Our team knows the City of Woodstock's permit process, pool fence by-laws, and soil conditions inside out. We handle permit applications, Ontario One Call utility locates, and the final inspection so you don't have to deal with a single form.",
  },
  {
    slug: "brantford",
    name: "Brantford",
    region: "Ontario",
    postal_prefix: "N3T",
    distance_km: 45,
    blurb: "Deck and fence contractor serving Brantford — custom decks in PT, cedar & composite plus privacy fences, vinyl and ornamental steel with a 5-year warranty.",
    neighborhoods: ["Brant County", "West Brant", "Holmedale", "Eagle Place", "Henderson"],
    intro:
      "Brantford homeowners get the same craftsmanship we deliver in Woodstock — without compromise. Our Brantford builds use code-correct footings for the Grand River valley's clay-heavy soil, galvanized hardware throughout, and materials chosen for Southwestern Ontario's freeze-thaw cycles. Whether it's a family deck off the back door or a privacy fence along West Brant's larger lots, we design and build it to last.",
    why_local:
      "We regularly complete deck and fence projects across Brantford and Brant County. Our team understands City of Brantford building permit requirements and can submit your permit application as part of the project scope.",
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "Ontario",
    postal_prefix: "N1R",
    distance_km: 55,
    blurb: "Deck and fence builder serving Cambridge, ON — pressure-treated, cedar and composite decks plus vinyl, wood, steel and chain-link fencing with a 5-year warranty.",
    neighborhoods: ["Galt", "Preston", "Hespeler", "Blair", "Saginaw"],
    intro:
      "Cambridge homeowners in Galt, Preston and Hespeler get the same quality outdoor builds we deliver across Oxford County — frost-line footings, premium materials, and a finish that handles Waterloo Region's wet springs and cold winters. From low-maintenance composite decks in Preston to privacy fences in Saginaw, we design each project around your home, your lot, and your budget.",
    why_local:
      "We serve Cambridge as part of our broader SW Ontario footprint. Our crews are experienced with Region of Waterloo permit requirements and bring the same deep-set, galvanized-hardware standard to every Cambridge build.",
  },
  {
    slug: "ingersoll",
    name: "Ingersoll",
    region: "Ontario",
    postal_prefix: "N5C",
    distance_km: 15,
    blurb: "Deck and fence contractor in Ingersoll, ON — custom PT, cedar and composite decks plus privacy fencing, vinyl and steel with a 5-year workmanship warranty.",
    neighborhoods: ["Centreville", "Thames Street", "Beachville", "Salford", "Sweaburg"],
    intro:
      "Ingersoll is right in our backyard, and we build a lot of decks and fences here. Our Ingersoll projects blend with the town's character — rich-stained cedar on heritage homes, clean composite on newer builds in Centreville, and board-on-board privacy fences that handle the winds off the Thames River. We pull permits and handle locates as part of the job.",
    why_local:
      "Ingersoll is one of our most active service areas. We know the Town of Ingersoll's permit and zoning requirements and have dozens of happy homeowners across Oxford County to back it up.",
  },
  {
    slug: "tillsonburg",
    name: "Tillsonburg",
    region: "Ontario",
    postal_prefix: "N4G",
    distance_km: 40,
    blurb: "Deck and fence contractor serving Tillsonburg — composite, cedar and PT decks plus vinyl and wood privacy fencing with a 5-year workmanship warranty.",
    neighborhoods: ["North Broadway", "Hickory Hills", "Annandale", "Bridge Street", "Glendale"],
    intro:
      "Tillsonburg's mix of family homes, retirement communities like Hickory Hills, and rural properties means we design each project to the owner's lifestyle. Low-maintenance vinyl fences for homeowners who want zero upkeep, composite decks for families with young kids, and ornamental steel fences for front-yard curb appeal. Our 4-foot post depth beats the frost heave that causes headaches for cheaper installations.",
    why_local:
      "We've completed deck and fence projects across Tillsonburg, Brownsville and Otterville. Our team knows Oxford County permitting and can usually have your project inspected and signed off in a single visit.",
  },
  {
    slug: "norwich",
    name: "Norwich",
    region: "Ontario",
    postal_prefix: "N0J",
    distance_km: 25,
    blurb: "Deck and fence builder serving Norwich and Oxford County — PT, cedar and composite decks plus vinyl, wood and chain-link fencing with a 5-year warranty.",
    neighborhoods: ["Norwich Village", "Otterville", "Courtland", "Delhi", "Burgessville"],
    intro:
      "Norwich and the surrounding Oxford County townships have larger lots and rural properties that are perfect for multi-level decks, wrap-around designs, and full property perimeter fencing. We build structures that handle the wind exposure and heavy snow loads typical in this part of Ontario — with 4-foot deep posts and heavy-duty galvanized hardware every time.",
    why_local:
      "Norwich is a short drive from our Woodstock base. We know the Township of Norwich permit requirements and regularly work across Otterville, Courtland and the surrounding rural areas.",
  },
  {
    slug: "paris",
    name: "Paris",
    region: "Ontario",
    postal_prefix: "N3L",
    distance_km: 35,
    blurb: "Deck and fence contractor serving Paris, Ontario — custom decks in PT, cedar & composite plus privacy fences and ornamental steel with a 5-year warranty.",
    neighborhoods: ["Grand River", "Cobblestone", "Brant Conservation", "Penman's", "Willow"],
    intro:
      "Paris is one of Ontario's most beautiful small towns, and the homes here deserve outdoor structures that match. Our Paris builds pay attention to detail — from the choice of decking profile to the colour of the fence pickets — and every structure is built to survive the Grand River valley's weather cycles. We handle the County of Brant permit process from start to finish.",
    why_local:
      "We complete projects in Paris and the surrounding County of Brant regularly. Our crews are familiar with the local permit office and zoning requirements, making for smooth builds from first quote to final walk-through.",
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCity(slug: string): ServiceCity | undefined {
  return CITIES.find((c) => c.slug === slug);
}
