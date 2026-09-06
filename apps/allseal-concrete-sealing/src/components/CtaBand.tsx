import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { PhoneIcon } from "./icons";

export function CtaBand({ heading = "Seal it before the salt trucks do their rounds.", sub = "Free inspection, written quote, your choice of finish. Spring and fall fill fast across Southwestern Ontario.", photo = PICKS.gloss }: { heading?: string; sub?: string; photo?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--graphite)] text-white">
      <Photo name={photo} ratio="absolute inset-0" sizes="100vw" scrim="soft" className="!absolute" />
      <div className="shell relative grid gap-8 py-20 md:grid-cols-[1.3fr_auto] md:items-center md:py-28">
        <div>
          <p className="kicker">Protect. Preserve. Seal.</p>
          <h2 className="font-display h2-fluid mt-4 max-w-3xl text-white">{heading}</h2>
          <p className="mt-4 max-w-xl text-white/80">{sub}</p>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#quote" className="btn-orange">Get my free quote</a>
          <a href={site.phoneHref} className="btn-ghost"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
