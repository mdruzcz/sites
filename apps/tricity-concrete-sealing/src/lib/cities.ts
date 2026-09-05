import areas from "@/content/service-areas.json";

export type City = {
  slug: string;
  name: string;
  region: string;
  neighbourhoods: string[];
  heroIntro: string;
  metaTitle: string;
  metaDescription: string;
  localFact: string;
};

const EXTRA: Record<string, Omit<City, "slug" | "name" | "region">> = {
  london: {
    neighbourhoods: ["Byron", "Oakridge", "Masonville", "Westmount", "Old North", "Lambeth", "Summerside", "Hyde Park", "White Oaks", "Wortley Village"],
    heroIntro: "Our home base. Stamped patios in Summerside, exposed aggregate in Byron and broom-finish driveways in Old North, sealed with solvent-based product in the finish you choose.",
    metaTitle: "Concrete Sealing London ON | Driveways, Patios & Stamped | TriCity",
    metaDescription: "Professional concrete sealing in London, Ontario. Solvent-based sealers in matte, semi-gloss or gloss for driveways, patios and stamped concrete. 5-year warranty. Free quote.",
    localFact: "TriCity is based in London, so scheduling is flexible and we can usually assess a driveway or patio within days of your call.",
  },
  woodstock: {
    neighbourhoods: ["Sally Creek", "North Woodstock", "Eastdale", "Oxford Heights", "Southside", "Downtown Woodstock", "Sweaburg", "Innerkip"],
    heroIntro: "New subdivisions around Sally Creek and older homes near downtown Woodstock, both hard on unsealed concrete after a few Oxford County winters.",
    metaTitle: "Concrete Sealing Woodstock ON | TriCity Concrete Sealing",
    metaDescription: "Concrete sealing in Woodstock, Ontario for driveways, stamped patios, walkways and exposed aggregate. High-quality solvent-based sealers, three finishes, 5-year warranty. Free quote.",
    localFact: "Woodstock's newer stamped patios and coloured driveways are exactly where a semi-gloss or gloss solvent-based sealer makes the biggest visual difference.",
  },
  brantford: {
    neighbourhoods: ["West Brant", "Echo Place", "Holmedale", "Eagle Place", "Henderson", "Brier Park", "Paris", "St. George"],
    heroIntro: "From West Brant subdivisions to century homes in Holmedale, we clean, prep and seal Brantford concrete so it shrugs off salt and freeze-thaw.",
    metaTitle: "Concrete Sealing Brantford ON | TriCity Concrete Sealing",
    metaDescription: "Professional concrete sealing in Brantford and Paris, Ontario. Driveways, patios, stamped and exposed aggregate sealed with solvent-based product. 5-year warranty. Free quote.",
    localFact: "Several of our before-and-after gallery photos are Brantford patios that went from faded and chalky to fully restored in a single visit.",
  },
  "st-thomas": {
    neighbourhoods: ["Downtown St. Thomas", "Lynhurst", "Mitchell Hepburn", "Southgate", "Dalewood", "Port Stanley", "Belmont", "Talbotville"],
    heroIntro: "Brick homes near Talbot Street, new builds in Southgate and cottages down at Port Stanley, all sealed by the same London crew with no travel charge.",
    metaTitle: "Concrete Sealing St. Thomas ON | TriCity Concrete Sealing",
    metaDescription: "Concrete sealing in St. Thomas and Port Stanley, Ontario. Solvent-based sealers in matte, semi-gloss or gloss for driveways, patios and walkways. 5-year warranty. Free quote.",
    localFact: "St. Thomas is a short drive from our London shop, and lakeside properties near Port Stanley benefit from the UV resistance of a solvent-based sealer.",
  },
  stratford: {
    neighbourhoods: ["Downtown Stratford", "Avon Park", "Old Stratford", "Romeo", "Shakespeare", "Hamlet", "Devon", "Sebringville"],
    heroIntro: "Heritage homes near the Avon River and newer streets on the edge of town, sealed with a finish that suits the house and the theatre-season foot traffic.",
    metaTitle: "Concrete Sealing Stratford ON | TriCity Concrete Sealing",
    metaDescription: "Professional concrete sealing in Stratford, Ontario for driveways, patios, walkways and stamped concrete. Matte, semi-gloss or gloss solvent-based finishes. Free quote.",
    localFact: "Stratford's bed-and-breakfasts and heritage homes usually choose a matte or semi-gloss finish that enhances colour without looking wet.",
  },
  ingersoll: {
    neighbourhoods: ["Downtown Ingersoll", "Thames Valley", "Harris Heights", "Beachville", "Thamesford", "Putnam", "Mount Elgin"],
    heroIntro: "Ingersoll and the rural properties around it, where long driveways and farmhouse patios take a beating from salt trucks and freeze-thaw.",
    metaTitle: "Concrete Sealing Ingersoll ON | TriCity Concrete Sealing",
    metaDescription: "Concrete sealing in Ingersoll and Thamesford, Ontario. Driveways, patios and exposed aggregate sealed with high-quality solvent-based product. 5-year warranty. Free quote.",
    localFact: "Long rural driveways around Ingersoll are quoted by the square foot after a site visit, and a sprayed-and-rolled application keeps big areas streak-free.",
  },
  tillsonburg: {
    neighbourhoods: ["Downtown Tillsonburg", "Baldwin Place", "Hickory Hills", "Broadway", "Delhi", "Courtland", "Otterville", "Norwich"],
    heroIntro: "Adult-lifestyle communities like Baldwin Place and Hickory Hills, plus the farm and rural homes across South Oxford and Norfolk.",
    metaTitle: "Concrete Sealing Tillsonburg ON | TriCity Concrete Sealing",
    metaDescription: "Professional concrete sealing in Tillsonburg, Ontario for driveways, patios, walkways and stamped concrete. Three finishes, solvent-based sealers, 5-year warranty. Free quote.",
    localFact: "Tillsonburg homeowners often add our non-slip additive to a matte or semi-gloss finish on walkways and steps for safe winter footing.",
  },
  "st-marys": {
    neighbourhoods: ["Downtown St. Marys", "Water Street", "Thames Road", "Kirkton", "Granton", "Science Hill"],
    heroIntro: "The Stone Town's limestone homes and their driveways, walkways and patios, sealed to keep salt and moisture out through Perth County winters.",
    metaTitle: "Concrete Sealing St. Marys ON | TriCity Concrete Sealing",
    metaDescription: "Concrete sealing in St. Marys, Ontario. Driveways, patios, walkways and exposed aggregate sealed with solvent-based product in matte, semi-gloss or gloss. Free quote.",
    localFact: "Around St. Marys we see a lot of exposed aggregate, which looks its best with a matte or semi-gloss sealer that deepens the stone colour.",
  },
  aylmer: {
    neighbourhoods: ["Downtown Aylmer", "Springfield", "Malahide", "Port Bruce", "Copenhagen", "Bayham", "Vienna"],
    heroIntro: "Aylmer, Malahide and the lakeshore down to Port Bruce, where sun and wind add UV wear to the usual salt and freeze-thaw damage.",
    metaTitle: "Concrete Sealing Aylmer ON | TriCity Concrete Sealing",
    metaDescription: "Professional concrete sealing in Aylmer and Malahide, Ontario. Driveways, patios and stamped concrete sealed with UV-resistant solvent-based product. 5-year warranty. Free quote.",
    localFact: "Lakeshore properties near Port Bruce get more UV exposure than inland homes, which is where the UV resistance of a solvent-based acrylic pays off.",
  },
  simcoe: {
    neighbourhoods: ["Downtown Simcoe", "Lynn Valley", "Port Dover", "Waterford", "Delhi", "Port Rowan", "Turkey Point"],
    heroIntro: "Norfolk County homes, cottages and lakefront patios, sealed to stand up to sand, sun and the salt spread on Highway 24.",
    metaTitle: "Concrete Sealing Simcoe ON | TriCity Concrete Sealing",
    metaDescription: "Concrete sealing in Simcoe, Port Dover and Norfolk County, Ontario. Driveways, patios and walkways sealed with solvent-based product in three finishes. Free quote.",
    localFact: "Cottage patios around Port Dover and Turkey Point are usually sealed in late spring so they are cured and ready before the summer season.",
  },
};

type Row = { name: string; slug: string; region: string };

export const cities: City[] = (areas as { cities: Row[] }).cities.map((c) => ({ ...c, ...EXTRA[c.slug] }));

export const getCityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
