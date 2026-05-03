import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Service Excellence Awards — an independent recognition program for the best home renovation and service contractors in Ontario.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">About</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">An independent recognition program for trades.</h1>

      <div className="prose-stone mt-10 space-y-6 text-lg text-stone-700">
        <p>
          The Service Excellence Awards Canada is an independent, editorial recognition program
          for home renovation and service contractors across Ontario. Our goal is straightforward:
          when a homeowner needs a deck builder in Hamilton or a foundation specialist in Vaughan,
          they should be able to find a recognised, reputable contractor in seconds — without
          wading through paid placements or fake reviews.
        </p>
        <p>
          We don't sell winner spots. Contractors don't pay to be listed, and they can't pay to win.
          Instead, our editorial team reviews service records, customer reputation across
          independent platforms, evidence of completed work, and longevity in the trade.
        </p>

        <h2 id="methodology" className="font-serif text-3xl tracking-tight pt-6">How winners are chosen</h2>
        <p>
          For each city and category, we collect candidates from three sources: public reputation
          (verified reviews, BBB standing), peer recommendations from other trades, and
          self-nominations submitted through our Request Consideration form. Each candidate is
          then evaluated on four criteria:
        </p>
        <ol className="ml-6 list-decimal space-y-2">
          <li><span className="font-medium">Workmanship.</span> Documented project history and visual evidence of completed work.</li>
          <li><span className="font-medium">Reputation.</span> Aggregate sentiment across independent review platforms over a 24-month window.</li>
          <li><span className="font-medium">Service record.</span> Years in operation, licensing, and follow-through on warranty work.</li>
          <li><span className="font-medium">Service area fit.</span> Whether they actively work in the city they're being recognised for.</li>
        </ol>
        <p>
          Only one Service Excellence Award is granted per category, per city, per year. If we
          can't find a contractor who clears the bar, we leave the slot empty — recognition only
          means something if it's selective.
        </p>

        <h2 id="contact" className="font-serif text-3xl tracking-tight pt-6">Get in touch</h2>
        <p>
          Press, partnership and program inquiries can be sent to{" "}
          <a className="text-[var(--gold)] hover:underline" href="mailto:hello@serviceexcellenceawards.ca">
            hello@serviceexcellenceawards.ca
          </a>.
          Contractors who want to be considered for next year should use the{" "}
          <a className="text-[var(--gold)] hover:underline" href="/nominate">Request Consideration</a> form.
        </p>
      </div>
    </article>
  );
}
