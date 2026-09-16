# bright-event-lighting

brighteventlighting.ca — outdoor event lighting and holiday decor (weddings, corporate events, Christmas parties) in London, ON.

- Next.js 16 App Router, Tailwind v4, JSON content in `content/`
- Photos in `public/images/` with blur placeholders generated into `content/images.json`
- Quote form: `/api/quote` (edge) → Resend email (from noreply@masterdecker.com) + `bel_quote_requests` backup in Supabase; Turnstile verified via turnstile.masterdecker.com (MD-02 site key)
- Vercel project `bright-event-lighting`, rootDirectory `apps/bright-event-lighting`, turbo-ignore; push to `main` deploys
- Dev: `npm run dev -- -p 3046`
