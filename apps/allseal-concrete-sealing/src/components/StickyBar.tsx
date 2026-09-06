import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

/** Mobile-only bottom action bar (replaces a floating button). */
export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-[var(--line-dark)] bg-[var(--graphite)] lg:hidden">
      <a href={site.phoneHref} className="font-display flex min-h-16 items-center justify-center gap-2 text-lg font-bold uppercase tracking-wider text-white" aria-label={`Call ${site.phone}`}><PhoneIcon className="w-5 h-5 text-[var(--orange)]" />Call</a>
      <a href="#quote" className="font-display flex min-h-16 items-center justify-center bg-[var(--orange)] text-lg font-bold uppercase tracking-wider text-white">Free Quote</a>
    </div>
  );
}
