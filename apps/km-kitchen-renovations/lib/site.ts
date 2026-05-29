export const SITE = {
  name: "K&M Kitchen Renovations",
  tagline: "Transforming Kitchens Across Southwestern Ontario",
  description:
    "K&M Kitchen Renovations delivers expert kitchen renovations, bathroom remodels, and basement finishing in London, St Thomas, Woodstock, and surrounding communities. Free quotes. Projects completed in as little as 2 weeks.",
  url: "https://kmkitchenrenovations.ca",
  phone: "519-914-3405",
  phonePlain: "5199143405",
  email: "service@kmkitchenrenovations.ca",
  address: {
    city: "London",
    province: "ON",
    country: "CA",
    region: "Southwestern Ontario",
  },
  founders: "Kyle and Matt",
  yearsExperience: 10,
  projectsPerYear: "5–10",
  projectTimeline: "2 weeks",
  social: {},
} as const;

export const SERVICES = [
  {
    slug: "kitchen-renovations",
    title: "Kitchen Renovations",
    shortTitle: "Kitchen Renovations",
    description:
      "Full kitchen renovations tailored to your style and budget. We handle everything from demo to final installation.",
    icon: "🍳",
  },
  {
    slug: "kitchen-remodels",
    title: "Kitchen Remodels",
    shortTitle: "Kitchen Remodels",
    description:
      "Transform your existing kitchen layout into a modern, efficient, and stylish cooking space.",
    icon: "🔨",
  },
  {
    slug: "bathroom-remodels",
    title: "Bathroom Remodels",
    shortTitle: "Bathroom Remodels",
    description:
      "Elevate your bathroom with contemporary designs, custom tile work, and premium fixtures.",
    icon: "🛁",
  },
  {
    slug: "white-shaker-cabinets",
    title: "White Shaker Cabinet Installation",
    shortTitle: "White Shaker Cabinets",
    description:
      "Premium ¾ plywood, solid birch white shaker cabinets installed with precision craftsmanship.",
    icon: "🚪",
  },
  {
    slug: "custom-kitchen-cabinets",
    title: "Custom Kitchen Cabinet Installation",
    shortTitle: "Custom Cabinets",
    description:
      "Tailor-made storage solutions designed to maximize every inch of your kitchen space.",
    icon: "📐",
  },
  {
    slug: "basement-finishing",
    title: "Basement Finishing",
    shortTitle: "Basement Finishing",
    description:
      "Convert your unfinished basement into a beautiful, functional living space.",
    icon: "🏠",
  },
  {
    slug: "basement-kitchens",
    title: "Basement Kitchens",
    shortTitle: "Basement Kitchens",
    description:
      "Add a secondary kitchen in your basement — perfect for entertaining or multi-generational living.",
    icon: "🥘",
  },
  {
    slug: "basement-bathrooms",
    title: "Basement Bathrooms",
    shortTitle: "Basement Bathrooms",
    description:
      "Professionally installed basement bathrooms that add convenience and lasting value.",
    icon: "🚿",
  },
] as const;

