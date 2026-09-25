import { BRAND, SITE_URL } from "@/lib/utils";
import type { VzSiteConfig } from "./server";

export const VZ_SITE: VzSiteConfig = {
  site: "pld",
  siteName: BRAND.name,
  domain: "permanentlightingdirect.ca",
  baseUrl: SITE_URL,
  phone: undefined,
  path: "/visualizer",
};
