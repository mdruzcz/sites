import ServicePage, { buildServiceMetadata } from '@/components/ServicePage';

export const revalidate = 3600;
export const metadata = buildServiceMetadata('driveway-sealing');

export default function Page() {
  return <ServicePage slug="driveway-sealing" />;
}
