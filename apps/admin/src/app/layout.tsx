import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin · Master Decker",
  description: "Central admin for Master Decker ecommerce storefronts.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
