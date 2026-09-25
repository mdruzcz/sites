import { getVisualizerCatalog } from '@/lib/visualizer/catalog';
import { handleVisualizerSubmit } from '@/lib/visualizer/server';
import { VZ_SITE } from '@/lib/visualizer/site';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  return handleVisualizerSubmit(req, VZ_SITE, getVisualizerCatalog(), {
    // Forever Lights leads go through the shared forms Worker into foreverlights_leads.
    async storeLead({ contact, summary, designUrl }) {
      const message = ['LIGHT VISUALIZER DESIGN', `Open: ${designUrl}`, '', summary, contact.notes ? `\nNotes: ${contact.notes}` : ''].join('\n');
      const res = await fetch(process.env.FORMS_SUBMIT_ENDPOINT ?? 'https://forms.masterdecker.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostname: VZ_SITE.domain,
          row: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            address: [contact.address, contact.postal].filter(Boolean).join(', '),
            city: contact.city,
            message,
            created_at: new Date().toISOString(),
          },
        }),
      });
      if (!res.ok) console.error('Forms worker insert error:', res.status, await res.text());
      return res.ok;
    },
  });
}
