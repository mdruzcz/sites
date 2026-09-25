import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Warranty & Returns",
  description: "Limited lifetime warranty on White Shaker RTA cabinets from RTA Cabinets Canada: what is covered, how to make a claim, damaged-in-transit replacements and our returns policy.",
  alternates: { canonical: "/warranty" },
  openGraph: { title: "Warranty & Returns | RTA Cabinets Canada", description: "Limited lifetime warranty, claims and returns for White Shaker RTA cabinets." },
  twitter: { card: "summary", title: "Warranty & Returns | RTA Cabinets Canada", description: "Limited lifetime warranty, claims and returns for White Shaker RTA cabinets." },
};

export default function WarrantyPage() {
  return <LegalPage doc="warranty" path="/warranty" />;
}
