import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for rtacabinetscanada.ca: quotes, pricing and sales, payment, delivery and free local delivery, assembly service, returns and limitation of liability.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: { title: "Terms of Service | RTA Cabinets Canada", description: "Quotes, pricing, delivery, returns and the rules for using our website." },
  twitter: { card: "summary", title: "Terms of Service | RTA Cabinets Canada", description: "Quotes, pricing, delivery, returns and the rules for using our website." },
};

export default function TermsPage() {
  return <LegalPage doc="terms" path="/terms-of-service" />;
}
