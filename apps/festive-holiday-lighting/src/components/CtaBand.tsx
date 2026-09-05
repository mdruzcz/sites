import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { PhoneIcon } from "./icons";

export function CtaBand({ heading = "Ready to make this your best holiday yet?", sub = "Book your free quote today. Spots fill up fast in October and November.", photo = PICKS.church }: { heading?: string; sub?: string; photo?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
      <Photo name={photo} ratio="absolute inset-0" sizes="100vw" scrim="soft" className="!absolute" />
      <div className="shell relative py-20 text-center md:py-28">
        <h2 className="font-display h2-fluid mx-auto max-w-3xl text-white">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">{sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="btn-candy">Get my free quote</a>
          <a href={site.phoneHref} className="btn-white"><PhoneIcon className="w-4 h-4" />{site.phone}</a>
        </div>
        <p className="mt-6 text-xs text-white/70">$5M insured · WSIB compliant · Family owned · {site.yearsExperience}+ years</p>
      </div>
    </section>
  );
}
