// Invoice + pick-list PDFs for web orders, drawn with pdf-lib (no browser).
//
// SAME FILE in apps/permanent-lighting-direct, apps/forever-lights and the
// QuickQuote app (lib/web-orders/documents.ts) — keep the copies identical so the
// invoice a customer is emailed matches the one staff re-download later.
//
// Master Decker Inc. is the billing company for every web store, so the invoice
// carries its letterhead and logo; the store the customer bought from is named
// as the channel.

import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { MASTER_DECKER_LOGO_PNG_BASE64 } from "./logo";

export interface OrderDocAddress {
  recipient: string;
  company?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  province: string;
  postal: string;
  country?: string | null;
  phone?: string | null;
}

export interface OrderDocLine {
  name: string;
  variant: string | null;
  sku: string;
  qty: number;
  unit: number;
  total: number;
}

export interface OrderDoc {
  id: string;
  number: string;
  status: string;
  storeName: string;
  storeDomain: string;
  createdAt: string;
  paidAt: string | null;
  email: string;
  phone: string | null;
  shipTo: OrderDocAddress | null;
  lines: OrderDocLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  shippingLabel: string;
  tax: number;
  taxLabel: string;
  total: number;
  paymentRef: string | null;
  customerNote: string | null;
}

export const BILLER = {
  name: "Master Decker Inc.",
  lines: ["50432 Yorke Line", "Belmont, ON  N0L 1B0"],
  phone: "(519) 266-6796",
  email: "service@masterdecker.com",
  web: "www.masterdecker.com",
  /** GST/HST registration number. Printed on invoices when set. */
  taxNumber: ""
};

// ---------------------------------------------------------------------------
// Kit bills of materials — a kit line on the pick list expands into the parts
// to pull. Mirrors src/content/kits.json (identical in PLD, Forever Lights,
// HLD and HLS). The track and screws take the kit's colour.

const KIT_PARTS: { key: string; name: string; coloured?: boolean }[] = [
  { key: "track", name: 'Aluminum track, 42" 5-hole', coloured: true },
  { key: "strand", name: "12V RGBW 5-light puck strand" },
  { key: "controller", name: "WiFi controller (WLED)" },
  { key: "powerSupply", name: "12V 150 W power supply" },
  { key: "conn1", name: "1 ft extension connector" },
  { key: "conn5", name: "5 ft extension connector" },
  { key: "conn10", name: "10 ft extension connector" },
  { key: "conn20", name: "20 ft extension connector" },
  { key: "powerT", name: "Power injection T-connector" },
  { key: "lightT", name: "Light T-connector" },
  { key: "powerExt20", name: "20 ft power injection cable" },
  { key: "amplifier", name: "Data amplifier" },
  { key: "screws", name: "Soffit screws, box of 100", coloured: true }
];

const KIT_BOM: Record<number, Record<string, number>> = {
  50: { strand: 16, track: 16, powerSupply: 1, controller: 1, conn1: 2, conn5: 1, conn20: 2, lightT: 1, screws: 1 },
  75: { strand: 24, track: 24, powerSupply: 1, controller: 1, conn1: 2, conn5: 1, conn10: 1, conn20: 2, lightT: 1, screws: 1 },
  100: { strand: 31, track: 31, powerSupply: 2, controller: 1, conn1: 2, conn5: 1, conn10: 2, conn20: 2, powerT: 1, lightT: 1, powerExt20: 1, amplifier: 1, screws: 1 },
  150: { strand: 45, track: 45, powerSupply: 2, controller: 1, conn1: 2, conn5: 2, conn10: 2, conn20: 2, powerT: 1, lightT: 1, powerExt20: 1, amplifier: 1, screws: 2 },
  200: { strand: 60, track: 60, powerSupply: 3, controller: 1, conn1: 4, conn5: 4, conn10: 3, conn20: 3, powerT: 2, lightT: 2, powerExt20: 2, amplifier: 2, screws: 2 },
  250: { strand: 75, track: 75, powerSupply: 3, controller: 1, conn1: 5, conn5: 5, conn10: 3, conn20: 4, powerT: 2, lightT: 2, powerExt20: 2, amplifier: 2, screws: 2 }
};

