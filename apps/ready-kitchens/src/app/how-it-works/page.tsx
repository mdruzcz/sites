import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How It Works — Order, Confirm, Pickup",
  description: "How ordering a Ready Kitchens cabinet package works — submit your kit, we confirm stock and pickup, then we arrange your cabinets at our Belmont warehouse.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">How it works</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">A full kitchen, ordered like a single product.</h1>
        <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
          We pre-assemble the most-requested kitchen layouts so you don&rsquo;t have to design, wait, or hire a kitchen company. Add a kit to your cart, send us the details, pick it up.
        </p>
      </header>

      <ol className="mt-12 space-y-10">
        <Step n={1} title="Pick the kit that fits your space">
          <p>Every kit lists the cabinets it contains, the SKU codes, and the wall lengths it&rsquo;s built for. Galley layouts fit two opposing runs; L-shapes need an inside corner; the U-shape needs three walls; the kitchenette runs along a single wall.</p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Not sure? Send us a quick floor sketch through the contact form and we&rsquo;ll point you at the right kit.</p>
        </Step>
        <Step n={2} title="Add to cart and submit">
          <p>Add the kit (or multiple kits) to your cart and submit your order details. We ask for your name, email, phone, and a postal code if you want a delivery quote. <strong>No payment is taken online.</strong></p>
        </Step>
        <Step n={3} title="We confirm stock, total, and pickup">
          <p>Within one business day a real person from our warehouse replies with: confirmed stock, the final all-in price (including any optional extras), and a pickup time at <strong>50432 Yorke Line, Belmont, ON</strong>. We&rsquo;ll quote freight separately if you&rsquo;d rather have it delivered.</p>
        </Step>
        <Step n={4} title="Pay & pick up your cabinets">
          <p>Once you approve the final total, we send a secure payment link (e-transfer, credit card, or contractor terms if you&rsquo;re a builder). Then you come pick up your fully assembled kitchen — boxes built, doors hung, drawers in.</p>
        </Step>
        <Step n={5} title="Install (or have someone install)">
          <p>All boxes are standard 34½&quot; tall by 24&quot; deep base, and 36&quot; tall × 12&quot; deep wall. Standard ledger-strip install — anyone who&rsquo;s installed IKEA or any other framed cabinet can put these on the wall.</p>
        </Step>
      </ol>

      <section className="mt-14 rounded-lg bg-[var(--color-ink)] p-8 text-center text-white sm:p-12">
        <h2 className="font-display text-3xl">Ready when you are.</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/80">
          Browse our complete kits — assembled, in stock, ready for pickup in Belmont.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/kits" className="btn-primary">Shop kitchen kits</Link>
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="text-sm font-semibold underline-offset-4 hover:underline">
            or call {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-6">
      <div className="shrink-0">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-accent)] font-display text-2xl text-white">{n}</div>
      </div>
      <div>
        <h2 className="font-display text-2xl">{title}</h2>
        <div className="mt-2 space-y-2 text-[var(--color-ink-soft)]">{children}</div>
      </div>
    </li>
  );
}
