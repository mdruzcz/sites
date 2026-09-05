import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES } from "@/content/service-pages";

export const revalidate = 3600;
const c = SERVICE_PAGES["tree-lighting"];

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "https://festiveholidaylighting.ca/services/tree-lighting" },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: "https://festiveholidaylighting.ca/services/tree-lighting" },
};

export default function Page() {
  return <ServicePage c={c} />;
}
