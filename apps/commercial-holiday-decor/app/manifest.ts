import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Holiday Decor",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#14432f",
    lang: "en-CA",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
