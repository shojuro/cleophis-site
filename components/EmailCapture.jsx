'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email');
    setStatus('sending');
    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'Waitlist' }),
      });
      if (!res.ok) throw new Error('bad response');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className="capture-success">You’re on the list — we’ll email you when it’s ready.</p>;
  }

  return (
    <form className="capture" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
      />
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Saving…' : 'Notify me'}
      </button>
      {status === 'error' && (
        <p className="capture-note" role="alert">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
