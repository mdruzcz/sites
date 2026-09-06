import { site } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";
import { PhoneIcon, MapPinIcon, ClockIcon, CheckIcon } from "./icons";

/** Dark quote section with id="quote"; every CTA on the site points here. */
export function QuoteDock({ city, service, heading = "Get your free inspection and quote." }: { city?: string; service?: string; heading?: string }) {
  return (
    <section id="quote" className="scroll-mt-20 bg-[var(--slate)] text-white">
      <div className="shell section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="kicker">Free quote</p>
          <h2 className="font-display h2-fluid mt-4 text-white">{heading}</h2>
          <p className="lead mt-4 text-white/70">Send the surface, a rough size and a photo if you have one. We inspect for free, recommend a sheen and send a written quote. No deposit to get a number.</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded bg-[var(--orange)]"><PhoneIcon className="text-white" /></span><a href={site.phoneHref} className="font-display text-2xl font-bold tracking-wide hover:text-[var(--orange)]">{site.phone}</a></li>
            <li className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded bg-white/10"><ClockIcon className="text-[var(--orange)]" /></span><span className="text-white/80">{site.hours}</span></li>
            <li className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded bg-white/10"><MapPinIcon className="text-[var(--orange)]" /></span><span className="text-white/80">{site.serviceAreas.join(" · ")}</span></li>
          </ul>
          <ul className="mt-8 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
            {site.features.map((f) => <li key={f} className="flex items-start gap-2"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{f}</li>)}
          </ul>
        </div>
        <div className="card-dark p-6 md:p-8">
          <h3 className="font-display text-2xl text-white">Tell us about your concrete</h3>
          <p className="mb-5 mt-1 text-sm text-white/60">We reply within one business day.</p>
          <QuoteForm city={city} service={service} />
        </div>
      </div>
    </section>
  );
}
