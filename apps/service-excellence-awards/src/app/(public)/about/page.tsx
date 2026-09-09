import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Service Excellence Awards — a curated recognition program highlighting trusted home renovation and service contractors across Ontario.",
  alternates: { canonical: "/about" },
};

export const revalidate = 300;

export default async function AboutPage() {
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("sea_winners")
    .select("slug, photo_url")
    .eq("year", CURRENT_YEAR)
    .eq("is_published", true)
    .not("photo_url", "is", null)
    .limit(6);
  const montage = (data ?? []) as { slug: string; photo_url: string }[];

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">About</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">A recognition program for Ontario's trades.</h1>

      {montage.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {montage.map((m) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={m.slug}
              src={m.photo_url}
              alt="Work by a Service Excellence Award winning contractor in Ontario"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          ))}
        </div>
      )}

      <div className="prose-stone mt-10 space-y-6 text-lg text-stone-700">
        <p>
          The Service Excellence Awards Canada is a curated recognition program for home renovation
          and service contractors across Ontario. Our goal is straightforward: when a homeowner needs
          a deck builder in Hamilton or a foundation specialist in Vaughan, they should be able to
          find a recognised, reputable contractor in seconds — with verified contact details and a
          clear description of what each business does best.
        </p>
        <p>
          We highlight one business per category, per city, per year — a mix of established
          specialists we've worked with and reviewed, and contractors recognised for a strong public
          reputation in their trade. Every winner profile is editorially written and includes the
          information a homeowner actually needs to make a confident hiring decision.
        </p>

        <h2 id="methodology" className="font-serif text-3xl tracking-tight pt-6">How winners are chosen</h2>
        <p>
          For each city and category we consider candidates from public reputation, completed-work
          evidence, and businesses submitted through our Request Consideration form. Each candidate
          is weighed on four things:
        </p>
        <ol className="ml-6 list-decimal space-y-2">
          <li><span className="font-medium">Workmanship.</span> Documented project history and visual evidence of completed work.</li>
          <li><span className="font-medium">Reputation.</span> Customer sentiment and reviews across public platforms.</li>
          <li><span className="font-medium">Service record.</span> Years in operation, licensing, and follow-through on warranty work.</li>
          <li><span className="font-medium">Service area fit.</span> Whether they actively work in the city they're being recognised for.</li>
        </ol>
        <p>
          Only one business is highlighted per category, per city, per year. Where we haven't yet
          recognised a contractor in a category, we leave the slot open rather than fill it — the
          list is meant to be a useful shortlist, not a directory of everyone.
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
