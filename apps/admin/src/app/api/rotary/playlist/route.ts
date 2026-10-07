import { NextRequest, NextResponse } from "next/server";

/**
 * Public (unauthenticated) endpoint that persists the Rotary Club light-show
 * playlist chosen on masterdecker.com/rotaryclub.
 *
 * The admin app is used purely because it already holds the Supabase
 * service-role key; the playlist itself lives as a JSON object in the public
 * `rotary-audio` storage bucket next to the audio files. Every save also
 * writes a timestamped copy under `history/` so nothing is ever lost.
 */

export const runtime = "edge";

const BUCKET = "rotary-audio";
const KEY = "playlist.json";
const ALLOWED_ORIGINS = new Set([
  "https://masterdecker.com",
  "https://www.masterdecker.com",
  "https://masterdecker-web.vercel.app",
  "http://localhost:3023",
]);

type Playlist = {
  selected: string[];
  order: string[];
  notes?: string;
  editor?: string;
  updatedAt?: string;
};

function cors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin") ?? "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Vary", "Origin");
  }
  res.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function storage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env missing");
  return {
    base: `${url}/storage/v1/object`,
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  };
}

export async function OPTIONS(req: NextRequest) {
  return cors(req, new NextResponse(null, { status: 204 }));
}

export async function GET(req: NextRequest) {
  try {
    const { base, headers } = storage();
    // Authenticated read bypasses the public CDN cache so a fresh save is
    // visible immediately.
    const r = await fetch(`${base}/authenticated/${BUCKET}/${KEY}`, { headers, cache: "no-store" });
    if (r.status === 404 || r.status === 400) {
      return cors(req, NextResponse.json({ playlist: null }));
    }
    if (!r.ok) throw new Error(`storage read ${r.status}`);
    const playlist = (await r.json()) as Playlist;
    return cors(req, NextResponse.json({ playlist }));
  } catch (err) {
    console.error("rotary playlist GET", err);
    return cors(req, NextResponse.json({ error: "Could not load playlist" }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Playlist>;
    const clean = (v: unknown) =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.length < 120).slice(0, 200) : [];
    const playlist: Playlist = {
      selected: clean(body.selected),
      order: clean(body.order),
      notes: typeof body.notes === "string" ? body.notes.slice(0, 2000) : "",
      editor: typeof body.editor === "string" ? body.editor.slice(0, 80) : "",
      updatedAt: new Date().toISOString(),
    };
    const { base, headers } = storage();
    const payload = JSON.stringify(playlist, null, 2);
    const put = (path: string) =>
      fetch(`${base}/${BUCKET}/${path}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json", "x-upsert": "true", "Cache-Control": "no-store" },
        body: payload,
      });
    const stamp = playlist.updatedAt!.replace(/[:.]/g, "-");
    const [main, hist] = await Promise.all([put(KEY), put(`history/${stamp}.json`)]);
    if (!main.ok) throw new Error(`storage write ${main.status} ${await main.text()}`);
    if (!hist.ok) console.error("rotary history write failed", hist.status);
    return cors(req, NextResponse.json({ ok: true, playlist }));
  } catch (err) {
    console.error("rotary playlist PUT", err);
    return cors(req, NextResponse.json({ error: "Could not save playlist" }, { status: 500 }));
  }
}
