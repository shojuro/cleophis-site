'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useSession, boardMe, loadBoard, myVotes, statusCounts, toggleVote, similarIdeas, postIdea, friendly, when,
  STATUSES, STATUS_LABEL, CATEGORIES, CATEGORY_LABEL, PAGE, isPending, isPaused, timeLeft, POST_RULE,
} from '../../lib/board';
import Chrome from './Chrome';
import JoinCard from './JoinCard';

function SuggestModal({ onClose, onPosted }) {
  const [f, setF] = useState({ title: '', category: 'tutor', body: '' });
  const [similar, setSimilar] = useState([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const first = useRef(null);

  useEffect(() => { first.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Look for similar ideas a moment after typing stops.
  useEffect(() => {
    if (f.title.trim().length < 5) return setSimilar([]);
    const t = setTimeout(async () => {
      const { data } = await similarIdeas(f.title);
      setSimilar(data || []);
    }, 300);
    return () => clearTimeout(t);
  }, [f.title]);

  const set = (k) => (e) => { setF((o) => ({ ...o, [k]: e.target.value })); setErr(''); };
  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const t = f.title.trim();
    if (t.length < 5 || t.length > 90) return setErr('Give your idea a title of 5 to 90 characters.');
    if (f.body.length > 2000) return setErr('Keep the details under 2,000 characters.');
    setBusy(true);
    const { data, error } = await postIdea(f);
    setBusy(false);
    if (error) return setErr(friendly(error));
    onPosted(data.id);
  };

  return (
    <div className="bd-modal" role="dialog" aria-modal="true" aria-labelledby="sg-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="bd-card bd-stack" onSubmit={submit} noValidate>
        <h2 id="sg-title">Suggest an idea</h2>
        <div className="bd-field">
          <label htmlFor="sg-t">Title</label>
          <input id="sg-t" ref={first} type="text" maxLength={90} value={f.title} onChange={set('title')} />
        </div>
        {similar.length > 0 && (
          <div className="bd-note bd-stack">
            <strong>Vote for one of these instead?</strong>
            {similar.map((s) => (
              <a key={s.id} href={`/feedback/ideas/${s.id}`}>{s.title} ({s.vote_count} {s.vote_count === 1 ? 'vote' : 'votes'})</a>
            ))}
          </div>
        )}
        <div className="bd-field">
          <label htmlFor="sg-c">Category</label>
          <select id="sg-c" value={f.category} onChange={set('category')}>
            {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="bd-field">
          <label htmlFor="sg-b">Details (optional)</label>
          <textarea id="sg-b" maxLength={2000} value={f.body} onChange={set('body')} />
          <span className="bd-muted">Other families will read this. Leave out children’s names and personal details. {POST_RULE}</span>
        </div>
        {err && <p className="bd-err" role="alert">{err}</p>}
        <div className="bd-row">
          <button type="submit" className="bd-btn" disabled={busy}>{busy ? 'Posting…' : 'Post idea'}</button>
          <button type="button" className="bd-btn2" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default function BoardPage() {
  const session = useSession();
  const [me, setMe] = useState(null);
  const [q, setQ] = useState({ sort: 'top', status: '', category: '', search: '' });
  const [searchBox, setSearchBox] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [voted, setVoted] = useState(new Set());
  const [counts, setCounts] = useState({});
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [voting, setVoting] = useState(null);
  const [suggest, setSuggest] = useState(false);

  useEffect(() => {
    if (!session) return;
    boardMe().then(setMe).catch((e) => setErr(friendly(e)));
    statusCounts().then(setCounts);
  }, [session]);

  const fetchPage = useCallback(async (p, replace) => {
    setLoading(true);
    const { data, error } = await loadBoard({ ...q, page: p });
    if (error) { setErr(friendly(error)); setLoading(false); return; }
    const rows = data || [];
    const mine = await myVotes(rows.map((r) => r.id));
    setIdeas((old) => (replace ? rows : [...old, ...rows]));
    setVoted((old) => (replace ? mine : new Set([...old, ...mine])));
    setMore(rows.length === PAGE);
    setPage(p);
    setLoading(false);
  }, [q]);

  useEffect(() => { if (session) fetchPage(0, true); }, [session, fetchPage]);

  // Search a moment after typing stops.
  useEffect(() => {
    const t = setTimeout(() => setQ((o) => (o.search === searchBox ? o : { ...o, search: searchBox })), 350);
    return () => clearTimeout(t);
  }, [searchBox]);

  const vote = async (id) => {
    if (voting) return;
    setVoting(id);
    setErr('');
    const { data, error } = await toggleVote(id);
    setVoting(null);
    if (error) return setErr(friendly(error));
    const r = data?.[0];
    if (!r) return;
    setIdeas((old) => old.map((i) => (i.id === id ? { ...i, vote_count: r.votes } : i)));
    setVoted((old) => { const n = new Set(old); r.voted ? n.add(id) : n.delete(id); return n; });
  };

  const pick = (k, v) => () => setQ((o) => ({ ...o, [k]: o[k] === v && k !== 'sort' ? '' : v }));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const paused = isPaused(me);
  const canPost = me?.member && me?.joined && !paused;

  if (session === undefined) return <Chrome session={session} current="feedback"><p className="bd-muted">One moment…</p></Chrome>;

  if (session === null) {
    return (
      <Chrome session={session} current="feedback" narrow>
        <div className="bd-card bd-stack">
          <span className="bd-eyebrow">Feedback board</span>
          <h1>Help decide what Cleophis builds next.</h1>
          <p>Families suggest tutors and features, vote with one click and comment. The board is for people with a Cleophis account, so sign in to read it.</p>
          <div className="bd-row">
            <a className="bd-btn" href="/signin?next=/feedback">Sign in</a>
            <a className="bd-btn2" href="/download">Get Cleophis</a>
          </div>
        </div>
      </Chrome>
    );
  }

  return (
    <Chrome session={session} current="feedback">
      <div className="bd-row" style={{ justifyContent: 'space-between' }}>
        <div className="bd-stack" style={{ gap: 6 }}>
          <span className="bd-eyebrow">Feedback board</span>
          <h1>What should Cleophis build next?</h1>
        </div>
        {canPost && <button type="button" className="bd-btn" onClick={() => setSuggest(true)}>Suggest an idea</button>}
      </div>

      {me && me.member && !me.joined && <JoinCard onJoined={(h) => setMe({ ...me, joined: true, handle: h })} />}
      {me && !me.member && (
        <p className="bd-note">
          You can read everything here. Posting, voting and commenting are for Cleophis members: subscribe, or enter
          your access code, inside the app.
        </p>
      )}
      {paused && (
        <p className="bd-note" role="status">
          <strong>Your posting is paused for {timeLeft(me.paused_until)}.</strong> You asked to remove a post, so until its 24-hour countdown ends you can read the board but not post, comment or vote.
        </p>
      )}
      {err && <p className="bd-err" role="alert">{err}</p>}

      <div className="bd-layout">
        <div className="bd-stack" style={{ gap: 16 }}>
          <div className="bd-row">
            <div className="bd-row" role="group" aria-label="Sort">
              <button type="button" className="bd-btn2" aria-pressed={q.sort === 'top'} onClick={pick('sort', 'top')}>Top</button>
              <button type="button" className="bd-btn2" aria-pressed={q.sort === 'new'} onClick={pick('sort', 'new')}>New</button>
            </div>
            <div className="bd-field" style={{ flex: '1 1 220px' }}>
              <input type="search" aria-label="Search idea titles" placeholder="Search titles" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} />
            </div>
          </div>

          {ideas.map((i) => (
            <article key={i.id} className={'bd-card bd-idea' + (isPending(i) ? ' bd-pending' : '')}>
              <button type="button" className="bd-vote" aria-pressed={voted.has(i.id)} disabled={!canPost || voting === i.id || isPending(i) || !i.author_id}
                aria-label={`${voted.has(i.id) ? 'Take back your vote for' : 'Vote for'} ${i.title}. ${i.vote_count} votes.`} onClick={() => vote(i.id)}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6" /></svg>
                {i.vote_count}
              </button>
              <div className="bd-idea-body">
                <a className="bd-idea-title" href={`/feedback/ideas/${i.id}`}>{i.title}</a>
                {i.body && <p className="bd-clamp">{i.body}</p>}
                <div className="bd-row bd-muted">
                  {isPending(i) && <span className="bd-pill wait">Being removed · {timeLeft(i.removed_at)} left · locked</span>}
                  {!i.author_id && <span className="bd-pill">Closed</span>}
                  {i.amendment && <span className="bd-pill">Amended</span>}
                  <span className={`bd-pill s-${i.status}`}>{STATUS_LABEL[i.status]}</span>
                  <span>{CATEGORY_LABEL[i.category]}</span>
                  <span>{i.comment_count} {i.comment_count === 1 ? 'comment' : 'comments'}</span>
                  <span>{i.author?.handle || 'Former member'} · {when(i.created_at)}</span>
                </div>
              </div>
            </article>
          ))}

          {!loading && ideas.length === 0 && (
            <div className="bd-card bd-stack">
              <h3>{q.status || q.category || q.search ? 'No ideas match those filters.' : 'No ideas yet.'}</h3>
              <p className="bd-muted">{canPost ? 'Be the first to suggest one.' : 'Check back soon.'}</p>
            </div>
          )}
          {loading && <p className="bd-muted" role="status">Loading ideas…</p>}
          {more && !loading && <button type="button" className="bd-btn2" onClick={() => fetchPage(page + 1, false)}>Load more</button>}
        </div>

        <aside className="bd-side" aria-label="Filters">
          <div className="bd-card bd-stack">
            <h3>Status</h3>
            <div className="bd-filter">
              <button type="button" aria-pressed={!q.status} onClick={() => setQ((o) => ({ ...o, status: '' }))}><span>All</span><span>{total}</span></button>
              {STATUSES.map(([v, l]) => (
                <button key={v} type="button" aria-pressed={q.status === v} onClick={pick('status', v)}><span>{l}</span><span>{counts[v] || 0}</span></button>
              ))}
            </div>
          </div>
          <div className="bd-card bd-stack">
            <h3>Category</h3>
            <div className="bd-filter">
              <button type="button" aria-pressed={!q.category} onClick={() => setQ((o) => ({ ...o, category: '' }))}><span>All</span></button>
              {CATEGORIES.map(([v, l]) => (
                <button key={v} type="button" aria-pressed={q.category === v} onClick={pick('category', v)}><span>{l}</span></button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {suggest && <SuggestModal onClose={() => setSuggest(false)} onPosted={(id) => { window.location.href = `/feedback/ideas/${id}`; }} />}
    </Chrome>
  );
}
