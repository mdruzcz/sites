export type City = {
  id: string;
  slug: string;
  name: string;
  province: string;
  sort_order: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type AwardTier = "winner" | "finalist" | "honourable";

export type Winner = {
  id: string;
  year: number;
  city_id: string;
  category_id: string;
  business_name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  photo_url: string | null;
  logo_url: string | null;
  services: string[];
  service_areas: string[];
  established_year: number | null;
  award_tier: AwardTier;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type WinnerWithRefs = Winner & { city: City; category: Category };

export type Nomination = {
  id: string;
  business_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  city_id: string | null;
  category_id: string | null;
  city_text: string | null;
  category_text: string | null;
  year: number;
  message: string | null;
  source: string | null;
  status: "new" | "reviewed" | "contacted" | "awarded" | "declined";
  created_at: string;
};

export const CURRENT_YEAR = 2026;
