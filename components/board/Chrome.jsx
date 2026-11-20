'use client';

import { supabase } from '../../lib/supabase';

function Crown({ size = 32 }) {
  return (
    <svg className="crown" role="img" aria-label="Cleophis mark: a crown made of standing books" width={size} height={size} viewBox="0 0 64 64" style={{ flex: 'none' }}>
      <rect x="8" y="23" width="8" height="25" rx="1.6" fill="#123C69" />
      <rect x="18" y="31" width="8" height="17" rx="1.6" fill="#123C69" />
      <rect x="28" y="17" width="8" height="31" rx="1.6" fill="#123C69" />
      <rect x="38" y="31" width="8" height="17" rx="1.6" fill="#123C69" />
      <rect x="48" y="23" width="8" height="25" rx="1.6" fill="#123C69" />
      <circle cx="12" cy="16.5" r="3.4" fill="#B08A3E" />
      <circle cx="32" cy="10" r="3.8" fill="#B08A3E" />
      <circle cx="52" cy="16.5" r="3.4" fill="#B08A3E" />
      <rect x="6" y="50.5" width="52" height="5.5" rx="1.6" fill="#B08A3E" />
    </svg>
  );
}

// Shared header and footer for the board, account and sign-in pages.
export default function Chrome({ session, current, narrow, children }) {
  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  return (
    <div className="bd">
      <header className="bd-hdr">
        <div className="bd-bar">
          <a href="/" className="bd-brand">
            <Crown />
            Cleophis
          </a>
          <nav className="bd-nav" aria-label="Main">
            <a href="/feedback" aria-current={current === 'feedback' ? 'page' : undefined}>Feedback</a>
            <a href="/download">Download</a>
            {session ? (
              <>
                <a href="/account" aria-current={current === 'account' ? 'page' : undefined}>Account</a>
                <button type="button" className="bd-link" onClick={signOut}>Sign out</button>
              </>
            ) : (
              session === null && (
                <a href="/signin" aria-current={current === 'signin' ? 'page' : undefined}>Sign in</a>
              )
            )}
          </nav>
        </div>
      </header>
      <main className={'bd-main' + (narrow ? ' bd-narrow' : '')}>{children}</main>
      <footer className="bd-foot">
        <div>
          <span>© 2026 Cleophis. What your student types in the app never leaves the device.</span>
          <span><a href="/privacy">Privacy and board rules</a> · <a href="mailto:hello@cleophis.com">hello@cleophis.com</a></span>
        </div>
      </footer>
    </div>
  );
}
