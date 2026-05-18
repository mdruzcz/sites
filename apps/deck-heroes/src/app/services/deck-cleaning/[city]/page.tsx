import { CITIES } from "@/lib/constants";
import {
  ServiceCityPage,
  generateServiceCityMetadata,
} from "@/lib/service-city-page";

const SERVICE_SLUG = "deck-cleaning";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  return params.then((p) => generateServiceCityMetadata(SERVICE_SLUG, p.city));
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <ServiceCityPage serviceSlug={SERVICE_SLUG} citySlug={city} />;
}
