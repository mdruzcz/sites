export const site = {
  name: "Hot Tub Pads",
  shortName: "HotTubPads",
  tagline: "Expert Installation of Long-Lasting Concrete Pads for Your Spa",
  email: "sales@hottubpads.ca",
  emailHref: "mailto:sales@hottubpads.ca",
  address: {
    street: "775 Osgoode Drive, Unit 12",
    city: "London",
    region: "ON",
    country: "CA",
  },
  addressLine: "775 Osgoode Drive, Unit 12, London, ON",
  hours: "Mon – Fri · 8 AM – 6 PM",
  hoursSaturday: "Saturday · 9 AM – 3 PM",
  hoursWeekend: "Sunday: Closed",
  serviceAreas: ["London", "Hamilton", "Kitchener", "Woodstock", "Sarnia", "St. Thomas"],
  url: "https://hottubpads.ca",
  trustBadges: [
    { label: "2 Year Warranty", value: "Built to Last" },
    { label: "32 MPA Concrete", value: "Quality Materials" },
    { label: "2 Day Completion", value: "Fast & Reliable" },
  ],
  responseTime: "24 hours",
} as const;

/* ─── Services ─── */

export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "custom-concrete-pads",
    name: "Custom Concrete Pads",
    shortDesc: "A Strong and Stable Foundation for Your Outdoor Space",
    description:
      "We install custom concrete pads for a variety of uses, offering a perfectly level and durable surface. Every pad is poured with high-strength concrete, ensuring durability in Ontario's climate with a smooth or broom finish.",
    image: "/images/concrete-pad-wide.webp",
    imageAlt: "Custom concrete hot tub pad installation in Ontario by Hot Tub Pads",
    benefits: [
      "Non-slip, sturdy foundation for your hot tub or swim spa",
      "Weather-resistant — withstands Ontario's freeze-thaw cycles",
      "Smooth or broom finish options for your preference",
      "Reinforced with rebar or wire mesh for lasting strength",
      "Custom-sized to fit any hot tub, swim spa, or outdoor structure",
    ],
    process: [
      "Site assessment — evaluate terrain, drainage, and pad dimensions",
      "Excavation — remove topsoil and soft ground to proper depth",
      "Gravel base — lay and compact crushed gravel for stability",
      "Formwork — build precise wooden forms for the pad outline",
      "Concrete pour — 4-6 inches of 32 MPA reinforced concrete",
      "Finishing — broom finish for slip resistance, then cure for 24-48 hours",
    ],
    faqs: [
      {
        q: "How thick should a concrete hot tub pad be?",
        a: "We recommend 4-6 inches of reinforced concrete for most hot tubs. Larger swim spas may require additional thickness and reinforcement to support the extra weight.",
      },
      {
        q: "How long does the concrete need to cure before I can place my hot tub?",
        a: "Concrete needs 24-48 hours before placing your hot tub. Full strength is reached in about 28 days, but it's safe for a hot tub after the initial cure period.",
      },
      {
        q: "Can you install a concrete pad on a slope?",
        a: "Yes — we excavate and level the ground before pouring. We can also add retaining edges or steps if the slope is significant.",
      },
    ],
    metaTitle: "Custom Concrete Pads | Hot Tub Pads Ontario",
    metaDescription:
      "Professional custom concrete pad installation for hot tubs, swim spas, gazebos, and outdoor kitchens across Ontario. 32 MPA reinforced concrete. Free quote.",
  },
  {
    slug: "swim-spa-pads",
    name: "Swim Spa Pads",
    shortDesc: "Built to Handle Extra Weight and Water Movement",
    description:
      "Swim spas are larger and heavier than standard hot tubs, requiring a strong and level base to prevent shifting or cracking. Our reinforced concrete swim spa pads are designed to support the extra weight while including proper drainage and conduit for electrical.",
    image: "/images/hot-tub-pad-hero.jpg",
    imageAlt: "Reinforced concrete swim spa pad installation by Hot Tub Pads in Ontario",
    benefits: [
      "Supports the heavier weight of swim spas and resistance pools",
      "Prevents sinking, cracking, or shifting over time",
      "Includes proper drainage and leveling",
      "Conduit included for clean electrical hookups",
      "Flawless broom-finish surface for safety",
    ],
    process: [
      "Measure swim spa dimensions and weight requirements",
      "Excavate area with extra clearance for drainage",
      "Install compacted gravel base with proper grade",
      "Run electrical conduit before the pour",
      "Pour extra-thick reinforced concrete with wire mesh",
      "Broom finish and cure — ready for your swim spa in 48 hours",
    ],
    faqs: [
      {
        q: "How much does a swim spa pad cost?",
        a: "Pricing depends on the size and site conditions. Contact us with your swim spa dimensions and a photo of the location for a free, no-obligation quote.",
      },
      {
        q: "Do you run electrical conduit in the pad?",
        a: "Yes — we include conduit so your electrician can run wiring cleanly through the pad rather than across your yard. Most swim spas require a dedicated 220V GFCI circuit.",
      },
    ],
    metaTitle: "Swim Spa Pads | Reinforced Concrete Installation | Hot Tub Pads",
    metaDescription:
      "Heavy-duty reinforced concrete swim spa pads built for extra weight and water movement. Includes conduit and drainage. Serving Ontario. Free quote.",
  },
  {
    slug: "gravel-hot-tub-pads",
    name: "Gravel Hot Tub Pads",
    shortDesc: "A Budget-Friendly Alternative to Concrete",
    description:
      "Gravel pads offer a cost-effective, well-draining base for hot tubs, small structures, and garden sheds. Our gravel pad installation includes full excavation, weed barrier, and compacted crushed gravel for a stable foundation.",
    image: "/images/hot-tub-pad-1.jpg",
    imageAlt: "Gravel hot tub pad installation with weed barrier in Ontario",
    benefits: [
      "More affordable than concrete for budget-conscious homeowners",
      "Excellent natural drainage — no water pooling",
      "Can be relocated or adjusted if needed",
      "Includes weed barrier to prevent growth",
      "Professional compaction for a level, stable surface",
    ],
    process: [
      "Site assessment and pad layout marking",
      "Excavation to proper depth (typically 6-8 inches)",
      "Install landscape weed barrier fabric",
      "Fill with high-quality ¾-inch crushed gravel",
      "Compact and level for a flat, stable surface",
    ],
    faqs: [
      {
        q: "Is a gravel pad strong enough for a hot tub?",
        a: "Yes, when properly compacted. Gravel pads work well for standard hot tubs. For larger swim spas or permanent installations, we recommend concrete for maximum stability.",
      },
      {
        q: "How long does a gravel pad last?",
        a: "A properly installed gravel pad can last many years but may require occasional re-leveling. Concrete pads are the more permanent option if longevity is your priority.",
      },
    ],
    metaTitle: "Gravel Hot Tub Pads | Affordable Installation | Hot Tub Pads",
    metaDescription:
      "Budget-friendly gravel hot tub pad installation with weed barrier and professional compaction. Great drainage, easy to install. Serving Ontario. Free quote.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/* ─── Cities ─── */

export type City = {
  slug: string;
  name: string;
  region: string;
  description: string;
  neighbourhoods: string[];
  heroIntro: string;
  metaTitle: string;
  metaDescription: string;
  /** City-specific climate / soil / local SEO content (~150–250 words) */
  localContext: string;
  /** Reasons local conditions make a quality pad important */
  whyLocal: string;
  /** Quick reference facts about the area's build conditions */
  localFacts: { label: string; value: string }[];
  /** City-specific FAQs (3–5 entries) */
  cityFaqs: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: "hot-tub-pad-installation-in-london",
    name: "London",
    region: "ON",
    description:
      "At HotTubPads, we specialize in providing top-quality hot tub pad installation services throughout London, Ontario. Our experienced team ensures your hot tub has a stable and durable foundation, enhancing both safety and longevity.",
    neighbourhoods: ["Byron", "Old North", "Old South", "Westmount", "Hyde Park", "Masonville"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Hot Tub Pad Installation London ON",
    metaDescription:
      "Professional hot tub pad installation in London, Ontario. Durable, level concrete and gravel hot tub bases built for Forest City freeze-thaw cycles. Free quote.",
    localContext:
      "London sits on heavy clay loam soils across most of the city, with a frost line that reaches roughly four feet (about 1.2 metres) below grade in a typical winter. That combination — dense clay that holds water, plus deep ground frost — is exactly the environment that destroys an under-built pad. Clay expands when it absorbs spring rain and contracts as it dries through summer, while freeze-thaw cycles lift anything sitting too shallow. We build every London hot tub pad with that local reality in mind: a fully excavated subgrade, a generous compacted ¾-inch crushed-stone base for drainage, and a properly reinforced concrete slab thick enough to ride out the seasonal movement underneath. Whether your project is in Old North, Old South, Byron, Hyde Park or Westmount, the same disciplined approach applies — and it is the reason our London pads stay flat, level and crack-free year after year.",
    whyLocal:
      "London's freeze-thaw weather is some of the harshest in southwestern Ontario. Without proper depth, base prep and reinforcement, a backyard slab will heave, hairline-crack and pull away from the hot tub skirt within a few seasons. A correctly engineered pad transfers the weight of your filled spa evenly, drains meltwater away from the cabinet, and protects your equipment from the moisture damage that clay soils love to cause.",
    localFacts: [
      { label: "Typical frost line", value: "~4 ft (1.2 m)" },
      { label: "Predominant soil", value: "Clay loam" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Base", value: "6 in. compacted ¾\" crushed stone" },
    ],
    cityFaqs: [
      {
        q: "Do I need a building permit for a hot tub pad in London, Ontario?",
        a: "A hot tub pad on its own is typically considered a flatwork installation and does not require a building permit from the City of London, but the hot tub's electrical hookup must be installed by a licensed electrician and inspected by the ESA. We always recommend confirming setback and zoning requirements with the City of London before scheduling the pour.",
      },
      {
        q: "How deep do you excavate hot tub pads in London?",
        a: "Because London's frost line sits around four feet, we excavate at least 8–10 inches of topsoil and organic material, then build up a compacted crushed-stone base. The slab itself is 4–6 inches thick. That combination keeps the pad above the worst of the seasonal movement without requiring a full frost-depth footing.",
      },
      {
        q: "Will a concrete hot tub pad crack in London winters?",
        a: "A pad that is properly reinforced with rebar or wire mesh, poured at 32 MPA strength, and built on a compacted gravel base should not develop structural cracks. Hairline surface checks are normal in any exterior slab. We use control joints and a broom finish to manage that and keep the surface safe underfoot.",
      },
      {
        q: "Which London neighbourhoods do you serve?",
        a: "We install hot tub pads anywhere in the Forest City, including Old North, Old South, Byron, Hyde Park, Westmount, Masonville and the surrounding rural areas of Middlesex County. Same crew, same materials, same finish — your address doesn't change how we build.",
      },
    ],
  },
  {
    slug: "hot-tub-pad-installation-in-hamilton",
    name: "Hamilton",
    region: "ON",
    description:
      "At HotTubPads, we provide professional and durable hot tub pad installation services in Hamilton, Ontario and surrounding areas. A solid foundation is essential for the longevity and safety of your hot tub, and our expert team ensures a level, sturdy, and long-lasting base for your investment.",
    neighbourhoods: ["Dundas", "Ancaster", "Stoney Creek", "Westdale", "Waterdown", "Winona"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Hamilton Hot Tub Pad Installation",
    metaDescription:
      "Expert hot tub pad installation in Hamilton, Ontario. Level, drainage-graded concrete and gravel bases built for escarpment-area yards. Free quote.",
    localContext:
      "Hamilton is one of the more demanding hot tub pad markets in the province because no two lots look the same. The Niagara Escarpment cuts the city in half, so within a few kilometres you can move from flat, sandy stretches near the Bay to steep, terraced lots above and below the Mountain. Above-grade yards in Ancaster, Dundas and Stoney Creek tend to have aggressive natural drainage that pushes water across the pad area; lower-city lots and parts of Westdale sit on heavier soils that hold moisture. Add a frost line of about four feet and Ontario's full freeze-thaw schedule and you get a build that has to be thought through site-by-site. We grade every Hamilton pad with a deliberate slope away from the home, run a deep compacted crushed-stone base, and reinforce the slab to handle the small amount of seasonal movement that escarpment soils always produce.",
    whyLocal:
      "Hamilton's elevation changes make drainage the single most important detail on a hot tub pad install. A flat, un-graded slab in Ancaster or Stoney Creek will collect runoff against the cabinet and rot the equipment bay; a pad poured on uncompacted fill on the lower city will settle within a season. Doing it right the first time — sub-base, grade, reinforcement and finish — keeps your spa stable for the long haul.",
    localFacts: [
      { label: "Typical frost line", value: "~4 ft (1.2 m)" },
      { label: "Site challenge", value: "Escarpment elevation, mixed soils" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Drainage", value: "Graded slope away from house" },
    ],
    cityFaqs: [
      {
        q: "Can you install a hot tub pad on a sloped Ancaster or Dundas lot?",
        a: "Yes. Sloped lots are common around the escarpment and we build for them every week. We excavate to level the pad area, terrace the surrounding grade if needed, and use slightly heavier reinforcement and a drainage channel on the uphill side so meltwater doesn't pool behind the spa.",
      },
      {
        q: "Do I need a permit for a hot tub pad in Hamilton?",
        a: "The City of Hamilton generally does not require a building permit for a ground-level concrete pad, but the hot tub itself, its electrical hookup and any deck or enclosure may. We always recommend a quick call to Hamilton Building Services to confirm setbacks and electrical requirements before we book the pour.",
      },
      {
        q: "How does Hamilton's weather affect the pad design?",
        a: "Hamilton sees the full Ontario freeze-thaw cycle plus heavy lake-effect snow loads close to the Bay. We pour at 32 MPA, reinforce with rebar or mesh, and use a generous compacted gravel base under every pad so the slab can ride out the seasonal ground movement without cracking.",
      },
      {
        q: "Which Hamilton-area neighbourhoods do you serve?",
        a: "Anywhere in the City of Hamilton and surrounding municipalities — Dundas, Ancaster, Stoney Creek, Westdale, Waterdown, Winona and into Burlington, Grimsby and the Niagara fringe. Same crew, same materials, same quote process.",
      },
    ],
  },
  {
    slug: "hot-tub-pad-installation-in-kitchener",
    name: "Kitchener",
    region: "ON",
    description:
      "At HotTubPads, we specialize in providing high-quality, durable hot tub pad installations in Kitchener, Ontario, ensuring a strong and stable foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our expert team delivers top-notch solutions tailored to your needs.",
    neighbourhoods: ["Doon", "Forest Heights", "Pioneer Park", "Waterloo", "Cambridge", "St. Jacobs"],
    heroIntro:
      "Give your hot tub the stability it needs with a well-built, weather-resistant, and level pad. We specialize in durable concrete and gravel pads designed to support your spa for years.",
    metaTitle: "Kitchener Hot Tub Pad Installation",
    metaDescription:
      "Hot tub pad installation in Kitchener, Ontario. Level, code-conscious concrete and gravel pads built for Waterloo Region freeze-thaw. Free local quote.",
    localContext:
      "Kitchener-Waterloo sits on a mix of sandy and gravelly tills in many established neighbourhoods, with pockets of heavier clay closer to the rivers. That underlying drainage profile is generally friendly to a hot tub pad — water moves through sandy subgrade quickly rather than pooling — but it also means the sub-base under the pad has to be properly compacted or the slab can settle over the first couple of winters. The frost line here is about four feet, so excavation depth and reinforcement matter as much as they do anywhere else in southwestern Ontario. We build every Kitchener pad on a thoroughly compacted ¾-inch crushed-stone base, use 32 MPA reinforced concrete, and tune the grade to push runoff away from the home. The result is a flat, level surface that stays put through the Region's long winter season, whether you're in Doon, Forest Heights, Pioneer Park or anywhere across Waterloo and Cambridge.",
    whyLocal:
      "Sandy ground in Waterloo Region drains well, but it also moves if it isn't compacted. A pad built straight onto loose subgrade will dip at the corners as the spa loads it up. We compact the base in lifts and engineer the slab so the weight of a full hot tub — usually 4,000 to 5,000 pounds when you add water and people — is distributed evenly across the entire footprint.",
    localFacts: [
      { label: "Typical frost line", value: "~4 ft (1.2 m)" },
      { label: "Common soils", value: "Sandy / gravelly till with clay pockets" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Sub-base", value: "Compacted in 4-in. lifts" },
    ],
    cityFaqs: [
      {
        q: "How long does a Kitchener hot tub pad installation take?",
        a: "Most Kitchener installs are finished in two working days — one day for excavation, base prep, formwork and the pour; one day for finishing and initial cure. Your spa can usually be placed 24 to 48 hours after the pour depending on weather.",
      },
      {
        q: "Do I need a permit for a hot tub pad in Kitchener?",
        a: "The City of Kitchener generally does not require a building permit for a ground-level concrete pad on its own. Hot tub electrical work does require an ESA inspection, and any associated structures (decks, enclosures, gazebos) may need permits. Confirm with City of Kitchener planning before booking.",
      },
      {
        q: "Do you serve Waterloo and Cambridge too?",
        a: "Yes. We install hot tub pads across all of Waterloo Region — Kitchener, Waterloo, Cambridge — and into Elmira, St. Jacobs and Conestogo. Travel within the Region is included in the quote, no extra charge.",
      },
      {
        q: "Which is better in Kitchener: concrete or gravel pad?",
        a: "For a permanent installation we recommend a 4–6 inch reinforced concrete pad — it handles Waterloo Region winters indefinitely. Gravel is a fair option for lighter, temporary, or seasonal hot tubs, especially in sandy areas of the city that drain well already.",
      },
    ],
  },
  {
    slug: "hot-tub-pad-installation-in-woodstock-on",
    name: "Woodstock",
    region: "ON",
    description:
      "At HotTubPads, we provide expert hot tub pad installation services in Woodstock, Ontario, ensuring a stable, durable, and level foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our team delivers professional, high-quality solutions customized to your space.",
    neighbourhoods: ["Old North", "Sally Creek", "Ingersoll", "Tavistock", "Norwich", "Tillsonburg"],
    heroIntro:
      "Give your hot tub the stability it needs with a well-built, weather-resistant, and level pad. We specialize in durable concrete and gravel pads designed to support your spa for years.",
    metaTitle: "Hot Tub Pad Installation Woodstock ON",
    metaDescription:
      "Hot tub pad installation in Woodstock, Ontario. Reinforced concrete and gravel pads built for Oxford County clay soils and freeze-thaw. Free quote.",
    localContext:
      "Woodstock sits in the middle of Oxford County's agricultural belt, and the soils that make the area great for farming — heavy, water-retentive clay — are the same soils that make hot tub pads challenging if they aren't built properly. Clay swells when wet and shrinks as it dries, and over a typical winter that movement is amplified by a roughly four-foot frost line. A pad poured straight onto undisturbed Woodstock clay will lift in spring and settle unevenly through summer. Our solution is the same one we use across Oxford County: excavate well below the topsoil, install a deep compacted ¾-inch crushed-stone sub-base to break the capillary link with the clay below, and pour a properly reinforced 32 MPA slab on top. Whether your project is in Old North, Sally Creek, Ingersoll, Tavistock or out toward Tillsonburg, the build holds up.",
    whyLocal:
      "Oxford County's clay is the single biggest reason DIY hot tub pads fail here. The soil moves so much through the year that an under-built slab will crack, tip and pull water against the spa cabinet within a few seasons. A correctly engineered pad isolates the concrete from the clay with stone, distributes spa weight evenly, and stays flat for decades.",
    localFacts: [
      { label: "Typical frost line", value: "~4 ft (1.2 m)" },
      { label: "Predominant soil", value: "Heavy agricultural clay" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Sub-base", value: "8 in. compacted ¾\" crushed stone" },
    ],
    cityFaqs: [
      {
        q: "Will Woodstock's clay soil cause the pad to crack?",
        a: "Not if it's built correctly. We excavate past the active soil zone, install a thick compacted gravel base so the concrete isn't sitting directly on clay, and reinforce the slab with rebar or wire mesh. Done that way, the pad rides above the seasonal clay movement without structural cracking.",
      },
      {
        q: "Do I need a permit for a hot tub pad in Woodstock?",
        a: "The City of Woodstock generally does not require a building permit for a stand-alone, ground-level concrete pad, but the hot tub's electrical hookup requires a licensed electrician and ESA inspection. Confirm setbacks with City Hall before scheduling.",
      },
      {
        q: "How thick should a hot tub pad be in Woodstock?",
        a: "For a standard hot tub, 4 inches of 32 MPA reinforced concrete is typical. For a swim spa or any large multi-person unit, we go to 5–6 inches with heavier reinforcement to handle the additional load on clay subgrade.",
      },
      {
        q: "Do you also serve Ingersoll, Tillsonburg and Tavistock?",
        a: "Yes. We cover all of Oxford County, including Ingersoll, Tillsonburg, Tavistock, Norwich and the surrounding rural townships. The travel charge is built into the quote so there are no surprises.",
      },
    ],
  },
  {
    slug: "hot-tub-pad-installation-in-sarnia",
    name: "Sarnia",
    region: "ON",
    description:
      "At HotTubPads, we specialize in professional hot tub pad installations in Sarnia, Ontario, ensuring a stable, durable, and level foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our experienced team provides high-quality solutions tailored to your space.",
    neighbourhoods: ["Bright's Grove", "Point Edward", "Corunna", "Petrolia", "Mooretown", "Watford"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Sarnia Hot Tub Pad Installation",
    metaDescription:
      "Hot tub pad installation in Sarnia, Ontario. Drainage-graded concrete and gravel pads built for lake-effect winters and sandy soils. Free quote.",
    localContext:
      "Sarnia's climate is a little gentler than inland southwestern Ontario thanks to Lake Huron, but it has its own quirks. Winters are milder and shorter near the shore, yet lake-effect snow can dump heavy, wet snow loads on backyard structures in a single storm. The soils close to the lake — through Bright's Grove and Point Edward — are noticeably sandier than the heavier ground you find further inland around Petrolia and Watford. Sandy subgrade drains beautifully, which is good for a hot tub pad, but it also means the base under the slab has to be properly compacted in lifts so the pad doesn't settle as the spa loads it up. We build every Sarnia pad with a deeply compacted ¾-inch crushed-stone base, 32 MPA reinforced concrete, and a controlled slope to push any lake-effect snowmelt away from the cabinet. The result is a pad that looks great in summer and holds its shape through the next round of winter storms.",
    whyLocal:
      "Heavy, wet lake-effect snow is the seasonal stress that most homeowners don't plan for. A thin or under-reinforced slab will crack when it carries 18 inches of dense snow and a fully filled spa at the same time. A properly engineered pad — base, thickness, reinforcement and finish — handles those loads without complaint and keeps the hot tub level for the long term.",
    localFacts: [
      { label: "Climate", value: "Lake-effect winters from Lake Huron" },
      { label: "Common soils", value: "Sandy near shore, heavier inland" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Drainage", value: "Graded slope, away-from-house pitch" },
    ],
    cityFaqs: [
      {
        q: "Will lake-effect snow damage my hot tub pad?",
        a: "Not a properly built one. We reinforce every Sarnia pad with rebar or wire mesh and pour at full 32 MPA strength, which handles wet snow loads plus a filled spa without flexing or cracking. The bigger risk is the meltwater, which is why we always pitch the pad to drain.",
      },
      {
        q: "Are sandy Sarnia soils a problem for a concrete pad?",
        a: "They're actually a benefit for drainage, but sandy ground will move if it isn't compacted properly under the slab. We compact the sub-base in lifts and add a thick crushed-stone layer so the pad sits on an engineered surface rather than loose sand.",
      },
      {
        q: "Do you serve Bright's Grove and Point Edward?",
        a: "Yes. We install hot tub pads throughout Sarnia and the surrounding Lambton County communities including Bright's Grove, Point Edward, Corunna, Mooretown, Petrolia and Watford.",
      },
      {
        q: "Do I need a permit for a hot tub pad in Sarnia?",
        a: "The City of Sarnia generally doesn't require a building permit for a ground-level concrete pad on its own, but the hot tub itself and its electrical connection do require an ESA inspection. We recommend a quick call to Sarnia Building Services to confirm setbacks before the pour.",
      },
    ],
  },
  {
    slug: "hot-tub-pad-installation-in-st-thomas",
    name: "St. Thomas",
    region: "ON",
    description:
      "At HotTubPads, we provide professional and reliable hot tub pad installations in St. Thomas, Ontario, ensuring a strong, level, and long-lasting foundation for your hot tub. Whether you prefer a concrete, gravel, or composite base, our expert team delivers high-quality solutions tailored to your needs.",
    neighbourhoods: ["Old St. Thomas", "Lake Margaret", "Port Stanley", "Fingal", "Union", "Dorchester"],
    heroIntro:
      "Ensure your hot tub has a solid, level, and durable foundation with a professionally installed pad. We offer expertly crafted concrete and gravel hot tub pads that are built to last, providing reliable support for your spa in any weather.",
    metaTitle: "St. Thomas Hot Tub Pad Installation",
    metaDescription:
      "Hot tub pad installation in St. Thomas, Ontario. Reinforced concrete and gravel pads built for Elgin County clay loam and Lake Erie weather. Free quote.",
    localContext:
      "St. Thomas sits on the clay-loam plain that runs from Elgin County down to the Lake Erie shore, and the build conditions reflect that. The soil is heavy enough to hold water through spring and shrink through dry summers, and the frost line is roughly four feet — the same as London just north of here. The plus side is that Lake Erie does soften the weather a little compared with truly inland sites, so winter swings are slightly less extreme. We treat every St. Thomas pad the same way we do a Forest City build: full excavation to remove the active soil layer, a compacted ¾-inch crushed-stone sub-base for drainage and frost relief, and a 32 MPA reinforced slab on top. Lots in Old St. Thomas, the Lake Margaret area, Port Stanley, Fingal and Union all see the same approach. The result is a flat, level pad that handles the freeze-thaw cycle without crack patterns or settlement issues.",
    whyLocal:
      "Clay loam plus Erie shoreline weather is a tough combination for an under-built pad. The clay holds moisture, the lake drives wind and rain across the yard, and even the milder winters still hit the frost line. A properly engineered base and a reinforced slab are the difference between a pad that lasts decades and one that needs replacing in five years.",
    localFacts: [
      { label: "Typical frost line", value: "~4 ft (1.2 m)" },
      { label: "Predominant soil", value: "Clay loam (Elgin County plain)" },
      { label: "Recommended slab", value: "4–6 in. of 32 MPA reinforced concrete" },
      { label: "Nearby coastline", value: "Lake Erie / Port Stanley" },
    ],
    cityFaqs: [
      {
        q: "Do you install hot tub pads in Port Stanley and along the Lake Erie shore?",
        a: "Yes. Port Stanley, Fingal, Union and Lake Margaret are all in our regular service area. Lakeside lots sometimes need a slightly heavier drainage detail because of wind-driven rain, but the build approach is otherwise the same as anywhere in St. Thomas.",
      },
      {
        q: "How long will a properly built hot tub pad last in St. Thomas?",
        a: "A 4–6 inch reinforced 32 MPA pad on a compacted gravel base will last decades in St. Thomas conditions. The structural slab outlives the hot tub on top of it.",
      },
      {
        q: "Do I need a permit for a hot tub pad in St. Thomas?",
        a: "The City of St. Thomas typically does not require a building permit for a ground-level concrete pad on its own, but the hot tub electrical hookup must be installed by a licensed electrician and inspected by the ESA. Confirm setbacks with City Hall before scheduling.",
      },
      {
        q: "Can you handle Port Stanley's slope and lake-influenced soils?",
        a: "Yes. Sloped lakeside lots are part of normal service for us — we excavate to level the pad area, terrace the grade if needed, and add a drainage channel uphill of the pad to handle wind-driven runoff from Lake Erie.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/* ─── Blog Posts ─── */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hot-tub-pad-installation-mistakes",
    title: "Avoid These 5 Common Mistakes When Installing a Hot Tub Pad",
    excerpt:
      "Installing a hot tub is a big investment, and the foundation you place it on is just as important as the hot tub itself. Learn how to avoid costly repairs.",
    image: "/images/concrete-pad.webp",
    imageAlt: "Common mistakes to avoid when installing a concrete hot tub pad",
    metaTitle: "5 Hot Tub Pad Installation Mistakes to Avoid",
    metaDescription:
      "Avoid these 5 costly mistakes when installing a hot tub pad. Expert tips on excavation, leveling, concrete thickness, drainage, and electrical planning.",
  },
  {
    slug: "concrete-vs-gravel-hot-tub-pads",
    title: "Concrete vs. Gravel: Which Hot Tub Pad is Right for You?",
    excerpt:
      "The two most common options for a hot tub pad are concrete and gravel — but which one is right for you? Compare durability, cost, and maintenance.",
    image: "/images/blog-thumb.jpg",
    imageAlt: "Comparison between concrete and gravel hot tub pads",
    metaTitle: "Concrete vs. Gravel Hot Tub Pads",
    metaDescription:
      "Concrete vs. gravel hot tub pads — compare cost, durability, drainage, and installation time. Find the best foundation for your spa. Expert guide from HotTubPads.ca.",
  },
  {
    slug: "hot-tub-pad-installation-checklist",
    title: "How to Prepare for a Hot Tub Pad Installation: A Homeowner's Checklist",
    excerpt:
      "Everything you need to do before your contractor arrives. From choosing the right pad type to planning for electrical, this checklist covers it all.",
    image: "/images/hot-tub-pad-1.jpg",
    imageAlt: "Homeowner preparing backyard for hot tub pad installation",
    metaTitle: "Hot Tub Pad Installation Checklist",
    metaDescription:
      "Prepare for your hot tub pad installation with this step-by-step homeowner's checklist. Site prep, electrical planning, pad type selection, and more.",
  },
];
