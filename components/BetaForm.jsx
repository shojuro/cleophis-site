'use client';

import { useState } from 'react';

export default function BetaForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('bad response');
      setStatus('done');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="beta-form">
        <div className="beta-success">
          <span className="diamond" aria-hidden="true" />
          You’re on the list — we’ll be in touch when your spot opens up.
        </div>
      </div>
    );
  }

  return (
    <form className="beta-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="beta-name">Name</label>
        <input id="beta-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="beta-email">Email</label>
        <input id="beta-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field field-full">
        <label htmlFor="beta-role">I am a…</label>
        <select id="beta-role" name="role" defaultValue="Parent">
          <option>Parent</option>
          <option>Student</option>
          <option>Educator</option>
          <option>Homeschool co-op</option>
          <option>Other</option>
        </select>
      </div>
      <button className="btn btn-primary beta-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Joining…' : 'Join the beta'}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </button>
      {status === 'error' && (
        <p className="beta-note" role="alert">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
