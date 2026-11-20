'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../../lib/board';
import Chrome from './Chrome';

// Where the confirmation link in the sign-up email lands (Supabase "Site URL").
// Supabase puts the outcome in the address after the #: tokens on success, error details on failure.
export default function ConfirmedPage() {
  const session = useSession();
  const [state, setState] = useState('checking'); // checking | ok | failed
  const [reason, setReason] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, '') || window.location.search);
    const error = params.get('error_description') || params.get('error');
    if (error) {
      setReason(error.replace(/\+/g, ' '));
      setState('failed');
    } else {
      setState('ok');
    }
  }, []);

  return (
    <Chrome session={session} narrow>
      <div className="bd-card bd-stack">
        {state === 'checking' && <p className="bd-muted" role="status">One moment…</p>}
        {state === 'ok' && (
          <>
            <span className="bd-pill s-shipped" style={{ alignSelf: 'flex-start' }}>Email confirmed</span>
            <h1>You’re all set.</h1>
            <p>Your email address is confirmed. Go back to the Cleophis app and sign in with your email and password.</p>
            <p className="bd-muted">You can close this page.</p>
            <div className="bd-row">
              <a className="bd-btn2" href="/download">Don’t have the app yet? Download it</a>
              <a className="bd-btn2" href="/feedback">Visit the feedback board</a>
            </div>
          </>
        )}
        {state === 'failed' && (
          <>
            <h1>That link didn’t work.</h1>
            <p>Confirmation links expire and can be used only once. If you already confirmed your email, you’re fine: go back to the Cleophis app and sign in.</p>
            <p>If signing in says your email still needs confirming, write to us and we’ll send you a new link.</p>
            {reason && <p className="bd-muted">Details: {reason}</p>}
            <div className="bd-row">
              <a className="bd-btn" href="/signin">Sign in</a>
              <a className="bd-btn2" href="mailto:hello@cleophis.com">Ask for help</a>
            </div>
          </>
        )}
      </div>
    </Chrome>
  );
}
