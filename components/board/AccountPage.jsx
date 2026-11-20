'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useSession, boardMe, renameHandle, exportMyData, leaveBoard, friendly } from '../../lib/board';
import Chrome from './Chrome';
import JoinCard from './JoinCard';

export default function AccountPage() {
  const session = useSession();
  const [me, setMe] = useState(null);
  const [handle, setHandle] = useState('');
  const [pw, setPw] = useState({ next: '', confirm: '' });
  const [msg, setMsg] = useState({ where: '', ok: '', err: '' });
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    if (session === null) window.location.replace('/signin?next=/account');
    if (!session) return;
    boardMe().then((m) => { setMe(m); setHandle(m.handle || ''); }).catch((e) => setMsg({ where: 'top', ok: '', err: friendly(e) }));
  }, [session]);

  const say = (where, ok, err = '') => setMsg({ where, ok, err });
  const Msg = ({ where }) => msg.where === where && (msg.err
    ? <p className="bd-err" role="alert">{msg.err}</p>
    : msg.ok && <p className="bd-ok" role="status">{msg.ok}</p>);

  const saveHandle = async (e) => {
    e.preventDefault();
    const h = handle.trim();
    if (h.length < 3 || h.length > 30) return say('handle', '', 'Choose a handle of 3 to 30 characters.');
    const { error } = await renameHandle(session.user.id, h);
    if (error) return say('handle', '', friendly(error));
    setMe({ ...me, handle: h });
    say('handle', 'Handle saved.');
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.next.length < 8) return say('pw', '', 'Use a password of 8 or more characters.');
    if (pw.next !== pw.confirm) return say('pw', '', 'The two passwords do not match.');
    const { error } = await supabase.auth.updateUser({ password: pw.next });
    if (error) return say('pw', '', error.message);
    setPw({ next: '', confirm: '' });
    say('pw', 'Password changed. It now applies in the app too.');
  };

  const download = async () => {
    const { data, error } = await exportMyData();
    if (error) return say('data', '', friendly(error));
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleophis-board-data.json';
    a.click();
    URL.revokeObjectURL(url);
    say('data', 'Your board data has been downloaded.');
  };

  const leave = async () => {
    const { error } = await leaveBoard();
    if (error) return say('data', '', friendly(error));
    setConfirmLeave(false);
    setMe({ ...me, joined: false, handle: null });
    setHandle('');
    say('data', 'You have left the board. Your handle and votes are deleted.');
  };

  if (!session) return <Chrome session={session} current="account"><p className="bd-muted">One moment…</p></Chrome>;

  return (
    <Chrome session={session} current="account" narrow>
      <h1>Your account</h1>
      <Msg where="top" />

      <section className="bd-card bd-stack">
        <h2>Sign-in</h2>
        <p>{session.user.email}</p>
        <p className="bd-muted">One account for the Cleophis app and this site. Your email is never shown on the board.</p>
        {me && (
          <p>
            <span className={'bd-pill ' + (me.member ? 's-shipped' : '')}>{me.team ? 'Cleophis team' : me.member ? 'Member' : 'Not a member yet'}</span>{' '}
            {!me.member && <span className="bd-muted">Subscribe, or enter an access code, inside the app.</span>}
          </p>
        )}
      </section>

      {me && me.joined && (
        <form className="bd-card bd-stack" onSubmit={saveHandle} noValidate>
          <h2>Board handle</h2>
          <div className="bd-field">
            <label htmlFor="ah">Handle</label>
            <input id="ah" type="text" maxLength={30} value={handle} onChange={(e) => setHandle(e.target.value)} />
            <span className="bd-muted">Shown beside your ideas and comments.</span>
          </div>
          <Msg where="handle" />
          <div><button type="submit" className="bd-btn">Save handle</button></div>
        </form>
      )}
      {me && !me.joined && me.member && <JoinCard onJoined={(h) => { setMe({ ...me, joined: true, handle: h }); setHandle(h); }} />}

      <form className="bd-card bd-stack" onSubmit={savePassword} noValidate>
        <h2>Change password</h2>
        <div className="bd-field"><label htmlFor="np">New password</label><input id="np" type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></div>
        <div className="bd-field"><label htmlFor="np2">Confirm new password</label><input id="np2" type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></div>
        <Msg where="pw" />
        <div><button type="submit" className="bd-btn">Change password</button></div>
      </form>

      <section className="bd-card bd-stack">
        <h2>Your board data</h2>
        <p className="bd-muted">The board stores your handle, the ideas and comments you post, which ideas you voted for, and any reports you send. Nothing from your tutoring sessions is stored here.</p>
        <Msg where="data" />
        <div className="bd-row">
          <button type="button" className="bd-btn2" onClick={download}>Export my data</button>
          {me?.joined && !confirmLeave && <button type="button" className="bd-btn2 bd-danger" onClick={() => setConfirmLeave(true)}>Leave the board</button>}
        </div>
        {confirmLeave && (
          <div className="bd-note bd-stack">
            <strong>Leave the board?</strong>
            <span>Your handle, votes and reports are deleted. Ideas and comments you posted stay, shown as “Former member”. To remove one of those, remove it before you leave.</span>
            <div className="bd-row">
              <button type="button" className="bd-btn" onClick={leave}>Leave the board</button>
              <button type="button" className="bd-btn2" onClick={() => setConfirmLeave(false)}>Stay</button>
            </div>
          </div>
        )}
        <p className="bd-muted">To delete your whole Cleophis account, write to <a href="mailto:hello@cleophis.com">hello@cleophis.com</a>.</p>
      </section>
    </Chrome>
  );
}
