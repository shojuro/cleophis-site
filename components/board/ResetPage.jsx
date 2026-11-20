'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useSession } from '../../lib/board';
import Chrome from './Chrome';

// Opened from the reset email, which signs the person in for recovery.
export default function ResetPage() {
  const session = useSession();
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (pw.length < 8) return setErr('Use a password of 8 or more characters.');
    if (pw !== pw2) return setErr('The two passwords do not match.');
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setErr(error.message);
    setDone(true);
  };

  return (
    <Chrome session={session} narrow>
      <div className="bd-card bd-stack">
        <h1>Choose a new password</h1>
        {session === undefined && <p className="bd-muted">One moment…</p>}
        {session === null && (
          <p className="bd-note">This link has expired or was already used. <a href="/signin">Ask for a new one</a>.</p>
        )}
        {session && done && (
          <p className="bd-ok" role="status">Your password is changed. <a href="/feedback">Go to the board</a></p>
        )}
        {session && !done && (
          <form className="bd-stack" onSubmit={submit} noValidate>
            <div className="bd-field">
              <label htmlFor="npw">New password</label>
              <input id="npw" type="password" autoComplete="new-password" value={pw} onChange={(e) => { setPw(e.target.value); setErr(''); }} />
            </div>
            <div className="bd-field">
              <label htmlFor="npw2">Confirm new password</label>
              <input id="npw2" type="password" autoComplete="new-password" value={pw2} onChange={(e) => { setPw2(e.target.value); setErr(''); }} />
            </div>
            {err && <p className="bd-err" role="alert">{err}</p>}
            <button type="submit" className="bd-btn" disabled={busy}>{busy ? 'Saving…' : 'Save new password'}</button>
          </form>
        )}
      </div>
    </Chrome>
  );
}
