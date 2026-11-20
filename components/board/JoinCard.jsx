'use client';

import { useState } from 'react';
import { joinBoard, friendly, POST_RULE } from '../../lib/board';
import StaysDemo from './StaysDemo';

// First visit for a member: choose a public handle and agree to the board's ground rules.
export default function JoinCard({ onJoined }) {
  const [handle, setHandle] = useState('');
  const [adult, setAdult] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const h = handle.trim();
    if (h.length < 3 || h.length > 30) return setErr('Choose a handle of 3 to 30 characters.');
    if (!adult) return setErr('Tick the box to confirm you are the adult account holder.');
    setBusy(true);
    const { error } = await joinBoard(h, adult);
    setBusy(false);
    if (error) return setErr(friendly(error));
    onJoined(h);
  };

  return (
    <form className="bd-card bd-stack" onSubmit={submit} noValidate>
      <h2>Join the board</h2>
      <p className="bd-note">
        The board is the one place where what you write leaves your device. Ideas and comments you post here are
        stored on Cleophis servers and shown to other signed-in families under your handle. Nothing from your
        tutoring sessions is ever sent here.
      </p>
      <p className="bd-note"><strong>What you say stays said.</strong> {POST_RULE} If you close your account, your posts remain, shown as “Former member”.</p>
      <StaysDemo />
      <div className="bd-field">
        <label htmlFor="hd">Your handle</label>
        <input id="hd" type="text" autoComplete="off" maxLength={30} value={handle} onChange={(e) => { setHandle(e.target.value); setErr(''); }} />
        <span className="bd-muted">Shown beside what you post. Your email is never shown. Please do not use a child’s name.</span>
      </div>
      <label className="bd-check">
        <input type="checkbox" checked={adult} onChange={(e) => { setAdult(e.target.checked); setErr(''); }} />
        <span>I am the adult account holder, I will not post children’s names or personal details, and I agree to the <a href="/privacy#board-rules" target="_blank" rel="noopener">board rules</a>.</span>
      </label>
      {err && <p className="bd-err" role="alert">{err}</p>}
      <button type="submit" className="bd-btn" disabled={busy}>{busy ? 'Joining…' : 'Join the board'}</button>
    </form>
  );
}
