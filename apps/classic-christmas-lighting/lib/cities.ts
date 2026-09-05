import areas from "@/content/service-areas.json";

export type City = {
  slug: string;
  name: string;
  region: string;
  description: string;
  population: string;
  nearbyAreas: string[];
  neighbourhoods: string[];
  heroIntro: string;
  metaTitle: string;
  metaDescription: string;
  localFact: string;
};

const EXTRA: Record<string, Pick<City, "neighbourhoods" | "heroIntro" | "metaTitle" | "metaDescription" | "localFact">> = {
  kitchener: {
    neighbourhoods: ["Doon", "Forest Heights", "Stanley Park", "Huron Park", "Williamsburg", "Chicopee", "Laurentian Hills", "Downtown Kitchener"],
    heroIntro: "Our home base. Roofline lights, wrapped trees and wreaths for Kitchener homes from Doon to Forest Heights, plus storefronts and offices downtown.",
    metaTitle: "Christmas Light Installation Kitchener ON | Classic Christmas Lighting",
    metaDescription: "Professional Christmas light installation in Kitchener, Ontario. Family-owned, 15 years, fully insured. Design, install, maintenance and takedown included. Free quote: (226) 476-2038.",
    localFact: "Classic Christmas Lighting is based in Kitchener, so there is never a travel charge and our crews know every subdivision from Huron Park to Stanley Park.",
  },
  waterloo: {
    neighbourhoods: ["Uptown Waterloo", "Beechwood", "Laurelwood", "Columbia Forest", "Eastbridge", "Westmount", "Clair Hills", "Lakeshore"],
    heroIntro: "Two-storey rooflines in Laurelwood, mature trees in Beechwood and Uptown storefronts, all lit by an insured local crew.",
    metaTitle: "Christmas Light Installation Waterloo ON | Classic Christmas Lighting",
    metaDescription: "Christmas light installers serving Waterloo, Ontario. Commercial-grade LEDs, custom design, mid-season maintenance and January takedown. Free quote from Classic Christmas Lighting.",
    localFact: "Waterloo's tree-lined older neighbourhoods are some of our favourite work: big maples and spruces that look spectacular wrapped in warm white.",
  },
  cambridge: {
    neighbourhoods: ["Galt", "Preston", "Hespeler", "West Galt", "East Galt", "Blair", "Clemens Mill", "Fiddlesticks"],
    heroIntro: "From heritage stone homes in West Galt to newer subdivisions in Hespeler, we design displays that suit the house and the street.",
    metaTitle: "Christmas Light Installation Cambridge ON | Classic Christmas Lighting",
    metaDescription: "Professional Christmas lighting for homes and businesses in Cambridge, Ontario: Galt, Preston and Hespeler. Lights supplied, installed, maintained and removed. Free quote.",
    localFact: "Cambridge's limestone and brick homes glow beautifully with warm white C9 bulbs, which is the most-requested look in Galt and Preston.",
  },
  guelph: {
    neighbourhoods: ["Old University", "Exhibition Park", "Kortright Hills", "Westminster Woods", "The Ward", "Clairfields", "Downtown Guelph", "Pineridge"],
    heroIntro: "Century homes near Exhibition Park, family streets in Kortright Hills and downtown businesses along Wyndham Street, lit for the season.",
    metaTitle: "Christmas Light Installation Guelph ON | Classic Christmas Lighting",
    metaDescription: "Christmas light installation in Guelph, Ontario for homes and storefronts. Fully insured crew, commercial-grade LEDs, takedown and storage included. Free quote: (226) 476-2038.",
    localFact: "Guelph businesses were among our first commercial clients, and we still light storefronts and office entrances across the Royal City every November.",
  },
  hamilton: {
    neighbourhoods: ["Ancaster", "Dundas", "Stoney Creek", "Westdale", "Waterdown", "Hamilton Mountain", "Binbrook", "Flamborough"],
    heroIntro: "Professional Christmas lighting for Hamilton, Ancaster, Dundas and Stoney Creek, from escarpment estates to plazas on the Mountain.",
    metaTitle: "Christmas Light Installation Hamilton ON | Classic Christmas Lighting",
    metaDescription: "Christmas light installers serving Hamilton, Ancaster, Dundas and Stoney Creek. Custom rooflines, tree wraps and commercial displays, fully insured. Free quote today.",
    localFact: "Hamilton's larger estate lots in Ancaster and Flamborough often call for wrapped feature trees alongside the roofline, which our bucket lift makes straightforward.",
  },
  woodstock: {
    neighbourhoods: ["Downtown Woodstock", "Sally Creek", "North Woodstock", "Eastdale", "Oxford Heights", "Southside", "Ingersoll", "Tillsonburg"],
    heroIntro: "Oxford County homes and main-street businesses, lit by the same Kitchener crew with no travel charge.",
    metaTitle: "Christmas Light Installation Woodstock ON | Classic Christmas Lighting",
    metaDescription: "Professional Christmas light installation in Woodstock and Oxford County, Ontario. Lights supplied, installed, maintained and taken down. Family-owned, fully insured. Free quote.",
    localFact: "Woodstock's wide-lot bungalows and farmhouses along the county roads are ideal for full roofline outlines with lit trees at the driveway.",
  },
  stratford: {
    neighbourhoods: ["Downtown Stratford", "Avon Park", "Old Stratford", "Romeo", "Shakespeare", "Hamlet", "Devon", "St. Marys"],
    heroIntro: "Victorian homes near the Avon River and the shops of downtown Stratford, dressed in warm white for the festival town's holiday season.",
    metaTitle: "Christmas Light Installation Stratford ON | Classic Christmas Lighting",
    metaDescription: "Christmas light installation in Stratford, Ontario for heritage homes, B&Bs and downtown storefronts. Custom design, insured crew, takedown included. Free quote: (226) 476-2038.",
    localFact: "Stratford's heritage homes and bed-and-breakfasts suit a classic warm white look with garland and wreaths, and we install around your guests' schedule.",
  },
};

type AreaRow = { slug: string; city: string; region: string; description: string; population: string; nearbyAreas: string[] };

export const cities: City[] = (areas as AreaRow[]).map((a) => ({
  ...a,
  name: a.city,
  ...EXTRA[a.slug],
}));

export const getCityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
