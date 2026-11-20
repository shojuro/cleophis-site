'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useSession, boardMe, loadIdea, loadComments, myVotes, toggleVote, addComment, amendIdea, removeIdea,
  setStatus, amendComment, removeComment, report, friendly, when, timeLeft, isPending, isGone, isPaused,
  STATUSES, STATUS_LABEL, CATEGORY_LABEL, POST_RULE,
} from '../../lib/board';
import Chrome from './Chrome';
import JoinCard from './JoinCard';

const Chevron = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
);

// "23h 41m left", refreshed every half minute.
function Countdown({ until }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);
  return <span className="bd-pill wait" role="timer">Being removed · {timeLeft(until)} left · locked</span>;
}

// A small form with one text box, used for amendments and reports.
function InlineText({ label, hint, max, action, onCancel, onSave }) {
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!text.trim()) return setErr('Write something first.');
    setBusy(true);
    const error = await onSave(text);
    setBusy(false);
    if (error) setErr(friendly(error));
  };
  return (
    <form className="bd-stack" onSubmit={save} noValidate>
      <div className="bd-field">
        <label htmlFor={'it-' + label}>{label}</label>
        <textarea id={'it-' + label} maxLength={max} value={text} onChange={(e) => { setText(e.target.value); setErr(''); }} style={{ minHeight: 90 }} />
        {hint && <span className="bd-muted">{hint}</span>}
      </div>
      {err && <p className="bd-err" role="alert">{err}</p>}
      <div className="bd-row">
        <button type="submit" className="bd-btn" disabled={busy}>{busy ? 'Saving…' : action}</button>
        <button type="button" className="bd-btn2" onClick={onCancel}>Back</button>
      </div>
    </form>
  );
}

// The author's choice when they want a post gone: amend it for good, or take the 24-hour removal.
function RemoveFlow({ what, onAmend, onRemove, onCancel }) {
  const [step, setStep] = useState('ask');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const remove = async () => {
    if (busy) return;
    setBusy(true);
    const error = await onRemove();
    setBusy(false);
    if (error) setErr(friendly(error));
  };
  if (step === 'amend') {
    return (
      <InlineText label="Your amendment" max={500} action="Attach amendment"
        hint={`It is attached to this ${what} for good, shown as its first reply, and the ${what} then stays on the board.`}
        onCancel={() => setStep('ask')} onSave={onAmend} />
    );
  }
  return (
    <div className="bd-note bd-stack" role="group" aria-label={`Remove this ${what}`}>
      <strong>Are you sure you want to remove this {what}?</strong>
      <span>
        Removing takes 24 hours. Until then it stays on the board with a timer, it is locked for everyone, and you
        cannot post, comment or vote anywhere on the board. This cannot be undone.
      </span>
      <span>
        Or add an amendment instead: say what you would change. It is attached to this {what} for good, and the {what} stays.
      </span>
      {err && <p className="bd-err" role="alert">{err}</p>}
      <div className="bd-row">
        <button type="button" className="bd-btn" onClick={() => setStep('amend')}>Add an amendment instead</button>
        <button type="button" className="bd-btn2 bd-danger" disabled={busy} onClick={remove}>{busy ? 'Starting…' : 'Remove in 24 hours'}</button>
        <button type="button" className="bd-btn2" onClick={onCancel}>Keep it as it is</button>
      </div>
    </div>
  );
}

