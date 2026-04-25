import { ComingSoon } from "@sites/ui";

export default function Home() {
  return (
    <ComingSoon
      title="London Concrete Forming"
      tagline="Foundations, footings, and concrete forming services in London, Ontario. Our new site is under construction."
      tone="stone"
      cta={
        <a
          href="tel:"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Get a quote
        </a>
      }
    />
  );
}
