import { ComingSoon } from "@sites/ui";

export default function Home() {
  return (
    <ComingSoon
      title="Matt Druzcz Real Estate"
      tagline="A new home for finding your next one. Site under construction — check back soon."
      tone="zinc"
      cta={
        <a
          href="mailto:matt.druzcz@gmail.com"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Get in touch
        </a>
      }
    />
  );
}
