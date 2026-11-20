'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export const STATUSES = [
  ['new', 'New'],
  ['considering', 'Considering'],
  ['planned', 'Planned'],
  ['in_progress', 'In progress'],
  ['shipped', 'Shipped'],
  ['declined', 'Not planned'],
];
export const STATUS_LABEL = Object.fromEntries(STATUSES);
export const CATEGORIES = [
  ['tutor', 'Tutor'],
  ['library', 'Library'],
  ['community', 'Community'],
  ['account', 'Account'],
  ['other', 'Other'],
];
export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES);
export const PAGE = 20;

// undefined while loading, null when signed out, otherwise the session.
export function useSession() {
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  return session;
}

// { handle, joined, member, team } for the signed-in person.
export async function boardMe() {
  const { data, error } = await supabase.rpc('board_me');
  if (error) throw error;
  return data?.[0] ?? { handle: null, joined: false, member: false, team: false, paused_until: null };
}

const IDEA_COLS =
  'id, title, body, category, status, vote_count, comment_count, amendment, amended_at, removed_at, created_at, author_id, author:board_profiles!ideas_author_id_fkey(handle)';

// A post is on the board while removed_at is empty or still in the future (a 24-hour removal countdown).
const live = (q) => q.or(`removed_at.is.null,removed_at.gt."${new Date().toISOString()}"`);
export const isPending = (row) => !!row?.removed_at && new Date(row.removed_at) > new Date();
export const isGone = (row) => !!row?.removed_at && new Date(row.removed_at) <= new Date();
export const isPaused = (me) => !!me?.paused_until && new Date(me.paused_until) > new Date();

export function loadBoard({ sort = 'top', status, category, search, page = 0 }) {
  let q = live(supabase.from('ideas').select(IDEA_COLS));
  if (status) q = q.eq('status', status);
  if (category) q = q.eq('category', category);
  const term = (search || '').replace(/[%_,()\\]/g, ' ').trim();
  if (term) q = q.ilike('title', `%${term}%`);
  q =
    sort === 'new'
      ? q.order('created_at', { ascending: false })
      : q.order('vote_count', { ascending: false }).order('created_at', { ascending: false });
  return q.range(page * PAGE, page * PAGE + PAGE - 1);
}

export const loadIdea = (id) => supabase.from('ideas').select(IDEA_COLS).eq('id', id).maybeSingle();

// Only your own votes are ever readable.
export async function myVotes(ideaIds) {
  if (!ideaIds.length) return new Set();
  const { data } = await supabase.from('votes').select('idea_id').in('idea_id', ideaIds);
  return new Set((data || []).map((v) => v.idea_id));
}

export async function statusCounts() {
  const { data } = await supabase.from('idea_status_counts').select('status, ideas');
  return Object.fromEntries((data || []).map((r) => [r.status, r.ideas]));
}

export const toggleVote = (ideaId) => supabase.rpc('toggle_vote', { p_idea: ideaId });

export function similarIdeas(title) {
  const words = title
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 2);
  if (!words.length) return Promise.resolve({ data: [] });
  return live(supabase.from('ideas').select('id, title, vote_count'))
    .textSearch('title', words.join(' or '), { type: 'websearch', config: 'english' })
    .limit(3);
}

export const postIdea = ({ title, body, category }) =>
  supabase.from('ideas').insert({ title: title.trim(), body: body.trim(), category }).select('id').single();
export const amendIdea = (id, amendment) =>
  supabase.from('ideas').update({ amendment: amendment.trim() }).eq('id', id);
// For an author this starts the 24-hour countdown; for the team it removes at once. The database decides.
export const removeIdea = (id) =>
  supabase.from('ideas').update({ removed_at: new Date().toISOString() }).eq('id', id);
export const setStatus = (id, status) => supabase.rpc('set_status', { p_idea: id, p_status: status });

export const loadComments = (ideaId) =>
  supabase
    .from('comments')
    .select('id, body, amendment, amended_at, removed_at, created_at, is_team, author_id, author:board_profiles!comments_author_id_fkey(handle)')
    .eq('idea_id', ideaId)
    .or(`removed_at.is.null,removed_at.gt."${new Date().toISOString()}"`)
    .order('created_at', { ascending: true });
export const addComment = (ideaId, body) =>
  supabase.from('comments').insert({ idea_id: ideaId, body: body.trim() });
export const amendComment = (id, amendment) =>
  supabase.from('comments').update({ amendment: amendment.trim() }).eq('id', id);
export const removeComment = (id) =>
  supabase.from('comments').update({ removed_at: new Date().toISOString() }).eq('id', id);

export const report = ({ ideaId = null, commentId = null, reason }) =>
  supabase.from('reports').insert({ idea_id: ideaId, comment_id: commentId, reason: reason.trim() });

export const joinBoard = (handle, adult) => supabase.rpc('join_board', { p_handle: handle, p_adult: adult });
export const handleAvailable = (handle) => supabase.rpc('handle_available', { p_handle: handle });
export const renameHandle = (userId, handle) =>
  supabase.from('board_profiles').update({ handle: handle.trim() }).eq('user_id', userId);
export const exportMyData = () => supabase.rpc('export_my_board_data');
export const leaveBoard = () => supabase.rpc('leave_board');

// Database messages are written for people; a few low-level ones are translated here.
export function friendly(error) {
  const m = error?.message || '';
  if (/row-level security/i.test(m))
    return 'Posting, voting and commenting are for Cleophis members. Subscribe or enter your access code in the app, and join the board first.';
  if (/board_profiles_handle_ci|duplicate key/i.test(m)) return 'That handle is taken. Try another.';
  if (/violates check constraint/i.test(m)) return 'That is too short or too long. Check the length and try again.';
  if (/violates foreign key/i.test(m)) return 'Join the board first by choosing a handle.';
  if (/Failed to fetch|NetworkError/i.test(m)) return 'Could not reach the board. Check your connection and try again.';
  return m || 'Something went wrong. Please try again.';
}

// "23h 41m" until the given time.
export function timeLeft(iso) {
  const ms = Math.max(0, new Date(iso) - new Date());
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${Math.max(1, m)}m`;
}

export const POST_RULE =
  'Posts cannot be edited. Taking one down takes 24 hours and pauses your posting meanwhile. Or you can attach one amendment, and then the post stays for good.';

export function when(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
