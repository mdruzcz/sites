import Image from "next/image";
import Link from "next/link";
import { listProducts, primaryImage, priceRange } from "@/lib/catalog";
import { formatCad } from "@/lib/utils";
import { QuickAddButton } from "@/components/quick-add-button";

/**
 * "Don't get caught short" strip on the cart page: the parts a roofline most
 * often needs beyond the kit, each with a one-click add. Order = pitch priority.
 */
const UPSELL_SLUGS = [
  "12v-led-puck-lights-10-pack",
  "20-foot-connector-for-12-24v-led-lights",
  "t-power-injection-connector-for-12-24v-led",
  "amplifier-for-12v-led-lights",
  "aluminum-track-12v-led-lights-2-pack",
  "20ft-power-inj-extension-cable"
];

const PITCH: Record<string, string> = {
  "12v-led-puck-lights-10-pack": "Ten spare pucks (two strands). The part people run short on most — stock is limited.",
  "20-foot-connector-for-12-24v-led-lights": "Carry the run across a garage door, breezeway or wide gap.",
  "t-power-injection-connector-for-12-24v-led": "Feed power into a long run so the far end stays bright.",
  "amplifier-for-12v-led-lights": "Keeps the far pucks in sync on 100 ft+ of total cable.",
  "aluminum-track-12v-led-lights-2-pack": "Two more 42-inch channels for a dormer, corner or a cut gone wrong.",
  "20ft-power-inj-extension-cable": "Another 20 ft between the outlet and where the lights start."
};

export async function CartUpsells({ hasKit, exclude = [] }: { hasKit: boolean; exclude?: string[] }) {
  const all = await listProducts();
  const picks = UPSELL_SLUGS
    .filter((s) => !exclude.includes(s))
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p && p.status === "active");
  if (!picks.length) return null;

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent-dark)]">Add-on parts</p>
      <h2 className="mt-1 text-lg font-semibold">{hasKit ? "Don't get caught short on install day" : "Popular add-on parts"}</h2>
      <p className="mt-1 text-sm text-slate-500">
        Most rooflines need one or two extras the kit can&apos;t predict. Add them now and they ship in the same box.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => {
          const img = primaryImage(p);
          const range = priceRange(p);
          const variants = (p.ecom_variants ?? []).filter((v) => v.is_active);
          const single = variants.length === 1 ? variants[0] : null;
          return (
            <li key={p.slug} className="flex flex-col rounded-md border border-slate-200 p-3">
              <div className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded bg-slate-50">
                  {img?.public_url && <Image src={img.public_url} alt={img.alt_text || p.name} fill sizes="64px" className="object-contain p-1" />}
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${p.slug}`} className="text-sm font-semibold leading-snug hover:text-[var(--color-accent-dark)]">{p.name}</Link>
                  <p className="mt-1 text-sm font-semibold">{range ? formatCad(range.min, 2) : "—"}</p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{PITCH[p.slug]}</p>
              <div className="mt-auto pt-3">
                {single ? (
                  <QuickAddButton variantId={single.id} label="Add to cart" />
                ) : (
                  <Link href={`/product/${p.slug}`} className="btn-secondary inline-flex w-full items-center justify-center text-sm">Choose colour</Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-slate-400">
        Current inventory is limited and the next production run ships by air, so a-la-carte parts are priced accordingly. Kits are allocated first-come, first-served.
      </p>
    </section>
  );
}
