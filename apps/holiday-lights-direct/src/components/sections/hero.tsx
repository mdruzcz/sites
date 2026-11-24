import { photo, type PhotoKey } from "@/lib/photos";
import { HeroStage, type HeroScene } from "@/components/sections/hero-stage";

/**
 * The scenes offered on the hero. These are different homes fitted with the
 * same kind of aluminum-tracked RGBW system, so the captions describe the
 * colour scene rather than claiming it is one house restyled.
 */
const SCENES: { key: PhotoKey; label: string; caption: string; swatch: string; position?: string }[] = [
  {
    key: "track-security-white",
    label: "Warm white",
    caption: "warm white on the roofline, the everyday setting.",
    swatch: "#ffd9a3",
    position: "center 58%"
  },
  {
    key: "home-install-1",
    label: "Christmas",
    caption: "a multicolour Christmas scene, set from the app.",
    swatch: "conic-gradient(#e23b32, #f2b21b, #2f9e58, #2f6fe0, #e23b32)",
    position: "center 55%"
  },
  {
    key: "home-blue-app-control",
    label: "Winter blue",
    caption: "ice blue across every roofline on a winter evening.",
    swatch: "#7fc4ff",
    position: "center 60%"
  },
  {
    key: "install-banner",
    label: "Rainbow",
    caption: "a full-spectrum rainbow scene running the eaves.",
    swatch: "linear-gradient(135deg, #ff4f9a, #ffb020, #33c26b, #3a8bff, #9a5cff)",
    position: "center 45%"
  }
];

export function Hero() {
  const scenes: HeroScene[] = SCENES.map((s) => {
    const p = photo(s.key);
    return {
      key: s.key,
      label: s.label,
      caption: s.caption,
      swatch: s.swatch,
      position: s.position,
      src: p.src,
      alt: p.alt,
      blurDataURL: p.blurDataURL
    };
  });

  return <HeroStage scenes={scenes} />;
}