/** "Permanent Lighting Kit – 100 ft" / "Forever Lights DIY Kit – 150 ft" → 100 / 150. */
export function kitFeet(name: string): number | null {
  if (!/\bkit\b/i.test(name)) return null;
  const m = name.match(/(\d{2,3})\s*(?:ft|foot|feet)\b/i);
  const feet = m ? Number(m[1]) : NaN;
  return KIT_BOM[feet] ? feet : null;
}

export function kitPickRows(name: string, colour: string | null, kitQty: number): { qty: number; name: string }[] {
  const feet = kitFeet(name);
  if (!feet) return [];
  const bom = KIT_BOM[feet];
  const shade = colour && !/^default$/i.test(colour) ? colour : null;
  return KIT_PARTS.filter((p) => (bom[p.key] ?? 0) > 0).map((p) => ({
    qty: bom[p.key] * kitQty,
    name: p.coloured && shade ? `${p.name} - ${shade}` : p.name
  }));
}

// ---------------------------------------------------------------------------
// Drawing helpers

const PAGE_W = 612;
const PAGE_H = 792;
const M = 48;

const C = {
  ink: rgb(0.11, 0.11, 0.12),
  soft: rgb(0.35, 0.35, 0.38),
  faint: rgb(0.6, 0.6, 0.63),
  rule: rgb(0.86, 0.86, 0.88),
  wash: rgb(1, 0.973, 0.929),
  orange: rgb(0.878, 0.463, 0),
  green: rgb(0.086, 0.55, 0.3),
  white: rgb(1, 1, 1)
};

// Standard PDF fonts only cover WinAnsi; swap the few characters product names
// use that it lacks, and drop anything else rather than throw.
const SWAP: Record<string, string> = { "″": '"', "′": "'", "−": "-", " ": " ", " ": " ", " ": " " };
const WIN_ANSI_EXTRA = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";

function clean(s: string | null | undefined): string {
  return Array.from(String(s ?? ""))
    .map((ch) => SWAP[ch] ?? ch)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || WIN_ANSI_EXTRA.includes(ch);
    })
    .join("");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = clean(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      cur = next;
      continue;
    }
    if (cur) lines.push(cur);
    // A single word wider than the column gets hard-broken.
    let word = w;
    while (font.widthOfTextAtSize(word, size) > maxWidth && word.length > 1) {
      let cut = word.length - 1;
      while (cut > 1 && font.widthOfTextAtSize(word.slice(0, cut), size) > maxWidth) cut--;
      lines.push(word.slice(0, cut));
      word = word.slice(cut);
    }
    cur = word;
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

export function money(n: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n || 0);
}

function longDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Toronto" }).format(new Date(iso));
}

interface Ctx {
  doc: PDFDocument;
  page: PDFPage;
  regular: PDFFont;
  bold: PDFFont;
  logo: PDFImage | null;
}

function text(ctx: Ctx, s: string, x: number, y: number, size: number, opts: { bold?: boolean; color?: ReturnType<typeof rgb>; align?: "left" | "right" | "center" } = {}) {
  const font = opts.bold ? ctx.bold : ctx.regular;
  const t = clean(s);
  const w = font.widthOfTextAtSize(t, size);
  const dx = opts.align === "right" ? -w : opts.align === "center" ? -w / 2 : 0;
  ctx.page.drawText(t, { x: x + dx, y, size, font, color: opts.color ?? C.ink });
}

function rule(ctx: Ctx, y: number, color = C.rule, thickness = 0.75, x1 = M, x2 = PAGE_W - M) {
  ctx.page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness, color });
}

async function start(): Promise<Ctx> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let logo: PDFImage | null = null;
  try {
    logo = await doc.embedPng(Uint8Array.from(Buffer.from(MASTER_DECKER_LOGO_PNG_BASE64, "base64")));
  } catch {
    logo = null;
  }
  const page = doc.addPage([PAGE_W, PAGE_H]);
  return { doc, page, regular, bold, logo };
}

