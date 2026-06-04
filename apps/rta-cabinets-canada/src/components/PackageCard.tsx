import Link from "next/link";
import Image from "next/image";
import type { KitchenPackage } from "@/lib/catalog";

export default function PackageCard({ pkg }: { pkg: KitchenPackage }) {
  return (
    <Link
      href={`/kitchen-packages/${pkg.slug}`}
      className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-sand overflow-hidden">
        <Image
          src={pkg.hero_image || "/images/placeholder.svg"}
          alt={`${pkg.name} - complete White Shaker RTA kitchen`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-accent">{pkg.name}</h3>
        <p className="text-sm text-ink-soft mb-3 line-clamp-2">{pkg.tagline}</p>
        <p className="font-bold text-accent">
          {pkg.from_price ? "from " : ""}$
          {pkg.subtotal_cad.toLocaleString("en-CA", { minimumFractionDigits: 2 })} CAD
        </p>
      </div>
    </Link>
  );
}
