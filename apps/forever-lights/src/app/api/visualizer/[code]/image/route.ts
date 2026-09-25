import { handleVisualizerImage } from '@/lib/visualizer/server';
import { VZ_SITE } from '@/lib/visualizer/site';

export const runtime = 'nodejs';

export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  return handleVisualizerImage(VZ_SITE.site, code, new URL(req.url).searchParams.get('kind'));
}
