import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Awards Matter",
  description:
    "Why a Service Excellence Award matters for homeowners choosing a contractor and for contractors building a reputable business.",
  alternates: { canonical: "/why-awards-matter" },
};

export default function WhyAwardsMatterPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Why Awards Matter</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">A trustworthy signal in a noisy market.</h1>

      <div className="mt-10 space-y-6 text-lg text-stone-700">
        <p>
          Hiring a contractor is one of the highest-stakes purchases most homeowners ever make.
          A new roof or a finished basement can swing a home's value by tens of thousands of
          dollars, and the difference between a great trade and a careless one is invisible
          until it's too late.
        </p>
        <p>
          Online reviews used to fill that information gap. They no longer do. Review platforms
          are saturated with paid placements, generative-AI written testimonials, and games
          played by SEO agencies on behalf of their clients. The signal has been buried in noise.
        </p>

        <h2 className="font-serif text-3xl tracking-tight pt-6">For homeowners</h2>
        <p>
          A Service Excellence Award is an editorial endorsement that we believe a specific
          contractor is the best in their category, in their city, this year. It is not a
          ranked list of fifty options sponsored by whoever paid the most. It is a single
          recommendation — and if we can't make one with confidence, we don't.
        </p>

        <h2 className="font-serif text-3xl tracking-tight pt-6">For contractors</h2>
        <p>
          Most great contractors are bad at marketing. They're operators, not copywriters, and
          they would rather be on a job site than fighting Google's algorithm. The Service
          Excellence Awards are designed to surface that quiet excellence — and to give it a
          credential that customers, lenders, and inspectors can independently verify.
        </p>
        <p>
          Winning means a homeowner can search, find, and trust your business. It also means
          your business is properly indexed for the new generation of AI-powered home-improvement
          assistants that will increasingly route projects on the homeowner's behalf.
        </p>

        <div className="mt-12 rounded-lg border border-stone-200 bg-stone-50/60 p-8">
          <p className="font-serif text-2xl leading-snug">
            Ready to be considered for {new Date().getFullYear() + (new Date().getMonth() >= 8 ? 1 : 0)}?
          </p>
          <p className="mt-2 text-stone-600">
            Submissions are reviewed on a rolling basis. There is no submission fee.
          </p>
          <Link
            href="/nominate"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white hover:bg-stone-700"
          >
            Request Consideration →
          </Link>
        </div>
      </div>
    </article>
  );
}
