/**
 * Seed the four Port Stanley properties.
 *
 *   node scripts/seed-properties.mjs
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
 * Idempotent: upserts on `slug`, so re-running updates rather than duplicates.
 *
 * IMPORTANT — every listing is seeded as `draft`.
 *
 * The addresses and names came from Matt; the rates, square footages, bed
 * counts and amenity lists are researched placeholders shaped to the Port
 * Stanley off-season market. Publishing invented prices would mean fielding
 * enquiries against numbers nobody agreed to, so each one stays hidden until
 * it has been checked in the admin and flipped to Published.
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const raw = readFileSync(resolve(HERE, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* env may come from the shell instead */
  }
}
loadEnv();

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !KEY || KEY === "REPLACE_ME") {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.");
  process.exit(1);
}

const COMMON = {
  city: "Port Stanley",
  region: "ON",
  country: "CA",
  postal_code: "N5L",
  status: "draft",
  min_stay_nights: 30,
  utilities_included: true,
  wifi_included: true,
  smoking_allowed: false,
  available_from: "September",
  available_to: "May"
};

const PROPERTIES = [
  {
    ...COMMON,
    slug: "the-escape",
    name: "The Escape",
    street_address: "4490 East Road",
    unit: null,
    latitude: 42.6683,
    longitude: -81.2108,
    property_type: "Cottage",
    featured: true,
    headline: "Three bedrooms and a wood stove, up the hill from the harbour",
    summary:
      "A whole three-bedroom cottage on East Road with a wood stove, a deck facing the lake side and room on the drive for a work truck. Sleeps seven, by the month.",
    description: `The Escape is the largest of our East Road homes and the one people take when there are more than a couple of them. Three bedrooms, two full bathrooms, an open kitchen and living room built around a wood stove, and a deck on the lake side of the house that gets the last of the light.

It is set up for a long stay rather than a weekend. The kitchen is a real kitchen — full-size range, dishwasher, enough cookware to cook properly for six. There is a washer and dryer in the house, not in a shared basement. The internet is fast enough for video calls from two rooms at once, and there is a desk that is actually a desk.

Winter here is the point. The stove takes the chill off the whole ground floor within twenty minutes and the first cord of wood is included. The village is a walk down the hill and a slightly harder walk back up. St. Thomas is fifteen minutes north for anything the village does not have.

Pets are welcome with a fee, and the drive takes a truck and a trailer without anyone reversing onto East Road.`,
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 7,
    beds: 4,
    square_feet: 1400,
    parking_spaces: 3,
    monthly_rate: 2650,
    weekly_rate: 895,
    nightly_rate: 185,
    security_deposit: 2650,
    cleaning_fee: 225,
    pets_allowed: true,
    pet_fee: 150,
    perfect_for: ["project-crews", "renovation-displacement", "relocating", "remote-workers", "quiet-getaway"],
    amenities: [
      "fully-furnished", "linens-towels", "in-suite-laundry", "wifi", "fast-internet",
      "heat-included", "hydro-included", "water-included", "full-kitchen", "dishwasher",
      "cookware", "coffee-maker", "dining-seating", "wood-stove", "smart-tv", "streaming",
      "workspace", "deck", "bbq", "fire-pit", "driveway-parking", "trailer-parking",
      "pet-friendly", "smoke-free", "long-stay-friendly", "lake-view"
    ],
    highlights: [
      "Whole cottage, three bedrooms, sleeps up to seven",
      "Wood stove with the first cord of wood included",
      "Room on the drive for a work truck and a trailer",
      "Walking distance down to the harbour and the village"
    ],
    house_rules: [
      "No smoking anywhere on the property",
      "Pets welcome with the pet fee agreed in advance",
      "Snow clearing on the drive is included",
      "Quiet after 10 pm — the neighbours here are year-round"
    ]
  },
  {
    ...COMMON,
    slug: "the-hideaway",
    name: "The Hideaway",
    street_address: "4488 East Road",
    unit: "#1",
    latitude: 42.6681,
    longitude: -81.2111,
    property_type: "Duplex unit",
    featured: false,
    headline: "A quiet one-bedroom with its own door, built for one long stay",
    summary:
      "The ground-floor unit at 4488 East Road. One bedroom, private entrance, proper desk and fast internet — the one travel nurses and single contractors take.",
    description: `The Hideaway is the ground-floor half of the duplex at 4488 East Road. One bedroom, one bathroom, a full kitchen and its own entrance from the side of the house, so you are not sharing a hallway with anyone.

It is the smallest thing we rent and the one that suits a single person on contract best. There is a proper desk under the front window, internet quick enough to hold a video call all day, and a washer and dryer inside the unit rather than down a shared set of stairs. The kitchen is small but complete — dishwasher, full-size fridge, everything you need to stop eating out by week two.

Fifteen minutes to St. Thomas Elgin General and about thirty-five to the London hospitals, both on roads that get plowed properly. Parking is at the door, which matters when a shift ends at three in the morning.

No pets in this unit, and it is smoke free throughout.`,
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 3,
    beds: 2,
    square_feet: 620,
    parking_spaces: 1,
    monthly_rate: 1750,
    weekly_rate: 625,
    nightly_rate: 135,
    security_deposit: 1750,
    cleaning_fee: 150,
    pets_allowed: false,
    pet_fee: null,
    perfect_for: ["travel-nurses", "students-coop", "remote-workers", "between-homes"],
    amenities: [
      "fully-furnished", "linens-towels", "in-suite-laundry", "wifi", "fast-internet",
      "heat-included", "hydro-included", "water-included", "full-kitchen", "dishwasher",
      "cookware", "coffee-maker", "microwave", "smart-tv", "workspace", "private-entrance",
      "driveway-parking", "no-pets", "smoke-free", "long-stay-friendly", "monthly-cleaning"
    ],
    highlights: [
      "Private entrance — no shared hallway",
      "Desk and internet built for full working days",
      "Fifteen minutes to St. Thomas Elgin General",
      "Parking at the door for shift work"
    ],
    house_rules: [
      "No smoking anywhere on the property",
      "No pets in this unit",
      "One parking space allocated to this unit",
      "Quiet after 10 pm — there is a tenant upstairs"
    ]
  },
  {
    ...COMMON,
    slug: "the-retreat",
    name: "The Retreat",
    street_address: "4488 East Road",
    unit: "#2",
    latitude: 42.6681,
    longitude: -81.2113,
    property_type: "Duplex unit",
    featured: false,
    headline: "Upper unit, two bedrooms, and the lake through the front windows",
    summary:
      "The upper half of 4488 East Road. Two bedrooms, a balcony on the lake side and its own stair entrance. Pet friendly, utilities in.",
    description: `The Retreat is the upstairs unit at 4488 East Road, and the one worth taking for the windows. Being up the hill and on the first floor puts the lake in view from the living room and the balcony, which in November is a better piece of television than the television.

Two bedrooms, one bathroom, a full kitchen and a living room that fits actual furniture. Its own stair entrance at the side, so it functions as a separate house rather than an apartment. Washer and dryer in the unit. Internet on its own line, not shared with downstairs.

It suits a couple, a pair of colleagues on the same contract, or one person who wants the second room as an office. Dogs are fine here with a fee — and from September the beaches relax their rules, which is most of the reason people bring one.

Heat, hydro, water and Wi-Fi are all in the monthly number.`,
    bedrooms: 2,
    bathrooms: 1,
    sleeps: 4,
    beds: 3,
    square_feet: 880,
    parking_spaces: 2,
    monthly_rate: 2150,
    weekly_rate: 750,
    nightly_rate: 155,
    security_deposit: 2150,
    cleaning_fee: 175,
    pets_allowed: true,
    pet_fee: 125,
    perfect_for: ["travel-nurses", "remote-workers", "between-homes", "relocating", "quiet-getaway"],
    amenities: [
      "fully-furnished", "linens-towels", "in-suite-laundry", "wifi", "fast-internet",
      "heat-included", "hydro-included", "water-included", "full-kitchen", "dishwasher",
      "cookware", "coffee-maker", "microwave", "dining-seating", "smart-tv", "streaming",
      "workspace", "deck", "lake-view", "private-entrance", "driveway-parking",
      "pet-friendly", "smoke-free", "long-stay-friendly"
    ],
    highlights: [
      "Lake view from the living room and the balcony",
      "Two bedrooms — use the second as an office",
      "Own stair entrance, own internet line",
      "Dog friendly, and the off-season beaches are too"
    ],
    house_rules: [
      "No smoking anywhere on the property",
      "Dogs welcome with the pet fee agreed in advance",
      "Two parking spaces allocated to this unit",
      "Quiet after 10 pm — there is a tenant below"
    ]
  },
  {
    ...COMMON,
    slug: "the-lookout",
    name: "The Lookout",
    street_address: "479 George Street",
    unit: null,
    latitude: 42.6656,
    longitude: -81.2168,
    property_type: "House",
    featured: true,
    headline: "A whole village house you can walk everywhere from",
    summary:
      "Three bedrooms on George Street, in the village itself. Fenced yard, fireplace, and the beach, the harbour and the shops all on foot. Sleeps six.",
    description: `The Lookout is in the village rather than up on the road above it, which changes what the winter feels like. The groceries, the coffee, the post office and the pier are all a walk away, and you can leave the car on the drive for days at a time.

It is a proper three-bedroom house — two bathrooms, a separate dining room, a living room with a fireplace, and a fenced back yard that means a dog can be let out rather than walked at eleven at night. Full laundry, dishwasher, and enough space that a family displaced by a renovation does not spend three months on top of each other.

That is the job it does best. Most of the people who take The Lookout are here because their own house is a job site, or because a sale closed before the purchase did. It is furnished to a standard where you can live in it for a season without feeling like you are camping in somebody else's holiday home.

Fifteen minutes to St. Thomas, thirty-five to London, and Main Beach at the end of the street in a way that is very hard to explain to anyone who has only been here in August.`,
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 6,
    beds: 4,
    square_feet: 1550,
    parking_spaces: 2,
    monthly_rate: 2850,
    weekly_rate: 950,
    nightly_rate: 195,
    security_deposit: 2850,
    cleaning_fee: 250,
    pets_allowed: true,
    pet_fee: 150,
    perfect_for: ["renovation-displacement", "between-homes", "project-crews", "relocating", "quiet-getaway"],
    amenities: [
      "fully-furnished", "linens-towels", "in-suite-laundry", "wifi", "fast-internet",
      "heat-included", "hydro-included", "water-included", "full-kitchen", "dishwasher",
      "cookware", "coffee-maker", "microwave", "dining-seating", "fireplace",
      "forced-air-gas", "air-conditioning", "smart-tv", "streaming", "workspace",
      "deck", "bbq", "fenced-yard", "walk-to-beach", "walk-to-village",
      "driveway-parking", "pet-friendly", "smoke-free", "long-stay-friendly", "monthly-cleaning"
    ],
    highlights: [
      "In the village — beach, harbour and shops all on foot",
      "Fenced back yard, so the dog goes out rather than for a walk",
      "Three bedrooms and a separate dining room",
      "Set up for families out of their own house for a season"
    ],
    house_rules: [
      "No smoking anywhere on the property",
      "Pets welcome with the pet fee agreed in advance",
      "Bins go out Tuesday night — the village is strict about it",
      "Quiet after 10 pm"
    ]
  }
];

async function main() {
  const res = await fetch(`${URL_BASE}/rest/v1/osr_properties?on_conflict=slug`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify(PROPERTIES)
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`Seed failed (${res.status}):`, text.slice(0, 800));
    process.exit(1);
  }

  const rows = JSON.parse(text);
  console.log(`Seeded ${rows.length} properties:`);
  for (const r of rows) console.log(`  ${r.slug.padEnd(14)} ${r.status.padEnd(10)} ${r.name}`);
  console.log("\nAll four are DRAFT. Confirm the rates and specs in /admin, then publish.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
