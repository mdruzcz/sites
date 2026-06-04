import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Free Cabinet Quote",
  description:
    "Request a free written quote for your White Shaker RTA cabinets and kitchen packages. Send us your list and we'll confirm pricing and Canada-wide shipping within one business day.",
  alternates: { canonical: "/request" },
  openGraph: {
    title: "Request a Free Cabinet Quote",
    description:
      "Send us your White Shaker cabinet list for a free written quote, shipped Canada-wide.",
  },
};

export default function RequestPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2">Request a Quote</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Review your cabinet list, add your details, and we&apos;ll email a written
        quote with taxes and shipping — usually within one business day.
      </p>
      <QuoteForm />
    </div>
  );
}
