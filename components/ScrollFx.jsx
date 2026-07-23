'use client';

import { useEffect, useRef } from 'react';

// Scroll progress bar + subtle hero parallax. Decorative motion is skipped
// under prefers-reduced-motion; the progress bar (feedback, not decoration) stays.
export default function ScrollFx() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const appWindow = document.querySelector('.hero .app-window');
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      if (!reduced && appWindow) {
        const y = Math.min(window.scrollY, 900);
        appWindow.style.transform = `translateY(${y * 0.07}px)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
