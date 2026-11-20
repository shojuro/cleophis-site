'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useSession } from '../../lib/board';
import Chrome from './Chrome';

const EMAIL = /^\S+@\S+\.\S+$/;

function nextPath() {
  if (typeof window === 'undefined') return '/feedback';
  const n = new URLSearchParams(window.location.search).get('next') || '/feedback';
  // Only same-site paths, never another website.
  return n.startsWith('/') && !n.startsWith('//') ? n : '/feedback';
}

// One page for sign in, create account and forgot password.
export default function AuthPage() {
  const session = useSession();
  const [mode, setMode] = useState('signin'); // signin | register | forgot
  const [f, setF] = useState({ email: '', password: '', confirm: '', adult: false });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState('');

  useEffect(() => {
    if (session) window.location.replace(nextPath());
  }, [session]);

  const set = (k) => (e) => {
    setF((o) => ({ ...o, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    setErr('');
  };
  const go = (m) => () => {
    setMode(m);
    setErr('');
    setDone('');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const email = f.email.trim().toLowerCase();
    if (!EMAIL.test(email)) return setErr('Enter your email address.');
    setBusy(true);
    try {
      if (mode === 'signin') {
        if (!f.password) return setErr('Enter your password.');
        const { error } = await supabase.auth.signInWithPassword({ email, password: f.password });
        // The same message for a wrong password and an unknown email.
        if (error) return setErr(/confirm/i.test(error.message) ? 'Confirm your email first. Check your inbox for the link.' : 'That email and password do not match.');
      } else if (mode === 'register') {
        if (f.password.length < 8) return setErr('Use a password of 8 or more characters.');
        if (f.password !== f.confirm) return setErr('The two passwords do not match.');
        if (!f.adult) return setErr('Accounts are for adults. Tick the box to confirm you are 18 or older.');
        const { error } = await supabase.auth.signUp({
          email,
          password: f.password,
          options: { emailRedirectTo: window.location.origin + '/signin' },
        });
        if (error) return setErr(error.message);
        setDone('Check your email for a confirmation link, then come back and sign in.');
      } else {
        await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' });
        // Always the same answer, so nobody can test which emails have accounts.
        setDone('If that address has an account, a reset link is on its way.');
      }
    } catch {
      setErr('Could not reach Cleophis. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  const title = mode === 'signin' ? 'Sign in' : mode === 'register' ? 'Create your account' : 'Reset your password';
  return (
    <Chrome session={session} current="signin" narrow>
      <div className="bd-card bd-stack">
        <h1>{title}</h1>
        <p className="bd-muted">
          {mode === 'forgot'
            ? 'Enter your email and we will send a link to choose a new password.'
            : 'This is the same account you use in the Cleophis app.'}
        </p>
        {done ? (
          <p className="bd-ok" role="status">{done}</p>
        ) : (
          <form className="bd-stack" onSubmit={submit} noValidate>
            <div className="bd-field">
              <label htmlFor="em">Email</label>
              <input id="em" type="email" autoComplete="email" value={f.email} onChange={set('email')} />
            </div>
            {mode !== 'forgot' && (
              <div className="bd-field">
                <label htmlFor="pw">Password</label>
                <input id="pw" type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={f.password} onChange={set('password')} />
              </div>
            )}
            {mode === 'register' && (
              <>
                <div className="bd-field">
                  <label htmlFor="pw2">Confirm password</label>
                  <input id="pw2" type="password" autoComplete="new-password" value={f.confirm} onChange={set('confirm')} />
                </div>
                <label className="bd-check">
                  <input type="checkbox" checked={f.adult} onChange={set('adult')} />
                  <span>I am 18 or older.</span>
                </label>
              </>
            )}
            {err && <p className="bd-err" role="alert">{err}</p>}
            <button type="submit" className="bd-btn" disabled={busy}>
              {busy ? 'One moment…' : mode === 'signin' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
            </button>
          </form>
        )}
        <div className="bd-row">
          {mode !== 'signin' && <button type="button" className="bd-link" onClick={go('signin')}>Sign in instead</button>}
          {mode !== 'register' && <button type="button" className="bd-link" onClick={go('register')}>Create an account</button>}
          {mode !== 'forgot' && <button type="button" className="bd-link" onClick={go('forgot')}>Forgot your password?</button>}
        </div>
      </div>
    </Chrome>
  );
}
