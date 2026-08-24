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

  /** Off-season pricing. Monthly is the headline number; the rest are optional. */
  monthly_rate: number | null;
  weekly_rate: number | null;
  nightly_rate: number | null;
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

  created_at: string;
  updated_at: string;

  photos: PropertyPhoto[];
}

/** The shape the admin form posts. Everything optional except the essentials. */
export type PropertyInput = Partial<Omit<Property, "id" | "photos" | "created_at" | "updated_at">> & {
  name: string;
  slug: string;
};
