// Light Visualizer — server helpers (storage, captcha, email, request handlers).
// Identical copy lives in permanent-lighting-direct/src/lib/visualizer/server.ts. Keep them in sync.
//
// Designs live in the private Supabase Storage bucket `light-designs` as
//   <site>/<code>/design.json | photo.jpg | annotated.jpg
// written and read with the service-role key, so nothing here needs a table or
// RLS policy. Each site keeps its own lead path (forms Worker / ecom_contact_messages)
// via the `storeLead` hook.

import { estimate, formatMoney, normalizeDesign, resolveSelection, summaryText, type Design, type Estimate, type Selection, type VzCatalog } from './engine';

export interface VzSiteConfig {
  site: string;
  siteName: string;
  /** Apex hostname — Turnstile verification + links. */
  domain: string;
  baseUrl: string;
  phone?: string;
  /** Path of the visualizer page, e.g. "/visualizer". */
  path: string;
}

export interface VzContact {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  notes: string;
}

export interface StoredDesign {
  v: 1;
  site: string;
  code: string;
  submittedAt: string;
  design: Design;
  contact: VzContact;
  summary: string;
  estimate: { litFeet: number; jumpFeet: number; requiredFeet: number; kitSlug: string | null; kitFeet: number | null; total: number | null };
}

const BUCKET = 'light-designs';
const CODE_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

export function makeCode(len = 10): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let s = '';
  for (let i = 0; i < len; i++) s += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return s;
}

export const isCode = (code: string) => /^[a-z0-9]{6,16}$/.test(code);

export function escapeHtml(v: unknown): string {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ─────────────────────────── storage ─────────────────────────── */

function storageEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase storage env missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  return { url: url.replace(/\/$/, ''), key };
}

