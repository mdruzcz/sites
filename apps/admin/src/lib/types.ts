// Shared types for the admin app. These mirror the ecom_* tables in Supabase.
// (For full generated types, run `supabase gen types typescript` later.)

export type ProductStatus = "draft" | "active" | "archived";
export type OrderStatus =
  | "cart"
  | "pending_payment"
  | "paid"
  | "on_hold"
  | "fulfilled"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
export type CustomerStatus = "pending" | "approved" | "rejected" | "suspended";
export type ApplicationStatus = "pending" | "approved" | "rejected";
export type PaymentMethod = "card" | "invoice" | "manual";

export interface Store {
  id: string;
  slug: string;
  name: string;
  domain: string;
  currency: string;
  support_email: string;
  free_shipping_threshold_cad: number;
  ship_from_postal_code: string | null;
  origin_country: string;
  status: string;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  id: string;
  slug: "public" | "installer" | "municipality" | string;
  name: string;
  description: string | null;
  requires_approval: boolean;
  tax_exempt_eligible: boolean;
  allow_invoice: boolean;
  sort_order: number;
}

export interface Category {
  id: string;
  store_id: string;
  parent_id: string | null;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  store_id: string;
  slug: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  status: ProductStatus;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  public_url: string | null;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
  source_url: string | null;
}

export interface Variant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  position: number;
  price_cad: number;
  compare_at_price_cad: number | null;
  cost_cad: number | null;
  weight_grams: number | null;
  attribute_type: string | null;
  attribute_value: string | null;
  is_active: boolean;
}

export interface Inventory {
  variant_id: string;
  on_hand: number;
  reserved: number;
  low_stock_threshold: number;
  track_inventory: boolean;
  allow_backorder: boolean;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  company_name: string | null;
  tier_id: string;
  status: CustomerStatus;
  tax_exempt: boolean;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface B2BApplication {
  id: string;
  customer_id: string | null;
  requested_tier_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string | null;
  years_experience: string | null;
  annual_volume: string | null;
  website: string | null;
  additional_info: string | null;
  status: ApplicationStatus;
  rejection_reason: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  store_id: string;
  customer_id: string | null;
  order_number: string;
  status: OrderStatus;
  email: string;
  phone: string | null;
  subtotal_cad: number;
  shipping_cad: number;
  tax_cad: number;
  discount_cad: number;
  total_cad: number;
  payment_method: PaymentMethod;
  tracking_number: string | null;
  customer_note: string | null;
  created_at: string;
  placed_at: string | null;
}
