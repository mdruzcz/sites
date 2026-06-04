import Link from "next/link";
import Image from "next/image";
import type { Cabinet } from "@/lib/catalog";

export default function CabinetCard({ cabinet }: { cabinet: Cabinet }) {
  const img = cabinet.images[0] ?? "/images/placeholder.svg";
  return (
    <Link
      href={`/cabinets/${cabinet.slug}`}
      className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square bg-sand overflow-hidden">
        <Image
          src={img}
          alt={`${cabinet.name} - White Shaker RTA cabinet (SKU ${cabinet.sku})`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-3 md:p-4">
        <p className="text-xs text-accent font-medium mb-1">{cabinet.group_label}</p>
        <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-2 group-hover:text-accent">
          {cabinet.name}
        </h3>
        <p className="font-semibold">
          {cabinet.price_cad !== null
            ? `$${cabinet.price_cad.toFixed(2)}`
            : "Request a quote"}
        </p>
      </div>
    </Link>
  );
}
