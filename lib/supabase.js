import { createClient } from '@supabase/supabase-js';

// The same Supabase project the Cleophis app signs in to, so one account works in both.
// The publishable key is safe in the browser: the database's row-level rules do the guarding.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://isltexsxpysxqewjsryv.supabase.co';
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_zKxcgZ9z7S4xpwd68Pv1bA_iNbv6oyq';

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
