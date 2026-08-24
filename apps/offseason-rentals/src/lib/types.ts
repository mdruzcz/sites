/** A single photo attached to a property. Ordered by `position`. */
export interface PropertyPhoto {
  id: string;
  property_id: string;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  position: number;
}

export type PropertyStatus = "published" | "draft";

/**
 * The full listing record. Mirrors the `osr_properties` table one-for-one so
 * the admin can round-trip a row without a translation layer.
 */
export interface Property {
  id: string;
  slug: string;
  /** Marketing name — "The Escape". */
  name: string;
  /** Civic address — "4490 East Road". */
  street_address: string;
  /** Unit designator for multiplexes — "#1". Null for whole homes. */
  unit: string | null;
  city: string;
  region: string;
  postal_code: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;

  property_type: string;
  headline: string;
  /** One or two sentences. Doubles as the card blurb and meta description. */
  summary: string;
  /** Long-form body copy. Blank lines separate paragraphs. */
  description: string;

  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  beds: number | null;
  square_feet: number | null;
  parking_spaces: number | null;

  /** Off-season pricing. The list price; struck through when discounted. */
  monthly_rate: number | null;
  weekly_rate: number | null;
  nightly_rate: number | null;
  /** What the renter actually pays, when the owner is running an offer. */
  discount_monthly_rate: number | null;
  discount_weekly_rate: number | null;
  /** Short reason shown beside the price — "Winter special". */
  discount_note: string | null;
  min_stay_nights: number;
  security_deposit: number | null;
  cleaning_fee: number | null;
  utilities_included: boolean;
  wifi_included: boolean;
  pets_allowed: boolean;
  pet_fee: number | null;
  smoking_allowed: boolean;

  /** Availability window, stored as free text so owners can say "Oct 1". */
  available_from: string | null;
  available_to: string | null;

  status: PropertyStatus;
  featured: boolean;
  /** Audience slugs from src/content/audiences.json. */
  perfect_for: string[];
  amenities: string[];
  /** Short scannable bullets — "Six-minute walk to Main Beach". */
  highlights: string[];
  house_rules: string[];

  /** Set when the listing was imported from a VRBO or Airbnb URL. */
  source_url: string | null;

  /**
   * Package state. Null owner_id means one of the house listings — no tier, no
   * expiry, ranked with Gold.
   */
  owner_id: string | null;
  package_tier: Tier | null;
  package_status: PackageStatus;
  package_started_at: string | null;
  package_expires_at: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  rejection_note: string | null;
  /** Lower sorts first. gold/house 10, silver 20, bronze 30. */
  sort_rank: number;

  created_at: string;
  updated_at: string;

  photos: PropertyPhoto[];
}

export type Tier = "bronze" | "silver" | "gold";

export type PackageStatus =
  | "none"
  | "draft"
  | "submitted"
  | "awaiting_payment"
  | "active"
  | "expired"
  | "rejected";

export interface PackageOrder {
  id: string;
  owner_id: string | null;
  property_id: string | null;
  tier: Tier;
  price_cad: number;
  status: "invoiced" | "paid" | "cancelled" | "refunded";
  invoiced_at: string;
  paid_at: string | null;
  expires_at: string | null;
  note: string | null;
  created_at: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/** The shape the admin form posts. Everything optional except the essentials. */
export type PropertyInput = Partial<Omit<Property, "id" | "photos" | "created_at" | "updated_at">> & {
  name: string;
  slug: string;
};
