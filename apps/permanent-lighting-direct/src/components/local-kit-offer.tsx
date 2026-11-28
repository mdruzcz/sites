import { FREE_RADIUS_KM, LOCAL_KIT_PROMO, SHOP, localKitPromoActive } from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

/**
 * Southwestern Ontario offer: kits delivered within the free-shipping radius are
 * 10% off at checkout (see LOCAL_KIT_PROMO in lib/orders/policy.ts). Renders
 * nothing once the promo has ended, so no copy needs removing afterwards.
 */
export function LocalKitOffer({ price, className = "" }: { price?: number; className?: string }) {
  if (!localKitPromoActive()) return null;
  const saving = price ? Math.round((price * LOCAL_KIT_PROMO.pct) / 100) : null;
  return (
    <div className={`rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ${className}`}>
      <p className="font-semibold">
        Southwestern Ontario: {LOCAL_KIT_PROMO.pct}% off kits{saving ? ` (save ${formatCad(saving, 0)})` : ""} + free delivery
      </p>
      <p className="mt-1 text-emerald-800">
        For delivery within {FREE_RADIUS_KM} km of our {SHOP.town} shop: London, St. Thomas, Woodstock, Kitchener-Waterloo, Sarnia, Windsor,
        Hamilton and more. Taken off automatically at checkout when you enter your postal code. Ends {LOCAL_KIT_PROMO.endsLabel}.
      </p>
    </div>
  );
}