export default function IdeaPage() {
  const { id: rawId } = useParams();
  const id = Number(rawId);
  const session = useSession();
  const uid = session?.user?.id;
  const [me, setMe] = useState(null);
  const [idea, setIdea] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [voted, setVoted] = useState(false);
  const [err, setErr] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [body, setBody] = useState('');
  const [panel, setPanel] = useState(null); // 'amend' | 'remove' | 'report' | 'c-amend-<id>' | 'c-remove-<id>' | 'c-report-<id>'
  const [amendOpen, setAmendOpen] = useState(false);

  const refresh = useCallback(async () => {
    if (!Number.isInteger(id)) return setIdea(null);
    const [{ data: i, error }, { data: c }, mine, m] = await Promise.all([loadIdea(id), loadComments(id), myVotes([id]), boardMe().catch(() => null)]);
    if (error) setErr(friendly(error));
    setIdea(i ?? null);
    setComments(c || []);
    setVoted(mine.has(id));
    if (m) setMe(m);
  }, [id]);

  useEffect(() => { if (session) refresh(); }, [session, refresh]);

  const run = async (fn, okNote) => {
    setErr(''); setNote('');
    const { error } = await fn();
    if (error) { setErr(friendly(error)); return error; }
    if (okNote) setNote(okNote);
    setPanel(null);
    await refresh();
    return null;
  };

  const vote = async () => {
    if (busy) return;
    setAmendOpen(true);
    setBusy(true); setErr('');
    const { data, error } = await toggleVote(id);
    setBusy(false);
    if (error) return setErr(friendly(error));
    const r = data?.[0];
    if (r) { setVoted(r.voted); setIdea((o) => ({ ...o, vote_count: r.votes })); }
  };

  const comment = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!body.trim()) return setErr('Write a comment first.');
    setBusy(true);
    const error = await run(() => addComment(id, body));
    setBusy(false);
    if (!error) setBody('');
  };

  if (session === undefined) return <Chrome session={session} current="feedback"><p className="bd-muted">One moment…</p></Chrome>;
  if (session === null) {
    return (
      <Chrome session={session} current="feedback" narrow>
        <div className="bd-card bd-stack">
          <h1>Sign in to read this idea</h1>
          <p>The board is for people with a Cleophis account.</p>
          <a className="bd-btn" href={`/signin?next=/feedback/ideas/${id}`}>Sign in</a>
        </div>
      </Chrome>
    );
  }
  if (idea === undefined) return <Chrome session={session} current="feedback"><p className="bd-muted" role="status">Loading…</p></Chrome>;
  if (idea === null) {
    return (
      <Chrome session={session} current="feedback" narrow>
        <div className="bd-card bd-stack">
          <h1>That idea is not here</h1>
          <p>It may have been removed. <a href="/feedback">Back to the board</a></p>
        </div>
      </Chrome>
    );
  }

  const mine = idea.author_id && idea.author_id === uid;
  const paused = isPaused(me);
  const pending = isPending(idea);
  const gone = isGone(idea);
  const canPost = me?.member && me?.joined && !paused;
  const former = !idea.author_id;
  const open = !pending && !gone && !former; // open for comments and votes

  return (
    <Chrome session={session} current="feedback">
      <a href="/feedback">← Back to the board</a>
      {gone && <p className="bd-note">This idea has been removed. Only you and the Cleophis team can still see it.</p>}
      {paused && (
        <p className="bd-note" role="status">
          <strong>Your posting is paused for {timeLeft(me.paused_until)}.</strong> You asked to remove a post, so until its 24-hour countdown ends you can read the board but not post, comment or vote.
        </p>
      )}
      {err && <p className="bd-err" role="alert">{err}</p>}
      {note && <p className="bd-ok" role="status">{note}</p>}

      <article className={'bd-card bd-idea' + (pending ? ' bd-pending' : panel === 'remove' ? ' bd-asking' : '')}>
        <button type="button" className="bd-vote" aria-pressed={voted} disabled={!canPost || busy || !open}
          aria-label={`${voted ? 'Take back your vote' : 'Vote for this idea'}. ${idea.vote_count} votes.`} onClick={vote}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6" /></svg>
          {idea.vote_count}
          <small>{idea.vote_count === 1 ? 'vote' : 'votes'}</small>
        </button>
        <div className="bd-idea-body">
          <h1 style={{ overflowWrap: 'anywhere' }}>{idea.title}</h1>
          <div className="bd-row bd-muted">
            {pending && <Countdown until={idea.removed_at} />}
            {idea.amendment && <a className="bd-pill" href="#amendment" onClick={() => setAmendOpen(true)}>Amended</a>}
            <span className={`bd-pill s-${idea.status}`}>{STATUS_LABEL[idea.status]}</span>
            <span>{CATEGORY_LABEL[idea.category]}</span>
            <span>{idea.author?.handle || 'Former member'} · {when(idea.created_at)}</span>
          </div>
          {idea.body && <p className="bd-text">{idea.body}</p>}
          {pending && <p className="bd-muted">The author asked to remove this idea. It stays here, locked, until the timer ends.</p>}
          {former && !gone && <p className="bd-muted">This idea is from a former member. It stays on the board, closed to new comments and votes.</p>}
          {former && !gone && me?.team && <div className="bd-row"><button type="button" className="bd-btn2 bd-danger" onClick={() => setPanel('team-remove')}>Remove now</button></div>}

          {open && (
            <div className="bd-row">
              {mine && !idea.amendment && !paused && <button type="button" className="bd-btn2" onClick={() => setPanel('amend')}>Add an amendment</button>}
              {mine && !idea.amendment && <button type="button" className="bd-btn2 bd-danger" onClick={() => setPanel('remove')}>Remove</button>}
              {mine && idea.amendment && <span className="bd-muted">You amended this idea, so it stays on the board.</span>}
              {me?.team && !mine && <button type="button" className="bd-btn2 bd-danger" onClick={() => setPanel('team-remove')}>Remove now</button>}
              {!mine && <button type="button" className="bd-btn2" onClick={() => setPanel('report')}>Report</button>}
              {me?.team && (
                <label className="bd-row" style={{ gap: 8 }}>
                  <span className="bd-muted">Status</span>
                  <select className="bd-input" style={{ width: 'auto' }} value={idea.status} onChange={(e) => run(() => setStatus(id, e.target.value), 'Status updated.')}>
                    {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
              )}
            </div>
          )}
          {pending && me?.team && !mine && (
            <div className="bd-row"><button type="button" className="bd-btn2 bd-danger" onClick={() => setPanel('team-remove')}>Remove now</button></div>
          )}

          {panel === 'amend' && (
            <InlineText label="Your amendment" max={500} action="Attach amendment"
              hint="It is attached to this idea for good, shown as its first reply, and the idea then stays on the board. You can add one."
              onCancel={() => setPanel(null)} onSave={(t) => run(() => amendIdea(id, t), 'Amendment attached. This idea now stays on the board.')} />
          )}
          {panel === 'remove' && (
            <RemoveFlow what="idea" onCancel={() => setPanel(null)}
              onAmend={(t) => run(() => amendIdea(id, t), 'Amendment attached. This idea now stays on the board.')}
              onRemove={() => run(() => removeIdea(id), 'Removal started. The idea comes down in 24 hours, and your posting is paused until then.')} />
          )}
          {panel === 'team-remove' && (
            <div className="bd-note bd-stack">
              <strong>Remove this idea now? This is a moderation removal: it is immediate and cannot be undone.</strong>
              <div className="bd-row">
                <button type="button" className="bd-btn" onClick={() => run(() => removeIdea(id), 'The idea has been removed.')}>Remove now</button>
                <button type="button" className="bd-btn2" onClick={() => setPanel(null)}>Keep it</button>
              </div>
            </div>
          )}
          {panel === 'report' && (
            <InlineText label="What is wrong with this idea?" max={300} action="Send report" hint="Only the Cleophis team sees reports. They can take a post down at once if it puts someone at risk."
              onCancel={() => setPanel(null)} onSave={(t) => run(() => report({ ideaId: id, reason: t }), 'Thank you. The Cleophis team will take a look.')} />
          )}
        </div>
      </article>

      <section className="bd-card bd-stack" aria-label="Comments">
        <h2>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</h2>

        {idea.amendment && (
          <details id="amendment" className="bd-fold" open={amendOpen} onToggle={(e) => setAmendOpen(e.currentTarget.open)}>
            <summary><Chevron /> Author’s amendment{idea.amended_at ? ` · ${when(idea.amended_at)}` : ''}</summary>
            <p className="bd-text">{idea.amendment}</p>
          </details>
        )}

        {comments.map((c) => {
          const own = c.author_id && c.author_id === uid;
          const cPending = isPending(c);
          return (
            <div key={c.id} className={'bd-comment' + (cPending ? ' bd-pending' : panel === 'c-remove-' + c.id ? ' bd-asking' : '')} style={cPending || panel === 'c-remove-' + c.id ? { padding: 14, borderRadius: 12 } : undefined}>
              <div className="bd-row bd-muted">
                <strong style={{ color: '#1E2A3A' }}>{c.author?.handle || 'Former member'}</strong>
                {c.is_team && <span className="bd-pill team">Cleophis team</span>}
                <span>{when(c.created_at)}</span>
                {cPending && <Countdown until={c.removed_at} />}
              </div>
              <p className="bd-text">{c.body}</p>
              {c.amendment && (
                <details className="bd-fold">
                  <summary><Chevron /> Amendment</summary>
                  <p className="bd-text">{c.amendment}</p>
                </details>
              )}
              {!cPending && (
                <div className="bd-row">
                  {own && !c.amendment && !paused && <button type="button" className="bd-link" onClick={() => setPanel('c-amend-' + c.id)}>Amend</button>}
                  {own && !c.amendment && <button type="button" className="bd-link" onClick={() => setPanel('c-remove-' + c.id)}>Remove</button>}
                  {me?.team && !own && <button type="button" className="bd-link" onClick={() => setPanel('c-team-' + c.id)}>Remove now</button>}
                  {!own && <button type="button" className="bd-link" onClick={() => setPanel('c-report-' + c.id)}>Report</button>}
                </div>
              )}
              {panel === 'c-amend-' + c.id && (
                <InlineText label="Your amendment" max={500} action="Attach amendment" hint="It is attached to this comment for good, and the comment then stays on the board. You can add one."
                  onCancel={() => setPanel(null)} onSave={(t) => run(() => amendComment(c.id, t), 'Amendment attached. This comment now stays on the board.')} />
              )}
              {panel === 'c-remove-' + c.id && (
                <RemoveFlow what="comment" onCancel={() => setPanel(null)}
                  onAmend={(t) => run(() => amendComment(c.id, t), 'Amendment attached. This comment now stays on the board.')}
                  onRemove={() => run(() => removeComment(c.id), 'Removal started. The comment comes down in 24 hours, and your posting is paused until then.')} />
              )}
              {panel === 'c-team-' + c.id && (
                <div className="bd-row">
                  <span>Remove this comment now?</span>
                  <button type="button" className="bd-btn2 bd-danger" onClick={() => run(() => removeComment(c.id), 'Comment removed.')}>Remove now</button>
                  <button type="button" className="bd-btn2" onClick={() => setPanel(null)}>Keep it</button>
                </div>
              )}
              {panel === 'c-report-' + c.id && (
                <InlineText label="What is wrong with this comment?" max={300} action="Send report" hint="Only the Cleophis team sees reports."
                  onCancel={() => setPanel(null)} onSave={(t) => run(() => report({ commentId: c.id, reason: t }), 'Thank you. The Cleophis team will take a look.')} />
              )}
            </div>
          );
        })}

        {open && canPost && (
          <form className="bd-stack" onSubmit={comment} noValidate style={{ borderTop: '1px solid #E0D8C8', paddingTop: 16 }}>
            {idea.amendment && <p className="bd-muted">Before you reply: the author amended this idea. <a href="#amendment" onClick={() => setAmendOpen(true)}>Read the amendment</a></p>}
            <div className="bd-field">
              <label htmlFor="cm">Add a comment</label>
              <textarea id="cm" maxLength={1000} value={body} onFocus={() => setAmendOpen(true)} onChange={(e) => { setBody(e.target.value); setErr(''); }} />
              <span className="bd-muted">Posted as {me.handle}. Leave out children’s names and personal details. {POST_RULE}</span>
            </div>
            <div><button type="submit" className="bd-btn" disabled={busy}>{busy ? 'Posting…' : 'Post comment'}</button></div>
          </form>
        )}
        {pending && <p className="bd-muted">Comments and votes are locked while this idea is being removed.</p>}
        {me && me.member && !me.joined && <JoinCard onJoined={(h) => setMe({ ...me, joined: true, handle: h })} />}
        {me && !me.member && <p className="bd-note">Commenting and voting are for Cleophis members: subscribe, or enter your access code, inside the app.</p>}
      </section>
    </Chrome>
  );
}
