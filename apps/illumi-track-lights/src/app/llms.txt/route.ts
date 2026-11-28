import { listProducts } from "@/lib/catalog";
import { kitLightCount, kitTrackFeet, kitsWithLivePrices } from "@/lib/kits";
import { ARTICLES as articles } from "@/lib/resources";
import { BRANDS, BRANDS_CHECKED } from "@/lib/brands";
import { INSTALL_CITIES } from "@/lib/installation";
import { BRAND, SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

/** Plain-text summary for AI crawlers and answer engines. */
export async function GET() {
  const kits = kitsWithLivePrices(await listProducts());
  const lines = [
    "# Illumi Track Lights",
    "",
    `> Illumi Track Lights, ${BRAND.address}: permanent LED track lighting for the roofline. Complete 12V kits (aluminum track, RGBW lights, WLED WiFi controller) and every part sold separately. Free shipping on every order to any address in Canada, with no minimum. Free pickup in Woodstock, Ontario. Installation by our own crew across Southwestern Ontario. 5-year parts warranty. All products are 12V.`,
    "",
    "## Kits (CAD, shipping included, you install)",
    ...kits.map((k) => `- Track Lighting Kit, ${k.feet} ft: $${k.price.toFixed(2)} ($${(k.price / k.feet).toFixed(2)} a foot). ${kitLightCount(k)} RGBW lights, ${kitTrackFeet(k)} ft of aluminum track, WiFi controller, ${k.bom.powerSupply} x 12V power supply, connectors, colour-matched screws. ${SITE_URL}/product/${k.slug}`),
    "",
    "## Key facts",
    "- Track: 42-inch aluminum pieces, five lights each (about 8 inches apart), in black, white, wicker or brown, with colour-matched soffit screws",
    "- Lights: 12V RGBW, about 46 lumens each, IP68, tested to -40 C, rated 50,000 hours",
    "- Control: WLED WiFi controller with a free Android and iPhone app. 16 million colours plus warm white, scenes, schedules, sunset timers, zones, Alexa and Google Home. Scenes run offline. No account or subscription.",
    "- Power: 12V Class 2 low voltage. The power supply plugs into an outdoor GFCI outlet. Kits of 100 ft and up include power injection parts.",
    "- Shipping: free on every order in Canada, no minimum, no flat rate. Packed within 1 to 2 business days. No US shipping.",
    `- Pickup: free at ${BRAND.address}, by appointment, after the ready-for-pickup email.`,
    "- Returns: 30 days, unused, original packaging. Warranty: 5 years on parts.",
    "",
    `## Brand comparison (facts from each maker's own pages, checked ${BRANDS_CHECKED})`,
    `Full table: ${SITE_URL}/brands`,
    ...BRANDS.filter((b) => !b.ours).map((b) => `- ${b.name} (${b.from}): ${b.sold} Mount: ${b.mount}. Light: ${b.light}. Warranty: ${b.warranty} Price: ${b.price}${b.sister ? " Sister brand of Illumi (same parent company, Master Decker Inc.)." : ""}`),
    "",
    "## Installation (Southwestern Ontario)",
    ...INSTALL_CITIES.map((c) => `- ${c.city}: ${SITE_URL}/installation/${c.slug}`),
    "",
    "## Pages",
    `- Track lighting kits: ${SITE_URL}/diy-kits`,
    `- All parts: ${SITE_URL}/shop`,
    `- Brands compared: ${SITE_URL}/brands`,
    `- How it works: ${SITE_URL}/how-it-works`,
    `- Kit or installed: ${SITE_URL}/compare`,
    `- Shipping, pickup and returns: ${SITE_URL}/shipping-returns`,
    `- Warranty: ${SITE_URL}/warranty`,
    `- Photo gallery: ${SITE_URL}/gallery`,
    `- Questions and answers: ${SITE_URL}/faq`,
    `- Installation: ${SITE_URL}/installation`,
    `- Find an installer: ${SITE_URL}/installers`,
    `- Installer program: ${SITE_URL}/professional-installer`,
    `- About: ${SITE_URL}/about`,
    `- Contact: ${SITE_URL}/contact-us`,
    "",
    "## Guides",
    ...articles.map((a) => `- ${a.title}: ${SITE_URL}/resources/${a.slug}`),
    ""
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