async function putObject(path: string, body: Uint8Array | string, contentType: string): Promise<void> {
  const { url, key } = storageEnv();
  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': contentType, 'x-upsert': 'true', 'Cache-Control': '31536000' },
    body: body as BodyInit,
  });
  if (!res.ok) throw new Error(`Storage upload failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
}

async function getObject(path: string): Promise<Response | null> {
  const { url, key } = storageEnv();
  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' });
  if (!res.ok) return null;
  return res;
}

export function dataUrlToBytes(dataUrl: unknown, maxBytes: number): { bytes: Uint8Array; mime: string } | null {
  if (typeof dataUrl !== 'string') return null;
  const m = /^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!m) return null;
  try {
    const bytes = Uint8Array.from(Buffer.from(m[2], 'base64'));
    if (!bytes.length || bytes.length > maxBytes) return null;
    return { bytes, mime: m[1] === 'image/jpg' ? 'image/jpeg' : m[1] };
  } catch {
    return null;
  }
}

export async function saveStoredDesign(stored: StoredDesign, photo: { bytes: Uint8Array; mime: string }, annotated: { bytes: Uint8Array; mime: string } | null): Promise<void> {
  const base = `${stored.site}/${stored.code}`;
  await putObject(`${base}/photo.jpg`, photo.bytes, photo.mime);
  if (annotated) await putObject(`${base}/annotated.jpg`, annotated.bytes, annotated.mime);
  await putObject(`${base}/design.json`, JSON.stringify(stored), 'application/json');
}

export async function loadStoredDesign(site: string, code: string): Promise<StoredDesign | null> {
  if (!isCode(code)) return null;
  try {
    const res = await getObject(`${site}/${code}/design.json`);
    if (!res) return null;
    const raw = (await res.json()) as Partial<StoredDesign>;
    if (!raw || typeof raw !== 'object' || !raw.design) return null;
    return {
      v: 1,
      site,
      code,
      submittedAt: typeof raw.submittedAt === 'string' ? raw.submittedAt : '',
      design: normalizeDesign(raw.design, site),
      contact: {
        name: String(raw.contact?.name ?? ''),
        email: String(raw.contact?.email ?? ''),
        phone: String(raw.contact?.phone ?? ''),
        address: String(raw.contact?.address ?? ''),
        city: String(raw.contact?.city ?? ''),
        postal: String(raw.contact?.postal ?? ''),
        notes: String(raw.contact?.notes ?? ''),
      },
      summary: String(raw.summary ?? ''),
      estimate: {
        litFeet: Number(raw.estimate?.litFeet ?? 0),
        jumpFeet: Number(raw.estimate?.jumpFeet ?? 0),
        requiredFeet: Number(raw.estimate?.requiredFeet ?? 0),
        kitSlug: raw.estimate?.kitSlug ?? null,
        kitFeet: raw.estimate?.kitFeet ?? null,
        total: raw.estimate?.total ?? null,
      },
    };
  } catch {
    return null;
  }
}

export async function loadStoredImage(site: string, code: string, kind: 'photo' | 'annotated'): Promise<{ bytes: ArrayBuffer; contentType: string } | null> {
  if (!isCode(code)) return null;
  try {
    const res = await getObject(`${site}/${code}/${kind}.jpg`);
    if (!res) return null;
    return { bytes: await res.arrayBuffer(), contentType: res.headers.get('content-type') ?? 'image/jpeg' };
  } catch {
    return null;
  }
}

/** What the public design page and the editor are allowed to see (no email/phone). */
export function publicView(stored: StoredDesign) {
  const first = stored.contact.name.trim().split(/\s+/)[0] ?? '';
  return { code: stored.code, site: stored.site, submittedAt: stored.submittedAt, design: stored.design, who: { firstName: first, city: stored.contact.city }, notes: stored.contact.notes };
}

/* ─────────────────────────── captcha ─────────────────────────── */

export async function verifyTurnstile(token: string, hostname: string): Promise<boolean> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  const configured = !!siteKey && !siteKey.startsWith('1x000');
  if (process.env.NODE_ENV !== 'production' && (!configured || !token)) return true; // local dev: widget optional, prod stays fail-closed
  if (!token) return false;
  try {
    const res = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? 'https://turnstile.masterdecker.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, hostname }),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch (err) {
    console.error('Turnstile verify error:', err);
    return false;
  }
}

/* ─────────────────────────── email ─────────────────────────── */

interface EmailInput { to: string; from: string; replyTo?: string; subject: string; html: string; attachments?: { filename: string; content: string }[] }

async function sendEmail(input: EmailInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error('RESEND_API_KEY not set'); return false; }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: input.from, to: [input.to], reply_to: input.replyTo, subject: input.subject, html: input.html, attachments: input.attachments }),
    });
    if (res.ok) return true;
    const text = (await res.text()).slice(0, 300);
    console.error('Resend error:', res.status, text);
    // Only masterdecker.com is verified in Resend; fall back once if the configured sender's domain is not.
    if (res.status === 403 && /not verified/i.test(text) && !/@masterdecker\.com$/i.test(input.from)) {
      return sendEmail({ ...input, from: 'noreply@masterdecker.com' });
    }
    return false;
  } catch (err) {
    console.error('Resend exception:', err);
    return false;
  }
}

function moneyCell(n: number | null) {
  return n === null ? '<span style="color:#888">quoted</span>' : formatMoney(n);
}

export function internalEmailHtml(cfg: VzSiteConfig, stored: StoredDesign, est: Estimate, sel: Selection, links: { design: string; photo: string; annotated: string }) {
  const c = stored.contact;
  const d = stored.design;
  const rows = sel.lines.map((l) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${escapeHtml(l.component.name)}${l.recommended ? '' : ' <span style="color:#888;font-size:11px">(optional, customer added)</span>'}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${l.qty}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${moneyCell(l.unitPrice)}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${l.unitPrice === null ? '' : formatMoney(l.unitPrice * l.qty)}</td></tr>`).join('');
  const kitRow = sel.kit ? `<tr style="background:#f3f4f6"><td style="padding:6px 10px;font-weight:700">${sel.kit.feet} ft kit${d.kitSlug ? ' (customer chose)' : ' (suggested)'}</td><td style="padding:6px 10px;text-align:center">1</td><td style="padding:6px 10px;text-align:right">${formatMoney(sel.kit.price)}</td><td style="padding:6px 10px;text-align:right">${formatMoney(sel.kit.price)}</td></tr>` : '';
  const totalRow = sel.total !== null ? `<tr><td colspan="3" style="padding:10px;text-align:right;font-weight:700">Estimated total before shipping &amp; tax</td><td style="padding:10px;text-align:right;font-weight:700;font-size:16px">${formatMoney(sel.total)}</td></tr>` : '';
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#10151f;max-width:680px">
    <h2 style="margin:0 0 4px">Light visualizer design — ${escapeHtml(cfg.siteName)}</h2>
    <p style="margin:0 0 16px;color:#555">Lights ≈ <strong>${est.litFeet} ft</strong>${est.jumpFeet ? ` · jumps ≈ ${est.jumpFeet} ft` : ''} · plan for ≈ <strong>${est.requiredFeet} ft</strong>${!est.hasScale ? ' · <span style="color:#b45309">no scale set</span>' : ''}</p>
    <p style="margin:0 0 16px"><a href="${escapeHtml(links.design)}" style="display:inline-block;background:#10151f;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:600">Open the design</a>
      &nbsp; <a href="${escapeHtml(links.annotated)}">Annotated photo</a> · <a href="${escapeHtml(links.photo)}">Original photo</a></p>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
      <tr><td style="padding:4px 10px 4px 0"><strong>Name</strong></td><td>${escapeHtml(c.name)}</td></tr>
      <tr><td style="padding:4px 10px 4px 0"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></td></tr>
      <tr><td style="padding:4px 10px 4px 0"><strong>Phone</strong></td><td><a href="tel:${escapeHtml(c.phone.replace(/\D/g, ''))}">${escapeHtml(c.phone) || '—'}</a></td></tr>
      <tr><td style="padding:4px 10px 4px 0"><strong>Address</strong></td><td>${escapeHtml([c.address, c.city, c.postal].filter(Boolean).join(', ')) || '—'}</td></tr>
      ${c.notes ? `<tr><td style="padding:4px 10px 4px 0;vertical-align:top"><strong>Notes</strong></td><td>${escapeHtml(c.notes).replace(/\n/g, '<br>')}</td></tr>` : ''}
    </table>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #eee">
      <thead><tr style="background:#e5e7eb;text-align:left"><th style="padding:6px 10px">Item</th><th style="padding:6px 10px;text-align:center">Qty</th><th style="padding:6px 10px;text-align:right">Unit</th><th style="padding:6px 10px;text-align:right">Line</th></tr></thead>
      <tbody>${kitRow}${rows}${totalRow}</tbody>
    </table>
    <pre style="white-space:pre-wrap;font-size:12px;background:#f8f8f6;padding:12px;border-radius:8px;margin-top:16px">${escapeHtml(stored.summary)}</pre>
    <p style="font-size:12px;color:#888">Design code ${escapeHtml(stored.code)} · submitted ${escapeHtml(stored.submittedAt)} from ${escapeHtml(cfg.domain)}</p>
  </div>`;
}

export function customerEmailHtml(cfg: VzSiteConfig, stored: StoredDesign, est: Estimate, sel: Selection, designUrl: string) {
  const first = stored.contact.name.trim().split(/\s+/)[0] || 'there';
  const items = [
    sel.kit ? `<li><strong>${sel.kit.feet} ft permanent lighting kit</strong> — ${formatMoney(sel.kit.price)}</li>` : '',
    ...sel.lines.map((l) => `<li>${l.qty} × ${escapeHtml(l.component.name)}${l.unitPrice !== null ? ` — ${formatMoney(l.unitPrice * l.qty)}` : ''}</li>`),
  ].join('');
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#10151f;max-width:640px">
    <p>Hi ${escapeHtml(first)},</p>
    <p>Thanks for planning your lights with the ${escapeHtml(cfg.siteName)} visualizer. We have your photo and the runs you marked, and a real person will check the measurements against the roofline before anything is charged.</p>
    <p><strong>What you planned</strong></p>
    <ul style="line-height:1.7">
      <li>Lights: about ${est.litFeet} ft${est.jumpFeet ? ` (plus ${est.jumpFeet} ft of unlit jumps)` : ''}</li>
      <li>Planning length with fitting allowance: about ${est.requiredFeet} ft</li>
      ${items}
      ${sel.total !== null ? `<li><strong>Estimated total before shipping and tax: ${formatMoney(sel.total)}</strong></li>` : ''}
    </ul>
    <p><a href="${escapeHtml(designUrl)}" style="display:inline-block;background:#10151f;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:600">Open your design</a></p>
    <p><strong>What happens next:</strong> within one business day we will confirm the kit size, shipping to your address and tax for your province, then email you a secure payment link. Nothing is charged until you approve it.</p>
    <p>Questions in the meantime? Just reply to this email${cfg.phone ? ` or call ${escapeHtml(cfg.phone)}` : ''}.</p>
    <p style="margin-top:24px">— ${escapeHtml(cfg.siteName)}</p>
  </div>`;
}

