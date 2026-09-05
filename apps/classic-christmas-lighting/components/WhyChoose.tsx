import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";

const reasons = [
  { icon: "🎁", title: "We bring everything", body: "Commercial-grade LED lights, clips, cords and timers are all included. You buy nothing and store nothing. It comes down in January and goes back to our shop." },
  { icon: "💡", title: "Energy-efficient LEDs", body: "Our LEDs use up to 75% less electricity than old incandescent strings and give a brighter, more even colour along the roofline." },
  { icon: "🔧", title: "Kept lit all season", body: "If a strand goes dark or a clip lets go in a storm, call us. Mid-season service is part of the job, not an extra." },
  { icon: "🛡️", title: "Fully insured", body: "Our crew, your property and your lights are covered from the first ladder to the last box. Certificates on request for commercial work." },
  { icon: "🚚", title: "No travel charges", body: "Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Woodstock and Stratford, all at the same price. No mileage surprises on the quote." },
  { icon: "🏠", title: "Family owned, 15 years", body: "Ben answers the phone. The same local crew comes back year after year, and they remember how you like your lights." },
];

export function WhyChoose() {
  return (
    <section className="bg-[var(--snow)]">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow-pill">Why Classic</p>
            <h2 className="font-display h2-fluid mt-4">Waterloo Region&apos;s no-ladder, no-stress Christmas lights.</h2>
            <p className="lead mt-4 text-[var(--ink-soft)]">Fifteen years of rooflines, wrapped maples and storefronts across Kitchener-Waterloo. We treat your house like it is on our own street, because it probably is.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Photo name={PICKS.install1} ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="260px" />
              <Photo name={PICKS.install2} ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-6" sizes="260px" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-[var(--paper)] text-xl">{r.icon}</span>
                <h3 className="font-display mt-4 text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
