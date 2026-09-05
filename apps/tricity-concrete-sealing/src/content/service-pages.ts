import { PICKS } from "@/lib/photos";
import type { FAQItem } from "@/lib/faqs";

export interface ServicePageContent {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  hero: string;
  heroAlt: string;
  metaTitle: string;
  metaDescription: string;
  formService: string;
  includedTitle: string;
  includedIntro?: string;
  included: { title: string; body: string }[];
  cardsTitle: string;
  cards: { icon: string; title: string; body: string }[];
  photos: string[];
  recommendedFinish: { slug: "matte" | "semi-gloss" | "gloss"; why: string };
  crossLink: { label: string; href: string; blurb: string };
  faqs: FAQItem[];
  ctaHeading: string;
  ctaSub?: string;
  serviceType: string;
  /** Short city-specific paragraph template; {city} is replaced. */
  cityBlurb: string;
}

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "driveway-sealing": {
    slug: "driveway-sealing",
    eyebrow: "Driveway sealing",
    h1: "Driveway sealing that stands up to salt, tires and Ontario winters.",
    intro: "Broom-finish, stamped, coloured or exposed aggregate. We pressure wash, prep and seal your driveway with a high-quality solvent-based sealer in the finish you choose, backed by a 5-year workmanship warranty.",
    hero: PICKS.heroDriveway,
    heroAlt: "Stamped concrete driveway cleaned and sealed in a gloss finish in front of a stone home in London, Ontario",
    metaTitle: "Concrete Driveway Sealing London ON | TriCity Concrete Sealing",
    metaDescription: "Professional driveway sealing in London, Woodstock, Brantford and SW Ontario. Solvent-based sealers in matte, semi-gloss or gloss stop salt, oil and freeze-thaw damage. 5-year warranty.",
    formService: "Driveway Sealing",
    includedTitle: "What a driveway seal includes",
    includedIntro: "Every driveway gets the full prep. A sealer is only as good as the surface under it.",
    included: [
      { title: "Pressure wash and clean", body: "Dirt, salt residue, tire marks and organic growth removed so the sealer bonds to bare concrete." },
      { title: "Stain treatment", body: "Oil and rust spots treated before sealing. We tell you honestly what will and won't lift." },
      { title: "Dry time and inspection", body: "The slab has to be fully dry. We check moisture and repair minor surface issues before we spray." },
      { title: "Sprayed and back-rolled", body: "High-quality solvent-based sealer applied by sprayer then back-rolled for even coverage with no lap marks." },
      { title: "Your choice of finish", body: "Matte for broom finish and aggregate, semi-gloss or gloss for stamped and coloured driveways." },
      { title: "Cure guidance", body: "Foot traffic the next day, vehicles after 48 to 72 hours. We leave clear instructions and a warranty certificate." },
    ],
    cardsTitle: "Why seal a driveway",
    cards: [
      { icon: "🧂", title: "Road salt resistance", body: "Salt brought home on tires is the top cause of surface scaling. A sealed driveway sheds brine instead of absorbing it." },
      { icon: "❄️", title: "Freeze-thaw protection", body: "Water that can't get in can't freeze and pop the surface." },
      { icon: "🛢️", title: "Oil and stain resistance", body: "Drips wipe off a sealed surface instead of soaking in." },
      { icon: "🏡", title: "Curb appeal", body: "Colour comes back and stays. Especially dramatic on stamped and coloured concrete." },
    ],
    photos: [PICKS.heroHome, PICKS.gloss, PICKS.colouredDriveway, PICKS.longDriveway],
    recommendedFinish: { slug: "semi-gloss", why: "Semi-gloss enhances stamped and coloured driveways while hiding tire dust better than gloss. Broom-finish driveways usually look best in matte." },
    crossLink: { label: "Is your driveway exposed aggregate?", href: "/services/exposed-aggregate-sealing", blurb: "Aggregate needs a slightly different approach to keep the stones locked in and looking wet." },
    faqs: [
      { q: "How long after sealing can I park on the driveway?", a: "Foot traffic the next day and vehicles after 48 to 72 hours, depending on temperature and humidity. We give you a specific window at the end of the job." },
      { q: "Will sealing stop my driveway from cracking?", a: "Sealing prevents surface scaling, spalling and salt damage. It does not stop structural cracks from soil movement, but it does keep water out of hairline cracks so they don't widen through freeze-thaw." },
      { q: "How often should a driveway be resealed?", a: "Every 2 to 4 years depending on traffic and salt exposure. Because we use solvent-based sealers, a reseal is a single fresh coat that bonds to the old one." },
      { q: "Can you seal a new driveway?", a: "Yes, once it has cured, typically 28 days after the pour. Sealing new concrete early is the best protection it will ever get." },
    ],
    ctaHeading: "Seal it before the salt trucks come back.",
    serviceType: "Concrete driveway sealing",
    cityBlurb: "Driveways in {city} see the same road salt and freeze-thaw cycle as the rest of Southwestern Ontario. TriCity pressure washes, preps and seals {city} driveways with solvent-based product in matte, semi-gloss or gloss, with no travel charge from our London shop.",
  },
  "patio-sealing": {
    slug: "patio-sealing",
    eyebrow: "Patio sealing",
    h1: "Patio sealing that brings the colour back and keeps it there.",
    intro: "Stamped, broom-finish or coloured patios cleaned, prepped and sealed with a solvent-based sealer that resists sun, rain, spilled wine and barbecue grease. Choose matte, semi-gloss or gloss.",
    hero: PICKS.heroPatio,
    heroAlt: "Brick-red stamped concrete patio restored with a gloss sealer behind a home in London, Ontario",
    metaTitle: "Concrete Patio Sealing London ON | TriCity Concrete Sealing",
    metaDescription: "Patio sealing in London, Woodstock, Brantford and SW Ontario. Stamped and coloured patios restored with solvent-based sealers in matte, semi-gloss or gloss. 5-year workmanship warranty.",
    formService: "Patio Sealing",
    includedTitle: "How we seal a patio",
    included: [
      { title: "Deep clean", body: "Pressure washing lifts algae, pollen, leaf stains and the grey film that builds up on unsealed concrete." },
      { title: "Furniture and planters moved", body: "We clear the surface, seal underneath and put everything back once it can take foot traffic." },
      { title: "Edges and steps masked", body: "Siding, stone borders and garden beds protected before we spray." },
      { title: "Solvent-based sealer, sprayed and rolled", body: "Even coverage with no lap marks, including the textured joints of stamped patterns." },
      { title: "Non-slip additive where it matters", body: "Standard on pool surrounds and steps, optional anywhere else." },
      { title: "Ready for the weekend", body: "Foot traffic the next day; furniture back after 48 hours." },
    ],
    cardsTitle: "Patio problems sealing solves",
    cards: [
      { icon: "☀️", title: "Faded colour", body: "UV bleaches integral and stained colour. A solvent-based sealer restores and locks it in." },
      { icon: "🍷", title: "Food and drink stains", body: "Sealed concrete wipes clean; unsealed concrete drinks the spill." },
      { icon: "🌿", title: "Algae and moss", body: "A sealed surface dries fast and gives growth nothing to grip." },
      { icon: "❄️", title: "Winter scaling", body: "Keeps meltwater out of the surface so it doesn't flake in spring." },
    ],
    photos: [PICKS.wideLondon, PICKS.patioBoulders, PICKS.patioBrick, PICKS.sunset],
    recommendedFinish: { slug: "gloss", why: "Gloss gives stamped patios the wet look most clients want. Semi-gloss is the choice if you prefer a softer satin sheen." },
    crossLink: { label: "Stamped patio? Read the full guide", href: "/services/stamped-concrete-sealing", blurb: "Stamped patterns need careful coverage in the grout lines. Here's how we handle them." },
    faqs: [
      { q: "Can you seal a patio that was sealed before?", a: "Yes. If the old coat was solvent-based, our sealer re-emulsifies it and the coats become one. If it was water-based or is peeling, we strip or prep it first and explain the extra step in the quote." },
      { q: "Will the sealer make my patio slippery?", a: "Gloss can be slick when wet on smooth stamped patterns. We add a non-slip additive on pool decks and steps and anywhere you ask for it, with no change to the look." },
      { q: "How soon can I use the patio?", a: "Walk on it the next day, put furniture back after 48 hours." },
      { q: "What time of year is best?", a: "Late spring through early fall, when the surface is dry and temperatures sit between roughly 10 and 30°C." },
    ],
    ctaHeading: "Get the patio ready for summer.",
    serviceType: "Concrete patio sealing",
    cityBlurb: "Backyard patios in {city} spend the summer in full sun and the winter under snow. TriCity restores stamped and coloured patios in {city} with a solvent-based sealer in the finish you choose, from a soft matte to a full wet-look gloss.",
  },
  "stamped-concrete-sealing": {
    slug: "stamped-concrete-sealing",
    eyebrow: "Stamped concrete sealing",
    h1: "Stamped concrete sealing: the colour and pattern, fully restored.",
    intro: "Stamped concrete is a colour investment. Our solvent-based sealers bring back the antiquing, the highlights and the depth of the pattern, then protect it from salt, sun and stains.",
    hero: PICKS.heroStamped,
    heroAlt: "Freshly sealed grey stamped concrete patio beside a cedar fence in London, Ontario, semi-gloss finish",
    metaTitle: "Stamped Concrete Sealing London ON | TriCity Concrete Sealing",
    metaDescription: "Stamped concrete sealing across London, Woodstock, Brantford and SW Ontario. Colour and pattern restored with high-quality solvent-based sealers in semi-gloss or gloss. 5-year warranty.",
    formService: "Stamped Concrete Sealing",
    includedTitle: "Why stamped concrete needs a specialist",
    includedIntro: "Stamped surfaces have deep grout lines, release-agent colour and often a previous sealer. Each one changes how we prep and apply.",
    included: [
      { title: "Release agent and old sealer assessed", body: "We check what is on the surface before quoting so there are no surprises on the day." },
      { title: "Cleaning that respects the colour", body: "Pressure washing at the right pressure and distance to clean the joints without blasting off antiquing colour." },
      { title: "Full coverage in the grout lines", body: "Sprayed then back-rolled so every joint and texture is sealed, not just the high spots." },
      { title: "Colour enhancement", body: "Solvent-based acrylic wets the surface and brings the two-tone colour back to life." },
      { title: "Semi-gloss or gloss", body: "The two finishes that show off stamped work best. Matte is available if you prefer it." },
      { title: "Non-slip additive", body: "Recommended on smooth patterns like slate and seamless texture." },
    ],
    cardsTitle: "Patterns we seal",
    cards: [
      { icon: "🪨", title: "Ashlar slate and flagstone", body: "Deep joints and multiple colours. Semi-gloss or gloss." },
      { icon: "🧱", title: "Cobblestone and brick", body: "Repeating patterns with tight joints." },
      { icon: "🪵", title: "Wood plank", body: "Long grain lines that pop under a satin sheen." },
      { icon: "🌊", title: "Seamless texture", body: "Smooth stone textures that need non-slip additive." },
    ],
    photos: [PICKS.ashlar, PICKS.wideLondon, PICKS.stampedSteps, PICKS.greySatin],
    recommendedFinish: { slug: "gloss", why: "Gloss gives stamped concrete the wet look and the deepest colour. Choose semi-gloss for a satin sheen that hides dust better." },
    crossLink: { label: "Compare the three finishes", href: "/finishes", blurb: "See matte, semi-gloss and gloss side by side and pick the sheen that suits your pattern." },
    faqs: [
      { q: "My stamped concrete has turned white and cloudy. Can you fix it?", a: "Usually. White haze is moisture trapped under an old sealer or a water-based product that failed. We can often re-emulsify a solvent-based coat to release the haze, or strip and reseal if needed." },
      { q: "Will the colour come back?", a: "In most cases, yes. Faded stamped concrete is often just dry and dirty. Once cleaned and sealed with a solvent-based product, the integral and release colours return." },
      { q: "How often should stamped concrete be sealed?", a: "Every 2 to 3 years for driveways and every 3 to 4 years for patios. Sealing on schedule is far cheaper than restoring badly faded colour." },
      { q: "Do you seal new stamped concrete?", a: "Yes. Once the pour has cured, typically 28 days, sealing new stamped concrete locks in the colour before the first winter." },
    ],
    ctaHeading: "Make your stamped concrete look new again.",
    serviceType: "Stamped concrete sealing",
    cityBlurb: "Stamped patios and driveways are everywhere in {city}'s newer neighbourhoods, and most were last sealed the day they were poured. TriCity restores the colour and pattern on {city} stamped concrete with a solvent-based sealer in semi-gloss or gloss.",
  },
  "walkway-sealing": {
    slug: "walkway-sealing",
    eyebrow: "Walkway sealing",
    h1: "Walkways and steps, sealed and safe.",
    intro: "Front walkways, side paths, porches and steps take more foot traffic and more salt than any other concrete on the property. We seal them with a solvent-based product and a non-slip additive where it matters.",
    hero: PICKS.heroWalkway,
    heroAlt: "Curved stamped concrete garden walkway with a semi-gloss sealer in Southwestern Ontario",
    metaTitle: "Concrete Walkway & Step Sealing London ON | TriCity",
    metaDescription: "Walkway, porch and step sealing across London, Woodstock, Brantford and SW Ontario. Solvent-based sealers with non-slip additive for safe, salt-resistant concrete. 5-year warranty.",
    formService: "Walkway Sealing",
    includedTitle: "What we seal",
    included: [
      { title: "Front walkways and entrances", body: "The first thing visitors see and the first thing salt hits every winter." },
      { title: "Porches and steps", body: "Sealed with a non-slip additive as standard for safe footing." },
      { title: "Side yard and garden paths", body: "Shaded paths that grow algae are transformed once sealed." },
      { title: "Pool decks and surrounds", body: "Matte or semi-gloss with non-slip additive, sealed before the season." },
      { title: "Garage pads and aprons", body: "Where salt drips off the car all winter." },
    ],
    cardsTitle: "Why walkways matter",
    cards: [
      { icon: "🧂", title: "Heaviest salt exposure", body: "Steps and walkways are salted by hand all winter. Sealing stops the scaling." },
      { icon: "👟", title: "Safety", body: "Non-slip additive gives sealed steps more grip than bare concrete." },
      { icon: "🌧️", title: "Shade and moisture", body: "Sealed paths dry fast and stop green growth." },
      { icon: "✨", title: "Curb appeal", body: "A clean, sealed entrance changes how the whole house reads from the street." },
    ],
    photos: [PICKS.frontWalkway, PICKS.stampedSteps, PICKS.sideWalkway, PICKS.ashlar],
    recommendedFinish: { slug: "matte", why: "Matte or semi-gloss with a non-slip additive keeps steps and walkways safe in the rain. Gloss is available for stamped entrances that don't ice up." },
    crossLink: { label: "Bundle with the driveway", href: "/services/driveway-sealing", blurb: "Most clients seal the walkway and driveway in the same visit. One prep, one clean-up, one warranty." },
    faqs: [
      { q: "Will sealed steps be slippery in winter?", a: "Not with a non-slip additive, which we include on steps and porches. It is a fine grit mixed into the sealer that gives more traction than bare concrete without changing the look." },
      { q: "Can you seal just the walkway?", a: "Yes, though most clients bundle the walkway with a driveway or patio to make the most of the site visit." },
      { q: "How long until we can use the front door?", a: "Foot traffic the next morning. We seal front entrances in the afternoon so it cures overnight." },
    ],
    ctaHeading: "Seal the walkway before the first salt of the season.",
    serviceType: "Concrete walkway sealing",
    cityBlurb: "Front walkways and steps in {city} get salted by hand all winter, which is why they scale before the driveway does. TriCity seals {city} walkways, porches and steps with a solvent-based sealer and a non-slip additive for safe footing.",
  },
  "exposed-aggregate-sealing": {
    slug: "exposed-aggregate-sealing",
    eyebrow: "Exposed aggregate sealing",
    h1: "Exposed aggregate sealing that keeps the stones in and the colour rich.",
    intro: "Exposed aggregate loses stones and goes grey when it is left unsealed. A solvent-based sealer locks the aggregate in place, deepens the natural stone colour and stops salt scaling around each pebble.",
    hero: PICKS.heroAggregate,
    heroAlt: "Exposed aggregate patio and steps sealed in a matte finish beside a brick home in Southwestern Ontario",
    metaTitle: "Exposed Aggregate Sealing London ON | TriCity Concrete Sealing",
    metaDescription: "Exposed aggregate sealing in London, Woodstock, Brantford and SW Ontario. Solvent-based sealers lock stones in, deepen colour and stop salt damage. Matte or semi-gloss. 5-year warranty.",
    formService: "Exposed Aggregate Sealing",
    includedTitle: "How aggregate is different",
    includedIntro: "Aggregate has more surface area and more places for water to sit than a flat slab. Prep and coverage matter more, not less.",
    included: [
      { title: "Cleaning between the stones", body: "Pressure washing lifts the dirt that collects around every pebble and dulls the colour." },
      { title: "Loose stone check", body: "We identify loose aggregate before sealing and tell you what can be locked in." },
      { title: "Heavier coverage", body: "Aggregate drinks more sealer than a flat surface. We apply accordingly so the finish is even." },
      { title: "Sprayed and back-rolled", body: "Rolling works the sealer down around each stone instead of leaving it on the tops." },
      { title: "Matte or semi-gloss", body: "Both deepen stone colour. Semi-gloss gives the wet-river-rock look; matte keeps it natural." },
    ],
    cardsTitle: "What sealing prevents",
    cards: [
      { icon: "🪨", title: "Stone loss", body: "Freeze-thaw pops loose stones out of unsealed aggregate every spring." },
      { icon: "🧂", title: "Salt scaling", body: "The cement paste between stones is the first thing salt attacks." },
      { icon: "🎨", title: "Greying", body: "Sun and dirt turn colourful aggregate a flat grey. Sealing brings the colour back." },
      { icon: "🌿", title: "Moss in the texture", body: "A sealed surface dries fast and gives nothing for growth to hold onto." },
    ],
    photos: [PICKS.aggregateClose, PICKS.aggregateDriveway, PICKS.heroAggregate, PICKS.broomDriveway],
    recommendedFinish: { slug: "matte", why: "Matte keeps exposed aggregate looking natural while deepening the stone colour. Semi-gloss gives the wet look some clients prefer." },
    crossLink: { label: "Broom-finish driveway too?", href: "/services/driveway-sealing", blurb: "Many aggregate patios sit next to a plain driveway. We seal both in one visit with the same warranty." },
    faqs: [
      { q: "Can sealing stop stones from coming loose?", a: "It locks in stones that are still bonded and stops the freeze-thaw cycle that loosens more. Stones already missing can't be replaced by sealing alone." },
      { q: "Which finish is best for exposed aggregate?", a: "Matte for a natural look, semi-gloss for a wet-stone look. Both use the same solvent-based product." },
      { q: "Does aggregate need more sealer?", a: "Yes, because of the extra surface area. We quote for the right coverage rather than stretching a coat too thin." },
    ],
    ctaHeading: "Lock in the stones before winter loosens them.",
    serviceType: "Exposed aggregate concrete sealing",
    cityBlurb: "Exposed aggregate driveways and patios are popular in {city}, and unsealed ones lose stones every spring. TriCity seals {city} aggregate with a solvent-based product that locks the stones in and deepens the natural colour, in matte or semi-gloss.",
  },
  "commercial-sealing": {
    slug: "commercial-sealing",
    eyebrow: "Commercial sealing",
    h1: "Commercial concrete sealing with the paperwork and scheduling you need.",
    intro: "Plazas, storefront walkways, condo common areas, restaurant patios and parking pads across Southwestern Ontario. Insured, scheduled around your hours and backed by a written warranty.",
    hero: PICKS.heroCommercial,
    heroAlt: "Broom finish concrete driveway and walkway at a two-storey building, sealed by TriCity Concrete Sealing",
    metaTitle: "Commercial Concrete Sealing SW Ontario | TriCity Concrete Sealing",
    metaDescription: "Commercial concrete sealing for plazas, walkways, condo common areas, patios and parking pads across London and SW Ontario. Insured, off-hours scheduling, solvent-based sealers, written warranty.",
    formService: "Commercial Sealing",
    includedTitle: "Properties we seal",
    included: [
      { title: "Retail plazas and storefronts", body: "Entrance walkways and aprons sealed overnight so you open on time." },
      { title: "Condo and apartment common areas", body: "Walkways, steps and patios with non-slip additive and certificates of insurance for the board." },
      { title: "Restaurant patios", body: "Stamped and broom-finish patios that shrug off grease and spills." },
      { title: "Office entrances and campuses", body: "Consistent finish across every building on the site." },
      { title: "Parking pads and loading areas", body: "Heavy-traffic concrete protected from salt, oil and hot tires." },
      { title: "Churches, schools and municipal", body: "Scheduled around your calendar with clear cure windows." },
    ],
    cardsTitle: "Why property managers book TriCity",
    cards: [
      { icon: "📋", title: "Insurance certificates", body: "Provided before we arrive, every time." },
      { icon: "🕐", title: "Off-hours work", body: "Nights and weekends so tenants and customers are never blocked." },
      { icon: "📆", title: "Maintenance schedules", body: "Multi-year reseal plans with one contact and predictable budgets." },
      { icon: "🛡️", title: "Written warranty", body: "Five-year workmanship coverage on every commercial job." },
    ],
    photos: [PICKS.heroCommercial, PICKS.frontWalkway, PICKS.longDriveway, PICKS.curvedDriveway],
    recommendedFinish: { slug: "matte", why: "Matte or semi-gloss with a non-slip additive is standard for commercial walkways. Gloss is available for feature entrances." },
    crossLink: { label: "Read the commercial guide", href: "/resources/commercial-concrete-sealing-for-plazas-walkways-and-parking-areas", blurb: "Planning, scheduling and budgeting for multi-property sealing programs." },
    faqs: [
      { q: "Can you work overnight or on weekends?", a: "Yes. Most commercial sealing is done outside business hours so entrances are dry and open by morning." },
      { q: "Do you provide certificates of insurance?", a: "Yes, on request before the job starts, for property managers, condo boards and landlords." },
      { q: "Can you quote multiple properties?", a: "Yes. We run multi-site programs with one contact, consistent product and a shared reseal schedule." },
      { q: "How is commercial work priced?", a: "By the square foot after a site visit, with prep, product and any non-slip additive itemized in the quote." },
    ],
    ctaHeading: "Put your concrete on a maintenance schedule.",
    ctaSub: "Commercial spots fill in spring and fall. Book a site assessment now.",
    serviceType: "Commercial concrete sealing",
    cityBlurb: "TriCity seals commercial concrete across {city}: plaza walkways, condo common areas, restaurant patios and parking pads, scheduled off-hours and covered by certificates of insurance and a written 5-year warranty.",
  },
};
