import ServicePage, { buildServiceMetadata } from '@/components/ServicePage';

export const revalidate = 3600;
export const metadata = buildServiceMetadata('concrete-sealing');

export default function Page() {
  return <ServicePage slug="concrete-sealing" />;
}
