import Link from "next/link";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { CheckIcon, SmartphoneIcon } from "./icons";

const perks = [
  "Change colours from your phone in seconds",
  "16 million colours: Christmas, Halloween, Canada Day, game day",
  "Installed once in discreet roofline channels",
  "Invisible by day, no ladders ever again",
  "Rated for Canadian winters, lifetime hardware warranty",
  "Pairs with a classic program for the full Christmas look",
];

export function PermanentLightsSection() {
  return (
    <section className="bg-[var(--ice)]">
      <div className="shell section grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <Photo name={PICKS.heroPermanentBlue} ratio="aspect-[4/3]" rounded="rounded-[var(--radius)]" sizes="(max-width: 1024px) 100vw, 560px" className="shadow-[var(--shadow-lg)]" />
          <div className="card absolute -bottom-6 -right-2 hidden w-64 p-4 md:block">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[var(--candy)] text-white"><SmartphoneIcon className="w-5 h-5" /></span>
              <div><p className="text-sm font-bold">Smart app control</p><p className="text-xs text-[var(--muted)]">iOS & Android</p></div>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              {[["🎄 Christmas", true], ["🎃 Halloween", false], ["🇨🇦 Canada Day", false], ["🏒 Game night", false]].map(([l, a]) => (
                <li key={String(l)} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${a ? "bg-[var(--candy-soft)] font-semibold text-[var(--candy-deep)]" : "bg-[var(--snow)]"}`}>{l as string}{a && <span className="text-[10px] uppercase">on</span>}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="eyebrow-pill candy">Permanent lights</p>
          <h2 className="font-display h2-fluid mt-4">One install. <span className="text-candy">Every occasion,</span> forever.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">Smart RGBW LEDs tucked into your roofline. Pick a colour scheme from the couch, set a sunset schedule and forget about it. No annual install fee, no tangled boxes in the garage.</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--pine)] text-white"><CheckIcon className="w-3 h-3" /></span>{p}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services/permanent-lighting" className="btn-candy">See permanent lighting</Link>
            <Link href="/services/christmas-light-installation" className="btn-outline">Prefer classic lights?</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
