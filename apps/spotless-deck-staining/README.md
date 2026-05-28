# Halton Glow Lighting — Next.js 16 site

Modern rebuild of [haltonglowlighting.ca](https://haltonglowlighting.ca/) — permanent
outdoor LED lighting installer for Burlington and Oakville.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Vercel hosting
- Shared Supabase project (LCF) for lead storage (`halton_glow_quote_requests` table)
- Resend for email notifications to `service@masterdecker.com`

## Develop

```bash
npm install
npm run dev
# http://localhost:3004
```

## Original assets preserved

All photography and the Halton Glow logo from the original site are downloaded to
`public/images/` and served locally. No remote hotlinks.
