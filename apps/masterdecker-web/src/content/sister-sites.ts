// Curated contextual links to Master Decker's network of specialist sister sites.
// Every domain here was verified live (HTTP 200) before inclusion. Keep links
// relevant and limited (1–3 per page) so they read as genuine recommendations.

export type SisterLink = { label: string; href: string; blurb: string };

export const sisterLinks: Record<string, SisterLink[]> = {
  // ── Staining & Sealing ──────────────────────────────────────────
  "deck-staining-services": [
    { label: "Deck Medic", href: "https://deckmedic.ca", blurb: "Our deck restoration & staining specialists." },
    { label: "Toronto Deck Stainers", href: "https://torontodeckstainers.ca", blurb: "Dedicated deck staining across the GTA." },
    { label: "DeckStain.ca", href: "https://deckstain.ca", blurb: "Deck & fence staining throughout Southwestern Ontario." },
  ],
  "fence-staining-services": [
    { label: "DeckStain.ca", href: "https://deckstain.ca", blurb: "Specialist deck & fence staining." },
    { label: "Woodstock Deck & Fence", href: "https://woodstockdeckandfence.ca", blurb: "Deck building & fence installation in Oxford County." },
  ],
  "fence-painting-services": [
    { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", blurb: "New fence installation across London." },
  ],
  "concrete-sealing": [
    { label: "TriCity Concrete Sealing", href: "https://tricityconcretesealing.ca", blurb: "Concrete sealing experts in the Kitchener-Waterloo region." },
    { label: "London Concrete Sealing", href: "https://londonconcretesealing.ca", blurb: "Driveway & patio sealing in London." },
  ],
  "deck-cleaning": [
    { label: "Deck Medic", href: "https://deckmedic.ca", blurb: "Deck restoration & deep cleaning specialists." },
    { label: "Restore My Deck", href: "https://restoremydeck.ca", blurb: "Deck restoration in Kitchener-Waterloo." },
  ],
  "deck-sanding-london-ontario": [
    { label: "Deck Medic", href: "https://deckmedic.ca", blurb: "Deck restoration & refinishing." },
    { label: "Restore My Deck", href: "https://restoremydeck.ca", blurb: "Full deck restoration services." },
    { label: "Deck Revitalize", href: "https://deckrevitalize.ca", blurb: "Bringing tired decks back to life." },
  ],
  "fence-pressure-washing-services": [
    { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", blurb: "Fence installation & replacement." },
  ],
  "gazebo-staining": [
    { label: "Deck Revitalize", href: "https://deckrevitalize.ca", blurb: "Restoration for decks and outdoor wood structures." },
  ],
  "pergola-staining": [
    { label: "Deck Revitalize", href: "https://deckrevitalize.ca", blurb: "Restoration for pergolas and outdoor wood." },
  ],

  // ── Woodwork ────────────────────────────────────────────────────
  "deck-building": [
    { label: "Woodstock Deck & Fence", href: "https://woodstockdeckandfence.ca", blurb: "Custom deck builds in Oxford County." },
    { label: "Restore My Deck", href: "https://restoremydeck.ca", blurb: "Deck building & restoration in KW." },
  ],
  "deck-resurfacing": [
    { label: "Deck Medic", href: "https://deckmedic.ca", blurb: "Deck restoration & resurfacing." },
  ],
  "deck-repairs": [
    { label: "Deck Medic", href: "https://deckmedic.ca", blurb: "Deck repair & restoration specialists." },
    { label: "Restore My Deck", href: "https://restoremydeck.ca", blurb: "Deck repairs in Kitchener-Waterloo." },
  ],
  "deck-rebuilding-services": [
    { label: "Woodstock Deck & Fence", href: "https://woodstockdeckandfence.ca", blurb: "Deck building in Oxford County." },
  ],
  "fence-building": [
    { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", blurb: "Dedicated fence installation in London." },
    { label: "Woodstock Deck & Fence", href: "https://woodstockdeckandfence.ca", blurb: "Fence installation in Oxford County." },
  ],
  "wooden-retaining-wall": [
    { label: "London Retaining Walls", href: "https://londonretainingwalls.ca", blurb: "Retaining wall specialists in London." },
  ],

  // ── Concrete Work ───────────────────────────────────────────────
  "concrete-driveways": [
    { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", blurb: "Concrete forming & flatwork in London." },
    { label: "Concrete Tillsonburg", href: "https://concretetilsonburg.ca", blurb: "Concrete contractor in Tillsonburg & Oxford County." },
    { label: "Brantford Concrete Forming", href: "https://brantfordconcreteforming.ca", blurb: "Concrete forming in Brantford." },
  ],
  "concrete-patios": [
    { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", blurb: "Patios, driveways & concrete flatwork in London." },
  ],
  "stamped-concrete-driveway-installation": [
    { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", blurb: "Decorative & stamped concrete in London." },
    { label: "Concrete Tillsonburg", href: "https://concretetilsonburg.ca", blurb: "Stamped concrete in Oxford County." },
  ],
  "stamped-patio-installation": [
    { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", blurb: "Stamped & decorative concrete patios." },
  ],
  "hot-tub-swim-spa-shed-pads": [
    { label: "HotTubPads.ca", href: "https://hottubpads.ca", blurb: "Our dedicated hot tub pad installation site." },
  ],
  "concrete-retaining-wall-installation": [
    { label: "London Retaining Walls", href: "https://londonretainingwalls.ca", blurb: "Retaining wall specialists in London." },
    { label: "London Concrete Forming", href: "https://londonconcreteforming.ca", blurb: "Poured concrete structures in London." },
  ],

  // ── Fencing & Lighting ──────────────────────────────────────────
  "vinyl-composite-fencing-installation": [
    { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", blurb: "Full-service fence installation in London." },
  ],
  "chain-link-fence-installation": [
    { label: "London Fence Installer", href: "https://londonfenceinstaller.ca", blurb: "Residential & commercial fencing in London." },
  ],
  "block-retaining-wall-installation": [
    { label: "London Retaining Walls", href: "https://londonretainingwalls.ca", blurb: "Engineered retaining walls in London." },
  ],
  "christmas-lighting": [
    { label: "Christmas Lights London", href: "https://christmaslightslondon.ca", blurb: "Holiday light installation in London." },
    { label: "We Install Christmas Lights", href: "https://weinstallchristmaslights.ca", blurb: "Professional holiday lighting across Ontario." },
  ],
};

export function sisterLinksFor(slug: string): SisterLink[] {
  return sisterLinks[slug] ?? [];
}

// Trusted material / product suppliers we use, cross-linked where relevant.
// One short, genuine "materials we use" note per page — never spammy.
export type SupplierLink = { label: string; href: string; blurb: string };

const READY_SEAL: SupplierLink = {
  label: "Ready Seal Direct",
  href: "https://readysealdirect.ca",
  blurb: "We finish decks with premium READY SEAL penetrating stain — available from Ready Seal Direct.",
};
const SHERWIN: SupplierLink = {
  label: "Sherwin-Williams",
  href: "https://www.sherwin-williams.com",
  blurb: "Our fence coatings use professional-grade Sherwin-Williams exterior stains and finishes.",
};
const HOLIDAY: SupplierLink = {
  label: "Holiday Light Supplies",
  href: "https://holidaylightsupplies.ca",
  blurb: "Our commercial-grade C9 and LED product is sourced from Holiday Light Supplies.",
};

export const supplierLinks: Record<string, SupplierLink> = {
  // Deck stains → Ready Seal Direct
  "deck-staining-services": READY_SEAL,
  "deck-sanding-london-ontario": READY_SEAL,
  "deck-cleaning": READY_SEAL,
  "deck-resurfacing": READY_SEAL,
  "gazebo-staining": READY_SEAL,
  "pergola-staining": READY_SEAL,
  // Fence stains → Sherwin-Williams
  "fence-staining-services": SHERWIN,
  "fence-painting-services": SHERWIN,
  "fence-pressure-washing-services": SHERWIN,
  // Christmas lights → Holiday Light Supplies
  "christmas-lighting": HOLIDAY,
};

export function supplierFor(slug: string): SupplierLink | undefined {
  return supplierLinks[slug];
}

export const READY_SEAL_LINK = READY_SEAL;
