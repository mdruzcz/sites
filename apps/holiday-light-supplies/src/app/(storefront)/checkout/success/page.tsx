import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata = { title: "Quote request received", robots: { index: false } };

export default function InquirySuccess() {
  return (
    <div className="shell py-20 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--color-brand)] text-white">
        <Icon.check size={26} />
      </span>
      <h1 className="font-display mt-5 text-3xl md:text-4xl">Got it. Your quote is on its way.</h1>
      <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-soft)]">
        We have your list and delivery address. A real person emails your pricing, shipping cost and timeline <strong>within one business day</strong>. Nothing is charged until you approve the quote.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">Keep browsing</Link>
        <Link href="/resources" className="btn-secondary">Read the planning guides</Link>
      </div>
    </div>
  );
}
