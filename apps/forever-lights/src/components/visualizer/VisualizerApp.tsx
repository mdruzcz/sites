'use client';
// Light Visualizer — interactive client app.
// Identical copy lives in permanent-lighting-direct/src/components/visualizer/VisualizerApp.tsx. Keep them in sync.
// Site-specific styling comes in through `theme`; site data through `catalog` + `site`.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  ALLOWANCE_RATE, OUTLET_OPTIONS, emptyDesign, estimate, formatMoney, kitContents, normalizeDesign, resolveSelection, uid,
  type Design, type Pt, type Run, type RunKind, type VzCatalog, type VzKit,
} from '@/lib/visualizer/engine';
import { drawOverlay, renderAnnotated, COLORS } from '@/lib/visualizer/draw';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then((m) => m.Turnstile), { ssr: false });

export interface VzTheme {
  btnPrimary: string;
  btnSecondary: string;
  btnGhost: string;
  card: string;
  input: string;
  label: string;
  eyebrow: string;
  heading: string;
  muted: string;
  accentText: string;
  softBg: string;
  chipOn: string;
  chipOff: string;
  success: string;
  danger: string;
}

export interface VzSite {
  site: string;
  name: string;
  domain: string;
  phone: string;
  path: string;
  /** Route prefix for kit detail pages, e.g. "/kits" or "/product". */
  kitBasePath: string;
  samplePhoto?: string;
}

export interface CartLine { variantId: string; qty: number }

interface Props {
  catalog: VzCatalog;
  theme: VzTheme;
  site: VzSite;
  turnstileSiteKey?: string;
  /** Server action (cart-enabled sites only). */
  addToCart?: (lines: CartLine[]) => Promise<{ ok: boolean; error?: string; count?: number }>;
  cartPath?: string;
}

type Step = 1 | 2 | 3 | 4;

interface PhotoState { dataUrl: string; img: HTMLImageElement; w: number; h: number }

const SCALE_PRESETS: { key: string; label: string; feet: number | null; hint: string }[] = [
  { key: 'garage2', label: 'Double garage door', feet: 16, hint: 'Tap the left edge, then the right edge of the door opening.' },
  { key: 'garage1', label: 'Single garage door', feet: 8, hint: 'Tap the left edge, then the right edge of the door opening.' },
  { key: 'door', label: 'Front door height', feet: 6.67, hint: 'Tap the bottom of the door, then the top of the door (not the frame).' },
  { key: 'custom', label: 'Something else I know the size of', feet: null, hint: 'Tap one end, then the other, of anything you can measure or look up.' },
];

const PHOTO_MAX_EDGE = 1400;
const STORAGE_KEY = (site: string) => `vz:${site}:v1`;

/* ─────────────────────────── helpers ─────────────────────────── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = src;
  });
}

async function fileToPhoto(file: File): Promise<PhotoState> {
  let source: CanvasImageSource;
  let sw: number, sh: number;
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions);
      source = bmp; sw = bmp.width; sh = bmp.height;
    } catch {
      const url = URL.createObjectURL(file);
      const img = await loadImage(url);
      URL.revokeObjectURL(url);
      source = img; sw = img.naturalWidth; sh = img.naturalHeight;
    }
  } else {
    const url = URL.createObjectURL(file);
    const img = await loadImage(url);
    URL.revokeObjectURL(url);
    source = img; sw = img.naturalWidth; sh = img.naturalHeight;
  }
  const s = Math.min(1, PHOTO_MAX_EDGE / Math.max(sw, sh));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(sw * s));
  canvas.height = Math.max(1, Math.round(sh * s));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  const img = await loadImage(dataUrl);
  return { dataUrl, img, w: canvas.width, h: canvas.height };
}

async function urlToPhoto(url: string): Promise<PhotoState> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Could not fetch photo');
  const blob = await res.blob();
  return fileToPhoto(new File([blob], 'photo.jpg', { type: blob.type || 'image/jpeg' }));
}

function Stepper({ value, onChange, min = 0, max = 99, theme }: { value: number; onChange: (n: number) => void; min?: number; max?: number; theme: VzTheme }) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/15 bg-white">
      <button type="button" aria-label="Fewer" onClick={() => onChange(Math.max(min, value - 1))} className="h-10 w-10 text-lg leading-none hover:bg-black/5 rounded-l-full">−</button>
      <span className={`w-8 text-center text-sm font-semibold tabular-nums ${theme.heading}`}>{value}</span>
      <button type="button" aria-label="More" onClick={() => onChange(Math.min(max, value + 1))} className="h-10 w-10 text-lg leading-none hover:bg-black/5 rounded-r-full">+</button>
    </div>
  );
}

const IconUpload = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4m0 0-4 4m4-4 4 4" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
);

/* ─────────────────────────── component ─────────────────────────── */

