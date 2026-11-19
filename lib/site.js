// The installer lives in the Backblaze B2 bucket "cleophis-downloads-1" under a fixed name.
// To release a new build, upload it with the same name; the site needs no change.
export const MSI_HREF =
  process.env.NEXT_PUBLIC_MSI_URL ||
  'https://f005.backblazeb2.com/file/cleophis-downloads-1/CleophisSetup.msi';

// Saves an email (and optional details) through the existing /api/beta signup endpoint.
export async function saveSignup(row) {
  const res = await fetch('/api/beta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error('signup failed');
}
