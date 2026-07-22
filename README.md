# Cleophis — company website

Marketing site for [www.cleophis.com](https://www.cleophis.com). Built with Next.js (App Router),
no other dependencies. Design system mirrors the pitch deck: ink navy `#141829`, magenta accent
`#C01A67`, serif display (Source Serif 4) over Inter, diamond motif.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Deploying to Vercel

1. Push this folder to a GitHub repository (private is fine).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js —
   no configuration needed. Deploy.
3. **Connect the domain:** Project → Settings → Domains → add `www.cleophis.com` and
   `cleophis.com` (set the apex to redirect to `www`). At your DNS provider:
   - `www` → CNAME → `cname.vercel-dns.com`
   - apex `cleophis.com` → A → `76.76.21.21`

Alternatively, deploy from the CLI without GitHub: `npx vercel` in this folder.

## Wiring up the beta form

`app/api/beta/route.js` currently validates and logs signups but does not store them.
Pick one before launch:

- **Resend** (email you each signup): `npm i resend`, add `RESEND_API_KEY` env var in Vercel,
  send a mail in the route handler.
- **Formspree / Basin**: skip the API route and point the form action at their endpoint.
- **Airtable / Google Sheets**: POST to their API from the route handler.
- **Vercel KV / Postgres**: store rows directly.

## Placeholders to replace

- `invest@cleophis.com` (investor CTA) and `hello@cleophis.com` (footer contact) — swap for the
  real addresses once mail is set up on the domain.

## Where things live

- `app/page.jsx` — all sections and copy (copy matches pitch deck v3)
- `app/globals.css` — the whole design system (colors, type, animations)
- `components/` — Nav, scroll-reveal, count-up counter, beta form
- `app/api/beta/route.js` — beta signup endpoint (stub)
