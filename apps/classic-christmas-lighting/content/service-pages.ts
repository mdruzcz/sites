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
  crossLink: { label: string; href: string; blurb: string };
  faqs: FAQItem[];
  ctaHeading: string;
  ctaSub?: string;
  serviceType: string;
}

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "christmas-lighting-installation": {
    slug: "christmas-lighting-installation",
    eyebrow: "Full-service installation",
    h1: "Christmas light installation, start to finish.",
    intro: "Design, commercial-grade LEDs, installation, mid-season service and January takedown for homes and businesses across Kitchener-Waterloo and Southern Ontario. You never climb a ladder.",
    hero: PICKS.heroInstall,
    heroAlt: "Brick country home near Kitchener outlined in warm white C9 Christmas lights by Classic Christmas Lighting",
    metaTitle: "Christmas Light Installation Kitchener-Waterloo | Classic",
    metaDescription: "Full-service Christmas light installation in Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Lights supplied, installed, maintained and taken down by an insured local crew. Free quote.",
    formService: "Christmas Lighting Installation",
    includedTitle: "Nothing for you to buy, hang, fix or store.",
    includedIntro: "Every install is a complete season, not just a morning on a ladder.",
    included: [
      { title: "Free design consultation", body: "We look at the roofline, trees and entrance and suggest what will look best on your home, usually from a photo and a phone call." },
      { title: "Commercial-grade LED lights supplied", body: "C9 bulbs, mini lights, clips, cords and timers, all included. Brighter and tougher than anything from a hardware store." },
      { title: "Professional installation", body: "Insured crew, custom-fit clips that follow every peak and gutter, and a bucket lift for tall rooflines and trees." },
      { title: "Mid-season service", body: "A strand goes dark or a storm loosens a clip? Call us. Service calls are part of the package." },
      { title: "Takedown after the holidays", body: "We remove everything carefully in January on a date that suits you." },
      { title: "Labelled storage", body: "Your lights are stored at our shop and ready for a faster install next year." },
    ],
    cardsTitle: "What we light",
    cards: [
      { icon: "🏠", title: "Rooflines and peaks", body: "Warm white or multicolour C9 bulbs along every eave, peak and gable." },
      { icon: "🌲", title: "Trees and shrubs", body: "Wrapped trunks, canopy lights and net-lit hedges along the driveway." },
      { icon: "🎀", title: "Entrances and columns", body: "Wreaths, garland, bows and lit door frames that finish the look." },
      { icon: "🏬", title: "Storefronts and offices", body: "Facades, entrances and parking-lot trees for businesses in the region." },
    ],
    photos: [PICKS.snowHome, PICKS.frontEntrance, PICKS.moonlit, PICKS.driveway],
    crossLink: { label: "Just want the trees done?", href: "/services/tree-lighting-services", blurb: "Trunk wraps and canopy lighting for the big maples and spruces in your yard, on their own or with the roofline." },
    faqs: [
      { q: "What does a full-service install include?", a: "Design, all lights and materials, professional installation, mid-season service, takedown after the holidays and storage of your lights until next year." },
      { q: "When should I book?", a: "Late September or October for the best install dates. We install through November and into early December, and the calendar fills quickly once the first snow lands." },
      { q: "How long does an install take?", a: "Most homes in Kitchener-Waterloo are done in two to four hours. Large homes with several wrapped trees, and commercial properties, can take a full day." },
      { q: "Do I need to be home?", a: "No. Everything is outdoors, and we plug into an exterior outlet with a timer. We will let you know when we are on the way and when we are done." },
      { q: "What if a section goes out?", a: "Call us and we come back, usually within a day or two. Mid-season service is included with every install." },
    ],
    ctaHeading: "Ready to have the best-looking house on the street?",
    serviceType: "Christmas light installation",
  },
  "christmas-lighting-for-homes": {
    slug: "christmas-lighting-for-homes",
    eyebrow: "Residential",
    h1: "Christmas lights designed for your home, not a box from the store.",
    intro: "Custom displays for bungalows, two-storey family homes and estates across Kitchener, Waterloo, Cambridge and Guelph. We design it, hang it, keep it lit and take it down.",
    hero: PICKS.heroHomes,
    heroAlt: "Stone home in Waterloo with warm white roofline Christmas lights and a lit spruce tree installed by Classic Christmas Lighting",
    metaTitle: "Residential Christmas Lighting Kitchener-Waterloo | Classic",
    metaDescription: "Residential Christmas light installation for homes in Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Custom design, LED lights supplied, insured crew, takedown included. Free quote.",
    formService: "Residential Lighting",
    includedTitle: "Designed around your house",
    includedIntro: "A brick two-storey in Doon wants something different from a stone bungalow in West Galt. We plan around your architecture, your trees and your taste.",
    included: [
      { title: "Roofline, eaves and gutters", body: "Commercial-grade C9 bulbs clipped cleanly to every edge, peak and dormer." },
      { title: "Trees, shrubs and garden beds", body: "Wrapped trunks, canopy lighting and net-lit hedges along the walk." },
      { title: "Entrances, columns and windows", body: "Wreaths, garland, bows and lit frames around the front door." },
      { title: "Colour matched to the house", body: "Warm white for brick and stone, cool white for modern siding, multicolour for family fun, or a custom mix." },
      { title: "Timers set for you", body: "Lights come on at dusk and off at bedtime without you touching a switch." },
    ],
    cardsTitle: "Every home size",
    cards: [
      { icon: "🏡", title: "Bungalows and ranch homes", body: "Clean roofline runs with lit shrubs and a wrapped tree at the driveway." },
      { icon: "🏘️", title: "Two-storey family homes", body: "Multi-level peaks and gables installed safely from our bucket lift." },
      { icon: "🏰", title: "Estates and country homes", body: "Full-property displays: roofline, every feature tree, pathways and the barn if you have one." },
    ],
    photos: [PICKS.snowHome, PICKS.frontEntrance, PICKS.hedges, PICKS.reindeer],
    crossLink: { label: "Add wreaths, garland and bows", href: "/services/christmas-decoration-services", blurb: "Most homes pair the roofline with a lit wreath and garland at the front door. Ask during your quote." },
    faqs: [
      { q: "Do I need to buy any lights?", a: "No. We supply commercial-grade LED lights, clips, cords and timers, and everything comes back to our shop after the holidays." },
      { q: "How long does a residential install take?", a: "Most homes take two to four hours. Estates with several wrapped trees can take a full day." },
      { q: "Can I keep the same design next year?", a: "Yes. Your lights are labelled and stored for you, and most families keep the same layout with small additions." },
      { q: "Will clips damage my shingles or gutters?", a: "No. We use purpose-made clips that grip the shingle edge or gutter lip without screws, nails or adhesive." },
      { q: "What colours are most popular in Kitchener-Waterloo?", a: "Warm white is the most requested for brick and stone homes, followed by red and white, and classic multicolour for families with young kids." },
    ],
    ctaHeading: "Your home deserves to shine this Christmas.",
    serviceType: "Residential Christmas light installation",
  },
  "christmas-lighting-for-businesses": {
    slug: "christmas-lighting-for-businesses",
    eyebrow: "Commercial",
    h1: "Christmas lighting that makes your business impossible to miss.",
    intro: "Storefronts, plazas, offices, restaurants and car lots across Kitchener-Waterloo, Guelph and Hamilton. Designed to pull people in during the busiest weeks of the year.",
    hero: PICKS.heroBusiness,
    heroAlt: "Commercial building in Kitchener-Waterloo with blue and white roofline Christmas lights installed by Classic Christmas Lighting",
    metaTitle: "Commercial Christmas Lighting Kitchener-Waterloo | Classic",
    metaDescription: "Commercial Christmas light installation for storefronts, plazas, offices and restaurants in Kitchener-Waterloo, Guelph and Hamilton. Insured crew, off-hours installs, season-long service. Free quote.",
    formService: "Commercial Lighting",
    includedTitle: "Who we light",
    included: [
      { title: "Retail storefronts", body: "Window frames, entrances and roofline runs that catch shoppers on King Street and Wyndham Street." },
      { title: "Plazas and strip malls", body: "One program across every unit so the whole plaza reads as one destination." },
      { title: "Office buildings and tech campuses", body: "Entrance canopies, courtyard trees and lobby trees that impress clients and staff." },
      { title: "Restaurants and patios", body: "Warm, inviting entrances and covered patios that fill tables through December." },
      { title: "Car dealerships", body: "Lot-wide lighting that makes inventory sparkle from the road." },
      { title: "Churches and community buildings", body: "Rooflines, steeples and feature trees for congregations and halls." },
    ],
    cardsTitle: "Why businesses book us",
    cards: [
      { icon: "📈", title: "It pays for itself", body: "A lit storefront is marketing during the weeks people spend the most." },
      { icon: "🕐", title: "Off-hours installs", body: "Early mornings, evenings and weekends so you never close for us." },
      { icon: "🛡️", title: "Insured, certificates on request", body: "Property managers and landlords get paperwork before we arrive." },
      { icon: "📅", title: "Season-long service", body: "We check and maintain the display from opening day through New Year's." },
    ],
    photos: [PICKS.office, PICKS.storefront, PICKS.courtyard, PICKS.parkTrees],
    crossLink: { label: "Renting for an event or BIA?", href: "/services/christmas-light-rental", blurb: "Seasonal rentals with setup and takedown for markets, festivals, BIAs and municipal displays." },
    faqs: [
      { q: "When should a business book?", a: "Commercial slots fill by mid-October. Book in September for first choice of install dates and to have lights up before Black Friday." },
      { q: "Can you work around our hours?", a: "Yes. Early mornings, evenings and weekend installs are routine for retail and restaurants." },
      { q: "Do you provide proof of insurance?", a: "Yes. Certificates of insurance are available on request for landlords and property managers." },
      { q: "Can multiple locations be on one program?", a: "Yes. We run multi-site programs with one contact and consistent design across every location." },
      { q: "Do you light indoor spaces too?", a: "Yes. Lobby trees, garland and interior lighting are part of our decoration services." },
    ],
    ctaHeading: "Give your business the holiday edge.",
    ctaSub: "Commercial spots book out in October. Reserve your installation now.",
    serviceType: "Commercial Christmas light installation",
  },
  "tree-lighting-services": {
    slug: "tree-lighting-services",
    eyebrow: "Tree lighting",
    h1: "Wrapped trees that stop traffic.",
    intro: "Trunk and canopy wrapping for the big maples, spruces and birches in Waterloo Region yards, plus lit evergreens and lobby Christmas trees for businesses. Any size, indoors or out.",
    hero: PICKS.heroTree,
    heroAlt: "Estate trees in Waterloo Region wrapped in cool white Christmas lights by Classic Christmas Lighting",
    metaTitle: "Tree Lighting & Tree Wrapping Kitchener-Waterloo | Classic",
    metaDescription: "Professional tree wrapping and tree lighting in Kitchener-Waterloo, Cambridge, Guelph and Hamilton. Trunk wraps, canopy lights, lit spruces and lobby trees. Any size. Free quote.",
    formService: "Tree Lighting",
    includedTitle: "What we wrap",
    included: [
      { title: "Outdoor feature trees", body: "Maples, oaks, birches and spruces wrapped trunk to canopy from the ground or our bucket lift." },
      { title: "Evergreens and cedars", body: "Spiral or full-coverage wraps that turn a spruce into the centrepiece of the yard." },
      { title: "Hedges and shrubs", body: "Net lights and mini-light drapes along driveways and garden beds." },
      { title: "Lobby and venue trees", body: "Real or artificial trees set up, lit and decorated for businesses, then removed in January." },
    ],
    cardsTitle: "Wrap styles",
    cards: [
      { icon: "🌳", title: "Trunk wrap", body: "Tight spiral on the trunk and main limbs for a sculpted, gallery look." },
      { icon: "✨", title: "Canopy drape", body: "Mini lights through the branches for a soft, glowing crown." },
      { icon: "🎄", title: "Full wrap", body: "Trunk plus canopy for the showpiece tree everyone photographs." },
    ],
    photos: [PICKS.treeWrap, PICKS.treeColour, PICKS.blueSpruce, PICKS.greenTree],
    crossLink: { label: "Add the roofline", href: "/services/christmas-lighting-installation", blurb: "A wrapped tree and a lit roofline together is the display neighbours slow down for." },
    faqs: [
      { q: "How tall a tree can you wrap?", a: "With the bucket lift, most residential and streetscape trees are no problem. Very large trees are quoted on site." },
      { q: "Does wrapping damage the tree?", a: "No. LED strings run cool, and we remove them each January before spring growth." },
      { q: "Warm white or colour?", a: "Warm white suits brick and stone homes; multicolour is the classic family look. Many homes mix a warm white roofline with a colour tree." },
      { q: "Do you do indoor Christmas trees?", a: "Yes. Lobby, office and venue trees are sourced, lit and decorated as a turnkey service." },
      { q: "How many lights does a tree need?", a: "A trunk wrap on a mid-sized maple uses several hundred feet of mini lights. We size it to the tree and the look you want during the quote." },
    ],
    ctaHeading: "Turn your trees into the show.",
    serviceType: "Tree lighting and wrapping",
  },
  "christmas-light-rental": {
    slug: "christmas-light-rental",
    eyebrow: "Light rental",
    h1: "Rent the display. We handle the rest.",
    intro: "Seasonal Christmas light rentals for BIAs, municipalities, markets, event organizers and businesses across Waterloo Region and Southern Ontario. Setup, service and takedown included.",
    hero: PICKS.heroRental,
    heroAlt: "Municipal park Christmas tree in multicolour lights at night, a seasonal rental installed by Classic Christmas Lighting",
    metaTitle: "Christmas Light Rental Kitchener-Waterloo | Classic Lighting",
    metaDescription: "Christmas light rental for BIAs, municipalities, events and businesses in Kitchener-Waterloo and Southern Ontario. Premium LED displays with full setup, service and takedown. Request a quote.",
    formService: "Light Rental",
    includedTitle: "How rental works",
    includedIntro: "You get a professional display for the season without buying, storing or maintaining anything.",
    included: [
      { title: "Design for the space", body: "Streetscapes, park trees, plazas, market squares and event venues, planned around foot traffic and photo spots." },
      { title: "Premium LED inventory", body: "Commercial-grade C9 strings, tree wraps, cone trees, garland and pre-lit displays from our own stock." },
      { title: "Setup on your schedule", body: "Installed on the dates you need, including overnight and off-hours for public spaces." },
      { title: "Service through the season", body: "We keep it lit from the tree-lighting ceremony to the New Year." },
      { title: "Takedown and storage", body: "Removed in January and stored at our shop. No inventory for you to manage." },
    ],
    cardsTitle: "Who rents from us",
    cards: [
      { icon: "🏙️", title: "BIAs and downtowns", body: "Street trees, lamp posts and storefront programs for a whole district." },
      { icon: "🏛️", title: "Municipalities", body: "Park displays, town hall rooflines and community tree lightings." },
      { icon: "🎪", title: "Markets and events", body: "Christmas markets, festivals and pop-ups that need a big look for a short run." },
      { icon: "🏢", title: "Property managers", body: "Plazas and office campuses that want one invoice and zero storage." },
    ],
    photos: [PICKS.spiralTrees, PICKS.goldenCone, PICKS.pavilion, PICKS.parkTrees],
    crossLink: { label: "Own your display instead?", href: "/services/christmas-lighting-for-businesses", blurb: "For a storefront you light every year, a purchased program can be the better long-term value. We will quote both." },
    faqs: [
      { q: "What is the minimum rental period?", a: "Rentals run for the season, typically mid-November through early January. Shorter runs for markets and events are quoted separately." },
      { q: "Does the rental include installation?", a: "Yes. Every rental includes design, installation, service during the season and takedown." },
      { q: "How early should a BIA or municipality book?", a: "Ideally the previous spring for budgeting, and no later than August to hold install dates before the season." },
      { q: "Can you supply insurance documents for a public space?", a: "Yes. Certificates of insurance are provided on request for municipal and BIA projects." },
      { q: "Can we keep the same display next year?", a: "Yes. Returning clients get first priority on their inventory and dates." },
    ],
    ctaHeading: "Make your community the holiday destination.",
    ctaSub: "BIA, municipal and event projects need early planning. Contact us now to hold your dates.",
    serviceType: "Christmas light rental",
  },
  "christmas-decoration-services": {
    slug: "christmas-decoration-services",
    eyebrow: "Decoration services",
    h1: "Wreaths, garland, bows and the finishing touches.",
    intro: "Complete holiday décor for front entrances, columns, railings and commercial lobbies across Kitchener-Waterloo. Installed with your lights or on their own.",
    hero: PICKS.heroDecor,
    heroAlt: "Front entrance in Kitchener-Waterloo with warm white roofline lights and a lit Christmas wreath installed by Classic Christmas Lighting",
    metaTitle: "Christmas Decoration Services Kitchener-Waterloo | Classic",
    metaDescription: "Professional Christmas decorating in Kitchener-Waterloo, Cambridge and Guelph: lit wreaths, garland, bows, railings and lobby trees for homes and businesses. Installed and removed. Free quote.",
    formService: "Wreaths & Garlands",
    includedTitle: "What we decorate",
    included: [
      { title: "Front entrances", body: "Lit wreaths, garland swags over the door and bows in your colours." },
      { title: "Columns and railings", body: "Garland-wrapped porch columns and railings with warm white mini lights." },
      { title: "Windows and planters", body: "Window wreaths, lit urns and planter arrangements that greet visitors." },
      { title: "Commercial lobbies and entrances", body: "Lobby trees, garland arches and reception décor for offices, hotels and retail." },
      { title: "Custom arrangements", body: "Colour schemes matched to your home, brand or existing lighting." },
    ],
    cardsTitle: "Turnkey",
    cards: [
      { icon: "🎁", title: "We supply everything", body: "Wreaths, garland, ribbon, ornaments and lighting from our own inventory." },
      { icon: "🎨", title: "Matched to your lights", body: "Décor is designed alongside your roofline and tree lighting so the whole property reads as one." },
      { icon: "📦", title: "Removed and stored", body: "Taken down in January and stored with your lights for next year." },
    ],
    photos: [PICKS.wreath, PICKS.frontEntrance, PICKS.storefront, PICKS.lobbyTree],
    crossLink: { label: "Start with the roofline", href: "/services/christmas-lighting-for-homes", blurb: "Décor looks best paired with roofline lights. Most homes book both in one visit." },
    faqs: [
      { q: "Can you match my existing colour scheme?", a: "Yes. Ribbon, ornaments and lighting are chosen to suit your roofline colours, brick or brand." },
      { q: "Do you decorate indoors?", a: "Yes. Lobby trees, garland and reception décor for businesses, plus mantels and staircases for homes on request." },
      { q: "Is décor included with a lighting install?", a: "It is quoted as an add-on. Most homes add a lit wreath and entrance garland to their roofline package." },
      { q: "Are the wreaths and garland real?", a: "We use high-quality artificial greenery with commercial LED lighting so it looks full all season and stores for next year." },
    ],
    ctaHeading: "Finish the look at the front door.",
    serviceType: "Christmas decoration services",
  },
};
