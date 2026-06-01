# Ready Seal Direct — Go-Live Checklist & What I Need From You

The storefront is **built and running locally** (`npm run dev` → http://localhost:3103).
Catalog, branding, popup, brush upsell, Ontario-only checkout, contractor program, calculator,
and contact/quote form are all done and verified. Below is exactly what's needed to take
**payments** and ship it.

---

## 1. Stripe — what I need from you (required for checkout)

Create/locate these in the **Stripe Dashboard** (start in **Test mode** for first run, then flip to Live):

| Value | Where to find it | Env var it goes into |
|---|---|---|
| **Secret key** | Developers → API keys → "Secret key" (`sk_test_…` / `sk_live_…`) | `STRIPE_SECRET_KEY` |
| **Publishable key** | Developers → API keys → "Publishable key" (`pk_test_…` / `pk_live_…`) | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Webhook signing secret** | Developers → Webhooks → add endpoint → reveal "Signing secret" (`whsec_…`) | `STRIPE_WEBHOOK_SECRET` |

**Webhook endpoint to add in Stripe:**
`https://readysealdirect.ca/api/stripe/webhook` (or the Vercel preview URL during testing)
- Event to send: **`checkout.session.completed`** (the webhook flips the order to `paid`).

**Sales tax — DONE:** checkout applies a flat **13% Ontario HST** line (get-or-create reusable
Stripe tax rate). No Stripe Tax setup needed.

**Also tell me:** Stripe account country/currency (assumed **Canada / CAD**) and whether you want
Apple Pay / Google Pay enabled (just needs domain verification in Stripe — I'll wire it).

That's everything for payments. The checkout code, pending-order creation, $15 SAVE15 first-order
discount, and the webhook are already written — they activate the moment those three keys are set.

## 2. Supabase service-role key (required for cart, checkout, contractor + contact forms)

Supabase → Project Settings → API → **`service_role`** secret → put it in `SUPABASE_SERVICE_ROLE_KEY`.
Without it, the catalog/pages still render, but add-to-cart, checkout, and form submissions won't write.
(Same shared project all your stores use — `symgxmokposzjcgikgnz`.)

## 3. Cloudflare Turnstile (spam protection for the forms)

The contractor application and contact/quote forms use Turnstile. Slot `readysealdirect.ca` into the
first `MD-NN` widget group with < 5 sites in `sites/workers/turnstile-verify/SITE_KEYS.md`, then set
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`. (Forms work locally without it; verification just isn't enforced until set.)

## 4. Shipping — DONE (distance + weight zone table, no carrier account needed)

Shipping is now estimated from a built-in **Ontario distance-zone × weight table** from Belmont, ON
(`src/lib/shipping/estimate.ts`). Free over $750; under that it's `zone base + per-kg × weight`.
Shown live on the checkout form as the customer types their postal code, and passed to Stripe as the
shipping charge. Current rates (tweak the table any time):

| Order (under $750) | SW ON (N) | Toronto/GTA (L/M) | Ottawa/East (K) | North (P) |
|---|---|---|---|---|
| 1 × 1-gallon (3.4 kg) | $12.00 | $14.50 | $17.50 | $21.50 |
| 1 × 5-gallon (16.8 kg) | $24.00 | $29.50 | $36.50 | $47.00 |
| 3 × 1-gallon + brush | $20.00 | $22.50 | $27.50 | $35.00 |

Want different numbers, more zones, or a per-pail handling fee? It's a one-file edit — just say the word.

## 5. Deploy (I'll do this once the above are in)

- New Vercel project `ready-seal-direct` (team `Matt's projects`), env vars set, `vercel --prod`.
- Cloudflare DNS: point `readysealdirect.ca` apex + `www` to Vercel.
- Add the production URL to Supabase Auth → URL config.
- Register the site in Umami for analytics.
- Per your cost preference, I'll hold the deploy until you confirm, and batch it.

---

## What's already done

- **Catalog:** 9 Ready Seal colors × (1-gal sale $102.13 / 5-gal $413.63) + 5″ stain brush ($13.99),
  all images downloaded locally, descriptions, specs, SEO meta, JSON-LD.
- **Ontario-only checkout:** province ≠ Ontario → online checkout is blocked and the customer is
  shown a "request a shipping quote" path (client + server-side enforced).
- **Brush upsell:** "Add the 5″ stain brush" checkbox on every product + "often bought with" rail.
- **$15 first-order popup:** code `SAVE15`, enforced at checkout only when the email has no prior order
  (and subtotal ≥ $75).
- **Contractor program:** `/contractor-program` with skid/freight pricing pitch + application form →
  `ecom_b2b_applications`. Approved contractors get an Installer tier (15% off) in the admin.
- **Contact / shipping-quote form:** `/contact-us` (auto-fills "shipping quote" subject from the
  out-of-province flow) → `ecom_contact_messages` + emails service@masterdecker.com.
- **Stain calculator:** `/calculator` (deck & fence gallon estimator).
- WordPress → new-route redirects, sitemap, robots, ISR all carried over.

## Decisions I made (tell me to change any)

- Modeled each **color as one product with 1-gal/5-gal size variants** (cleaner than 20 separate SKUs).
- Dropped the **"Clear"** finish for now (source treats it as a no-UV special case; easy to add back).
- Free-shipping threshold set to **$750** site-wide (home banner value; the old contractor page said $500).
- Brush upsell checkbox is **unchecked by default** (honest opt-in rather than a pre-checked add-on).