function addressLines(a: OrderDocAddress | null): string[] {
  if (!a) return ["(no address on file)"];
  return [
    a.recipient,
    a.company ?? "",
    a.line1,
    a.line2 ?? "",
    `${a.city}, ${a.province}  ${a.postal}`,
    a.country && a.country !== "CA" ? a.country : ""
  ].filter(Boolean);
}

function drawBlock(ctx: Ctx, title: string, lines: string[], x: number, y: number, width: number, size = 9.5): number {
  text(ctx, title, x, y, 7.5, { bold: true, color: C.orange });
  let yy = y - 13;
  for (const l of lines) {
    for (const part of wrap(l, ctx.regular, size, width)) {
      text(ctx, part, x, yy, size, { color: C.ink });
      yy -= size + 3;
    }
  }
  return yy;
}

function footer(ctx: Ctx, label: string) {
  const pages = ctx.doc.getPages();
  pages.forEach((p, i) => {
    const t = clean(`${label}  ·  Page ${i + 1} of ${pages.length}`);
    const w = ctx.regular.widthOfTextAtSize(t, 7.5);
    p.drawText(t, { x: (PAGE_W - w) / 2, y: 24, size: 7.5, font: ctx.regular, color: C.faint });
  });
}

// ---------------------------------------------------------------------------
// Invoice

