// Beta signup endpoint.
//
// Currently a stub: it validates the payload and returns success, but does not
// store the signup anywhere. Before launch, connect it to a destination —
// see README.md ("Wiring up the beta form") for options.

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof data?.email === 'string' ? data.email.trim() : '';
  if (!email || !email.includes('@')) {
    return Response.json({ ok: false, error: 'Valid email required' }, { status: 400 });
  }

  // TODO: persist the signup (Resend, Formspree, Airtable, Vercel KV, etc.)
  console.log('[beta signup]', {
    name: data.name ?? '',
    email,
    role: data.role ?? '',
    at: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
