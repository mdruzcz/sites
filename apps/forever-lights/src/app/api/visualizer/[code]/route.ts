import { handleVisualizerGet } from '@/lib/visualizer/server';
import { VZ_SITE } from '@/lib/visualizer/site';

export const runtime = 'nodejs';

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  return handleVisualizerGet(VZ_SITE.site, code);
}
