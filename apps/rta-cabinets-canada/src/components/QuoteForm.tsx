"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { useCart } from "@/lib/ui-context";
import { site } from "@/lib/site";
import { getCabinet, getPackage } from "@/lib/catalog";
import { formatMoney } from "@/lib/sale";
import { clearAttachment, readAttachment, type DesignAttachment } from "@/lib/planner/attach";
import { SaleBadge } from "./SaleBadge";

const ASSEMBLY_KEY = "rta-assembly-v1";

/** Cabinets that need assembling (boxes only — trim/fillers/panels don't count). */
function assemblyUnitsFor(items: ReturnType<typeof useCart>["items"]): number {
  let n = 0;
  for (const i of items) {
    if (i.kind === "package") {
      const pkg = getPackage(i.slug);
      if (pkg) for (const it of pkg.items) if (!/^(WF|TK|RRP|DWP|Scribe|Light Rail|Outside|Corbel|48|Touch|Stem|Sample|WHITE)/i.test(it.sku)) n += it.qty * i.qty;
    } else {
      const cab = getCabinet(i.slug);
      if (cab && cab.group !== "accessories") n += i.qty;
    }
  }
  return n;
}

export default function QuoteForm() {
  const { items, subtotal, listSubtotal, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [design, setDesign] = useState<DesignAttachment | null>(null);
  const [assemble, setAssemble] = useState(false);
  const [financing, setFinancing] = useState(false);

  useEffect(() => {
    setDesign(readAttachment());
    try {
      setAssemble(localStorage.getItem(ASSEMBLY_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(ASSEMBLY_KEY, assemble ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [assemble]);

  const assemblyUnits = useMemo(() => assemblyUnitsFor(items), [items]);
  const assemblyTotal = assemble ? assemblyUnits * site.assemblyPerCabinet : 0;
  const saved = Math.max(0, Math.round((listSubtotal - subtotal) * 100) / 100);
  const total = subtotal + assemblyTotal;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      postal: formData.get("postal"),
      notes: formData.get("message"),
      company: formData.get("company"),
      items: items.map((i) => ({
        id: i.slug,
        name: i.name,
        price: i.price_cad,
        list_price: i.list_price_cad ?? null,
        sale_label: i.sale_label ?? null,
        qty: i.qty,
        kind: i.kind,
      })),
      assembly: assemble ? { units: assemblyUnits, rate: site.assemblyPerCabinet, total: assemblyTotal } : null,
      financing,
      savings: saved,
      token,
      design: design ? { name: design.name, link: design.link, summary: design.summary, notes: design.notes } : undefined,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      clear();
      clearAttachment();
      router.push("/request/submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const input = "w-full border border-border rounded-md px-3 py-2 min-h-[44px] bg-white";

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          {design && (
            <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-accent-soft p-3 text-sm">
              <span aria-hidden="true">📐</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">Kitchen plan attached: {design.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{design.summary}</p>
                <p className="mt-1 text-xs">
                  <Link href={design.link} target="_blank" className="text-accent font-medium underline">
                    Open plan
                  </Link>
                  <span className="mx-2 text-border">|</span>
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      clearAttachment();
                      setDesign(null);
                    }}
                  >
                    Remove
                  </button>
                </p>
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <input id="name" name="name" required autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input} />
            </div>
            <div>
              <label htmlFor="postal" className="block text-sm font-medium mb-1">
                Postal Code
              </label>
              <input id="postal" name="postal" autoComplete="postal-code" placeholder="For free-delivery check" className={input} />
            </div>
          </div>
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <fieldset className="rounded-lg border border-border bg-white p-4 space-y-3">
            <legend className="px-1 text-sm font-semibold">Options</legend>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4" checked={assemble} onChange={(e) => setAssemble(e.target.checked)} disabled={assemblyUnits === 0} />
              <span className="text-sm">
                <span className="font-medium">Assemble my cabinets</span> — expert assembly, ${site.assemblyPerCabinet} per cabinet
                {assemblyUnits > 0 ? (
                  <span className="text-ink-soft">
                    {" "}
                    ({assemblyUnits} cabinet{assemblyUnits === 1 ? "" : "s"} = {formatMoney(assemblyUnits * site.assemblyPerCabinet)})
                  </span>
                ) : (
                  <span className="text-ink-soft"> (add cabinets first)</span>
                )}
                <span className="block text-xs text-ink-soft mt-0.5">
                  Delivered built, squared and ready to hang. <Link href="/assembly-service" className="underline">Details</Link>
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4" checked={financing} onChange={(e) => setFinancing(e.target.checked)} />
              <span className="text-sm">
                <span className="font-medium">Send me 0% APR financing details</span>
                <span className="block text-xs text-ink-soft mt-0.5">
                  On approved credit, for complete kitchens. <Link href="/financing" className="underline">How it works</Link>
                </span>
              </span>
            </label>
          </fieldset>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea id="message" name="message" rows={4} placeholder="Tell us about your project, timeline, a competitor price to match, or any questions." className="w-full border border-border rounded-md px-3 py-2 bg-white" />
          </div>
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} options={{ theme: "light" }} onSuccess={(t: string) => setToken(t)} />}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={submitting || items.length === 0} className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium disabled:opacity-50 min-h-[48px] w-full sm:w-auto">
            {submitting ? "Processing..." : "Request Quote"}
          </button>
          <p className="text-xs text-ink-soft">
            We&apos;ll review your list and email a written quote within one business day. Free delivery within {site.freeDeliveryKm} km of London, Ontario. By submitting you agree to our{" "}
            <Link href="/privacy-policy" className="underline">privacy policy</Link>.
          </p>
        </form>
      </div>

      <aside className="lg:col-span-2">
        <div className="bg-sand border border-border rounded-lg p-5 sticky top-20">
          <h2 className="font-semibold mb-4">Your Quote ({items.reduce((n, i) => n + i.qty, 0)} items)</h2>
          {items.length === 0 ? (
            <p className="text-sm text-ink-soft">
              Your quote cart is empty. <Link href="/shop" className="text-accent underline">Shop cabinets</Link> or <Link href="/planner" className="text-accent underline">design a kitchen</Link>.
            </p>
          ) : (
            <ul className="space-y-3 mb-4">
              {items.map((i) => {
                const onSale = i.price_cad !== null && i.list_price_cad != null && i.list_price_cad > i.price_cad;
                return (
                  <li key={i.slug} className="flex justify-between text-sm gap-2">
                    <span className="min-w-0">
                      {i.qty}× {i.name}
                      {i.kind === "package" && <span className="text-xs text-accent"> (package)</span>}
                      {onSale && (
                        <span className="block mt-0.5">
                          <SaleBadge text={i.sale_label ?? "Sale"} size="sm" />
                        </span>
                      )}
                    </span>
                    <span className="whitespace-nowrap text-right">
                      {i.price_cad !== null ? (
                        <>
                          <span className={onSale ? "text-red-700 font-medium" : ""}>{formatMoney(i.price_cad * i.qty)}</span>
                          {onSale && <s className="block text-xs text-ink-soft">{formatMoney(i.list_price_cad! * i.qty)}</s>}
                        </>
                      ) : (
                        "Quote"
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            {saved > 0 && (
              <div className="flex justify-between text-ink-soft">
                <span>Regular price</span>
                <s>{formatMoney(listSubtotal)}</s>
              </div>
            )}
            {saved > 0 && (
              <div className="flex justify-between text-red-700 font-medium">
                <span>Sale savings</span>
                <span>−{formatMoney(saved)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Cabinets{items.some((i) => i.price_cad === null) ? " (from)" : ""}</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            {assemble && assemblyTotal > 0 && (
              <div className="flex justify-between">
                <span>Assembly ({assemblyUnits} × ${site.assemblyPerCabinet})</span>
                <span>{formatMoney(assemblyTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-success">
              <span>Delivery within {site.freeDeliveryKm} km</span>
              <span className="font-medium">FREE</span>
            </div>
            {(assemble && assemblyTotal > 0) && (
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-1">
                <span>Estimated total</span>
                <span>{formatMoney(total)}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-ink-soft mt-2">Taxes and any shipping beyond {site.freeDeliveryKm} km confirmed in your written quote. Sale prices are locked in on your quote.</p>
        </div>
      </aside>
    </div>
  );
}
