import data from "@/content/brands.json";

export interface BrandSource {
  label: string;
  url: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** This store. */
  ours?: boolean;
  /** Same parent company as this store; always disclosed where it is shown. */
  sister?: boolean;
  group: "dealer" | "diy-track" | "string";
  from: string;
  sold: string;
  mount: string;
  light: string;
  warranty: string;
  price: string;
  facts: string[];
  fit: string;
  watch: string;
  sources: BrandSource[];
}

export interface BrandGroup {
  key: Brand["group"];
  name: string;
  summary: string;
}

export const BRANDS = data.brands as Brand[];
export const BRAND_GROUPS = data.groups as BrandGroup[];
export const BRANDS_ALSO = data.alsoSold as { name: string; note: string; url: string }[];
/** ISO date the competitor facts were last checked against the makers' pages. */
export const BRANDS_CHECKED: string = data.checked;

export const brandsCheckedLong = () =>
  new Date(BRANDS_CHECKED + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export const brandsIn = (group: Brand["group"]) => BRANDS.filter((b) => b.group === group);