export function VisualizerApp({ catalog, theme, site, turnstileSiteKey, addToCart, cartPath = '/cart' }: Props) {
  const defaultColour = catalog.colours[0]?.key ?? '';
  const [photo, setPhoto] = useState<PhotoState | null>(null);
  const [design, setDesign] = useState<Design | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<RunKind>('lit');
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [scaleDraft, setScaleDraft] = useState<Pt | null>(null);
  const [scalePreset, setScalePreset] = useState('garage2');
  const [customFeet, setCustomFeet] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [cursor, setCursor] = useState<Pt | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [baseScale, setBaseScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [panMode, setPanMode] = useState(false);
  const viewScale = baseScale * zoom;
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBom, setShowBom] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '', city: '', postal: '', notes: '' });
  const [token, setToken] = useState('');
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<{ url: string; code: string } | null>(null);
  const [cartState, setCartState] = useState<'idle' | 'adding' | 'added' | 'error'>('idle');
  const [restored, setRestored] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ runId?: string; idx?: number; scaleEnd?: 'a' | 'b'; moved: boolean } | null>(null);
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastTapRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const panRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const designRef = useRef<Design | null>(null);
  designRef.current = design;

  const captchaConfigured = !!turnstileSiteKey && !turnstileSiteKey.startsWith('1x000');
  const est = useMemo(() => (design ? estimate(design, catalog) : null), [design, catalog]);
  const sel = useMemo(() => (design && est ? resolveSelection(design, est, catalog) : null), [design, est, catalog]);
  const colourLabel = catalog.colours.find((c) => c.key === design?.colour)?.label ?? '';
  const kitLabel = sel?.kit ? `Suggested kit: ${sel.kit.feet} ft` : null;

  /* ── restore / load by code ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('d');
    (async () => {
      try {
        if (code && /^[a-z0-9]{6,16}$/.test(code)) {
          setBusy('Loading your saved design…');
          const res = await fetch(`/api/visualizer/${code}`);
          if (!res.ok) throw new Error('Design not found');
          const data = (await res.json()) as { design: unknown };
          const p = await urlToPhoto(`/api/visualizer/${code}/image?kind=photo`);
          const d = normalizeDesign(data.design, site.site);
          d.image = { w: p.w, h: p.h };
          setPhoto(p); setDesign(d); setStep(3);
          return;
        }
        const raw = localStorage.getItem(STORAGE_KEY(site.site));
        if (raw) {
          const saved = JSON.parse(raw) as { design: unknown; photo: string; step?: Step };
          if (saved.photo && saved.design) {
            const img = await loadImage(saved.photo);
            const d = normalizeDesign(saved.design, site.site);
            setPhoto({ dataUrl: saved.photo, img, w: img.naturalWidth, h: img.naturalHeight });
            d.image = { w: img.naturalWidth, h: img.naturalHeight };
            setDesign(d); setStep(saved.step && saved.step > 1 ? saved.step : 2); setRestored(true);
          }
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setBusy(null);
      }
    })();
  }, [site.site]);

  /* ── persist ── */
  useEffect(() => {
    if (!photo || !design) return;
    try {
      localStorage.setItem(STORAGE_KEY(site.site), JSON.stringify({ design, photo: photo.dataUrl, step }));
    } catch { /* quota or private mode */ }
  }, [photo, design, step, site.site]);

  /* ── sizing ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !photo) return;
    const update = () => {
      const w = el.clientWidth;
      const maxH = Math.max(320, Math.min(window.innerHeight * 0.72, 760));
      setBaseScale(Math.min(w / photo.w, maxH / photo.h));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [photo]);

  /* ── draw ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !photo || !design || !est) return;
    const W = Math.round(photo.w * viewScale), H = Math.round(photo.h * viewScale);
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(photo.img, 0, 0, W, H);
    const k = Math.max(0.85, Math.min(1.1, W / 720));
    drawOverlay(ctx, design, est, {
      scale: viewScale, k,
      showGrid: showGrid && step >= 3,
      showLengths: step >= 3,
      mode: step === 2 ? 'scale' : step === 3 ? 'draw' : 'view',
      activeRunId, selectedRunId, scaleDraft, cursor,
      summary: step === 4, legend: step >= 3, kitLabel: step === 4 ? kitLabel : null,
    });
  }, [photo, design, est, viewScale, showGrid, step, activeRunId, selectedRunId, scaleDraft, cursor, kitLabel]);

  /* ── design mutators ── */
  const update = useCallback((fn: (d: Design) => Design) => setDesign((d) => (d ? fn(d) : d)), []);
  const updateRun = useCallback((id: string, fn: (r: Run) => Run) => update((d) => ({ ...d, runs: d.runs.map((r) => (r.id === id ? fn(r) : r)) })), [update]);

  const finishRun = useCallback(() => {
    lastTapRef.current = null;
    const d = designRef.current;
    if (!d) return;
    if (activeRunId) {
      const run = d.runs.find((r) => r.id === activeRunId);
      if (run && run.points.length < 2) update((dd) => ({ ...dd, runs: dd.runs.filter((r) => r.id !== activeRunId) }));
    }
    setActiveRunId(null);
  }, [activeRunId, update]);

  const undoPoint = useCallback(() => {
    const d = designRef.current;
    if (!d) return;
    const targetId = activeRunId ?? d.runs[d.runs.length - 1]?.id;
    if (!targetId) return;
    update((dd) => {
      const runs = dd.runs.map((r) => (r.id === targetId ? { ...r, points: r.points.slice(0, -1) } : r)).filter((r) => r.points.length > 0);
      return { ...dd, runs };
    });
    if (!d.runs.find((r) => r.id === targetId && r.points.length > 1)) setActiveRunId(null);
    else setActiveRunId(targetId);
  }, [activeRunId, update]);

  const deleteRun = useCallback((id: string) => {
    update((d) => ({ ...d, runs: d.runs.filter((r) => r.id !== id) }));
    if (activeRunId === id) setActiveRunId(null);
    if (selectedRunId === id) setSelectedRunId(null);
  }, [activeRunId, selectedRunId, update]);

  const clearAll = () => {
    if (!design?.runs.length || window.confirm('Remove every run you have drawn?')) {
      update((d) => ({ ...d, runs: [] })); setActiveRunId(null); setSelectedRunId(null);
    }
  };

  const startOver = () => {
    if (!window.confirm('Start over with a new photo? Your current drawing will be cleared.')) return;
    try { localStorage.removeItem(STORAGE_KEY(site.site)); } catch { /* ignore */ }
    setPhoto(null); setDesign(null); setStep(1); setActiveRunId(null); setSelectedRunId(null); setScaleDraft(null); setResult(null); setSubmitState('idle'); setRestored(false);
    window.history.replaceState(null, '', site.path);
  };

  /* ── photo intake ── */
  const acceptFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose a photo (JPG, PNG, HEIC or WebP).'); return; }
    setError(null); setBusy('Preparing your photo…');
    try {
      const p = await fileToPhoto(file);
      setPhoto(p);
      setDesign(emptyDesign(site.site, p.w, p.h, defaultColour));
      setActiveRunId(null); setSelectedRunId(null); setScaleDraft(null); setStep(2); setRestored(false);
    } catch (e) {
      setError(`Could not read that photo (${(e as Error).message}). Try a JPG or PNG.`);
    } finally {
      setBusy(null);
    }
  };

  const useSample = async () => {
    if (!site.samplePhoto) return;
    setBusy('Loading sample photo…');
    try {
      const p = await urlToPhoto(site.samplePhoto);
      setPhoto(p); setDesign(emptyDesign(site.site, p.w, p.h, defaultColour)); setStep(2); setRestored(false);
    } catch { setError('Could not load the sample photo.'); } finally { setBusy(null); }
  };

  /* ── pointer handling ── */
  const toImage = (e: React.PointerEvent): Pt => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = Math.max(0, Math.min(photo!.w, (e.clientX - rect.left) / viewScale));
    const y = Math.max(0, Math.min(photo!.h, (e.clientY - rect.top) / viewScale));
    return { x, y };
  };
  const hitRadius = () => 14 / viewScale;

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!photo || !design || step === 1 || step === 4) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = toImage(e);
    downRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    dragRef.current = null;
    if (panMode || (e.pointerType === 'mouse' && e.button === 1)) {
      const c = containerRef.current!;
      panRef.current = { x: e.clientX, y: e.clientY, left: c.scrollLeft, top: c.scrollTop };
      return;
    }
    const r = hitRadius();
    if (step === 2 && design.scale) {
      if (Math.hypot(design.scale.a.x - p.x, design.scale.a.y - p.y) <= r) dragRef.current = { scaleEnd: 'a', moved: false };
      else if (Math.hypot(design.scale.b.x - p.x, design.scale.b.y - p.y) <= r) dragRef.current = { scaleEnd: 'b', moved: false };
    }
    if (step === 3) {
      for (const run of [...design.runs].reverse()) {
        const idx = run.points.findIndex((q) => Math.hypot(q.x - p.x, q.y - p.y) <= r);
        if (idx >= 0) { dragRef.current = { runId: run.id, idx, moved: false }; setSelectedRunId(run.id); break; }
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!photo || !design) return;
    if (panRef.current) {
      const c = containerRef.current!;
      c.scrollLeft = panRef.current.left - (e.clientX - panRef.current.x);
      c.scrollTop = panRef.current.top - (e.clientY - panRef.current.y);
      return;
    }
    const p = toImage(e);
    if (e.pointerType === 'mouse' || dragRef.current) setCursor(p);
    const drag = dragRef.current;
    if (!drag || !downRef.current) return;
    if (!drag.moved && Math.hypot(e.clientX - downRef.current.x, e.clientY - downRef.current.y) < 4) return;
    drag.moved = true;
    if (drag.scaleEnd) update((d) => (d.scale ? { ...d, scale: { ...d.scale, [drag.scaleEnd!]: p } } : d));
    else if (drag.runId !== undefined && drag.idx !== undefined) updateRun(drag.runId, (r) => ({ ...r, points: r.points.map((q, i) => (i === drag.idx ? p : q)) }));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (panRef.current) { panRef.current = null; downRef.current = null; return; }
    if (!photo || !design || !downRef.current) return;
    const p = toImage(e);
    const drag = dragRef.current;
    const moved = Math.hypot(e.clientX - downRef.current.x, e.clientY - downRef.current.y) >= 6;
    dragRef.current = null;
    downRef.current = null;
    if (e.pointerType !== 'mouse') setCursor(null);
    if (drag && (drag.moved || moved)) return; // finished a drag
    if (moved) return;
    let snapped: Pt | null = null;
    if (drag && step === 3 && drag.runId !== undefined && drag.idx !== undefined) {
      // Tapped an existing vertex: start a new run there, or join the active run to it.
      if (drag.runId === activeRunId) return;
      snapped = design.runs.find((r) => r.id === drag.runId)?.points[drag.idx] ?? null;
    }

    if (step === 2) {
      const preset = SCALE_PRESETS.find((s) => s.key === scalePreset)!;
      const feet = preset.feet ?? parseFloat(customFeet);
      if (!feet || feet <= 0) { setError('Enter the length of your reference first.'); return; }
      setError(null);
      if (!scaleDraft) { setScaleDraft(p); return; }
      if (Math.hypot(scaleDraft.x - p.x, scaleDraft.y - p.y) < 6) return;
      const label = preset.feet ? preset.label : (customLabel.trim() || 'Reference');
      update((d) => ({ ...d, scale: { a: scaleDraft, b: p, feet, label }, manualFeet: null }));
      setScaleDraft(null);
      return;
    }

    if (step === 3) {
      const now = Date.now();
      const last = lastTapRef.current;
      const q = snapped ?? p;
      const isDouble = !!activeRunId && !!last && now - last.t < 350 && Math.hypot(last.x - e.clientX, last.y - e.clientY) < 24;
      lastTapRef.current = { x: e.clientX, y: e.clientY, t: now };
      if (isDouble) { finishRun(); return; }
      if (activeRunId && design.runs.some((r) => r.id === activeRunId)) {
        updateRun(activeRunId, (r) => ({ ...r, points: [...r.points, q] }));
        setSelectedRunId(activeRunId);
      } else {
        const id = uid();
        update((d) => ({ ...d, runs: [...d.runs, { id, kind: mode, points: [q] }] }));
        setActiveRunId(id); setSelectedRunId(id);
      }
    }
  };

  useEffect(() => {
    if (step !== 3) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'Escape') finishRun();
      if (e.key === 'Backspace' && activeRunId) { e.preventDefault(); undoPoint(); }
      if (e.key === 'Delete' && selectedRunId && !activeRunId) deleteRun(selectedRunId);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, finishRun, undoPoint, deleteRun, activeRunId, selectedRunId]);

  /* ── captcha watchdog ── */
  useEffect(() => {
    if (step !== 4 || !captchaConfigured || token) { setCaptchaFailed(false); return; }
    const id = setTimeout(() => setCaptchaFailed(true), 15000);
    return () => clearTimeout(id);
  }, [step, captchaConfigured, token]);

  /* ── add-on editing ── */
  const currentAddons = (): Record<string, number> => {
    if (!design || !est) return {};
    return design.addons ?? Object.fromEntries(est.addons.filter((a) => a.recommended).map((a) => [a.key, a.qty]));
  };
  const setAddon = (key: string, qty: number) => update((d) => ({ ...d, addons: { ...currentAddons(), [key]: Math.max(0, qty) } }));

  /* ── cart ── */
  const cartLines = (): CartLine[] => {
    if (!sel?.kit) return [];
    const pick = (variants: { id: string; label: string }[] | undefined) => {
      if (!variants?.length) return null;
      return variants.find((v) => v.label.toLowerCase() === colourLabel.toLowerCase())?.id ?? variants[0].id;
    };
    const lines: CartLine[] = [];
    const kv = pick(sel.kit.variants);
    if (kv) lines.push({ variantId: kv, qty: 1 });
    for (const l of sel.lines) {
      const v = pick(l.component.variants);
      if (v) lines.push({ variantId: v, qty: l.qty });
    }
    return lines;
  };
  const doAddToCart = async () => {
    if (!addToCart) return;
    setCartState('adding');
    try {
      const r = await addToCart(cartLines());
      setCartState(r.ok ? 'added' : 'error');
      if (!r.ok) setError(r.error ?? 'Could not add to cart.');
    } catch (e) { setCartState('error'); setError((e as Error).message); }
  };

  /* ── submit ── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !design || !est) return;
    if (captchaConfigured && !token) { setError(captchaFailed ? 'The spam check could not load. Please reload the page or call us.' : 'One moment — the spam check is still running.'); return; }
    setError(null); setSubmitState('sending');
    try {
      const annotated = renderAnnotated(photo.img, design, est, `${site.domain} · Light Visualizer`, kitLabel);
      const res = await fetch('/api/visualizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ design: { ...design, notes: contact.notes }, photo: photo.dataUrl, annotated, contact, token }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; code?: string; error?: string };
      if (!res.ok || !data.ok || !data.url) throw new Error(data.error ?? 'Could not send your design.');
      setResult({ url: data.url, code: data.code ?? '' });
      setSubmitState('done');
      try { localStorage.removeItem(STORAGE_KEY(site.site)); } catch { /* ignore */ }
      try { (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'visualizer_submit', kit: sel?.kit?.feet ?? null }); } catch { /* ignore */ }
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setSubmitState('error'); setError((err as Error).message); setToken('');
    }
  };

  /* ─────────────────────────── render ─────────────────────────── */

  useEffect(() => { if (step === 4 || step === 1) { setPanMode(false); setZoom(1); } }, [step]);

  const steps: { n: Step; label: string }[] = [{ n: 1, label: 'Photo' }, { n: 2, label: 'Scale' }, { n: 3, label: 'Draw' }, { n: 4, label: 'Review & send' }];
  const canGo = (n: Step) => !!photo && (n <= 3 || (design?.runs.some((r) => r.kind === 'lit' && r.points.length > 1) || !!design?.manualFeet));
  const preset = SCALE_PRESETS.find((s) => s.key === scalePreset)!;

  if (submitState === 'done' && result) {
    const link = `${typeof window !== 'undefined' ? window.location.origin : `https://${site.domain}`}${result.url}`;
    return (
      <div ref={successRef} className={`${theme.card} p-6 md:p-10`}>
        <p className={theme.eyebrow}>Design sent</p>
        <h2 className={`mt-3 text-2xl md:text-3xl font-bold ${theme.heading}`}>Thanks, {contact.name.split(' ')[0]} — we have your light plan.</h2>
        <p className={`mt-3 text-base ${theme.muted}`}>We&rsquo;ll check your measurements against the photo, confirm the kit and extras, and email you a secure payment link within one business day. Nothing is charged until you approve it.</p>
        <div className={`mt-6 rounded-2xl ${theme.softBg} p-4`}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${theme.muted}`}>Your design link</p>
          <a href={result.url} className={`mt-1 block break-all font-mono text-sm ${theme.accentText} underline`}>{link}</a>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={theme.btnSecondary} onClick={() => navigator.clipboard?.writeText(link).catch(() => {})}>Copy link</button>
            <a href={result.url} className={theme.btnPrimary}>View my design</a>
          </div>
        </div>
        {sel?.kit && (
          <ul className={`mt-6 space-y-1 text-sm ${theme.muted}`}>
            <li>Lights ≈ {est?.litFeet} ft · plan for ≈ {est?.requiredFeet} ft</li>
            <li>{sel.kit.feet} ft kit — {formatMoney(sel.kit.price)}</li>
            {sel.lines.map((l) => <li key={l.component.key}>{l.qty} × {l.component.name}</li>)}
            {sel.total !== null && <li className={`font-semibold ${theme.heading}`}>Estimated total before shipping &amp; tax: {formatMoney(sel.total)}</li>}
          </ul>
        )}
        <p className={`mt-6 text-sm ${theme.muted}`}>Questions now? Call <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="font-semibold underline">{site.phone}</a>.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-start">
      {/* ── stepper (full width) ── */}
      <ol className="lg:col-span-2 flex flex-wrap gap-2" aria-label="Steps">
        {steps.map((s) => {
          const on = step === s.n, done = step > s.n;
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => canGo(s.n) && setStep(s.n)}
                disabled={!canGo(s.n)}
                aria-current={on ? 'step' : undefined}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors disabled:opacity-40 ${on ? theme.chipOn : theme.chipOff}`}
              >
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${on ? 'bg-white/20' : done ? 'bg-emerald-500 text-white' : 'bg-black/10'}`}>{done ? '✓' : s.n}</span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      {/* ── canvas / upload ── */}
      <div className={`${theme.card} overflow-hidden`}>
        {!photo ? (
          <div
            className="flex min-h-[380px] flex-col items-center justify-center gap-4 p-8 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); void acceptFile(e.dataTransfer.files?.[0]); }}
          >
            <span className={`flex h-16 w-16 items-center justify-center rounded-full ${theme.softBg} ${theme.accentText}`}><IconUpload /></span>
            <h2 className={`text-xl md:text-2xl font-bold ${theme.heading}`}>Start with a photo of your home</h2>
            <p className={`max-w-md text-sm ${theme.muted}`}>Stand across the street and shoot the whole front of the house in daylight, straight on. Include the garage door if you have one — it makes a great ruler.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" className={theme.btnPrimary} onClick={() => fileRef.current?.click()} disabled={!!busy}>{busy ?? 'Choose or take a photo'}</button>
              {site.samplePhoto && <button type="button" className={theme.btnSecondary} onClick={useSample} disabled={!!busy}>Try a sample house</button>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => void acceptFile(e.target.files?.[0])} />
            <p className={`text-xs ${theme.muted}`}>JPG, PNG, HEIC or WebP · your photo is only used to plan your lights</p>
          </div>
        ) : (
          <>
            {/* toolbar */}
            <div className={`flex flex-wrap items-center gap-2 border-b border-black/10 px-3 py-2 ${theme.softBg}`}>
              {step === 3 && (
                <>
                  <div className="inline-flex rounded-full border border-black/15 bg-white p-0.5" role="group" aria-label="Drawing mode">
                    <button type="button" aria-pressed={mode === 'lit'} onClick={() => { finishRun(); setMode('lit'); }} className={`min-h-[40px] rounded-full px-3 text-sm font-semibold ${mode === 'lit' ? 'bg-emerald-500 text-white' : ''}`}>
                      <span className="mr-1.5 inline-block h-2.5 w-5 rounded-full align-middle" style={{ background: COLORS.lit }} />Lights
                    </button>
                    <button type="button" aria-pressed={mode === 'jump'} onClick={() => { finishRun(); setMode('jump'); }} className={`min-h-[40px] rounded-full px-3 text-sm font-semibold ${mode === 'jump' ? 'bg-yellow-400 text-black' : ''}`}>
                      <span className="mr-1.5 inline-block h-2.5 w-5 rounded-full border-2 border-dashed align-middle" style={{ borderColor: COLORS.jumpDark }} />Unlit jump
                    </button>
                  </div>
                  <button type="button" className={theme.btnGhost} onClick={undoPoint} disabled={!design?.runs.length}>Undo point</button>
                  <button type="button" className={theme.btnGhost} onClick={finishRun} disabled={!activeRunId}>Finish run</button>
                  <button type="button" className={theme.btnGhost} onClick={() => selectedRunId && deleteRun(selectedRunId)} disabled={!selectedRunId}>Delete run</button>
                  <label className={`inline-flex min-h-[40px] items-center gap-2 text-sm ${theme.muted}`}>
                    <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} className="h-4 w-4" /> 2 ft grid
                  </label>
                </>
              )}
              {(step === 2 || step === 3) && (
                <div className="ml-auto inline-flex items-center gap-1" role="group" aria-label="Zoom">
                  <button type="button" className="h-10 w-10 rounded-full border border-black/15 bg-white text-lg leading-none disabled:opacity-40" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}>−</button>
                  <span className={`w-10 text-center text-xs font-semibold tabular-nums ${theme.muted}`}>{zoom}×</span>
                  <button type="button" className="h-10 w-10 rounded-full border border-black/15 bg-white text-lg leading-none disabled:opacity-40" aria-label="Zoom in" disabled={zoom >= 4} onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}>+</button>
                  <button type="button" aria-pressed={panMode} onClick={() => setPanMode((v) => !v)} className={`ml-1 min-h-[40px] rounded-full border px-3 text-sm font-semibold ${panMode ? theme.chipOn : theme.chipOff}`} title="Drag to move around the photo">Pan</button>
                </div>
              )}
              {step === 2 && (
                <p className={`text-sm ${theme.muted}`}>
                  {design?.scale ? <>Reference set: <strong className={theme.heading}>{design.scale.label} = {design.scale.feet} ft</strong>. Drag either end to fine-tune, or tap twice to redraw.</> : scaleDraft ? 'Now tap the other end.' : preset.hint}
                </p>
              )}
              {step === 4 && <p className={`text-sm ${theme.muted}`}>This is the picture we&rsquo;ll receive. Go back to <button type="button" className="font-semibold underline" onClick={() => setStep(3)}>Draw</button> to adjust anything.</p>}
              <button type="button" className={`${theme.btnGhost} ${step === 3 ? '' : 'ml-auto'}`} onClick={startOver}>New photo</button>
            </div>
            <div ref={containerRef} className="relative w-full overflow-auto bg-black/90" style={{ maxHeight: '80vh', overscrollBehavior: 'contain' }}>
              <canvas
                ref={canvasRef}
                className={`block ${zoom > 1 ? '' : 'mx-auto max-w-full'} ${panMode ? 'cursor-grab' : step === 2 || step === 3 ? 'cursor-crosshair' : ''}`}
                style={{ touchAction: step === 2 || step === 3 ? 'none' : 'auto' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => { dragRef.current = null; downRef.current = null; panRef.current = null; }}
                onPointerLeave={() => setCursor(null)}
                onContextMenu={(e) => e.preventDefault()}
                aria-label="Your home photo with light runs drawn on top"
              />
              {busy && <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">{busy}</div>}
            </div>
            {step === 3 && (
              <div className={`border-t border-black/10 px-3 py-2 text-xs ${theme.muted}`}>
                Tap along the roofline to add points. Double-tap or press <kbd className="rounded border px-1">Esc</kbd> to finish a run. Drag any point to move it. Tap an existing point to start a new run from it. Zoom in and use Pan on a phone for precision.
                {est && est.hasScale ? '' : ' No scale is set, so lengths will not show.'}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── side panel ── */}
      <aside className="space-y-4">
        {error && <p className={`rounded-xl px-4 py-3 text-sm ${theme.danger}`} role="alert">{error}</p>}
        {restored && step > 1 && <p className={`rounded-xl px-4 py-3 text-sm ${theme.softBg} ${theme.muted}`}>We restored the design you were working on. <button type="button" className="font-semibold underline" onClick={startOver}>Start fresh</button> if you&rsquo;d rather.</p>}

        {step === 1 && (
          <div className={`${theme.card} p-5`}>
            <p className={theme.eyebrow}>How it works</p>
            <ol className={`mt-3 space-y-3 text-sm ${theme.muted}`}>
              <li><strong className={theme.heading}>1. Upload a photo</strong> of the front of your home.</li>
              <li><strong className={theme.heading}>2. Set the scale</strong> by tapping both ends of your garage door or front door.</li>
              <li><strong className={theme.heading}>3. Draw the runs</strong> where you want lights, and mark any gaps you want to skip.</li>
              <li><strong className={theme.heading}>4. See your kit</strong> and the extras you may need, then send it to us. We check it and reply with a payment link.</li>
            </ol>
          </div>
        )}

        {step === 2 && design && (
          <div className={`${theme.card} p-5 space-y-4`}>
            <div>
              <p className={theme.eyebrow}>Step 2 · Set the scale</p>
              <h2 className={`mt-2 text-lg font-bold ${theme.heading}`}>What in the photo do you know the size of?</h2>
              <p className={`mt-1 text-sm ${theme.muted}`}>Pick one, then tap its two ends on the photo. Everything else is measured from that.</p>
            </div>
            <div className="grid gap-2">
              {SCALE_PRESETS.map((s) => (
                <label key={s.key} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${scalePreset === s.key ? 'border-current' : 'border-black/10'}`}>
                  <input type="radio" name="scale-preset" value={s.key} checked={scalePreset === s.key} onChange={() => { setScalePreset(s.key); setScaleDraft(null); }} className="h-4 w-4" />
                  <span className={`flex-1 font-medium ${theme.heading}`}>{s.label}</span>
                  {s.feet && <span className={`text-xs ${theme.muted}`}>{s.key === 'door' ? "6' 8\"" : `${s.feet} ft`}</span>}
                </label>
              ))}
            </div>
            {scalePreset === 'custom' && (
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <div>
                  <label htmlFor="vz-custom-label" className={theme.label}>What is it?</label>
                  <input id="vz-custom-label" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="e.g. Front window" className={theme.input} />
                </div>
                <div>
                  <label htmlFor="vz-custom-feet" className={theme.label}>Length (ft)</label>
                  <input id="vz-custom-feet" value={customFeet} onChange={(e) => setCustomFeet(e.target.value)} inputMode="decimal" placeholder="12" className={`${theme.input} w-24`} />
                </div>
              </div>
            )}
            {scalePreset === 'garage1' && <p className={`text-xs ${theme.muted}`}>Most single doors are 8 ft wide; some are 9 ft. Choose &ldquo;Something else&rdquo; if yours is 9.</p>}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={theme.btnPrimary} disabled={!design.scale} onClick={() => setStep(3)}>Next: draw the lights</button>
              {design.scale && <button type="button" className={theme.btnGhost} onClick={() => { update((d) => ({ ...d, scale: null })); setScaleDraft(null); }}>Clear reference</button>}
            </div>
            <details className="text-sm">
              <summary className={`cursor-pointer ${theme.muted}`}>Can&rsquo;t set a scale? Type your roofline length instead</summary>
              <div className="mt-2 flex items-end gap-2">
                <div className="flex-1">
                  <label htmlFor="vz-manual" className={theme.label}>Total feet of lights</label>
                  <input id="vz-manual" inputMode="numeric" className={theme.input} value={design.manualFeet ?? ''} onChange={(e) => update((d) => ({ ...d, manualFeet: parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : null }))} placeholder="120" />
                </div>
                <button type="button" className={theme.btnSecondary} disabled={!design.manualFeet} onClick={() => setStep(3)}>Use this</button>
              </div>
              <p className={`mt-1 text-xs ${theme.muted}`}>You can still draw on the photo so we can see where the lights go; lengths just won&rsquo;t be measured.</p>
            </details>
            <p className={`text-xs ${theme.muted}`}>Photos flatten perspective, so treat every length as an estimate. We add a {Math.round(ALLOWANCE_RATE * 100)}% fitting allowance and confirm the real numbers before you pay.</p>
          </div>
        )}

        {step === 3 && design && est && (
          <div className="space-y-4">
            <div className={`${theme.card} p-5`}>
              <p className={theme.eyebrow}>Step 3 · Draw your lights</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className={`rounded-xl ${theme.softBg} p-3`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme.muted}`}>Lights</p>
                  <p className={`text-2xl font-bold ${theme.heading}`}>{est.hasScale ? `≈ ${est.litFeet} ft` : design.manualFeet ? `${design.manualFeet} ft` : '—'}</p>
                  <p className={`text-xs ${theme.muted}`}>{est.litRuns} run{est.litRuns === 1 ? '' : 's'}</p>
                </div>
                <div className={`rounded-xl ${theme.softBg} p-3`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme.muted}`}>Unlit jumps</p>
                  <p className={`text-2xl font-bold ${theme.heading}`}>{est.hasScale ? `≈ ${est.jumpFeet} ft` : '—'}</p>
                  <p className={`text-xs ${theme.muted}`}>{est.jumpRuns} jump{est.jumpRuns === 1 ? '' : 's'}</p>
                </div>
              </div>
              {est.litFeet > 0 && (
                <p className={`mt-3 text-sm ${theme.muted}`}>With a {Math.round(ALLOWANCE_RATE * 100)}% fitting allowance you should plan for about <strong className={theme.heading}>{est.requiredFeet} ft</strong>{est.kit ? <> — that&rsquo;s the <strong className={theme.heading}>{est.kit.feet} ft kit</strong>.</> : '.'}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={theme.btnPrimary} disabled={!canGo(4)} onClick={() => { finishRun(); setStep(4); }}>See my kit &amp; extras</button>
                <button type="button" className={theme.btnGhost} onClick={() => setStep(2)}>Back</button>
              </div>
            </div>

            <div className={`${theme.card} p-5`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${theme.heading}`}>Runs</h3>
                {design.runs.length > 0 && <button type="button" className={`text-xs underline ${theme.muted}`} onClick={clearAll}>Clear all</button>}
              </div>
              {design.runs.length === 0 ? (
                <p className={`mt-2 text-sm ${theme.muted}`}>Nothing drawn yet. Start at one corner of the roofline and tap along every edge you want lit. Switch to <strong>Unlit jump</strong> to cross a gap you don&rsquo;t want lit, then back to <strong>Lights</strong>.</p>
              ) : (
                <ul className="mt-2 divide-y divide-black/10">
                  {design.runs.map((r, i) => {
                    const litNo = design.runs.slice(0, i + 1).filter((x) => x.kind === 'lit').length;
                    return (
                      <li key={r.id} className={`flex flex-wrap items-center gap-2 py-2 text-sm ${selectedRunId === r.id ? 'bg-black/5 -mx-2 px-2 rounded-lg' : ''}`}>
                        <button type="button" className="flex flex-1 items-center gap-2 text-left" onClick={() => setSelectedRunId(r.id)}>
                          <span className="inline-block h-2.5 w-6 rounded-full" style={{ background: r.kind === 'lit' ? COLORS.lit : COLORS.jump }} />
                          <span className={`font-medium ${theme.heading}`}>{r.kind === 'lit' ? `Lights ${litNo}` : 'Jump'}</span>
                          <span className={theme.muted}>{est.hasScale ? `≈ ${Math.round(est.runFeet[r.id] ?? 0)} ft` : `${r.points.length} pt`}</span>
                          {r.id === activeRunId && <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase">drawing</span>}
                        </button>
                        {r.kind === 'lit' && (
                          <label className={`inline-flex items-center gap-1 text-xs ${theme.muted}`} title="Detached garage, shed or fence">
                            <input type="checkbox" className="h-4 w-4" checked={!!r.separate} onChange={(e) => updateRun(r.id, (x) => ({ ...x, separate: e.target.checked }))} /> separate building
                          </label>
                        )}
                        <button type="button" className={`text-xs underline ${theme.muted}`} onClick={() => updateRun(r.id, (x) => ({ ...x, kind: x.kind === 'lit' ? 'jump' : 'lit' }))}>{r.kind === 'lit' ? 'make jump' : 'make lights'}</button>
                        <button type="button" className="h-8 w-8 rounded-full text-lg leading-none hover:bg-black/10" aria-label="Delete run" onClick={() => deleteRun(r.id)}>×</button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

        {step === 4 && design && est && sel && (
          <form onSubmit={submit} className="space-y-4">
            {/* kit */}
            <div className={`${theme.card} p-5`}>
              <p className={theme.eyebrow}>Step 4 · Your kit</p>
              {sel.kit ? (
                <>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h2 className={`text-xl font-bold ${theme.heading}`}>{sel.kit.feet} ft permanent lighting kit</h2>
                    <span className={`text-lg font-bold ${theme.heading}`}>{formatMoney(sel.kit.price)}</span>
                  </div>
                  <p className={`mt-1 text-sm ${theme.muted}`}>
                    You drew ≈ {est.litFeet} ft of lights{est.jumpFeet ? ` and ${est.jumpFeet} ft of jumps` : ''}; with the fitting allowance that&rsquo;s ≈ {est.requiredFeet} ft.
                    {design.kitSlug && design.kitSlug !== est.kit?.slug ? <> We suggested the {est.kit?.feet} ft kit; you chose the {sel.kit.feet} ft.</> : ` ${sel.kit.suits}`}
                  </p>
                  {est.overflowFeet > 0 && <p className={`mt-2 rounded-lg px-3 py-2 text-sm ${theme.softBg}`}>Your roofline is about {est.overflowFeet} ft longer than our largest kit, so extra strands and track are added below. We&rsquo;ll confirm whether two kits work out cheaper.</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <label htmlFor="vz-kit" className={`text-sm ${theme.muted}`}>Change kit:</label>
                    <select id="vz-kit" className={`${theme.input} w-auto`} value={sel.kit.slug} onChange={(e) => update((d) => ({ ...d, kitSlug: e.target.value === est.kit?.slug ? null : e.target.value }))}>
                      {catalog.kits.map((k: VzKit) => <option key={k.slug} value={k.slug}>{k.feet} ft — {formatMoney(k.price)}{k.slug === est.kit?.slug ? ' (suggested)' : ''}</option>)}
                    </select>
                    <a href={`${site.kitBasePath}/${sel.kit.slug}`} target="_blank" rel="noopener" className={`text-sm underline ${theme.accentText}`}>Kit details</a>
                  </div>
                  <button type="button" className={`mt-3 text-sm font-semibold underline ${theme.heading}`} onClick={() => setShowBom((v) => !v)}>{showBom ? 'Hide' : 'Show'} what&rsquo;s in the box</button>
                  {showBom && (
                    <ul className={`mt-2 grid gap-1.5 text-sm ${theme.muted}`}>
                      {kitContents(sel.kit, catalog).map(({ component, qty }) => (
                        <li key={component.key} className="flex items-center gap-2">
                          {component.image ? <Image src={component.image} alt="" width={28} height={28} className="h-7 w-7 rounded object-cover" /> : <span className="h-7 w-7 rounded bg-black/10" />}
                          <span><strong className={theme.heading}>{qty} ×</strong> {component.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className={`mt-2 text-sm ${theme.muted}`}>Draw at least one run of lights, or type your roofline length on the Scale step, to get a kit suggestion.</p>
              )}
            </div>

            {/* options */}
            <div className={`${theme.card} p-5 space-y-4`}>
              <div>
                <p className={`text-sm font-bold ${theme.heading}`}>Track colour</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {catalog.colours.map((c) => (
                    <button key={c.key} type="button" aria-pressed={design.colour === c.key} onClick={() => update((d) => ({ ...d, colour: c.key }))} className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3 text-sm font-medium ${design.colour === c.key ? theme.chipOn : theme.chipOff}`}>
                      {c.hex && <span className="inline-block h-4 w-4 rounded-full border border-black/15" style={{ background: c.hex }} />}{c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="vz-outlet" className={`text-sm font-bold ${theme.heading}`}>How far is the nearest outdoor outlet from where the lights start?</label>
                <select id="vz-outlet" className={`${theme.input} mt-2`} value={design.outlet} onChange={(e) => update((d) => ({ ...d, outlet: e.target.value as Design['outlet'], addons: null }))}>
                  {OUTLET_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* add-ons */}
            {sel.kit && (
              <div className={`${theme.card} p-5`}>
                <p className={`text-sm font-bold ${theme.heading}`}>Extras you may need</p>
                <p className={`mt-1 text-xs ${theme.muted}`}>Worked out from your drawing and the parts already in the kit. Untick anything you don&rsquo;t want.</p>
                {est.addons.length === 0 && <p className={`mt-3 text-sm ${theme.muted}`}>Good news: the {sel.kit.feet} ft kit already includes everything your drawing needs.</p>}
                <ul className="mt-3 divide-y divide-black/10">
                  {est.addons.map((a) => {
                    const comp = catalog.components.find((c) => c.key === a.key);
                    if (!comp) return null;
                    const qty = currentAddons()[a.key] ?? 0;
                    return (
                      <li key={a.key} className="flex flex-wrap items-start gap-3 py-3">
                        <input type="checkbox" className="mt-1 h-4 w-4" checked={qty > 0} onChange={(e) => setAddon(a.key, e.target.checked ? a.qty : 0)} aria-label={`Include ${comp.name}`} />
                        {comp.image ? <Image src={comp.image} alt="" width={44} height={44} className="h-11 w-11 rounded-lg object-cover" /> : <span className="h-11 w-11 rounded-lg bg-black/10" />}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold ${theme.heading}`}>{comp.name} {comp.price !== null && <span className={`font-normal ${theme.muted}`}>· {formatMoney(comp.price)} each</span>}</p>
                          <p className={`text-xs ${theme.muted}`}>{a.reason}</p>
                          {!a.recommended && <span className="mt-1 inline-block rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase">optional</span>}
                        </div>
                        <Stepper value={qty} onChange={(n) => setAddon(a.key, n)} theme={theme} />
                      </li>
                    );
                  })}
                </ul>
                <button type="button" className={`mt-3 text-sm font-semibold underline ${theme.heading}`} onClick={() => setShowMore((v) => !v)}>{showMore ? 'Hide' : 'Add'} other parts</button>
                {showMore && (
                  <ul className="mt-2 divide-y divide-black/10">
                    {catalog.components.filter((c) => !est.addons.some((a) => a.key === c.key)).map((comp) => {
                      const qty = currentAddons()[comp.key] ?? 0;
                      return (
                        <li key={comp.key} className="flex items-center gap-3 py-2.5">
                          {comp.image ? <Image src={comp.image} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-cover" /> : <span className="h-9 w-9 rounded-lg bg-black/10" />}
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${theme.heading}`}>{comp.name}</p>
                            <p className={`text-xs ${theme.muted}`}>{comp.price !== null ? formatMoney(comp.price) : comp.blurb}</p>
                          </div>
                          <Stepper value={qty} onChange={(n) => setAddon(comp.key, n)} theme={theme} />
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div className={`mt-4 space-y-1 border-t border-black/10 pt-3 text-sm ${theme.muted}`}>
                  <div className="flex justify-between"><span>{sel.kit.feet} ft kit</span><span>{formatMoney(sel.kit.price)}</span></div>
                  {sel.lines.map((l) => <div key={l.component.key} className="flex justify-between"><span>{l.qty} × {l.component.name}</span><span>{l.unitPrice !== null ? formatMoney(l.unitPrice * l.qty) : 'quoted'}</span></div>)}
                  <div className={`flex justify-between border-t border-black/10 pt-2 text-base font-bold ${theme.heading}`}><span>Estimated total</span><span>{sel.total !== null ? formatMoney(sel.total) : `from ${formatMoney(sel.kit.price)}`}</span></div>
                  <p className="text-xs">Before shipping and tax. {sel.total === null ? 'Extras are priced on your quote.' : ''} We confirm everything before you pay.</p>
                </div>
                {addToCart && (
                  <div className="mt-4">
                    {cartState === 'added' ? (
                      <a href={cartPath} className={`${theme.btnSecondary} w-full`}>Added — view cart &amp; checkout</a>
                    ) : (
                      <button type="button" className={`${theme.btnSecondary} w-full`} disabled={cartState === 'adding' || !cartLines().length} onClick={doAddToCart}>{cartState === 'adding' ? 'Adding…' : 'Add kit + extras to cart'}</button>
                    )}
                    <p className={`mt-1 text-center text-xs ${theme.muted}`}>Prefer to check out yourself? Add it all to your cart. Or send us the plan below and we&rsquo;ll review it first.</p>
                  </div>
                )}
              </div>
            )}

            {/* contact */}
            <div className={`${theme.card} p-5 space-y-3`}>
              <p className={`text-sm font-bold ${theme.heading}`}>Send us your plan for a checked quote</p>
              <p className={`text-xs ${theme.muted}`}>A real person reviews your photo and measurements, then emails a secure payment link. No payment now.</p>
              <div className="hidden" aria-hidden="true"><label htmlFor="vz-website">Website</label><input id="vz-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label htmlFor="vz-name" className={theme.label}>Your name *</label><input id="vz-name" required autoComplete="name" className={theme.input} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></div>
                <div><label htmlFor="vz-phone" className={theme.label}>Phone *</label><input id="vz-phone" required type="tel" inputMode="tel" autoComplete="tel" className={theme.input} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
              </div>
              <div><label htmlFor="vz-email" className={theme.label}>Email *</label><input id="vz-email" required type="email" autoComplete="email" className={theme.input} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
              <div><label htmlFor="vz-address" className={theme.label}>Street address</label><input id="vz-address" autoComplete="address-line1" className={theme.input} value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label htmlFor="vz-city" className={theme.label}>City</label><input id="vz-city" autoComplete="address-level2" className={theme.input} value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} /></div>
                <div><label htmlFor="vz-postal" className={theme.label}>Postal code</label><input id="vz-postal" autoComplete="postal-code" className={theme.input} value={contact.postal} onChange={(e) => setContact({ ...contact, postal: e.target.value })} /></div>
              </div>
              <div><label htmlFor="vz-notes" className={theme.label}>Anything we should know?</label><textarea id="vz-notes" rows={3} className={`${theme.input} resize-none`} placeholder="Soffit type, where the outlet is, whether you want the back of the house too…" value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} /></div>
              {captchaConfigured && (
                <Turnstile siteKey={turnstileSiteKey!} onSuccess={setToken} onError={() => { setToken(''); setCaptchaFailed(true); }} onExpire={() => setToken('')} options={{ theme: 'light', retry: 'auto', size: 'flexible' }} />
              )}
              {captchaConfigured && !token && captchaFailed && (
                <p className={`rounded-xl px-4 py-3 text-sm ${theme.softBg}`}>The spam check could not load (usually a browser extension). Reload the page, or call <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="font-semibold underline">{site.phone}</a> and we&rsquo;ll take it from there.</p>
              )}
              <button type="submit" className={`${theme.btnPrimary} w-full`} disabled={submitState === 'sending' || !sel.kit || (captchaConfigured && !token)} aria-busy={submitState === 'sending'}>
                {submitState === 'sending' ? 'Sending your plan…' : captchaConfigured && !token ? (captchaFailed ? 'Spam check unavailable' : 'Checking you’re human…') : 'Send my plan for a checked quote'}
              </button>
              <p className={`text-center text-xs ${theme.muted}`}>We reply within one business day · Nothing is charged until you approve</p>
            </div>
            <button type="button" className={theme.btnGhost} onClick={() => setStep(3)}>← Back to drawing</button>
          </form>
        )}
      </aside>
    </div>
  );
}
