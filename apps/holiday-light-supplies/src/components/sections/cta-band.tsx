import Link from "next/link";
import { Photo } from "@/components/photo";
import { Icon } from "@/components/icons";

export function CtaBand({
  title = "Tell us about the property. We'll quote it line by line.",
  body = "Pole counts, tree lists, ceiling heights or a site plan — whatever you have. A real person replies within one business day with pricing, shipping and a timeline.",
  photo = "town-square",
  primary = { href: "/request-a-quote", label: "Request a commercial quote" },
  secondary = { href: "/shop", label: "Shop the catalog" }
}: {
  title?: string;
  body?: string;
  photo?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
      <Photo name={photo} ratio="absolute inset-0" sizes="100vw" imgClassName="opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#09201a] via-[#09201a]/85 to-[#09201a]/50" aria-hidden />
      <div className="shell section-lg relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-gold-bright)]">Ready when you are</p>
          <h2 className="font-display h2-fluid mt-4">{title}</h2>
          <p className="mt-5 text-lg text-white/80">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn-accent text-base">
              {primary.label} <Icon.arrow size={18} />
            </Link>
            <Link href={secondary.href} className="btn-ghost-light text-base">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
