'use client';

import { useEffect, useState } from 'react';

// Mirrors the real product: greeting first, then a short exchange.
const SCRIPT = [
  {
    role: 'tutor',
    content: 'Hi! What are we working on today? Show me the problem and we’ll figure it out together.',
  },
  { role: 'student', content: 'I don’t get factoring… x² + 5x + 6?' },
  {
    role: 'tutor',
    content: (
      <>
        No problem — one step at a time. We need two numbers that multiply to 6 and add to 5. Try
        2 and 3… So: <strong>(x + 2)(x + 3)</strong>. Want to try the next one together?
      </>
    ),
  },
  { role: 'student', content: 'yes!' },
];

// [delay before this message appears, whether to show typing dots first]
const TIMING = [
  { delay: 600, typing: true },
  { delay: 1400, typing: false },
  { delay: 1100, typing: true },
  { delay: 1600, typing: false },
];

export default function HeroChat() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(SCRIPT.length);
      return;
    }
    let cancelled = false;
    const timers = [];

    const advance = (i) => {
      if (cancelled || i >= SCRIPT.length) return;
      const { delay, typing: showDots } = TIMING[i];
      if (showDots) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(true);
            timers.push(
              setTimeout(() => {
                if (cancelled) return;
                setTyping(false);
                setShown(i + 1);
                advance(i + 1);
              }, 900)
            );
          }, delay)
        );
      } else {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setShown(i + 1);
            advance(i + 1);
          }, delay)
        );
      }
    };

    advance(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="app-window" aria-hidden="true">
      <div className="app-bar">
        <span className="app-dot" />
        <span className="app-dot" />
        <span className="app-dot" />
        <span className="app-title">Cleophis — Algebra II</span>
        <span className="offline-badge">
          <span className="offline-dot" />
          Local · offline
        </span>
      </div>
      <div className="chat">
        {SCRIPT.slice(0, shown).map((m, i) => (
          <div key={i} className={`msg msg-in ${m.role === 'student' ? 'msg-student' : 'msg-tutor'}`}>
            {m.content}
          </div>
        ))}
        {typing && (
          <div className="msg msg-tutor typing msg-in">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}
