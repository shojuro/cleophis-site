// Beta / waitlist signup endpoint.
//
// Stores signups in Supabase when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// are set (see README "Wiring up email collection"). Without them it logs
// to the server console only — fine for local dev, but wire Supabase
// before driving real traffic or signups only live in ephemeral logs.

import { sendThanks } from '../../../lib/thanks';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email || !email.includes('@') || email.length > 320) {
    return Response.json({ ok: false, error: 'Valid email required' }, { status: 400 });
  }

  const row = {
    name: typeof data?.name === 'string' ? data.name.trim().slice(0, 200) : null,
    email,
    role: typeof data?.role === 'string' ? data.role.trim().slice(0, 100) : null,
    source: 'website',
  };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/signups?on_conflict=email`, {
        method: 'POST',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          // return=representation tells us whether this address is new (one row) or a repeat (none).
          Prefer: 'resolution=ignore-duplicates,return=representation',
        },
        body: JSON.stringify(row),
      });
      // 409 = duplicate email without ignore-duplicates; treat as success.
      if (!res.ok && res.status !== 409) {
        console.error('[beta signup] Supabase error', res.status, await res.text());
        return Response.json({ ok: false, error: 'Storage error' }, { status: 502 });
      }
      // Thank a new address once. A sending problem never fails the signup itself.
      const saved = res.ok ? await res.json().catch(() => []) : [];
      if (Array.isArray(saved) && saved.length === 1) {
        try {
          if (await sendThanks({ email, name: row.name, role: row.role })) {
            await fetch(`${url}/rest/v1/signups?id=eq.${saved[0].id}`, {
              method: 'PATCH',
              headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ thanked_at: new Date().toISOString() }),
            });
          }
        } catch (err) {
          console.error('[thanks email] failed', err);
        }
      }
    } catch (err) {
      console.error('[beta signup] Supabase unreachable', err);
      return Response.json({ ok: false, error: 'Storage error' }, { status: 502 });
    }
  } else {
    console.log('[beta signup] (no Supabase configured)', row);
  }

  return Response.json({ ok: true });
}
