// Share-link encoding: the whole design travels in the URL hash, deflated + base64url.
// No server round-trip is needed to open a shared design.

import type { Design } from "./types";
import { normalizeDesign } from "./store";

function toBase64Url(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deflate(text: string): Promise<Uint8Array | null> {
  if (typeof CompressionStream === "undefined") return null;
  const cs = new CompressionStream("deflate-raw");
  const writer = cs.writable.getWriter();
  void writer.write(new TextEncoder().encode(text));
  void writer.close();
  const buf = await new Response(cs.readable).arrayBuffer();
  return new Uint8Array(buf);
}

async function inflate(bytes: Uint8Array): Promise<string> {
  const ds = new DecompressionStream("deflate-raw");
  const writer = ds.writable.getWriter();
  void writer.write(bytes as BufferSource);
  void writer.close();
  return new Response(ds.readable).text();
}

export async function encodeDesign(design: Design): Promise<string> {
  const json = JSON.stringify(design);
  const z = await deflate(json);
  if (z) return "z" + toBase64Url(z);
  return "j" + toBase64Url(new TextEncoder().encode(json));
}

export async function decodeDesign(payload: string): Promise<Design | null> {
  try {
    const kind = payload[0];
    const body = payload.slice(1);
    let json: string;
    if (kind === "z") json = await inflate(fromBase64Url(body));
    else if (kind === "j") json = new TextDecoder().decode(fromBase64Url(body));
    else return null;
    const parsed = JSON.parse(json);
    return normalizeDesign(parsed);
  } catch {
    return null;
  }
}

export function shareUrlFor(payload: string): string {
  const base = typeof window !== "undefined" ? `${window.location.origin}/planner` : "https://rtacabinetscanada.ca/planner";
  return `${base}#d=${payload}`;
}

export function readHashPayload(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/[#&]d=([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}
