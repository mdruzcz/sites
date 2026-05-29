// Per-slug topical background image. Falls back to a category-appropriate photo
// for any slug that's not explicitly mapped.
//
// Sources:
// - wp-*.jpg  → real masterdecker.com WP CDN photos
// - ss-*.*    → photos copied from sister sites (london-fence-installer,
//                london-retaining-walls, hot-tub-pads, deck-medic, deck-heroes,
//                toronto-deck-stainers, london-concrete-forming,
//                brantford-concrete-forming, concrete-tilsonburg, deck-heroes,
//                classic-christmas-lighting).

export const serviceImages: Record<string, string> = {
  // ── Staining & Sealing ─────────────────────────────────────────
  "fence-painting-services": "/images/ss-fence-staining.jpg",
  "deck-staining-services": "/images/wp-deck-stained-cedar.jpg",
  "concrete-sealing": "/images/wp-stamped-concrete.jpg",
  "deck-cleaning": "/images/ss-deck-restore.jpeg",
  "cedar-shake-cleaning": "/images/wp-cedar-shake.jpg",
  "boat-docks": "/images/wp-boat-dock.jpg",
  "gazebo-staining": "/images/gazebo.jpg",
  "patio-pressure-washing-services": "/images/ss-broom-finish.jpg",
  "deck-sanding-london-ontario": "/images/ss-deck-refinish.webp",
  "fence-pressure-washing-services": "/images/ss-wood-fence.jpg",
  "pergola-staining": "/images/pergola.jpg",
  "fence-staining-services": "/images/ss-fence-stain.webp",

  // ── Woodwork ───────────────────────────────────────────────────
  "deck-resurfacing": "/images/ss-deck-refinish.webp",
  "deck-repairs": "/images/ss-deck-restore.jpeg",
  "deck-building": "/images/wp-deck-building.jpg",
  "deck-rebuilding-services": "/images/wp-backyard-deck.jpg",
  "custom-pergolas": "/images/wp-pergola-swing.jpg",
  "wooden-retaining-wall": "/images/ss-wood-wall.jpg",
  "custom-gazebos": "/images/gazebo.jpg",
  "fence-building": "/images/ss-fence-hero.jpg",

  // ── Concrete ───────────────────────────────────────────────────
  "concrete-patios": "/images/ss-concrete-patio.jpg",
  "concrete-driveways": "/images/ss-concrete-driveway.jpeg",
  "hot-tub-and-shed-pads": "/images/ss-hot-tub-pad.jpg",
  "concrete-walkway-installation": "/images/ss-stamped-walkway.png",
  "heated-driveway-installation": "/images/wp-heated-driveway.jpg",
  "concrete-retaining-wall-installation": "/images/ss-concrete-wall.jpg",
  "stamped-concrete-driveway-installation": "/images/wp-stamped-concrete-2.jpg",
  "swim-spa-pad-installation": "/images/ss-concrete-pad.webp",
  "stamped-patio-installation": "/images/ss-stamped-1.jpg",

  // ── Landscaping & Lighting ─────────────────────────────────────
  "christmas-lighting": "/images/ss-christmas-lights.jpg",
  "outdoor-privacy-screens": "/images/ss-wood-fence.jpg",
  "artificial-turf-installation": "/images/ss-deck-outdoor.jpg",
  "railing-installation": "/images/ss-railing.jpg",
  "vinyl-composite-fencing-installation": "/images/ss-vinyl-fence.jpg",
  "chain-link-fence-installation": "/images/ss-chainlink.jpg",
  "block-retaining-wall-installation": "/images/ss-block-wall.jpg",
};

export const categoryFallback: Record<string, string> = {
  "staining-sealing": "/images/wp-deck-stained-cedar.jpg",
  "woodwork": "/images/wp-deck-building.jpg",
  "concrete": "/images/wp-stamped-concrete.jpg",
  "landscaping": "/images/ss-fence-hero.jpg",
};

export function imageFor(slug: string, categoryId: string): string {
  return serviceImages[slug] ?? categoryFallback[categoryId] ?? "/images/pergola.jpg";
}
