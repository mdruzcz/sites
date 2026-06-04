import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getPackages } from "@/lib/catalog";
import PackageCard from "@/components/PackageCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Complete White Shaker Kitchen Packages",
  description:
    "Shop complete White Shaker RTA kitchen packages — 10x10, 10x12 and 12x12 layouts with base, wall, drawer and pantry cabinets. Add to quote and ship Canada-wide.",
  alternates: { canonical: "/kitchen-packages" },
  openGraph: {
    title: "Complete White Shaker Kitchen Packages",
    description:
      "Preset 10x10, 10x12 and 12x12 White Shaker RTA kitchen packages, shipped across Canada.",
  },
};

export default function KitchenPackagesPage() {
  const packages = getPackages();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "White Shaker Kitchen Packages",
    url: `${site.url}/kitchen-packages`,
    description: "Complete preset White Shaker RTA kitchen packages.",
  };
  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-2">Kitchen Packages</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Complete White Shaker kitchens, priced as a package. Pick a layout, add it
        to your quote, and we&apos;ll confirm taxes and shipping anywhere in Canada.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((p) => (
          <PackageCard key={p.slug} pkg={p} />
        ))}
      </div>
    </div>
  );
}
