import Link from "next/link";
import Image from "next/image";
import type { KitchenPackage } from "@/lib/catalog";
import { KITCHEN_SALE, discounted, formatMoney } from "@/lib/sale";
import { SaleBadge } from "./SaleBadge";

export default function PackageCard({ pkg }: { pkg: KitchenPackage }) {
  const sale = discounted(pkg.subtotal_cad, KITCHEN_SALE.pct);
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
        <SaleBadge text={KITCHEN_SALE.badge} className="absolute right-3 top-3 -rotate-6" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-accent">{pkg.name}</h3>
        <p className="text-sm text-ink-soft mb-3 line-clamp-2">{pkg.tagline}</p>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-bold text-red-700">{pkg.from_price ? "from " : ""}{formatMoney(sale)} CAD</span>
          <s className="text-sm text-ink-soft">{formatMoney(pkg.subtotal_cad)}</s>
          <span className="text-xs font-semibold text-red-700">Save {formatMoney(pkg.subtotal_cad - sale)}</span>
        </p>
      </div>
    </Link>
  );
}
