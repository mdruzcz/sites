import { PICKS } from "@/lib/photos";
import type { FAQItem } from "@/lib/faqs";

export interface ServicePageContent {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  hero: string;
  metaTitle: string;
  metaDescription: string;
  formService: string;
  /** Left column heading + bullets */
  includedTitle: string;
  includedIntro?: string;
  included: { title: string; body: string }[];
  /** Right column cards */
  cardsTitle: string;
  cards: { icon: string; title: string; body: string }[];
  /** Photo strip keys */
  photos: string[];
  crossLink: { label: string; href: string; blurb: string };
  faqs: FAQItem[];
  ctaHeading: string;
  ctaSub?: string;
  serviceType: string;
}

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "residential-holiday-lighting": {
    slug: "residential-holiday-lighting",
    eyebrow: "Residential",
    h1: "Holiday lighting designed for your home, not a catalogue.",
    intro: "Custom Christmas lighting for bungalows, century homes and new builds across Southern Ontario. We design it, hang it, keep it lit and take it down.",
    hero: PICKS.heroResidential,
    metaTitle: "Residential Christmas Light Installation, Southern Ontario",
    metaDescription: "Custom residential Christmas light installation across Hamilton, Burlington, Oakville and Southern Ontario. Design, install, maintain, takedown and storage included. Free quote.",
    formService: "Classic Christmas Lights (Seasonal)",
    includedTitle: "Custom design for your specific home",
    includedIntro: "A Victorian in Durand wants something different from a new build in Milton. We design around your architecture, colours and taste.",
    included: [
      { title: "Free on-site design consultation", body: "We walk the property with you and sketch the plan before quoting." },
      { title: "Roofline, eave and gutter lighting", body: "Commercial-grade C9 or mini lights clipped cleanly to every edge." },
      { title: "Trees, shrubs and garden beds", body: "Wrapped trunks, canopy lighting and lit hedges." },
      { title: "Windows, doors and columns", body: "Frames, garland and wreaths that finish the look." },
      { title: "Colour matched to your home", body: "Warm white for stone and brick, multicolour for fun, or a custom palette." },
    ],
    cardsTitle: "Every home size",
    cards: [
      { icon: "🏠", title: "Bungalows and ranch homes", body: "Clean roofline runs with optional bush wrapping and lit pathways." },
      { icon: "🏘️", title: "Two-storey family homes", body: "Multi-level rooflines installed safely from our boom trucks." },
      { icon: "🏰", title: "Estates and custom builds", body: "Full-property displays: roofline, every tree, pathways and architectural accents." },
    ],
    photos: [PICKS.heroClassic, PICKS.treeWrap, "warm-white-wrapped-evergreen-and-roofline-christmas-lights-home", "grey-brick-home-white-roofline-lights-lit-window-wreaths"],
    crossLink: { label: "Want lights that stay up all year?", href: "/services/permanent-lighting", blurb: "Many families start with a seasonal program and add permanent LEDs later. Ask about both during your quote." },
    faqs: [
      { q: "Do I need to buy any lights?", a: "No. We supply commercial-grade LED lights, clips, cords and timers, and we take it all back at the end of the season." },
      { q: "How long does a residential install take?", a: "Most homes are done in a single visit. Large estates with many trees can take two days." },
      { q: "Can I keep the same design next year?", a: "Yes. Everything is labelled and stored for you, and most clients keep the same layout with small tweaks." },
      { q: "What if a section goes dark?", a: "Every install includes a mid-season maintenance visit, and we come back within one to two business days if anything fails." },
    ],
    ctaHeading: "Your home deserves to shine this Christmas.",
    serviceType: "Residential Christmas light installation",
  },
  "commercial-holiday-lighting": {
    slug: "commercial-holiday-lighting",
    eyebrow: "Commercial",
    h1: "Holiday lighting that makes your business impossible to miss.",
    intro: "Storefronts, plazas, offices, restaurants and hotels across Southern Ontario. Designed to draw people in during the highest-spending weeks of the year.",
    hero: PICKS.heroCommercial,
    metaTitle: "Commercial Holiday Lighting, Southern Ontario",
    metaDescription: "Commercial Christmas lighting for storefronts, plazas, offices, restaurants and hotels across Southern Ontario. Boom trucks, $5M insurance, season-long maintenance. Free quote.",
    formService: "Commercial Lighting",
    includedTitle: "Who we light",
    included: [
      { title: "Retail storefronts", body: "Window frames, entrances and roofline treatments that stop shoppers." },
      { title: "Plazas and strip malls", body: "Unified programs across every unit so the whole plaza reads as one destination." },
      { title: "Office buildings", body: "Exterior lighting that impresses clients and lifts staff morale all season." },
      { title: "Restaurants and hospitality", body: "Warm, inviting entrances and patios that fill tables." },
      { title: "Hotels and venues", body: "Grand entrances, courtyard trees and lobby displays." },
      { title: "Dealerships", body: "Lot-wide lighting that makes inventory sparkle from the road." },
    ],
    cardsTitle: "Why businesses book us",
    cards: [
      { icon: "📈", title: "It pays for itself", body: "A lit storefront is marketing during the season people spend the most." },
      { icon: "🚛", title: "Commercial equipment", body: "JLG and Genie boom lifts for tall facades and big trees." },
      { icon: "🛡️", title: "Zero risk to you", body: "$5M liability and WSIB-compliant crews, certificates on request." },
      { icon: "📅", title: "Season-long management", body: "We check and maintain the display from opening day through New Year's." },
    ],
    photos: ["commercial-building-warm-white-roofline-christmas-lights", "commercial-storefront-christmas-wreaths-string-lights-entrance", "business-frontage-lit-cone-trees-evergreen-dusk", "commercial-evergreen-trees-multicolour-christmas-lights"],
    crossLink: { label: "Permanent commercial systems", href: "/services/permanent-lighting", blurb: "Install once, change colours for every promotion and holiday, no seasonal logistics." },
    faqs: [
      { q: "When should a business book?", a: "Commercial slots fill by mid-October. Book in September for first choice of install dates." },
      { q: "Can you work around our hours?", a: "Yes. Early mornings, evenings and overnight installs are routine for retail and restaurants." },
      { q: "Do you provide certificates of insurance?", a: "Yes, $5M liability and WSIB clearance on request for property managers and landlords." },
      { q: "Can multiple locations be on one program?", a: "Yes. We run multi-site programs with one point of contact and consistent design." },
    ],
    ctaHeading: "Give your business the holiday edge.",
    ctaSub: "Commercial spots book out in October. Reserve your installation now.",
    serviceType: "Commercial holiday lighting installation",
  },
  "municipal-bia-lighting": {
    slug: "municipal-bia-lighting",
    eyebrow: "Municipal & BIA",
    h1: "Turn a main street into a holiday destination.",
    intro: "Streetscapes, town squares, parks and business improvement areas across Southern Ontario. Fully insured crews, commercial-grade LED and the paperwork tenders need.",
    hero: PICKS.heroMunicipal,
    metaTitle: "Municipal & BIA Holiday Lighting, Southern Ontario",
    metaDescription: "Turnkey holiday lighting for municipalities, BIAs, parks and public spaces across Southern Ontario. $5M liability, WSIB, commercial-grade LED, boom trucks. Request a quote.",
    formService: "Municipal / BIA Lighting",
    includedTitle: "Programs we run",
    included: [
      { title: "Municipalities", body: "Streetscape lighting, park displays, town hall illumination and holiday market installs on municipal timelines." },
      { title: "Business improvement areas", body: "District-wide programs that turn a shopping street into a festive destination." },
      { title: "Parks and public spaces", body: "Tree wrapping, pathway lighting and landmark illumination for community gathering spots." },
      { title: "Commercial campuses", body: "Consistent branding across multi-building properties, one crew." },
      { title: "Markets, rinks and events", body: "Temporary installs with full setup, maintenance and teardown." },
    ],
    cardsTitle: "Tender-ready",
    cards: [
      { icon: "🛡️", title: "$5M liability, WSIB", body: "Certificates and clearance letters for any RFP." },
      { icon: "🚛", title: "Boom trucks and lifts", body: "Tall trees and building facades handled safely." },
      { icon: "📋", title: "One point of contact", body: "From design through January takedown." },
    ],
    photos: ["town-square-trees-wrapped-christmas-lights-benches", "town-park-entrance-arch-wrapped-warm-white-lights", "colorful-lit-tree-snowy-park-gazebo", "sidewalk-christmas-tree-wraps-blue-lights-office-tower"],
    crossLink: { label: "Commercial programs", href: "/services/commercial-holiday-lighting", blurb: "Individual storefronts and plazas within a BIA can book their own program alongside the district display." },
    faqs: [
      { q: "How early should a municipality plan?", a: "Ideally the previous spring for budgeting, and no later than August to hold install dates." },
      { q: "Can you respond to an RFP?", a: "Yes. We supply insurance certificates, WSIB clearance, references and a detailed scope." },
      { q: "Do you handle takedown and storage?", a: "Yes. Every program includes January removal and labelled storage for the next season." },
      { q: "Can displays be reused year to year?", a: "Commercial-grade LED product typically runs several seasons; we test and refresh as needed." },
    ],
    ctaHeading: "Make your community the holiday destination.",
    ctaSub: "Municipal and BIA projects need early planning. Contact us now to secure your dates.",
    serviceType: "Municipal and BIA holiday lighting",
  },
  "tree-lighting": {
    slug: "tree-lighting",
    eyebrow: "Tree lighting",
    h1: "Award-winning tree wraps, indoors and out.",
    intro: "Trunk and canopy wrapping for big outdoor trees, lobby Christmas trees, hedges and feature trees. This is the part of the job Cameron is known for.",
    hero: PICKS.heroTree,
    metaTitle: "Tree Lighting & Christmas Tree Wrapping, Southern Ontario",
    metaDescription: "Award-winning tree wrapping and Christmas tree lighting for homes, businesses and public spaces across Southern Ontario. Any size, indoors or out. Free quote.",
    formService: "Tree Lighting",
    includedTitle: "What we wrap",
    included: [
      { title: "Outdoor feature trees", body: "Oaks, maples and spruces wrapped trunk to canopy, any size, from the lift." },
      { title: "Christmas tree installation", body: "Real and artificial trees set up, lit and decorated for homes and businesses." },
      { title: "Hedges and shrubs", body: "Driveway and garden-bed shrubs turned into glowing focal points." },
      { title: "Lobby and venue trees", body: "Sourced, delivered, lit and decorated, then removed in January." },
    ],
    cardsTitle: "Wrap styles",
    cards: [
      { icon: "🌳", title: "Trunk wrap", body: "Tight spiral on the trunk and main limbs for a sculpted look." },
      { icon: "✨", title: "Canopy drape", body: "Mini lights through the branches for a soft glow." },
      { icon: "🎄", title: "Full wrap", body: "Trunk plus canopy for the showpiece tree in the yard." },
    ],
    photos: [PICKS.treeWrap, "light-wrapped-tree-front-yard-christmas-display", "commercial-multicolour-tree-wrapping-winter-night", "courtyard-green-red-wrapped-trees-christmas-lights"],
    crossLink: { label: "Add the roofline", href: "/services/christmas-light-installation", blurb: "A wrapped tree and a lit roofline together is the display neighbours stop for." },
    faqs: [
      { q: "How tall a tree can you wrap?", a: "With our boom lifts, essentially any residential or streetscape tree. Very large trees are quoted on site." },
      { q: "Does wrapping damage the tree?", a: "No. LED strings run cool and are removed each January before spring growth." },
      { q: "Warm white or colour?", a: "Warm white suits brick and stone; multicolour is a classic for family homes. We can mix, for example warm white roofline with a colour tree." },
      { q: "Do you do indoor trees?", a: "Yes, lobby, office and venue trees are sourced, lit and decorated as a turnkey service." },
    ],
    ctaHeading: "Turn your trees into the show.",
    serviceType: "Tree lighting and wrapping",
  },
  "interior-holiday-decorating": {
    slug: "interior-holiday-decorating",
    eyebrow: "Interior decorating",
    h1: "Bring the holidays inside your lobby, office or venue.",
    intro: "Lobby trees, garland, wreaths and ambient lighting for corporate spaces, retail floors, restaurants and event venues across Southern Ontario.",
    hero: PICKS.heroInterior,
    metaTitle: "Interior Holiday Decorating for Offices & Venues, Ontario",
    metaDescription: "Interior holiday decorating for lobbies, offices, retail, restaurants, hotels and venues across Southern Ontario. Trees, garland, wreaths and lighting, installed and removed. Free quote.",
    formService: "Interior Holiday Decorating",
    includedTitle: "Spaces we decorate",
    included: [
      { title: "Corporate lobbies", body: "Grand trees, garland and ambient lighting for a strong first impression." },
      { title: "Retail and malls", body: "Window displays, atrium trees and photo sets that draw shoppers." },
      { title: "Restaurants and bars", body: "Warm, intimate decor that fills seats through December." },
      { title: "Hotels and conference centres", body: "Lobby trees, corridor garland and event-space transformations." },
      { title: "Residential interiors", body: "Staircases, mantels and dining rooms styled for the season." },
    ],
    cardsTitle: "Turnkey",
    cards: [
      { icon: "🎁", title: "We supply everything", body: "Trees, ornaments, garland, ribbon and lighting from our own inventory." },
      { icon: "🕐", title: "Off-hours install", body: "Evenings and weekends so your business never closes." },
      { icon: "📦", title: "Removed and stored", body: "Taken down in January and stored for next year." },
    ],
    photos: [PICKS.heroInterior, "elegant-warm-white-christmas-trees-commercial-lobby", "lit-garland-arch-office-lobby-entrance", PICKS.mall],
    crossLink: { label: "Light the outside too", href: "/services/commercial-holiday-lighting", blurb: "Most commercial clients pair interior decor with an exterior lighting program." },
    faqs: [
      { q: "Can you match our brand colours?", a: "Yes. Ribbon, ornaments and lighting are chosen to suit your brand or building finishes." },
      { q: "Do you provide the tree?", a: "Yes, real or artificial, sized to the space, delivered and removed." },
      { q: "How early should we book?", a: "Corporate interiors are installed late November; book by early October for the best dates." },
    ],
    ctaHeading: "Bring the holiday spirit inside this season.",
    serviceType: "Interior holiday decorating",
  },
};
