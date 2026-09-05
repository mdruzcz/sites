import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { PhoneIcon } from "./icons";

export function CtaBand({ heading = "Ready for the best-looking house on the street?", sub = "Book your free quote today. October and November fill up fast across Waterloo Region.", photo = PICKS.church }: { heading?: string; sub?: string; photo?: string }) {
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
        <p className="mt-6 text-xs text-white/70">Fully insured · Family owned · No travel charges · {site.yearsExperience}+ years</p>
      </div>
    </section>
  );
}
