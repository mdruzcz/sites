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
};

export const cities: City[] = [
  {
    slug: "hot-tub-pad-installation-in-london",
    name: "London",
    region: "ON",
    description:
      "At HotTubPads, we specialize in providing top-quality hot tub pad installation services throughout London, Ontario. Our experienced team ensures your hot tub has a stable and durable foundation, enhancing both safety and longevity.",
    neighbourhoods: ["Byron", "Masonville", "Westmount", "Old North", "Hyde Park"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Hot Tub Pad Installation in London, Ontario | Durable & Affordable",
    metaDescription:
      "Professional hot tub pad installation in London, Ontario. Durable, level, and long-lasting concrete and gravel hot tub bases. Get a free quote from HotTubPads.ca today.",
  },
  {
    slug: "hot-tub-pad-installation-in-hamilton",
    name: "Hamilton",
    region: "ON",
    description:
      "At HotTubPads, we provide professional and durable hot tub pad installation services in Hamilton, Ontario and surrounding areas. A solid foundation is essential for the longevity and safety of your hot tub, and our expert team ensures a level, sturdy, and long-lasting base for your investment.",
    neighbourhoods: ["Burlington", "Ancaster", "Dundas", "Waterdown", "Winona"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Hot Tub Pad Installation in Hamilton | Professional & Durable",
    metaDescription:
      "Expert hot tub pad installation in Hamilton, Ontario. Stable, level foundation for your spa. Concrete and gravel options. Free quotes from HotTubPads.ca.",
  },
  {
    slug: "hot-tub-pad-installation-in-kitchener",
    name: "Kitchener",
    region: "ON",
    description:
      "At HotTubPads, we specialize in providing high-quality, durable hot tub pad installations in Kitchener, Ontario, ensuring a strong and stable foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our expert team delivers top-notch solutions tailored to your needs.",
    neighbourhoods: ["Waterloo", "Cambridge", "Elmira", "St. Jacobs", "Conestogo"],
    heroIntro:
      "Give your hot tub the stability it needs with a well-built, weather-resistant, and level pad. We specialize in durable concrete and gravel pads designed to support your spa for years.",
    metaTitle: "Hot Tub Pad Installation in Kitchener | Secure & Level Base",
    metaDescription:
      "Professional hot tub pad installation in Kitchener for a stable, long-lasting foundation. Non-slip, weather-resistant pads with fast local service. Free quote today.",
  },
  {
    slug: "hot-tub-pad-installation-in-woodstock-on",
    name: "Woodstock",
    region: "ON",
    description:
      "At HotTubPads, we provide expert hot tub pad installation services in Woodstock, Ontario, ensuring a stable, durable, and level foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our team delivers professional, high-quality solutions customized to your space.",
    neighbourhoods: ["Ingersoll", "Tavistock", "Norwich", "Tillsonburg", "Paris", "Brantford"],
    heroIntro:
      "Give your hot tub the stability it needs with a well-built, weather-resistant, and level pad. We specialize in durable concrete and gravel pads designed to support your spa for years.",
    metaTitle: "Hot Tub Pad Installation in Woodstock | Durable & Affordable Solutions",
    metaDescription:
      "Strong, level, and weather-resistant hot tub pad installation in Woodstock, ON. Professional concrete and gravel pads. Contact HotTubPads.ca for a free quote.",
  },
  {
    slug: "hot-tub-pad-installation-in-sarnia",
    name: "Sarnia",
    region: "ON",
    description:
      "At HotTubPads, we specialize in professional hot tub pad installations in Sarnia, Ontario, ensuring a stable, durable, and level foundation for your hot tub. Whether you need a concrete, gravel, or composite base, our experienced team provides high-quality solutions tailored to your space.",
    neighbourhoods: ["Point Edward", "Corunna", "Petrolia", "Watford", "Mooretown"],
    heroIntro:
      "Ensure your hot tub is supported with a properly installed, durable, and level hot tub pad. We specialize in concrete and gravel hot tub pads designed to withstand the elements and support the weight of your spa for years to come.",
    metaTitle: "Hot Tub Pad Installation in Sarnia | Durable & Reliable",
    metaDescription:
      "Professional hot tub pad installation in Sarnia, ON. Strong, level, and long-lasting concrete and gravel hot tub bases. Contact HotTubPads.ca for a free quote.",
  },
  {
    slug: "hot-tub-pad-installation-in-st-thomas",
    name: "St. Thomas",
    region: "ON",
    description:
      "At HotTubPads, we provide professional and reliable hot tub pad installations in St. Thomas, Ontario, ensuring a strong, level, and long-lasting foundation for your hot tub. Whether you prefer a concrete, gravel, or composite base, our expert team delivers high-quality solutions tailored to your needs.",
    neighbourhoods: ["Port Stanley", "Fingal", "Dorchester", "West Lorne", "Union"],
    heroIntro:
      "Ensure your hot tub has a solid, level, and durable foundation with a professionally installed pad. We offer expertly crafted concrete and gravel hot tub pads that are built to last, providing reliable support for your spa in any weather.",
    metaTitle: "Hot Tub Pad Installation in St. Thomas | Durable & Affordable",
    metaDescription:
      "Strong, level, and weather-resistant hot tub pad installation in St. Thomas, ON. Professional concrete and gravel pads. Contact HotTubPads.ca for a free quote.",
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
    slug: "post-1",
    title: "Avoid These 5 Common Mistakes When Installing a Hot Tub Pad",
    excerpt:
      "Installing a hot tub is a big investment, and the foundation you place it on is just as important as the hot tub itself. Learn how to avoid costly repairs.",
    image: "/images/concrete-pad.webp",
    imageAlt: "Common mistakes to avoid when installing a concrete hot tub pad",
    metaTitle: "5 Common Hot Tub Pad Installation Mistakes | Hot Tub Pads Blog",
    metaDescription:
      "Avoid these 5 costly mistakes when installing a hot tub pad. Expert tips on excavation, leveling, concrete thickness, drainage, and electrical planning.",
  },
  {
    slug: "post-2",
    title: "Concrete vs. Gravel: Which Hot Tub Pad is Right for You?",
    excerpt:
      "The two most common options for a hot tub pad are concrete and gravel — but which one is right for you? Compare durability, cost, and maintenance.",
    image: "/images/blog-thumb.jpg",
    imageAlt: "Comparison between concrete and gravel hot tub pads",
    metaTitle: "Concrete vs. Gravel Hot Tub Pads | Which Is Best? | Hot Tub Pads",
    metaDescription:
      "Concrete vs. gravel hot tub pads — compare cost, durability, drainage, and installation time. Find the best foundation for your spa. Expert guide from HotTubPads.ca.",
  },
  {
    slug: "post-3",
    title: "How to Prepare for a Hot Tub Pad Installation: A Homeowner's Checklist",
    excerpt:
      "Everything you need to do before your contractor arrives. From choosing the right pad type to planning for electrical, this checklist covers it all.",
    image: "/images/hot-tub-pad-1.jpg",
    imageAlt: "Homeowner preparing backyard for hot tub pad installation",
    metaTitle: "Hot Tub Pad Installation Checklist | Hot Tub Pads",
    metaDescription:
      "Prepare for your hot tub pad installation with this step-by-step homeowner's checklist. Site prep, electrical planning, pad type selection, and more.",
  },
];
