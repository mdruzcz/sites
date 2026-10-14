import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";

export function ProcessSteps() {
  const steps = [
    {
      n: "01",
      title: "Build your list",
      body: "Add bulbs, displays and décor to your quote list from the catalog, or send us a pole count, tree list or site plan and we'll build it for you."
    },
    {
      n: "02",
      title: "Get a line-item quote",
      body: "We reply by email within one business day with shipping, timeline, and any volume, installer or public-sector pricing you qualify for. No payment online."
    },
    {
      n: "03",
      title: "Approve and we ship",
      body: "Approve the quote, pay by card, e-transfer or PO (net-30 for municipalities and BIAs), and it ships from our London, Ontario warehouse."
    }
  ];
  return (
    <section className="bg-white">
      <div className="shell section">
        <SectionHeading eyebrow="How ordering works" title="Quote first, so the pricing fits the project." sub="Large orders deserve a human. Here is the whole process." />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-warm)] p-8 pt-10">
              <span className="font-display absolute -top-5 left-7 grid size-11 place-items-center rounded-full bg-[var(--color-accent)] text-base font-bold text-white shadow-lg">{s.n}</span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--color-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/request-a-quote" className="btn-primary">
            Start a quote <Icon.arrow size={16} />
          </Link>
          <Link href="/faq" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            Read the ordering FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