export async function renderInvoicePdf(o: OrderDoc): Promise<Uint8Array> {
  const ctx = await start();
  const paid = !!o.paidAt;
  let y = PAGE_H - M;

  // Letterhead
  if (ctx.logo) {
    const w = 168;
    const h = (ctx.logo.height / ctx.logo.width) * w;
    ctx.page.drawImage(ctx.logo, { x: M - 6, y: y - h + 4, width: w, height: h });
    y -= h + 2;
  } else {
    text(ctx, BILLER.name, M, y - 18, 18, { bold: true, color: C.orange });
    y -= 26;
  }
  const billerLines = [
    BILLER.name,
    ...BILLER.lines,
    `${BILLER.phone}  ·  ${BILLER.email}`,
    BILLER.web,
    BILLER.taxNumber ? `GST/HST No. ${BILLER.taxNumber}` : ""
  ].filter(Boolean);
  let by = y - 4;
  for (const l of billerLines) {
    text(ctx, l, M, by, 8.5, { color: l === BILLER.name ? C.ink : C.soft, bold: l === BILLER.name });
    by -= 11.5;
  }

  // Title block
  const right = PAGE_W - M;
  text(ctx, "INVOICE", right, PAGE_H - M - 22, 26, { bold: true, align: "right" });
  const meta: [string, string][] = [
    ["Invoice no.", o.number],
    ["Date", longDate(o.paidAt ?? o.createdAt)],
    ["Order", `${o.number} (online)`],
    ["Sold through", o.storeName]
  ];
  let my = PAGE_H - M - 42;
  for (const [k, v] of meta) {
    text(ctx, k, right - 215, my, 8.5, { color: C.soft });
    text(ctx, v, right, my, 8.5, { bold: true, align: "right" });
    my -= 12;
  }
  // Status stamp
  const stamp = paid ? "PAID" : "PAYMENT PENDING";
  const sw = ctx.bold.widthOfTextAtSize(stamp, 10) + 18;
  ctx.page.drawRectangle({ x: right - sw, y: my - 10, width: sw, height: 18, color: paid ? C.green : C.orange });
  text(ctx, stamp, right - sw / 2, my - 4.5, 10, { bold: true, color: C.white, align: "center" });

  y = Math.min(by, my - 18) - 8;
  rule(ctx, y, C.orange, 1.5);
  y -= 20;

  // Parties
  const colW = (PAGE_W - 2 * M - 40) / 3;
  const billTo = [
    o.shipTo?.recipient ?? "",
    o.shipTo?.company ?? "",
    o.email,
    o.phone ?? o.shipTo?.phone ?? ""
  ].filter(Boolean);
  const y1 = drawBlock(ctx, "BILL TO", billTo, M, y, colW);
  const y2 = drawBlock(ctx, "SHIP TO", addressLines(o.shipTo), M + colW + 20, y, colW);
  const pay = [
    paid ? `Paid by card, ${longDate(o.paidAt)}` : "Awaiting payment",
    "Processed by Stripe",
    o.paymentRef ? `Ref. ${o.paymentRef}` : "",
    `Store: ${o.storeDomain}`
  ].filter(Boolean);
  const y3 = drawBlock(ctx, "PAYMENT", pay, M + 2 * (colW + 20), y, colW);
  y = Math.min(y1, y2, y3) - 14;

  // Items table
  // x of each column; qty / unit / amount are right edges.
  const cols = { item: M + 8, sku: M + 250, qty: M + 386, unit: M + 450, amount: PAGE_W - M - 8 };
  const itemW = cols.sku - cols.item - 12;
  const skuW = cols.qty - 26 - cols.sku;
  const header = () => {
    ctx.page.drawRectangle({ x: M, y: y - 6, width: PAGE_W - 2 * M, height: 20, color: C.wash });
    text(ctx, "ITEM", cols.item, y, 7.5, { bold: true, color: C.soft });
    text(ctx, "SKU", cols.sku, y, 7.5, { bold: true, color: C.soft });
    text(ctx, "QTY", cols.qty, y, 7.5, { bold: true, color: C.soft, align: "right" });
    text(ctx, "UNIT PRICE", cols.unit, y, 7.5, { bold: true, color: C.soft, align: "right" });
    text(ctx, "AMOUNT", cols.amount, y, 7.5, { bold: true, color: C.soft, align: "right" });
    y -= 24;
  };
  header();

  for (const line of o.lines) {
    const nameLines = wrap(line.name, ctx.bold, 9.5, itemW);
    const variant = line.variant && !/^default$/i.test(line.variant) ? line.variant : null;
    const skuLines = wrap(line.sku, ctx.regular, 7.5, skuW);
    const drop = Math.max((nameLines.length - 1) * 12.5 + (variant ? 11 : 0), (skuLines.length - 1) * 10);
    const rowH = drop + 24;
    if (y - rowH < 60) {
      ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - M;
      header();
    }
    let ly = y;
    nameLines.forEach((l) => {
      text(ctx, l, cols.item, ly, 9.5, { bold: true });
      ly -= 12.5;
    });
    if (variant) text(ctx, variant, cols.item, ly + 1, 8.5, { color: C.soft });
    skuLines.forEach((l, i) => text(ctx, l, cols.sku, y - i * 10, 7.5, { color: C.soft }));
    text(ctx, String(line.qty), cols.qty, y, 9.5, { align: "right" });
    text(ctx, money(line.unit), cols.unit, y, 9.5, { align: "right" });
    text(ctx, money(line.total), cols.amount, y, 9.5, { align: "right" });
    rule(ctx, y - drop - 9);
    y -= rowH;
  }

  // Totals
  y -= 10;
  if (y < 170) {
    ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
    y = PAGE_H - M;
  }
  const tl = PAGE_W - M - 230;
  const row = (label: string, value: string, opts: { bold?: boolean; size?: number; color?: ReturnType<typeof rgb> } = {}) => {
    const size = opts.size ?? 9.5;
    const parts = wrap(label, opts.bold ? ctx.bold : ctx.regular, size, 150);
    text(ctx, value, PAGE_W - M - 8, y, size, { bold: opts.bold, align: "right", color: opts.color ?? C.ink });
    parts.forEach((part, i) => text(ctx, part, tl, y - i * (size + 2), size, { bold: opts.bold, color: opts.color ?? C.soft }));
    y -= parts.length * (size + 2) + 5;
  };
  row("Subtotal", money(o.subtotal));
  if (o.discount > 0) row("Discount", `-${money(o.discount)}`);
  row(o.shippingLabel, o.shipping > 0 ? money(o.shipping) : "Free");
  row(o.taxLabel, money(o.tax));
  rule(ctx, y + 2, C.ink, 1, tl, PAGE_W - M);
  y -= 13;
  row("Total (CAD)", money(o.total), { bold: true, size: 12, color: C.ink });
  row(paid ? "Paid by card" : "Amount paid", paid ? `-${money(o.total)}` : money(0));
  row("Balance due", money(paid ? 0 : o.total), { bold: true, color: paid ? C.green : C.orange });

  // Notes
  y -= 14;
  const notes = [
    `Thank you for your order from ${o.storeName}. ${BILLER.name} is the billing company for ${o.storeName}; your card statement shows MASTER DECKER.`,
    `Questions about this invoice: ${BILLER.email} or ${BILLER.phone}.`
  ];
  if (o.customerNote) notes.push(`Your note: ${o.customerNote}`);
  for (const n of notes) {
    for (const part of wrap(n, ctx.regular, 8.5, PAGE_W - 2 * M)) {
      if (y < 44) {
        ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
        y = PAGE_H - M;
      }
      text(ctx, part, M, y, 8.5, { color: C.soft });
      y -= 11.5;
    }
    y -= 3;
  }

  footer(ctx, `${BILLER.name}  ·  Invoice ${o.number}`);
  ctx.doc.setTitle(`Invoice ${o.number}`);
  ctx.doc.setAuthor(BILLER.name);
  return ctx.doc.save();
}