export const SERVICE_AREAS = [
  {
    slug: "london",
    city: "London",
    province: "ON",
    description:
      "London is our home base. We've transformed hundreds of kitchens across North London, South London, and everything in between.",
    population: "422,000",
    neighbourhoods: ["North London", "Byron", "Old South", "Wortley Village", "Westmount"],
  },
  {
    slug: "st-thomas",
    city: "St. Thomas",
    province: "ON",
    description:
      "Just 30 minutes south of London, St. Thomas homeowners trust K&M for stunning kitchen and bathroom transformations.",
    population: "40,000",
    neighbourhoods: ["Downtown St. Thomas", "Lynhurst", "Centennial Area"],
  },
  {
    slug: "woodstock",
    city: "Woodstock",
    province: "ON",
    description:
      "Serving Oxford County's largest city with the same quality craftsmanship London homeowners have come to expect.",
    population: "43,000",
    neighbourhoods: ["Downtown Woodstock", "Pittock", "College Avenue"],
  },
  {
    slug: "hamilton",
    city: "Hamilton",
    province: "ON",
    description:
      "We bring K&M's signature style to Hamilton homeowners seeking high-quality kitchen and bathroom renovations.",
    population: "569,000",
    neighbourhoods: ["Dundas", "Ancaster", "Stoney Creek", "Waterdown"],
  },
  {
    slug: "kitchener-waterloo",
    city: "Kitchener-Waterloo",
    province: "ON",
    description:
      "The Tri-Cities region gets the same premium kitchen renovation experience that Southwest Ontario homeowners love.",
    population: "575,000",
    neighbourhoods: ["Uptown Waterloo", "Forest Heights", "Stanley Park"],
  },
  {
    slug: "stratford",
    city: "Stratford",
    province: "ON",
    description:
      "Serving Perth County homeowners with beautiful kitchen renovations that complement Stratford's charming architecture.",
    population: "32,000",
    neighbourhoods: ["Downtown Stratford", "Avon Ward", "Falstaff Area"],
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Jennifer M.",
    city: "London, ON",
    text: "Kyle and Matt completely transformed our outdated 1990s kitchen. The white shaker cabinets look incredible and they finished ahead of schedule. I've already recommended them to three neighbours.",
    rating: 5,
  },
  {
    name: "David & Sarah K.",
    city: "London, ON",
    text: "From first quote to final reveal, the experience was seamless. Our new kitchen increased our home's value significantly. Couldn't be happier with the craftsmanship.",
    rating: 5,
  },
  {
    name: "Robert T.",
    city: "Woodstock, ON",
    text: "We did both a kitchen remodel and a basement bathroom. The team worked efficiently and the quality is outstanding. The custom cabinets are exactly what we envisioned.",
    rating: 5,
  },
  {
    name: "Michelle P.",
    city: "St. Thomas, ON",
    text: "Honest pricing, no surprises, and they completed our kitchen renovation in just 10 days. The finished product is absolutely beautiful.",
    rating: 5,
  },
  {
    name: "Chris & Laura B.",
    city: "London, ON",
    text: "We've used other contractors before and the difference is night and day. K&M is professional, clean, and truly cares about the finished product.",
    rating: 5,
  },
] as const;

export const FAQS = [
  {
    question: "How long does a kitchen renovation take?",
    answer:
      "Most kitchen renovations are completed in as little as two weeks, depending on the scope and complexity of the project. We'll give you a realistic timeline during your free quote.",
  },
  {
    question: "Do you offer free quotes?",
    answer:
      "Yes, absolutely. We offer free, no-obligation quotes for all projects. Contact us and we'll either visit your home or review photos you provide.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve London, St. Thomas, Woodstock, Hamilton, Kitchener-Waterloo, and Stratford. Contact us to confirm availability in your area.",
  },
  {
    question: "What does a kitchen renovation cost?",
    answer:
      "Kitchen renovations typically cost between $100 and $250 per square foot, depending on materials (flooring, countertops, cabinets) and the complexity of the work. Contact us for a free, itemized quote specific to your project.",
  },
  {
    question: "Is it safe to stay home during the renovation?",
    answer:
      "Yes. We take every precaution to ensure pets and residents are comfortable during the renovation. We keep work areas contained, clean up daily, and maintain open communication throughout the project.",
  },
  {
    question: "Do you help source cabinets and materials?",
    answer:
      "Absolutely. We work with trusted suppliers and can help you select from a wide range of high-quality cabinet lines, countertop materials, and finishes that suit your style and budget.",
  },
  {
    question: "Do you do bathroom remodels too?",
    answer:
      "Yes — we handle full bathroom remodels including tile, vanity installation, shower/tub surrounds, and custom layouts. Ask about bundling a kitchen and bathroom project for the best value.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. We offer flexible 60-day financing options at competitive APRs, making it easier to start your renovation now without the full upfront cost. Ask us for details during your free consultation.",
  },
] as const;
