import { kits, kitLightCount, kitTrackFeet } from "@/lib/kits";
import { ARTICLES as articles } from "@/lib/resources";
import { INSTALL_CITIES } from "@/lib/installation";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

/** Plain-text summary for AI crawlers and answer engines. */
export function GET() {
  const lines = [
    "# Illumi Track Lights",
    "",
    "> Illumi Track Lights, London, Ontario: permanent LED soffit track lighting. Complete 12V kits (aluminum track, RGBW pucks, WLED WiFi controller) shipped across Canada, every part sold separately, and professional installation by our own crew across Southwestern Ontario. Free shipping over $500 CAD. 5-year parts warranty. All products are 12V.",
    "",
    "## Kits (CAD, kit only, DIY install)",
    ...kits.map((k) => `- ${k.feet} ft kit: $${k.price.toFixed(2)} — ${kitLightCount(k)} RGBW pucks, ${kitTrackFeet(k)} ft aluminum track, WiFi controller, ${k.bom.powerSupply} × 12V power supply, connectors, colour-matched screws. Installed by our crew: $${k.installedLow.toFixed(2)}–$${k.installedHigh.toFixed(2)}. ${SITE_URL}/product/${k.slug}`),
    "",
    "## Key facts",
    "- Track colours: black, white, wicker, brown (colour-matched 5/8-inch soffit screws included)",
    "- Pucks: 12V RGBW, about 46 lumens and 0.3 W each, IP68, tested to −40 °C, 50,000-hour rated, 5 per 42-inch track piece",
    "- Control: WLED WiFi controller, free Android/iOS app, 16M colours + dedicated warm white, scenes, schedules, sunset triggers, zones, Alexa/Google; scenes run offline",
    "- Power: CSA Class 2 low voltage, plugs into a GFCI outlet; power injection every ~120 pucks on long runs",
    "- Shipping: from London, Ontario within 1–2 business days; free over $500 across Canada; no US shipping",
    "- Returns: 30 days, unused, original packaging. Warranty: 5 years on parts.",
    "",
    "## Professional installation (Southwestern Ontario)",
    ...INSTALL_CITIES.map((c) => `- ${c.city}: ${SITE_URL}/installation/${c.slug}`),
    "",
    "## Pages",
    `- Kits: ${SITE_URL}/diy-kits`,
    `- Shop all parts: ${SITE_URL}/shop`,
    `- How it works: ${SITE_URL}/how-it-works`,
    `- DIY vs professional comparison: ${SITE_URL}/compare`,
    `- Gallery: ${SITE_URL}/gallery`,
    `- FAQ: ${SITE_URL}/faq`,
    `- Professional installation: ${SITE_URL}/installation`,
    `- Find an installer: ${SITE_URL}/installers`,
    `- About: ${SITE_URL}/about`,
    `- Installer program: ${SITE_URL}/professional-installer`,
    `- Warranty: ${SITE_URL}/warranty`,
    `- Contact: ${SITE_URL}/contact-us`,
    "",
    "## Guides",
    ...articles.map((a) => `- ${a.title}: ${SITE_URL}/resources/${a.slug}`),
    ""
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