// ---------------------------------------------------------------------------
// Pick list

export async function renderPicklistPdf(o: OrderDoc): Promise<Uint8Array> {
  const ctx = await start();
  let y = PAGE_H - M;
  const right = PAGE_W - M;

  if (ctx.logo) {
    const w = 120;
    const h = (ctx.logo.height / ctx.logo.width) * w;
    ctx.page.drawImage(ctx.logo, { x: M - 4, y: y - h + 4, width: w, height: h });
  }
  text(ctx, "PICK LIST", right, y - 20, 24, { bold: true, align: "right" });
  text(ctx, o.number, right, y - 40, 14, { bold: true, align: "right", color: C.orange });
  text(ctx, `${o.storeName}  ·  paid ${longDate(o.paidAt ?? o.createdAt)}`, right, y - 54, 8.5, { align: "right", color: C.soft });
  y -= 70;
  rule(ctx, y, C.orange, 1.5);
  y -= 14;

  // Ship-to box — big enough to read across the shop.
  const boxW = 300;
  const shipLines = addressLines(o.shipTo);
  const contact = [o.phone ?? o.shipTo?.phone ?? "", o.email].filter(Boolean);
  const boxH = 30 + shipLines.length * 16 + contact.length * 12;
  ctx.page.drawRectangle({ x: M, y: y - boxH, width: boxW, height: boxH, borderColor: C.ink, borderWidth: 1.25 });
  text(ctx, "SHIP TO", M + 10, y - 14, 7.5, { bold: true, color: C.orange });
  let sy = y - 32;
  shipLines.forEach((l, i) => {
    text(ctx, l, M + 10, sy, i === 0 ? 14 : 12, { bold: i === 0 });
    sy -= 16;
  });
  contact.forEach((l) => {
    text(ctx, l, M + 10, sy, 9.5, { color: C.soft });
    sy -= 12;
  });

  // Order facts beside it
  const fx = M + boxW + 24;
  const units = o.lines.reduce((n, l) => n + l.qty, 0);
  const facts: [string, string][] = [
    ["Shipping", o.shipping > 0 ? `${o.shippingLabel} (${money(o.shipping)})` : o.shippingLabel],
    ["Lines / units", `${o.lines.length} / ${units}`],
    ["Order placed", longDate(o.createdAt)],
    ["Printed", longDate(new Date().toISOString())]
  ];
  let fy = y - 14;
  for (const [k, v] of facts) {
    text(ctx, k.toUpperCase(), fx, fy, 7.5, { bold: true, color: C.orange });
    fy -= 11;
    for (const part of wrap(v, ctx.regular, 9.5, right - fx)) {
      text(ctx, part, fx, fy, 9.5);
      fy -= 12;
    }
    fy -= 5;
  }
  y = Math.min(y - boxH, fy) - 18;

  if (o.customerNote) {
    text(ctx, "CUSTOMER NOTE", M, y, 7.5, { bold: true, color: C.orange });
    y -= 12;
    for (const part of wrap(o.customerNote, ctx.regular, 10, PAGE_W - 2 * M)) {
      text(ctx, part, M, y, 10);
      y -= 13;
    }
    y -= 8;
  }

  // Lines
  const cols = { box: M + 4, qty: M + 52, item: M + 66, sku: PAGE_W - M - 130 };
  const itemW = cols.sku - cols.item - 10;
  const header = () => {
    ctx.page.drawRectangle({ x: M, y: y - 6, width: PAGE_W - 2 * M, height: 20, color: C.wash });
    text(ctx, "PICKED", cols.box, y, 7.5, { bold: true, color: C.soft });
    text(ctx, "QTY", cols.qty, y, 7.5, { bold: true, color: C.soft, align: "right" });
    text(ctx, "ITEM", cols.item, y, 7.5, { bold: true, color: C.soft });
    text(ctx, "SKU", cols.sku, y, 7.5, { bold: true, color: C.soft });
    y -= 24;
  };
  const ensure = (h: number, tableHeader = true) => {
    if (y - h < 50) {
      ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - M;
      text(ctx, `${o.number} (continued)`, M, y, 10, { bold: true });
      y -= 22;
      if (tableHeader) header();
    }
  };
  const checkbox = (x: number, yy: number, s: number) =>
    ctx.page.drawRectangle({ x, y: yy - 2, width: s, height: s, borderColor: C.ink, borderWidth: 1 });
  header();

  for (const line of o.lines) {
    const variant = line.variant && !/^default$/i.test(line.variant) ? line.variant : null;
    const label = variant ? `${line.name} - ${variant}` : line.name;
    const nameLines = wrap(label, ctx.bold, 11, itemW);
    const skuLines = wrap(line.sku, ctx.regular, 8, PAGE_W - M - cols.sku);
    const parts = kitPickRows(line.name, variant, line.qty);
    const textH = Math.max(nameLines.length * 14, skuLines.length * 10);
    ensure(textH + 10 + (parts.length ? 14 : 0));
    checkbox(cols.box + 8, y, 12);
    text(ctx, String(line.qty), cols.qty, y, 12, { bold: true, align: "right" });
    nameLines.forEach((l, i) => text(ctx, l, cols.item, y - i * 14, 11, { bold: true }));
    skuLines.forEach((l, i) => text(ctx, l, cols.sku, y - i * 10, 8, { color: C.soft }));
    y -= textH + 4;
    if (parts.length) {
      text(ctx, `Kit contents (for ${line.qty} kit${line.qty === 1 ? "" : "s"}):`, cols.item, y, 8.5, { color: C.soft });
      y -= 14;
      for (const p of parts) {
        ensure(14);
        checkbox(cols.item + 2, y, 9);
        text(ctx, String(p.qty), cols.item + 36, y, 10, { bold: true, align: "right" });
        text(ctx, p.name, cols.item + 44, y, 10);
        y -= 14;
      }
      y -= 2;
    }
    rule(ctx, y + 4);
    y -= 14;
  }

  // Sign-off
  ensure(60, false);
  y -= 16;
  const sign = ["Picked by", "Checked by", "Boxes", "Date shipped"];
  const sw = (PAGE_W - 2 * M - 30) / sign.length;
  sign.forEach((s, i) => {
    const x = M + i * (sw + 10);
    rule(ctx, y, C.ink, 0.75, x, x + sw);
    text(ctx, s, x, y - 11, 8, { color: C.soft });
  });
  y -= 34;
  text(ctx, "Tracking no.", M, y, 8, { color: C.soft });
  rule(ctx, y - 2, C.ink, 0.75, M + 60, M + 300);

  footer(ctx, `Pick list ${o.number}  ·  ${o.storeName}`);
  ctx.doc.setTitle(`Pick list ${o.number}`);
  ctx.doc.setAuthor(BILLER.name);
  return ctx.doc.save();
}
