import Link from "next/link";
import Image from "next/image";
import type { Cabinet } from "@/lib/catalog";
import type { StockInfo } from "@/lib/inventory";

export function StockLine({ stock, comingSoon, className = "" }: { stock?: StockInfo; comingSoon?: boolean; className?: string }) {
  if (comingSoon) return <p className={`text-xs font-medium text-accent-dark ${className}`}>Coming soon — not yet orderable</p>;
  if (!stock) return null;
  if (!stock.in_stock) return <p className={`text-xs font-semibold text-red-700 ${className}`}>Out of stock</p>;
  if (stock.low_stock) return <p className={`text-xs font-medium text-amber-700 ${className}`}>Only {stock.on_hand} left</p>;
  return <p className={`text-xs font-medium text-success ${className}`}>{stock.on_hand} in stock</p>;
}

export default function CabinetCard({ cabinet, stock }: { cabinet: Cabinet; stock?: StockInfo }) {
  const img = cabinet.images[0] ?? "/images/placeholder.svg";
  const comingSoon = !!cabinet.coming_soon;
  const outOfStock = !comingSoon && stock ? !stock.in_stock : false;
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
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${outOfStock ? "opacity-70 grayscale-[35%]" : ""}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {comingSoon && (
          <span className="absolute left-0 top-3 rounded-r-md bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
            Coming soon
          </span>
        )}
        {outOfStock && (
          <span className="absolute left-0 top-3 rounded-r-md bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
            Out of stock
          </span>
        )}
        {comingSoon && cabinet.height_in === 30 && (
          <span className="absolute bottom-2 right-2 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ink">30″ tall</span>
        )}
      </div>
      <div className="p-3 md:p-4">
        <p className="text-xs text-accent font-medium mb-1">{cabinet.group_label}</p>
        <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-2 group-hover:text-accent">
          {cabinet.name}
        </h3>
        <p className="font-semibold">
          {comingSoon ? "Price to be announced" : cabinet.price_cad !== null ? `$${cabinet.price_cad.toFixed(2)}` : "Request a quote"}
        </p>
        <StockLine stock={stock} comingSoon={comingSoon} className="mt-1" />
      </div>
    </Link>
  );
}
