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

## Wiring up email collection (Supabase)

`app/api/beta/route.js` stores signups in Supabase when configured, and falls back to
console-logging when not (fine locally; don't ship real traffic that way).

1. Create a project at [supabase.com](https://supabase.com) (free tier is plenty).
2. In the SQL editor, run:

   ```sql
   create table public.signups (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name text,
     email text not null unique,
     role text,
     source text
   );
   -- RLS on, no policies: the anon key can do nothing; the service key (server-only) bypasses RLS.
   alter table public.signups enable row level security;
   ```

3. Project Settings → API: copy the **Project URL** and the **service_role** key.
4. In Vercel: Project → Settings → Environment Variables → add
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Production), then redeploy.
   Locally, put them in `.env.local` (see `.env.example`).

Signups land in the `signups` table — browse or export CSV from the Supabase dashboard.
Duplicate emails are silently ignored (unique constraint + ignore-duplicates).

## Placeholders to replace

- `invest@cleophis.com` (investor CTA) and `hello@cleophis.com` (footer contact) — swap for the
  real addresses once mail is set up on the domain.

## Where things live

- `app/page.jsx` — all sections and copy (copy matches pitch deck v3)
- `app/globals.css` — the whole design system (colors, type, animations)
- `components/` — Nav, scroll-reveal, count-up counter, beta form
- `app/api/beta/route.js` — beta signup endpoint (stub)
