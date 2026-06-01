export type Service = { slug: string; name: string; tagline: string; blurb: string; body: string[]; includes: string[]; image: string };
export type Area = { slug: string; name: string; county: string; blurb: string };
export type Finish = { name: string; hex: string; note: string };
export type Project = { image: string; title: string; place: string; tag: string };
export type Review = { name: string; place: string; text: string };
export type Faq = { q: string; a: string };

export const SERVICES: Service[] = [
  {
    slug: "deck-staining", name: "Deck Staining", tagline: "Rich color that lasts",
    blurb: "Premium READY Seal® oil-based stain in eight colors — soaks into the grain so it never peels or flakes.",
    image: "/images/after-staining.jpg",
    body: [
      "Our flagship service. We apply READY Seal® premium oil-based stain that penetrates deep into the wood rather than coating the surface like cheaper water-based products. The result is a rich, even, streak-free finish that shrugs off UV, moisture, and Ontario's freeze-thaw cycles.",
      "Because READY Seal® combines stain and sealer in one, you get two layers of protection in a single application — with no lap marks, even on large decks. Every job starts with a proper clean and inspection so the stain bonds the way it should.",
    ],
    includes: ["8 oil-based color options", "Deep-penetrating, no-peel formula", "Stain + sealer in one coat", "Cleaning & prep included", "Streak-free, lap-mark-free finish", "Lasts 2–3 years"],
  },
  {
    slug: "deck-cleaning", name: "Deck Cleaning", tagline: "A spotless base",
    blurb: "Commercial pressure washing strips mold, mildew, algae, and old stain so new color bonds properly.",
    image: "/images/before-after-cleaning.jpg",
    body: [
      "A great stain job starts with a great clean. We use commercial-grade equipment to strip away years of dirt, mold, mildew, algae, and failing stain — revealing fresh wood and opening the grain so new stain can penetrate.",
      "We dial in the right pressure and technique for your wood type and hand-wash railings and spindles so nothing gets missed. Available on its own or as prep before staining.",
    ],
    includes: ["Commercial pressure-wash gear", "Removes mold, mildew & algae", "Strips failing old stain", "Safe for cedar, pine & composite", "Hand-wash of rails & spindles", "Standalone or pre-stain prep"],
  },
  {
    slug: "deck-sealing", name: "Deck Sealing", tagline: "An invisible shield",
    blurb: "Deep-penetrating oil-based sealer locks out moisture — the number-one enemy of outdoor wood.",
    image: "/images/after-deck-cleaning-staining.jpg",
    body: [
      "Water causes swelling, cracking, mold, and eventually rot. Our sealing service drives a deep-penetrating oil-based barrier into the cellular structure of the wood — not just a coating on top that washes away after the first hard rain.",
      "Resealing every 2–3 years dramatically extends the life of your deck and fence. Available as a clear or tinted finish depending on the look you want.",
    ],
    includes: ["Penetrates at the cellular level", "Water-repellent barrier", "Stops mold, mildew & algae", "Reduces cracking & warping", "Clear or tinted options", "2–3 year protection"],
  },
  {
    slug: "deck-restoration", name: "Deck Restoration", tagline: "Neglected to like-new",
    blurb: "Full structural repair, board replacement, and sanding to make a tired deck safe and beautiful again.",
    image: "/images/project-04.jpg",
    body: [
      "When a deck has been neglected for years, a coat of stain won't cut it. Our restoration service handles everything — structural inspection, loose or rotting board replacement, fastener upgrades, and unstable post repair — before any finishing begins.",
      "We source matching lumber and hardware so repairs are seamless, then clean, sand, and finish with READY Seal®. Homeowners are consistently amazed by the transformation.",
    ],
    includes: ["Full structural inspection", "Board & fastener replacement", "Carpentry repairs", "Professional sanding", "Deep clean between stages", "Documented before & after"],
  },
  {
    slug: "deck-refinishing", name: "Deck Refinishing", tagline: "Back to bare wood",
    blurb: "Sand away old, peeling finish down to raw wood and re-stain for results that look brand new.",
    image: "/images/cedar-staining.jpg",
    body: [
      "Ideal for decks that are structurally sound but cosmetically tired — old peeling stain, gray weathering, or a color you've outgrown. We sand the entire surface to bare wood, reaching every spindle and edge, then apply fresh READY Seal®.",
      "Proper sanding is the step most DIYers skip — and the reason their stain fails in a season. It's also the perfect chance to change colors, going darker for a modern look or lighter for a natural feel.",
    ],
    includes: ["Full drum & detail sanding", "Removes old stain & gray wood", "Even, blotch-free result", "Color-change option", "Premium READY Seal® finish", "Great for sound-but-worn decks"],
  },
  {
    slug: "fence-staining", name: "Fence Staining", tagline: "Curb appeal that lasts",
    blurb: "The same premium READY Seal® process we use on decks — most fences finished in a single day.",
    image: "/images/project-02.jpg",
    body: [
      "Your fence works as hard as your deck, exposed on all sides to rain, sun, snow, and ground moisture. We apply the same READY Seal® oil-based formula for deep protection and a rich, uniform color across every style — privacy, picket, split-rail, and lattice.",
      "Unlike paint, which traps moisture and peels, staining lets the wood breathe while still shielding it. Most fence projects are completed in a single day with minimal disruption to your yard.",
    ],
    includes: ["Same premium stain as decks", "All fence styles handled", "Thorough clean & prep", "Protects against rot & UV", "All 8 colors available", "Most fences done in a day"],
  },
];