/* ─────────────────────────── request handlers ─────────────────────────── */

export interface SubmitHooks {
  /** Persist the lead in the site's usual place. Return true on success. */
  storeLead: (args: { contact: VzContact; summary: string; designUrl: string; stored: StoredDesign }) => Promise<boolean>;
}

const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function handleVisualizerSubmit(req: Request, cfg: VzSiteConfig, catalog: VzCatalog, hooks: SubmitHooks): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true, code: 'ok', url: '/' }); // honeypot — pretend success

  const contactIn = (body.contact ?? {}) as Record<string, unknown>;
  const contact: VzContact = {
    name: s(contactIn.name, 120),
    email: s(contactIn.email, 200),
    phone: s(contactIn.phone, 40),
    address: s(contactIn.address, 200),
    city: s(contactIn.city, 80),
    postal: s(contactIn.postal, 12),
    notes: s(contactIn.notes, 2000),
  };
  if (!contact.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email) || !contact.phone) {
    return Response.json({ ok: false, error: 'Please add your name, email and phone.' }, { status: 400 });
  }

  const captchaOk = await verifyTurnstile(String(body.token ?? ''), cfg.domain);
  if (!captchaOk) return Response.json({ ok: false, error: 'Captcha failed — please try again.' }, { status: 400 });

  const design = normalizeDesign(body.design, cfg.site);
  if (!design.runs.length && !design.manualFeet) return Response.json({ ok: false, error: 'Draw at least one run of lights first.' }, { status: 400 });

  const photo = dataUrlToBytes(body.photo, 2_500_000);
  if (!photo) return Response.json({ ok: false, error: 'Photo missing or too large.' }, { status: 400 });
  const annotated = dataUrlToBytes(body.annotated, 2_500_000);

  const est = estimate(design, catalog);
  const sel = resolveSelection(design, est, catalog);
  const summary = summaryText(design, est, sel, catalog);
  const code = makeCode();
  const stored: StoredDesign = {
    v: 1,
    site: cfg.site,
    code,
    submittedAt: new Date().toISOString(),
    design,
    contact,
    summary,
    estimate: { litFeet: est.litFeet, jumpFeet: est.jumpFeet, requiredFeet: est.requiredFeet, kitSlug: sel.kit?.slug ?? null, kitFeet: sel.kit?.feet ?? null, total: sel.total },
  };

  let saved = false;
  try {
    await saveStoredDesign(stored, photo, annotated);
    saved = true;
  } catch (err) {
    console.error('Design storage failed:', err);
  }

  const designUrl = `${cfg.baseUrl}${cfg.path}/d/${code}`;
  const links = { design: designUrl, photo: `${cfg.baseUrl}/api/visualizer/${code}/image?kind=photo`, annotated: `${cfg.baseUrl}/api/visualizer/${code}/image?kind=annotated` };

  const from = process.env.CONTACT_FROM_EMAIL || 'noreply@masterdecker.com';
  const to = process.env.CONTACT_TO_EMAIL || 'service@masterdecker.com';
  const attachments = annotated ? [{ filename: `light-plan-${code}.jpg`, content: Buffer.from(annotated.bytes).toString('base64') }] : undefined;

  const emailed = await sendEmail({
    from,
    to,
    replyTo: contact.email,
    subject: `Light visualizer design — ${contact.name} — ≈${est.litFeet} ft → ${sel.kit ? `${sel.kit.feet} ft kit` : 'no kit'} (${cfg.domain})`,
    html: internalEmailHtml(cfg, stored, est, sel, links) + (saved ? '' : '<p style="color:#b91c1c"><strong>Warning:</strong> the design could not be saved to storage; the attached photo is the only copy.</p>'),
    attachments,
  });
  if (emailed && contact.email.toLowerCase() !== to.toLowerCase()) {
    await sendEmail({ from, to: contact.email, subject: `Your light plan from ${cfg.siteName}`, html: customerEmailHtml(cfg, stored, est, sel, designUrl) });
  }

  let storedLead = false;
  try {
    storedLead = await hooks.storeLead({ contact, summary, designUrl, stored });
  } catch (err) {
    console.error('Lead store failed:', err);
  }

  if (!emailed && !storedLead && !saved) {
    return Response.json({ ok: false, error: 'We could not send your design. Please try again or call us.' }, { status: 502 });
  }
  return Response.json({ ok: true, code, url: `${cfg.path}/d/${code}`, emailed, stored: storedLead, saved });
}

export async function handleVisualizerGet(site: string, code: string): Promise<Response> {
  const stored = await loadStoredDesign(site, code);
  if (!stored) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(publicView(stored), { headers: { 'Cache-Control': 'private, max-age=0' } });
}

export async function handleVisualizerImage(site: string, code: string, kind: string | null): Promise<Response> {
  const k = kind === 'annotated' ? 'annotated' : 'photo';
  const img = await loadStoredImage(site, code, k);
  if (!img) return new Response('Not found', { status: 404 });
  return new Response(img.bytes, { headers: { 'Content-Type': img.contentType, 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' } });
}