export const AREAS: Area[] = [
  { slug: "london", name: "London", county: "Middlesex County", blurb: "Our home base. We help London homeowners protect and beautify their decks all season long." },
  { slug: "woodstock", name: "Woodstock", county: "Oxford County", blurb: "Long-lasting deck staining that keeps your Woodstock home looking its best year-round." },
  { slug: "st-thomas", name: "St. Thomas", county: "Elgin County", blurb: "From new decks to full restorations, we keep St. Thomas decks ready for every season." },
  { slug: "stratford", name: "Stratford", county: "Perth County", blurb: "Premium staining and sealing that enhances the charm of your Stratford outdoor space." },
  { slug: "brantford", name: "Brantford", county: "Brant County", blurb: "Helping Brantford residents keep their decks and fences beautiful and durable." },
  { slug: "kitchener", name: "Kitchener", county: "Waterloo Region", blurb: "Professional deck staining and restoration for Kitchener homeowners." },
  { slug: "cambridge", name: "Cambridge", county: "Waterloo Region", blurb: "Premium care that keeps your Cambridge deck protected and looking its best." },
  { slug: "guelph", name: "Guelph", county: "Wellington County", blurb: "Expert deck and fence staining for Guelph homes and businesses." },
  { slug: "tillsonburg", name: "Tillsonburg", county: "Oxford County", blurb: "Expert care to maintain and restore deck beauty across Tillsonburg." },
  { slug: "ingersoll", name: "Ingersoll", county: "Oxford County", blurb: "Quality deck restoration that stands up to the test of time in Ingersoll." },
];

export const FINISHES: Finish[] = [
  { name: "Natural Cedar", hex: "#C4813B", note: "Warm, classic, timeless" },
  { name: "Light Oak", hex: "#D4A054", note: "Soft golden brightness" },
  { name: "Pecan", hex: "#8B5E3C", note: "Rich, versatile nutty tone" },
  { name: "Dark Walnut", hex: "#3D2010", note: "Bold, modern, sophisticated" },
  { name: "Redwood", hex: "#8B2500", note: "Earthy red with character" },
  { name: "Burnt Hickory", hex: "#4A2810", note: "Cozy, cabin-inspired" },
  { name: "Mission Brown", hex: "#2F1A0F", note: "Timeless deep chocolate" },
  { name: "Mahogany", hex: "#6B2A1F", note: "Refined reddish-brown" },
];

export const PROJECTS: Project[] = [
  { image: "/images/project-01.jpg", title: "Natural Cedar Finish", place: "London", tag: "Deck Staining" },
  { image: "/images/project-02.jpg", title: "Dark Walnut Fence", place: "Woodstock", tag: "Fence Staining" },
  { image: "/images/project-03.jpg", title: "Full Deck Restoration", place: "Brantford", tag: "Restoration" },
  { image: "/images/project-04.jpg", title: "Complete Refinish", place: "St. Thomas", tag: "Refinishing" },
  { image: "/images/project-05.jpg", title: "Dark Walnut Deck", place: "Mississauga", tag: "Deck Staining" },
  { image: "/images/project-06.jpg", title: "Cedar Deck Sealing", place: "London", tag: "Deck Sealing" },
  { image: "/images/project-07.jpg", title: "Before & After", place: "Woodstock", tag: "Deck Cleaning" },
  { image: "/images/pergola.jpg", title: "Stained Pergola", place: "London", tag: "Deck Staining" },
];

export const REVIEWS: Review[] = [
  { name: "W. Truant", place: "Windsor", text: "They transformed our old deck into a beautiful outdoor space. The attention to detail and quality of work are outstanding." },
  { name: "A. Keller", place: "London", text: "Great team. It was quick and easy to get a quote back from a photo I uploaded. They charged exactly what they quoted and I'm thrilled." },
  { name: "Shirley & Jim Newton", place: "London", text: "Deck staining in Canada is always an annual chore. I'm so glad these guys are operating — they do great work." },
];

export const FAQS: Faq[] = [
  { q: "Why should I stain my deck?", a: "Staining protects your deck from weather, UV, and moisture while bringing out its natural beauty. It prevents rot, cracking, and fading, and extends the life of the wood." },
  { q: "How often should I re-stain?", a: "Every 2–3 years for most decks, depending on sun and foot-traffic exposure. Our oil-based stains last longer and protect better than water-based alternatives." },
  { q: "Can you stain a brand-new deck?", a: "Yes, but new pressure-treated wood usually needs 3–6 months to dry and cure before it will properly accept stain. We'll advise on timing." },
  { q: "What's the difference between staining and sealing?", a: "Staining adds color and protection; sealing focuses purely on blocking moisture. The READY Seal® products we use combine both in a single application." },
  { q: "How does the photo quote work?", a: "Send a few photos of your deck through our form. We review them, assess the work needed, and email you a detailed, itemized quote within 2 business days — no in-person visit required." },
  { q: "How long does a typical job take?", a: "Most deck staining projects are completed in 1–2 days including drying time. Larger decks or full restorations may take longer; we'll give you a clear timeline with your quote." },
  { q: "Do you offer a guarantee?", a: "Yes. We stand behind every job with a 100% satisfaction guarantee — if you're not happy with the finished result, we'll come back and make it right." },
  { q: "What areas do you serve?", a: "We serve 40+ cities across Southwestern Ontario, including London, Woodstock, St. Thomas, Stratford, Brantford, Kitchener, Cambridge, Guelph, Tillsonburg and Ingersoll." },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
